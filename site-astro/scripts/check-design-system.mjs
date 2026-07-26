import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const root = new URL("../", import.meta.url);
const sourceRoot = new URL("src/", root);

const readSource = (path) => readFile(new URL(path, sourceRoot), "utf8");

const walkAstro = async (directory) => {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const url = new URL(`${entry.name}${entry.isDirectory() ? "/" : ""}`, directory);
    if (entry.isDirectory()) {
      files.push(...await walkAstro(url));
    } else if (entry.name.endsWith(".astro")) {
      files.push(url);
    }
  }

  return files;
};

const globalCss = await readSource("styles/global.css");
const expectedTokens = new Map([
  ["--ac-type-page-title", "clamp(2.4rem, 6vw, 3.6rem)"],
  ["--ac-type-section-title", "clamp(1.6rem, 3vw, 2.1rem)"],
  ["--ac-type-card-title", "1.25rem"],
  ["--ac-type-lede", "clamp(1.15rem, 2.2vw, 1.35rem)"],
  ["--ac-type-body", "1.0625rem"],
  ["--ac-type-terminal", "0.8125rem"],
  ["--ac-leading-display", "1.1"],
  ["--ac-leading-heading", "1.14"],
  ["--ac-leading-ui", "1.25"],
  ["--ac-leading-card", "1.55"],
  ["--ac-leading-prose", "1.7"],
  ["--ac-tracking-display", "-0.015em"],
  ["--ac-tracking-heading", "-0.01em"],
  ["--ac-tracking-flat", "0"],
  ["--ac-tracking-caps", "0.12em"],
  ["--ac-page-gutter", "clamp(1.25rem, 5vw, 3rem)"],
  ["--ac-rail-page", "58rem"],
  ["--ac-rail-wide", "74rem"],
  ["--ac-rail-deck", "68rem"],
  ["--ac-measure-heading", "44rem"],
  ["--ac-measure-prose", "42rem"],
  ["--ac-space-diagram-before", "clamp(4.5rem, 6vw, 5.5rem)"],
  ["--ac-space-diagram-after", "clamp(5.5rem, 7vw, 6.5rem)"],
  ["--ac-sticky-header-offset", "7.5rem"],
]);

let checks = 0;
for (const [name, value] of expectedTokens) {
  assert.match(globalCss, new RegExp(`${name.replaceAll("-", "\\-")}\\s*:\\s*${value
    .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`));
  checks += 1;
}

assert.match(globalCss, /body\s*\{[^}]*font-size:\s*var\(--ac-type-body\)/s);
assert.match(globalCss, /h1\s*\{[^}]*font-size:\s*var\(--ac-type-page-title\)/s);
assert.match(globalCss, /h2\s*\{[^}]*font-size:\s*var\(--ac-type-section-title\)/s);
assert.match(globalCss, /\.page-rail,\s*\.shell-rail\s*\{[^}]*max-width:\s*var\(--ac-rail-page\)/s);
assert.match(globalCss, /\.deck-content-rail\s*\{[^}]*var\(--ac-rail-deck\)/s);
checks += 5;

const authoredFiles = await walkAstro(sourceRoot);
for (const file of authoredFiles) {
  const source = await readFile(file, "utf8");
  for (const match of source.matchAll(/class="([^"]*\bcontainer\b[^"]*)"/g)) {
    assert.match(
      match[1],
      /\b(?:page-rail|shell-rail|wide-rail|deck-content-rail)\b/,
      `${fileURLToPath(file)} has an unassigned container: ${match[0]}`,
    );
    checks += 1;
  }

  for (const match of source.matchAll(/class="([^"]*)"/g)) {
    const classes = match[1];
    if (/\b(?:page-rail|wide-rail|page-content-inset)\b/.test(classes)) {
      assert.doesNotMatch(
        classes,
        /\b(?:prose|heading-measure)\b/,
        `${fileURLToPath(file)} combines outer rail geometry with a readable measure: ${match[0]}. Nest the measured content so its left edge remains on the rail.`,
      );
      checks += 1;
    }
  }
}

const [header, footer, pageHero, deck] = await Promise.all([
  readSource("components/Header.astro"),
  readSource("components/Footer.astro"),
  readSource("components/PageHero.astro"),
  readSource("pages/presentations/mind-nervous-system-body.astro"),
]);

assert.match(header, /container shell-rail bar/);
assert.match(header, /max-width:\s*51\.99rem/);
assert.match(
  header,
  /\.site-header\s*\{[^}]*position:\s*sticky[^}]*top:\s*0[^}]*z-index:\s*20[^}]*background:\s*var\(--bg\)/s,
  "The shared site header must remain sticky with an opaque fallback surface",
);
assert.match(
  header,
  /backdrop-filter:\s*blur\(16px\) saturate\(1\.08\)/,
  "The sticky header must retain legible separation from scrolling content",
);
assert.match(
  globalCss,
  /:target\s*\{[^}]*scroll-margin-block-start:\s*var\(--ac-sticky-header-offset\)/s,
  "In-page destinations must clear the sticky site header",
);
assert.match(footer, /container wide-rail/);
assert.match(pageHero, /container page-rail/);
assert.equal((deck.match(/container deck-content-rail/g) ?? []).length, 7);
checks += 8;

