import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';

const chapters = new Map();
const directory = new URL('../src/chapters/', import.meta.url);
for (const file of readdirSync(directory)) {
  const chapter = /^Chapter(\d+)\.tsx$/.exec(file)?.[1];
  if (!chapter) continue;
  const source = readFileSync(new URL(file, directory), 'utf8');
  const ids = Array.from(source.matchAll(/<h2\s[^>]*\bid="section-([^"]+)"/g), (match) => match[1]);
  assert.equal(new Set(ids).size, ids.length, `Duplicate heading anchor in ${file}`);
  chapters.set(chapter, new Set(ids));
}

const search = readFileSync(new URL('../src/components/SearchBox.tsx', import.meta.url), 'utf8');
const entries = Array.from(search.matchAll(/\bchapter:\s*(\d+),\s*section:\s*'([^']+)'/g));
assert.ok(entries.length > 0, 'No search entries found');
for (const [, chapter, section] of entries) {
  assert.ok(chapters.get(chapter)?.has(section), `Missing heading: /chapter/${chapter}#section-${section}`);
}
console.log(`Checked ${entries.length} search links across ${chapters.size} chapters.`);
