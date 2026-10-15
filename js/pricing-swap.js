// Marketing pages (index, questions, demo) carry static launch-offer copy.
// Once the tiered plans are live (GET /api/plans returns more than one plan)
// this swaps that copy for tier wording, with prices taken from the API so
// nothing here is a hand-kept price. Elements opt in with data-tier-swap="key".
(function () {
  fetch('/api/plans', { cache: 'no-store' }).then(function (r) { return r.json(); }).then(function (data) {
    var plans = data.plans;
    if (!plans || plans.length < 2) return;
    function money(p) { return '£' + (p / 100).toFixed(2); }
    var min = plans.reduce(function (a, b) { return b.amountPence < a.amountPence ? b : a; });
    var intro = plans.filter(function (p) { return p.intro; })[0];
    var introTxt = intro ? ' 3-month intro offer: ' + money(intro.amountPence) + ', access until ' + intro.intro.untilLabel + '.' : '';
    var from = 'from ' + money(min.amountPence);
    var copy = {
      promo: 'Plans ' + from + '.' + introTxt,
      'index-amt': 'Plans <span style="font-size:.6em">' + from + '</span>',
      'index-until': 'MONTHLY, 3-MONTH, 6-MONTH &amp; ANNUAL ACCESS',
      'index-then': intro ? ('3-MONTH INTRO OFFER: ACCESS UNTIL ' + intro.intro.untilLabel.toUpperCase()) : 'ONE-TIME PAYMENT, NO AUTO-RENEWAL',
      'demo-p': 'Get full access to every question, mock exam, and feature you just tried — plans ' + from + '.',
      'demo-btn': 'See plans'
    };
    document.querySelectorAll('[data-tier-swap]').forEach(function (el) {
      var v = copy[el.getAttribute('data-tier-swap')];
      if (v !== undefined) el.innerHTML = v;
    });
  }).catch(function () {});
})();
