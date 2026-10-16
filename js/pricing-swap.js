// index.html shows the static launch-offer price block (£ price + deadline).
// Once the tiered plans are live (GET /api/plans returns more than one plan)
// that block is hidden: elements opt in with the data-tier-hide attribute and
// the "Start Today" button is the call to action. No price text is inserted
// by this script.
(function () {
  fetch('/api/plans', { cache: 'no-store' }).then(function (r) { return r.json(); }).then(function (data) {
    if (!data.plans || data.plans.length < 2) return;
    document.querySelectorAll('[data-tier-hide]').forEach(function (el) { el.style.display = 'none'; });
  }).catch(function () {});
})();
