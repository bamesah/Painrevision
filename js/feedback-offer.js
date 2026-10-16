// Shared wording + data for the feedback reward, used by the dashboard popup
// and the my-profile.html "Feedback reward" card so they always say the same
// thing. Prices/dates come from the server (api/_lib/plans.js via
// GET /api/submit-feedback?config=1), never hard-coded here.
// Requires js/supabase-client.js (for `sb`) loaded first.
const FeedbackOffer = (function () {
  function money(p) { return '£' + (p / 100).toFixed(2); }

  // Personalised with the member's token when signed in, so the access date
  // matches what checkout will give them.
  async function loadReward() {
    const headers = {};
    try {
      const { data } = await sb.auth.getSession();
      if (data && data.session) headers.Authorization = 'Bearer ' + data.session.access_token;
    } catch (_) {}
    const res = await fetch('/api/submit-feedback?config=1', { headers, cache: 'no-store' });
    if (!res.ok) throw new Error('reward unavailable');
    return (await res.json()).reward;
  }

  // "...a one-off discount code for 30% off the 3-month plan (£111.99 instead
  // of £159.99), giving you access until the exam day on 9 February 2027."
  function offerClause(r) {
    const access = r.extendsToExam
      ? 'access until the exam day on ' + r.examDateLabel
      : 'access until ' + r.accessUntilLabel;
    return 'a one-off discount code for ' + r.percent + '% off the ' + r.planName + ' plan (' +
      money(r.discountedPricePence) + ' instead of ' + money(r.fullPricePence) + '), giving you ' + access + '.';
  }

  function popupText(r) {
    return 'As one of the first users of this question bank, we are interested in your feedback on the platform. ' +
      'As a thank you for filling in the feedback form, we will give you ' + offerClause(r);
  }

  function cardText(r) {
    return 'As a thank you for filling in the feedback form, we will give you ' + offerClause(r);
  }

  function claimedText(r) {
    return 'Your one-off discount code for ' + r.percent + '% off the ' + r.planName + ' plan (' +
      money(r.discountedPricePence) + ' instead of ' + money(r.fullPricePence) + '). It works once. Enter it in the promotion code box at payment.';
  }

  return { loadReward, popupText, cardText, claimedText, money };
})();
