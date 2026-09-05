/* ===== PER-QUESTION NOTES =====
   A private, auto-saving rich-text note attached to a rendered question card.
   Self-injecting (DOM + CSS) like question-engine.js's lightbox. A host page
   loads this file (after supabase-client.js) and, for each rendered card:

     QuestionNotes.attach(cardEl, { userId, questionId, startOpen });

   - adds a "Notes" toggle to the card's .q-meta row (filled dot = a note
     exists), and a collapsible editor panel at the end of .q-card-body
   - loads any existing note, and saves edits automatically (debounced) — there
     is no save button
   - "Clear" permanently deletes the note for that one question

   Formatting: bold / italic / underline, four text sizes, text colour and
   highlight — all via the browser's built-in editing commands, stored as HTML
   in question_notes.note. No drawing (yet). */
(function (global) {
  const DEBOUNCE_MS = 600;

  const TEXT_COLOURS = [
    ['Default', '#241B16'], ['Coral', '#D2491F'], ['Blue', '#1A4A8A'],
    ['Green', '#1A8A4A'], ['Red', '#C0392B']
  ];
  const HIGHLIGHTS = [
    ['Yellow', '#FDE68A'], ['Green', '#BBF7D0'], ['Pink', '#FBCFE8'], ['Blue', '#BFDBFE']
  ];
  const SIZES = [['Small', '2'], ['Normal', '3'], ['Large', '5'], ['Huge', '6']];

  function injectStyles() {
    if (document.getElementById('qn-styles')) return;
    const s = document.createElement('style');
    s.id = 'qn-styles';
    s.textContent = `
    .qn-btn{position:relative;display:inline-flex;align-items:center;justify-content:center;width:34px;height:34px;border-radius:10px;border:1.5px solid var(--border-strong);background:var(--surface);color:var(--stone);cursor:pointer;transition:color .18s,border-color .18s,background .18s,transform .18s}
    .qn-btn:hover{border-color:var(--stone);color:var(--ink-soft);transform:translateY(-1px)}
    .qn-btn:active{transform:translateY(0)}
    .qn-btn:focus-visible{outline:2px solid var(--coral);outline-offset:2px}
    .qn-btn .qn-btn-icon{width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
    .qn-btn[aria-expanded="true"]{border-color:rgba(240,98,60,.4);background:var(--coral-faint);color:var(--coral)}
    .qn-dot{position:absolute;top:-3px;right:-3px;width:9px;height:9px;border-radius:50%;background:var(--coral);border:2px solid var(--surface)}
    .qn-dot[hidden]{display:none}
    .qn-btn::after{content:attr(data-tip);position:absolute;top:calc(100% + 9px);right:0;white-space:nowrap;background:var(--ink);color:var(--cream);font-size:12px;font-weight:600;letter-spacing:-.01em;padding:6px 10px;border-radius:8px;opacity:0;transform:translateY(-4px);pointer-events:none;transition:opacity .16s,transform .16s;box-shadow:var(--shadow-sm);z-index:6}
    .qn-btn::before{content:'';position:absolute;top:calc(100% + 4px);right:12px;border:5px solid transparent;border-bottom-color:var(--ink);opacity:0;transition:opacity .16s;z-index:6}
    .qn-btn:hover::after,.qn-btn:focus-visible::after{opacity:1;transform:translateY(0)}
    .qn-btn:hover::before,.qn-btn:focus-visible::before{opacity:1}

    .qn-wrap{margin-top:24px;padding-top:20px;border-top:1px dashed var(--border-strong)}
    .qn-wrap[hidden]{display:none}
    .qn-head{display:flex;align-items:center;gap:8px;margin-bottom:10px}
    .qn-head-label{font-family:var(--mono);font-size:10.5px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:var(--coral)}
    .qn-status{font-size:11.5px;font-weight:600;color:var(--stone-light);margin-left:auto;transition:opacity .3s}
    .qn-status.err{color:var(--wrong)}
    .qn-clear{font-family:var(--san);font-size:11.5px;font-weight:600;color:var(--stone-light);background:none;border:none;cursor:pointer;text-decoration:underline;text-underline-offset:2px;padding:2px 4px}
    .qn-clear:hover{color:var(--wrong)}
    .qn-clear:focus-visible{outline:2px solid var(--coral);outline-offset:2px}

    .qn-toolbar{display:flex;flex-wrap:wrap;align-items:center;gap:5px;padding:7px 8px;border:1.5px solid var(--border);border-bottom:none;border-radius:12px 12px 0 0;background:var(--surface-warm)}
    .qn-tb{min-width:28px;height:28px;padding:0 7px;display:inline-flex;align-items:center;justify-content:center;border-radius:7px;border:1.5px solid transparent;background:transparent;font-family:var(--san);font-size:13px;color:var(--ink-soft);cursor:pointer;transition:background .14s,border-color .14s}
    .qn-tb:hover{background:var(--surface);border-color:var(--border)}
    .qn-tb.active{background:var(--coral-faint);border-color:rgba(240,98,60,.35);color:var(--coral-deep)}
    .qn-tb:focus-visible{outline:2px solid var(--coral);outline-offset:1px}
    .qn-tb.size{font-weight:700}
    .qn-tb.size[data-size="2"]{font-size:10px}
    .qn-tb.size[data-size="3"]{font-size:12px}
    .qn-tb.size[data-size="5"]{font-size:15px}
    .qn-tb.size[data-size="6"]{font-size:18px}
    .qn-sep{width:1px;height:18px;background:var(--border-strong);margin:0 3px}
    .qn-swatch{width:20px;height:20px;border-radius:6px;border:1.5px solid rgba(0,0,0,.12);cursor:pointer;padding:0;transition:transform .12s}
    .qn-swatch:hover{transform:scale(1.12)}
    .qn-swatch:focus-visible{outline:2px solid var(--coral);outline-offset:2px}
    .qn-swatch.hl{border-radius:4px}

    .qn-editor{border:1.5px solid var(--border);border-radius:0 0 12px 12px;background:var(--surface);padding:14px 16px;min-height:110px;max-height:340px;overflow-y:auto;font-family:var(--san);font-size:14.5px;line-height:1.65;color:var(--ink);outline:none}
    .qn-editor:focus{border-color:rgba(240,98,60,.45);box-shadow:0 0 0 3px var(--coral-faint)}
    .qn-editor:empty::before{content:attr(data-placeholder);color:var(--stone-light)}
    .qn-editor p{margin:0 0 8px}
    .qn-editor:last-child{margin-bottom:0}

    @media (prefers-reduced-motion:reduce){.qn-btn,.qn-btn::after,.qn-swatch{transition:none}}
    `;
    document.head.appendChild(s);
  }

  /* strip anything executable before trusting stored HTML back into the DOM */
  function sanitize(html) {
    const t = document.createElement('template');
    t.innerHTML = html || '';
    t.content.querySelectorAll('script,style,iframe,object,embed,link,meta,form').forEach(n => n.remove());
    t.content.querySelectorAll('*').forEach(el => {
      [...el.attributes].forEach(a => {
        const n = a.name.toLowerCase();
        if (n.startsWith('on') || (n === 'href' && /^\s*javascript:/i.test(a.value)) || n === 'srcdoc') {
          el.removeAttribute(a.name);
        }
      });
    });
    return t.innerHTML;
  }

  function isBlank(html) {
    return (html || '').replace(/<br\s*\/?>/gi, '').replace(/&nbsp;/gi, ' ')
      .replace(/<[^>]*>/g, '').trim() === '';
  }

  async function attach(card, opts) {
    opts = opts || {};
    if (!card || card.__qnAttached || !opts.userId || !opts.questionId) return;
    card.__qnAttached = true;
    injectStyles();
    const { userId, questionId } = opts;

    /* --- toggle button in the meta row --- */
    const meta = card.querySelector('.q-meta');
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'qn-btn';
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-label', 'Notes for this question');
    btn.dataset.tip = 'Private notes for this question';
    btn.innerHTML = `<svg class="qn-btn-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg><span class="qn-dot" hidden></span>`;
    if (meta) meta.appendChild(btn);
    const dot = btn.querySelector('.qn-dot');

    /* --- editor panel at the end of the card body --- */
    const body = card.querySelector('.q-card-body');
    const wrap = document.createElement('div');
    wrap.className = 'qn-wrap';
    wrap.hidden = true;
    wrap.innerHTML = `
      <div class="qn-head">
        <span class="qn-head-label">Your notes</span>
        <span class="qn-status" data-status></span>
        <button class="qn-clear" type="button" data-clear>Clear</button>
      </div>
      <div class="qn-toolbar" data-toolbar>
        <button class="qn-tb" type="button" data-cmd="bold" title="Bold" style="font-weight:800">B</button>
        <button class="qn-tb" type="button" data-cmd="italic" title="Italic" style="font-style:italic">I</button>
        <button class="qn-tb" type="button" data-cmd="underline" title="Underline" style="text-decoration:underline">U</button>
        <span class="qn-sep"></span>
        ${SIZES.map(([label, v]) => `<button class="qn-tb size" type="button" data-size="${v}" title="${label} text">A</button>`).join('')}
        <span class="qn-sep"></span>
        ${TEXT_COLOURS.map(([label, hex]) => `<button class="qn-swatch" type="button" data-fore="${hex}" title="${label} text" style="background:${hex}"></button>`).join('')}
        <span class="qn-sep"></span>
        ${HIGHLIGHTS.map(([label, hex]) => `<button class="qn-swatch hl" type="button" data-hilite="${hex}" title="${label} highlight" style="background:${hex}"></button>`).join('')}
      </div>
      <div class="qn-editor" contenteditable="true" role="textbox" aria-multiline="true" data-editor
           data-placeholder="Write a private note for this question…"></div>`;
    if (body) body.appendChild(wrap);

    const editor = wrap.querySelector('[data-editor]');
    const statusEl = wrap.querySelector('[data-status]');
    const toolbar = wrap.querySelector('[data-toolbar]');
    const clearBtn = wrap.querySelector('[data-clear]');

    let lastSaved = '';
    let saveTimer = null;
    let statusTimer = null;

    function setDot(on) { dot.hidden = !on; }
    function setStatus(kind) {
      clearTimeout(statusTimer);
      statusEl.classList.toggle('err', kind === 'error');
      statusEl.style.opacity = '1';
      if (kind === 'saving') statusEl.textContent = 'Saving…';
      else if (kind === 'saved') {
        statusEl.textContent = 'Saved';
        statusTimer = setTimeout(() => { statusEl.style.opacity = '0'; }, 1400);
      } else if (kind === 'error') statusEl.textContent = 'Couldn’t save — check your connection';
      else statusEl.textContent = '';
    }

    async function save() {
      const raw = editor.innerHTML;
      const value = isBlank(raw) ? '' : raw;
      if (value === lastSaved) { setStatus('saved'); return; }
      setStatus('saving');
      const { error } = await sb.from('question_notes').upsert(
        { user_id: userId, question_id: questionId, note: value, updated_at: new Date().toISOString() },
        { onConflict: 'user_id,question_id' }
      );
      if (error) { console.error('Could not save note:', error); setStatus('error'); return; }
      lastSaved = value;
      setDot(value !== '');
      setStatus('saved');
    }

    function queueSave() {
      setStatus('saving');
      clearTimeout(saveTimer);
      saveTimer = setTimeout(save, DEBOUNCE_MS);
    }

    /* keep the caret/selection in the editor when a toolbar control is used */
    toolbar.addEventListener('mousedown', e => {
      if (e.target.closest('button')) e.preventDefault();
    });
    toolbar.addEventListener('click', e => {
      const el = e.target.closest('button');
      if (!el) return;
      editor.focus();
      try { document.execCommand('styleWithCSS', false, true); } catch (_) {}
      if (el.dataset.cmd) document.execCommand(el.dataset.cmd, false, null);
      else if (el.dataset.size) document.execCommand('fontSize', false, el.dataset.size);
      else if (el.dataset.fore) document.execCommand('foreColor', false, el.dataset.fore);
      else if (el.dataset.hilite) {
        if (!document.execCommand('hiliteColor', false, el.dataset.hilite)) {
          document.execCommand('backColor', false, el.dataset.hilite);
        }
      }
      syncToolbarState();
      queueSave();
    });

    function syncToolbarState() {
      ['bold', 'italic', 'underline'].forEach(cmd => {
        let on = false;
        try { on = document.queryCommandState(cmd); } catch (_) {}
        const b = toolbar.querySelector(`[data-cmd="${cmd}"]`);
        if (b) b.classList.toggle('active', on);
      });
    }

    editor.addEventListener('input', () => { setDot(!isBlank(editor.innerHTML)); queueSave(); });
    editor.addEventListener('keyup', syncToolbarState);
    editor.addEventListener('mouseup', syncToolbarState);
    editor.addEventListener('blur', () => { clearTimeout(saveTimer); save(); });

    clearBtn.addEventListener('click', async () => {
      const hasSomething = !isBlank(editor.innerHTML) || lastSaved !== '';
      if (hasSomething && !window.confirm('Delete your note for this question? This can’t be undone.')) return;
      editor.innerHTML = '';
      setDot(false);
      clearTimeout(saveTimer);
      setStatus('saving');
      const { error } = await sb.from('question_notes').delete()
        .eq('user_id', userId).eq('question_id', questionId);
      if (error) { console.error('Could not clear note:', error); setStatus('error'); return; }
      lastSaved = '';
      setStatus('saved');
      editor.focus();
    });

    function open() {
      body.appendChild(wrap);          // always sit below the explanation
      wrap.hidden = false;
      btn.setAttribute('aria-expanded', 'true');
    }
    function closePanel() {
      wrap.hidden = true;
      btn.setAttribute('aria-expanded', 'false');
    }
    btn.addEventListener('click', () => {
      if (wrap.hidden) { open(); editor.focus(); } else closePanel();
    });

    /* --- load any existing note --- */
    try {
      const { data } = await sb.from('question_notes')
        .select('note').eq('user_id', userId).eq('question_id', questionId).maybeSingle();
      lastSaved = (data && data.note) || '';
    } catch (_) { lastSaved = ''; }
    editor.innerHTML = sanitize(lastSaved);
    setDot(!isBlank(lastSaved));

    if (opts.startOpen || !isBlank(lastSaved)) open();
    if (opts.startOpen) { /* review mode: leave focus with the page, not the editor */ }
  }

  global.QuestionNotes = { attach };
})(window);
