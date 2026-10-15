// Builds js/soe-data.js (content for examiner.html) from the branded pack source
// HTML in soe-packs/*.html. Run: node scripts/build-soe-data.mjs
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from "url";

const PACKS_DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "soe-packs");

function decodeEntities(s){
  return s.replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&nbsp;/g,' ');
}

// Find index right after `marker`, return -1 if not found
function after(html, marker, from=0){
  const i = html.indexOf(marker, from);
  return i===-1 ? -1 : i + marker.length;
}

// Given html and the index of an opening tag's `>` (i.e. start = index right after "<div class=\"x\">"),
// scan forward counting nested <div...> / </div> to find the matching close. Returns {content, endIndex} where
// endIndex is the index right after the matching </div>.
function extractBalancedDiv(html, start){
  let depth = 1;
  let i = start;
  const openRe = /<div[\s>]/g; openRe.lastIndex = start;
  // simple scanner
  while (depth > 0){
    const nextOpen = html.indexOf('<div', i);
    const nextClose = html.indexOf('</div>', i);
    if (nextClose === -1) throw new Error('unbalanced div from ' + start);
    if (nextOpen !== -1 && nextOpen < nextClose){
      depth++;
      i = nextOpen + 4;
    } else {
      depth--;
      i = nextClose + 6;
    }
  }
  return { content: html.slice(start, i - 6), endIndex: i };
}

function extractBalancedUl(html, start){
  let depth = 1;
  let i = start;
  while (depth > 0){
    const nextOpen = html.indexOf('<ul', i);
    const nextClose = html.indexOf('</ul>', i);
    if (nextClose === -1) throw new Error('unbalanced ul from ' + start);
    if (nextOpen !== -1 && nextOpen < nextClose){ depth++; i = nextOpen + 3; }
    else { depth--; i = nextClose + 5; }
  }
  return { content: html.slice(start, i - 5), endIndex: i };
}

function stripTags(s){
  return decodeEntities(s.replace(/<[^>]+>/g,'')).trim();
}

function boldify(s){
  // convert <b>...</b> to **...** and strip other tags
  let out = s.replace(/<b>/g,'\u0001').replace(/<\/b>/g,'\u0002');
  out = out.replace(/<[^>]+>/g,'');
  out = decodeEntities(out);
  out = out.replace(/\u0001/g,'**').replace(/\u0002/g,'**');
  return out.trim();
}

function parseCriteria(ckHtml){
  const items = [];
  const liRe = /<li([^>]*)>([\s\S]*?)<\/li>/g;
  let m;
  while ((m = liRe.exec(ckHtml))){
    const attrs = m[1];
    const inner = m[2];
    items.push({ text: boldify(inner), strong: /class="strong"/.test(attrs) });
  }
  return items;
}

function parseQuestions(segmentHtml){
  const questions = [];
  const qMarker = '<div class="q">';
  let idx = 0;
  while (true){
    const qStart = segmentHtml.indexOf(qMarker, idx);
    if (qStart === -1) break;
    const bodyStart = qStart + qMarker.length;
    const { content: qBlock, endIndex } = extractBalancedDiv(segmentHtml, bodyStart);
    idx = endIndex;

    const numM = qBlock.match(/<span class="qnum">([\s\S]*?)<\/span>/);
    const textM = qBlock.match(/<span class="qtext">([\s\S]*?)<\/span>/);
    const number = numM ? stripTags(numM[1]) : '';
    const prompt = textM ? boldify(textM[1]) : '';

    let criteria = [];
    const ckStart = after(qBlock, '<ul class="ck">');
    if (ckStart !== -1){
      const { content: ckContent } = extractBalancedUl(qBlock, ckStart);
      criteria = parseCriteria(ckContent);
    }

    let knowledgeHtml = '';
    const knowMarker = '<div class="know">';
    const knowTagIdx = qBlock.indexOf(knowMarker);
    if (knowTagIdx !== -1){
      const knowStart = knowTagIdx + knowMarker.length;
      const { content: knowContent } = extractBalancedDiv(qBlock, knowStart);
      // strip the leading <p class="label">Key knowledge</p> since we render our own heading
      knowledgeHtml = knowContent.replace(/^\s*<p class="label">[\s\S]*?<\/p>\s*/, '').trim();
    }

    questions.push({ number, prompt, criteria, knowledgeHtml });
  }
  return questions;
}

function sliceBetween(html, startMarker, endMarker, fromIdx=0){
  const s = html.indexOf(startMarker, fromIdx);
  if (s === -1) return null;
  const e = html.indexOf(endMarker, s);
  if (e === -1) return null;
  return { text: html.slice(s, e), start: s, end: e };
}

function parseExaminerNotes(html){
  // Find the "How to use this pack" label, then the next <ul> after it.
  const labelIdx = html.indexOf('How to use this pack');
  const ulStart = after(html, '<ul>', labelIdx);
  const { content } = extractBalancedUl(html, ulStart);
  const liRe = /<li>([\s\S]*?)<\/li>/g;
  const notes = [];
  let m;
  while ((m = liRe.exec(content))) notes.push(boldify(m[1]));
  return notes;
}

