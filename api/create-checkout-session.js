// Vercel serverless function — POST /api/create-checkout-session
// Verifies the caller's Supabase session server-side, then creates a Stripe
// Checkout Session for the current launch offer and returns its URL.
//
// The whole offer (amount, copy, what it grants) lives in the OFFER constant
// below — change this file to change the offer, no Stripe Dashboard edits
// needed. `metadata` carries the plan + expiry the checkout was created for
// so the webhook (api/stripe-webhook.js) can trust it without recomputing it.
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://vxlxcxqyankqugwiypac.supabase.co';

const OFFER = {
  planId: 'launch_offer_2026_oct',
  amountPence: 1499, // £14.99
  currency: 'gbp',
  name: 'PainRevision — Full access until 31 Oct 2026',
  expiresAtIso: '2026-10-31T23:59:59Z',
};

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const authHeader = req.headers.authorization || '';
  const token = authHeader.replace(/^Bearer\s+/i, '');
  if (!token) return res.status(401).json({ error: 'Not signed in' });

  const supabase = createClient(SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
  const { data: userData, error: userErr } = await supabase.auth.getUser(token);
  if (userErr || !userData?.user) return res.status(401).json({ error: 'Invalid session' });
  const user = userData.user;

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const origin = req.headers.origin || `https://${req.headers.host}`;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: OFFER.currency,
          unit_amount: OFFER.amountPence,
          product_data: { name: OFFER.name },
        },
        quantity: 1,
      }],
      client_reference_id: user.id,
      metadata: {
        supabase_user_id: user.id,
        plan: OFFER.planId,
        expires_at: OFFER.expiresAtIso,
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
