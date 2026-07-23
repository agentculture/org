import { readFileSync, readdirSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import site from "../src/data/site.ts";

const siteRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const distRoot = join(siteRoot, "dist");
const failures = [];
let checksPassed = 0;

function check(label, assertion) {
  try {
    assertion();
    checksPassed += 1;
  } catch (error) {
    failures.push(`${label}: ${error.message}`);
  }
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function filesIn(directory) {
  const found = [];
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) found.push(...filesIn(path));
    if (entry.isFile() && entry.name === "index.html") found.push(path);
  }
  return found.sort();
}

function attrs(source) {
  const parsed = {};
  for (const match of source.matchAll(
    /([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g,
  )) {
    parsed[match[1].toLowerCase()] = match[2] ?? match[3] ?? match[4] ?? "";
  }
  return parsed;
}

function openings(html, tag) {
  return [...html.matchAll(new RegExp(`<${tag}\\b([^>]*)>`, "gi"))].map(
    (match) => attrs(match[1]),
  );
}

function region(html, tag, className) {
  const match = html.match(
    new RegExp(`<${tag}\\b[^>]*class="[^"]*\\b${className}\\b[^"]*"[^>]*>[\\s\\S]*?<\\/${tag}>`, "i"),
  );
  assert(match, `missing ${tag}.${className}`);
  return match[0];
}

const outputFiles = filesIn(distRoot);
const pages = new Map(
  outputFiles.map((path) => {
    const routePath = relative(distRoot, path).replace(/index\.html$/, "");
    const route = routePath ? `/${routePath}` : "/";
    return [route, readFileSync(path, "utf8")];
  }),
);

const headerHrefs = [
  "/framework/",
  "/agents/",
  "/articles/",
  "/presentations/",
  "/engage/",
  "https://agentculture.org/learn/",
];
const sectionForRoute = (route) =>
  headerHrefs.slice(0, 5).find((href) => route.startsWith(href));

check("all 12 owned routes were built", () => {
  assert(pages.size === 12, `expected 12 pages, found ${pages.size}`);
});

for (const [route, html] of pages) {
  check(`${route} header order and Learn contract`, () => {
    const header = region(html, "header", "site-header");
    const navRegions = [...header.matchAll(
      /<nav\b([^>]*)>[\s\S]*?<\/nav>/gi,
    )]
      .filter((match) => attrs(match[1])["aria-label"] === "Primary")
      .map((match) => match[0]);
    assert(navRegions.length === 2, "header needs one desktop and one mobile primary nav");

    for (const nav of navRegions) {
      const navAnchors = openings(nav, "a").filter(({ href }) =>
        headerHrefs.includes(href),
      );
      assert(
        JSON.stringify(navAnchors.map(({ href }) => href)) ===
          JSON.stringify(headerHrefs),
        "primary links are missing or out of order",
      );

      const learn = navAnchors.at(-1);
      assert(learn.class?.split(/\s+/).includes("primary-cta"), "Learn is not the primary CTA");
      assert(learn.target === "_blank", "Learn must open in a new tab");
      assert(learn.rel === "noopener noreferrer", "Learn is missing its safe rel");
      assert(!learn["aria-current"], "Learn must never be current");

      const current = navAnchors.filter((anchor) => anchor["aria-current"] === "page");
      const expected = sectionForRoute(route);
      assert(current.length === (expected ? 1 : 0), "wrong number of current header links");
      if (expected) assert(current[0].href === expected, `expected ${expected} to be current`);
    }

    assert(header.includes("external-link-icon"), "Learn is missing the visible SVG cue");
    assert(header.includes("opens in a new tab"), "Learn is missing assistive new-tab text");
  });

  check(`${route} grouped footer contract`, () => {
    const footer = region(html, "footer", "site-footer");
    for (const heading of ["Explore", "Participate", "Products &amp; docs"]) {
      assert(footer.includes(`>${heading}</h2>`), `missing ${heading} footer group`);
    }
    assert(footer.includes(site.hero.tagline), "footer tagline is missing");
    assert(footer.includes("built and operated by the organization's agents"), "operated-by note is missing");

    const learn = openings(footer, "a").find(
      ({ href }) => href === "https://agentculture.org/learn/",
    );
    assert(learn, "footer Learn link is missing");
    assert(learn.target === "_blank", "footer Learn must open in a new tab");
    assert(learn.rel === "noopener noreferrer", "footer Learn is missing its safe rel");
    assert(!learn.class?.split(/\s+/).includes("primary-cta"), "footer Learn must remain a normal link");
  });
}

const detailRoutes = [
  "/agents/colleague/",
  "/agents/devague/",
  "/agents/lobes/",
  "/agents/reachy-mini-cli/",
  "/articles/mind-nervous-system-body/",
  "/presentations/mind-nervous-system-body/",
];

for (const route of detailRoutes) {
  check(`${route} semantic breadcrumb and structured data`, () => {
    const html = pages.get(route);
    assert(html, "route was not built");
    const breadcrumb = region(html, "nav", "breadcrumbs");
    assert(breadcrumb.includes('aria-label="Breadcrumb"'), "breadcrumb has no accessible label");
    assert(openings(breadcrumb, "li").length === 3, "breadcrumb must contain three levels");
    assert(openings(breadcrumb, "a").length === 2, "only ancestors should be linked");
    assert(breadcrumb.includes('aria-current="page"'), "current breadcrumb is not announced");

    const structuredData = [...html.matchAll(
      /<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g,
    )]
      .map((match) => JSON.parse(match[1]))
      .find((item) => item["@type"] === "BreadcrumbList");
    assert(structuredData, "BreadcrumbList structured data is missing");
    assert(structuredData.itemListElement.length === 3, "structured breadcrumb must contain three levels");
    assert(
      structuredData.itemListElement.every((item, index) => item.position === index + 1),
      "structured breadcrumb positions are invalid",
    );
  });
}

for (const route of detailRoutes.slice(0, 5)) {
  check(`${route} local section navigation resolves`, () => {
    const html = pages.get(route);
    const localNav = region(html, "nav", "section-nav");
    assert(localNav.includes('aria-label="On this page"'), "On this page label is missing");
    const targets = openings(localNav, "a").map(({ href }) => href?.slice(1));
    assert(targets.length >= 4, "section navigation is unexpectedly short");
    for (const id of targets) {
      assert(html.includes(`id="${id}"`), `#${id} has no target`);
    }
  });
}

check("the deck retains its slide rail instead of duplicating On this page", () => {
  const html = pages.get("/presentations/mind-nervous-system-body/");
  assert(html.includes('class="deck-rail"'), "slide rail is missing");
  assert(!html.includes('aria-label="On this page"'), "deck must not duplicate its slide rail");
});

check("the agents directory has stable groups, counts, and whole-card links", () => {
  const html = pages.get("/agents/");
  assert(html.includes('aria-label="Browse agents by area"'), "Browse by area navigation is missing");

  for (const group of site.agents.groups) {
    const count = site.agents.entries.filter((entry) => entry.groupId === group.id).length;
    assert(html.includes(`href="#${group.id}"`), `jump link for ${group.id} is missing`);
    assert(html.includes(`id="${group.id}"`), `stable group id ${group.id} is missing`);
    assert(html.includes(`aria-label="${count} agents"`), `${group.id} count is incorrect`);
  }

  const cards = openings(html, "a").filter(({ class: classes = "" }) =>
    classes.split(/\s+/).includes("entry"),
  );
  assert(cards.length === site.agents.entries.length, "every directory card must be one link");
  for (const cue of ["Agent page", "Repository", "Open Learn"]) {
    assert(html.includes(`>${cue}`), `${cue} destination cue is missing`);
  }
});

if (failures.length) {
  console.error(`Wayfinding contract failed (${failures.length}):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log(
    `Wayfinding contract passed: ${checksPassed} checks across ${pages.size} pages; ordered header CTA, descendant current states, grouped footer, 6 breadcrumb trails, 5 section navigations, and 6 stable agent groups.`,
  );
}
