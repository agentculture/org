# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

`org` is the AgentCulture organization's web presence — the source of the site
published to **AgentCulture.org**. It replaces the deleted `landing-page` repo
(deleted outright, no transfer and no surviving checkout, so **there is no
content to migrate**: the site starts fresh).

**The site does not exist yet.** Today the repo contains only the scaffolded
agent-first CLI, which is the site's *operator surface* (build, preview, deploy,
link-check as those verbs get written). The build brief — information
architecture, stack choice, deploy target — is
[org#2](https://github.com/agentculture/org/issues/2). Read it before building
the site; it asks for a proposal **posted on the issue** before code.

**This repo is never published to PyPI.** [org#1](https://github.com/agentculture/org/pull/1)
deleted `publish.yml`, dropped the vendored `pypi-maintainer` skill, and removed
org from guildmaster's `pypi-maintainer` ledger row. No Trusted Publisher is or
will be registered. The CLI stays repo-local — invoke it as `uv run org …`,
never `uv tool install org`. Don't reintroduce a publish/build-and-upload job.

### Identity: `CLAUDE.md` is not this agent's resident prompt

`culture.yaml` declares `backend: colleague` (served by a local Qwen), so this
agent's **resident prompt file is `AGENTS.colleague.md`**, not this file.
`CLAUDE.md` guides Claude Code working *in* the repo; `AGENTS.colleague.md` is
what the colleague mesh resident loads. `doctor` enforces the mapping
(`colleague → AGENTS.colleague.md`), and a `culture.yaml` backend change that
isn't taught to `doctor._PROMPT_FILE` fails the `backend-consistency` invariant.

Changing the backend is a real change, not a doc edit: it touches `culture.yaml`,
deletes/adds a prompt file, and updates two assertions in `tests/test_cli.py`
(`test_whoami_text`, `test_whoami_json` both pin `backend: colleague`).

> The scaffold seed this file replaced claimed `culture.yaml` declares
> `backend: claude`. That was false — a template bug shared by every
> colleague-backend scaffold (`league-of-agents-platform` still carries it).
> Issue #2 lists reconciling it as an owed step; the resolution was to **keep
> `colleague`**.

### Zero runtime dependencies

`pyproject.toml` has `dependencies = []`, and that is a hard constraint. It's why
`whoami`/`doctor` hand-parse `culture.yaml` line by line instead of importing a
YAML library. Do not add a runtime dependency without an explicit decision to
drop the zero-dep property; dev-only tools go in `[dependency-groups].dev`.

## Commands

All Python work goes through **uv**. Python 3.12+.

```bash
uv sync                                            # install deps (incl. dev group)
uv run pytest -n auto                              # full suite (xdist parallel)
uv run pytest tests/test_cli.py::test_whoami_text  # a single test
uv run pytest -k doctor                            # tests matching a name
uv run org <verb>                                  # run the CLI (whoami, learn, …)
```

Lint — CI runs each of these and all must pass:

```bash
uv run black --check org tests
uv run isort --check-only org tests
uv run flake8 org tests
uv run bandit -c pyproject.toml -r org
markdownlint-cli2 "**/*.md" "#node_modules" "#.local" "#.claude/skills" "#.teken"
uv run teken cli doctor . --strict                 # the agent-first rubric gate
```

`teken cli doctor . --strict` is the **agent-first rubric gate** and is the
non-obvious one: a CI-blocking audit of the CLI against the `agentfront`
contract (`teken` is a dev dependency). Several design choices exist only to
satisfy it — see "The rubric shapes the code". **A green pytest run does not
imply a green rubric.** Run it locally before pushing.

## Architecture

### The CLI is a registry of `register()`-ing command modules

`org/cli/__init__.py` owns `main()` and `_build_parser()`. Each verb or noun
group is a module under `org/cli/_commands/` exposing a `register(subparsers)`
function, which `_build_parser()` calls in turn. To add a command: write
`_commands/<name>.py` with a `register()` and a `cmd_*` handler, then add one
`register()` call in `_build_parser()` (there's a marked spot for it).

Global verbs (not nested under a noun): `whoami`, `learn`, `explain`, `overview`,
`doctor`. Noun groups (today just `cli`) nest their own subparsers. `explain` is
global and path-addressable — `explain cli overview` resolves a tuple key,
distinct from `--help`.

### Three stable contracts every command obeys

Load-bearing; tests and the rubric enforce them. Match them in new code.

1. **stdout vs stderr split** (`cli/_output.py`). Results → stdout; errors and
   human diagnostics → stderr; **never mixed**. In `--json` mode both streams
   carry JSON to their respective destinations. Use `emit_result` /
   `emit_error` / `emit_diagnostic` — don't `print`.

2. **Structured errors via `CliError`** (`cli/_errors.py`). Every failure raises
   `CliError(code, message, remediation)`. `_dispatch()` catches it, routes
   through `emit_error`, and returns the code; it also wraps *any* unexpected
   exception so **no Python traceback ever leaks to stderr**. Even argparse
   parse errors are routed: `_CliArgumentParser` overrides `.error()`, and
   because subparsers are built with `parser_class=_CliArgumentParser`, nested
   parse errors get the same `error:` / `hint:` shape and exit 1 (not argparse's
   default exit 2). JSON mode for parse-time errors works via a class-level
   `_json_hint` that `main()` pre-populates by scanning raw argv for `--json`,
   because `args.json` doesn't exist yet when parsing fails.

3. **Exit-code policy.** `0` success · `1` user-input error · `2` environment
   error · `3+` reserved. Defined once in `cli/_errors.py`; documented in `learn`.

Every command also accepts `--json`.

### `explain` catalog

`org/explain/catalog.py` holds verbatim markdown keyed by command-path tuples
(`("cli", "overview")`). `explain/__init__.py:resolve()` looks the path up or
raises `CliError`. **Invariant enforced by a test**
(`test_every_catalog_path_resolves`): every key in `ENTRIES` must resolve. When
you add a command, add its catalog entry too.

### Identity probe (`whoami`) and `doctor`

`whoami.py:find_culture_yaml()` walks up from `__file__` — **not** the CWD — so
the identity is always this agent's own, not whatever `culture.yaml` sits in the
caller's directory. `read_agent_fields()` hand-parses the first agent block
(zero-dep rule). A wheel install ships no `culture.yaml`, so both fall back to
literal defaults; code paths must tolerate that. `doctor.py` mirrors the two
invariants `steward doctor` checks (`prompt-file-present`, `backend-consistency`)
plus a `skills-present` check, reporting the rubric-shaped
`{healthy, checks: [{id, passed, severity, message, remediation}]}`.

### The rubric shapes the code

Some constructs exist *only* to pass `teken cli doctor . --strict` and look
redundant otherwise — don't "simplify" them away:

- The `cli` noun group exists so the rubric's `overview_cli_noun_exists` check
  passes (any noun with action-verbs must expose `overview`). `cli overview`
  describes the CLI surface; the global `overview` describes the agent.
- `learn` must be ≥200 chars and mention purpose, command map, exit codes,
  `--json`, and `explain` (`test_learn_text` guards this).
- Descriptive verbs must **not** hard-fail on a bad target path — `overview`
  takes an ignored optional `target` so a stray path still exits 0.

## Conventions (non-obvious, enforced)

- **Version-bump every PR.** The `version-check` CI job fails any PR whose
  `pyproject.toml` version equals `main`'s — even a docs-, config-, or CI-only
  change. Use the `version-bump` skill (`/version-bump patch|minor|major`); it
  updates `pyproject.toml` and prepends a Keep-a-Changelog entry to
  `CHANGELOG.md`.
- **`main` is protected.** A repo ruleset requires PRs; you cannot push to `main`.
- **SonarCloud coverage needs repo-relative paths.** `[tool.coverage.run]
  relative_files = true` is set so `coverage.xml` filenames map onto
  `sonar.sources=org`; without it Sonar silently reports 0% coverage. Coverage
  gate: `fail_under = 60`. The Sonar quality gate (`sonar.qualitygate.wait`)
  blocks merge, but the scan step is a no-op without `SONAR_TOKEN` (fork PRs).
- **Skills are cite-don't-import vendored**, not authored here. `.claude/skills/`
  comes from **guildmaster** (the skills supplier); `docs/skill-sources.md` is the
  provenance ledger and re-sync procedure. Don't edit vendored script bodies —
  lift changes upstream into guildmaster and re-vendor. Two tracked local
  divergences exist (`agex`→`devex`, `outsource`→`ask-colleague`); read that doc
  before touching a skill. Every vendored `SKILL.md` must carry `type: command`
  (load-bearing: `core.skill_loader` silently skips files without it).
  `markdownlint` and `sonar.exclusions` both skip `.claude/skills/**` — vendored
  copies are cited verbatim and must not be reformatted.
- **PR lane = the `cicd` skill** (layered on `devex pr`): `cicd open`, `cicd read`,
  `cicd reply`, plus `cicd status` (SonarCloud gate + unresolved threads) and
  `cicd await` (poll until CI settles, non-zero on a red gate). Requires `devex`
  (>=0.21) on PATH. PR-reply signatures resolve the nick from `culture.yaml` via
  `_resolve-nick.sh` — don't hand-sign bodies the `cicd` scripts author.
- **Write verbs default to dry-run**, with `--apply` to commit. Preserve this as
  the site's deploy/build verbs land (an issue #2 invariant).

## Building the site

Nothing is decided yet — [org#2](https://github.com/agentculture/org/issues/2)
asks for the stack and information architecture to be **proposed on the issue
before building**. What the surrounding workspace establishes:

- **Repo shape.** `culture-tools` is the named precedent: one repo holding a
  Python CLI *and* a site in its own directory (`site-astro/`). `league-of-agents-platform`
  is the same shape with AWS infra (`league_site/` + `infra/`).
- **Stack.** The house direction is **Astro, `output: 'static'`, no adapter**, so
  `astro build` emits a pure-static `dist/`. `culture-tools` is Astro-native;
  `katvan` is mid-migration, keeping its Jekyll `site/` alive only until its
  `site-astro/` reaches parity and Cloudflare Pages cuts over. The Jekyll family
  (`agentic-human`, `humanic-ai`) is the older house style.
- **Deploy.** Sibling sites are served by **Cloudflare Pages** from the static
  `dist/`, and the deploy itself is a *credentialed operator step* via the
  `agentculture/cultureflare` infra repo, not something a checkout performs.
  The repo is private and the site public, which Pages supports.
  **DNS for AgentCulture.org is operator-owned — coordinate before going live.**
- **There is no deploy-workflow template to copy.** Issue #2 says to add the
  deploy workflow "in the slot the removed `publish.yml` vacated" — that is a
  *filename* slot. Every sibling's `publish.yml` is a **PyPI publishing**
  workflow (`uv build && uv publish`), which is exactly what org#1 removed and
  what this repo must never have. Author the deploy workflow fresh.

Two `.gitignore` traps to know before you create the directory:

```text
/site          → a top-level `site/` is IGNORED (inherited mkdocs stanza)
dist/          → any `dist/` is ignored, incl. `site-astro/dist/` (correct: build output)
```

Naming the directory `site-astro/` sidesteps the first and matches the house
name. If you deliberately want `site/`, you must amend `.gitignore` first, or
git will silently drop the entire site.

## Self-description must track reality

org was scaffolded from `culture-agent-template`, and the scaffold's prose
described a *clonable template* rather than this agent. Those strings were
corrected in 0.4.2 (`learn`, the parser `description`, the `explain` root, the
`overview` artifact list, `README.md`). When the site lands, they go stale again
— `learn`, `explain`'s `_ROOT`, and `README.md` all assert "the site is not built
yet". The `doc-test-alignment` skill exists to catch exactly this drift.
