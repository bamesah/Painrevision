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
import { PLANS, FEEDBACK_REWARD, computeExpiryIso, introIsActive, formatDateLong, examDateLabel } from './_lib/plans.js';
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

// currentExpiryIso (optional) = the member's existing expiry, so the wording
// about access dates matches what checkout will actually give them.
function rewardInfo(currentExpiryIso = null) {
  const plan = PLANS[FEEDBACK_REWARD.planId];
  const now = new Date();
  return {
    extendsToExam: introIsActive(plan, now, currentExpiryIso),
    examDateLabel: examDateLabel(),
    accessUntilLabel: formatDateLong(computeExpiryIso(plan, now, currentExpiryIso)),
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
    try {
      const created = await stripe.promotionCodes.create({
        coupon: couponId,
        code: row.code,
        max_redemptions: 1,
        metadata: { user_id: row.user_id, feedback_submission_id: row.id },
      });
      promoId = created.id;
    } catch (err) {
      // A concurrent request may have created it a moment ago: reuse that one.
      const again = await stripe.promotionCodes.list({ code: row.code, limit: 1 });
      if (!again.data.length) throw err;
      promoId = again.data[0].id;
    }
  }
  const { data: updated } = await supabase
    .from('feedback_submissions').update({ stripe_promotion_code_id: promoId }).eq('id', row.id).select().maybeSingle();
  return updated || { ...row, stripe_promotion_code_id: promoId };
}

async function currentExpiryFor(supabase, token) {
  try {
    const { data: u } = await supabase.auth.getUser(token);
    if (!u?.user) return null;
    const { data: sub } = await supabase.from('subscriptions').select('expires_at').eq('user_id', u.user.id).maybeSingle();
    return sub?.expires_at || null;
  } catch (_) { return null; }
}

// Real dependencies are injected by the default export below; tests pass fakes.
export default function handler(req, res) {
  return handleFeedback(req, res, { createClient, Stripe, sendFeedbackRewardEmail });
}

export async function handleFeedback(req, res, deps) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method === 'GET' && req.query && req.query.config) {
    // Public; if a token is sent, the access-date wording is personalised.
    const t = (req.headers.authorization || '').replace(/^Bearer\s+/i, '');
    let cur = null;
    if (t && process.env.SUPABASE_SERVICE_ROLE_KEY) cur = await currentExpiryFor(deps.createClient(SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY), t);
    return res.status(200).json({ questions: publicQuestions(), reward: rewardInfo(cur) });
  }
  if (req.method !== 'GET' && req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const token = (req.headers.authorization || '').replace(/^Bearer\s+/i, '');
  if (!token) return res.status(401).json({ error: 'Not signed in' });

  const supabase = deps.createClient(SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
  const { data: userData, error: userErr } = await supabase.auth.getUser(token);
  if (userErr || !userData?.user) return res.status(401).json({ error: 'Invalid session' });
  const user = userData.user;

  const { data: existing } = await supabase
    .from('feedback_submissions').select('*').eq('user_id', user.id).maybeSingle();
  const { data: subRow } = await supabase.from('subscriptions').select('status,expires_at').eq('user_id', user.id).maybeSingle();
  const reward = rewardInfo(subRow?.expires_at || null);

  if (req.method === 'GET') {
    return res.status(200).json({
      submitted: !!existing,
      code: existing ? existing.code : null,
      ready: !!(existing && existing.stripe_promotion_code_id),
      reward,
    });
  }

  // ---- POST ----
  if (throttled(user.id)) return res.status(429).json({ error: 'Too many attempts. Please wait a minute.' });

  const body = req.body || {};
  const stripe = new deps.Stripe(process.env.STRIPE_SECRET_KEY);
  let row = existing;
  let isNew = false;

  if (!row) {
    // Only active members can submit (lapsed members are sent to renew).
    const sub = subRow;
    const active = sub && sub.status === 'active' && (!sub.expires_at || new Date(sub.expires_at) > new Date());
    if (!active) return res.status(403).json({ error: 'The feedback reward is for current members. Please renew to take part.', lapsed: true });

    // Spam checks: honeypot + submitted too fast to be a person.
    if (body.website) return res.status(400).json({ error: 'Could not submit.' });
    if (typeof body.elapsedMs === 'number' && body.elapsedMs < 3000) {
      return res.status(400).json({ error: 'Please take a moment to fill in the form.' });
    }
    if (JSON.stringify(body).length > 20000) return res.status(413).json({ error: 'Submission too large.' });

    const v = validateAnswers(body.answers);
    if (!v.ok) return res.status(400).json({ error: v.error, ...(v.missing ? { missing: v.missing } : {}) });

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
  // The send is claimed atomically (emailed_at set where it is still null), so
  // concurrent/duplicate requests can't both send. If the send fails or is
  // skipped (no RESEND_API_KEY) the claim is released so a later visit retries.
  let emailed = !!row.emailed_at;
  if (!emailed) {
    const { data: claimed } = await supabase
      .from('feedback_submissions').update({ emailed_at: new Date().toISOString() })
      .eq('id', row.id).is('emailed_at', null).select('id').maybeSingle();
    if (claimed) {
      let sent = false;
      try {
        const { data: profile } = await supabase.from('profiles').select('first_name').eq('id', user.id).maybeSingle();
        sent = await deps.sendFeedbackRewardEmail({
          email: user.email, firstName: profile?.first_name,
          code: row.code, percent: FEEDBACK_REWARD.percent, planLabel: '3-month',
        });
      } catch (err) {
        console.error('feedback reward email failed', err);
      }
      if (sent) emailed = true;
      else await supabase.from('feedback_submissions').update({ emailed_at: null }).eq('id', row.id);
    } else {
      emailed = true; // another request is sending / has sent it
    }
  }

  return res.status(200).json({ code: row.code, emailed, existing: !isNew, reward });
}
