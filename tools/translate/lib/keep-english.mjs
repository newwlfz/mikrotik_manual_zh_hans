/**
 * Blocks the model returns unchanged, remembered outside the translation memory.
 *
 * `work/translate/model-memory.json` is ~26 MB and `translation-memory.json`
 * another ~19 MB. Committing them on every batch would grow the repository by
 * tens of megabytes per push, so the batch workflow commits only this compact
 * ledger: the *identity* subset — blocks whose "translation" is the English text
 * itself, because they are technical notation (identifier lists, grammar
 * fragments, numeric tables) that must stay English.
 *
 * Why it has to be persisted at all: without it every batch re-sends those
 * blocks, the model answers with the same English text, the page stays
 * `partial`, and `pending` never reaches zero — so the deploy gate would never
 * open. `planSection` skips a block that is locked here exactly the way it
 * skipped identity entries from the TM; `config/force-translate.yml` and the
 * fenced-admonition exception still override the lock.
 *
 * Keys are `normalize()`d (see `lib/blocks.mjs`), so whitespace differences do
 * not create new entries. The file is a sorted array, which keeps a diff
 * readable and lets two runs merge without reordering.
 */

import fs from 'node:fs';
import path from 'node:path';
import {WORK_DIR, writeFileAtomic} from './paths.mjs';
import {normalize} from './blocks.mjs';

export const LOCKS_FILE = path.join(WORK_DIR, 'keep-english.json');
export const LOCKS_SCHEMA = 1;

/**
 * Read the locks; seed them from the model memory when the ledger is new.
 *
 * Seeding only happens where a full translation memory exists (the local
 * mono-workspace), and it is a one-time migration: the file written here is what
 * CI commits, so a fresh checkout never has to load the big memories to know
 * which blocks are deliberately English.
 */
export function loadLocks({seedFrom = null, warn = () => {}} = {}) {
  if (fs.existsSync(LOCKS_FILE)) {
    const raw = JSON.parse(fs.readFileSync(LOCKS_FILE, 'utf8'));
    const blocks = Array.isArray(raw) ? raw : raw.blocks || [];
    const locks = new Set();
    for (const block of blocks) {
      if (typeof block === 'string' && block.trim() !== '') locks.add(normalize(block));
    }
    return locks;
  }
  if (!seedFrom) return new Set();
  const locks = new Set();
  for (const [key, value] of seedFrom.entries()) {
    const separator = key.indexOf('\u0000');
    // `title:<english>` / `description:<english>` keys are not blocks.
    if (separator === -1) continue;
    const english = key.slice(separator + 1);
    if (normalize(value) === normalize(english)) locks.add(normalize(english));
  }
  if (locks.size > 0) {
    const file = path.relative(WORK_DIR, LOCKS_FILE);
    warn(`seeded ${locks.size} keep-English lock(s) into ${file} from the model memory`);
    saveLocks(locks);
  }
  return locks;
}

/**
 * Persist the locks.
 *
 * Sorted, one block per line: the file is committed on every batch, so a diff
 * has to show the two or three entries that were added, not one 600 KB line.
 * (A pretty-printed array costs ~80 KB more than the packed form and pays for
 * itself the first time someone reviews a batch commit.)
 */
export function saveLocks(locks) {
  const blocks = [...locks].sort();
  const payload = {
    schema: LOCKS_SCHEMA,
    note:
      'Blocks the model returned unchanged (technical notation, grammar, identifiers). ' +
      'The planner never queues them again; config/force-translate.yml overrides a lock.',
    blocks,
  };
  writeFileAtomic(LOCKS_FILE, `${JSON.stringify(payload, null, 1)}\n`);
}
