// The feedback form questions — EDIT THIS ARRAY to change the form.
// feedback.html renders it (via GET /api/submit-feedback?config=1) and
// api/submit-feedback.js validates submissions against it, so this is the
// only place to change.
//
// Unknown keys in a submission (e.g. answers to questions removed from this
// list, from an old cached form) are ignored, not stored.
// type: 'rating' (1-5) | 'choice' (pick one of options) | 'multi' (pick any of
// options) | 'text' (free text, maxLength). Set required: true to force an answer.
export const FEEDBACK_QUESTIONS = [
  { id: 'overall', type: 'rating', label: 'Overall, how would you rate the PainRevision question bank?', required: true },
  { id: 'quality', type: 'rating', label: 'How accurate and useful are the questions and explanations?', required: true },
  { id: 'usability', type: 'rating', label: 'How easy is the site to use?', required: true },
  { id: 'recommend', type: 'choice', label: 'Would you recommend PainRevision to a colleague?', options: ['Definitely', 'Probably', 'Not sure', 'Probably not'], required: true },
  { id: 'improve', type: 'text', label: 'What can we improve on?', maxLength: 1000, required: true },
  { id: 'features', type: 'text', label: 'What other features would you like to see?', maxLength: 1000, required: true },
  { id: 'other', type: 'text', label: 'Anything else you would like to tell us?', maxLength: 1500, required: true },
];

function clean(s, max) {
  return String(s).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').replace(/[<>]/g, '').trim().slice(0, max);
}

// Returns { ok: true, answers } or { ok: false, error, missing?: [question ids] }.
// Empty, whitespace-only and missing answers are all "missing" for a required
// question; every missing id is reported at once.
export function validateAnswers(raw) {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
    return { ok: false, error: 'Please complete the form.', missing: FEEDBACK_QUESTIONS.filter(q => q.required).map(q => q.id) };
  }
  const answers = {};
  const missing = [];
  for (const q of FEEDBACK_QUESTIONS) {
    const v = raw[q.id];
    const empty = v === undefined || v === null || (typeof v === 'string' && !v.trim()) || (Array.isArray(v) && v.length === 0);
    if (empty) {
      if (q.required) missing.push(q.id);
      continue;
    }
    if (q.type === 'rating') {
      const n = Number(v);
      if (!Number.isInteger(n) || n < 1 || n > 5) return { ok: false, error: 'Ratings must be between 1 and 5.' };
      answers[q.id] = n;
    } else if (q.type === 'choice') {
      if (typeof v !== 'string' || !q.options.includes(v)) return { ok: false, error: 'Invalid choice.' };
      answers[q.id] = v;
    } else if (q.type === 'multi') {
      if (!Array.isArray(v) || v.length > q.options.length || !v.every(x => typeof x === 'string' && q.options.includes(x))) {
        return { ok: false, error: 'Invalid selection.' };
      }
      answers[q.id] = [...new Set(v)];
    } else if (q.type === 'text') {
      if (typeof v !== 'string') return { ok: false, error: 'Invalid answer.' };
      const t = clean(v, q.maxLength || 1000);
      if (t) answers[q.id] = t;
      else if (q.required) missing.push(q.id);
    }
  }
  if (missing.length) {
    return { ok: false, error: 'Please answer every question: ' + missing.map(id => FEEDBACK_QUESTIONS.find(q => q.id === id).label).join(' | '), missing };
  }
  return { ok: true, answers };
}

// Client-safe copy of the questions (no server-only fields).
export function publicQuestions() {
  return FEEDBACK_QUESTIONS.map(q => ({ id: q.id, type: q.type, label: q.label, options: q.options || null, required: !!q.required, maxLength: q.maxLength || null }));
}
