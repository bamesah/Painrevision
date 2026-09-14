// Vercel serverless function — POST /api/create-checkout-session
// Renewal/upgrade checkout for an ALREADY-SIGNED-IN user (called from
// upgrade.html and js/paywall.js). Verifies the caller's Supabase session
// server-side, then creates a Stripe Checkout Session for the requested plan
// (or the default plan if none given) and returns its URL. `metadata` carries
// the plan + expiry + kind:'renewal' so the webhook (api/stripe-webhook.js)
// can trust it without recomputing it, and can tell this apart from a
// pay-to-register signup checkout (api/create-signup-checkout-session.js).
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import { PLANS, DEFAULT_PLAN_ID } from './_lib/plans.js';

const SUPABASE_URL = 'https://vxlxcxqyankqugwiypac.supabase.co';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const authHeader = req.headers.authorization || '';
  const token = authHeader.replace(/^Bearer\s+/i, '');
  if (!token) return res.status(401).json({ error: 'Not signed in' });

  const supabase = createClient(SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
  const { data: userData, error: userErr } = await supabase.auth.getUser(token);
  if (userErr || !userData?.user) return res.status(401).json({ error: 'Invalid session' });
  const user = userData.user;

  const planId = (req.body && req.body.planId) || DEFAULT_PLAN_ID;
  const plan = PLANS[planId];
  if (!plan) return res.status(400).json({ error: 'Unknown plan' });

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const origin = req.headers.origin || `https://${req.headers.host}`;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: plan.currency,
          unit_amount: plan.amountPence,
          product_data: { name: plan.name },
        },
        quantity: 1,
      }],
      client_reference_id: user.id,
      metadata: {
        kind: 'renewal',
        supabase_user_id: user.id,
        plan: planId,
        expires_at: plan.expiresAtIso,
      },
      customer_email: user.email,
      success_url: `${origin}/upgrade.html?success=1`,
      cancel_url: `${origin}/upgrade.html?cancelled=1`,
    });
    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error('create-checkout-session error', err);
    return res.status(500).json({ error: 'Could not start checkout' });
  }
}
