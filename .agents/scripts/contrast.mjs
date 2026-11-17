#!/usr/bin/env node
// Deterministic WCAG 2.x contrast calculator. Agents must COMPUTE contrast, never estimate it.
//
//   node .agents/scripts/contrast.mjs <fg> <bg>               two hex colours, e.g. "#2844bd" "#fff"
//   node .agents/scripts/contrast.mjs --tokens [--css file]   check every --on-X / --X pair in :root and .theme-dark
//   node .agents/scripts/contrast.mjs --token-pair <fg-token> <bg-token> [--css file]   one pair, both themes
//   add --strict to exit 1 when any checked text pair is below 4.5:1
//
// Limits (printed when hit): hex colours only (#rgb, #rrggbb, #rrggbbaa with alpha composited on the
// background); values that are not hex or var(--x)-to-hex are reported as SKIPPED, not guessed.
import fs from 'node:fs';
import path from 'node:path';
import { repoRoot } from './ui-lib.mjs';

const args = process.argv.slice(2);
const flag = (n) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : undefined; };
const strict = args.includes('--strict');

function parseHex(v) {
  const m = /^#([0-9a-f]{3,8})$/i.exec((v || '').trim());
  if (!m) return null;
  let h = m[1];
  if (h.length === 3 || h.length === 4) h = [...h].map((c) => c + c).join('');
  if (h.length !== 6 && h.length !== 8) return null;
  const n = (i) => parseInt(h.slice(i, i + 2), 16);
  return { r: n(0), g: n(2), b: n(4), a: h.length === 8 ? n(6) / 255 : 1 };
}
const over = (fg, bg) => ({ r: fg.r * fg.a + bg.r * (1 - fg.a), g: fg.g * fg.a + bg.g * (1 - fg.a), b: fg.b * fg.a + bg.b * (1 - fg.a), a: 1 });
const lin = (c) => { const s = c / 255; return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4; };
const lum = (c) => 0.2126 * lin(c.r) + 0.7152 * lin(c.g) + 0.0722 * lin(c.b);
function ratio(fgHex, bgHex) {
  const bg = parseHex(bgHex); let fg = parseHex(fgHex);
  if (!fg || !bg) return null;
  if (bg.a < 1) return null; // translucent background has no defined ratio without its backdrop
  fg = over(fg, bg);
  const [a, b] = [lum(fg), lum(bg)].sort((x, y) => y - x);
  return (a + 0.05) / (b + 0.05);
}
const verdict = (r) => (r === null ? 'SKIPPED' : r >= 7 ? 'AAA' : r >= 4.5 ? 'AA' : r >= 3 ? 'AA-large/UI only' : 'FAIL');

function firstBlock(css, selector) {
  const re = new RegExp(`(^|[\\s}])${selector.replace(/[.]/g, '\\.')}\\s*\\{([^{}]*)\\}`, 'm');
  const m = re.exec(css);
  return m ? m[2] : null;
}
function decls(block) {
  const out = {};
  for (const m of (block || '').matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) out[m[1]] = m[2].trim(); // later wins, like CSS
  return out;
}
function resolve(map, name, depth = 0) {
  let v = map[name];
  if (v === undefined || depth > 5) return undefined;
  const ref = /^var\((--[\w-]+)\)$/.exec(v);
  return ref ? resolve(map, ref[1], depth + 1) : v;
}
function loadThemes() {
  const css = path.resolve(flag('--css') || path.join(repoRoot(), 'src/styles.css'));
  if (!fs.existsSync(css)) { console.error(`CSS file not found: ${css}`); process.exit(2); }
  const text = fs.readFileSync(css, 'utf8');
  const light = decls(firstBlock(text, ':root'));
  const dark = { ...light, ...decls(firstBlock(text, '.theme-dark')) };
  return { css: path.relative(repoRoot(), css), light, dark };
}

let worst = Infinity;
const rows = [];
function addRow(label, fg, bg) {
  const r = ratio(fg, bg);
  if (r !== null) worst = Math.min(worst, r);
  rows.push(`${label.padEnd(46)} ${String(fg).padEnd(9)} on ${String(bg).padEnd(9)} ${r === null ? '   -  ' : r.toFixed(2).padStart(6)}:1  ${verdict(r)}`);
}

if (args.includes('--tokens') || args.includes('--token-pair')) {
  const { css, light, dark } = loadThemes();
  let pairs;
  if (args.includes('--token-pair')) {
    const i = args.indexOf('--token-pair');
    pairs = [[`--${args[i + 1].replace(/^--/, '')}`, `--${args[i + 2].replace(/^--/, '')}`]];
  } else {
    pairs = [];
    for (const k of Object.keys(light)) {
      const m = /^--on-(.+)$/.exec(k);
      if (m && light[`--${m[1]}`] !== undefined) pairs.push([k, `--${m[1]}`]);
    }
    for (const bg of ['--background', '--surface', '--surface-low']) {
      for (const fg of ['--on-surface', '--on-surface-variant']) if (light[bg] !== undefined && light[fg] !== undefined) pairs.push([fg, bg]);
    }
    pairs = [...new Map(pairs.map((p) => [p.join('|'), p])).values()];
  }
  console.log(`source: ${css}  (text pairs: AA needs >= 4.5:1; UI components/large text need >= 3:1)`);
  for (const [theme, map] of [['light', light], ['dark', dark]]) {
    for (const [fg, bg] of pairs) {
      const f = resolve(map, fg), b = resolve(map, bg);
      if (f === undefined || b === undefined) { rows.push(`${`${theme} ${fg} / ${bg}`.padEnd(46)} token not defined -> SKIPPED`); continue; }
      addRow(`${theme} ${fg} / ${bg}`, f, b);
    }
  }
  console.log(rows.join('\n'));
  console.log('\nNote: this checks token pairs only. Colours hard-coded in rules (not tokens) must be checked with the two-hex form.');
} else if (args.length >= 2 && !args[0].startsWith('--')) {
  addRow('pair', args[0], args[1]);
  console.log(rows.join('\n'));
  if (rows[0].includes('SKIPPED')) console.log('SKIPPED: only opaque-background hex colours are supported. Do not estimate; resolve the real values first.');
} else {
  console.error('usage: contrast.mjs <fg-hex> <bg-hex>  |  --tokens [--css file]  |  --token-pair <fg> <bg> [--css file]  [--strict]');
  process.exit(2);
}
process.exit(strict && worst < 4.5 ? 1 : 0);
