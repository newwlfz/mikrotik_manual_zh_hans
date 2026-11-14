#!/usr/bin/env node
/**
 * Fetch the **content** half of the Chinese mirror from a local English
 * checkout — a stand-in for downloading a content release from the hub.
 *
 * This repository tracks only code and configuration. Everything a reader
 * browses (`docs/`, `versioned_docs/`, `static/`, `hardware/`, `blog/`,
 * `changelog/`) plus the build-time manifests and CLI data (`data/`) is
 * content: it is produced upstream, versioned by the hub, and downloaded at
 * build time. `docs/`, `static/` and friends are therefore git-ignored here and
 * `npm run content:fetch` materialises them.
 *
 * In production the same contract is served by
 *
 *   gh release download <content-tag> --dir .content --repo <hub>
 *   tar -xzf .content/content.tar.gz
 *
 * or by the content workflow that writes the same paths. Keeping the local
 * implementation in this repository means a developer can build the Chinese
 * site without network access; it copies from a sibling `repo_en` checkout
 * (override with `CONTENT_SOURCE` or `--source=`).
 *
 * Behaviour:
 *   - sections are copied recursively into the same relative paths;
 *   - a destination file whose size already equals the source is skipped, so a
 *     second run is cheap and does not touch mtimes (Docusaurus' MDX cache
 *     stays warm);
 *   - `--force` re-copies every file, `--dry-run` prints without writing,
 *     `--only=docs,static` restricts the sections;
 *   - a machine-readable summary is written to `.content/fetch.json`.
 *
 * Usage:
 *   node tools/content/fetch-local.mjs
 *   node tools/content/fetch-local.mjs --source=../repo_en --only=docs,static
 *   node tools/content/fetch-local.mjs --dry-run --json
 *
 * Exit codes: 0 = content present, 1 = source missing or a copy failed.
 */

import {execFileSync} from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

/** Sections a full build needs. `data/` is content too: the CLI data and the
 * version manifests are generated upstream, not maintained here. */
const SECTIONS = ['docs', 'versioned_docs', 'static', 'hardware', 'blog', 'changelog', 'data'];

function parseArgs(argv) {
  const options = {
    source: process.env.CONTENT_SOURCE || path.join(REPO, '..', 'repo_en'),
    only: null,
    force: false,
    dryRun: false,
    json: false,
  };
  for (const arg of argv) {
    if (arg === '--help' || arg === '-h') {
      console.log(
        [
          'usage: node tools/content/fetch-local.mjs [--source=<dir>] [--only=<a,b>]',
          '                                             [--force] [--dry-run] [--json]',
          '',
          `sections: ${SECTIONS.join(', ')}`,
          'env: CONTENT_SOURCE (default ../repo_en)',
        ].join('\n'),
      );
      process.exit(0);
    }
    if (arg === '--force') options.force = true;
    else if (arg === '--dry-run') options.dryRun = true;
    else if (arg === '--json') options.json = true;
    else if (arg.startsWith('--source=')) options.source = arg.slice('--source='.length);
    else if (arg.startsWith('--only=')) {
      options.only = arg
        .slice('--only='.length)
        .split(',')
        .map((value) => value.trim())
        .filter(Boolean);
    } else throw new Error(`unknown argument: ${arg}`);
  }
  options.source = path.resolve(REPO, options.source);
  return options;
}

const options = parseArgs(process.argv.slice(2));
const sections = options.only
  ? SECTIONS.filter((section) => options.only.includes(section))
  : SECTIONS;
const unknown = options.only
  ? options.only.filter((section) => !SECTIONS.includes(section))
  : [];
if (unknown.length > 0) {
  throw new Error(`unknown section(s): ${unknown.join(', ')}; known: ${SECTIONS.join(', ')}`);
}