for (const path of [
  "components/ColleagueTerminal.astro",
  "components/DevagueTerminal.astro",
  "components/LobesTerminal.astro",
  "components/ReachyTerminal.astro",
]) {
  const terminal = await readSource(path);
  assert.match(terminal, /font-size:\s*var\(--ac-type-terminal\)/, path);
  assert.match(terminal, /line-height:\s*var\(--ac-leading-card\)/, path);
  assert.match(terminal, /letter-spacing:\s*var\(--ac-tracking-flat\)/, path);
  assert.match(terminal, /pre\s*>\s*code\s*\{[^}]*font-size:\s*inherit/s, path);
  assert.doesNotMatch(terminal, /font-size:\s*0\.78rem/, path);
  checks += 5;
}

const [colleaguePage, lobesTerminal, reachyPage, reachyTerminal] = await Promise.all([
  readSource("pages/agents/colleague.astro"),
  readSource("components/LobesTerminal.astro"),
  readSource("pages/agents/reachy-mini-cli.astro"),
  readSource("components/ReachyTerminal.astro"),
]);
assert.match(
  colleaguePage,
  /\.term-narrow\s*\{[^}]*width:\s*100%[^}]*max-width:\s*none/s,
  "The Colleague identity terminal must fill the shared page rail",
);
assert.match(
  lobesTerminal,
  /const\s*\{\s*session,\s*start\s*=\s*0\.3,\s*wrap\s*=\s*true\s*\}/,
  "Lobes terminal wrapping must default on",
);
assert.match(
  lobesTerminal,
  /\.term\.wrap pre\s*\{[^}]*overflow-x:\s*hidden[^}]*white-space:\s*pre-wrap[^}]*overflow-wrap:\s*anywhere/s,
  "Wrapped Lobes terminals must not require horizontal scrolling",
);
assert.match(
  reachyPage,
  /The identity probe uses the same full-width terminal row[\s\S]*?<div class="term-grid">[\s\S]*?<ReachyTerminal pane=\{identityWhoami\}/,
  "The Reachy identity terminal must use the shared full-width terminal row",
);
assert.doesNotMatch(
  reachyPage,
  /term-narrow/,
  "The Reachy page must not reintroduce a bespoke narrow terminal wrapper",
);
assert.match(
  reachyTerminal,
  /\.rterm\s*\{[^}]*width:\s*100%[^}]*max-width:\s*none[^}]*background:\s*#10142b[^}]*border:\s*1px solid rgba\(233,\s*236,\s*248,\s*0\.12\)/s,
  "Reachy terminals must fill their row and keep the shared fixed dark surface in both themes",
);
assert.match(
  reachyTerminal,
  /\.rterm-head\s*\{[^}]*color:\s*#a9b0cf/s,
  "Reachy terminal chrome must use the shared fixed dark-surface palette",
);
assert.match(
  reachyTerminal,
  /pre\s*\{[^}]*color:\s*#c7cde8/s,
  "Reachy transcripts must use the shared fixed dark-surface foreground",
);
assert.doesNotMatch(
  reachyTerminal,
  /background:\s*var\(--surface\)|color:\s*var\(--ink(?:-soft)?\)|color:\s*var\(--accent\)/,
  "Reachy terminal colors must not switch with the surrounding page theme",
);
checks += 8;

for (const [path, wrapper] of [
  ["pages/agents/devague.astro", "flow-wrap"],
  ["pages/agents/colleague.astro", "diagram-wrap"],
  ["pages/agents/lobes.astro", "diagram-wrap"],
  ["pages/agents/reachy-mini-cli.astro", "diagram-wrap"],
]) {
  const source = await readSource(path);
  assert.match(
    source,
    new RegExp(
      `\\.${wrapper}\\s*\\{[^}]*margin-block:\\s*`
      + "var\\(--ac-space-diagram-before\\)\\s*"
      + "var\\(--ac-space-diagram-after\\)",
      "s",
    ),
    `${path} must use the shared breathing room around its diagram and note`,
  );
  checks += 1;
}

for (const path of [
  "pages/agents/colleague.astro",
  "pages/agents/lobes.astro",
  "pages/agents/reachy-mini-cli.astro",
]) {
  const source = await readSource(path);
  assert.doesNotMatch(
    source,
    /container wide-rail/,
    `${path} must keep agent sections on the shared page rail`,
  );
  assert.match(
    source,
    /\.term-grid\s*\{[^}]*grid-template-columns:\s*minmax\(0,\s*1fr\)/s,
    `${path} must stack terminal captures on the reading rail`,
  );
  assert.doesNotMatch(
    source,
    /term-grid seam|\.term-grid\.seam/,
    `${path} must not restore side-by-side terminal seams`,
  );
  checks += 3;
}

const devague = await readSource("pages/agents/devague.astro");
assert.match(
  devague,
  /<figure class="gate-mock">[\s\S]*?<figcaption class="gate-mock-head">/,
);
assert.match(
  devague,
  /\.gate-mock\s*\{[^}]*width:\s*12rem[^}]*height:\s*12rem/s,
);
assert.match(
  devague,
  /\.gate-mock-cmd\s*\{[^}]*font-size:\s*var\(--ac-type-terminal\)/s,
);
assert.match(
  devague,
  /@media \(max-width:\s*40rem\)\s*\{[\s\S]*?\.gate-step\s*\{[^}]*flex-direction:\s*column/s,
);
assert.doesNotMatch(
  devague,
  /data-copy|class="copy-btn"|class="copy-icon"|navigator\.clipboard|execCommand/,
  "Devague's human-gate previews must remain read-only and omit copy controls",
);
checks += 5;

console.log(`Design-system contract passed: ${checks} checks across tokens, assigned rails, narrow agent capture stacks, the responsive shell, the seven-slide deck, four terminal components, shared diagram spacing, and the read-only Devague gate previews.`);
