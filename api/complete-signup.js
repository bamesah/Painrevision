// Vercel serverless function — POST /api/complete-signup
// No auth required — the request itself only ever comes from
// signup-complete.html right after Stripe redirects back with a session_id,
// which functions as the proof-of-payment token (long, unguessable, single
// purpose). Verifies payment directly against Stripe (not trusted from the
// client), then creates the account. The password travels ONLY from the
// browser to this endpoint — never through Stripe.
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import { createOrReconcileAccount } from './_lib/account.js';

const SUPABASE_URL = 'https://vxlxcxqyankqugwiypac.supabase.co';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { session_id: sessionId, password } = req.body || {};
  if (!sessionId) return res.status(400).json({ error: 'Missing session_id' });

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  let session;
  try {
    session = await stripe.checkout.sessions.retrieve(sessionId);
  } catch (err) {
    return res.status(400).json({ error: 'Invalid checkout session' });
  }

  if (session.payment_status !== 'paid' || session.metadata?.kind !== 'signup') {
    return res.status(400).json({ error: 'This checkout was not completed' });
  }

  const { email, first_name: firstName, last_name: lastName, username, plan, expires_at: expiresAt } = session.metadata;

  const supabaseAdmin = createClient(SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

  try {
    const { userId } = await createOrReconcileAccount(supabaseAdmin, {
      email, password, username, firstName, lastName, plan, expiresAt,
      stripeCustomerId: session.customer,
      stripeCheckoutSessionId: session.id,
      stripePaymentIntentId: session.payment_intent,
    });
    return res.status(200).json({ ok: true, email, userId });
  } catch (err) {
    console.error('complete-signup error', err);
    return res.status(500).json({ error: 'Could not finish setting up your account' });
  }
}
