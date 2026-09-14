// Vercel serverless function — POST /api/stripe-webhook
// Verifies the Stripe signature (needs the RAW request body, hence
// `bodyParser: false` below) and, on checkout.session.completed, upserts the
// buyer's subscriptions row using the Supabase service-role key (bypasses
// RLS — this is the only writer of this table).
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://vxlxcxqyankqugwiypac.supabase.co';

export const config = {
  api: { bodyParser: false },
};

async function readRawBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  return Buffer.concat(chunks);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const sig = req.headers['stripe-signature'];
  const rawBody = await readRawBody(req);

  let event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const userId = session.metadata?.supabase_user_id;
    const plan = session.metadata?.plan;
    const expiresAt = session.metadata?.expires_at;

    if (userId && plan && expiresAt) {
      const supabase = createClient(SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
      const { error } = await supabase.from('subscriptions').upsert({
        user_id: userId,
        status: 'active',
        plan,
        expires_at: expiresAt,
        stripe_customer_id: session.customer,
        stripe_checkout_session_id: session.id,
        stripe_payment_intent_id: session.payment_intent,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'user_id' });
      if (error) console.error('subscriptions upsert failed', error);
    } else {
      console.error('checkout.session.completed missing expected metadata', session.id);
    }
  }

  return res.status(200).json({ received: true });
}
