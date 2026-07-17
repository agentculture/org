# the reachy-mini-cli page

> AgentCulture.org /agents/reachy-mini-cli is live: a presentation page for the Reachy Mini operator CLI — the noun map, the single-SDK-owner model, and real live-robot captures — joining devague, lobes, and colleague in the agents family.
> instruction: build the page in site-astro (new page + data module + captures module + terminal & diagram components + site.ts url flip), run the capture batch on this rig first, verify with npm run build and the h1-h8 conditions, ship as one PR with a version bump

## Audience

- AgentCulture.org visitors evaluating the agent-first way of working, plus the page's second life as a presentation the operator talks over — same dual audience as the devague/lobes/colleague pages

## Before → After

- Before: reachy-mini-cli is the only agents-index entry of its group still pointing off-site to GitHub; the CLI's story (14 nouns, single-SDK-owner model, live senses, presence modes) exists only in the repo's own docs
- After: /agents/reachy-mini-cli/ is live: the physical-embodiment leg of the agents family — a desk robot operated agent-first from a shell — presented with the noun map, the single-SDK-owner model, and real captures; the agents index links it locally instead of off-site

## Why it matters

- devague shows the method, lobes the split brain, colleague the swappable mind — reachy-mini-cli is the missing embodiment leg: the same agent-first CLI discipline (nouns, --json everywhere, exit codes, explain/learn) driving a physical robot; presenting it completes the family

## Requirements

- New page site-astro/src/pages/agents/reachy-mini-cli.astro composed entirely from a data module: all copy (eyebrows, headlines, intros, card text) lives in src/data/reachy-mini-cli.ts, same convention colleague.astro:16-24 states explicitly — the page is spoken-presentation copy, the template only composes
  - honesty: the built page contains no narrative copy hardcoded in the template — every headline, intro, and card cell traces to src/data/reachy-mini-cli.ts (any deliberate exception is documented in the page header comment, as colleague.astro did)
- Real-captures module src/data/reachy-mini-cli-captures.ts using the CapturePane/CaptureLine contract from colleague-captures.ts: every cmd/out line verbatim from a real session, cuts marked with ellipsis lines, per-pane provenance (fresh run vs ported), and the page only replays — it never runs the CLI at build or view time
  - instruction: run the capture batch before authoring any pane: save each raw terminal transcript under the session scratchpad, then transcribe verbatim into reachy-mini-cli-captures.ts with per-pane source lines (fresh run · rig + date, or ported · repo path)
  - honesty: every cmd/out line in reachy-mini-cli-captures.ts is copied verbatim from a session actually run on this rig (or ported from a committed public reachy-mini-cli artifact, so labeled); omissions appear only as ellipsis lines; no pane exists for a run that never happened
- Own replay component ReachyTerminal.astro, deliberately unshared like its three siblings, following DevagueTerminal's working :global() animation pattern — NOT LobesTerminal's, whose typing animation is dead CSS (Astro scoped styles vs set:html)
  - honesty: the typing/reveal animation demonstrably plays in the built page (the set:html transcript is styled via :global() like DevagueTerminal — not scoped-and-dead like LobesTerminal)
- src/data/site.ts reachy-mini-cli entry (lines 218-220) flips url from <https://github.com/agentculture/reachy-mini-cli> to /agents/reachy-mini-cli/ — that is how the agents index links a page; Header nav (Learn/Framework/Agents/Engage) is untouched
  - honesty: in the built site the agents index card for reachy-mini-cli navigates to /agents/reachy-mini-cli/ and no remaining site surface still deep-links the old GitHub url as its primary link
- A ReachyDiagram.astro diagram component — the natural subject is the single-SDK-owner model (one in-process SDK client + one motion queue; listen/think/sleep/vision/pat mutually exclusive on the sdk transport) which README calls the one model you must understand; every sibling page carries one diagram
  - honesty: the diagram asserts only relationships documented in ../reachy-mini-cli's README/operating guide (single SDK client, single motion queue, which nouns conflict on the sdk transport) — nothing invented for visual effect
- Version bump + CHANGELOG entry ship with the PR — the version-check CI job fails any PR whose pyproject.toml version equals main's, even site-only ones
  - honesty: the version-check CI job passes on the PR (pyproject.toml bumped, CHANGELOG.md entry prepended via the version-bump skill)
