// Shared question rendering engine — renders and wires SBA/MTF/EMQ question
// cards. Used by questions.html (public teaser) and practice.html (the
// logged-in practice/mock exam runner) so the rendering logic lives in one
// place.

const LETTERS = ['A','B','C','D','E','F','G','H'];

function escHtml(s) {
  if (!s) return '';
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#x27;');
}

function wiggleEl(el) {
  el.classList.remove('wiggle');
  void el.offsetWidth;
  el.classList.add('wiggle');
  el.addEventListener('animationend', () => el.classList.remove('wiggle'), { once: true });
}

/* ===== RENDER QUESTION =====
   mode: 'dotd' | 'practice' | 'exam'
   - 'dotd'/'practice': a Reveal Answer button is shown; onReveal(wasCorrect,
     detail) fires once the user reveals.
   - 'exam': no reveal button — answers are just recorded as the user picks
     them. onReveal(status) fires on every change with 'unanswered' |
     'partial' | 'complete'. The question type and category are hidden
     (so they can't be used to guess the answer or navigate by topic during
     a timed exam) until the question is actually revealed. A Flag button
     is also shown, and onFlagChange(flagged) fires whenever it's toggled.
   Always returns a controller: { isRevealed(), getResult(), forceReveal(),
   isFlagged() }. getResult() reads the current answer state without needing
   a reveal. forceReveal() reveals-in-place right now (used to finalize a
   question that was never individually revealed, e.g. a bulk "Submit Set")
   and, unlike the reveal button, works even if the question was left blank
   or incomplete. */
function renderQuestion(q, container, mode, onReveal, onFlagChange) {
  mode = mode || 'dotd';
  container.innerHTML = '';
  const card = document.createElement('div');
  card.className = 'q-card';

  const typeClass = 'q-badge-' + q.type.toLowerCase();
  const hideMeta = mode === 'exam';
  let html = `<div class="q-card-top"></div><div class="q-card-body">
    <div class="q-meta">
      <span class="q-badge ${typeClass}${hideMeta ? ' q-meta-hidden' : ''}">${q.type}</span>
      <span class="q-topic q-badge${hideMeta ? ' q-meta-hidden' : ''}">${escHtml(q.topic)}</span>
      ${mode === 'exam' ? `<button class="flag-btn" type="button" aria-pressed="false">
        <svg class="flag-icon" viewBox="0 0 24 24"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>
        Flag
      </button>` : ''}
    </div>`;

  if (q.type === 'SBA') html += renderSBA(q);
  else if (q.type === 'MTF') html += renderMTF(q);
  else if (q.type === 'EMQ') html += renderEMQ(q);

  html += `</div>`;
  if (mode !== 'exam') {
    html += `<div class="q-actions">
      <button class="btn btn-primary reveal-btn">Reveal Answer</button>
    </div>`;
  }

  card.innerHTML = html;
  container.appendChild(card);

  let flagged = false;
  if (mode === 'exam') {
    const flagBtn = card.querySelector('.flag-btn');
    flagBtn.addEventListener('click', () => {
      flagged = !flagged;
      flagBtn.classList.toggle('active', flagged);
      flagBtn.setAttribute('aria-pressed', String(flagged));
      if (onFlagChange) onFlagChange(flagged);
    });
  }

  let controller;
  if (q.type === 'SBA') controller = wireSBA(card, q, mode, onReveal);
  else if (q.type === 'MTF') controller = wireMTF(card, q, mode, onReveal);
  else if (q.type === 'EMQ') controller = wireEMQ(card, q, mode, onReveal);

  if (controller) controller.isFlagged = () => flagged;
  return controller;
}

/* ===== POST-REVEAL ACTION ROW ===== */
function postRevealActions(card, mode) {
  if (mode === 'practice') {
    card.querySelector('.q-actions').innerHTML = `
      <div class="practice-answered-note">
        <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
        <p>Answered — use the navigation below to continue</p>
      </div>`;
  } else {
    card.querySelector('.q-actions').innerHTML = `
      <div class="tomorrow-note">
        <svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
        <p>Come back tomorrow for the next question.</p>
      </div>`;
  }
}

