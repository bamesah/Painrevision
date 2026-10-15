// Shared subscription-status check — included after js/supabase-client.js on
// any page that needs to know whether the current user has paid access.
const SubscriptionGate = (function () {
  async function checkAccess(userId) {
    const { data, error } = await sb
      .from('subscriptions')
      .select('status,plan,expires_at')
      .eq('user_id', userId)
      .maybeSingle();

    if (error || !data) return { active: false };

    const notExpired = !data.expires_at || new Date(data.expires_at) > new Date();
    const active = data.status === 'active' && notExpired;
    return { active, status: data.status, plan: data.plan, expiresAt: data.expires_at };
  }

  // Whole days left until expiry (floor), or null if no expiry. 0 = under a day.
  function daysLeft(expiresAt) {
    if (!expiresAt) return null;
    return Math.floor((new Date(expiresAt).getTime() - Date.now()) / 86400000);
  }

  return { checkAccess, daysLeft };
})();
