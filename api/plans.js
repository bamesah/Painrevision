// Vercel serverless function — GET /api/plans
// Public list of the plans purchasable right now (see api/_lib/plans.js for
// the go-live switch). Pages render prices from this, never their own copy.
// If the caller sends a valid Supabase bearer token, each plan's expiry date
// is computed from their current expiry (if still in the future) — the same
// rule checkout uses — so the "Access until" line on the cards can't drift.
import { createClient } from '@supabase/supabase-js';
import { publicPlans, getDefaultPlanId } from './_lib/plans.js';

const SUPABASE_URL = 'https://vxlxcxqyankqugwiypac.supabase.co';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  res.setHeader('Cache-Control', 'no-store');
  const now = new Date();

  let currentExpiry = null;
  const token = (req.headers.authorization || '').replace(/^Bearer\s+/i, '');
  if (token && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    try {
      const supabase = createClient(SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
      const { data: u } = await supabase.auth.getUser(token);
      if (u?.user) {
        const { data: sub } = await supabase.from('subscriptions').select('expires_at').eq('user_id', u.user.id).maybeSingle();
        currentExpiry = sub?.expires_at || null;
      }
    } catch (e) { /* anonymous fallback */ }
  }

  return res.status(200).json({ plans: publicPlans(now, currentExpiry), defaultPlanId: getDefaultPlanId(now) });
}
