// Single source of truth for what's for sale. Both checkout endpoints
// (api/create-checkout-session.js, api/create-signup-checkout-session.js)
// look plans up here, and GET /api/plans serves the *active* plans to the
// browser so the pages (signup, upgrade, paywall, question-bank) render
// prices from this file instead of keeping hand-maintained copies.
//
// Prices are integer pence. `amountPence` is what Stripe charges; `wasPence`
// is display-only (struck through). The server alone decides price and
// expiry — nothing from the browser is trusted beyond the plan id.

// ---------------------------------------------------------------------------
// CONFIG — edit these constants to change dates / the go-live switch.
// ---------------------------------------------------------------------------

// The tiered plans replace the launch offer from this instant (UK is on GMT
// from 25 Oct, so 00:00 UTC on 1 Nov is midnight in the UK).
export const TIERS_LIVE_FROM_ISO = '2026-11-01T00:00:00Z';

// FFPMRCA MCQ exam date. 3-month buyers inside the intro window get access
// until the END of this day (UTC) instead of a plain 3 months.
export const EXAM_DATE_ISO = '2027-02-09T23:59:59Z';

// The 3-month intro offer has no configured end date: it is derived. The
// buyer gets max(start + 3 calendar months, EXAM_DATE_ISO), so the extension
// applies only while a plain 3 months would fall short of the exam day, i.e.
// it disappears automatically for purchases made on/after 9 Nov 2026 (UTC).

// Go-live switch for the tiers (env var FORCE_TIERS):
//   '1'  -> tiers on regardless of date
//   '0'  -> tiers off (launch offer) regardless of date, even on preview
//   unset -> tiers on if the date has passed, OR this is a Vercel *preview*
//            deployment (VERCEL_ENV === 'preview'), so staging is testable
//            now. Production (VERCEL_ENV === 'production') follows the date.
function tiersLive(now) {
  const force = process.env.FORCE_TIERS;
  if (force === '1') return true;
  if (force === '0') return false;
  if (process.env.VERCEL_ENV === 'preview') return true;
  return now.getTime() >= Date.parse(TIERS_LIVE_FROM_ISO);
}

// ---------------------------------------------------------------------------
// Plans
// ---------------------------------------------------------------------------

// Launch offer: fixed end date (`expiresAtIso`).
// Tiers: fixed term (`termMonths`) counted from purchase (or from the
// current expiry if the buyer is renewing before it lapses).
export const PLANS = {
  launch_offer_2026_oct: {
    kind: 'launch',
    label: 'Launch offer',
    amountPence: 999,
    wasPence: 1499,
    currency: 'gbp',
    name: 'PainRevision — Full access until 31 Oct 2026',
    expiresAtIso: '2026-10-31T23:59:59Z',
    blurb: 'Full access until 31 October 2026',
  },
  monthly: {
    kind: 'tier',
    label: '1 month',
    amountPence: 5999,
    currency: 'gbp',
    termMonths: 1,
    name: 'PainRevision — 1 month access',
    blurb: '1 month of full access',
  },
  three_month: {
    kind: 'tier',
    label: '3 months',
    amountPence: 15999,
    currency: 'gbp',
    termMonths: 3,
    introUntilExam: true, // intro offer: extend to EXAM_DATE_ISO while inside the intro window
    stripeProductId: 'pr_three_month', // stable Stripe Product so a promo code can be restricted to this plan (see stripe-catalog.js)
    name: 'PainRevision — 3 months access',
    blurb: '3 months of full access',
    featured: true,
  },
  six_month: {
    kind: 'tier',
    label: '6 months',
    amountPence: 29999,
    currency: 'gbp',
    termMonths: 6,
    name: 'PainRevision — 6 months access',
    blurb: '6 months of full access',
  },
  annual: {
    kind: 'tier',
    label: '12 months',
    amountPence: 49999,
    currency: 'gbp',
    termMonths: 12,
    name: 'PainRevision — 12 months access',
    blurb: '12 months of full access',
  },
};

// Feedback reward: single-use code, this percentage off, valid on this plan only.
export const FEEDBACK_REWARD = { percent: 30, planId: 'three_month' };

export function getActivePlanIds(now = new Date()) {
  return tiersLive(now)
    ? ['monthly', 'three_month', 'six_month', 'annual']
    : ['launch_offer_2026_oct'];
}

