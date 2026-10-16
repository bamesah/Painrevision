// Vercel serverless function — GET /api/admin-feedback
// Admin-only read of every feedback submission, joined with the member's email
// (which lives in auth.users and so can't be read through RLS) and, where
// cheaply knowable, whether the reward code has been redeemed.
//
// Security: verifies the caller's Supabase token, then checks
// profiles.role === 'admin' with the service role. Anyone else gets 401/403
// and NO data. Nothing is exposed to the browser except through this check, so
// feedback_submissions RLS stays "members read their own row only".
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import { FEEDBACK_QUESTIONS } from './_lib/feedback-questions.js';

const SUPABASE_URL = 'https://vxlxcxqyankqugwiypac.supabase.co';
const MAX_ROWS = 2000;

export default function handler(req, res) {
  return handleAdminFeedback(req, res, { createClient, Stripe });
}

export async function handleAdminFeedback(req, res, deps) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const token = (req.headers.authorization || '').replace(/^Bearer\s+/i, '');
  if (!token) return res.status(401).json({ error: 'Not signed in' });

  const supabase = deps.createClient(SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
  const { data: userData, error: userErr } = await supabase.auth.getUser(token);
  if (userErr || !userData?.user) return res.status(401).json({ error: 'Invalid session' });

  const { data: me } = await supabase.from('profiles').select('role').eq('id', userData.user.id).maybeSingle();
  if (!me || me.role !== 'admin') return res.status(403).json({ error: 'Admins only' });

  const { data: rows, error } = await supabase
    .from('feedback_submissions')
    .select('id,user_id,answers,code,stripe_promotion_code_id,emailed_at,created_at')
    .order('created_at', { ascending: false })
    .limit(MAX_ROWS);
  if (error) return res.status(500).json({ error: 'Could not load feedback' });
  const list = rows || [];

  // Emails (auth.users) in small parallel batches; profiles for names.
  const ids = [...new Set(list.map(r => r.user_id))];
  const emails = {};
  for (let i = 0; i < ids.length; i += 10) {
    await Promise.all(ids.slice(i, i + 10).map(async id => {
      try {
        const { data } = await supabase.auth.admin.getUserById(id);
        emails[id] = data?.user?.email || null;
      } catch (_) { emails[id] = null; }
    }));
  }
  const profiles = {};
  if (ids.length) {
    const { data: ps } = await supabase.from('profiles').select('id,username,first_name,last_name').in('id', ids);
    (ps || []).forEach(p => { profiles[p.id] = p; });
  }

  // Redeemed? Our promotion codes are few, so list them once and read
  // times_redeemed. If Stripe is unavailable, redeemed is null (unknown).
  let redeemedById = null;
  try {
    if (process.env.STRIPE_SECRET_KEY && list.some(r => r.stripe_promotion_code_id)) {
      const stripe = new deps.Stripe(process.env.STRIPE_SECRET_KEY);
      redeemedById = {};
      for await (const p of stripe.promotionCodes.list({ limit: 100 })) redeemedById[p.id] = p.times_redeemed;
    }
  } catch (err) {
    console.error('admin-feedback redeemed lookup failed', err);
    redeemedById = null;
  }

  const out = list.map(r => {
    const p = profiles[r.user_id] || {};
    const name = [p.first_name, p.last_name].filter(Boolean).join(' ') || null;
    let redeemed = null;
    if (redeemedById && r.stripe_promotion_code_id && r.stripe_promotion_code_id in redeemedById) redeemed = redeemedById[r.stripe_promotion_code_id] > 0;
    return {
      id: r.id, created_at: r.created_at, code: r.code, redeemed,
      email: emails[r.user_id] || null, username: p.username || null, name,
      answers: r.answers || {},
    };
  });

  return res.status(200).json({
    questions: FEEDBACK_QUESTIONS.map(q => ({ id: q.id, type: q.type, label: q.label, options: q.options || null })),
    submissions: out,
    redeemedKnown: redeemedById !== null,
  });
}
