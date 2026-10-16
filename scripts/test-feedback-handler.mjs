// Offline test of api/submit-feedback.js with fake Supabase/Stripe/email (no network). Run: node scripts/test-feedback-handler.mjs
import { handleFeedback } from '../api/submit-feedback.js';
process.env.SUPABASE_SERVICE_ROLE_KEY = 'x';
process.env.STRIPE_SECRET_KEY = 'x';

const tick = () => new Promise(r => setTimeout(r, Math.random() * 6));

function makeDb() {
  const tables = { feedback_submissions: [], subscriptions: ['a1','a2','a3','a4','a5'].map(u=>({user_id:u,status:'active',expires_at:new Date(Date.now()+20*864e5).toISOString()})).concat([{ user_id: 'u1', status: 'active', expires_at: new Date(Date.now() + 20 * 864e5).toISOString() }, { user_id: 'u2', status: 'active', expires_at: new Date(Date.now() - 864e5).toISOString() }]), profiles: [{ id: 'u1', first_name: 'Ann' }] };
  let idc = 0;
  function qb(table) {
    const st = { op: 'select', filters: [], payload: null, wantSelect: false };
    const run = async () => {
      await tick();
      const rows = tables[table];
      const match = r => st.filters.every(([c, v]) => (r[c] ?? null) === v);
      if (st.op === 'select') return { data: rows.filter(match)[0] || null, error: null };
      if (st.op === 'insert') {
        const o = { id: 'id' + (++idc), stripe_promotion_code_id: null, emailed_at: null, ...st.payload };
        if (rows.some(r => r.user_id === o.user_id) || rows.some(r => r.code === o.code)) return { data: null, error: { code: '23505' } };
        rows.push(o); return { data: o, error: null };
      }
      if (st.op === 'update') {
        const r = rows.filter(match)[0];
        if (!r) return { data: null, error: null };
        Object.assign(r, st.payload); return { data: st.wantSelect ? { ...r } : null, error: null };
      }
    };
    const b = {
      select() { if (st.op !== 'select') st.wantSelect = true; return b; },
      eq(c, v) { st.filters.push([c, v]); return b; },
      is(c, v) { st.filters.push([c, v]); return b; },
      insert(p) { st.op = 'insert'; st.payload = p; return b; },
      update(p) { st.op = 'update'; st.payload = p; return b; },
      maybeSingle: run, single: run,
      then(res, rej) { return run().then(res, rej); },
    };
    return b;
  }
  return { tables, client: { auth: { getUser: async tok => ({ data: { user: tok === 'bad' ? null : { id: tok, email: tok + '@x.co' } }, error: null }) }, from: qb } };
}

function makeStripe() {
  const s = { products: new Set(), coupons: new Set(), promos: [], created: 0 };
  s.Ctor = class {
    constructor() {
      this.products = { retrieve: async id => { await tick(); if (!s.products.has(id)) { const e = new Error('nf'); e.code = 'resource_missing'; throw e; } }, create: async p => { await tick(); s.products.add(p.id); } };
      this.coupons = { retrieve: async id => { await tick(); if (!s.coupons.has(id)) { const e = new Error('nf'); e.code = 'resource_missing'; throw e; } }, create: async p => { await tick(); s.coupons.add(p.id); } };
      this.promotionCodes = {
        list: async ({ code }) => { await tick(); return { data: s.promos.filter(p => p.code === code) }; },
        create: async p => { await tick(); if (s.promos.some(x => x.code === p.code)) throw new Error('code exists'); s.created++; const o = { id: 'promo_' + s.created, code: p.code, max: p.max_redemptions }; s.promos.push(o); return o; },
      };
    }
  };
  return s;
}

const good = { overall: 5, quality: 4, usability: 4, recommend: 'Definitely', improve: 'x', features: 'y', other: 'z' };
function call(deps, method, token, body) {
  return new Promise(resolve => {
    const res = { code: 200, setHeader() {}, status(c) { this.code = c; return this; }, json(o) { resolve({ code: this.code, body: o }); } };
    handleFeedback({ method, query: {}, headers: { authorization: 'Bearer ' + token }, body }, res, deps);
  });
}

let fails = 0;
const check = (name, ok, extra = '') => { console.log((ok ? 'PASS ' : 'FAIL ') + name + (ok ? '' : ' ' + extra)); if (!ok) fails++; };

