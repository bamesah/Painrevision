// Single source of truth for what's for sale. Both the renewal checkout
// (api/create-checkout-session.js) and the pay-to-register signup checkout
// (api/create-signup-checkout-session.js) look plans up here, and the
// client-side plan lists (signup.html, js/paywall.js) mirror these ids and
// figures for display. Add a new entry here (plus a matching client-side
// display entry) to add a price tier — nothing else needs restructuring.
export const PLANS = {
  launch_offer_2026_oct: {
    amountPence: 1499, // £14.99
    currency: 'gbp',
    name: 'PainRevision — Full access until 31 Oct 2026',
    expiresAtIso: '2026-10-31T23:59:59Z',
  },
};

export const DEFAULT_PLAN_ID = 'launch_offer_2026_oct';
