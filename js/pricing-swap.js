// Marketing pages (index, demo) carry static launch-offer copy.
// Once the tiered plans are live (GET /api/plans returns more than one plan)
// this swaps that copy for tier wording, with prices taken from the API so
// nothing here is a hand-kept price. Elements opt in with data-tier-swap="key".
(function () {
  fetch('/api/plans', { cache: 'no-store' }).then(function (r) { return r.json(); }).then(function (data) {
    var plans = data.plans;
    if (!plans || plans.length < 2) return;
    function money(p) { return '£' + (p / 100).toFixed(2); }
    var min = plans.reduce(function (a, b) { return b.amountPence < a.amountPence ? b : a; });
    var from = 'from ' + money(min.amountPence);
    var copy = {
      'demo-p': 'Get full access to every question, mock exam, and feature you just tried — plans ' + from + '.',
      'demo-btn': 'See plans'
    };
    // index.html: in tier mode the price block is dropped; the "Start Today"
    // button (link to signup.html) is the call to action.
    document.querySelectorAll('[data-tier-hide]').forEach(function (el) { el.style.display = 'none'; });
    document.querySelectorAll('[data-tier-swap]').forEach(function (el) {
      var v = copy[el.getAttribute('data-tier-swap')];
      if (v !== undefined) el.innerHTML = v;
    });
  }).catch(function () {});
})();
