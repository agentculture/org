import { existsSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const siteRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const distRoot = join(siteRoot, "dist");

const adoptedRoutes = new Map([
  [
    "/agents/devague/",
    {
      name: "devague",
      actions: [
        ["https://github.com/agentculture/devague", "Read the code →"],
        ["https://pypi.org/project/devague/", "uv tool install devague"],
      ],
    },
  ],
  [
    "/agents/colleague/",
    {
      name: "colleague",
      actions: [
        ["https://github.com/agentculture/colleague", "Read the code →"],
        ["https://pypi.org/project/colleague/", "uv tool install colleague"],
      ],
    },
  ],
  [
    "/agents/lobes/",
    {
      name: "lobes",
      actions: [["https://github.com/agentculture/lobes-cli", "Read the code →"]],
    },
  ],
  [
    "/agents/reachy-mini-cli/",
    {
      name: "reachy-mini-cli",
      actions: [
        ["https://github.com/agentculture/reachy-mini-cli", "Read the code →"],
        [
          "https://pypi.org/project/reachy-mini-cli/",
          "uv tool install 'reachy-mini-cli[daemon]'",
        ],
      ],
    },
  ],
]);

const unchangedRoutes = [
  "/",
  "/agents/",
  "/articles/",
  "/articles/mind-nervous-system-body/",
  "/engage/",
  "/framework/",
  "/presentations/",
  "/presentations/mind-nervous-system-body/",
];

const failures = [];
const check = (condition, message) => {
  if (!condition) failures.push(message);
};

function htmlFor(route) {
  const path = route === "/" ? join(distRoot, "index.html") : join(distRoot, route, "index.html");
  check(existsSync(path), `${route}: built output is missing`);
  return existsSync(path) ? readFileSync(path, "utf8") : "";
}

function decodeHtml(value) {
  return value
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))
    .replace(/&#([0-9]+);/g, (_, code) => String.fromCodePoint(Number.parseInt(code, 10)))
    .replace(/&amp;/g, "&")
    .replace(/&gt;/g, ">")
    .replace(/&lt;/g, "<")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'");
}

function textContent(value) {
  return decodeHtml(value.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
}

function closingBand(html) {
  return html.match(/<section\b[^>]*data-closing-band[^>]*>[\s\S]*?<\/section>/i)?.[0] ?? "";
}

for (const [route, expected] of adoptedRoutes) {
  const html = htmlFor(route);
  if (!html) continue;

  const bands = html.match(/data-closing-band/g) ?? [];
  const band = closingBand(html);
  const mainStart = html.indexOf("<main");
  const mainEnd = html.indexOf("</main>");
  const bandStart = html.indexOf("data-closing-band");
  const footerStart = html.indexOf('<footer class="site-footer"');

  check(bands.length === 1, `${route}: expected one closing band, found ${bands.length}`);
  check(Boolean(band), `${route}: closing band markup could not be read`);
  check(
    mainStart !== -1 && bandStart > mainStart && bandStart < mainEnd && footerStart > mainEnd,
    `${route}: closing band must be inside main and before the one site footer`,
  );
  check(/aria-label="Closing"/.test(band), `${route}: closing band lost its accessible label`);
  check(
    new RegExp(`<span class="closing-word"[^>]*>${expected.name}</span>`).test(band),
    `${route}: closing word must be ${expected.name}`,
  );
  check(
    /class="closing-flourish"[\s\S]*?aria-hidden="true"/.test(band),
    `${route}: decorative flourish must be present and hidden from assistive technology`,
  );

  const actions = [...band.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi)].map(
    ([, href, content]) => [decodeHtml(href), textContent(content)],
  );
  check(
    JSON.stringify(actions) === JSON.stringify(expected.actions),
    `${route}: actions ${JSON.stringify(actions)} do not match ${JSON.stringify(expected.actions)}`,
  );
  const hasLegacyClosing = [...html.matchAll(/class="([^"]*)"/g)].some(([, classes]) =>
    classes.split(/\s+/).includes("closing"),
  );
  check(!hasLegacyClosing, `${route}: legacy closing class remains`);
}

for (const route of unchangedRoutes) {
  const html = htmlFor(route);
  if (html) check(!html.includes("data-closing-band"), `${route}: gained an agent closing band`);
}

if (failures.length) {
  for (const failure of failures) console.error(`FAIL ${failure}`);
  console.error(`Closing-band contract failed with ${failures.length} failure(s).`);
  process.exit(1);
}

const actionCount = [...adoptedRoutes.values()].reduce(
  (total, route) => total + route.actions.length,
  0,
);
console.log(
  `Closing-band contract passed: ${adoptedRoutes.size} adopted routes, ` +
    `${unchangedRoutes.length} unchanged routes, and ${actionCount} reviewed actions.`,
);