function sourceCommit(dir) {
  try {
    return execFileSync('git', ['-C', dir, 'rev-parse', 'HEAD'], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
  } catch {
    return null;
  }
}

function walk(dir, visit, relative = '') {
  for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
    const full = path.join(dir, entry.name);
    const rel = relative ? path.posix.join(relative, entry.name) : entry.name;
    if (entry.isSymbolicLink()) {
      visit(full, rel, 'link');
    } else if (entry.isDirectory()) {
      walk(full, visit, rel);
    } else if (entry.isFile()) {
      visit(full, rel, 'file');
    }
  }
}

function ensureDir(dir) {
  if (options.dryRun) return;
  fs.mkdirSync(dir, {recursive: true});
}

const summary = {
  source: {path: options.source, commit: sourceCommit(options.source), sections: []},
  copied: 0,
  skipped: 0,
  bytesCopied: 0,
  bytesSkipped: 0,
  bySection: {},
};

for (const section of sections) {
  const from = path.join(options.source, section);
  if (!fs.existsSync(from)) {
    // `data/` is optional for a docs-only probe; the build needs it, so warn.
    console.warn(`[content:fetch] WARN missing section in source: ${section}`);
    continue;
  }
  const stats = {files: 0, copied: 0, skipped: 0, bytes: 0, bytesCopied: 0, bytesSkipped: 0};
  walk(from, (src, rel, kind) => {
    stats.files += 1;
    const dest = path.join(REPO, section, rel);
    const stat = kind === 'link' ? null : fs.statSync(src);
    const size = stat ? stat.size : 0;
    stats.bytes += size;

    let skip = false;
    if (!options.force && kind === 'file' && fs.existsSync(dest)) {
      const existing = fs.statSync(dest);
      skip = existing.isFile() && existing.size === size;
    }
    if (skip) {
      stats.skipped += 1;
      stats.bytesSkipped += size;
      return;
    }
    if (!options.dryRun) {
      ensureDir(path.dirname(dest));
      if (kind === 'link') {
        // Recreate the link instead of copying the target's bytes; content
        // trees are regular files today, this is only future-proofing.
        try {
          fs.rmSync(dest, {force: true});
        } catch {
          // Ignore: the copy below reports real failures.
        }
        fs.symlinkSync(fs.readlinkSync(src), dest);
      } else {
        fs.copyFileSync(src, dest);
        fs.chmodSync(dest, stat.mode & 0o777);
      }
    }
    stats.copied += 1;
    stats.bytesCopied += size;
  });

  summary.bySection[section] = stats;
  summary.copied += stats.copied;
  summary.skipped += stats.skipped;
  summary.bytesCopied += stats.bytesCopied;
  summary.bytesSkipped += stats.bytesSkipped;
}

const mib = (bytes) => `${(bytes / 1024 / 1024).toFixed(1)} MiB`;
if (!options.json) {
  console.log(`[content:fetch] source: ${options.source}`);
  if (summary.source.commit) console.log(`[content:fetch] source commit: ${summary.source.commit}`);
  for (const [section, stats] of Object.entries(summary.bySection)) {
    console.log(
      `[content:fetch] ${`${section}/`.padEnd(18)} ${String(stats.files).padStart(6)} files  ` +
        `${mib(stats.bytes).padStart(10)}  copied ${String(stats.copied).padStart(6)}  ` +
        `skipped ${String(stats.skipped).padStart(6)}`,
    );
  }
  console.log(
    `[content:fetch] total: copied ${summary.copied} files (${mib(summary.bytesCopied)}), ` +
      `skipped ${summary.skipped} (${mib(summary.bytesSkipped)})` +
      (options.dryRun ? ' [dry-run]' : ''),
  );
  console.log(
    '[content:fetch] note: this is a local stand-in for downloading the hub content release; ' +
      'production replaces it with `gh release download`.',
  );
}

if (!options.dryRun) {
  const outFile = path.join(REPO, '.content', 'fetch.json');
  fs.mkdirSync(path.dirname(outFile), {recursive: true});
  fs.writeFileSync(
    outFile,
    `${JSON.stringify({...summary, fetchedAt: new Date().toISOString(), dryRun: false}, null, 2)}\n`,
  );
}

if (options.json) console.log(JSON.stringify(summary, null, 2));
