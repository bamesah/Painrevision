// Vercel serverless function — POST /api/create-checkout-session
// Renewal/upgrade checkout for an ALREADY-SIGNED-IN user (called from
// upgrade.html and js/paywall.js). Verifies the caller's Supabase session
// server-side, then creates a Stripe Checkout Session for the requested plan
// (or the default plan if none given) and returns its URL. `metadata` carries
// the plan + expiry + kind:'renewal' so the webhook (api/stripe-webhook.js)
// can trust it without recomputing it, and can tell this apart from a
// pay-to-register signup checkout (api/create-signup-checkout-session.js).
// Price and expiry are decided here from api/_lib/plans.js — only the plan id
// comes from the browser. `allow_promotion_codes` shows Stripe's own "Add
// promotion code" box on the Checkout page.
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import { getActivePlan, getDefaultPlanId, computeExpiryIso, checkoutName } from './_lib/plans.js';

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

  const now = new Date();
  const planId = (req.body && req.body.planId) || getDefaultPlanId(now);
  const plan = getActivePlan(planId, now);
  if (!plan) return res.status(400).json({ error: 'Unknown or unavailable plan' });

  // Renewing before expiry extends from the current expiry, never shortens it.
  const { data: existingSub } = await supabase
    .from('subscriptions').select('expires_at').eq('user_id', user.id).maybeSingle();
  const expiresAt = computeExpiryIso(plan, now, existingSub?.expires_at || null);

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
          product_data: { name: checkoutName(plan, now) },
        },
        quantity: 1,
      }],
      allow_promotion_codes: true,
      invoice_creation: { enabled: true },
      client_reference_id: user.id,
      metadata: {
        kind: 'renewal',
        supabase_user_id: user.id,
        plan: planId,
        expires_at: expiresAt,
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