/* ===== SBA ===== */
function renderSBA(q) {
  let h = `<p class="q-text">${escHtml(q.question)}</p><div class="sba-choices">`;
  q.choices.forEach((c, i) => {
    h += `<div class="sba-option" data-idx="${i}" role="radio" aria-checked="false" tabindex="0">
      <div class="sba-letter">${LETTERS[i]}</div>
      <span class="sba-option-text">${escHtml(c)}</span>
    </div>`;
  });
  return h + `</div>`;
}

function wireSBA(card, q, mode, onReveal) {
  let selected = null;
  let revealed = false;

  card.querySelectorAll('.sba-option').forEach(opt => {
    opt.addEventListener('click', () => {
      if (revealed) return;
      selected = parseInt(opt.dataset.idx);
      card.querySelectorAll('.sba-option').forEach(o => {
        o.classList.toggle('selected', parseInt(o.dataset.idx) === selected);
      });
      if (mode === 'exam' && onReveal) onReveal('complete');
    });
    opt.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); opt.click(); } });
  });

  function doReveal() {
    revealed = true;
    card.querySelectorAll('.q-meta-hidden').forEach(el => el.classList.remove('q-meta-hidden'));
    card.querySelectorAll('.sba-option').forEach(o => {
      const i = parseInt(o.dataset.idx);
      o.classList.remove('selected');
      o.classList.add('locked');
      if (i === q.correct) {
        o.classList.add('correct');
        o.innerHTML = `
          <div class="sba-letter">${LETTERS[i]}</div>
          <span class="sba-option-text">${escHtml(q.choices[i])}</span>
          <svg class="sba-option-icon" viewBox="0 0 24 24" fill="none" stroke="var(--correct)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;
      } else if (i === selected) {
        o.classList.add('wrong');
        o.innerHTML = `
          <div class="sba-letter">${LETTERS[i]}</div>
          <span class="sba-option-text">${escHtml(q.choices[i])}</span>
          <svg class="sba-option-icon" viewBox="0 0 24 24" fill="none" stroke="var(--wrong)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;
      }
    });

    const expDiv = document.createElement('div');
    expDiv.className = 'explanation visible';
    expDiv.innerHTML = `<div class="explanation-label">Explanation</div><div class="explanation-text">${q.explanation || ''}</div>`;
    card.querySelector('.q-card-body').appendChild(expDiv);

    if (card.querySelector('.q-actions')) postRevealActions(card, mode);
  }

  if (mode !== 'exam') {
    card.querySelector('.reveal-btn').addEventListener('click', () => {
      if (revealed) return;
      if (selected === null) {
        card.querySelectorAll('.sba-option').forEach(o => wiggleEl(o));
        wiggleEl(card.querySelector('.reveal-btn'));
        return;
      }
      doReveal();
      if (onReveal) onReveal(selected === q.correct);
    });
  }

  return {
    isRevealed: () => revealed,
    getResult: () => ({
      answered: selected !== null,
      isCorrect: selected === q.correct,
      correct: selected === q.correct ? 1 : 0,
      total: 1
    }),
    forceReveal: (silent) => {
      if (revealed) return;
      doReveal();
      if (!silent && onReveal) onReveal(selected === q.correct);
    }
  };
}

/* ===== MTF ===== */
function renderMTF(q) {
  let h = `<p class="q-stem">${escHtml(q.stem)}</p><div class="mtf-choices">`;
  q.choices.forEach((c, i) => {
    h += `<div class="mtf-row" data-idx="${i}">
      <span class="mtf-letter">${LETTERS[i]}.</span>
      <span class="mtf-statement">${escHtml(c)}</span>
      <div class="mtf-toggles">
        <button class="mtf-toggle" data-val="true">TRUE</button>
        <button class="mtf-toggle" data-val="false">FALSE</button>
      </div>
    </div>`;
  });
  return h + `</div>`;
}

