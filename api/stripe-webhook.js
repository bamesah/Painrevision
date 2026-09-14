// Vercel serverless function — POST /api/stripe-webhook
// Verifies the Stripe signature (needs the RAW request body, hence
// `bodyParser: false` below) and, on checkout.session.completed, either
// activates an existing user's renewal (kind:'renewal', from
// api/create-checkout-session.js) or acts as the safety net for a
// pay-to-register signup (kind:'signup', from
// api/create-signup-checkout-session.js) in case the buyer never made it
// back to signup-complete.html — see api/_lib/account.js for that path.
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import { createOrReconcileAccount } from './_lib/account.js';

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
    const { kind, plan, expires_at: expiresAt } = session.metadata || {};
    const supabaseAdmin = createClient(SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

    if (kind === 'signup') {
      const { email, first_name: firstName, last_name: lastName, username } = session.metadata;
      if (email && plan && expiresAt) {
        try {
          await createOrReconcileAccount(supabaseAdmin, {
            email, username, firstName, lastName, plan, expiresAt,
            stripeCustomerId: session.customer,
            stripeCheckoutSessionId: session.id,
            stripePaymentIntentId: session.payment_intent,
          });
        } catch (err) {
          console.error('signup account creation failed', err);
        }
      } else {
        console.error('checkout.session.completed (signup) missing expected metadata', session.id);
      }
    } else {
      const userId = session.metadata?.supabase_user_id;
      if (userId && plan && expiresAt) {
        const { error } = await supabaseAdmin.from('subscriptions').upsert({
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
        console.error('checkout.session.completed (renewal) missing expected metadata', session.id);
      }
    }
  }

  return res.status(200).json({ received: true });
}
