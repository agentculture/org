import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import site from "./site.ts";
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
} from "./navigation.ts";

const labelsCurrentAt = (pathname) =>
  primaryNavigation
    .filter((item) => isPrimaryNavCurrent(pathname, item))
    .map(({ label }) => label);

test("the top-level navigation keeps its owned sections and external Learn action", () => {
  assert.deepEqual(
    primaryNavigation.map(({ kind, label }) => [kind, label]),
    [
      ["link", "Framework"],
      ["menu", "Agents"],
      ["menu", "Library"],
      ["link", "Engage"],
      ["cta", "Learn"],
    ],
  );

  assert.equal(learnNavigation.href, "https://agentculture.org/learn/");
  assert.equal(learnNavigation.newTab, true);
});

test("Agents exposes hosted pages, stable group fragments, and explicit destination kinds", () => {
  assert.deepEqual(
    agentsNavigation.groups.map(({ id }) => id),
    ["agent-pages", "agent-areas"],
  );

  const [pages, areas] = agentsNavigation.groups;
  assert.equal(pages.items[0].href, "/agents/");
  assert.ok(
    areas.items.every(({ href }) => /^\/agents\/#[a-z0-9-]+$/.test(href)),
  );
  assert.equal(
    new Set(areas.items.map(({ href }) => href)).size,
    areas.items.length,
  );

  const linkedEntries = site.agents.entries.filter(({ url }) => url);
  assert.ok(
    linkedEntries.every(({ destinationKind }) =>
      ["agent-page", "site", "repository"].includes(destinationKind)),
  );

  const hostedPages = linkedEntries
    .filter(({ destinationKind }) => destinationKind === "agent-page")
    .map(({ url }) => url)
    .sort();
  const menuPages = pages.items
    .slice(1)
    .map(({ href }) => href)
    .sort();
  assert.deepEqual(menuPages, hostedPages);
});

test("Library keeps browse-all links and caps featured destinations", () => {
  assert.equal(LIBRARY_FEATURED_LIMIT, 2);
  assert.deepEqual(
    libraryNavigation.groups.map(({ id }) => id),
    ["articles", "presentations"],
  );

  for (const group of libraryNavigation.groups) {
    assert.match(group.items[0].label, /^Browse all /);
    assert.ok(group.items[0].href.endsWith("/"));
    assert.ok(group.items.length <= LIBRARY_FEATURED_LIMIT + 1);
    assert.ok(
      group.items
        .slice(1)
        .every(({ badge }) => badge?.startsWith("Featured ")),
    );
  }
});

test("current-state helpers respect ownership, exact destinations, and fragments", () => {
  for (const [pathname, expected] of [
    ["/framework/", ["Framework"]],
    ["/framework/principles/", ["Framework"]],
    ["/agents/colleague/", ["Agents"]],
    ["/articles/example/", ["Library"]],
    ["/presentations/example/", ["Library"]],
    ["/engage/", ["Engage"]],
    ["/articles-old/", []],
    ["/learn/", []],
  ]) {
    assert.deepEqual(labelsCurrentAt(pathname), expected);
  }

  const agentPage = agentsNavigation.groups[0].items.find(
    ({ href }) => href === "/agents/colleague/",
  );
  const agentArea = agentsNavigation.groups[1].items[0];
  assert.equal(
    isNavigationDestinationCurrent("/agents/colleague", agentPage),
    true,
  );
  assert.equal(isNavigationDestinationCurrent("/agents/", agentArea), false);

  const framework = footerNavigation[0].items.find(
    ({ href }) => href === "/framework/",
  );
  const external = footerNavigation.at(-1).items[0];
  assert.equal(isFooterNavCurrent("/framework", framework), true);
  assert.equal(isFooterNavCurrent("/framework/child/", framework), false);
  assert.equal(isFooterNavCurrent("/learn/", external), false);
});

test("the footer stays grouped, unique, and explicit about external destinations", () => {
  assert.deepEqual(
    footerNavigation.map(({ id }) => id),
    ["explore", "agents", "library", "ecosystem"],
  );

  const items = footerNavigation.flatMap(({ items }) => items);
  assert.equal(new Set(items.map(({ href }) => href)).size, items.length);

  for (const item of items) {
    if (item.kind === "internal") {
      assert.ok(item.href.startsWith("/"));
    } else {
      assert.match(item.href, /^https:\/\//);
      assert.equal(item.newTab, true);
    }
  }
});

test("external destination cards keep visible and assistive safe-new-tab cues", async () => {
  const component = await readFile(
    new URL("../components/DestinationCard.astro", import.meta.url),
    "utf8",
  );

  assert.match(component, /target=\{opensInNewTab \? "_blank"/);
  assert.match(
    component,
    /rel=\{opensInNewTab \? "noopener noreferrer"/,
  );
  assert.match(component, /<ExternalLinkIcon/);
  assert.match(component, /class="sr-only"> \(opens in a new tab\)<\/span>/);
  assert.match(component, /data-destination-kind=/);
});
