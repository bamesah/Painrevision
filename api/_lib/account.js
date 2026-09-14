import crypto from 'crypto';

async function findUserByEmail(supabaseAdmin, email) {
  const target = email.toLowerCase();
  for (let page = 1; page <= 5; page++) {
    const { data, error } = await supabaseAdmin.auth.admin.listUsers({ page, perPage: 1000 });
    if (error || !data?.users?.length) return null;
    const match = data.users.find(u => (u.email || '').toLowerCase() === target);
    if (match) return match;
    if (data.users.length < 1000) return null; // last page
  }
  return null;
}

// Creates the auth user (+ profiles row, via the existing on_auth_user_created
// trigger) if it doesn't exist yet, or reconciles it if a caller already won
// the race (webhook vs. the browser's own return trip both call this).
// Always upserts the subscriptions row for the resulting user id. Returns
// { userId }.
export async function createOrReconcileAccount(supabaseAdmin, {
  email, password, username, firstName, lastName,
  plan, expiresAt, stripeCustomerId, stripeCheckoutSessionId, stripePaymentIntentId,
}) {
  const effectivePassword = password || crypto.randomBytes(24).toString('hex');

  let userId;
  const { data: created, error: createErr } = await supabaseAdmin.auth.admin.createUser({
    email,
    password: effectivePassword,
    email_confirm: true,
    user_metadata: { username, first_name: firstName, last_name: lastName },
  });

  if (created?.user) {
    userId = created.user.id;
  } else {
    const msg = (createErr?.message || '').toLowerCase();
    const alreadyExists = createErr?.code === 'email_exists' || msg.includes('already') || msg.includes('registered');
    if (!alreadyExists) throw createErr || new Error('Could not create account');

    const existing = await findUserByEmail(supabaseAdmin, email);
    if (!existing) throw createErr || new Error('Account exists but could not be found');
    userId = existing.id;

    // Only overwrite the password when we were given a real one — never
    // clobber a real password with a freshly-generated placeholder.
    if (password) {
      await supabaseAdmin.auth.admin.updateUserById(userId, { password });
    }
  }

  const { error: subErr } = await supabaseAdmin.from('subscriptions').upsert({
    user_id: userId,
    status: 'active',
    plan,
    expires_at: expiresAt,
    stripe_customer_id: stripeCustomerId,
    stripe_checkout_session_id: stripeCheckoutSessionId,
    stripe_payment_intent_id: stripePaymentIntentId,
    updated_at: new Date().toISOString(),
  }, { onConflict: 'user_id' });
  if (subErr) console.error('subscriptions upsert failed', subErr);

  return { userId };
}
