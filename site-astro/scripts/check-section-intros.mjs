import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const root = new URL("../", import.meta.url);
const sourceRoot = new URL("src/", root);
const distRoot = new URL("dist/", root);

const readSource = (path) => readFile(new URL(path, sourceRoot), "utf8");
const readBuilt = (path) => readFile(new URL(path, distRoot), "utf8");
const count = (source, pattern) => (source.match(pattern) ?? []).length;

const routes = [
  {
    source: "pages/agents/devague.astro",
    built: "agents/devague/index.html",
    ids: [
      "pipeline",
      "method",
      "human-gate",
      "operator-skills",
      "real-captures",
      "whats-next",
    ],
  },
  {
    source: "pages/agents/colleague.astro",
    built: "agents/colleague/index.html",
    ids: [
      "paradigm",
      "tiers",
      "work-loop",
      "workforce",
      "cortex-senses",
      "memory",
      "more-surfaces",
      "dogfood",
      "whats-next",
    ],
  },
  {
    source: "pages/agents/lobes.astro",
    built: "agents/lobes/index.html",
    ids: ["lobes", "command", "profiles", "mesh-brain", "benchmarks"],
  },
  {
    source: "pages/agents/reachy-mini-cli.astro",
    built: "agents/reachy-mini-cli/index.html",
    ids: [
      "body",
      "noun-map",
      "sdk-owner",
      "live-senses",
      "thinking",
      "agent-first",
      "whats-next",
    ],
  },
  {
    source: "pages/articles/mind-nervous-system-body.astro",
    built: "articles/mind-nervous-system-body/index.html",
    ids: [
      "three-layer-thesis",
      "agent-as-mind",
      "symbolic-nervous-system",
      "robot-as-body",
      "bounded-learning",
      "perceive-to-retain",
      "consequences-and-non-claims",
      "sources-and-repositories",
    ],
    authoredCalls: 1,
  },
];

const component = await readSource("components/SectionIntro.astro");
assert.match(component, /class="section-intro"/);
assert.match(component, /data-section-intro/);
assert.match(component, /<h2 id=\{titleId\}/);
assert.match(component, /<slot name="after-title"\s*\/>/);
assert.match(component, /<style is:global>/);
assert.match(component, /max-width:\s*var\(--ac-measure-heading\)/);
assert.match(component, /max-width:\s*var\(--ac-measure-prose\)/);
assert.match(component, /prefers-reduced-motion|data-reveal/);

let sourceCalls = 0;
let renderedOpeners = 0;

for (const route of routes) {
  const [source, built] = await Promise.all([
    readSource(route.source),
    readBuilt(route.built),
  ]);
  const authoredCalls = route.authoredCalls ?? route.ids.length;

  assert.match(source, /import SectionIntro from "\.\.\/\.\.\/components\/SectionIntro\.astro";/);
  assert.equal(
    count(source, /<SectionIntro\b/g),
    authoredCalls,
    `${route.source} has the wrong authored SectionIntro count`,
  );
  assert.doesNotMatch(
    source,
    /<span class="eyebrow"/,
    `${route.source} still contains a copied section opener`,
  );
  assert.equal(
    count(built, /data-section-intro/g),
    route.ids.length,
    `${route.built} has the wrong rendered SectionIntro count`,
  );

  for (const [index, id] of route.ids.entries()) {
    const idPosition = built.indexOf(`id="${id}"`);
    const sectionStart = built.lastIndexOf("<section", idPosition);
    const nextIdPosition = index + 1 < route.ids.length
      ? built.indexOf(`id="${route.ids[index + 1]}"`, idPosition + 1)
      : -1;
    const nextSectionStart = nextIdPosition > -1
      ? built.lastIndexOf("<section", nextIdPosition)
      : built.length;
    const openingTagEnd = built.indexOf(">", sectionStart);
    const headerStart = built.indexOf(
      '<header class="section-intro',
      openingTagEnd,
    );
    const headingStart = built.indexOf(`<h2 id="${id}-title"`, headerStart);
    const proseStart = built.indexOf('class="section-intro-prose prose', headingStart);

    assert.notEqual(sectionStart, -1, `${route.built} is missing section #${id}`);
    assert.ok(
      built.slice(sectionStart, openingTagEnd).includes(`aria-labelledby="${id}-title"`),
      `${route.built} section #${id} is not labelled by its SectionIntro heading`,
    );
    assert.ok(
      sectionStart < headerStart
        && headerStart < headingStart
        && headingStart < proseStart
        && proseStart < nextSectionStart,
      `${route.built} section #${id} has the wrong opener order`,
    );
  }

  sourceCalls += authoredCalls;
  renderedOpeners += route.ids.length;
}

const article = await readBuilt("articles/mind-nervous-system-body/index.html");
const devague = await readBuilt("agents/devague/index.html");
assert.match(
  devague,
  /\.section-intro>h2\{[^}]*max-width:var\(--ac-measure-heading\)[^}]*margin-bottom:\.6em/,
  "Built pages must include the shared heading measure and standard spacing",
);
assert.match(
  article,
  /\.section-intro\[data-title-spacing=relaxed\]>h2\{margin-bottom:1em\}/,
  "Built article must include the relaxed title-spacing variant",
);
const definitionsStart = article.indexOf('class="definitions"');
const firstArticleProse = article.indexOf('class="section-intro-prose prose beat-prose"');
assert.ok(
  definitionsStart > -1 && definitionsStart < firstArticleProse,
  "Article definitions must remain between the first beat heading and prose",
);
assert.doesNotMatch(
  article,
  /class="section-intro-prose prose beat-prose" data-reveal/,
  "Article prose wrapper must not replace paragraph-level reveals",
);

const presentation = await readBuilt("presentations/mind-nervous-system-body/index.html");
assert.equal(count(presentation, /data-section-intro/g), 0);
assert.equal(count(presentation, /class="eyebrow"/g), 7);

assert.equal(sourceCalls, 28);
assert.equal(renderedOpeners, 35);

console.log(
  `Section-intro contract passed: ${sourceCalls} authored calls render ${renderedOpeners} openers across four agent profiles and the article; the seven-slide deck remains local.`,
);
