// Vercel serverless function — /api/submit-feedback
//   GET  ?config=1            public: the form questions + reward description
//   GET  (Bearer token)       the member's existing submission/code, if any
//   POST (Bearer token)       submit the form; returns the member's reward code
//
// Everything happens here, server-side: the token is verified, active
// membership is required to submit, the code is generated here (never on the
// client), stored in `feedback_submissions` (UNIQUE user_id = one reward per
// member for life, and what makes retries/double-clicks idempotent), turned
// into a single-use Stripe promotion code locked to the 3-month plan, and
// emailed. See supabase/migration_033_feedback.sql and api/_lib/stripe-catalog.js.
import Stripe from 'stripe';
import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';
import { validateAnswers, publicQuestions } from './_lib/feedback-questions.js';
import { PLANS, FEEDBACK_REWARD } from './_lib/plans.js';
import { ensureFeedbackCoupon, feedbackAmountOff } from './_lib/stripe-catalog.js';
import { sendFeedbackRewardEmail } from './_lib/email.js';

const SUPABASE_URL = 'https://vxlxcxqyankqugwiypac.supabase.co';
// Unambiguous alphabet: no I, O, 0, 1.
const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

function makeCode() {
  const part = () => Array.from({ length: 4 }, () => ALPHABET[crypto.randomInt(ALPHABET.length)]).join('');
  return `FB-${part()}-${part()}`;
}

// Best-effort per-instance throttle (the DB unique constraint is the real guard).
const hits = new Map();
function throttled(userId) {
  const now = Date.now();
  const recent = (hits.get(userId) || []).filter(t => now - t < 60000);
  recent.push(now);
  hits.set(userId, recent);
  return recent.length > 6;
}

function rewardInfo() {
  const plan = PLANS[FEEDBACK_REWARD.planId];
  return {
    percent: FEEDBACK_REWARD.percent,
    planId: FEEDBACK_REWARD.planId,
    planLabel: plan.label,
    planName: '3-month', // used in sentences: "30% off the 3-month plan"
    fullPricePence: plan.amountPence,
    discountedPricePence: plan.amountPence - feedbackAmountOff(plan),
  };
}

// Create (or find) the Stripe promotion code for this row; max 1 redemption.
async function ensurePromotionCode(stripe, supabase, row) {
  if (row.stripe_promotion_code_id) return row;
  const plan = PLANS[FEEDBACK_REWARD.planId];
  const couponId = await ensureFeedbackCoupon(stripe, plan);
  let promoId;
  const found = await stripe.promotionCodes.list({ code: row.code, limit: 1 });
  if (found.data.length) {
    promoId = found.data[0].id;
  } else {
    const created = await stripe.promotionCodes.create({
      coupon: couponId,
      code: row.code,
      max_redemptions: 1,
      metadata: { user_id: row.user_id, feedback_submission_id: row.id },
    });
    promoId = created.id;
  }
  const { data: updated } = await supabase
    .from('feedback_submissions').update({ stripe_promotion_code_id: promoId }).eq('id', row.id).select().maybeSingle();
  return updated || { ...row, stripe_promotion_code_id: promoId };
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method === 'GET' && req.query && req.query.config) {
    return res.status(200).json({ questions: publicQuestions(), reward: rewardInfo() });
  }
  if (req.method !== 'GET' && req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const token = (req.headers.authorization || '').replace(/^Bearer\s+/i, '');
  if (!token) return res.status(401).json({ error: 'Not signed in' });

  const supabase = createClient(SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
  const { data: userData, error: userErr } = await supabase.auth.getUser(token);
  if (userErr || !userData?.user) return res.status(401).json({ error: 'Invalid session' });
  const user = userData.user;

  const { data: existing } = await supabase
    .from('feedback_submissions').select('*').eq('user_id', user.id).maybeSingle();

  if (req.method === 'GET') {
    return res.status(200).json({
      submitted: !!existing,
      code: existing ? existing.code : null,
      ready: !!(existing && existing.stripe_promotion_code_id),
      reward: rewardInfo(),
    });
  }

  // ---- POST ----
  if (throttled(user.id)) return res.status(429).json({ error: 'Too many attempts. Please wait a minute.' });

  const body = req.body || {};
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  let row = existing;
  let isNew = false;

  if (!row) {
    // Only active members can submit (lapsed members are sent to renew).
    const { data: sub } = await supabase
      .from('subscriptions').select('status,expires_at').eq('user_id', user.id).maybeSingle();
    const active = sub && sub.status === 'active' && (!sub.expires_at || new Date(sub.expires_at) > new Date());
    if (!active) return res.status(403).json({ error: 'The feedback reward is for current members. Please renew to take part.', lapsed: true });

    // Spam checks: honeypot + submitted too fast to be a person.
    if (body.website) return res.status(400).json({ error: 'Could not submit.' });
    if (typeof body.elapsedMs === 'number' && body.elapsedMs < 3000) {
      return res.status(400).json({ error: 'Please take a moment to fill in the form.' });
    }
    if (JSON.stringify(body).length > 20000) return res.status(413).json({ error: 'Submission too large.' });

    const v = validateAnswers(body.answers);
    if (!v.ok) return res.status(400).json({ error: v.error });

    // Insert; UNIQUE(user_id) makes a concurrent/duplicate submit lose the race
    // and fall through to the existing row; UNIQUE(code) retries on collision.
    for (let attempt = 0; attempt < 5 && !row; attempt++) {
      const { data: inserted, error: insErr } = await supabase
        .from('feedback_submissions').insert({ user_id: user.id, answers: v.answers, code: makeCode() }).select().maybeSingle();
      if (inserted) { row = inserted; isNew = true; break; }
      if (insErr && insErr.code === '23505') {
        const { data: again } = await supabase.from('feedback_submissions').select('*').eq('user_id', user.id).maybeSingle();
        if (again) { row = again; break; }
        continue; // code collision: try a new code
      }
      console.error('feedback insert failed', insErr);
      return res.status(500).json({ error: 'Could not save your feedback. Please try again.' });
    }
    if (!row) return res.status(500).json({ error: 'Could not save your feedback. Please try again.' });
  }

  // Make sure the Stripe promotion code exists (also repairs a half-finished earlier attempt).
  try {
    row = await ensurePromotionCode(stripe, supabase, row);
  } catch (err) {
    console.error('feedback promotion code failed', err);
    return res.status(502).json({ error: 'Your feedback was saved, but we could not create your code just yet. Please press submit again in a moment.' });
  }

  // Email once. A failure (or missing RESEND_API_KEY) never loses the code.
  let emailed = !!row.emailed_at;
  if (!emailed) {
    try {
      const { data: profile } = await supabase.from('profiles').select('first_name').eq('id', user.id).maybeSingle();
      const sent = await sendFeedbackRewardEmail({
        email: user.email, firstName: profile?.first_name,
        code: row.code, percent: FEEDBACK_REWARD.percent, planLabel: '3-month',
      });
      if (sent) {
        emailed = true;
        await supabase.from('feedback_submissions').update({ emailed_at: new Date().toISOString() }).eq('id', row.id);
      }
    } catch (err) {
      console.error('feedback reward email failed', err);
    }
  }

  return res.status(200).json({ code: row.code, emailed, existing: !isNew, reward: rewardInfo() });
}