function parseCandidateSection(html){
  const secStart = html.indexOf('<section id="candidate">');
  if (secStart === -1) return null;
  const secEnd = html.indexOf('<!-- =====', html.indexOf('</section>', secStart));
  const block = html.slice(secStart, secEnd === -1 ? html.indexOf('</section>', secStart) : secEnd);

  const instrStart = after(block, '<div class="callout amber">');
  let instructions = [];
  if (instrStart !== -1){
    const ulStart = after(block, '<ul>', instrStart);
    const { content } = extractBalancedUl(block, ulStart);
    const liRe = /<li>([\s\S]*?)<\/li>/g;
    let m;
    while ((m = liRe.exec(content))) instructions.push(boldify(m[1]));
  }

  const caseStart = block.indexOf('<div class="case"');
  let caseHistoryHtml = '';
  let afterCaseIdx = -1;
  if (caseStart !== -1){
    const tagEnd = block.indexOf('>', caseStart) + 1;
    const { content, endIndex } = extractBalancedDiv(block, tagEnd);
    // drop the leading eyebrow label paragraph
    caseHistoryHtml = content.replace(/^\s*<p class="eyebrow"[\s\S]*?<\/p>\s*/, '').trim();
    afterCaseIdx = endIndex;
  }
  // An optional sibling `.mri` image block right after the case history
  if (afterCaseIdx !== -1){
    const mriMarker = '<div class="mri">';
    const mriIdx = block.indexOf(mriMarker, afterCaseIdx);
    if (mriIdx !== -1 && mriIdx < afterCaseIdx + 60){
      const { content: mriContent } = extractBalancedDiv(block, mriIdx + mriMarker.length);
      const rewritten = ('<div class="mri">' + mriContent + '</div>').replace(/src="img\//g, 'src="soe-packs/img/');
      caseHistoryHtml += '\n' + rewritten;
    }
  }
  return { instructions, caseHistoryHtml };
}

// Long case: questions grouped under <h3 class="scq…">Question N</h3> headings,
// each group closed by its own 0/1/2 box; one comments box closes the long case.
function parseLongCase(html){
  const partHeadIdx = html.indexOf('<div class="part">', html.indexOf('<section class="examiner break">', html.indexOf('How to use this pack')));
  const endIdx = html.indexOf('<div class="score comments-only"', partHeadIdx);
  const seg = html.slice(partHeadIdx, endIdx);
  const sections = [];
  const questions = [];
  const headRe = /<h3 class="scq[^"]*"><span class="num">Question (\d+)<\/span>([\s\S]*?)<\/h3>/g;
  const heads = [...seg.matchAll(headRe)];
  heads.forEach((h, i)=>{
    const from = h.index;
    const to = i+1 < heads.length ? heads[i+1].index : seg.length;
    const qs = parseQuestions(seg.slice(from, to));
    sections.push({ number: parseInt(h[1],10), title: stripTags(h[2]), firstIndex: questions.length, count: qs.length });
    questions.push(...qs);
  });
  return { sections, questions };
}

function parseStation1File(html){
  const examinerNotes = parseExaminerNotes(html);
  const candidate = parseCandidateSection(html);
  const lc = parseLongCase(html);

  const scq = n => {
    const headIdx = html.search(new RegExp('<h3 class="scq[^"]*"><span class="num">SCQ ' + n + '<'));
    const scoreIdx = html.indexOf('<div class="score" data-part="SCQ ' + n);
    const title = stripTags(html.slice(headIdx, html.indexOf('</h3>', headIdx)).replace(/<span class="num">[\s\S]*?<\/span>/,''));
    return { key:'scq'+n, label:'Short clinical Q'+n, subtitle: title, kind:'scq', timerMinutes:7, questions: parseQuestions(html.slice(headIdx, scoreIdx)) };
  };

  return {
    examinerNotes,
    candidate,
    parts: [
      { key:'longcase', label:'Long case', kind:'longcase', timerMinutes:21, sections: lc.sections, questions: lc.questions },
      scq(1), scq(2), scq(3)
    ],
    bigTimerMinutes: 42
  };
}
function parseStation2File(html){
  const examinerNotes = parseExaminerNotes(html);
  const parts = [];
  const labels = ['Question 1','Question 2','Question 3','Question 4'];
  let searchFrom = 0;
  for (let n=1; n<=4; n++){
    const scoreMarker = '<div class="score" data-part="Question ' + n;
    const scoreIdx = html.indexOf(scoreMarker, searchFrom);
    const partHeadIdx = html.lastIndexOf('<div class="part">', scoreIdx);
    // title from the h2 right after partHeadIdx
    const h2Start = after(html, '<h2>', partHeadIdx);
    const h2End = html.indexOf('</h2>', h2Start);
    const title = boldify(html.slice(h2Start, h2End));
    const eyebrowStart = after(html, '<p class="eyebrow">', partHeadIdx);
    const eyebrowEnd = html.indexOf('</p>', eyebrowStart);
    const eyebrow = stripTags(html.slice(eyebrowStart, eyebrowEnd)); // e.g. "Question 1 · Anatomy · 7.5 minutes"
    const category = eyebrow.replace(/^Question \d+\s*·\s*/,'').replace(/\s*·\s*[\d.]+\s*minutes?\s*$/i,'');
    const qSegStart = html.indexOf('<div class="q">', partHeadIdx);
    const questions = parseQuestions(html.slice(qSegStart, scoreIdx));
    parts.push({ key:'q'+n, label: labels[n-1], subtitle: category + (title? ' — '+title : ''), kind:'clinsci', timerMinutes:7.5, questions });
    searchFrom = scoreIdx;
  }
  return { examinerNotes, candidate: null, parts, bigTimerMinutes: 30 };
}