function wireMTF(card, q, mode, onReveal) {
  const selections = new Array(q.choices.length).fill(null);
  let revealed = false;

  function examStatus() {
    const answeredCount = selections.filter(s => s !== null).length;
    if (answeredCount === 0) return 'unanswered';
    if (answeredCount === selections.length) return 'complete';
    return 'partial';
  }

  card.querySelectorAll('.mtf-row').forEach(row => {
    const i = parseInt(row.dataset.idx);
    row.querySelectorAll('.mtf-toggle').forEach(btn => {
      btn.addEventListener('click', () => {
        if (revealed) return;
        const val = btn.dataset.val === 'true';
        selections[i] = val;
        row.querySelectorAll('.mtf-toggle').forEach(b => b.classList.remove('selected-true', 'selected-false'));
        btn.classList.add(val ? 'selected-true' : 'selected-false');
        if (mode === 'exam' && onReveal) onReveal(examStatus());
      });
    });
  });

  function doReveal() {
    revealed = true;
    card.querySelectorAll('.q-meta-hidden').forEach(el => el.classList.remove('q-meta-hidden'));
    let correctCount = 0;
    card.querySelectorAll('.mtf-row').forEach(row => {
      const i = parseInt(row.dataset.idx);
      const correct = q.correct[i];
      const isRight = selections[i] === correct;
      if (isRight) correctCount++;
      row.classList.add(isRight ? 'revealed-correct' : 'revealed-wrong');
      row.querySelectorAll('.mtf-toggle').forEach(b => {
        b.disabled = true;
        b.classList.remove('selected-true', 'selected-false');
        if ((b.dataset.val === 'true') === correct) b.classList.add('correct-answer');
      });
    });
    const totalCount = q.choices.length;

    const expDiv = document.createElement('div');
    expDiv.className = 'explanation visible';
    expDiv.innerHTML = `<div class="explanation-label">Explanation</div><div class="explanation-text">${q.explanation || ''}</div>`;
    card.querySelector('.q-card-body').appendChild(expDiv);

    if (card.querySelector('.q-actions')) postRevealActions(card, mode);
    return { correctCount, totalCount, fullyAnswered: selections.every(s => s !== null) };
  }

  if (mode !== 'exam') {
    card.querySelector('.reveal-btn').addEventListener('click', () => {
      if (revealed) return;
      const unfilledRows = [...card.querySelectorAll('.mtf-row')].filter((_, i) => selections[i] === null);
      if (unfilledRows.length) {
        unfilledRows.forEach(row => wiggleEl(row));
        wiggleEl(card.querySelector('.reveal-btn'));
        return;
      }
      const { correctCount, totalCount, fullyAnswered } = doReveal();
      if (onReveal) onReveal(correctCount === totalCount, { correct: correctCount, total: totalCount, fullyAnswered });
    });
  }

  return {
    isRevealed: () => revealed,
    getResult: () => {
      let correctCount = 0;
      selections.forEach((s, i) => { if (s === q.correct[i]) correctCount++; });
      const total = q.choices.length;
      return {
        answered: selections.some(s => s !== null),
        fullyAnswered: selections.every(s => s !== null),
        isCorrect: correctCount === total,
        correct: correctCount,
        total
      };
    },
    forceReveal: (silent) => {
      if (revealed) return;
      const { correctCount, totalCount, fullyAnswered } = doReveal();
      if (!silent && onReveal) onReveal(correctCount === totalCount, { correct: correctCount, total: totalCount, fullyAnswered });
    }
  };
}

/* ===== EMQ ===== */
function renderEMQ(q) {
  const stemText = q.stem || q.topic;
  let h = `<p class="q-stem">${escHtml(stemText)}</p>
  <p class="emq-lead">${escHtml(q.lead)}</p>
  <div class="emq-options-grid">
    <div class="emq-options-label">Options</div>`;
  q.options.forEach((opt, i) => {
    h += `<div class="emq-opt"><span class="emq-opt-letter">${LETTERS[i]}.</span><span>${escHtml(opt)}</span></div>`;
  });
  h += `</div><div class="emq-questions">`;
  q.questions.forEach((sq, i) => {
    h += `<div class="emq-q-row" data-qidx="${i}">
      <div class="emq-q-num">Question ${i + 1}</div>
      <p class="emq-q-text">${escHtml(sq.question)}</p>
      <select class="emq-select" data-qidx="${i}">
        <option value="">— Select an answer —</option>
        ${q.options.map((opt, oi) => `<option value="${oi}">${LETTERS[oi]}. ${escHtml(opt)}</option>`).join('')}
      </select>
    </div>`;
  });
  return h + `</div>`;
}

