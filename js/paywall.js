// Blocking paywall overlay for pages that require active paid access
// (dashboard/practice/progress/knowledge-summary). Depends on
// js/supabase-client.js and js/subscription-gate.js being loaded first.
//
// Paywall.enforce(userId, mainEl) checks access; if inactive, it dims/
// disables mainEl (topbar stays outside it, so logout keeps working) and
// shows a non-dismissible overlay listing the current plan(s) with a buy
// button that starts checkout directly.
const Paywall = (function () {
  // Plans are fetched from /api/plans (api/_lib/plans.js is the single source
  // of truth) and rendered by js/plan-picker.js, which is loaded on demand so
  // host pages don't each need an extra <script> tag.
  function ensurePicker() {
    if (window.PlanPicker || typeof PlanPicker !== 'undefined') return Promise.resolve();
    return new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = 'js/plan-picker.js';
      s.onload = resolve;
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }

  function injectStyles() {
    if (document.getElementById('paywall-styles')) return;
    const s = document.createElement('style');
    s.id = 'paywall-styles';
    s.textContent = `
    .paywall-locked{filter:grayscale(.85) blur(2px);opacity:.5;pointer-events:none;user-select:none;transition:filter .3s,opacity .3s}
    .paywall-overlay{position:fixed;left:0;right:0;bottom:0;z-index:90;display:flex;align-items:center;justify-content:center;padding:24px;background:rgba(36,27,22,.5);backdrop-filter:blur(2px);-webkit-backdrop-filter:blur(2px)}
    .paywall-card{max-width:600px;max-height:100%;overflow-y:auto;width:100%;background:var(--surface);border:1px solid var(--border);border-radius:24px;box-shadow:var(--shadow);padding:36px;text-align:center}
    .paywall-badge{display:inline-block;font-family:var(--mono);font-size:11px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:var(--coral-deep);background:var(--coral-faint,rgba(240,98,60,.08));border:1px solid rgba(240,98,60,.22);border-radius:999px;padding:5px 14px;margin-bottom:16px}
    .paywall-card h2{font-size:22px;font-weight:800;letter-spacing:-.03em;margin-bottom:8px}
    .paywall-card p.paywall-sub{font-size:14px;color:var(--stone);line-height:1.6;margin-bottom:24px}
    .paywall-plans{padding-top:6px}
    .paywall-note{font-size:12.5px;color:var(--stone);margin-top:16px;line-height:1.5}
    .paywall-msg{font-size:13px;color:var(--wrong,#C0392B);margin-top:14px;display:none}
    .paywall-msg.show{display:block}
    @media(max-width:600px){.paywall-card{padding:26px 22px}}`;
    document.head.appendChild(s);
  }

  function positionOverlay(overlay) {
    const topbar = document.querySelector('.app-topbar');
    overlay.style.top = topbar ? topbar.getBoundingClientRect().bottom + 'px' : '0';
  }

  async function buy(planId, btn, msgEl) {
    const original = btn.textContent;
    btn.disabled = true;
    btn.textContent = 'Redirecting to checkout…';
    msgEl.classList.remove('show');
    try {
      const { data: { session } } = await sb.auth.getSession();
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { Authorization: `Bearer ${session.access_token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId }),
      });
      const body = await res.json();
      if (body.url) {
        window.location.href = body.url;
        return;
      }
      msgEl.textContent = body.error || 'Could not start checkout. Please try again.';
    } catch (err) {
      msgEl.textContent = 'Could not start checkout. Please try again.';
    }
    msgEl.classList.add('show');
    btn.disabled = false;
    btn.textContent = original;
  }

  function showOverlay() {
    if (document.getElementById('paywall-overlay')) return;
    injectStyles();

    const overlay = document.createElement('div');
    overlay.className = 'paywall-overlay';
    overlay.id = 'paywall-overlay';

    overlay.innerHTML = `
      <div class="paywall-card" role="dialog" aria-modal="true" aria-labelledby="paywall-title">
        <span class="paywall-badge">Access required</span>
        <h2 id="paywall-title">Get full access to continue</h2>
        <p class="paywall-sub">Your access to the question bank isn't active. Choose a plan to unlock mock exams, practice sets, stats and everything else.</p>
        <div class="paywall-plans" id="paywall-plans"><p class="paywall-sub">Loading plans…</p></div>
        <p class="paywall-note">One-time payment, no automatic renewal. Have a discount code? Enter it on the payment page.</p>
        <p class="paywall-msg" id="paywall-msg"></p>
      </div>`;

    document.body.appendChild(overlay);
    positionOverlay(overlay);
    window.addEventListener('resize', () => positionOverlay(overlay));

    const msgEl = overlay.querySelector('#paywall-msg');
    const plansEl = overlay.querySelector('#paywall-plans');
    ensurePicker().then(() => PlanPicker.load())
      .then((data) => {
        PlanPicker.render(plansEl, data, {
          mode: 'buy',
          ctaLabel: 'Get access',
          onBuy: (id, btn) => buy(id, btn, msgEl),
        });
      })
      .catch(() => {
        plansEl.innerHTML = '<p class="paywall-sub">Could not load plans. Please refresh the page.</p>';
      });
  }

  async function enforce(userId, mainEl) {
    const access = await SubscriptionGate.checkAccess(userId);
    if (access.active) return { active: true };
    if (mainEl) {
      mainEl.classList.add('paywall-locked');
      mainEl.inert = true;
    }
    showOverlay();
    return { active: false };
  }

  return { enforce };
})();