function loadAndParse(file, isStation1){
  const html = fs.readFileSync(path.join(PACKS_DIR, file), 'utf8');
  return isStation1 ? parseStation1File(html) : parseStation2File(html);
}

const d = {
  mock1_station1: loadAndParse('station1-mock1.html', true),
  mock1_station2: loadAndParse('station2-mock1.html', false),
  mock2_station1: loadAndParse('station1-mock2.html', true),
  mock2_station2: loadAndParse('station2-mock2.html', false)
};

for (const [key, st] of Object.entries(d)){
  console.log('===', key, '===  notes:', st.examinerNotes.length);
  st.parts.forEach(p=> console.log(' part', p.key, '-', p.subtitle||'', '| questions:', p.questions.length,
    p.sections ? '| sections: ' + p.sections.map(s=>s.number+':'+s.count+' '+s.title).join(', ') : ''));
}

function buildStation1(st, name, subtitle){
  return {
    key: 'station1', name, subtitle,
    bigTimerMinutes: st.bigTimerMinutes,
    examinerNotes: st.examinerNotes,
    parts: st.parts.map(p => ({
      key: p.key, label: p.label, kind: p.kind, timerMinutes: p.timerMinutes,
      ...(p.sections ? { sections: p.sections } : {}),
      ...(p.subtitle ? { subtitle: p.subtitle } : {}),
      ...(p.key === 'longcase' ? {
        candidateInstructions: st.candidate.instructions,
        caseHistoryHtml: st.candidate.caseHistoryHtml
      } : {}),
      questions: p.questions.map(q => ({
        number: q.number, prompt: q.prompt,
        criteria: q.criteria,
        knowledgeHtml: q.knowledgeHtml
      }))
    }))
  };
}

function buildStation2(st, name, subtitle){
  return {
    key: 'station2', name, subtitle,
    bigTimerMinutes: st.bigTimerMinutes,
    examinerNotes: st.examinerNotes,
    parts: st.parts.map(p => ({
      key: p.key, label: p.label, kind: p.kind, timerMinutes: p.timerMinutes,
      ...(p.sections ? { sections: p.sections } : {}),
      subtitle: p.subtitle,
      questions: p.questions.map(q => ({
        number: q.number, prompt: q.prompt,
        criteria: q.criteria,
        knowledgeHtml: q.knowledgeHtml
      }))
    }))
  };
}

const data = {
  courses: [
    {
      key: 'oct14-nov-soe',
      name: 'October 14 Course — November SOE',
      mocks: [
        {
          key: 'mock1', name: 'Mock Exam 1',
          stations: [
            buildStation1(d.mock1_station1, 'Station 1', 'Long case + short clinical questions'),
            buildStation2(d.mock1_station2, 'Station 2', 'Clinical Science')
          ]
        },
        {
          key: 'mock2', name: 'Mock Exam 2',
          stations: [
            buildStation1(d.mock2_station1, 'Station 1', 'Long case + short clinical questions'),
            buildStation2(d.mock2_station2, 'Station 2', 'Clinical Science')
          ]
        }
      ]
    }
  ]
};

const out = `// SOE mock exam content — long case, short clinical questions (SCQs) and clinical
// science questions for the examiner section (examiner.html).
//
// Generated from the branded pack source HTML in soe-packs/*.html (the
// "official" PainRevision exam packs) — do not hand-edit the question content
// here; edit the source pack HTML and regenerate instead, so this file and the
// printed/PDF packs never drift apart.
//
// Each question's "knowledgeHtml" is raw HTML (tables/flow-diagrams/images as
// authored in the pack) rendered as-is in the viewer (reference) pages only —
// the marking page intentionally shows just the checklist, to keep live
// scoring fast. See pack.css classes (kt, flow, st, ar, know, rh, hi, num) for
// the styling these fragments expect; examiner.html ports a scoped subset of
// pack.css under ".pack-embed" so they render identically to the PDF packs.

window.SOE_DATA = ${JSON.stringify(data, null, 2)};
`;

fs.writeFileSync(path.join(PACKS_DIR, '..', 'js', 'soe-data.js'), out, 'utf8');
console.log('wrote js/soe-data.js,', out.length, 'bytes');