function wireEMQ(card, q, mode, onReveal) {
  let revealed = false;

  function examStatus() {
    const selects = [...card.querySelectorAll('.emq-select')];
    const answeredCount = selects.filter(sel => sel.value !== '').length;
    if (answeredCount === 0) return 'unanswered';
    if (answeredCount === selects.length) return 'complete';
    return 'partial';
  }

  if (mode === 'exam') {
    card.querySelectorAll('.emq-select').forEach(sel => {
      sel.addEventListener('change', () => { if (onReveal) onReveal(examStatus()); });
    });
  }

  function doReveal() {
    revealed = true;
    card.querySelectorAll('.q-meta-hidden').forEach(el => el.classList.remove('q-meta-hidden'));
    let correctCount = 0;
    const results = new Array(q.questions.length).fill(false);
    const subAnswered = new Array(q.questions.length).fill(false);
    card.querySelectorAll('.emq-select').forEach(sel => {
      const qi = parseInt(sel.dataset.qidx);
      const sq = q.questions[qi];
      const userVal = parseInt(sel.value);
      const isRight = userVal === sq.correct;
      results[qi] = isRight;
      subAnswered[qi] = sel.value !== '';
      if (isRight) correctCount++;
      const row = card.querySelector(`.emq-q-row[data-qidx="${qi}"]`);
      row.classList.add(isRight ? 'correct-ans' : 'wrong-ans');
      sel.disabled = true;
      const reveal = document.createElement('div');
      reveal.className = 'emq-answer-reveal ' + (isRight ? 'emq-answer-correct' : 'emq-answer-wrong');
      reveal.textContent = (isRight ? '✓ Correct: ' : '✗ Correct: ') + LETTERS[sq.correct] + '. ' + q.options[sq.correct];
      const exp = document.createElement('div');
      exp.className = 'explanation visible';
      exp.style.marginTop = '12px';
      exp.innerHTML = `<div class="explanation-label">Explanation</div><div class="explanation-text">${sq.explanation || ''}</div>`;
      row.appendChild(reveal);
      row.appendChild(exp);
    });
    const totalCount = q.questions.length;
    if (card.querySelector('.q-actions')) postRevealActions(card, mode);
    return { correctCount, totalCount, results, subAnswered };
  }

  if (mode !== 'exam') {
    card.querySelector('.reveal-btn').addEventListener('click', () => {
      if (revealed) return;
      const emptySelects = [...card.querySelectorAll('.emq-select')].filter(sel => sel.value === '');
      if (emptySelects.length) {
        emptySelects.forEach(sel => wiggleEl(sel.closest('.emq-q-row')));
        wiggleEl(card.querySelector('.reveal-btn'));
        return;
      }
      const { correctCount, totalCount, results, subAnswered } = doReveal();
      if (onReveal) onReveal(correctCount === totalCount, { correct: correctCount, total: totalCount, results, subAnswered });
    });
  }

  return {
    isRevealed: () => revealed,
    getResult: () => {
      const selects = [...card.querySelectorAll('.emq-select')];
      const total = q.questions.length;
      const results = new Array(total).fill(false);
      const subAnswered = new Array(total).fill(false);
      let correctCount = 0;
      selects.forEach(sel => {
        const qi = parseInt(sel.dataset.qidx, 10);
        const isRight = sel.value !== '' && parseInt(sel.value, 10) === q.questions[qi].correct;
        results[qi] = isRight;
        subAnswered[qi] = sel.value !== '';
        if (isRight) correctCount++;
      });
      return {
        answered: selects.some(sel => sel.value !== ''),
        subAnswered,
        isCorrect: correctCount === total,
        correct: correctCount,
        total,
        results
      };
    },
    forceReveal: (silent) => {
      if (revealed) return;
      const { correctCount, totalCount, results, subAnswered } = doReveal();
      if (!silent && onReveal) onReveal(correctCount === totalCount, { correct: correctCount, total: totalCount, results, subAnswered });
    }
  };
}
