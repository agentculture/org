import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const siteRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const distRoot = join(siteRoot, "dist");

const adoptedRoutes = new Map([
  [
    "/agents/devague/",
    {
      name: "devague",
      actions: [
        {
          href: "https://github.com/agentculture/devague",
          text: "Read the code →",
        },
        {
          href: "https://pypi.org/project/devague/",
          text: "uv tool install devague",
        },
      ],
    },
  ],
  [
    "/agents/colleague/",
    {
      name: "colleague",
      actions: [
        {
          href: "https://github.com/agentculture/colleague",
          text: "Read the code →",
        },
        {
          href: "https://pypi.org/project/colleague/",
          text: "uv tool install colleague",
        },
      ],
    },
  ],
  [
    "/agents/reachy-mini-cli/",
    {
      name: "reachy-mini-cli",
      actions: [
        {
          href: "https://github.com/agentculture/reachy-mini-cli",
          text: "Read the code →",
        },
        {
          href: "https://pypi.org/project/reachy-mini-cli/",
          text: "uv tool install 'reachy-mini-cli[daemon]'",
        },
      ],
    },
  ],
  [
    "/agents/lobes/",
    {
      name: "lobes",
      actions: [
        {
          href: "https://github.com/agentculture/lobes-cli",
          text: "Read the code →",
        },
      ],
    },
  ],
]);

// This first migration deliberately replaces only the four duplicated agent
// closes. Every other route is held unchanged for a separately reviewed PR.
const unchangedRoutes = new Set([
  "/",
  "/agents/",
  "/articles/",
  "/articles/mind-nervous-system-body/",
  "/engage/",
  "/framework/",
  "/presentations/",
  "/presentations/mind-nervous-system-body/",
]);

