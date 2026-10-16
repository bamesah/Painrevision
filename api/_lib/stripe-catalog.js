// Stable Stripe catalog objects, created on first use (so test mode and live
// mode each get their own automatically — Stripe ids are per account/mode).
//
// Why: a Stripe coupon can be restricted to specific *products*
// (applies_to.products), which is the only way Stripe itself can make a code
// work on one plan only. Our checkout uses dynamic price_data, so the plans
// that need a restricted code must reference a stable Product id
// (price_data.product) instead of an inline product_data name.
import { FEEDBACK_REWARD } from './plans.js';

const productSeen = new Set();

export async function ensureProduct(stripe, plan) {
  const id = plan.stripeProductId;
  if (productSeen.has(id)) return id;
  try {
    await stripe.products.retrieve(id);
  } catch (err) {
    if (err && err.code === 'resource_missing') {
      await stripe.products.create({ id, name: plan.name });
    } else {
      throw err;
    }
  }
  productSeen.add(id);
  return id;
}

// Fixed amount off, computed once from the plan price: 15999p * 30% = 4799.7
// -> 4800p, so the discounted price is exactly 15999 - 4800 = 11199p (£111.99),
// independent of how Stripe rounds percentages. The amount is part of the
// coupon id, so if the price ever changes a fresh coupon is created.
export function feedbackAmountOff(plan) {
  return Math.round(plan.amountPence * FEEDBACK_REWARD.percent / 100);
}

export async function ensureFeedbackCoupon(stripe, plan) {
  const productId = await ensureProduct(stripe, plan);
  const amountOff = feedbackAmountOff(plan);
  const id = `pr_feedback${FEEDBACK_REWARD.percent}_${productId}_${amountOff}`;
  try {
    await stripe.coupons.retrieve(id);
  } catch (err) {
    if (err && err.code === 'resource_missing') {
      await stripe.coupons.create({
        id,
        name: `Feedback reward: ${FEEDBACK_REWARD.percent}% off ${plan.label}`,
        amount_off: amountOff,
        currency: plan.currency,
        duration: 'once',
        applies_to: { products: [productId] },
      });
    } else {
      throw err;
    }
  }
  return id;
}