export function getDefaultPlanId(now = new Date()) {
  return tiersLive(now) ? 'three_month' : 'launch_offer_2026_oct';
}

// Returns the plan only if it is currently purchasable, else null.
export function getActivePlan(planId, now = new Date()) {
  return getActivePlanIds(now).includes(planId) ? PLANS[planId] : null;
}

// Start of the term: now, or the current expiry if renewing early.
function startDate(now, currentExpiryIso) {
  if (currentExpiryIso) {
    const cur = new Date(currentExpiryIso);
    if (!isNaN(cur) && cur > now) return cur;
  }
  return now;
}

// True only while the extension is actually in effect: a plain term would end
// before the START of exam day (9 Feb 00:00 UTC). A purchase on 9 Nov 2026 (any
// time) plain-ends on 9 Feb, so 9 Nov is NOT intro; 8 Nov (any time) is.
function introActive(plan, now, currentExpiryIso = null) {
  if (!plan.introUntilExam) return false;
  const plain = addMonthsUtc(startDate(now, currentExpiryIso), plan.termMonths);
  const examDayStart = new Date(EXAM_DATE_ISO);
  examDayStart.setUTCHours(0, 0, 0, 0);
  return plain < examDayStart;
}

function addMonthsUtc(date, months) {
  const d = new Date(date.getTime());
  const day = d.getUTCDate();
  d.setUTCDate(1);
  d.setUTCMonth(d.getUTCMonth() + months);
  const lastDay = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, 0)).getUTCDate();
  d.setUTCDate(Math.min(day, lastDay));
  return d;
}

// ISO expiry for a plan bought `now`. `currentExpiryIso` (optional) is the
// buyer's existing expiry: term plans extend from it if it's still in the
// future, so renewing early never shortens access.
export function computeExpiryIso(plan, now = new Date(), currentExpiryIso = null) {
  if (plan.expiresAtIso) return plan.expiresAtIso;
  let expiry = addMonthsUtc(startDate(now, currentExpiryIso), plan.termMonths);
  if (introActive(plan, now, currentExpiryIso)) expiry = new Date(EXAM_DATE_ISO);
  return expiry.toISOString();
}

// Short UK date for plan cards, e.g. "15 Jan 2027".
function fmtShort(iso) {
  const d = new Date(iso);
  const m = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][d.getUTCMonth()];
  return `${d.getUTCDate()} ${m} ${d.getUTCFullYear()}`;
}

function fmtDate(iso) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
}

// Note shown on the Stripe Checkout page (custom_text.submit.message). The
// 3-month plan uses a stable Stripe Product, so its line-item name can't carry
// the intro wording; this note does.
export function checkoutNote(plan, now = new Date(), currentExpiryIso = null, expiresIso = null) {
  const exp = expiresIso || computeExpiryIso(plan, now, currentExpiryIso);
  let note = `Access until ${fmtDate(exp)}.`;
  if (introActive(plan, now, currentExpiryIso)) note += ` Intro offer: access extended until the exam, ${fmtDate(EXAM_DATE_ISO)}.`;
  return note;
}

// Stripe line-item name (shown on the Checkout page and the invoice).
export function checkoutName(plan, now = new Date(), currentExpiryIso = null) {
  if (introActive(plan, now, currentExpiryIso)) return `${plan.name} — extended until the exam, ${fmtDate(EXAM_DATE_ISO)}`;
  return plan.name;
}

// Browser-safe description of the active plans (GET /api/plans).
// `currentExpiryIso` (optional, a signed-in user's existing expiry) makes
// each card's expiry date count from it, exactly as checkout will.
export function publicPlans(now = new Date(), currentExpiryIso = null) {
  return getActivePlanIds(now).map(id => {
    const p = PLANS[id];
    const intro = introActive(p, now, currentExpiryIso);
    const expiresIso = computeExpiryIso(p, now, currentExpiryIso);
    return {
      id,
      expiresIso,
      expiresLabel: fmtShort(expiresIso),
      label: p.label,
      blurb: p.blurb,
      amountPence: p.amountPence,
      wasPence: p.wasPence || null,
      featured: !!p.featured,
      intro: intro
        ? { untilIso: EXAM_DATE_ISO, untilLabel: fmtDate(EXAM_DATE_ISO) }
        : null,
      accessUntilLabel: p.expiresAtIso ? fmtDate(p.expiresAtIso) : null,
      termMonths: p.termMonths || null,
    };
  });
}
