import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";

const distRoot = new URL("../dist/", import.meta.url);
const codeTokenPattern =
  /(?:--[a-z0-9][a-z0-9-]*|\/(?:scope|think|challenge|spec-to-plan|assign-to-workforce|deviate|summarize-delivery)\b|(?:colleague|sub)\/(?:<id>|&lt;id&gt;))/gi;

async function htmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map(async (entry) => {
      const url = new URL(entry.name + (entry.isDirectory() ? "/" : ""), directory);
      if (entry.isDirectory()) return htmlFiles(url);
      return entry.name.endsWith(".html") ? [url] : [];
    }),
  );
  return nested.flat();
}

const failures = [];

for (const file of await htmlFiles(distRoot)) {
  const html = await readFile(file, "utf8");
  const visibleText = html
    .replace(/<(script|style|pre|code)\b[^>]*>[\s\S]*?<\/\1>/gi, " ")
    .replace(
      /<([a-z][\w:-]*)\b[^>]*\bdata-inline-code-exempt\b[^>]*>[\s\S]*?<\/\1>/gi,
      " ",
    )
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ");
  const tokens = [...new Set(visibleText.match(codeTokenPattern) ?? [])];

  if (tokens.length > 0) {
    failures.push({
      page: file.pathname.slice(distRoot.pathname.length),
      tokens,
    });
  }
}

assert.deepEqual(
  failures,
  [],
  `Visible CLI flags, operator-skill commands, and branch templates outside intentional plain-text exceptions must render inside semantic code elements:\n${JSON.stringify(failures, null, 2)}`,
);

console.log(
  "Inline-code contract passed: no unapproved CLI flags, operator-skill commands, or branch templates remain as plain text.",
);
