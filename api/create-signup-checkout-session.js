// Vercel serverless function — POST /api/create-signup-checkout-session
// No auth required — this is how a BRAND NEW visitor pays before an account
// exists at all. Re-checks username/email availability server-side (defense
// in depth against the client-side check being bypassed), then creates a
// Stripe Checkout Session carrying everything needed to create the account
// afterwards EXCEPT the password (never sent to Stripe — see signup.html and
// api/complete-signup.js). The account itself is only created once Stripe
// confirms payment (api/complete-signup.js, with api/stripe-webhook.js as a
// safety net) — see api/_lib/account.js.
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import { PLANS, DEFAULT_PLAN_ID } from './_lib/plans.js';

const SUPABASE_URL = 'https://vxlxcxqyankqugwiypac.supabase.co';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { firstName, lastName, username, email, planId } = req.body || {};
  if (!firstName || !lastName || !username || !email) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const plan = PLANS[planId || DEFAULT_PLAN_ID];
  if (!plan) return res.status(400).json({ error: 'Unknown plan' });

  const supabase = createClient(SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
  const [usernameCheck, emailCheck] = await Promise.all([
    supabase.rpc('username_available', { p_username: username }),
    supabase.rpc('email_available', { p_email: email }),
  ]);
  if (usernameCheck.error || emailCheck.error) {
    return res.status(500).json({ error: 'Something went wrong — please try again.' });
  }
  if (usernameCheck.data === false) return res.status(409).json({ error: 'This username is already in use.' });
  if (emailCheck.data === false) return res.status(409).json({ error: 'This email is already in use.' });

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
      invoice_creation: { enabled: true },
      metadata: {
        kind: 'signup',
        email,
        first_name: firstName,
        last_name: lastName,
        username,
        plan: planId || DEFAULT_PLAN_ID,
        expires_at: plan.expiresAtIso,
      },
      customer_email: email,
      success_url: `${origin}/signup-complete.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/signup.html?cancelled=1`,
    });
    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error('create-signup-checkout-session error', err);
    return res.status(500).json({ error: 'Could not start checkout' });
  }
}
