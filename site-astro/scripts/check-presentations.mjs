import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const siteRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const distRoot = join(siteRoot, "dist");
const publicRoot = join(siteRoot, "public");

// Two independent surfaces since the articles/presentations split (plan
// 2026-07-20-articles-symbolic-presentations, task t7):
//   - Articles: the full 8-beat text talk, unchanged content, new /articles/ home.
//   - Presentations: a new symbolic slide deck, one route, image-anchored.
const routeFiles = {
  home: "index.html",
  articlesIndex: "articles/index.html",
  article: "articles/mind-nervous-system-body/index.html",
  presentationsIndex: "presentations/index.html",
  deck: "presentations/mind-nervous-system-body/index.html",
};

const thesis =
  "The agent is the mind. The code is the nervous system. The robot is the body.";
const articlesRoute = "/articles/";
const articleRoute = "/articles/mind-nervous-system-body/";
const presentationsRoute = "/presentations/";
const deckRoute = "/presentations/mind-nervous-system-body/";
const reachyCommit = "6eab58e5a2e83082c9b6cba1f50342fb2ecf40cf";
const armCommit = "c05bda23b2352bc80f7aca97c6268bbde7114c04";
const expectedBeatIds = [
  "three-layer-thesis",
  "agent-as-mind",
  "symbolic-nervous-system",
  "robot-as-body",
  "bounded-learning",
  "perceive-to-retain",
  "consequences-and-non-claims",
  "sources-and-repositories",
];
const expectedEvidenceUrls = [
  `https://github.com/agentculture/reachy-mini-cli/blob/${reachyCommit}/README.md`,
  `https://github.com/agentculture/reachy-mini-cli/blob/${reachyCommit}/docs/operating-reachy.md`,
  `https://github.com/agentculture/reachy-mini-cli/blob/${reachyCommit}/docs/deliveries/2026-07-17-symbolic-runtime-70.md`,
  `https://github.com/agentculture/reachy-mini-cli/blob/${reachyCommit}/reachy/cli/_commands/agent.py`,
  `https://github.com/agentculture/reachy-mini-cli/blob/${reachyCommit}/reachy/forge/activate.py`,
  `https://github.com/agentculture/reachy-mini-cli/blob/${reachyCommit}/reachy/forge/validator.py`,
  `https://github.com/agentculture/reachy-mini-cli/blob/${reachyCommit}/reachy/stash/record.py`,
  `https://github.com/agentculture/arm101-cli/blob/${armCommit}/README.md`,
  `https://github.com/agentculture/arm101-cli/blob/${armCommit}/docs/hardware-validation-arm-explore.md`,
  `https://github.com/agentculture/arm101-cli/blob/${armCommit}/arm101/hardware/gentle.py`,
  `https://github.com/agentculture/arm101-cli/blob/${armCommit}/arm101/hardware/safety.py`,
  `https://github.com/agentculture/arm101-cli/blob/${armCommit}/arm101/explore/reachmap.py`,
];

// The deck (post cli-runtime-reframe, org#21): exactly 10 slides, exactly 4
// photo-bearing slides — 2 per robot, one "robot"-kind (hero photo) and one
// "commands"-kind (action photo) each. The renderer stamps `data-robot` on
// both kinds whenever `slide.robot` is set, so the count/slot checks below
// key off that attribute generically rather than slide kind.
const expectedDeckSlideCount = 10;
const robotPhotoSlots = {
  "reachy-mini": ["reachy-mini-hero", "reachy-mini-action"],
  so101: ["so101-hero", "so101-action"],
};
const expectedRobotSlideCounts = { "reachy-mini": 2, so101: 2 };
const deckImagePaths = [
  "/presentations/reachy-mini-hero.webp",
  "/presentations/reachy-mini-action.webp",
  "/presentations/so101-hero.webp",
  "/presentations/so101-action.webp",
];

const failures = [];
let checksPassed = 0;

function fail(message) {
  throw new Error(message);
}

function assert(condition, message) {
  if (!condition) fail(message);
}

function check(label, assertion) {
  try {
    assertion();
    checksPassed += 1;
  } catch (error) {
    failures.push(`${label}: ${error.message}`);
  }
}

