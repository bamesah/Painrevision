// Vercel serverless function — GET /api/plans
// Public list of the plans purchasable right now (see api/_lib/plans.js for
// the go-live switch). Pages render prices from this, never their own copy.
import { publicPlans, getDefaultPlanId } from './_lib/plans.js';

export default function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  res.setHeader('Cache-Control', 'no-store');
  const now = new Date();
  return res.status(200).json({ plans: publicPlans(now), defaultPlanId: getDefaultPlanId(now) });
}
