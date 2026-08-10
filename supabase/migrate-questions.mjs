// One-off migration: converts questions.json into a seed.sql file
// that populates the Supabase tables created by schema.sql.
// Run locally with: node supabase/migrate-questions.mjs

import fs from 'fs';

const raw = JSON.parse(fs.readFileSync(new URL('../questions.json', import.meta.url), 'utf8'));
const questions = raw.questions;

function esc(str) {
  return String(str).replace(/'/g, "''");
}

const topics = [...new Set(questions.map(q => q.topic))];

let sql = `-- Auto-generated from questions.json by migrate-questions.mjs\n-- Run this AFTER schema.sql, in Supabase Dashboard -> SQL Editor\n\n`;

sql += `-- ===== Categories (seeded from existing topics) =====\n`;
sql += `insert into categories (name) values\n`;
sql += topics.map(t => `  ('${esc(t)}')`).join(',\n');
sql += `\non conflict (name) do nothing;\n\n`;

sql += `-- ===== Questions =====\n`;
for (const q of questions) {
  const { id, type, topic, ...rest } = q;
  const dataJson = esc(JSON.stringify(rest));
  sql += `insert into questions (id, type, data, status) values ('${esc(id)}', '${esc(type)}', '${dataJson}'::jsonb, 'published')\n  on conflict (id) do nothing;\n`;
}

sql += `\n-- ===== Link each question to its (single, for now) category =====\n`;
for (const q of questions) {
  sql += `insert into question_categories (question_id, category_id)\n  select '${esc(q.id)}', id from categories where name = '${esc(q.topic)}'\n  on conflict do nothing;\n`;
}

fs.writeFileSync(new URL('./seed.sql', import.meta.url), sql, 'utf8');
console.log(`Generated supabase/seed.sql — ${questions.length} questions across ${topics.length} categories.`);
