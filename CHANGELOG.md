# Changelog

All notable changes to this project will be documented in this file.

Format follows [Keep a Changelog](https://keepachangelog.com/). This project
adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.17.1] - 2026-07-22

### Fixed

- Deck technical review fixes: the architecture diagram's runtime layer reads "ROS-backed or native · persistent execution" with "nodes · controllers · rules · intents · arbitration" (ROS 2 is not itself a fixed-rate loop; the 50 Hz design rate moved to the stack slide's Reachy-specific spoken aside); the control-plane box renamed "Robot interface" (CLI · JSON feed · intent spool) so the dotted agent-runtime paths no longer contradict the stable-bridge story; the diagram caption reads "operational command and state paths" instead of "direct, synchronous calls"; slide 2 softened to "These approaches can coexist…" with bottom line "What matters is a stable boundary."; the close Reachy command is `behavior engine run`; the source note reads "separates the optional agent from the symbolic runtime."

## [0.17.0] - 2026-07-22

### Changed

- The mind–nervous-system–body deck slide 5 reshaped to a uniform trio of animated autonomy situation vignettes (Stuck, Disconnected, Routine) with the photo cell removed; the so101-action photo slot deleted end-to-end (slot, shot-brief, placeholders); slide 5 spoken track made robot-generic; close card retitled to SO-ARM101

## [0.16.0] - 2026-07-22

### Added

- The mind–nervous-system–body deck restructured to six visual, declarative slides per issue #23 — new visual components, diagram runtime layer labeled "ROS 2 or native", thesis moved to the close slide, spoken cues relaxed to 4 sentences.

## [0.15.0] - 2026-07-22

### Changed