- Page arc (bespoke like each sibling): hero + fast facts; what Reachy Mini is (capabilities); the noun map as the page's table section; the single-SDK-owner model with diagram; the senses/presence section (listen, vision, pat, sleep, demo-mode, service); the think loop (LLM cognition + --export JSONL feed); what's-next from the live tracker; closing repo + install CTAs
  - instruction: compose sections in this order in reachy-mini-cli.astro, each reading its copy from the data module: PageHero, fast facts, capabilities, noun map table, single-SDK-owner diagram section, senses/presence, think loop, what's-next themes from the live tracker, closing CTA row (repo, then install)
  - honesty: every section's copy derives from what the repo actually documents (README, docs/operating-reachy.md, docs/export-schema.md, live tracker) — no capability is claimed that the CLI does not ship today
- The page meets the confirmed site design bar: reveal/typing animations in the house style, every animated property opacity/transform, and prefers-reduced-motion honored throughout
  - honesty: prefers-reduced-motion is honored on every animation the page adds, and animated properties stay opacity/transform only — verified in the built page, not assumed from the siblings
- The capture batch negotiates the single-SDK-owner model with the rig's own presence mode: reachy-live.service (hearing + pat, active now) owns the SDK session, so sdk-transport captures stop it first and the batch restores the prior rig state (service status: mode live) when done
  - honesty: after the capture batch, reachy-mini-cli service status reports the same mode (live) and active presence unit as before the batch started

## Honesty conditions

- the shipped page matches the announcement: reachable at /agents/reachy-mini-cli/, presents the noun map and the single-SDK-owner model, and every capture pane replays a real session
- the PR diff shows no changes under org/, tests/, or any teken-audited CLI surface
- no commits land in ../reachy-mini-cli as part of this delivery
- the PR diff contains no changes under .github/workflows/
- the page reads as a presentation: spoken-copy headlines living in the data module, sections usable as talking points — the same test the sibling pages pass
- once merged and deployed, /agents/reachy-mini-cli/ responds on AgentCulture.org and the agents index card navigates to it
- at branch time site.ts still points the reachy-mini-cli entry at GitHub and no /agents/reachy-mini-cli page exists in the repo — verifiable from main's HEAD
- the framing presents embodiment as the family's missing leg without restating or contradicting the sibling pages' content
- every listed signal is mechanically checkable on the PR: CI green, each exported pane imported and rendered exactly once, index navigation verified in the built dist
- grep over reachy-mini-cli-captures.ts finds no credential-shaped strings and no endpoints beyond those in the repos' public docs
- git show --stat on the merged PR lists no uv.lock, .wrangler, or .claude/settings.json changes and no artifacts from prior runs

## Success signals

- the PR merges green: astro build passes in CI, version-check passes, every exported capture pane renders exactly once on the page, the agents index card navigates to /agents/reachy-mini-cli/, and the Cloudflare Pages deploy publishes it on merge

## Scope / boundaries

