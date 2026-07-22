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

// The deck (post deck-six-slide-narrative, org#23; re-pinned by the
// autonomy-stuck-vignette plan, then extended by whats-next-finale-slide):
// exactly 7 slides, one per primary beat, in a pinned id/order — bridge,
// paths, stack, surfaces, autonomy, close, whats-next. The finale carries the
// See/Remember/Act glyph triad, two next-step cards, and the separation band,
// with no photo slot and no data-robot of its own. The
// autonomy slide went robot-generic and photo-free: `data-robot` appears
// exactly twice for reachy-mini (its dedicated "surfaces" section, plus its
// close-slide card) and exactly once for so101 (only its close-slide card —
// the "autonomy" section itself carries no `data-robot` attribute at all).
// The three surviving photo-bearing <figure data-photo-slot> elements are
// likewise down from four: one action photo inside the "surfaces" section,
// both hero photos inside the close slide's two cards. The "autonomy"
// section instead renders three photo-free DeckSituationVignettes figures —
// stuck, disconnected, routine — as one matched trio. The checks below key
// off `data-deck-slide` section ids rather than slide kind, since kind is a
// dataset-only concept not stamped onto the built HTML.
const expectedDeckSlideCount = 7;
const expectedDeckSlideIds = [
  "bridge",
  "paths",
  "stack",
  "surfaces",
  "autonomy",
  "close",
  "whats-next",
];
// Section-level data-robot: the one slide (besides "close") reachy-mini
// anchors, and the one action-photo slot that lives inside it. "autonomy" is
// robot-generic — it anchors no robot and carries no data-robot attribute.
const expectedSectionRobots = { surfaces: "reachy-mini" };
// Where each of the three surviving photo slots' <figure data-photo-slot>
// must live.
const expectedPhotoSlotSections = {
  "reachy-mini-action": "surfaces",
  "reachy-mini-hero": "close",
  "so101-hero": "close",
};
const expectedRobotSlideCounts = { "reachy-mini": 2, so101: 1 };
const deckImagePaths = [
  "/presentations/reachy-mini-hero.webp",
  "/presentations/reachy-mini-action.webp",
  "/presentations/so101-hero.webp",
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

check("deck slide count and id order (seven slides: org#23 + the finale)", () => {
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

  const actualIds = slides.map((slide) => slide.attrs["data-deck-slide"]);
  assert(
    JSON.stringify(actualIds) === JSON.stringify(expectedDeckSlideIds),
    `deck slide order is ${actualIds.join(" -> ")}, expected ${expectedDeckSlideIds.join(" -> ")}`,
  );
});

check(
  "deck robot/photo-slot pairing: surfaces, autonomy, and the close cards",
  () => {
    const slides = deckSlideSections(deckHtml);
    const bySlideId = new Map(
      slides.map((slide) => [slide.attrs["data-deck-slide"], slide]),
    );

    // Section-level data-robot: surfaces carries reachy-mini (one robot,
    // stamped on the section itself).
    for (const [slideId, robot] of Object.entries(expectedSectionRobots)) {
      const slide = bySlideId.get(slideId);
      assert(slide, `deck is missing the "${slideId}" slide section`);
      assert(
        slide.attrs["data-robot"] === robot,
        `"${slideId}" section must carry data-robot="${robot}", found "${slide.attrs["data-robot"] ?? ""}"`,
      );
    }

    // Autonomy is robot-generic and photo-free (autonomy-stuck-vignette
    // plan): its section must carry no data-robot attribute at all.
    const autonomySectionSlide = bySlideId.get("autonomy");
    assert(
      autonomySectionSlide,
      'deck is missing the "autonomy" slide section',
    );
    assert(
      autonomySectionSlide.attrs["data-robot"] === undefined,
      `"autonomy" section must not carry a data-robot attribute, found "${autonomySectionSlide.attrs["data-robot"]}"`,
    );

    // Card-level data-robot: the close slide carries both robots, one per
    // card, inside its section rather than on the section's opening tag.
    const closeSlide = bySlideId.get("close");
    assert(closeSlide, 'deck is missing the "close" slide section');
    for (const robot of ["reachy-mini", "so101"]) {
      const cardCount = countOccurrences(closeSlide.inner, `data-robot="${robot}"`);
      assert(
        cardCount === 1,
        `close slide's ${robot} card must carry data-robot="${robot}" exactly once, found ${cardCount}`,
      );
    }

    // Deck-wide: reachy-mini's data-robot attribute appears exactly twice —
    // once on its "surfaces" section, once on its close-slide card. so101 is
    // robot-generic on autonomy now, so it appears exactly once — only on
    // its close-slide card.
    for (const [robot, expectedCount] of Object.entries(
      expectedRobotSlideCounts,
    )) {
      const totalCount = countOccurrences(deckHtml, `data-robot="${robot}"`);
      assert(
        totalCount === expectedCount,
        `expected ${expectedCount} data-robot="${robot}" occurrences deck-wide, found ${totalCount}`,
      );
    }

    // Each of the three surviving photo slots' <figure data-photo-slot>
    // must live inside exactly the section named in
    // expectedPhotoSlotSections — reachy-mini-action inside surfaces, and
    // both hero slots inside the close slide's two cards.
    const foundIn = {};
    for (const [slideId, slide] of bySlideId) {
      for (const figure of openings(slide.inner, "figure")) {
        const slot = figure["data-photo-slot"];
        if (!slot) continue;
        (foundIn[slot] ??= []).push(slideId);
      }
    }
    for (const [slot, expectedSection] of Object.entries(
      expectedPhotoSlotSections,
    )) {
      const locations = foundIn[slot] ?? [];
      assert(
        locations.length === 1,
        `expected exactly one <figure data-photo-slot="${slot}">, found ${locations.length} (in: ${locations.join(", ") || "none"})`,
      );
      assert(
        locations[0] === expectedSection,
        `<figure data-photo-slot="${slot}"> must be inside the "${expectedSection}" section, found in "${locations[0]}"`,
      );
    }
  },
);

check("deck autonomy trio: three situation vignettes, no photo", () => {
  // The autonomy slide (autonomy-stuck-vignette plan) is robot-generic and
  // photo-free: it renders three DeckSituationVignettes figures — stuck,
  // disconnected, routine — as a matched trio, never a <figure
  // data-photo-slot> photo.
  const autonomySlide = deckSlideSections(deckHtml).find(
    (slide) => slide.attrs["data-deck-slide"] === "autonomy",
  );
  assert(autonomySlide, 'deck is missing the "autonomy" slide section');

  const figures = elements(autonomySlide.inner, "figure");
  assert(
    figures.length === 3,
    `autonomy section must contain exactly 3 <figure> vignettes, found ${figures.length}`,
  );

  for (const situation of ["stuck", "disconnected", "routine"]) {
    const className = `vignette-${situation}`;
    const matches = figures.filter((figure) =>
      hasClass(figure.attrs, className),
    );
    assert(
      matches.length === 1,
      `autonomy section must contain exactly one figure.${className}, found ${matches.length}`,
    );
  }

  const photoSlotCount = countOccurrences(
    autonomySlide.inner,
    "data-photo-slot",
  );
  assert(
    photoSlotCount === 0,
    `autonomy section must contain zero data-photo-slot occurrences, found ${photoSlotCount}`,
  );
});

check("deck finale: whats-next is last with the triad, separation band, no photo", () => {
  // The whats-next finale (whats-next-finale-slide spec) closes the deck:
  // the See/Remember/Act glyph triad, two next-step cards, and the shared
  // separation band — no photo slot and no data-robot, so the deck-wide
  // robot/photo counts stay owned by surfaces and close.
  const sections = deckSlideSections(deckHtml);
  const finale = sections[sections.length - 1];
  assert(
    finale && finale.attrs["data-deck-slide"] === "whats-next",
    `the last deck section must be "whats-next", found "${finale?.attrs["data-deck-slide"]}"`,
  );

  for (const step of ["see", "remember", "act"]) {
    const count = countOccurrences(finale.inner, `glyph-${step}`);
    assert(
      count === 1,
      `finale must contain exactly one glyph-${step}, found ${count}`,
    );
  }

  for (const separationLine of [
    "agent authors and supervises",
    "runtime persists and arbitrates",
    "body retains control",
  ]) {
    assert(
      finale.inner.includes(separationLine),
      `finale is missing the separation line "${separationLine}"`,
    );
  }

  assert(
    countOccurrences(finale.inner, "data-photo-slot") === 0,
    "finale must contain no data-photo-slot",
  );
  assert(
    finale.attrs["data-robot"] === undefined,
    "finale section must carry no data-robot attribute",
  );
});

check("deck imagery: three robot photos with alt text", () => {
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

check("deck states the thesis verbatim, on the close slide", () => {
  // Six-slide restructure (org#23): the thesis is the close slide's
  // bottomLine, not a deck-wide headline — scope the match to that section
  // rather than the whole deck. The renderer may still split the
  // two-sentence line across reveal spans, so normalize whitespace before
  // matching textContent.
  const closeSlide = deckSlideSections(deckHtml).find(
    (slide) => slide.attrs["data-deck-slide"] === "close",
  );
  assert(closeSlide, 'deck is missing the "close" slide section');
  const closeText = textContent(closeSlide.inner);
  assert(
    closeText.includes("A CLI for intelligence. A runtime for embodiment."),
    "close slide must state the verbatim thesis “A CLI for intelligence. A runtime for embodiment.”",
  );
});

check("every deck “50 Hz” mention is labeled design rate", () => {
  // The spec allows the deck to omit the number entirely; only a mention
  // that IS present must be qualified. No minimum-mention requirement —
  // the slides test applies the same conditional rule.
  const deckText = textContent(deckHtml);
  const matches = [...deckText.matchAll(/50\s*Hz/g)];
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
      .join(", ")}) and 3 captioned photos, ` +
    `one accessible architecture diagram, the verbatim thesis, design-rate-labeled 50 Hz, ` +
    `and repo-home-only sources.`,
);
