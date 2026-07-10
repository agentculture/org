"""Markdown catalog for ``org explain <path>``.

Each entry is verbatim markdown. Keys are command-path tuples. The empty tuple
and ``("org",)`` both resolve to the root entry.

Keep bodies self-contained: an agent reading one entry should get enough
context without chaining reads.
"""

from __future__ import annotations

_ROOT = """\
# org

The AgentCulture org site — source of the web presence published to
AgentCulture.org. This CLI is the site's operator surface: it stays repo-local
(`uv run org …`) and is never published to PyPI. The repo also carries this
agent's mesh identity (`culture.yaml` + `AGENTS.colleague.md`, since it runs
`backend: colleague`) and the guildmaster skill kit under `.claude/skills/`.

The site itself lives in `site-astro/` (Astro, `output: 'static'`) and is
deployed to Cloudflare Pages as `agentculture.org` via `deploy.yml` and the
`site` command group below.

## Verbs

- `org whoami` — identity probe from `culture.yaml`.
- `org learn` — structured self-teaching prompt.
- `org explain <path>` — markdown docs for any noun/verb.
- `org overview` — descriptive snapshot of the agent.
- `org doctor` — check the agent-identity invariants.
- `org cli overview` — describe the CLI surface.
- `org site overview` — describe the site operator surface (build, preview,
  link-check, deploy).

## Exit-code policy

- `0` success
- `1` user-input error
- `2` environment / setup error
- `3+` reserved

## See also

- `org explain whoami`
- `org explain doctor`
- `org explain site`
"""

_WHOAMI = """\
# org whoami

Reports the agent's identity from `culture.yaml`: nick (`suffix`), backend,
served model, and the package version. Read-only.

## Usage

    org whoami
    org whoami --json
"""

_LEARN = """\
# org learn

Prints a structured self-teaching prompt covering purpose, command map,
exit-code policy, `--json` support, and the `explain` pointer.

## Usage

    org learn
    org learn --json
"""

_EXPLAIN = """\
# org explain <path>

Prints markdown documentation for any noun/verb path. Unlike `--help` (terse,
positional), `explain` is global and addressable by path.

## Usage

    org explain org
    org explain whoami
    org explain --json <path>
"""

_OVERVIEW = """\
# org overview

Read-only descriptive snapshot of the agent: identity (from `culture.yaml`), the
verb surface, and the sibling-pattern artifacts this repo carries. Accepts an
ignored `target` so a stray path never hard-fails.

## Usage

    org overview
    org overview --json
"""

_DOCTOR = """\
# org doctor

Checks the agent-identity invariants `steward doctor` verifies:
prompt-file-present and backend-consistency (`colleague` → `AGENTS.colleague.md`), plus a
skills-present check. Exits 1 when unhealthy.

## Usage

    org doctor
    org doctor --json
"""

_CLI = """\
# org cli

Noun group for CLI-surface introspection. `cli overview` describes the CLI
itself (distinct from the global `overview`, which describes the agent).

## Usage

    org cli overview
    org cli overview --json
"""

_SITE = """\
# org site

Noun group operating the Astro site in `site-astro/` — this repo's deliverable
is the web presence published to AgentCulture.org, and `site` is its operator
surface (build, preview, link-check, deploy). `site overview` describes the
surface itself (distinct from the global `overview`, which describes the
agent).

## Verbs

- `org site overview` — describe the site operator surface.
- `org site build` — run the Astro production build (`npm run build` in
  `site-astro/`). Exit 2 if `site-astro/` or `npm` is missing.
- `org site preview` — serve the built site locally (`npm run preview`); runs
  until interrupted (Ctrl-C).
- `org site link-check` — walk `site-astro/dist/` for internal links/anchors
  that 404 within `dist/`. Exit 1 with the broken-link list if any are found;
  exit 2 (suggesting `site build`) if `dist/` doesn't exist yet.
- `org site deploy` — deploy `site-astro/dist/` to Cloudflare Pages. **Dry-run
  by default** (repo convention: write verbs default to dry-run); pass
  `--apply` to actually run `npx wrangler pages deploy`. Requires
  `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` in the environment for
  `--apply`; see `docs/deploy-runbook.md` for the full provisioning record.

## Usage

    org site overview
    org site build
    org site preview
    org site link-check
    org site deploy
    org site deploy --apply
"""

_SITE_DEPLOY = """\
# org site deploy

Deploys `site-astro/dist/` to the `agentculture-org` Cloudflare Pages project.

**Dry-run by default** — prints the deploy plan (project, source directory,
the exact `npx wrangler pages deploy` command it would run, including
`--branch <current-git-branch>` when resolvable, and which env vars must be
set) without executing anything. Pass `--apply` to actually run it.

`--apply` validates preconditions first and fails with a structured,
remediated error (exit 2) rather than a traceback:

- `site-astro/dist/` missing → run `org site build` first.
- `CLOUDFLARE_API_TOKEN` / `CLOUDFLARE_ACCOUNT_ID` unset → export them (see
  `docs/deploy-runbook.md`).
- `npx` not on PATH → install Node.js.

## Usage

    org site deploy              # dry-run: print the plan
    org site deploy --json       # dry-run, machine-readable plan
    org site deploy --apply      # actually deploy (needs dist/ + env vars)
"""

_SITE_LINK_CHECK = """\
# org site link-check

Walks every `*.html` file under `site-astro/dist/` (stdlib `html.parser` —
zero runtime dependencies) and checks that every internal `<a href>` — plain
file links, directory/index links, and `#fragment` anchors — resolves to a
real file (and, for fragments, a real `id`/`name` within it) inside `dist/`.
External links (`http(s)://`, `mailto:`, `tel:`, `javascript:`) are skipped.

Exit codes:

- `0` — no broken links; reports pages checked.
- `1` — one or more broken links found; the error message lists each as
  `<file>: <link> (<reason>)`.
- `2` — `site-astro/dist/` doesn't exist yet; remediation points at
  `org site build`.

## Usage

    org site link-check
    org site link-check --json
"""


ENTRIES: dict[tuple[str, ...], str] = {
    (): _ROOT,
    ("org",): _ROOT,
    ("whoami",): _WHOAMI,
    ("learn",): _LEARN,
    ("explain",): _EXPLAIN,
    ("overview",): _OVERVIEW,
    ("doctor",): _DOCTOR,
    ("cli",): _CLI,
    ("cli", "overview"): _CLI,
    ("site",): _SITE,
    ("site", "overview"): _SITE,
    ("site", "build"): _SITE,
    ("site", "preview"): _SITE,
    ("site", "link-check"): _SITE_LINK_CHECK,
    ("site", "deploy"): _SITE_DEPLOY,
}
