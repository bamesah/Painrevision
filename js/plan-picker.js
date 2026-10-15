// Shared plan picker. Prices/plans are NOT defined here — they come from
// GET /api/plans (api/_lib/plans.js is the single source of truth), so a
// price or go-live change never needs a client edit.
//
//   PlanPicker.load()                     -> Promise<{ plans, defaultPlanId }>
//   PlanPicker.render(el, data, opts)     -> renders cards into el
//     opts.mode      'select' (radio-style, opts.onSelect(id)) or
//                    'buy'    (each card has a button, opts.onBuy(id, btn))
//     opts.layout    'grid' (2x2 cards, default) or 'list' (compact rows)
//     opts.selected  initially selected plan id (select mode)
//     opts.ctaLabel  button text in buy mode (default "Choose plan")
//     opts.linkBase  buy mode only: if set, cards are <a href=linkBase+id>
//   PlanPicker.money(pence)               -> "£59.99"
//   PlanPicker.getSelected(el)            -> currently selected plan id
const PlanPicker = (function () {
  function money(pence) {
    return '£' + (pence / 100).toFixed(2);
  }

  function injectStyles() {
    if (document.getElementById('plan-picker-styles')) return;
    const s = document.createElement('style');
    s.id = 'plan-picker-styles';
    s.textContent = `
    .pp-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
    .pp-list{display:flex;flex-direction:column;gap:10px}
    .pp-grid.pp-single{grid-template-columns:minmax(0,1fr)}
    @media(max-width:520px){.pp-grid{grid-template-columns:minmax(0,1fr)}}
    .pp-card{position:relative;display:flex;flex-direction:column;gap:4px;text-align:left;background:var(--surface,#fff);border:1.5px solid var(--border,#EDE3D7);border-radius:16px;padding:18px 18px 16px;color:var(--ink,#241B16);font-family:inherit;cursor:pointer;text-decoration:none;box-shadow:0 1px 2px rgba(36,27,22,.04),0 8px 22px -14px rgba(36,27,22,.18);transition:transform .2s cubic-bezier(.2,.7,.2,1),border-color .15s,box-shadow .2s,background .15s}
    .pp-card:hover{border-color:var(--coral,#F0623C);transform:translateY(-2px);box-shadow:0 2px 4px rgba(36,27,22,.05),0 14px 28px -14px rgba(240,98,60,.35)}
    .pp-card:focus-within{outline:2px solid var(--coral-deep,#D2491F);outline-offset:2px}
    .pp-card:focus-visible{outline:2px solid var(--coral-deep,#D2491F);outline-offset:2px}
    .pp-card:active{transform:translateY(0)}
    .pp-card.is-selected{border-color:var(--coral,#F0623C);background:var(--coral-soft,#FBD9CC);box-shadow:0 0 0 3px rgba(240,98,60,.15)}
    .pp-card.is-featured{border-color:var(--coral,#F0623C)}
    .pp-badge{position:absolute;top:-10px;right:14px;font-family:var(--mono,'IBM Plex Mono',monospace);font-size:10.5px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:#fff;background:var(--coral,#F0623C);border-radius:999px;padding:3px 10px}
    .pp-label{font-size:14px;font-weight:700;letter-spacing:-.01em}
    .pp-price{font-size:28px;font-weight:800;letter-spacing:-.03em;line-height:1.1;display:flex;align-items:baseline;flex-wrap:wrap;gap:0}
    .pp-price .pp-was{font-size:.55em;font-weight:600;color:var(--stone,#7C7068);text-decoration:line-through;text-decoration-color:var(--coral,#F0623C);text-decoration-thickness:2px;margin-right:.4em}
    .pp-sub{font-family:var(--mono,'IBM Plex Mono',monospace);font-size:11.5px;color:var(--stone,#7C7068);letter-spacing:.01em}
    .pp-intro{margin-top:8px;font-size:12.5px;line-height:1.45;font-weight:600;color:var(--coral-deep,#D2491F);background:var(--amber-soft,#FCE6BF);border-radius:10px;padding:8px 10px}
    .pp-intro small{display:block;font-weight:500;color:var(--ink-soft,#3A2D25);font-size:11.5px;margin-top:2px}
    .pp-cta{margin-top:12px;display:inline-flex;align-items:center;justify-content:center;background:var(--coral,#F0623C);color:#fff;border:2px solid var(--coral,#F0623C);border-radius:999px;font-family:inherit;font-size:13.5px;font-weight:700;padding:9px 16px;cursor:pointer;transition:background .2s,transform .2s cubic-bezier(.2,.7,.2,1)}
    .pp-card:hover .pp-cta,.pp-cta:hover{background:var(--coral-deep,#D2491F);border-color:var(--coral-deep,#D2491F)}
    .pp-cta:disabled{opacity:.6;cursor:not-allowed}
    .pp-list .pp-card{flex-direction:row;align-items:center;flex-wrap:wrap;gap:4px 12px;padding:14px 16px}
    .pp-list .pp-main{flex:1;min-width:0;display:flex;flex-direction:column;gap:2px}
    .pp-list .pp-price{font-size:19px}
    .pp-list .pp-intro{flex-basis:100%;margin-top:6px;order:3}
    .pp-list .pp-cta{margin-top:0}
    .pp-list .pp-badge{top:-9px}
    .pp-card input.pp-radio{position:absolute;opacity:0;pointer-events:none}
    `;
    document.head.appendChild(s);
  }

  async function load() {
    const res = await fetch('/api/plans', { cache: 'no-store' });
    if (!res.ok) throw new Error('plans unavailable');
    return res.json();
  }

  function cardHtml(p, opts) {
    const perMonth = p.termMonths && p.termMonths > 1
      ? `${money(Math.round(p.amountPence / p.termMonths))} / month`
      : (p.termMonths === 1 ? 'one month, pay as you go' : 'one-time payment');
    const was = p.wasPence ? `<s class="pp-was">${money(p.wasPence)}</s>` : '';
    const intro = p.intro
      ? `<div class="pp-intro">Intro offer: access extended until the exam, ${p.intro.untilLabel}<small>Instead of a plain 3 months.</small></div>`
      : '';
    const sub = p.accessUntilLabel ? `Access until ${p.accessUntilLabel}` : perMonth;
    const badge = p.intro ? '<span class="pp-badge">Intro offer</span>' : (p.featured ? '<span class="pp-badge">Popular</span>' : '');
    const cls = 'pp-card' + (p.featured || p.intro ? ' is-featured' : '');
    const body = `${badge}<span class="pp-main"><span class="pp-label">${p.label}</span><span class="pp-price">${was}${money(p.amountPence)}</span><span class="pp-sub">${sub}</span></span>${intro}`;
    if (opts.mode === 'buy') {
      if (opts.linkBase) {
        return `<a class="${cls}" data-plan="${p.id}" href="${opts.linkBase}${encodeURIComponent(p.id)}">${body}<span class="pp-cta">${opts.ctaLabel || 'Choose plan'}</span></a>`;
      }
      return `<div class="${cls}" data-plan="${p.id}">${body}<button type="button" class="pp-cta">${opts.ctaLabel || 'Choose plan'}</button></div>`;
    }
    return `<label class="${cls}" data-plan="${p.id}"><input class="pp-radio" type="radio" name="plan" value="${p.id}">${body}</label>`;
  }

  function render(el, data, opts) {
    opts = opts || {};
    injectStyles();
    const plans = data.plans;
    const layout = opts.layout === 'list' ? 'pp-list' : 'pp-grid' + (plans.length === 1 ? ' pp-single' : '');
    el.innerHTML = `<div class="${layout}">${plans.map(p => cardHtml(p, opts)).join('')}</div>`;

    if (opts.mode === 'buy') {
      if (!opts.linkBase) {
        el.querySelectorAll('.pp-card').forEach(card => {
          const btn = card.querySelector('.pp-cta');
          btn.addEventListener('click', () => opts.onBuy && opts.onBuy(card.getAttribute('data-plan'), btn));
        });
      }
      return;
    }

    const selectedId = opts.selected || data.defaultPlanId || plans[0].id;
    function select(id) {
      el.querySelectorAll('.pp-card').forEach(c => {
        const on = c.getAttribute('data-plan') === id;
        c.classList.toggle('is-selected', on);
        c.querySelector('input').checked = on;
      });
      if (opts.onSelect) opts.onSelect(id);
    }
    el.querySelectorAll('.pp-card').forEach(c => {
      c.addEventListener('click', e => { e.preventDefault(); select(c.getAttribute('data-plan')); });
    });
    select(plans.some(p => p.id === selectedId) ? selectedId : plans[0].id);
  }

  function getSelected(el) {
    const c = el.querySelector('.pp-card.is-selected');
    return c ? c.getAttribute('data-plan') : null;
  }

  return { load, render, money, getSelected };
})();
