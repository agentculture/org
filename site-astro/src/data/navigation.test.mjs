import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import {
  footerNavigation,
  isPrimaryNavCurrent,
  learnNavigation,
  primaryNavigation,
  sectionNavigation,
} from "./navigation.ts";

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

test("the header order ends with the external Open Learn CTA", () => {
  assert.deepEqual(sectionNavigation, expectedSections);
  assert.deepEqual(learnNavigation, {
    kind: "cta",
    href: "https://agentculture.org/learn/",
    label: "Open Learn",
    newTab: true,
  });
  assert.deepEqual(
    primaryNavigation.map(({ label }) => label),
    [
      "Framework",
      "Agents",
      "Articles",
      "Presentations",
      "Engage",
      "Open Learn",
    ],
  );
});

test("every owned section matches its index and descendants only", () => {
  for (const item of sectionNavigation) {
    const route = item.href.slice(0, -1);
    for (const pathname of [route, item.href, `${item.href}a-child/`]) {
      const current = primaryNavigation.filter((candidate) =>
        isPrimaryNavCurrent(pathname, candidate),
      );
      assert.deepEqual(current.map(({ label }) => label), [item.label]);
    }

    const falsePrefix = `${route}-old/`;
    assert.deepEqual(
      primaryNavigation.filter((candidate) =>
        isPrimaryNavCurrent(falsePrefix, candidate),
      ),
      [],
    );
  }
});

test("Open Learn never participates in current-section matching", () => {
  for (const pathname of [
    "/learn/",
    "/learn/a-course/",
    "https://agentculture.org/learn/",
  ]) {
    assert.equal(isPrimaryNavCurrent(pathname, learnNavigation), false);
  }
});

test("the footer has the exact grouped information architecture", () => {
  assert.deepEqual(
    footerNavigation.map(({ label, items }) => ({
      label,
      items: items.map(({ label: itemLabel }) => itemLabel),
    })),
    [
      {
        label: "Explore",
        items: ["Framework", "Agents", "Articles", "Presentations"],
      },
      { label: "Participate", items: ["Engage", "GitHub"] },
      {
        label: "Products & docs",
        items: ["Open Learn", "culture.dev", "tools.culture.dev"],
      },
    ],
  );

  const footerLearn = footerNavigation
    .flatMap(({ items }) => items)
    .find(({ label }) => label === "Open Learn");
  assert.deepEqual(footerLearn, {
    href: "https://agentculture.org/learn/",
    label: "Open Learn",
    kind: "product",
    newTab: true,
  });
});

test("the header implements the accessible responsive Learn action", async () => {
  const [header, primaryNav] = await Promise.all([
    readFile(componentUrl("Header.astro"), "utf8"),
    readFile(componentUrl("PrimaryNavigation.astro"), "utf8"),
  ]);

  assert.match(header, /<details class="site-menu">/);
  assert.equal((header.match(/<details\b/g) ?? []).length, 1);
  assert.match(header, /<summary aria-controls="mobile-primary-navigation">/);
  assert.match(header, /<PrimaryNavigation variant="desktop" \/>/);
  assert.match(header, /<PrimaryNavigation variant="mobile" \/>/);
  assert.match(header, /class="container shell-rail bar"/);
  assert.match(header, /\.site-menu\s*\{\s*display:\s*none/);
  assert.match(header, /\.desktop-menu\s*\{\s*display:\s*none/);
  assert.match(header, /max-width:\s*51\.99rem/);
  assert.match(header, /min-height:\s*2\.75rem/);

  assert.match(primaryNav, /primaryNavigation\.map/);
  assert.match(primaryNav, /class:list=\{\[item\.kind === "cta" && "primary-cta"\]\}/);
  assert.match(primaryNav, /target=.*"_blank"/);
  assert.match(primaryNav, /noopener noreferrer/);
  assert.match(primaryNav, /ExternalLinkIcon/);
  assert.match(primaryNav, /opens in a new tab/);
  assert.match(
    primaryNav,
    /:global\(\.site-menu:not\(\[open\]\)\) \.mobile\s*\{\s*display:\s*none/,
  );
});

test("the footer renders grouped navigation with external destination cues", async () => {
  const footer = await readFile(componentUrl("Footer.astro"), "utf8");

  assert.match(footer, /footerNavigation\.map/);
  assert.match(footer, /aria-labelledby=/);
  assert.match(footer, /ExternalLinkIcon/);
  assert.match(footer, /opens in a new tab/);
  assert.match(footer, /site\.hero\.tagline/);
  assert.match(footer, /built and operated by the organization's agents/);
});

test("the home Explore cards are derived from the five owned sections", async () => {
  const home = await readFile(homeUrl, "utf8");

  assert.match(home, /import \{ sectionNavigation \}/);
  assert.match(home, /sectionNavigation\.map/);
  for (const { href } of sectionNavigation) {
    assert.match(home, new RegExp(`['"]${href}['"]`));
  }
  assert.doesNotMatch(home, /agentculture\.org\/learn/);
});
