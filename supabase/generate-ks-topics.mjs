// Regenerates the parts of demo.html that need to track the real question
// bank: KS_LIVE_TOPICS (every knowledge-summary title, for the "Choose a
// summary" dropdown) and TOTAL_QUESTIONS (the live bank size, feeding the
// dashboard ring and the My Progress overview/category numbers).
// Run standalone with: node supabase/generate-ks-topics.mjs
// Also called automatically from migrate-questions.mjs during the normal
// batch-add workflow, so it never needs to be run by hand.

import fs from 'fs';
import { pathToFileURL } from 'url';

const QUESTIONS_PATH = new URL('../questions.json', import.meta.url);
const DEMO_PATH = new URL('../demo.html', import.meta.url);

const NAMED_ENTITIES = {
  amp: '&', lt: '<', gt: '>', quot: '"', apos: "'",
  mdash: '\u2014', ndash: '\u2013', rsquo: '\u2019', lsquo: '\u2018',
  rdquo: '\u201D', ldquo: '\u201C', hellip: '\u2026', nbsp: '\u00A0'
};
function decodeEntities(s) {
  return s.replace(/&(#x?[0-9a-fA-F]+|[a-zA-Z]+);/g, (m, code) => {
    if (code[0] === '#') {
      const cp = (code[1] === 'x' || code[1] === 'X') ? parseInt(code.slice(2), 16) : parseInt(code.slice(1), 10);
      return Number.isFinite(cp) ? String.fromCodePoint(cp) : m;
    }
    return NAMED_ENTITIES[code] !== undefined ? NAMED_ENTITIES[code] : m;
  });
}

// Mirrors knowledge-summary.html's extractKnowledgeBox(): the bordered card
// (border-radius:14px + overflow:hidden) with a coral header and a title
// span at font-size:14.5px.
function extractTitle(html) {
  if (!html || html.indexOf('border-radius:14px') === -1) return null;
  const re = /<div[^>]*style="[^"]*border-radius:14px[^"]*overflow:hidden[^"]*"[^>]*>/g;
  let m;
  while ((m = re.exec(html))) {
    const start = m.index;
    const windowHtml = html.slice(start, start + 4000);
    if (windowHtml.indexOf('var(--coral)') === -1) continue;
    const titleMatch = windowHtml.match(/font-size:14\.5px[^>]*>([^<]*)</);
    if (titleMatch) {
      let title = decodeEntities(titleMatch[1]).trim();
      title = title.replace(/\s+Knowledge Summary$/i, '').trim() || 'Knowledge summary';
      return title;
    }
  }
  return null;
}

export function extractAllTopics(questions) {
  const map = new Map(); // label -> category
  questions.forEach(q => {
    [q.explanation, q.reference].filter(Boolean).forEach(html => {
      const title = extractTitle(html);
      if (title && !map.has(title)) map.set(title, q.topic || '');
    });
  });
  return [...map.entries()]
    .map(([label, category]) => ({ label, category }))
    .sort((a, b) => a.label.localeCompare(b.label));
}

// Mirrors dashboard.html / my-progress.html's own question-count convention:
// every question counts as 1 EXCEPT an EMQ card, which counts as one per
// sub-question (its `questions` array), since that's how many gradeable
// items it actually contains.
export function countTotalQuestions(questions) {
  return questions.reduce((sum, q) => sum + (q.type === 'EMQ' ? (q.questions?.length || 1) : 1), 0);
}

function esc(str) {
  return String(str).replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

// Replaces the content between `/* <name>:START */` and `/* <name>:END */`
// markers in `html` with `innerLines` (joined, re-wrapped in the same
// markers), matching the file's existing CRLF/LF convention.
function replaceMarkerBlock(html, name, innerLines) {
  const markerRe = new RegExp(`/\\* ${name}:START \\*/[\\s\\S]*?/\\* ${name}:END \\*/`);
  if (!markerRe.test(html)) {
    throw new Error(`${name} markers not found in demo.html — check they still exist verbatim.`);
  }
  let block = `/* ${name}:START */\n${innerLines}\n/* ${name}:END */`;
  if (html.includes('\r\n')) block = block.replace(/\n/g, '\r\n');
  return html.replace(markerRe, block);
}

export function generateKsTopics() {
  const data = JSON.parse(fs.readFileSync(QUESTIONS_PATH, 'utf8'));
  const topics = extractAllTopics(data.questions);
  const totalQuestions = countTotalQuestions(data.questions);

  const arrayBody = topics
    .map(({ label, category }) => `  { "label": "${esc(label)}", "category": "${esc(category)}" }`)
    .join(',\n');

  let demoHtml = fs.readFileSync(DEMO_PATH, 'utf8');
  demoHtml = replaceMarkerBlock(demoHtml, 'KS_LIVE_TOPICS', `const KS_LIVE_TOPICS = [\n${arrayBody}\n];`);
  demoHtml = replaceMarkerBlock(demoHtml, 'TOTAL_QUESTIONS', `const TOTAL_QUESTIONS = ${totalQuestions};`);
  fs.writeFileSync(DEMO_PATH, demoHtml, 'utf8');

  console.log(`Updated demo.html — KS_LIVE_TOPICS now lists ${topics.length} knowledge summaries, TOTAL_QUESTIONS = ${totalQuestions}.`);
  return { topics, totalQuestions };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  generateKsTopics();
}
