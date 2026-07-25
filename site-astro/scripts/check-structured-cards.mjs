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
    calls: 2,
    grids: 2,
    cards: 14,
  },
  {
    source: "pages/agents/colleague.astro",
    built: "agents/colleague/index.html",
    calls: 5,
    grids: 5,
    cards: 25,
  },
  {
    source: "pages/agents/reachy-mini-cli.astro",
    built: "agents/reachy-mini-cli/index.html",
    calls: 4,
    grids: 4,
    cards: 25,
  },
  {
    source: "pages/agents/lobes.astro",
    built: "agents/lobes/index.html",
    calls: 1,
    grids: 1,
    cards: 6,
  },
];

const excludedBuiltRoutes = [
  "index.html",
  "agents/index.html",
  "articles/index.html",
  "articles/mind-nervous-system-body/index.html",
  "presentations/index.html",
  "presentations/mind-nervous-system-body/index.html",
];

const component = await readSource("components/StructuredCard.astro");

assert.match(component, /data-structured-card/);
assert.match(component, /<h3 class="structured-card__title">/);
assert.match(component, /titleKind === "code"/);
assert.doesNotMatch(component, /copyText|clipboard|execCommand|structured-card__copy/);
assert.match(component, /\.structured-card-grid\s*\{[\s\S]*?max-width:\s*52rem/);
assert.match(component, /grid-template-columns:\s*repeat\(3,\s*minmax\(0,\s*1fr\)\)/);
assert.match(component, /@media \(max-width:\s*68rem\)/);
assert.match(component, /@media \(max-width:\s*42\.5rem\)/);
assert.match(component, /\.structured-card__body\s*\{[\s\S]*?font-size:\s*1rem/);

let authoredCalls = 0;
let renderedCards = 0;

for (const route of routes) {
  const [source, built] = await Promise.all([
    readSource(route.source),
    readBuilt(route.built),
  ]);

  assert.match(
    source,
    /import StructuredCard from "\.\.\/\.\.\/components\/StructuredCard\.astro";/,
  );
  assert.equal(
    count(source, /<StructuredCard\b/g),
    route.calls,
    `${route.source} has the wrong authored StructuredCard count`,
  );
  assert.equal(
    count(
      source,
      /<(?:ul|ol)\b[^>]*class="[^"]*\bstructured-card-grid\b[^"]*"/g,
    ),
    route.grids,
    `${route.source} has the wrong structured-card grid count`,
  );

  const cards = [
    ...built.matchAll(
      /<li class="card structured-card[^"]*" data-structured-card[^>]*>([\s\S]*?)<\/li>/g,
    ),
  ];
  assert.equal(
    cards.length,
    route.cards,
    `${route.built} has the wrong rendered StructuredCard count`,
  );
  assert.equal(
    count(
      built,
      /<(?:ul|ol)\b[^>]*class="[^"]*\bstructured-card-grid\b[^"]*"/g,
    ),
    route.grids,
    `${route.built} has the wrong rendered grid count`,
  );

  for (const [, contents] of cards) {
    const meta = contents.indexOf('class="structured-card__meta"');
    const title = contents.indexOf('<h3 class="structured-card__title">');
    const body = contents.indexOf('class="structured-card__body muted"');
    const footer = contents.indexOf('class="structured-card__footer');

    assert.ok(title > -1 && body > title, `${route.built} has an invalid title/body order`);
    assert.ok(meta === -1 || meta < title, `${route.built} has metadata after its title`);
    assert.ok(footer === -1 || footer > body, `${route.built} has a footer before its body`);
  }

  assert.doesNotMatch(
    built,
    /data-structured-card-copy|structured-card__copy/,
    `${route.built} must not render structured-card copy controls`,
  );

  authoredCalls += route.calls;
  renderedCards += cards.length;
}

const devague = await readBuilt("agents/devague/index.html");
const devagueSource = await readSource("pages/agents/devague.astro");
const colleague = await readBuilt("agents/colleague/index.html");
const lobes = await readBuilt("agents/lobes/index.html");
assert.match(
  devagueSource,
  /<ol class="structured-card-grid method-moves">/,
  "Devague's method grid must retain its review-mock layout hook",
);
assert.match(
  devagueSource,
  /\.structured-card-grid\.method-moves\s*\{[\s\S]*?repeat\(auto-fit,\s*minmax\(min\(100%,\s*18rem\),\s*1fr\)\)[\s\S]*?grid-auto-rows:\s*auto[\s\S]*?gap:\s*1\.1rem/,
  "Devague's method grid must retain the mock's natural rows and responsive columns",
);
assert.match(
  devagueSource,
  /<ol[\s\S]*class="card pipeline-stage-list"[\s\S]*?<p class="pipeline-stage-engine">\{stage\.engine\}<\/p>[\s\S]*?<h3 class="pipeline-stage-name">\{stage\.name\}<\/h3>/,
  "Devague's pipeline must use the ruled reference list with engine metadata before the stage name",
);
assert.match(
  devagueSource,
  /\.pipeline-stage-row\s*\{[\s\S]*?grid-template-columns:\s*minmax\(11rem,\s*12\.5rem\)\s*minmax\(0,\s*1fr\)[\s\S]*?border-bottom:\s*1px solid var\(--line-soft\)/,
  "Devague's pipeline reference rows must retain their two-column ruled layout",
);
assert.equal(
  count(devague, /class="pipeline-stage-row"/g),
  7,
  "Devague must render all seven pipeline stages as reference rows",
);
assert.equal(
  count(devague, /class="card structured-card is-featured"/g),
  1,
  "Devague must retain one featured method card",
);
assert.equal(
  count(devague, /class="structured-card__title-code"/g),
  7,
  "Only Devague's seven command titles should use code semantics",
);
assert.match(
  devague,
  /\.structured-card-grid\{[^}]*grid-template-columns:repeat\(3,minmax\(0,1fr\)\)[^}]*max-width:52rem/,
  "Built pages must contain the shared desktop grid",
);
assert.equal(
  count(devague, /data-code-chip-footer/g),
  7,
  "Only Devague's seven pipeline rows should use chip footers",
);
assert.equal(
  count(devague, /data-code-chip(?:>| )/g),
  31,
  "Devague's pipeline commands must retain their meaningful grouping",
);
assert.equal(
  count(colleague, /data-code-chip-footer/g),
  3,
  "Only Colleague's three tier cards should use chip footers",
);
assert.equal(
  count(colleague, /data-code-chip(?:>| )/g),
  8,
  "Colleague's tier commands must retain their meaningful grouping",
);
assert.doesNotMatch(
  lobes,
  /data-code-chip-footer/,
  "Lobes model-name footers must not receive command-chip styling",
);

for (const builtPath of excludedBuiltRoutes) {
  const built = await readBuilt(builtPath);
  assert.doesNotMatch(
    built,
    /<li class="card structured-card[^"]*" data-structured-card/,
    `${builtPath} must keep its semantically distinct card family`,
  );
}

assert.equal(authoredCalls, 12);
assert.equal(renderedCards, 70);

console.log(
  `Structured-card contract passed: ${authoredCalls} authored calls render ` +
    `${renderedCards} cards across four agent profiles; excluded card families remain local.`,
);