- Site-only change: the org CLI package (org/), tests/, and the teken rubric surface are untouched — the rubric gates the CLI, not the site
- ../reachy-mini-cli is read-only source material for this work — the page presents the CLI from its README, docs/operating-reachy.md, and live tracker; no changes land in that repo
- No CI workflow changes: tests.yml already builds site-astro on PRs and deploy.yml (Cloudflare Pages) is path-filtered to site-astro/** on main — the new page rides existing lanes
- Captures carry no tokens, keys, or private URLs; local endpoints (localhost:8000/8001, thor:8000) appear only as reachy-mini-cli's and lobes' own public docs already print them — the colleague-captures.ts precedent
- Pre-existing dirty working-tree state (the uv.lock delta, .wrangler/, .claude/settings.json, the stray devague-page-six-leg-update delivery record) stays out of this PR — the branch commits only this run's artifacts

## Non-goals

- Sibling pages and their components stay untouched; the known LobesTerminal inert-animation bug remains a separate follow-up PR, not smuggled into this one

## Assumptions

- Real live-robot captures are feasible on this rig: reachy-mini-cli 0.28.2 installed, daemon HTTP healthy at localhost:8000, device state running, live: True — so live nouns (device/move/say/listen) are capturable, not only the no-robot introspection nouns (whoami, quickstart, learn, explain, doctor)
- The page lives at /agents/reachy-mini-cli/ — the user named the page reachy-mini-cli, matching the repo token and the existing site.ts entry name (lobes shortened lobes-cli to lobes; this page keeps the full token per the ask)
- A live think capture is feasible: both lobes gateways answered health probes (localhost:8001 model-gear-gateway 0.45.0; thor:8000 0.46.0.dev273)

## Scope exploration

- `s1` — `site-astro/src/pages/agents/colleague.astro (read end-to-end)`: the newest sibling page states the house convention in its header: all copy lives in the data module, the page composes; sections = fast facts, concept sections with cards + capture panes, dogfood, what's-next from the live tracker, two-CTA closing
  - seeds: `c2`
- `s2` — `site-astro/src/data/colleague-captures.ts`: the capture contract: CapturePane/CaptureLine interfaces, verbatim lines only, ellipsis lines mark curated cuts, two provenance classes (ported · repo path / fresh run · run id + date), and no invented transcript ever stands in for a run that hasn't happened
  - seeds: `c3`
- `s3` — `site-astro/src/components/{Colleague,Devague,Lobes}Terminal.astro (diffed modulo naming)`: three deliberate near-copies, one per page, sharing no state or selectors — each page owns its terminal; LobesTerminal's typing animation is known-dead CSS (Astro scoping vs set:html), DevagueTerminal's :global() pattern is the working one
  - seeds: `c4`, `c12`
- `s4` — `site-astro/src/data/site.ts:218-220 + components/Header.astro`: reachy-mini-cli already has an agents-index entry pointing at GitHub; sibling pages are linked by flipping that url to the local page path; primary nav lists only section indexes, never individual agents
  - seeds: `c5`, `c13`
- `s5` — `../reachy-mini-cli/README.md + noun map`: the CLI's core teaching is the noun map (14 nouns, per-noun transport) plus the single-SDK-owner model the README calls the one model you must understand before running two behaviors — the natural diagram subject; docs/operating-reachy.md carries the conflict matrix
  - seeds: `c6`, `c10`
- `s6` — `local rig probe: reachy-mini-cli whoami / daemon status / device status (read-only)`: installed CLI is 0.28.2 (repo HEAD is 0.31.0); daemon http healthy at localhost:8000, live: True, robot state running, camera arducam — a live robot is attached to this rig
  - seeds: `c7`
- `s7` — `org/CLAUDE.md conventions + .github/workflows/tests.yml`: version-check CI fails any PR without a pyproject.toml bump, site job builds site-astro on PRs, teken rubric gates only the CLI package
  - seeds: `c8`, `c9`
- `s8` — `.github/workflows/deploy.yml`: Cloudflare Pages deploy is path-filtered to site-astro/** on main pushes — a merged page deploys with no workflow edits
  - seeds: `c11`
- `s9` — `gh issue list on agentculture/reachy-mini-cli (20 open)`: a live open tracker exists for the what's-next section: service/daemon lifecycle (#61 #62 #21), senses (#28 #32 #22), live conversation (#55), supervisor redesign (#45), mesh awareness (#14)
  - seeds: `c10`
- `s10` — `challenge pass / adjacent-systems lens: systemd --user units + reachy-mini-cli service status`: reachy-live.service actively owns the robot's SDK session — sdk captures would conflict mid-batch; seeded the stop-and-restore requirement
  - seeds: `c21`
- `s11` — `challenge pass / security lens: colleague-captures.ts precedent + rig endpoints`: no-secrets boundary made explicit for the new captures module; local endpoints only as public docs print them
  - seeds: `c22`
- `s12` — `challenge pass / operations lens: git status of the org checkout`: pre-existing dirty state (uv.lock delta, .wrangler/, .claude/settings.json, a prior run's uncommitted delivery record) must not be swept into this PR
  - seeds: `c23`
- `s13` — `challenge pass / failure-mode lens: lobes gateway health + docs/verification/`: both gateways healthy; committed think-body-expression.md verified as the ported fallback if live think capture fails
  - seeds: `c24`, `c25`
- `s14` — `challenge pass / hidden-dependency lens: Header.astro /learn/ nav + git log`: the Learn nav link is deliberate (commit 1e2816f, learn-cli directory entry, merge at cutover) — not a dead link this page must fix; clean pass
- `s15` — `challenge pass / version-alignment probe: PyPI + repo pyproject`: PyPI latest release is 0.31.0, equal to repo HEAD — q1's upgrade decision lands exactly on repo-documented behavior; clean pass
- `s16` — `challenge pass / build probe: npm run build at main tip (site-astro)`: the site builds green today (7 pages, 297ms) — wave failures won't be inherited from a broken base; clean pass

## Decisions

- If the live think capture fails on rig config, the think section renders the committed public artifact ../reachy-mini-cli/docs/verification/think-body-expression.md as a ported pane instead — an invented transcript is never the fallback
