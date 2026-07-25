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
assert.match(footer, /container wide-rail/);
assert.match(pageHero, /container page-rail/);
assert.equal((deck.match(/container deck-content-rail/g) ?? []).length, 7);
checks += 5;

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

console.log(`Design-system contract passed: ${checks} checks across tokens, assigned rails, the responsive shell, the seven-slide deck, and four terminal components.`);
