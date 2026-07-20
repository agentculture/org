import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import test from "node:test";

const navigationUrl = new URL("./navigation.ts", import.meta.url);
const headerUrl = new URL("../components/Header.astro", import.meta.url);
const footerUrl = new URL("../components/Footer.astro", import.meta.url);
const homeUrl = new URL("../pages/index.astro", import.meta.url);

const navigation = existsSync(navigationUrl)
  ? await import(navigationUrl.href)
  : undefined;

test("the shared primary navigation has exactly six expected links", () => {
  assert.ok(navigation, "src/data/navigation.ts must centralize primary navigation");
  assert.deepEqual(navigation.primaryNavigation, [
    { href: "/learn/", label: "Learn" },
    { href: "/framework/", label: "Framework" },
    { href: "/agents/", label: "Agents" },
    { href: "/articles/", label: "Articles", match: "section" },
    { href: "/presentations/", label: "Presentations", match: "section" },
    { href: "/engage/", label: "Engage" },
  ]);
});

test("Articles alone owns its index and descendant article routes", () => {
  assert.ok(navigation, "src/data/navigation.ts must export the current-route matcher");

  for (const pathname of [
    "/articles",
    "/articles/",
    "/articles/mind-nervous-system-body/",
  ]) {
    const current = navigation.primaryNavigation.filter((item) =>
      navigation.isPrimaryNavCurrent(pathname, item),
    );
    assert.deepEqual(current.map(({ label }) => label), ["Articles"]);
  }

  const falsePrefix = navigation.primaryNavigation.filter((item) =>
    navigation.isPrimaryNavCurrent("/articles-old/", item),
  );
  assert.deepEqual(falsePrefix, []);
});

test("Presentations alone owns its index and descendant deck routes", () => {
  assert.ok(navigation, "src/data/navigation.ts must export the current-route matcher");

  for (const pathname of [
    "/presentations",
    "/presentations/",
    "/presentations/mind-nervous-system-body/",
  ]) {
    const current = navigation.primaryNavigation.filter((item) =>
      navigation.isPrimaryNavCurrent(pathname, item),
    );
    assert.deepEqual(current.map(({ label }) => label), ["Presentations"]);
  }

  const falsePrefix = navigation.primaryNavigation.filter((item) =>
    navigation.isPrimaryNavCurrent("/presentations-old/", item),
  );
  assert.deepEqual(falsePrefix, []);
});

test("existing exact-route behavior remains stable", () => {
  assert.ok(navigation, "src/data/navigation.ts must export the current-route matcher");

  for (const [pathname, expected] of [
    ["/learn", "Learn"],
    ["/framework/", "Framework"],
    ["/agents/", "Agents"],
    ["/engage", "Engage"],
  ]) {
    const current = navigation.primaryNavigation.filter((item) =>
      navigation.isPrimaryNavCurrent(pathname, item),
    );
    assert.deepEqual(current.map(({ label }) => label), [expected]);
  }

  for (const pathname of ["/agents/reachy-mini-cli/", "/agent/", "/engagement/"]) {
    const current = navigation.primaryNavigation.filter((item) =>
      navigation.isPrimaryNavCurrent(pathname, item),
    );
    assert.deepEqual(current, []);
  }
});

test("Header and Footer share navigation and accessible current-state semantics", async () => {
  const [header, footer] = await Promise.all([
    readFile(headerUrl, "utf8"),
    readFile(footerUrl, "utf8"),
  ]);

  for (const component of [header, footer]) {
    assert.match(component, /primaryNavigation\.map/);
    assert.match(component, /isPrimaryNavCurrent/);
    assert.match(component, /aria-current=/);
    assert.match(component, /flex-wrap:\s*wrap/);
  }
});

test("the home Explore surface links Articles and Presentations exactly once each", async () => {
  const home = await readFile(homeUrl, "utf8");
  const articleLinks = home.match(/href:\s*["']\/articles\/["']/g) ?? [];
  const presentationLinks = home.match(/href:\s*["']\/presentations\/["']/g) ?? [];

  assert.equal(articleLinks.length, 1);
  assert.match(home, /label:\s*["']Articles["']/);

  assert.equal(presentationLinks.length, 1);
  assert.match(home, /label:\s*["']Presentations["']/);
});
