import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const siteRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const distRoot = join(siteRoot, "dist");
const routeFiles = {
  home: "index.html",
  index: "presentations/index.html",
  talk: "presentations/mind-nervous-system-body/index.html",
};

const thesis =
  "The agent is the mind. The code is the nervous system. The robot is the body.";
const talkRoute = "/presentations/mind-nervous-system-body/";
const presentationRoute = "/presentations/";
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

function requireRegion(html, tag, className, pageLabel) {
  const region = elementByClass(html, tag, className);
  assert(region, `${pageLabel} is missing ${tag}.${className}`);
  return region;
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
    relative(distRoot, path),
    readFileSync(path, "utf8"),
  ]),
);
const homeHtml = builtPages.get(routeFiles.home);
const indexHtml = builtPages.get(routeFiles.index);
const talkHtml = builtPages.get(routeFiles.talk);

check("site-wide Presentations wayfinding", () => {
  for (const [path, html] of builtPages) {
    const header = requireRegion(html, "header", "site-header", path);
    const footer = requireRegion(html, "footer", "site-footer", path);
    assert(
      linksTo(header.outer, presentationRoute).length === 1,
      `${path} header must contain exactly one ${presentationRoute} link`,
    );
    assert(
      linksTo(footer.outer, presentationRoute).length === 1,
      `${path} footer must contain exactly one ${presentationRoute} link`,
    );
  }
  const explore = elements(homeHtml, "section").find(
    (section) => section.attrs["aria-label"] === "Explore",
  );
  assert(explore, "home page is missing its Explore region");
  assert(
    linksTo(explore.outer, presentationRoute).length === 1,
    `home Explore must contain exactly one ${presentationRoute} link`,
  );
});

check("presentation routes and internal links", () => {
  assert(existsSync(join(distRoot, routeFiles.index)), "index route is missing");
  assert(existsSync(join(distRoot, routeFiles.talk)), "talk route is missing");
  const presentationLinks = [];
  for (const [path, html] of builtPages) {
    for (const anchor of anchors(html)) {
      if (anchor.attrs.href?.startsWith(presentationRoute)) {
        presentationLinks.push({ from: path, href: anchor.attrs.href });
      }
    }
  }
  assert(presentationLinks.length > 0, "no internal presentation links found");
  const broken = presentationLinks.filter(
    ({ href }) => !existsSync(outputForInternalHref(href)),
  );
  assert(
    broken.length === 0,
    `unresolved links: ${broken.map(({ from, href }) => `${from} -> ${href}`).join(", ")}`,
  );
});

check("presentation index card contract", () => {
  const cards = anchors(indexHtml).filter((anchor) =>
    hasClass(anchor.attrs, "presentation-card"),
  );
  assert(cards.length === 1, `expected exactly 1 card, found ${cards.length}`);
  assert(cards[0].attrs.href === talkRoute, `card must link to ${talkRoute}`);
  for (const expected of [
    "Mind, nervous system, body",
    "Neurosymbolic robotics",
    "Reachy Mini CLI",
    "ARM101 CLI",
  ]) {
    assert(cards[0].text.includes(expected), `card is missing “${expected}”`);
  }
});

check("talk hero and ordered beats", () => {
  const hero = elements(talkHtml, "h1").find(
    (heading) => heading.attrs.id === "talk-title",
  );
  assert(hero, "talk h1#talk-title is missing");
  assert(textContent(hero.inner) === thesis, `hero must exactly equal “${thesis}”`);
  const beats = openings(talkHtml, "section").filter(
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
  const sourceNoteCount = openings(talkHtml, "aside").filter((aside) =>
    (aside.class ?? "").split(/\s+/).includes("source-notes"),
  ).length;
  assert(
    sourceNoteCount === 8,
    `each beat needs source notes; found ${sourceNoteCount}`,
  );
});

check("repository homes, related agent, and immutable evidence", () => {
  const hrefs = anchors(talkHtml).map((anchor) => anchor.attrs.href).filter(Boolean);
  for (const href of [
    "https://github.com/agentculture/reachy-mini-cli",
    "https://github.com/agentculture/arm101-cli",
    "/agents/reachy-mini-cli/",
  ]) {
    assert(hrefs.includes(href), `talk is missing ${href}`);
  }
  for (const url of expectedEvidenceUrls) {
    assert(hrefs.includes(url), `talk is missing pinned evidence ${url}`);
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
  const talkText = textContent(talkHtml);
  for (const phrase of [
    "neurosymbolic as its own architectural synthesis",
    "It does not mean either robot updates model weights online.",
    "no shared runtime or shipped cross-repository integration",
    "not a shipped autonomous loop",
    "no forge or stash tools",
    "arm flex does not consume this map",
  ]) {
    assert(talkText.includes(phrase), `talk is missing boundary “${phrase}”`);
  }
});

check("accessible static architecture diagram", () => {
  const diagram = openings(talkHtml, "svg").find(
    (svg) => svg.role === "img" && svg["aria-labelledby"],
  );
  assert(diagram, "diagram needs role=img and an accessible name/description");
  assert(
    openings(talkHtml, "title").some(
      (title) => title.id === "mind-body-diagram-title",
    ),
    "diagram title is missing",
  );
  assert(
    openings(talkHtml, "desc").some(
      (desc) => desc.id === "mind-body-diagram-desc",
    ),
    "diagram text alternative is missing",
  );
});

check("Presentations current state on index and talk", () => {
  for (const [label, html] of [
    ["index", indexHtml],
    ["talk", talkHtml],
  ]) {
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
        current[0].attrs.href === presentationRoute &&
          current[0].text === "Presentations",
        `${label} ${regionLabel} current link must be Presentations`,
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
  `Presentation contract passed: ${checksPassed} checks across ${builtHtmlFiles.length} pages; 1 card, 8 ordered beats, ${expectedEvidenceUrls.length} immutable evidence links.`,
);
