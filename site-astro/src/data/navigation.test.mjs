import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import {
  agentsNavigation,
  footerNavigation,
  isFooterNavCurrent,
  isNavigationDestinationCurrent,
  isPrimaryNavCurrent,
  learnNavigation,
  LIBRARY_FEATURED_LIMIT,
  libraryNavigation,
  primaryNavigation,
  siteSections,
} from "./navigation.ts";
import { articles, presentations } from "./presentations.ts";
import site from "./site.ts";

const componentUrl = (name) => new URL(`../components/${name}`, import.meta.url);
const homeUrl = new URL("../pages/index.astro", import.meta.url);

const expectedSections = [
  { kind: "section", href: "/framework/", label: "Framework" },
  { kind: "section", href: "/agents/", label: "Agents" },
  { kind: "section", href: "/articles/", label: "Articles" },
  {
    kind: "section",
    href: "/presentations/",
    label: "Presentations",
  },
  { kind: "section", href: "/engage/", label: "Engage" },
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

const expectedHeaderRoutes = [
  "/framework/",
  "/agents/",
  "/agents/colleague/",
  "/agents/lobes/",
  "/agents/devague/",
  "/agents/reachy-mini-cli/",
  "/articles/",
  ...articles
    .filter(({ featuredInNavigation }) => featuredInNavigation)
    .slice(0, LIBRARY_FEATURED_LIMIT)
    .map(({ route }) => route),
  "/presentations/",
  ...presentations
    .filter(({ featuredInNavigation }) => featuredInNavigation)
    .slice(0, LIBRARY_FEATURED_LIMIT)
    .map(({ route }) => route),
  "/engage/",
];

const menuDestinations = (menu) =>
  menu.groups.flatMap(({ items }) => items);

test("the header uses the consolidated Stripe-style top-level order", () => {
  assert.deepEqual(siteSections, expectedSections);
  assert.deepEqual(learnNavigation, {
    kind: "cta",
    href: "https://agentculture.org/learn/",
    label: "Learn",
    newTab: true,
  });
  assert.deepEqual(
    primaryNavigation.map(({ label }) => label),
    ["Framework", "Agents", "Library", "Engage", "Learn"],
  );
  assert.deepEqual(
    primaryNavigation.map(({ kind }) => kind),
    ["link", "menu", "menu", "link", "cta"],
  );
});

test("Agents exposes hosted pages and stable directory groups", () => {
  assert.deepEqual(
    agentsNavigation.groups.map(({ label }) => label),
    ["Agent pages", "Browse by area"],
  );

  assert.deepEqual(
    agentsNavigation.groups[0].items.map(({ href }) => href),
    [
      "/agents/",
      "/agents/colleague/",
      "/agents/lobes/",
      "/agents/devague/",
      "/agents/reachy-mini-cli/",
    ],
  );

  assert.deepEqual(
    agentsNavigation.groups[1].items.map(({ href }) => href),
    site.agents.groups.map(({ id }) => `/agents/#${id}`),
  );

  for (const destination of agentsNavigation.groups[1].items) {
    const group = site.agents.groups.find(
      ({ id }) => destination.href === `/agents/#${id}`,
    );
    const count = site.agents.entries.filter(
      ({ groupId }) => groupId === group.id,
    ).length;
    assert.equal(destination.description, `${count} agents`);
  }
});

test("Library exposes a capped, explicitly featured content selection", () => {
  assert.deepEqual(
    libraryNavigation.groups.map(({ label }) => label),
    ["Articles", "Presentations"],
  );

  assert.deepEqual(
    libraryNavigation.groups[0].items.map(({ href }) => href),
    [
      "/articles/",
      ...articles
        .filter(({ featuredInNavigation }) => featuredInNavigation)
        .slice(0, LIBRARY_FEATURED_LIMIT)
        .map(({ route }) => route),
    ],
  );
  assert.deepEqual(
    libraryNavigation.groups[1].items.map(({ href }) => href),
    [
      "/presentations/",
      ...presentations
        .filter(({ featuredInNavigation }) => featuredInNavigation)
        .slice(0, LIBRARY_FEATURED_LIMIT)
        .map(({ route }) => route),
    ],
  );

  assert.equal(LIBRARY_FEATURED_LIMIT, 2);
  for (const group of libraryNavigation.groups) {
    assert(group.items.length <= LIBRARY_FEATURED_LIMIT + 1);
  }

  assert.equal(
    libraryNavigation.groups[0].items[1].description,
    articles[0].navigationSummary,
  );
  assert.equal(
    libraryNavigation.groups[1].items[1].description,
    presentations[0].navigationSummary,
  );
  const expectedBadges = ["Featured article", "Featured presentation"];
  libraryNavigation.groups.forEach((group, index) => {
    assert.equal(group.items[0].badge, undefined);
    for (const featuredDestination of group.items.slice(1)) {
      assert.equal(featuredDestination.badge, expectedBadges[index]);
    }
  });
});

test("every required header destination appears exactly once", () => {
  const destinations = primaryNavigation.flatMap((item) => {
    if (item.kind === "link") return [item.href];
    if (item.kind === "menu") {
      return menuDestinations(item)
        .map(({ href }) => href)
        .filter((href) => !href.includes("#"));
    }
    return [];
  });

  assert.deepEqual(destinations.toSorted(), expectedHeaderRoutes.toSorted());
  assert.equal(new Set(destinations).size, destinations.length);
});

test("top-level current states respect route ownership and false prefixes", () => {
  const cases = new Map([
    ["/framework/", "Framework"],
    ["/framework/a-child/", "Framework"],
    ["/agents/", "Agents"],
    ["/agents/colleague/", "Agents"],
    ["/articles/", "Library"],
    ["/articles/mind-nervous-system-body/", "Library"],
    ["/presentations/", "Library"],
    ["/presentations/mind-nervous-system-body/", "Library"],
    ["/engage/", "Engage"],
    ["/engage/a-child/", "Engage"],
  ]);

  for (const [pathname, expected] of cases) {
    const current = primaryNavigation.filter((item) =>
      isPrimaryNavCurrent(pathname, item),
    );
    assert.deepEqual(current.map(({ label }) => label), [expected]);
  }

  for (const pathname of [
    "/framework-old/",
    "/agents-old/",
    "/articles-old/",
    "/presentations-old/",
    "/engage-old/",
    "/library/",
  ]) {
    assert.deepEqual(
      primaryNavigation.filter((item) =>
        isPrimaryNavCurrent(pathname, item),
      ),
      [],
    );
  }
});

test("panel current states are exact and fragments are never current", () => {
  for (const menu of [agentsNavigation, libraryNavigation]) {
    for (const destination of menuDestinations(menu)) {
      const expected = !destination.href.includes("#");
      const pathname = destination.href.split("#")[0];
      assert.equal(
        isNavigationDestinationCurrent(pathname, destination),
        expected,
      );

      if (expected) {
        assert.equal(
          isNavigationDestinationCurrent(
            `${pathname.slice(0, -1)}-old/`,
            destination,
          ),
          false,
        );
      }
    }
  }
});

test("Learn never participates in current-section matching", () => {
  for (const pathname of [
    "/learn/",
    "/learn/a-course/",
    "https://agentculture.org/learn/",
  ]) {
    assert.equal(isPrimaryNavCurrent(pathname, learnNavigation), false);
  }
});

test("the footer exposes the selected sitemap links exactly once", () => {
  assert.deepEqual(
    footerNavigation.map(({ label, items }) => ({
      label,
      items: items.map(({ label: itemLabel }) => itemLabel),
    })),
    [
      {
        label: "Explore",
        items: ["Framework", "Engage"],
      },
      {
        label: "Agents",
        items: [
          "Browse all agents",
          "colleague",
          "lobes-cli",
          "devague",
          "reachy-mini-cli",
        ],
      },
      {
        label: "Library",
        items: ["Articles", "Presentations"],
      },
      {
        label: "Ecosystem",
        items: ["Learn", "GitHub", "culture.dev", "tools.culture.dev"],
      },
    ],
  );

  const internalHrefs = footerNavigation
    .flatMap(({ items }) => items)
    .filter(({ kind }) => kind === "internal")
    .map(({ href }) => href);

  const expectedFooterRoutes = ownedRoutes.filter(
    (href) =>
      href !== "/articles/mind-nervous-system-body/" &&
      href !== "/presentations/mind-nervous-system-body/",
  );

  assert.equal(internalHrefs.length, 9);
  assert.equal(new Set(internalHrefs).size, internalHrefs.length);
  assert.deepEqual(internalHrefs.toSorted(), expectedFooterRoutes.toSorted());

  const footerLearn = footerNavigation
    .flatMap(({ items }) => items)
    .find(({ label }) => label === "Learn");
  assert.deepEqual(footerLearn, {
    href: "https://agentculture.org/learn/",
    label: "Learn",
    kind: "product",
    newTab: true,
  });

  for (const item of footerNavigation.flatMap(({ items }) => items)) {
    if (item.kind !== "internal") {
      assert.equal(item.newTab, true);
    }
  }
});

test("footer current states use exact owned-route matching", () => {
  const items = footerNavigation.flatMap(({ items }) => items);

  for (const route of ownedRoutes) {
    const expected = items.some(({ href }) => href === route) ? [route] : [];
    assert.deepEqual(
      items
        .filter((item) => isFooterNavCurrent(route, item))
        .map(({ href }) => href),
      expected,
      `${route} should only be current when its exact footer destination exists`,
    );
  }

  for (const item of items) {
    assert.equal(isFooterNavCurrent("/", item), false);
    assert.equal(isFooterNavCurrent("/agents-old/", item), false);
    if (item.kind !== "internal") {
      assert.equal(isFooterNavCurrent(item.href, item), false);
    }
  }
});

test("the header implements accessible responsive panels without dependencies", async () => {
  const [header, primaryNav] = await Promise.all([
    readFile(componentUrl("Header.astro"), "utf8"),
    readFile(componentUrl("PrimaryNavigation.astro"), "utf8"),
  ]);

  assert.match(header, /data-mobile-navigation/);
  assert.match(header, /aria-controls="mobile-primary-navigation"/);
  assert.match(header, /aria-expanded="false"/);
  assert.match(header, /<PrimaryNavigation variant="desktop" \/>/);
  assert.match(header, /<PrimaryNavigation variant="mobile" \/>/);
  assert.match(header, /class="container shell-rail bar"/);
  assert.match(header, /<script is:inline>/);
  assert.match(header, /pointerenter/);
  assert.match(header, /window\.setTimeout\([\s\S]*180/);
  assert.match(header, /restartDesktopPanelAnimation/);
  assert.match(header, /void grid\.offsetWidth/);
  assert.match(header, /is-entering-forward/);
  assert.match(header, /is-entering-backward/);
  assert.match(header, /animationend/);
  assert.match(header, /event\.key !== "Escape"/);
  assert.match(header, /restoringDesktopFocus/);
  assert.match(header, /classList\.add\("nav-open"\)/);
  assert.match(header, /\.inert =/);
  assert.match(header, /mobileRootScroll/);
  assert.match(header, /mobilePanelMotion/);
  assert.match(header, /mobilePanelCloseTimer/);
  assert.match(header, /setTimeout\(finishClose, 240\)/);
  assert.doesNotMatch(header, /pushState|replaceState|popstate/);

  assert.match(primaryNav, /primaryNavigation\.map/);
  assert.match(primaryNav, /<details[\s\S]*data-nav-details/);
  assert.match(primaryNav, /aria-controls=/);
  assert.match(primaryNav, /data-nav-back/);
  assert.match(primaryNav, /data-nav-close/);
  assert.match(primaryNav, /data-nav-group=/);
  assert.match(primaryNav, /data-nav-destination=/);
  assert.match(primaryNav, /destination-badge/);
  assert.match(primaryNav, /desktop-panel-forward/);
  assert.match(primaryNav, /desktop-panel-backward/);
  assert.match(primaryNav, /\.menu-grid\.is-entering-forward/);
  assert.match(primaryNav, /\.menu-grid\.is-entering-backward/);
  assert.match(
    primaryNav,
    /\.destination-badge\s*\{[\s\S]*border-bottom:\s*1px solid var\(--line-soft\)[\s\S]*font-family:\s*var\(--font-mono\)[\s\S]*text-transform:\s*uppercase/,
  );
  assert.doesNotMatch(primaryNav, /\.destination-badge::before/);
  assert.match(primaryNav, /desktop-panel-forward 0\.48s/);
  assert.match(primaryNav, /desktop-panel-backward 0\.48s/);
  assert.match(primaryNav, /translateX\(100%\)/);
  assert.match(primaryNav, /transition: transform 0\.24s/);
  assert.match(primaryNav, /target=[\s\S]*"_blank"/);
  assert.match(primaryNav, /noopener noreferrer/);
  assert.match(primaryNav, /ExternalLinkIcon/);
  assert.match(primaryNav, /opens in a new tab/);
  assert.doesNotMatch(primaryNav, /primary-cta|nav-action/);
  assert.match(primaryNav, /min-height:\s*2\.75rem/);
  assert.match(primaryNav, /prefers-reduced-motion:\s*no-preference/);
  assert.match(
    primaryNav,
    /\.root-item\[data-nav-current="true"\]\s+\.menu-trigger\s*\{[\s\S]*font-weight:\s*650/,
  );
  assert.doesNotMatch(
    primaryNav,
    /data-nav-current="true"\]\s*>\s*\.direct-link[\s\S]{0,80}font-weight/,
  );
  assert.match(
    primaryNav,
    /\.root-item\[data-nav-current="true"\]\s*>\s*\.direct-link::after/,
  );
  assert.doesNotMatch(
    primaryNav,
    /data-nav-current="true"[^\n]*\.menu-trigger::after/,
  );
  assert.doesNotMatch(primaryNav, /\.root-control::after/);
  assert.doesNotMatch(primaryNav, /https?:\/\/[^'"]+\.(?:js|css)/);
});

test("the footer renders grouped navigation with external destination cues", async () => {
  const footer = await readFile(componentUrl("Footer.astro"), "utf8");

  assert.match(footer, /footerNavigation\.map/);
  assert.match(footer, /aria-labelledby=/);
  assert.match(footer, /isFooterNavCurrent/);
  assert.match(footer, /ExternalLinkIcon/);
  assert.match(footer, /opens in a new tab/);
  assert.match(footer, /site\.hero\.tagline/);
  assert.match(footer, /built and operated by the organization's agents/);
  assert.match(footer, /container wide-rail/);
  assert.match(footer, /min-height:\s*2\.75rem/);
  assert.match(footer, /<Mark size=\{26\} \/>/);
  assert.match(footer, /font-size:\s*1\.15rem/);
  assert.match(footer, /a\[aria-current="page"\]\s*\{[\s\S]*font-weight:\s*650/);
  assert.match(footer, /max-width:\s*63\.99rem/);
  assert.match(footer, /max-width:\s*49\.99rem/);
  assert.match(footer, /max-width:\s*33\.99rem/);
});

test("the home Explore cards remain derived from the five owned sections", async () => {
  const home = await readFile(homeUrl, "utf8");

  assert.match(home, /import \{ siteSections \}/);
  assert.match(home, /siteSections\.map/);
  for (const { href } of siteSections) {
    assert.match(home, new RegExp(`['"]${href}['"]`));
  }
  assert.doesNotMatch(home, /agentculture\.org\/learn/);
});