- The presentations deck at /presentations/mind-nervous-system-body/ is reframed around the operational architecture (org#21): a CLI for intelligence, a runtime for embodiment — at most 8 primary beats, a five-layer architecture diagram, command-sequence and rules slides, the presentation card retitled, and the deck contracts (check:presentations + slides test) newly enforced in CI.

## [0.14.0] - 2026-07-20

### Added

- Articles section: the mind–nervous-system–body talk in full text at /articles/mind-nervous-system-body/ with its own library page and typed catalog
- Presentations rebuilt as a symbolic slide deck at /presentations/mind-nervous-system-body/ — one route, 10 full-viewport slides derived from the talk beats, one robot per slide, keyboard and visible controls as progressive enhancement, reduced-motion-safe
- Photo foundation: four placeholder WebP slots (thumb + full pairs) with a typed manifest and contributor shot guide (docs/presentation-photos.md)
- Deck slide dataset with a node:test suite enforcing evidence resolution, one-robot-per-slide, and photo-slot ownership

### Changed

- Primary navigation grows to six items (Articles + Presentations, both section-matched); navigation tests retaught; home Explore cards updated
- check-presentations.mjs retaught: 16 deterministic checks over the articles/deck split, fail-on-drift proven
- Internal-link baseline restated: exactly 24 inherited /learn/ failures across 12 pages (2 per page), zero others — issue #18 still tracks the Learn route

## [0.13.0] - 2026-07-19

### Added

- Reusable Presentations index and card for discovering static talks.
- The sourced ‘Mind, nervous system, body’ talk connecting the agent, code, and robot through Reachy Mini CLI and ARM101 CLI.

### Changed

- Site wayfinding now includes Presentations in the header, footer, and home Explore section, with section-aware current states.

## [0.12.0] - 2026-07-17

### Added

- /agents/reachy-mini-cli — the embodiment presentation page: capabilities, the 14-noun map, the single-SDK-owner model (ReachyDiagram), senses/presence, the think cognition loop, agent-first surface, a tracker-driven what's-next, and 14 real captured sessions (ReachyTerminal replay component, reachy-mini-cli.ts content model, reachy-mini-cli-captures.ts verbatim captures — 13 fresh-run panes from a live robot batch on spark, 1 ported cognition pane)
- devague artifacts for the run: the-reachy-mini-cli-page frame (25 claims, 20 honesty conditions, 16 scope entries incl. the rigorous /challenge pass), plan (7 tasks, 5 waves, 4 risks), exported spec + plan docs

### Changed

- site.ts: the reachy-mini-cli agents-index card now links /agents/reachy-mini-cli/ instead of the GitHub repo

### Fixed

- ReachyTerminal derives its fresh/ported provenance chrome from the pane's stable id prefix (`ported-…`), the sibling terminals' convention, instead of parsing the display-only `source` string — a wording edit there can no longer silently flip a ported pane to fresh-run chrome (qodo review on #17)

## [0.11.0] - 2026-07-16

### Added

- /agents/colleague — the colleague presentation page: paradigm (one runtime, many minds), the three render tiers (TUI cockpit, TAUI, bot JSON), colleague work + flight piloting, subagent orchestration with typed roles, cortex & senses via lobes, eidetic memory, more-surfaces, a tracker-driven what's-next, and real captured sessions throughout (ColleagueTerminal replay component, colleague.ts content model, colleague-captures.ts verbatim captures)
- devague artifacts for the run: the-colleague-page frame (22 claims, 22 honesty conditions, 19 scope entries incl. the /challenge pass), plan (7 tasks, 3 waves, 3 risks), exported spec + plan docs

### Changed

- site.ts: the colleague agents-index card now links /agents/colleague/ instead of the GitHub repo

## [0.10.0] - 2026-07-15

### Added

- Vendored the seventh devague origin skill `/challenge` (blind-spot discovery pass between `/think` and `/spec-to-plan`) from devague 0.19.0 — direct vendor, verbatim, `type: command`; ledger row in `docs/skill-sources.md`.
- /agents/devague now presents the seven-leg method: seventh pipeline stage and skill card, a ninth `challenge` stage in the flow diagram, and a third verbatim capture batch replaying this update's own /challenge session.

## [0.9.0] - 2026-07-15

### Added

- Scope, deviate, and summarize-delivery skills vendored from devague, with ledger rows in docs/skill-sources.md

### Changed

- /agents/devague page now presents the full six-leg devague method (scope, think, spec-to-plan, assign-to-workforce, deviate, summarize-delivery) as a product presentation: new scope/deviate/summary capture panes, extended flow arc and terminal legs, launch meta dropped from presentation copy

## [0.8.0] - 2026-07-14

### Added

- Two real shape captures on /agents/lobes, taken on this box with lobes-cli 0.42.0: the live co-residency tax read off the deployed .env, and the spark-lobe dry-run showing the reclaim (cortex 0.44/262144, MULTIMODAL_FEASIBLE=false) — zero scaffold bytes changed, hash-verified
- Mesh-brain end-state prose (#112 converged spec: one heavy lobe per box, cheap gears co-reside, direct + honest referral) and the named next step: Jetson AGX Orin (JetPack 7.2) joins the mesh brain as its small-model lobe
- devague frame, spec, and plan for the update (docs/specs/, docs/plans/, .devague/)

### Changed

- /agents/lobes Mesh-brain section rewritten from vision to shipped: deployment shapes (machine-as-brain / spark-lobe / thor-lobe), lobes init --shape under dry-run/--apply, measured budget reclaim, dropped-lobe honesty (404 role_infeasible)
- Section heading, diagram captions, facts chips, orin machine note, data-file header contract, and benchmarks links (adds machine-profiles.md) reconciled to lobes-cli 0.42.0 (main @ 8aa2d2f)

## [0.7.0] - 2026-07-14

### Added

- /agents/devague — a presentation-grade page introducing devague: the idea→spec→plan pipeline, the announcement-frame method, the human review loop, the operator skills, real captured sessions (the page's own frame — dogfooding), and a what's-next drawn from the open tracker
- devague card in the /agents/ directory (Developer tooling group)
- DevagueFlow component — animated method-arc centerpiece (compositor-only, reduced-motion still frame)
- DevagueTerminal component — typed replay of captured sessions, word-chunked typing for long commands, and the :global() pattern for set:html markup under Astro scoped CSS
- devague.ts + devague-captures.ts data modules; spec and plan exported by devague itself

### Fixed

- MD034 bare URL in the exported plan doc (0.17.0 exporter predates devague#65)

## [0.6.0] - 2026-07-14

### Added

- The /agents/lobes page: a presentation-grade introduction to lobes-cli — the lobes it serves (six roles), purpose × machine profiles, validated hardware (DGX Spark, Jetson Thor; AGX Orin/JetPack 7.2 planned), a benchmarking area with reproducible git links, and the Mesh-brain direction
- LobesDiagram component: two hand-placed scenes (models as lobes of one machine ↔ machines as lobes of the Mesh-brain) crossfading compositor-only, stacked and still under reduced motion
- LobesTerminal component: replays real captured sessions (spark local, thor over the LAN, captured 2026-07-14) with a build-time typing schedule — the published page makes zero network calls

### Changed

- The lobes-cli card on /agents/ now links to /agents/lobes (the page links out to the GitHub repo)

## [0.5.1] - 2026-07-11

### Added

- Learn nav link (header + footer) and a learn-cli directory entry pointing at /learn/ — opens public discovery of the learning hub now that the same-origin agentculture.org/learn/ route is live (signed-out + signed-in verified).

## [0.5.0] - 2026-07-10

### Added

- The AgentCulture.org site: Astro static build in site-astro/ — four pages (Home, Framework, Agents & Repos, Engage), the "First light over the mesh" design system (dawn-sky light/dark themes, breathing constellation-mycelium hero, WCAG AA contrast, prefers-reduced-motion honored end to end), all content verified against live repos.
- site noun group on the org CLI: site overview / build / preview / link-check / deploy — deploy is dry-run by default with --apply, link-check is zero-dep stdlib.
- deploy.yml in the slot the removed publish.yml vacated: builds the site and deploys site-astro/dist to the Cloudflare Pages project agentculture-org via wrangler (production on main, previews on PRs, skip-guard while secrets are unset). Zero PyPI steps.
- docs/deploy-runbook.md: the provisioned Cloudflare state (project, real subdomain, custom domains), the operator-gated cutover + rollback procedure.
- docs/specs/ and docs/plans/: the devague-converged spec and 12-task build plan behind this release.

### Changed

- Self-description realigned: README, learn, and the explain root no longer claim the site is unbuilt (doc-test-alignment).
- site-build CI job added to tests.yml; markdownlint config now ignores nested node_modules and .devague working state.

## [0.4.2] - 2026-07-10

### Added

- **`CLAUDE.md`: expanded the bootstrap seed into a real runtime prompt** (`/init`,
  the first owed step on [org#2](https://github.com/agentculture/org/issues/2)).
  Documents the CLI architecture (a registry of `register()`-ing command modules,
  the three stable contracts, the `explain`-catalog invariant), the constructs
  that exist only to pass `teken cli doctor --strict` and must not be
  "simplified" away, the enforced conventions (version-bump-every-PR, Sonar's
  `relative_files`, cite-don't-import skills, the `cicd` PR lane), and a
  **Building the site** section recording what org#2 leaves open.
- **Two `.gitignore` traps documented** ahead of the site build: a top-level
  `site/` is silently ignored by the inherited mkdocs `/site` stanza (verified
  with `git check-ignore`), and `site-astro/dist/` is ignored by the `dist/`
  rule. The house directory name is `site-astro/`.
- **Recorded that no deploy-workflow template exists.** org#2 says to add the
  deploy workflow "in the slot the removed `publish.yml` vacated" — but every
  sibling's `publish.yml` (`culture-tools`, `katvan`,
  `league-of-agents-platform`) is a **PyPI publishing** workflow, exactly what
  [org#1](https://github.com/agentculture/org/pull/1) removed. It is a filename
  slot, not a precedent; the deploy workflow must be authored fresh.

### Changed

- **Self-description now names org, not the template it was scaffolded from.**
  `culture-agent-template`'s prose described a *clonable template*; org is a real
  agent. Corrected in `learn` (text + JSON `purpose`), the argparse
  `description`, the `explain` root entry, the `overview` artifact list, and the
  `whoami` / `overview` / `explain` module docstrings.
- **`explain`'s root entry cited `CLAUDE.md` as the mesh identity file.** For
  `backend: colleague` that is `AGENTS.colleague.md`. (`overview` and
  `explain doctor` were already corrected in 0.3.4; this finishes the sweep.)
  `CLAUDE.md` now states plainly that it guides Claude Code in the repo and is
  *not* this agent's resident prompt.
- **`README.md`:** replaced the template-leftover "Make it your own" section —
  which pointed at a rename procedure that never existed in any version of
  `CLAUDE.md` — with "The site" (status + the two traps above) and
  "Contributing".
- **`docs/skill-sources.md`:** "this template's `outsource/`" → "org's".

### Fixed

- **`uv.lock` was stale.** It recorded `org 0.4.0` while `pyproject.toml`
  declared `0.4.1` — the 0.4.1 bump never relocked.

## [0.4.1] - 2026-07-10

### Changed

- **Stripped PyPI publishing** ([org#1](https://github.com/agentculture/org/pull/1)).
  org ships a site, not a package: deleted `publish.yml`, dropped the vendored
  `pypi-maintainer` skill and its `docs/skill-sources.md` row. org is excluded
  from guildmaster's `pypi-maintainer` ledger row, and no Trusted Publisher is
  or will be registered. The CLI stays repo-local (`uv run org …`).

## [0.4.0] - 2026-06-23

### Added

- **Vendored the `remember` + `recall` memory skills from eidetic-cli**
  (cite-don't-import) — the write/read halves of eidetic's shared memory store
  (a home-directory path outside any git worktree), so this agent (Claude and
  its colleague backend) can persist facts across sessions and recall them
  later, sharing one store.
  `remember` drives `eidetic remember` (idempotent upsert of one JSON record or
  an NDJSON batch on stdin, dedup by id + content hash); `recall` drives
  `eidetic recall` with four search modes — exact / approximate / keyword /
  hybrid — each hit carrying text, full provenance metadata, a relevance score,
  and a freshness signal. The `.sh` wrappers are byte-verbatim from eidetic-cli
  (their first-party origin); each `SKILL.md` is localized only in the
  illustrative `--scope <nick>` examples (Provenance keeps "First-party to
  eidetic-cli"). Both default to this agent's PRIVATE scope, reading the suffix
  from `culture.yaml`. Runtime dep: the `eidetic` CLI on PATH (else a local
  eidetic-cli checkout with `uv`). Propagated by rollout-cli's `eidetic-memory`
  recipe.

## [0.3.4] - 2026-06-20

### Fixed

- Identity docs and self-description strings still claimed `backend: claude`
  (prompt file `CLAUDE.md`), but this template was promoted to a colleague
  resident in #14/#15: `culture.yaml` declares `backend: colleague` (Qwen) with
  `AGENTS.colleague.md` as the resident prompt. Corrected the stale claim in
  `CLAUDE.md` (Identity section), `README.md`, `docs/skill-sources.md`, and the
  two CLI description strings (`overview` artifacts and `explain doctor`). The
  `doctor` backend→prompt-file mapping and the tests were already on
  `colleague`; this aligns the prose and self-description with them.

## [0.3.3] - 2026-06-20

### Fixed

- pyproject.toml: correct the `license` field and PyPI classifier from MIT to
  Apache-2.0 to match the `LICENSE` file. The README License section was already
  corrected in 0.3.2, but the package metadata was missed; the built wheel now
  reports `License-Expression: Apache-2.0`.

## [0.3.2] - 2026-06-18

### Added

- ask-colleague skill: `monitor`/`guide`/`stop` pilot verbs plus a `--watch`
  flag to dispatch, watch the live feed of, send mid-flight guidance to, and
  cooperatively stop a running colleague flight (re-vendored from colleague).

### Changed

- README: correct the License section from MIT to Apache 2.0 to match the
  `LICENSE` file.

## [0.3.1] - 2026-06-13

### Changed

- CLAUDE.md: add a convention to reach for the `ask-colleague` skill reflexively
  for explore/review/write/grade — read-only `review`/`explore` are always safe;
  side-effecting `write` needs the user's go-ahead.

## [0.3.0] - 2026-06-13

### Added

- AGENTS.colleague.md resident prompt file (backend colleague <-> AGENTS.colleague.md)

### Changed

- Promote agent identity to a colleague resident: culture.yaml backend
  claude -> colleague with a pinned model. The `doctor` backend-consistency
  map gains `colleague` -> AGENTS.colleague.md.

## [0.2.1] - 2026-06-12

### Changed

- **Re-vendored the `ask-colleague` skill from colleague (now 1.7.0, up from the
  0.39.2 sync)** — the wrapper had drifted multiple releases behind origin. Picks
  up the `clean` verb (reap stale/corrupt `colleague/*` branches + orphaned
  `.colleague/` artifacts a crashed run left behind), the `--json` flag on every
  verb (result JSON on stdout, diagnostics/digest on stderr), the
  `_colleague_via_uv` local-dev resolution that honors `--repo`, and the
  tri-state (0/1/2) exit-code contract. `scripts/ask-colleague.sh` + `prompts/`
  are byte-identical to the origin; `SKILL.md` diverges only in the one
  consumer-identifying Provenance clause (`org vendors from
  guildmaster`). `docs/skill-sources.md` sync row updated to
  `2026-06-12 (colleague 1.7.0, direct)`. Refs: colleague#183, #186.

## [0.2.0] - 2026-06-06

### Added

- **`ask-colleague` skill** (`.claude/skills/ask-colleague/`) — the first-party front door to the `colleague` CLI (the renamed `convertible`). On top of `explore` / `review` / `write` it adds a `feedback` verb (grade a finished work item — the ROI loop), and `write` now **previews by default** in a throwaway worktree (no side effects) unless `--apply` / `--pr` is given. Reach for it reflexively — `review` for a diverse second opinion on a committed diff before opening a PR, `explore` for a fresh read of an unfamiliar area.

### Changed

- **Replaced the `outsource` skill with `ask-colleague`.** `outsource` was renamed to `ask-colleague` upstream ([colleague#148](https://github.com/agentculture/colleague/pull/148)). Because guildmaster has not re-broadcast the rename yet (its kit still ships the old `outsource`), `ask-colleague` is vendored **directly from the sibling `colleague` checkout** rather than from guildmaster — a tracked local divergence recorded in `docs/skill-sources.md`, parallel to the `agex` → `devex` one. Vendored verbatim except one consumer-identifying clause in the Provenance paragraph.
- **Ledger + CLAUDE.md + `.gitignore`:** point `docs/skill-sources.md` and the CLAUDE.md Skills section at `colleague` / `ask-colleague`, swap the *optional* runtime prerequisite `convertible` → `colleague` (env prefix `CONVERTIBLE_*` → `COLLEAGUE_*`, with the legacy names kept as a deprecated fallback), and gitignore the `.colleague/` run-artifact dir the skill writes (plus the stale `.agex/`).

## [0.1.4] - 2026-05-31

### Added

- **Vendor the `outsource` skill** (`.claude/skills/outsource/`) from
  guildmaster's canonical copy (origin
  [`agentculture/convertible`](https://github.com/agentculture/convertible),
  re-broadcast via guildmaster — guildmaster
  [#51](https://github.com/agentculture/guildmaster/pull/51)). Every agent
  cloned from this template now inherits the ability to hand a scoped task to a
  *different* engine/mind: `explore` (read-only investigation), `review` (a
  diverse second opinion on the committed diff), and `write` (delegate a small
  implementation). `explore`/`review` run isolated in a throwaway `git worktree`;
  `write` refuses a dirty tree. Fulfils
  [#8](https://github.com/agentculture/org/issues/8).
- **Ledger + CLAUDE.md:** record `outsource` in `docs/skill-sources.md`
  (origin = convertible, re-broadcast via guildmaster; vendored verbatim — it
  already carries `type: command`) and document its *optional* runtime
  dependency on the `convertible` CLI (the skill exits with an install hint if
  absent, so a clone that never uses it is unaffected).

### Changed

### Fixed

## [0.1.3] - 2026-05-31

### Changed

- Expanded the clone-and-rename instructions in `CLAUDE.md`: added `README.md` to
  the rename targets and a portable `git grep` discovery command so a cloner can
  find every occurrence of the template name (hard-coded in ~100 places across the
  package, including the CLI command files and `_ISSUES_URL` in
  `org/cli/__init__.py`) rather than renaming by hand.
- Synced `README.md`'s "Make it your own" checklist with `CLAUDE.md`: it now lists
  `README.md` itself as a rename target and points to `CLAUDE.md`'s discovery
  command as the authoritative procedure, so the two onboarding checklists no
  longer drift.

## [0.1.2] - 2026-05-30

### Changed

- Renamed the PR-lifecycle CLI references `agex` / `agex-cli` to `devex` (same
  tool, new name) across `CLAUDE.md`, `docs/skill-sources.md`, `.gitignore`, and
  the vendored `cicd`, `assign-to-workforce`, and `communicate` skills — the
  `cicd` scripts now invoke `devex pr`.
- Logged the vendored-skill in-place patch as a local divergence in
  `docs/skill-sources.md`; the matching canonical rename is tracked upstream for
  guildmaster in
  [agentculture/guildmaster#48](https://github.com/agentculture/guildmaster/issues/48)
  so a future re-sync reconciles cleanly.
- Aligned the documented `devex` version floor to `>=0.21` across the vendored
  `cicd` `SKILL.md` and `workflow.sh` install hint (were `>=0.1`), matching
  `docs/skill-sources.md` and the `await`-era feature set; flagged upstream on
  guildmaster#48.

### Fixed

- SonarCloud now reports code coverage — added `relative_files = true` to
  `[tool.coverage.run]` so `coverage.xml` emits repo-relative paths that map to
  `sonar.sources=org` (absolute / `.venv` paths were dropped
  as unmappable). Mirrors the sibling `convertible` setup.

## [0.1.1] - 2026-05-26

### Changed

- **CI gates on the SonarCloud quality gate**
  ([issue #3](https://github.com/agentculture/org/issues/3)) —
  added `sonar.qualitygate.wait=true` to `sonar-project.properties` so a failing
  gate fails the `test` job when `SONAR_TOKEN` is set. Token-less repos and fork
  PRs remain green (the scan step is guarded by `if: env.SONAR_TOKEN != ''`).

## [0.1.0] - 2026-05-26

### Added

- **Onboarded into the AgentCulture mesh** ([issue #1](https://github.com/agentculture/org/issues/1)).
- **Agent-first CLI** cited from teken's (`afi-cli`) `python-cli` reference
  (`teken cli cite`) — verbs `whoami`, `learn`, `explain`, `overview`, `doctor`,
  and the `cli` noun group. Runtime is self-contained (`dependencies = []`);
  `teken>=0.8` is a dev dependency only. Passes the seven-bundle agent-first
  rubric (`teken cli doctor . --strict`). `doctor` checks the agent-identity
  invariants (prompt-file-present, backend-consistency, skills-present).
- **Mesh identity**: `culture.yaml` (`suffix: org`,
  `backend: claude`) and the matching `CLAUDE.md` prompt file.
- **Canonical guildmaster skill kit** (11 skills) vendored under
  `.claude/skills/` (cite-don't-import): `agent-config`, `assign-to-workforce`,
  `cicd`, `communicate`, `doc-test-alignment`, `pypi-maintainer`, `run-tests`,
  `sonarclaude`, `spec-to-plan`, `think`, `version-bump`. Every `SKILL.md`
  carries `type: command` (load-bearing for the culture/claude backend);
  `cicd` / `communicate` consumer-identifying prose adapted, all script bodies
  verbatim. Provenance in `docs/skill-sources.md`. Three skills (`think`,
  `spec-to-plan`, `assign-to-workforce`) originate in `devague`, re-broadcast
  via guildmaster.
- **Build + deploy baseline**: `pyproject.toml` (hatchling), `tests/` (pytest,
  xdist, coverage), `.github/workflows/{tests,publish}.yml` (CI rubric/lint gate,
  PyPI Trusted Publishing), `.flake8`, `.markdownlint-cli2.yaml`,
  `sonar-project.properties`, and `.claude/skills.local.yaml.example`.

### Changed

### Fixed
