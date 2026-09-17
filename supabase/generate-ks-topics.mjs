// Regenerates the KS_LIVE_TOPICS array in demo.html from questions.json, so
// the demo page's "Choose a summary" dropdown always lists every knowledge-
// summary title currently in the real question bank (the free ones stay
// interactive via KS_ENTRIES; everything else shows locked).
// Run standalone with: node supabase/generate-ks-topics.mjs
// Also called automatically from migrate-questions.mjs during the normal
// batch-add workflow, so it never needs to be run by hand.

import fs from 'fs';
import { pathToFileURL } from 'url';

const QUESTIONS_PATH = new URL('../questions.json', import.meta.url);
const DEMO_PATH = new URL('../demo.html', import.meta.url);

const NAMED_ENTITIES = {
  amp: '&', lt: '<', gt: '>', quot: '"', apos: "'",
  mdash: '—', ndash: '–', rsquo: '’', lsquo: '‘',
  rdquo: '”', ldquo: '“', hellip: '…', nbsp: ' '
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

function esc(str) {
  return String(str).replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

export function generateKsTopics() {
  const data = JSON.parse(fs.readFileSync(QUESTIONS_PATH, 'utf8'));
  const list = extractAllTopics(data.questions);

  const arrayBody = list
    .map(({ label, category }) => `  { "label": "${esc(label)}", "category": "${esc(category)}" }`)
    .join(',\n');
  let block = `/* KS_LIVE_TOPICS:START */\nconst KS_LIVE_TOPICS = [\n${arrayBody}\n];\n/* KS_LIVE_TOPICS:END */`;

  const demoHtml = fs.readFileSync(DEMO_PATH, 'utf8');
  const markerRe = /\/\* KS_LIVE_TOPICS:START \*\/[\s\S]*?\/\* KS_LIVE_TOPICS:END \*\//;
  if (!markerRe.test(demoHtml)) {
    throw new Error('KS_LIVE_TOPICS markers not found in demo.html — check they still exist verbatim.');
  }
  // Match the file's line-ending convention so the generated block doesn't
  // introduce a mixed-CRLF/LF region on every regeneration.
  if (demoHtml.includes('\r\n')) block = block.replace(/\n/g, '\r\n');
  const updated = demoHtml.replace(markerRe, block);
  fs.writeFileSync(DEMO_PATH, updated, 'utf8');
  console.log(`Updated demo.html — KS_LIVE_TOPICS now lists ${list.length} knowledge summaries.`);
  return list;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  generateKsTopics();
}
