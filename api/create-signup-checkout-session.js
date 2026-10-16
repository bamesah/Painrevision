// Vercel serverless function — POST /api/create-signup-checkout-session
// No auth required — this is how a BRAND NEW visitor pays before an account
// exists at all. Re-checks username/email availability server-side (defense
// in depth against the client-side check being bypassed), then creates a
// Stripe Checkout Session carrying everything needed to create the account
// afterwards EXCEPT the password (never sent to Stripe — see signup.html and
// api/complete-signup.js). The account itself is only created once Stripe
// confirms payment (api/complete-signup.js, with api/stripe-webhook.js as a
// safety net) — see api/_lib/account.js.
// Price and expiry come from api/_lib/plans.js, never from the browser.
// `allow_promotion_codes` shows Stripe's "Add promotion code" box.
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import { getActivePlan, getDefaultPlanId, computeExpiryIso, checkoutName, checkoutNote } from './_lib/plans.js';
import { ensureProduct } from './_lib/stripe-catalog.js';

const SUPABASE_URL = 'https://vxlxcxqyankqugwiypac.supabase.co';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { firstName, lastName, username, email, planId } = req.body || {};
  if (!firstName || !lastName || !username || !email) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const now = new Date();
  const effectivePlanId = planId || getDefaultPlanId(now);
  const plan = getActivePlan(effectivePlanId, now);
  if (!plan) return res.status(400).json({ error: 'Unknown or unavailable plan' });
  const expiresAt = computeExpiryIso(plan, now);

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

  // Plans with a stable Stripe Product (the 3-month plan) reference it so a
  // product-restricted promotion code (the feedback reward) can only ever
  // apply to that plan. If the catalog call fails, fall back to inline
  // product data: checkout still works, the restricted code just won't apply.
  let productRef = { product_data: { name: checkoutName(plan, now) } };
  if (plan.stripeProductId) {
    try { productRef = { product: await ensureProduct(stripe, plan) }; } catch (e) { console.error('ensureProduct failed', e); }
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: plan.currency,
          unit_amount: plan.amountPence,
          ...productRef,
        },
        quantity: 1,
      }],
      allow_promotion_codes: true,
      custom_text: { submit: { message: checkoutNote(plan, now, null, expiresAt) } },
      invoice_creation: { enabled: true },
      metadata: {
        kind: 'signup',
        email,
        first_name: firstName,
        last_name: lastName,
        username,
        plan: effectivePlanId,
        expires_at: expiresAt,
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