const failures = [];

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function check(label, assertion) {
  try {
    assertion();
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

function openings(html, tag) {
  const pattern = new RegExp(`<${tag}\\b([^>]*)>`, "gi");
  return [...html.matchAll(pattern)].map((match) => ({
    attrs: attributes(match[1]),
    start: match.index,
    end: match.index + match[0].length,
  }));
}

function allOpenings(html) {
  const pattern = /<[a-z][\w:-]*\b([^>]*)>/gi;
  return [...html.matchAll(pattern)].map((match) => attributes(match[1]));
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

function closingBands(html) {
  return openings(html, "section")
    .filter(({ attrs }) => Object.hasOwn(attrs, "data-closing-band"))
    .map((opening) => {
      const closeStart = html.indexOf("</section>", opening.end);
      const closeEnd = closeStart === -1 ? -1 : closeStart + "</section>".length;
      return {
        ...opening,
        closeEnd,
        outer: closeEnd === -1 ? "" : html.slice(opening.start, closeEnd),
      };
    });
}

function anchors(html) {
  return elements(html, "a").map((anchor) => ({
    href: anchor.attrs.href,
    text: textContent(anchor.inner),
  }));
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

const toPosix = (path) => path.split(sep).join("/");

function routeForOutput(path) {
  const output = toPosix(relative(distRoot, path));
  if (output === "index.html") return "/";
  if (output.endsWith("/index.html")) {
    return `/${output.slice(0, -"index.html".length)}`;
  }
  return `/${output}`;
}

if (!existsSync(distRoot)) {
  console.error("FAIL missing site-astro/dist; run `npm run build` first");
  process.exit(1);
}

const builtPages = new Map(
  htmlFiles(distRoot).map((path) => [
    routeForOutput(path),
    readFileSync(path, "utf8"),
  ]),
);
const expectedRoutes = [...adoptedRoutes.keys(), ...unchangedRoutes].sort();
const actualRoutes = [...builtPages.keys()].sort();

check("exact adopted/unchanged route matrix", () => {
  assert(
    JSON.stringify(actualRoutes) === JSON.stringify(expectedRoutes),
    `built routes are ${actualRoutes.join(", ")}; expected ${expectedRoutes.join(", ")}`,
  );
});

for (const [route, expected] of adoptedRoutes) {
  const html = builtPages.get(route);

  check(`${route} output exists`, () => {
    assert(html, "built page is missing");
  });
  if (!html) continue;

  const bands = closingBands(html);

  check(`${route} has one closing treatment in the page shell`, () => {
    assert(bands.length === 1, `expected one closing band, found ${bands.length}`);
    const band = bands[0];
    assert(band.closeEnd !== -1, "closing band has no closing </section>");

    const mains = openings(html, "main");
    const footers = openings(html, "footer");
    assert(mains.length === 1, `expected one <main>, found ${mains.length}`);
    assert(footers.length === 1, `expected one <footer>, found ${footers.length}`);
    assert(
      hasClass(footers[0].attrs, "site-footer"),
      "the single footer must be footer.site-footer",
    );

    const mainClose = html.indexOf("</main>", mains[0].end);
    assert(mainClose !== -1, "main has no closing </main>");
    assert(
      band.start > mains[0].end && band.closeEnd <= mainClose,
      "closing band must be fully inside <main>",
    );
    assert(
      footers[0].start > mainClose,
      "the real site footer must follow </main> and the closing band",
    );

    assert(
      band.attrs["aria-label"] === "Closing",
      'closing band must retain aria-label="Closing" from the approved mock',
    );

    const closingWords = elements(band.outer, "span").filter(({ attrs }) =>
      hasClass(attrs, "closing-word"),
    );
    assert(
      closingWords.length === 1,
      `expected one closing word, found ${closingWords.length}`,
    );
    assert(
      textContent(closingWords[0].inner) === expected.name,
      `closing word must be "${expected.name}"`,
    );

    const flourishes = openings(band.outer, "svg").filter(({ attrs }) =>
      hasClass(attrs, "closing-flourish"),
    );
    assert(
      flourishes.length === 1,
      `expected one closing flourish, found ${flourishes.length}`,
    );
    assert(
      flourishes[0].attrs["aria-hidden"] === "true",
      "decorative closing flourish must be hidden from assistive technology",
    );
  });

  check(`${route} has the reviewed action contract`, () => {
    assert(bands.length === 1, "cannot inspect actions without exactly one band");
    const bandAnchors = anchors(bands[0].outer);
    assert(
      bandAnchors.length === expected.actions.length,
      `expected ${expected.actions.length} actions, found ${bandAnchors.length}`,
    );
    assert(
      JSON.stringify(bandAnchors) === JSON.stringify(expected.actions),
      `actions are ${JSON.stringify(bandAnchors)}; expected ${JSON.stringify(expected.actions)}`,
    );
  });

  check(`${route} has no legacy closing markup`, () => {
    const legacyClosingElements = allOpenings(html).filter((attrs) =>
      hasClass(attrs, "closing"),
    );
    assert(
      legacyClosingElements.length === 0,
      `found ${legacyClosingElements.length} legacy class="closing" element(s)`,
    );
  });
}

for (const route of unchangedRoutes) {
  const html = builtPages.get(route);
  check(`${route} remains unchanged`, () => {
    assert(html, "built page is missing");
    assert(
      closingBands(html).length === 0,
      "route outside the first migration must not gain a closing band",
    );
  });
}

if (failures.length > 0) {
  for (const failure of failures) console.error(`FAIL ${failure}`);
  console.error(
    `Closing-band contract failed with ${failures.length} failure(s).`,
  );
  process.exit(1);
}

const actionCount = [...adoptedRoutes.values()].reduce(
  (total, route) => total + route.actions.length,
  0,
);
console.log(
  `Closing-band contract passed: ${adoptedRoutes.size} adopted routes, ` +
    `${unchangedRoutes.size} unchanged routes, and ${actionCount} reviewed actions.`,
);