// 1. two simultaneous first submissions => one row, one code, one promo, one email
{
  const db = makeDb(), stripe = makeStripe(); let emails = 0;
  const deps = { createClient: () => db.client, Stripe: stripe.Ctor, sendFeedbackRewardEmail: async () => { emails++; return true; } };
  const rs = await Promise.all([call(deps, 'POST', 'u1', { answers: good }), call(deps, 'POST', 'u1', { answers: good }), call(deps, 'POST', 'u1', { answers: good })]);
  check('concurrent: all 200', rs.every(r => r.code === 200), JSON.stringify(rs.map(r => r.code)));
  check('concurrent: same code', new Set(rs.map(r => r.body.code)).size === 1);
  check('concurrent: one row', db.tables.feedback_submissions.length === 1);
  check('concurrent: one stripe promo', stripe.promos.length === 1 && stripe.promos[0].max === 1, JSON.stringify(stripe.promos));
  check('concurrent: one email', emails === 1, String(emails));
  // 2. later POST returns same code, nothing new
  const again = await call(deps, 'POST', 'u1', { answers: good });
  check('second POST same code', again.body.code === rs[0].body.code && again.body.existing === true);
  check('second POST no new row/promo/email', db.tables.feedback_submissions.length === 1 && stripe.promos.length === 1 && emails === 1);
  // empty-body retry also fine
  const retry = await call(deps, 'POST', 'u1', {});
  check('retry with empty body returns code', retry.code === 200 && retry.body.code === rs[0].body.code);
  // GET shows code
  const g = await call(deps, 'GET', 'u1');
  check('GET returns submitted+code', g.body.submitted && g.body.code === rs[0].body.code && g.body.ready);
  check('code format', /^FB-[A-HJ-NP-Z2-9]{4}-[A-HJ-NP-Z2-9]{4}$/.test(rs[0].body.code), rs[0].body.code);
}
// 3. lapsed member without a row cannot submit; with old payload shape
{
  const db = makeDb(), stripe = makeStripe();
  const deps = { createClient: () => db.client, Stripe: stripe.Ctor, sendFeedbackRewardEmail: async () => true };
  const r = await call(deps, 'POST', 'u2', { answers: good });
  check('lapsed => 403 lapsed', r.code === 403 && r.body.lapsed === true);
  check('lapsed => no row', db.tables.feedback_submissions.length === 0);
  const bad = await call(deps, 'POST', 'bad', { answers: good });
  check('bad token => 401', bad.code === 401);
}
// 4. validation / old payloads
{
  const db = makeDb(), stripe = makeStripe();
  const deps = { createClient: () => db.client, Stripe: stripe.Ctor, sendFeedbackRewardEmail: async () => true };
  const missing = await call(deps, 'POST', 'a1', { answers: { overall: 5 } });
  check('missing required => 400', missing.code === 400);
  // every question is mandatory
  const ws = await call(deps, 'POST', 'a1', { answers: { ...good, improve: '    ' } });
  check('whitespace-only text => 400 listing id', ws.code === 400 && JSON.stringify(ws.body.missing) === '["improve"]', JSON.stringify(ws.body));
  const nof = await call(deps, 'POST', 'a1', { answers: { ...good, features: undefined, other: '' } });
  check('missing answers => 400 listing all missing ids', nof.code === 400 && JSON.stringify(nof.body.missing) === '["features","other"]', JSON.stringify(nof.body));
  const stale = await call(deps, 'POST', 'a1', { answers: { overall: 5, formats: ['SBA'], quality: 4, usability: 4, recommend: 'Definitely', improve: 'x', topics: 't' } });
  check('old cached payload (missing features/other) rejected', stale.code === 400 && stale.body.missing.includes('features'), JSON.stringify(stale.body));
  const emptyMulti = await call(deps, 'POST', 'a1', { answers: null });
  check('null answers => 400', emptyMulti.code === 400);
  check('rejections create no row', db.tables.feedback_submissions.length === 0);
  const old = await call(deps, 'POST', 'a1', { answers: { ...good, formats: ['SBA'], topics: 'old topic text' } });
  check('old payload extra keys ignored, accepted', old.code === 200);
  const stored = db.tables.feedback_submissions[0].answers;
  check('old keys not stored', !('formats' in stored) && !('topics' in stored) && stored.improve === 'x', JSON.stringify(stored));
}
{
  const db = makeDb(), stripe = makeStripe();
  const deps = { createClient: () => db.client, Stripe: stripe.Ctor, sendFeedbackRewardEmail: async () => true };
  const fast = await call(deps, 'POST', 'a2', { answers: good, elapsedMs: 500 });
  check('too fast => 400', fast.code === 400);
  const hp = await call(deps, 'POST', 'a2', { answers: good, website: 'spam' });
  check('honeypot => 400', hp.code === 400);
  check('spam leaves no row', db.tables.feedback_submissions.length === 0);
}
// 5. email unavailable: code still returned; claim released, retry sends later
{
  const db = makeDb(), stripe = makeStripe(); let key = false, sent = 0;
  const deps = { createClient: () => db.client, Stripe: stripe.Ctor, sendFeedbackRewardEmail: async () => { if (!key) return false; sent++; return true; } };
  const r1 = await call(deps, 'POST', 'a3', { answers: good });
  check('no email key: code returned, emailed=false', r1.code === 200 && r1.body.emailed === false && !!r1.body.code);
  check('claim released', db.tables.feedback_submissions[0].emailed_at === null);
  key = true;
  const r2 = await call(deps, 'POST', 'a3', {});
  check('later retry emails once', r2.body.emailed === true && sent === 1);
  await call(deps, 'POST', 'a3', {});
  check('no further emails', sent === 1);
}
// 6. stripe failure leaves row, retry repairs without a second code
{
  const db = makeDb(), stripe = makeStripe(); let fail = true;
  class Flaky extends stripe.Ctor { constructor() { super(); const c = this.promotionCodes.create; this.promotionCodes.create = async p => { if (fail) throw new Error('stripe down'); return c(p); }; } }
  const deps = { createClient: () => db.client, Stripe: Flaky, sendFeedbackRewardEmail: async () => true };
  const r1 = await call(deps, 'POST', 'a4', { answers: good });
  check('stripe down => 502', r1.code === 502);
  const code1 = db.tables.feedback_submissions[0].code;
  fail = false;
  const r2 = await call(deps, 'POST', 'a4', {});
  check('repair: same code, one promo', r2.code === 200 && r2.body.code === code1 && stripe.promos.length === 1);
}
// 7. reward info
{
  const db = makeDb(), stripe = makeStripe();
  const deps = { createClient: () => db.client, Stripe: stripe.Ctor, sendFeedbackRewardEmail: async () => true };
  const r = await call(deps, 'POST', 'a5', { answers: good });
  const w = r.body.reward;
  check('reward prices', w.fullPricePence === 15999 && w.discountedPricePence === 11199, JSON.stringify(w));
  console.log('reward:', JSON.stringify(w));
}
console.log(fails ? `\n${fails} FAILED` : '\nALL PASSED');
process.exit(fails ? 1 : 0);
