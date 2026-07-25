import { readFileSync, readdirSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import {
  articles,
  presentations,
} from "../src/data/presentations.ts";
import { LIBRARY_FEATURED_LIMIT } from "../src/data/navigation.ts";
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

const primaryLabels = [
  "Framework",
  "Agents",
  "Library",
  "Engage",
  "Learn",
];
const ownedRoutes = [
  "/framework/",
  "/agents/",
  "/agents/colleague/",
  "/agents/lobes/",
  "/agents/devague/",
  "/agents/reachy-mini-cli/",
  "/articles/",
  "/articles/mind-nervous-system-body/",
  "/presentations/",
  "/presentations/mind-nervous-system-body/",
  "/engage/",
];
const featuredLibraryRoutes = [
  ...articles
    .filter(({ featuredInNavigation }) => featuredInNavigation)
    .slice(0, LIBRARY_FEATURED_LIMIT),
  ...presentations
    .filter(({ featuredInNavigation }) => featuredInNavigation)
    .slice(0, LIBRARY_FEATURED_LIMIT),
].map(({ route }) => route);
const headerDestinationRoutes = [
  ...ownedRoutes.filter(
    (href) =>
      !(
        (href.startsWith("/articles/") && href !== "/articles/") ||
        (href.startsWith("/presentations/") && href !== "/presentations/")
      ),
  ),
  ...featuredLibraryRoutes,
];
const agentRoutes = headerDestinationRoutes.filter((href) =>
  href.startsWith("/agents/"),
);
const libraryRoutes = headerDestinationRoutes.filter(
  (href) =>
    href.startsWith("/articles/") || href.startsWith("/presentations/"),
);
const footerOwnedRoutes = ownedRoutes.filter(
  (href) =>
    href !== "/articles/mind-nervous-system-body/" &&
    href !== "/presentations/mind-nervous-system-body/",
);
const footerRoutesWithoutCurrentState = new Set([
  "/",
  "/articles/mind-nervous-system-body/",
  "/presentations/mind-nervous-system-body/",
]);
const agentGroupHrefs = site.agents.groups.map(
  ({ id }) => `/agents/#${id}`,
);
const sectionForRoute = (route) => {
  if (route.startsWith("/framework/")) return "Framework";
  if (route.startsWith("/agents/")) return "Agents";
  if (
    route.startsWith("/articles/") ||
    route.startsWith("/presentations/")
  ) {
    return "Library";
  }
  if (route.startsWith("/engage/")) return "Engage";
  return undefined;
};

check("all 12 owned routes were built", () => {
  assert(pages.size === 12, `expected 12 pages, found ${pages.size}`);
});

for (const [route, html] of pages) {
  check(`${route} consolidated header route coverage and contracts`, () => {
    const header = region(html, "header", "site-header");
    const navRegions = [...header.matchAll(
      /<nav\b([^>]*)>[\s\S]*?<\/nav>/gi,
    )]
      .filter((match) => attrs(match[1])["aria-label"] === "Primary")
      .map((match) => match[0]);
    assert(navRegions.length === 2, "header needs one desktop and one mobile primary nav");

    for (const nav of navRegions) {
      const rootItems = openings(nav, "li").filter(
        (attributes) => attributes["data-nav-item"],
      );
      assert(
        JSON.stringify(rootItems.map((item) => item["data-nav-item"])) ===
          JSON.stringify(primaryLabels),
        "top-level labels are missing or out of order",
      );

      const navAnchors = openings(nav, "a");
      for (const ownedRoute of headerDestinationRoutes) {
        const matches = navAnchors.filter(({ href }) => href === ownedRoute);
        assert(
          matches.length === 1,
          `${ownedRoute} must appear exactly once in each primary nav`,
        );
      }

      const learn = navAnchors.find(
        ({ href }) => href === "https://agentculture.org/learn/",
      );
      assert(learn, "Learn is missing");
      assert(
        !learn.class?.split(/\s+/).includes("primary-cta"),
        "Learn must use the same visual treatment as the other links",
      );
      assert(learn.target === "_blank", "Learn must open in a new tab");
      assert(learn.rel === "noopener noreferrer", "Learn is missing its safe rel");
      assert(!learn["aria-current"], "Learn must never be current");

      const currentRootItems = rootItems.filter(
        (item) => item["data-nav-current"] === "true",
      );
      const expected = sectionForRoute(route);
      assert(
        currentRootItems.length === (expected ? 1 : 0),
        "wrong number of current top-level items",
      );
      if (expected) {
        assert(
          currentRootItems[0]["data-nav-item"] === expected,
          `expected ${expected} to own ${route}`,
        );
      }

      const currentDestinations = navAnchors.filter(
        (anchor) => anchor["aria-current"] === "page",
      );
      const expectsExactDestination = headerDestinationRoutes.includes(route);
      assert(
        currentDestinations.length === (expectsExactDestination ? 1 : 0),
        "wrong number of exact current destinations",
      );
      if (expectsExactDestination) {
        assert(
          currentDestinations[0].href === route,
          `${route} must mark its exact destination current`,
        );
      }

      const triggers = openings(nav, "summary").filter(
        (summary) => summary["data-nav-trigger"],
      );
      assert(triggers.length === 2, "Agents and Library need menu triggers");
      for (const trigger of triggers) {
        assert(trigger["aria-controls"], "menu trigger is missing aria-controls");
        assert(
          trigger["aria-expanded"] === "false",
          "menu trigger must declare its initial collapsed state",
        );
      }

      const agentsStart = nav.indexOf('data-nav-panel="agents"');
      const libraryStart = nav.indexOf('data-nav-panel="library"');
      assert(
        agentsStart >= 0 && libraryStart > agentsStart,
        "ordered Agents and Library panels are missing",
      );
      const agentsPanel = nav.slice(agentsStart, libraryStart);
      const libraryPanel = nav.slice(libraryStart);

      for (const href of [...agentRoutes, ...agentGroupHrefs]) {
        assert(
          agentsPanel.includes(`href="${href}"`),
          `${href} is missing from the Agents panel`,
        );
      }
      for (const href of libraryRoutes) {
        assert(
          libraryPanel.includes(`href="${href}"`),
          `${href} is missing from the Library panel`,
        );
      }

      for (const groupId of [
        "agent-pages",
        "agent-areas",
        "articles",
        "presentations",
      ]) {
        assert(
          nav.includes(`data-nav-group="${groupId}"`),
          `${groupId} navigation group is missing`,
        );
      }

      assert(
        (nav.match(/class="destination-description"/g) ?? []).length >= 15,
        "descriptive destination copy is missing",
      );
    }

    assert(header.includes("external-link-icon"), "Learn is missing the visible SVG cue");
    assert(header.includes("opens in a new tab"), "Learn is missing assistive new-tab text");
    assert(header.includes("data-nav-back"), "mobile drill-down Back control is missing");
    assert(header.includes("data-nav-close"), "mobile drill-down Close control is missing");
    assert(
      html.includes("navigationReady"),
      "first-party navigation enhancement is missing",
    );
  });

  check(`${route} selected sitemap footer contract`, () => {
    const footer = region(html, "footer", "site-footer");
    for (const heading of ["Explore", "Agents", "Library", "Ecosystem"]) {
      assert(footer.includes(`>${heading}</h2>`), `missing ${heading} footer group`);
    }
    assert(footer.includes(site.hero.tagline), "footer tagline is missing");
    assert(footer.includes("built and operated by the organization's agents"), "operated-by note is missing");

    const footerAnchors = openings(footer, "a");
    for (const ownedRoute of footerOwnedRoutes) {
      const matches = footerAnchors.filter(({ href }) => href === ownedRoute);
      assert(
        matches.length === 1,
        `${ownedRoute} must appear exactly once in the footer`,
      );
    }
    for (const detailRoute of [
      "/articles/mind-nervous-system-body/",
      "/presentations/mind-nervous-system-body/",
    ]) {
      assert(
        !footerAnchors.some(({ href }) => href === detailRoute),
        `${detailRoute} must stay in the header Library panel only`,
      );
    }
    assert(
      !footerAnchors.some(({ href = "" }) => href.startsWith("/agents/#")),
      "agent directory anchors must remain header-only",
    );

    const currentFooterLinks = footerAnchors.filter(
      (anchor) => anchor["aria-current"] === "page",
    );
    assert(
      currentFooterLinks.length ===
        (footerRoutesWithoutCurrentState.has(route) ? 0 : 1),
      "wrong number of exact current footer destinations",
    );
    if (!footerRoutesWithoutCurrentState.has(route)) {
      assert(
        currentFooterLinks[0].href === route,
        `${route} must mark only its exact footer destination current`,
      );
    }

    const learn = footerAnchors.find(
      ({ href }) => href === "https://agentculture.org/learn/",
    );
    assert(learn, "footer Learn link is missing");
    assert(learn.target === "_blank", "footer Learn must open in a new tab");
    assert(learn.rel === "noopener noreferrer", "footer Learn is missing its safe rel");
    assert(!learn.class?.split(/\s+/).includes("primary-cta"), "footer Learn must remain a normal link");
  });

  check(`${route} external links open safely in a new tab`, () => {
    const externalAnchors = openings(html, "a").filter(({ href = "" }) =>
      /^https?:\/\//.test(href),
    );

    for (const anchor of externalAnchors) {
      const relTokens = new Set((anchor.rel ?? "").split(/\s+/).filter(Boolean));
      assert(
        anchor.target === "_blank",
        `${anchor.href} must use target="_blank"`,
      );
      assert(
        relTokens.has("noopener") && relTokens.has("noreferrer"),
        `${anchor.href} must use rel="noopener noreferrer"`,
      );
    }
  });
}

for (const [route, html] of pages) {
  check(`${route} defers breadcrumbs and local contents navigation`, () => {
    assert(!html.includes('aria-label="Breadcrumb"'), "breadcrumb is still rendered");
    assert(!html.includes('class="breadcrumbs"'), "breadcrumb markup is still rendered");
    assert(!html.includes('aria-label="On this page"'), "local contents navigation is still rendered");
    assert(!html.includes('class="section-nav"'), "local contents markup is still rendered");

    const structuredData = [...html.matchAll(
      /<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g,
    )]
      .map((match) => JSON.parse(match[1]));
    assert(
      !structuredData.some((item) => item["@type"] === "BreadcrumbList"),
      "BreadcrumbList structured data is still rendered",
    );
  });
}

check("the deck retains its dedicated slide rail", () => {
  const html = pages.get("/presentations/mind-nervous-system-body/");
  assert(html.includes('class="deck-rail"'), "slide rail is missing");
});

check("the agents directory has stable groups and whole-card links", () => {
  const html = pages.get("/agents/");
  assert(
    !html.includes('aria-label="Browse agents by area"'),
    "the removed on-page Browse by area navigation is still rendered",
  );

  for (const group of site.agents.groups) {
    assert(
      !html.includes(`href="#${group.id}"`),
      `local jump link for ${group.id} is still rendered`,
    );
    assert(html.includes(`id="${group.id}"`), `stable group id ${group.id} is missing`);
  }

  const cards = openings(html, "a").filter(({ class: classes = "" }) =>
    classes.split(/\s+/).includes("entry"),
  );
  assert(cards.length === site.agents.entries.length, "every directory card must be one link");
  assert(
    !html.includes('class="repo muted"'),
    "agent cards must not repeat repository slugs",
  );
  for (const cue of ["Agent page", "Repository", "Visit site"]) {
    assert(html.includes(`>${cue}`), `${cue} destination cue is missing`);
  }
});

if (failures.length) {
  console.error(`Wayfinding contract failed (${failures.length}):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log(
    `Wayfinding contract passed: ${checksPassed} checks across ${pages.size} pages; consolidated descriptive desktop/mobile navigation, capped featured Library coverage, exact sitemap footer states, section-only Library footer links, safe new-tab external links, deferred breadcrumbs/local contents navigation, the retained deck rail, and 6 stable agent groups.`,
  );
}
