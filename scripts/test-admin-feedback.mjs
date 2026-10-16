// Offline test of api/admin-feedback.js (fake Supabase/Stripe). Run: node scripts/test-admin-feedback.mjs
import { handleAdminFeedback } from '../api/admin-feedback.js';
process.env.SUPABASE_SERVICE_ROLE_KEY = 'x';
process.env.STRIPE_SECRET_KEY = 'x';

const rows = [
  { id: 'r1', user_id: 'm1', answers: { overall: 5, improve: 'old <b>text</b>', legacy: 'x' }, code: 'FB-AAAA-BBBB', stripe_promotion_code_id: 'promo_1', emailed_at: null, created_at: '2026-10-02T10:00:00Z' },
  { id: 'r2', user_id: 'm2', answers: { overall: 3 }, code: 'FB-CCCC-DDDD', stripe_promotion_code_id: 'promo_2', emailed_at: null, created_at: '2026-10-03T10:00:00Z' },
];
const tables = {
  profiles: [{ id: 'admin1', role: 'admin' }, { id: 'm1', role: 'member', username: 'ann', first_name: 'Ann', last_name: 'A' }, { id: 'm2', role: 'member', username: 'bob' }],
  feedback_submissions: rows,
};
function qb(table) {
  const st = { f: [], inList: null, order: null };
  const run = async () => {
    let r = tables[table].filter(x => st.f.every(([c, v]) => x[c] === v));
    if (st.inList) r = r.filter(x => st.inList[1].includes(x[st.inList[0]]));
    if (st.order) r = [...r].sort((a, b) => (a[st.order] < b[st.order] ? 1 : -1));
    return { data: r, error: null };
  };
  const b = {
    select() { return b; }, eq(c, v) { st.f.push([c, v]); return b; }, in(c, v) { st.inList = [c, v]; return b; },
    order(c) { st.order = c; return b; }, limit() { return b; },
    maybeSingle: async () => ({ data: (await run()).data[0] || null, error: null }),
    then(res, rej) { return run().then(res, rej); },
  };
  return b;
}
const emailOf = { m1: 'ann@x.co', m2: 'bob@x.co' };
const client = {
  auth: {
    getUser: async t => ({ data: { user: ['admin1', 'm1'].includes(t) ? { id: t } : null }, error: null }),
    admin: { getUserById: async id => ({ data: { user: { email: emailOf[id] } } }) },
  },
  from: qb,
};
let stripeMode = 'ok';
class FakeStripe {
  constructor() {
    this.promotionCodes = {
      list: () => {
        if (stripeMode === 'fail') throw new Error('stripe down');
        return (async function* () { yield { id: 'promo_1', times_redeemed: 1 }; yield { id: 'promo_2', times_redeemed: 0 }; })();
      },
    };
  }
}
const deps = { createClient: () => client, Stripe: FakeStripe };
const call = (token, method = 'GET') => new Promise(resolve => {
  const res = { code: 200, setHeader() {}, status(c) { this.code = c; return this; }, json(o) { resolve({ code: this.code, body: o }); } };
  handleAdminFeedback({ method, headers: token ? { authorization: 'Bearer ' + token } : {} }, res, deps);
});

let fails = 0;
const check = (n, ok, x = '') => { console.log((ok ? 'PASS ' : 'FAIL ') + n + (ok ? '' : ' ' + x)); if (!ok) fails++; };

const none = await call(null);
check('no token => 401, no data', none.code === 401 && !none.body.submissions);
const bad = await call('nope');
check('bad token => 401, no data', bad.code === 401 && !bad.body.submissions);
const member = await call('m1');
check('non-admin => 403, no data/codes', member.code === 403 && !member.body.submissions && !JSON.stringify(member.body).includes('FB-'));
const post = await call('admin1', 'POST');
check('POST => 405', post.code === 405);
const ok = await call('admin1');
check('admin => 200', ok.code === 200);
check('newest first', ok.body.submissions[0].id === 'r2');
check('email + name joined', ok.body.submissions[1].email === 'ann@x.co' && ok.body.submissions[1].name === 'Ann A' && ok.body.submissions[1].username === 'ann');
check('redeemed flags', ok.body.submissions[1].redeemed === true && ok.body.submissions[0].redeemed === false && ok.body.redeemedKnown === true);
check('unknown answer keys tolerated (returned as stored)', ok.body.submissions[1].answers.legacy === 'x');
check('questions config included', ok.body.questions.some(q => q.id === 'overall'));
stripeMode = 'fail';
const nos = await call('admin1');
check('stripe failure => redeemed null, still 200', nos.code === 200 && nos.body.submissions[0].redeemed === null && nos.body.redeemedKnown === false);

console.log(fails ? `\n${fails} FAILED` : '\nALL PASSED');
process.exit(fails ? 1 : 0);
