/* ===== RESET PROGRESS MODAL =====
   Shared by dashboard.html and my-progress.html. Self-injecting (DOM + CSS),
   mirroring the lightbox pattern in question-engine.js — a host page only needs
   to load this file (after supabase-client.js) and call:

     ResetProgress.open({ userId, onComplete })

   The user picks what to wipe — answer history (all, or only the answers they
   got wrong), bookmarks, exam date — sees a running count of what will go, then
   has to clear an explicit "this can't be undone" step before anything is
   deleted. onComplete() fires once, after a successful delete. */
(function (global) {
  let els = null;
  let state = null; // { userId, onComplete, counts, sel, busy }

  /* ----- styling (uses the design tokens both host pages already define) ----- */
  function injectStyles() {
    if (document.getElementById('rp-styles')) return;
    const s = document.createElement('style');
    s.id = 'rp-styles';
    s.textContent = `
    .rp-overlay{position:fixed;inset:0;background:rgba(36,27,22,.5);display:none;align-items:center;justify-content:center;z-index:400;padding:20px}
    .rp-overlay.open{display:flex}
    .rp-card{background:var(--surface);border-radius:22px;width:100%;max-width:430px;box-shadow:var(--shadow);overflow:hidden;font-family:var(--san);color:var(--ink)}
    .rp-body{padding:28px 28px 22px}
    .rp-eyebrow{font-family:var(--mono);font-size:11px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:var(--coral);display:block;margin-bottom:6px}
    .rp-title{font-size:20px;font-weight:800;letter-spacing:-.02em;margin-bottom:6px}
    .rp-sub{font-size:13.5px;color:var(--stone);line-height:1.55;margin-bottom:18px}
    .rp-opt{display:flex;gap:14px;align-items:flex-start;padding:14px 0;border-top:1px solid var(--border)}
    .rp-opt:first-of-type{border-top:none;padding-top:2px}
    .rp-opt-main{flex:1;min-width:0}
    .rp-opt-label{font-size:14px;font-weight:700;color:var(--ink)}
    .rp-opt-help{font-size:12.5px;color:var(--stone);line-height:1.5;margin-top:3px}
    .rp-switch{position:relative;width:42px;height:25px;flex-shrink:0;border-radius:999px;border:none;background:var(--border-strong);cursor:pointer;transition:background .18s;padding:0;margin-top:2px}
    .rp-switch::after{content:'';position:absolute;top:3px;left:3px;width:19px;height:19px;border-radius:50%;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,.25);transition:transform .18s}
    .rp-switch[aria-checked="true"]{background:var(--coral)}
    .rp-switch[aria-checked="true"]::after{transform:translateX(17px)}
    .rp-switch:disabled{cursor:not-allowed;opacity:.4}
    .rp-switch:focus-visible{outline:2px solid var(--coral);outline-offset:2px}
    .rp-subs{display:flex;gap:8px;margin-top:12px}
    .rp-subs[hidden]{display:none}
    .rp-pill{flex:1;padding:9px 10px;border-radius:10px;border:1.5px solid var(--border);background:var(--surface);font-family:var(--san);font-size:12.5px;font-weight:600;color:var(--stone);cursor:pointer;transition:border-color .15s,background .15s,color .15s}
    .rp-pill.sel{border-color:var(--coral);background:var(--coral-faint);color:var(--coral-deep)}
    .rp-pill:focus-visible{outline:2px solid var(--coral);outline-offset:2px}
    .rp-summary{margin-top:18px;padding:12px 14px;border-radius:12px;background:var(--surface-warm);border:1px solid var(--border);font-size:12.5px;color:var(--stone);line-height:1.55}
    .rp-summary strong{color:var(--ink);font-weight:700}
    .rp-actions{display:flex;gap:10px;padding:16px 28px;background:var(--surface-warm);border-top:1px solid var(--border)}
    .rp-btn{flex:1;display:inline-flex;align-items:center;justify-content:center;gap:7px;padding:12px 18px;border-radius:999px;font-family:var(--san);font-size:14px;font-weight:700;letter-spacing:-.01em;cursor:pointer;border:2px solid transparent;transition:transform .18s,background .18s,border-color .18s}
    .rp-btn:disabled{opacity:.5;cursor:not-allowed}
    .rp-btn-ghost{background:transparent;color:var(--stone);border-color:var(--border-strong)}
    .rp-btn-ghost:hover:not(:disabled){color:var(--ink);border-color:var(--stone)}
    .rp-btn-primary{background:var(--coral);color:#fff;border-color:var(--coral)}
    .rp-btn-primary:hover:not(:disabled){background:var(--coral-deep);border-color:var(--coral-deep);transform:translateY(-1px)}
    .rp-btn-danger{background:var(--wrong);color:#fff;border-color:var(--wrong)}
    .rp-btn-danger:hover:not(:disabled){background:#a52d21;border-color:#a52d21;transform:translateY(-1px)}
    .rp-btn:focus-visible{outline:2px solid var(--coral);outline-offset:2px}
    .rp-warn-icon{width:48px;height:48px;border-radius:14px;background:rgba(192,57,43,.1);display:flex;align-items:center;justify-content:center;margin-bottom:16px}
    .rp-warn-icon svg{width:24px;height:24px;stroke:var(--wrong);fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
    .rp-error{margin-top:14px;font-size:12.5px;color:var(--wrong);font-weight:600}
    .rp-error[hidden]{display:none}
    @media (prefers-reduced-motion:reduce){.rp-switch,.rp-switch::after,.rp-btn{transition:none}}
    `;
    document.head.appendChild(s);
  }

  function build() {
    injectStyles();
    if (els) return;
    const overlay = document.createElement('div');
    overlay.className = 'rp-overlay';
    overlay.innerHTML = `
      <div class="rp-card" role="dialog" aria-modal="true" aria-labelledby="rp-title">
        <div class="rp-step" data-step="choose">
          <div class="rp-body">
            <span class="rp-eyebrow">Reset progress</span>
            <h2 class="rp-title" id="rp-title">Choose what to clear</h2>
            <p class="rp-sub">Pick the data you want to permanently delete. Everything you don't select stays exactly as it is.</p>

            <div class="rp-opt">
              <div class="rp-opt-main">
                <div class="rp-opt-label">Answer history &amp; scores</div>
                <div class="rp-opt-help">Your attempts, accuracy and coverage — what feeds the dashboard ring and My Progress.</div>
                <div class="rp-subs" id="rp-subs">
                  <button class="rp-pill sel" type="button" data-scope="all">All answers</button>
                  <button class="rp-pill" type="button" data-scope="incorrect">Only incorrect</button>
                </div>
              </div>
              <button class="rp-switch" id="rp-sw-history" role="switch" aria-checked="true" aria-label="Reset answer history and scores"></button>
            </div>

            <div class="rp-opt">
              <div class="rp-opt-main">
                <div class="rp-opt-label">Bookmarked questions</div>
                <div class="rp-opt-help">Empties your saved-questions list.</div>
              </div>
              <button class="rp-switch" id="rp-sw-bookmarks" role="switch" aria-checked="true" aria-label="Delete bookmarked questions"></button>
            </div>

            <div class="rp-opt">
              <div class="rp-opt-main">
                <div class="rp-opt-label">Personal notes</div>
                <div class="rp-opt-help">Deletes every note you've written on a question.</div>
              </div>
              <button class="rp-switch" id="rp-sw-notes" role="switch" aria-checked="false" aria-label="Delete personal notes"></button>
            </div>

            <div class="rp-opt">
              <div class="rp-opt-main">
                <div class="rp-opt-label">Exam date</div>
                <div class="rp-opt-help">Removes your FFPMRCA exam date and the countdown.</div>
              </div>
              <button class="rp-switch" id="rp-sw-exam" role="switch" aria-checked="false" aria-label="Clear exam date"></button>
            </div>

            <div class="rp-summary" id="rp-summary">Checking what you have&hellip;</div>
          </div>
          <div class="rp-actions">
            <button class="rp-btn rp-btn-ghost" id="rp-cancel" type="button">Cancel</button>
            <button class="rp-btn rp-btn-primary" id="rp-continue" type="button" disabled>Continue</button>
          </div>
        </div>

        <div class="rp-step" data-step="confirm" hidden>
          <div class="rp-body">
            <div class="rp-warn-icon"><svg viewBox="0 0 24 24"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg></div>
            <h2 class="rp-title">This can't be undone</h2>
            <p class="rp-sub" id="rp-confirm-text"></p>
            <div class="rp-error" id="rp-error" hidden></div>
          </div>
          <div class="rp-actions">
            <button class="rp-btn rp-btn-ghost" id="rp-back" type="button">Go back</button>
            <button class="rp-btn rp-btn-danger" id="rp-delete" type="button">Delete permanently</button>
          </div>
        </div>
      </div>`;
    document.body.appendChild(overlay);

    els = {
      overlay,
      stepChoose: overlay.querySelector('[data-step="choose"]'),
      stepConfirm: overlay.querySelector('[data-step="confirm"]'),
      subs: overlay.querySelector('#rp-subs'),
      swHistory: overlay.querySelector('#rp-sw-history'),
      swBookmarks: overlay.querySelector('#rp-sw-bookmarks'),
      swNotes: overlay.querySelector('#rp-sw-notes'),
      swExam: overlay.querySelector('#rp-sw-exam'),
      summary: overlay.querySelector('#rp-summary'),
      cancel: overlay.querySelector('#rp-cancel'),
      continue: overlay.querySelector('#rp-continue'),
      back: overlay.querySelector('#rp-back'),
      delete: overlay.querySelector('#rp-delete'),
      confirmText: overlay.querySelector('#rp-confirm-text'),
      error: overlay.querySelector('#rp-error')
    };

    els.swHistory.addEventListener('click', () => toggle('history'));
    els.swBookmarks.addEventListener('click', () => toggle('bookmarks'));
    els.swNotes.addEventListener('click', () => toggle('notes'));
    els.swExam.addEventListener('click', () => toggle('exam'));
    els.subs.querySelectorAll('.rp-pill').forEach(pill => {
      pill.addEventListener('click', () => { state.sel.historyScope = pill.dataset.scope; refresh(); });
    });
    els.cancel.addEventListener('click', close);
    els.back.addEventListener('click', () => showStep('choose'));
    els.continue.addEventListener('click', goConfirm);
    els.delete.addEventListener('click', runDelete);
    els.overlay.addEventListener('click', e => { if (e.target === els.overlay && !state.busy) close(); });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && els.overlay.classList.contains('open') && !state.busy) close();
    });
  }

  function toggle(key) {
    const sw = { history: els.swHistory, bookmarks: els.swBookmarks, notes: els.swNotes, exam: els.swExam }[key];
    if (sw.disabled) return;
    state.sel[key] = !state.sel[key];
    refresh();
  }

  function showStep(name) {
    els.stepChoose.hidden = name !== 'choose';
    els.stepConfirm.hidden = name !== 'confirm';
    els.error.hidden = true;
  }

  function close() {
    els.overlay.classList.remove('open');
    document.body.style.overflow = '';
    state.busy = false;
  }

  /* ----- what's actually there to delete ----- */
  async function loadCounts(userId) {
    const [ansRes, bmRes, notesRes, profRes] = await Promise.all([
      sb.from('attempt_answers')
        .select('question_id, is_correct, attempts!inner(user_id)')
        .eq('attempts.user_id', userId),
      sb.from('bookmarks').select('*', { count: 'exact', head: true }).eq('user_id', userId),
      sb.from('question_notes').select('*', { count: 'exact', head: true }).eq('user_id', userId).neq('note', ''),
      sb.from('profiles').select('exam_date').eq('id', userId).maybeSingle()
    ]);
    const rows = ansRes.data || [];
    return {
      answers: rows.length,
      questions: new Set(rows.map(r => r.question_id)).size,
      incorrect: rows.filter(r => r.is_correct === false).length,
      bookmarks: bmRes.count || 0,
      notes: notesRes.count || 0,
      examDate: (profRes.data && profRes.data.exam_date) || null
    };
  }

  /* ----- one line per thing that will be deleted, count-aware ----- */
  function summaryParts() {
    const c = state.counts, sel = state.sel, out = [];
    if (sel.history) {
      if (sel.historyScope === 'incorrect') {
        if (c.incorrect > 0) out.push(`<strong>${c.incorrect}</strong> incorrect answer${c.incorrect === 1 ? '' : 's'}`);
      } else if (c.answers > 0) {
        out.push(`<strong>${c.answers}</strong> answer${c.answers === 1 ? '' : 's'} across <strong>${c.questions}</strong> question${c.questions === 1 ? '' : 's'}`);
      }
    }
    if (sel.bookmarks && c.bookmarks > 0) out.push(`<strong>${c.bookmarks}</strong> bookmark${c.bookmarks === 1 ? '' : 's'}`);
    if (sel.notes && c.notes > 0) out.push(`<strong>${c.notes}</strong> note${c.notes === 1 ? '' : 's'}`);
    if (sel.exam && c.examDate) out.push('your <strong>exam date</strong>');
    return out;
  }

  function syncSwitches() {
    const c = state.counts || {};
    setSwitch(els.swHistory, state.sel.history, c.answers > 0);
    setSwitch(els.swBookmarks, state.sel.bookmarks, c.bookmarks > 0);
    setSwitch(els.swNotes, state.sel.notes, c.notes > 0);
    setSwitch(els.swExam, state.sel.exam, !!c.examDate);
    els.subs.hidden = !state.sel.history || !(c.answers > 0);
    els.subs.querySelectorAll('.rp-pill').forEach(p => {
      p.classList.toggle('sel', p.dataset.scope === state.sel.historyScope);
    });
  }

  function setSwitch(sw, on, enabled) {
    sw.disabled = !enabled;
    sw.setAttribute('aria-checked', String(!!on && !!enabled));
  }

  function refresh() {
    const c = state.counts;
    if (!c) return;
    // A switch with nothing behind it can't be on.
    if (!(c.answers > 0)) state.sel.history = false;
    if (!(c.bookmarks > 0)) state.sel.bookmarks = false;
    if (!(c.notes > 0)) state.sel.notes = false;
    if (!c.examDate) state.sel.exam = false;
    syncSwitches();

    if (!c.answers && !c.bookmarks && !c.notes && !c.examDate) {
      els.summary.innerHTML = 'You don’t have any progress to reset yet.';
      els.continue.disabled = true;
      return;
    }
    const parts = summaryParts();
    els.summary.innerHTML = parts.length
      ? 'Will delete: ' + parts.join(' &middot; ') + '.'
      : 'Nothing to delete with these options — flip a switch above.';
    els.continue.disabled = parts.length === 0;
  }

  function goConfirm() {
    const parts = summaryParts();
    if (!parts.length) return;
    els.confirmText.innerHTML = `You’re about to permanently delete ${parts.join(' and ')}. This cannot be reversed.`;
    showStep('confirm');
  }

  async function runDelete() {
    const { userId, sel } = state;
    state.busy = true;
    els.delete.disabled = true;
    els.back.disabled = true;
    els.delete.textContent = 'Deleting…';
    els.error.hidden = true;
    const errors = [];

    try {
      if (sel.history && sel.historyScope === 'all') {
        // attempt_answers cascades from attempts, so this clears both.
        const { error } = await sb.from('attempts').delete().eq('user_id', userId);
        if (error) errors.push(error.message);
      } else if (sel.history && sel.historyScope === 'incorrect') {
        const { data: atts, error: e1 } = await sb.from('attempts').select('id').eq('user_id', userId);
        if (e1) errors.push(e1.message);
        const ids = (atts || []).map(a => a.id);
        if (!errors.length && ids.length) {
          const { error: e2 } = await sb.from('attempt_answers')
            .delete().in('attempt_id', ids).eq('is_correct', false);
          if (e2) errors.push(e2.message);
          if (!e2) {
            // Drop attempts left with no answers so they don't linger as empty rows.
            const { data: left } = await sb.from('attempt_answers').select('attempt_id').in('attempt_id', ids);
            const keep = new Set((left || []).map(r => r.attempt_id));
            const orphans = ids.filter(id => !keep.has(id));
            if (orphans.length) await sb.from('attempts').delete().in('id', orphans);
          }
        }
      }

      if (!errors.length && sel.bookmarks) {
        const { error } = await sb.from('bookmarks').delete().eq('user_id', userId);
        if (error) errors.push(error.message);
      }

      if (!errors.length && sel.notes) {
        const { error } = await sb.from('question_notes').delete().eq('user_id', userId);
        if (error) errors.push(error.message);
      }

      if (!errors.length && sel.exam && state.counts.examDate) {
        const { error } = await sb.from('profiles').update({ exam_date: null }).eq('id', userId);
        if (error) errors.push(error.message);
      }
    } catch (err) {
      errors.push(err.message || String(err));
    }

    els.delete.disabled = false;
    els.back.disabled = false;
    els.delete.textContent = 'Delete permanently';
    state.busy = false;

    if (errors.length) {
      els.error.hidden = false;
      els.error.textContent = 'Couldn’t finish: ' + errors[0];
      return;
    }
    const done = state.onComplete;
    close();
    if (typeof done === 'function') done();
  }

  async function open(opts) {
    opts = opts || {};
    if (!opts.userId) { console.error('ResetProgress.open needs a userId'); return; }
    build();
    state = {
      userId: opts.userId,
      onComplete: opts.onComplete,
      counts: null,
      busy: false,
      sel: { history: true, historyScope: 'all', bookmarks: true, notes: false, exam: false }
    };
    showStep('choose');
    els.summary.innerHTML = 'Checking what you have…';
    els.continue.disabled = true;
    els.delete.disabled = false;
    els.back.disabled = false;
    els.delete.textContent = 'Delete permanently';
    els.overlay.classList.add('open');
    document.body.style.overflow = 'hidden';

    const counts = await loadCounts(opts.userId);
    if (!els.overlay.classList.contains('open')) return; // closed while loading
    state.counts = counts;
    refresh();
  }

  global.ResetProgress = { open };
})(window);