function decodeHtml(value) {
  const named = {
    amp: "&",
    apos: "'",
    gt: ">",
    lt: "<",
    nbsp: " ",
    quot: '"',
  };
  return value
    .replace(/&#x([0-9a-f]+);/gi, (_, code) =>
      String.fromCodePoint(Number.parseInt(code, 16)),
    )
    .replace(/&#([0-9]+);/g, (_, code) =>
      String.fromCodePoint(Number.parseInt(code, 10)),
    )
    .replace(/&([a-z]+);/gi, (entity, name) => named[name] ?? entity);
}

function textContent(value) {
  return decodeHtml(
    value
      .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
      .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
      .replace(/<!--([\s\S]*?)-->/g, " ")
      .replace(/<[^>]+>/g, " "),
  )
    .replace(/\s+/g, " ")
    .trim();
}

function attributes(value) {
  const parsed = {};
  const pattern =
    /([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;
  for (const match of value.matchAll(pattern)) {
    parsed[match[1].toLowerCase()] = decodeHtml(
      match[2] ?? match[3] ?? match[4] ?? "",
    );
  }
  return parsed;
}

function hasClass(attrs, className) {
  return (attrs.class ?? "").split(/\s+/).includes(className);
}

function elements(html, tag) {
  const pattern = new RegExp(
    `<${tag}\\b([^>]*)>([\\s\\S]*?)<\\/${tag}>`,
    "gi",
  );
  return [...html.matchAll(pattern)].map((match) => ({
    attrs: attributes(match[1]),
    inner: match[2],
    outer: match[0],
  }));
}

function openings(html, tag) {
  const pattern = new RegExp(`<${tag}\\b([^>]*)>`, "gi");
  return [...html.matchAll(pattern)].map((match) => attributes(match[1]));
}

function elementByClass(html, tag, className) {
  return elements(html, tag).find((element) =>
    hasClass(element.attrs, className),
  );
}

function anchors(html) {
  return elements(html, "a").map((anchor) => ({
    ...anchor,
    text: textContent(anchor.inner),
  }));
}

function linksTo(html, href) {
  return anchors(html).filter((anchor) => anchor.attrs.href === href);
}

function countOccurrences(html, needle) {
  return (html.match(new RegExp(needle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g")) ?? [])
    .length;
}

function requireRegion(html, tag, className, pageLabel) {
  const region = elementByClass(html, tag, className);
  assert(region, `${pageLabel} is missing ${tag}.${className}`);
  return region;
}

// data-deck-slide also appears once as a bare CSS/JS attribute selector
// (`[data-deck-slide]` inside the inline nav script) — always match the
// attribute *value* form (`data-deck-slide="..."`), never a bare substring
// count, or that selector inflates the slide count by one.
function deckSlideSections(html) {
  return elements(html, "section").filter(
    (element) => element.attrs["data-deck-slide"],
  );
}

function htmlFiles(directory) {
  const found = [];
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) found.push(...htmlFiles(path));
    if (entry.isFile() && entry.name.endsWith(".html")) found.push(path);
  }
  return found.sort();
}

function outputForInternalHref(href) {
  const path = href.split(/[?#]/, 1)[0];
  if (path === "/") return join(distRoot, "index.html");
  if (path.endsWith("/")) return join(distRoot, path.slice(1), "index.html");
  if (path.endsWith(".html")) return join(distRoot, path.slice(1));
  return join(distRoot, path.slice(1), "index.html");
}

const toPosix = (p) => p.split(sep).join("/");

// --- structural: no _redirects; old deep links are allowed to break. ---
check("no public/_redirects file", () => {
  assert(
    !existsSync(join(publicRoot, "_redirects")),
    "public/_redirects must not exist — old /presentations/mind-nervous-system-body/ deep links are allowed to break, not silently redirected",
  );
});

for (const [label, path] of Object.entries(routeFiles)) {
  if (!existsSync(join(distRoot, path))) {
    failures.push(
      `${label} route: missing dist/${path}; run \`npm run build\` first`,
    );
  }
}

if (failures.length > 0) {
  for (const failure of failures) console.error(`FAIL ${failure}`);
  process.exit(1);
}

const builtHtmlFiles = htmlFiles(distRoot);
const builtPages = new Map(
  builtHtmlFiles.map((path) => [
    toPosix(relative(distRoot, path)),
    readFileSync(path, "utf8"),
  ]),
);
const homeHtml = builtPages.get(routeFiles.home);
const articlesIndexHtml = builtPages.get(routeFiles.articlesIndex);
const articleHtml = builtPages.get(routeFiles.article);
const presentationsIndexHtml = builtPages.get(routeFiles.presentationsIndex);
const deckHtml = builtPages.get(routeFiles.deck);

check("site-wide Articles + Presentations wayfinding", () => {
  for (const [path, html] of builtPages) {
    const header = requireRegion(html, "header", "site-header", path);
    const footer = requireRegion(html, "footer", "site-footer", path);
    for (const route of [articlesRoute, presentationsRoute]) {
      assert(
        linksTo(header.outer, route).length === 1,
        `${path} header must contain exactly one ${route} link`,
      );
      assert(
        linksTo(footer.outer, route).length === 1,
        `${path} footer must contain exactly one ${route} link`,
      );
    }
  }
  const explore = elements(homeHtml, "section").find(
    (section) => section.attrs["aria-label"] === "Explore",
  );
  assert(explore, "home page is missing its Explore region");
  for (const route of [articlesRoute, presentationsRoute]) {
    assert(
      linksTo(explore.outer, route).length === 1,
      `home Explore must contain exactly one ${route} link`,
    );
  }
});

check("article routes and internal links", () => {
  assert(
    existsSync(join(distRoot, routeFiles.articlesIndex)),
    "articles index route is missing",
  );
  assert(
    existsSync(join(distRoot, routeFiles.article)),
    "article route is missing",
  );
  const articleLinks = [];
  for (const [path, html] of builtPages) {
    for (const anchor of anchors(html)) {
      if (anchor.attrs.href?.startsWith(articlesRoute)) {
        articleLinks.push({ from: path, href: anchor.attrs.href });
      }
    }
  }
  assert(articleLinks.length > 0, "no internal article links found");
  const broken = articleLinks.filter(
    ({ href }) => !existsSync(outputForInternalHref(href)),
  );
  assert(
    broken.length === 0,
    `unresolved links: ${broken.map(({ from, href }) => `${from} -> ${href}`).join(", ")}`,
  );
});

check("deck routes and internal links", () => {
  assert(
    existsSync(join(distRoot, routeFiles.presentationsIndex)),
    "presentations index route is missing",
  );
  assert(existsSync(join(distRoot, routeFiles.deck)), "deck route is missing");
  const deckLinks = [];
  for (const [path, html] of builtPages) {
    for (const anchor of anchors(html)) {
      if (anchor.attrs.href?.startsWith(presentationsRoute)) {
        deckLinks.push({ from: path, href: anchor.attrs.href });
      }
    }
  }
  assert(deckLinks.length > 0, "no internal presentation links found");
  const broken = deckLinks.filter(
    ({ href }) => !existsSync(outputForInternalHref(href)),
  );
  assert(
    broken.length === 0,
    `unresolved links: ${broken.map(({ from, href }) => `${from} -> ${href}`).join(", ")}`,
  );
});

check("articles library card contract", () => {
  const cards = anchors(articlesIndexHtml).filter((anchor) =>
    hasClass(anchor.attrs, "presentation-card"),
  );
  assert(cards.length === 1, `expected exactly 1 card, found ${cards.length}`);
  assert(cards[0].attrs.href === articleRoute, `card must link to ${articleRoute}`);
  for (const expected of [
    "Mind, nervous system, body",
    "Neurosymbolic robotics",
    "Reachy Mini CLI",
    "ARM101 CLI",
  ]) {
    assert(cards[0].text.includes(expected), `card is missing “${expected}”`);
  }
});

check("presentations library card contract", () => {
  // Retitled by the cli-runtime-reframe (org#21): the presentation card leads
  // with the operational-architecture story, distinct from the article card
  // below, which keeps the original mind/nervous-system/body framing.
  const cards = anchors(presentationsIndexHtml).filter((anchor) =>
    hasClass(anchor.attrs, "presentation-card"),
  );
  assert(cards.length === 1, `expected exactly 1 card, found ${cards.length}`);
  assert(cards[0].attrs.href === deckRoute, `card must link to ${deckRoute}`);
  for (const expected of [
    "A CLI for intelligence, a runtime for embodiment",
    "Robot operational architecture",
    "Reachy Mini CLI",
    "ARM101 CLI",
  ]) {
    assert(cards[0].text.includes(expected), `card is missing “${expected}”`);
  }
});

check("article hero and ordered beats", () => {
  const hero = elements(articleHtml, "h1").find(
    (heading) => heading.attrs.id === "talk-title",
  );
  assert(hero, "article h1#talk-title is missing");
  assert(textContent(hero.inner) === thesis, `hero must exactly equal “${thesis}”`);
  const beats = openings(articleHtml, "section").filter(
    (section) => section["data-talk-beat"],
  );
  assert(beats.length === 8, `expected 8 beats, found ${beats.length}`);
  const actualIds = beats.map((beat) => beat["data-talk-beat"]);
  assert(
    JSON.stringify(actualIds) === JSON.stringify(expectedBeatIds),
    `beat order is ${actualIds.join(" -> ")}`,
  );
  const indexes = beats.map((beat) => beat["data-beat-index"]);
  assert(
    indexes.every((index, position) => index === String(position + 1)),
    `beat indexes must be 1..8, found ${indexes.join(", ")}`,
  );
  const sourceNoteCount = openings(articleHtml, "aside").filter((aside) =>
    (aside.class ?? "").split(/\s+/).includes("source-notes"),
  ).length;
  assert(
    sourceNoteCount === 8,
    `each beat needs source notes; found ${sourceNoteCount}`,
  );
});

check("repository homes, related agent, and immutable evidence", () => {
  const hrefs = anchors(articleHtml).map((anchor) => anchor.attrs.href).filter(Boolean);
  for (const href of [
    "https://github.com/agentculture/reachy-mini-cli",
    "https://github.com/agentculture/arm101-cli",
    "/agents/reachy-mini-cli/",
  ]) {
    assert(hrefs.includes(href), `article is missing ${href}`);
  }
  for (const url of expectedEvidenceUrls) {
    assert(hrefs.includes(url), `article is missing pinned evidence ${url}`);
  }
  const blobLinks = hrefs.filter((href) =>
    /^https:\/\/github\.com\/agentculture\/(reachy-mini-cli|arm101-cli)\/blob\//.test(href),
  );
  const unexpected = blobLinks.filter(
    (href) => !expectedEvidenceUrls.includes(href),
  );
  assert(
    unexpected.length === 0,
    `found evidence outside the reviewed commits: ${[...new Set(unexpected)].join(", ")}`,
  );
});

check("synthesis and explicit limits", () => {
  const articleText = textContent(articleHtml);
  for (const phrase of [
    "neurosymbolic as its own architectural synthesis",
    "It does not mean either robot updates model weights online.",
    "no shared runtime or shipped cross-repository integration",
    "not a shipped autonomous loop",
    "no forge or stash tools",
    "arm flex does not consume this map",
  ]) {
    assert(articleText.includes(phrase), `article is missing boundary “${phrase}”`);
  }
});

check("accessible static architecture diagram", () => {
  const diagram = openings(articleHtml, "svg").find(
    (svg) => svg.role === "img" && svg["aria-labelledby"],
  );
  assert(diagram, "diagram needs role=img and an accessible name/description");
  assert(
    openings(articleHtml, "title").some(
      (title) => title.id === "mind-body-diagram-title",
    ),
    "diagram title is missing",
  );
  assert(
    openings(articleHtml, "desc").some(
      (desc) => desc.id === "mind-body-diagram-desc",
    ),
    "diagram text alternative is missing",
  );
});

check("deck is not the article: no article beat-id anchors", () => {
  // A deck slide id may legitimately echo a beat id it distills from (e.g.
  // the "bounded-learning" concept slide) — that's a same-page anchor, not
  // the article. What must never appear on the deck is the article's own
  // beat marker: the `data-talk-beat="..."` attribute the article checker
  // above uses to enumerate its 8 ordered beats.
  for (const beatId of expectedBeatIds) {
    assert(
      !new RegExp(`data-talk-beat="${beatId}"`).test(deckHtml),
      `deck must not carry article beat anchor data-talk-beat="${beatId}"`,
    );
  }
  assert(
    !/data-talk-beat="/.test(deckHtml),
    "deck must not carry any data-talk-beat marker — that attribute belongs only to the article",
  );
});

check("deck slide count and two-photo-slides-per-robot structure", () => {
  // Careful: `data-deck-slide` also appears once as a bare CSS/JS attribute
  // selector (`[data-deck-slide]`); only the attribute-value form below
  // (`data-deck-slide="..."`) counts real slide sections.
  const slideValueCount = countOccurrences(deckHtml, 'data-deck-slide="');
  assert(
    slideValueCount === expectedDeckSlideCount,
    `expected ${expectedDeckSlideCount} data-deck-slide="..." sections, found ${slideValueCount}`,
  );

  const slides = deckSlideSections(deckHtml);
  assert(
    slides.length === expectedDeckSlideCount,
    `expected ${expectedDeckSlideCount} parsed slide sections, found ${slides.length}`,
  );

  for (const [robot, expectedCount] of Object.entries(
    expectedRobotSlideCounts,
  )) {
    const count = countOccurrences(deckHtml, `data-robot="${robot}"`);
    assert(
      count === expectedCount,
      `expected ${expectedCount} data-robot="${robot}" slides, found ${count}`,
    );
  }

  const robotSlides = slides.filter((slide) => slide.attrs["data-robot"]);
  const expectedRobotSlideTotal = Object.values(
    expectedRobotSlideCounts,
  ).reduce((sum, n) => sum + n, 0);
  assert(
    robotSlides.length === expectedRobotSlideTotal,
    `expected ${expectedRobotSlideTotal} robot slides total, found ${robotSlides.length}`,
  );

  for (const slide of robotSlides) {
    const slideId = slide.attrs["data-deck-slide"];
    const robot = slide.attrs["data-robot"];
    const allowedSlots = robotPhotoSlots[robot];
    assert(allowedSlots, `slide ${slideId} has unknown robot "${robot}"`);
    const photoSlot = openings(slide.inner, "figure")
      .map((figure) => figure["data-photo-slot"])
      .find(Boolean);
    assert(photoSlot, `robot slide ${slideId} is missing a data-photo-slot`);
    assert(
      allowedSlots.includes(photoSlot),
      `slide ${slideId} (${robot}) has photo slot "${photoSlot}", expected one of ${allowedSlots.join(", ")}`,
    );
  }
});

check("deck imagery: four robot photos with alt text", () => {
  const images = openings(deckHtml, "img");
  for (const path of deckImagePaths) {
    const matches = images.filter((img) => img.src === path);
    assert(
      matches.length === 1,
      `expected exactly one <img> referencing ${path}, found ${matches.length}`,
    );
    assert(
      (matches[0].alt ?? "").trim().length > 0,
      `${path} must have non-empty alt text`,
    );
  }
});

check("deck architecture diagram is accessible and appears exactly once", () => {
  // CliRuntimeStackDiagram (t2) embeds once, on the "diagram"-kind slide.
  const diagrams = openings(deckHtml, "svg").filter((svg) => {
    if (svg.role !== "img") return false;
    const labelledby = (svg["aria-labelledby"] ?? "").split(/\s+/);
    return (
      labelledby.includes("cli-runtime-diagram-title") &&
      labelledby.includes("cli-runtime-diagram-desc")
    );
  });
  assert(
    diagrams.length === 1,
    `expected exactly one accessible architecture diagram, found ${diagrams.length}`,
  );
  assert(
    openings(deckHtml, "title").some(
      (title) => title.id === "cli-runtime-diagram-title",
    ),
    "deck diagram title is missing",
  );
  assert(
    openings(deckHtml, "desc").some(
      (desc) => desc.id === "cli-runtime-diagram-desc",
    ),
    "deck diagram text alternative is missing",
  );
});

check("deck states the thesis verbatim", () => {
  // The renderer splits the two-sentence headline across reveal spans
  // (thesisLines()), so normalize whitespace before matching textContent.
  const deckText = textContent(deckHtml);
  assert(
    deckText.includes("A CLI for intelligence. A runtime for embodiment."),
    "deck must state the verbatim thesis “A CLI for intelligence. A runtime for embodiment.”",
  );
});

check("every deck “50 Hz” mention is labeled design rate", () => {
  const deckText = textContent(deckHtml);
  const matches = [...deckText.matchAll(/50\s*Hz/g)];
  assert(matches.length > 0, "deck must mention 50 Hz at least once");
  for (const match of matches) {
    const window = deckText.slice(match.index, match.index + 40);
    assert(
      /design rate/.test(window),
      `“50 Hz” at position ${match.index} is not labeled design rate within 40 chars: “${window}”`,
    );
  }
});

check("deck links both repo homes, never pinned evidence blobs", () => {
  // Sources are subordinate on the deck (deckSources): repo-home links only.
  // The commit-pinned blob ledger stays article-side (see the evidence check
  // above) — the deck must carry none of it.
  for (const href of [
    "https://github.com/agentculture/reachy-mini-cli",
    "https://github.com/agentculture/arm101-cli",
  ]) {
    assert(linksTo(deckHtml, href).length >= 1, `deck is missing ${href}`);
  }
  const blobLinks = anchors(deckHtml).filter((anchor) =>
    /^https:\/\/github\.com\/agentculture\/(reachy-mini-cli|arm101-cli)\/blob\//.test(
      anchor.attrs.href ?? "",
    ),
  );
  assert(
    blobLinks.length === 0,
    `deck must not link pinned evidence blobs; found ${blobLinks.map((a) => a.attrs.href).join(", ")}`,
  );
});

check("deck routes depth-seekers to the article", () => {
  assert(
    linksTo(deckHtml, articleRoute).length >= 1,
    `deck must link to ${articleRoute}`,
  );
});

check("home links both Articles and Presentations", () => {
  assert(
    linksTo(homeHtml, articlesRoute).length >= 1,
    `home page must link ${articlesRoute}`,
  );
  assert(
    linksTo(homeHtml, presentationsRoute).length >= 1,
    `home page must link ${presentationsRoute}`,
  );
});

check("current nav state per surface", () => {
  const surfaces = [
    {
      label: "articles index",
      html: articlesIndexHtml,
      activeLabel: "Articles",
      activeHref: articlesRoute,
    },
    {
      label: "article",
      html: articleHtml,
      activeLabel: "Articles",
      activeHref: articlesRoute,
    },
    {
      label: "presentations index",
      html: presentationsIndexHtml,
      activeLabel: "Presentations",
      activeHref: presentationsRoute,
    },
    {
      label: "deck",
      html: deckHtml,
      activeLabel: "Presentations",
      activeHref: presentationsRoute,
    },
  ];
  for (const { label, html, activeLabel, activeHref } of surfaces) {
    const header = requireRegion(html, "header", "site-header", label);
    const footer = requireRegion(html, "footer", "site-footer", label);
    for (const [regionLabel, region] of [
      ["Header", header],
      ["Footer", footer],
    ]) {
      const current = anchors(region.outer).filter(
        (anchor) => anchor.attrs["aria-current"] === "page",
      );
      assert(
        current.length === 1,
        `${label} ${regionLabel} needs exactly one current link, found ${current.length}`,
      );
      assert(
        current[0].attrs.href === activeHref && current[0].text === activeLabel,
        `${label} ${regionLabel} current link must be ${activeLabel}`,
      );
    }
    const pageCurrent = anchors(html).filter(
      (anchor) => anchor.attrs["aria-current"] === "page",
    );
    assert(
      pageCurrent.length === 2,
      `${label} must have current state in Header and Footer only; found ${pageCurrent.length}`,
    );
  }
});

if (failures.length > 0) {
  for (const failure of failures) console.error(`FAIL ${failure}`);
  console.error(
    `Presentation contract failed: ${failures.length} of ${checksPassed + failures.length} checks failed.`,
  );
  process.exit(1);
}

console.log(
  `Presentation contract passed: ${checksPassed} checks across ${builtHtmlFiles.length} pages; ` +
    `1 article + 8 ordered beats + ${expectedEvidenceUrls.length} immutable evidence links; ` +
    `1 deck with ${expectedDeckSlideCount} slides (${Object.entries(expectedRobotSlideCounts)
      .map(([robot, count]) => `${count} ${robot}`)
      .join(", ")}) and 4 captioned photos, ` +
    `one accessible architecture diagram, the verbatim thesis, design-rate-labeled 50 Hz, ` +
    `and repo-home-only sources.`,
);
