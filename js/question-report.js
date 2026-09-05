/* ===== REPORT A PROBLEM =====
   Lets a candidate flag a question they think contains a mistake. Self-injecting
   (DOM + CSS) like question-notes.js. A host page loads this file (after
   supabase-client.js) and, for each rendered card:

     QuestionReport.attach(cardEl, { userId, questionId });

   - adds a "Report" button to the card's .q-meta row
   - opens one shared modal: an issue-type chip row + a required comment
   - inserts a row into question_reports (status 'open'); user_id is null for
     anonymous visitors — reporting does not require an account
   - remembers which questions this browser has already reported so the button
     shows a "Reported" state on return

   Admins triage the reports in admin-reports.html. */
(function (global) {
  const REASONS = [
    ['wrong_answer', 'Wrong answer'],
    ['typo', 'Typo / formatting'],
    ['unclear', 'Unclear wording'],
    ['outdated', 'Outdated'],
    ['other', 'Something else']
  ];
  const MIN_COMMENT = 5;
  const STORE_KEY = 'qr:reported';

  /* --- browser memory of already-reported questions (best effort) --- */
  function reportedSet() {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      return new Set(raw ? JSON.parse(raw) : []);
    } catch (_) { return new Set(); }
  }
  function rememberReported(questionId) {
    try {
      const s = reportedSet();
      s.add(questionId);
      localStorage.setItem(STORE_KEY, JSON.stringify([...s]));
    } catch (_) { /* private mode — the in-page state still updates */ }
  }

  function injectStyles() {
    if (document.getElementById('qr-styles')) return;
    const s = document.createElement('style');
    s.id = 'qr-styles';
    s.textContent = `
    .qr-btn{position:relative;display:inline-flex;align-items:center;gap:6px;height:34px;padding:0 12px;border-radius:10px;border:1.5px solid var(--border-strong,#E0D3C4);background:var(--surface,#fff);color:var(--stone,#7C7068);font-family:var(--san,system-ui,sans-serif);font-size:12.5px;font-weight:600;letter-spacing:-.01em;cursor:pointer;transition:color .18s,border-color .18s,background .18s,transform .18s}
    .qr-btn:hover{border-color:var(--wrong,#C0392B);color:var(--wrong,#C0392B);transform:translateY(-1px)}
    .qr-btn:active{transform:translateY(0)}
    .qr-btn:focus-visible{outline:2px solid var(--coral,#F0623C);outline-offset:2px}
    .qr-btn .qr-btn-icon{width:14px;height:14px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
    .qr-btn.is-reported{border-color:var(--border,#EDE3D7);color:var(--stone-light,#A99E95);cursor:default}
    .qr-btn.is-reported:hover{transform:none;border-color:var(--border,#EDE3D7);color:var(--stone-light,#A99E95)}

    .qr-overlay{position:fixed;inset:0;z-index:1200;display:flex;align-items:center;justify-content:center;padding:20px;background:rgba(36,27,22,.46);opacity:0;transition:opacity .2s ease}
    .qr-overlay.open{opacity:1}
    .qr-overlay[hidden]{display:none}
    .qr-dialog{width:100%;max-width:456px;background:var(--surface,#fff);border:1.5px solid var(--border,#EDE3D7);border-radius:18px;box-shadow:0 1px 2px rgba(36,27,22,.04),0 30px 60px -24px rgba(36,27,22,.4);padding:24px;transform:translateY(10px) scale(.985);transition:transform .22s cubic-bezier(.2,.8,.25,1);max-height:calc(100vh - 40px);overflow-y:auto}
    .qr-overlay.open .qr-dialog{transform:none}
    .qr-head{display:flex;align-items:flex-start;gap:12px;margin-bottom:6px}
    .qr-title{font-family:var(--san,system-ui,sans-serif);font-size:17px;font-weight:800;letter-spacing:-.02em;color:var(--ink,#241B16);flex:1}
    .qr-x{flex-shrink:0;width:30px;height:30px;border-radius:8px;border:none;background:transparent;color:var(--stone,#7C7068);cursor:pointer;display:inline-flex;align-items:center;justify-content:center;transition:background .15s,color .15s}
    .qr-x:hover{background:var(--cream,#FBF5EE);color:var(--ink,#241B16)}
    .qr-x:focus-visible{outline:2px solid var(--coral,#F0623C);outline-offset:2px}
    .qr-x svg{width:16px;height:16px;stroke:currentColor;stroke-width:2.4;stroke-linecap:round}
    .qr-intro{font-family:var(--san,system-ui,sans-serif);font-size:13px;line-height:1.55;color:var(--stone,#7C7068);margin-bottom:18px}
    .qr-label{display:block;font-family:var(--mono,ui-monospace,monospace);font-size:10.5px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:var(--stone-light,#A99E95);margin-bottom:9px}
    .qr-chips{display:flex;flex-wrap:wrap;gap:7px;margin-bottom:18px}
    .qr-chip{font-family:var(--san,system-ui,sans-serif);font-size:12.5px;font-weight:600;color:var(--ink-soft,#3A2D25);background:var(--cream,#FBF5EE);border:1.5px solid var(--border-strong,#E0D3C4);border-radius:999px;padding:7px 13px;cursor:pointer;transition:background .14s,border-color .14s,color .14s}
    .qr-chip:hover{border-color:var(--stone,#7C7068)}
    .qr-chip:focus-visible{outline:2px solid var(--coral,#F0623C);outline-offset:2px}
    .qr-chip.is-active{background:var(--coral-faint,rgba(240,98,60,.08));border-color:var(--coral,#F0623C);color:var(--coral-deep,#D2491F)}
    .qr-textarea{width:100%;min-height:104px;resize:vertical;padding:12px 14px;border-radius:12px;border:1.5px solid var(--border-strong,#E0D3C4);background:var(--cream,#FBF5EE);font-family:var(--san,system-ui,sans-serif);font-size:14px;line-height:1.6;color:var(--ink,#241B16);transition:border-color .15s,box-shadow .15s}
    .qr-textarea:focus{outline:none;border-color:var(--coral,#F0623C);box-shadow:0 0 0 3px var(--coral-faint,rgba(240,98,60,.08))}
    .qr-textarea::placeholder{color:var(--stone-light,#A99E95)}
    .qr-err{display:none;margin-top:9px;font-family:var(--san,system-ui,sans-serif);font-size:12.5px;font-weight:600;color:var(--wrong,#C0392B)}
    .qr-err.show{display:block}
    .qr-foot{display:flex;justify-content:flex-end;gap:9px;margin-top:20px}
    .qr-b{font-family:var(--san,system-ui,sans-serif);font-size:13.5px;font-weight:700;letter-spacing:-.01em;padding:10px 18px;border-radius:10px;border:1.5px solid transparent;cursor:pointer;transition:background .16s,border-color .16s,transform .16s}
    .qr-b:focus-visible{outline:2px solid var(--coral,#F0623C);outline-offset:2px}
    .qr-b-ghost{background:transparent;color:var(--stone,#7C7068);border-color:var(--border-strong,#E0D3C4)}
    .qr-b-ghost:hover{color:var(--ink,#241B16);border-color:var(--stone,#7C7068)}
    .qr-b-send{background:var(--coral,#F0623C);color:#fff;border-color:var(--coral,#F0623C)}
    .qr-b-send:hover{background:var(--coral-deep,#D2491F);transform:translateY(-1px)}
    .qr-b-send[disabled]{opacity:.6;cursor:progress;transform:none}

    .qr-done{text-align:center;padding:14px 6px 4px}
    .qr-done-mark{width:46px;height:46px;border-radius:50%;background:var(--coral-faint,rgba(240,98,60,.08));display:flex;align-items:center;justify-content:center;margin:0 auto 14px}
    .qr-done-mark svg{width:22px;height:22px;stroke:var(--coral,#F0623C);fill:none;stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round}
    .qr-done h3{font-family:var(--san,system-ui,sans-serif);font-size:17px;font-weight:800;letter-spacing:-.02em;color:var(--ink,#241B16);margin-bottom:5px}
    .qr-done p{font-family:var(--san,system-ui,sans-serif);font-size:13px;line-height:1.55;color:var(--stone,#7C7068)}

    @media (prefers-reduced-motion:reduce){.qr-btn,.qr-overlay,.qr-dialog,.qr-b-send{transition:none}.qr-dialog{transform:none}}
    `;
    document.head.appendChild(s);
  }

  /* --- the one shared modal --- */
  let modal = null;
  let ctx = null;          // { questionId, userId, btn }
  let lastFocus = null;

  function buildModal() {
    if (modal) return modal;
    const o = document.createElement('div');
    o.className = 'qr-overlay';
    o.hidden = true;
    o.innerHTML = `
      <div class="qr-dialog" role="dialog" aria-modal="true" aria-labelledby="qr-title">
        <div data-form>
          <div class="qr-head">
            <div class="qr-title" id="qr-title">Report a problem</div>
            <button class="qr-x" type="button" data-close aria-label="Close">
              <svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
          <p class="qr-intro">Tell us what looks wrong. This goes to the PainRevision team — it won't change your answer or score.</p>
          <span class="qr-label">What's the issue?</span>
          <div class="qr-chips" data-chips>
            ${REASONS.map(([v, l]) => `<button class="qr-chip" type="button" data-reason="${v}">${l}</button>`).join('')}
          </div>
          <span class="qr-label">Details</span>
          <textarea class="qr-textarea" data-comment placeholder="Describe the problem — quote the part that's wrong if you can." maxlength="2000"></textarea>
          <div class="qr-err" data-err></div>
          <div class="qr-foot">
            <button class="qr-b qr-b-ghost" type="button" data-close>Cancel</button>
            <button class="qr-b qr-b-send" type="button" data-send>Send report</button>
          </div>
        </div>
        <div class="qr-done" data-done hidden>
          <div class="qr-done-mark">
            <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <h3>Report sent</h3>
          <p>Thanks — the team will take a look.</p>
        </div>
      </div>`;
    document.body.appendChild(o);
    modal = o;

    const dialog = o.querySelector('.qr-dialog');
    const chips = o.querySelector('[data-chips]');
    const comment = o.querySelector('[data-comment]');
    const errEl = o.querySelector('[data-err]');
    const sendBtn = o.querySelector('[data-send]');

    o.addEventListener('mousedown', e => { if (e.target === o) close(); });
    o.querySelectorAll('[data-close]').forEach(b => b.addEventListener('click', close));
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && !o.hidden) close();
    });
    dialog.addEventListener('keydown', e => {
      if (e.key !== 'Tab') return;
      const f = [...dialog.querySelectorAll('button,textarea,[href]')].filter(el => !el.disabled && el.offsetParent !== null);
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });

    chips.addEventListener('click', e => {
      const chip = e.target.closest('.qr-chip');
      if (!chip) return;
      const on = chip.classList.contains('is-active');
      chips.querySelectorAll('.qr-chip').forEach(c => c.classList.remove('is-active'));
      if (!on) chip.classList.add('is-active');
    });

    comment.addEventListener('input', () => errEl.classList.remove('show'));
    sendBtn.addEventListener('click', submit);

    return modal;
  }

  function currentReason() {
    const active = modal.querySelector('.qr-chip.is-active');
    return active ? active.dataset.reason : null;
  }

  function open(questionId, userId, btn) {
    buildModal();
    injectStyles();
    ctx = { questionId, userId, btn };
    lastFocus = btn;

    modal.querySelector('[data-form]').hidden = false;
    modal.querySelector('[data-done]').hidden = true;
    modal.querySelectorAll('.qr-chip').forEach(c => c.classList.remove('is-active'));
    const comment = modal.querySelector('[data-comment]');
    comment.value = '';
    const err = modal.querySelector('[data-err]');
    err.classList.remove('show');
    err.textContent = '';
    const sendBtn = modal.querySelector('[data-send]');
    sendBtn.disabled = false;
    sendBtn.textContent = 'Send report';

    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => {
      modal.classList.add('open');
      comment.focus();
    });
  }

  function close() {
    if (!modal || modal.hidden) return;
    modal.classList.remove('open');
    document.body.style.overflow = '';
    const done = () => {
      modal.hidden = true;
      modal.removeEventListener('transitionend', done);
    };
    modal.addEventListener('transitionend', done);
    setTimeout(done, 260);
    if (lastFocus && document.contains(lastFocus)) lastFocus.focus();
  }

  function markReported(btn) {
    if (!btn) return;
    btn.classList.add('is-reported');
    btn.disabled = true;
    btn.querySelector('[data-qr-text]').textContent = 'Reported';
    btn.setAttribute('aria-label', 'You have reported this question');
  }

  async function submit() {
    if (!ctx) return;
    const comment = modal.querySelector('[data-comment]');
    const errEl = modal.querySelector('[data-err]');
    const sendBtn = modal.querySelector('[data-send]');
    const text = comment.value.trim();

    if (text.length < MIN_COMMENT) {
      errEl.textContent = 'Add a sentence or two on what looks wrong.';
      errEl.classList.add('show');
      comment.focus();
      return;
    }

    sendBtn.disabled = true;
    sendBtn.textContent = 'Sending…';

    const row = {
      question_id: ctx.questionId,
      user_id: ctx.userId || null,
      reason: currentReason(),
      comment: text,
      status: 'open'
    };
    const { error } = await sb.from('question_reports').insert(row);

    if (error) {
      console.error('Could not file report:', error);
      errEl.textContent = 'Could not send just now — check your connection and try again.';
      errEl.classList.add('show');
      sendBtn.disabled = false;
      sendBtn.textContent = 'Send report';
      return;
    }

    rememberReported(ctx.questionId);
    markReported(ctx.btn);
    modal.querySelector('[data-form]').hidden = true;
    modal.querySelector('[data-done]').hidden = false;
    setTimeout(close, 1500);
  }

  function attach(card, opts) {
    opts = opts || {};
    if (!card || card.__qrAttached || !opts.questionId) return;
    card.__qrAttached = true;
    injectStyles();
    const { userId, questionId } = opts;

    const meta = card.querySelector('.q-meta');
    if (!meta) return;

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'qr-btn';
    btn.innerHTML = `
      <svg class="qr-btn-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
      <span data-qr-text>Report</span>`;

    if (reportedSet().has(questionId)) markReported(btn);
    else btn.addEventListener('click', () => open(questionId, userId, btn));

    // Sit at the front of the action cluster — just left of bookmark / notes /
    // flag. When the card has none of those (e.g. the public teaser), park it
    // at the far end of the meta row instead.
    const anchor = meta.querySelector('.bookmark-btn, .qn-btn, .flag-btn');
    if (anchor) meta.insertBefore(btn, anchor);
    else { btn.style.marginLeft = 'auto'; meta.appendChild(btn); }
  }

  global.QuestionReport = { attach };
})(window);
