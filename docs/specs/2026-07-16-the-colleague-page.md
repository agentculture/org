# the colleague page

> agentculture.org/agents/colleague is live — a presentation-grade page introducing colleague to someone who has never seen it: the paradigm behind it (a second, independent mind on a different backend, run as a peer), its three interaction surfaces (interactive TUI, agent-interactive TAUI, bot-interactive JSON), batch work via colleague work, subagent orchestration, roles, models-for-purposes (cortex and senses), and eidetic memory — presented with real captured sessions, good enough that Ori can present colleague by just showing the page
> instruction: Build site-astro (npm ci && npm run build), serve dist/, and walk /agents/colleague/ section by section against the announcement; verify the design bar (Lighthouse >=95 perf+a11y, WCAG AA both themes, reduced-motion, zero client network calls); then Ori previews and signs off presentable-as-is before merge

## Audience

- A live-presentation audience first: Ori presents colleague to someone who has never seen it by just showing this page while talking over it. Secondarily, humans and agents browsing agentculture.org/agents/ cold.
  - instruction: Read the final page top to bottom as a spoken script: every headline carries the point Ori would say aloud; adjust any headline that reads as web copy rather than speech

## Before → After

- After: agentculture.org/agents/colleague presents colleague end to end: the paradigm (one runtime, many minds; a different mind, not a stronger one), the three render tiers (TUI cockpit, TAUI, bot JSON), batch work via colleague work with flight piloting, subagent orchestration with typed roles, models-for-purposes (cortex and senses via lobes), eidetic memory with the measured warm-vs-cold win, and real captured sessions throughout; the /agents/ index card for colleague flips from the GitHub link to /agents/colleague/
  - instruction: Walk the built page against the announcement: paradigm, TUI, TAUI, bot JSON, work+flight, subagents, roles, cortex/senses, eidetic memory each present with a real capture or verified fact; flip the site.ts card and verify the route serves

## Why it matters

- colleague is the org's standing second mind — the diversity thesis (a different mind catches what the author's mind glides past) made runnable — and the only presentation of it today is scattered across a README and sixty feature docs; a single presentable page is how the paradigm gets shown, not explained from memory
  - instruction: Write the hero/intro around the second-mind thesis using the repo's own diversity line; verify the phrasing traces to README:41-45 or the ask-colleague skill text

## Requirements

- The page follows the sibling pattern read from agents/devague.astro and agents/lobes.astro: a new site-astro/src/pages/agents/colleague.astro page, a content model src/data/colleague.ts, a verbatim-captures module src/data/colleague-captures.ts, and a ColleagueTerminal.astro replay component — sections composed from PageHero, fast-fact chips, card grids, and terminal replay grids
  - instruction: Create site-astro/src/pages/agents/colleague.astro composing Layout + PageHero + ColleagueTerminal with data from colleague.ts and colleague-captures.ts; verify npm run build emits dist/agents/colleague/index.html and git diff touches no shared component
  - honesty: the built page renders entirely from its own colleague.ts + colleague-captures.ts + ColleagueTerminal.astro; no shared component (Layout, PageHero, Header, Footer) changes
- src/data/site.ts already carries a colleague entry in agents.entries (Mesh and platform group) whose url points at github.com/agentculture/colleague; the change flips that url to /agents/colleague/ the same way lobes-cli points at /agents/lobes/ and devague at /agents/devague/
  - instruction: Flip the colleague entry url in site-astro/src/data/site.ts from the GitHub URL to /agents/colleague/; verify the built agents index card links there and the page itself still links the repo
  - honesty: after the flip, the built site serves /agents/colleague/ and the agents index card links there; the GitHub link survives on the page itself (fact chip + closing CTA)
- The page opens with the paradigm, verbatim from the repo's own words: one runtime, many minds — a swappable coder-agent harness that turns different model backends into repo workers behind one shared task runtime; the harness around the model, not the model; a different mind, not a stronger one (diversity is the value); the colleague at the next desk, a peer not a tool; a headless task runtime, explicitly not a chat assistant or IDE plugin; local vLLM Qwen as the reference backend
  - instruction: Write the paradigm section from README.md:3-14 (one runtime many minds; harness around the model), the diversity thesis (README:41-45), peer-not-tool (ask-colleague SKILL), headless-not-chat (README:55-58), Claude-designs-Colleague-fieldworks (CLAUDE.md:328); verify each line against the repo at authoring
  - honesty: every paradigm line on the page traces to colleague's own words in README.md/CLAUDE.md/docs — quoted or tightly paraphrased with the source verified at authoring; no invented manifesto lines
- A section presents the three render tiers of one CockpitState, chosen automatically: the human ANSI cockpit TUI (bare colleague / colleague session / colleague tui live), the agent tier TAUI — Textual Agentic UI, a serialised selector-addressed JSON mirror plus a Markdown render an agent can drive without a screen reader or an LLM call (colleague tui state / render) — and the bot tier, --json on every verb with one TaskResult on stdout, .colleague/<id>.json artifacts, a WorkStep JSONL stream, and colleague mcp serve
  - instruction: Write the three-tiers section — one CockpitState, three renders: ANSI cockpit (colleague / colleague session / tui live), TAUI expanded as Textual Agentic UI with a real tui state JSON excerpt, bot JSON (--json TaskResult, artifacts, WorkStep JSONL, mcp serve); re-verify every command against colleague 1.48.x --help
  - honesty: TAUI is expanded as Textual Agentic UI exactly as tui.md:24 does, and every launch command printed on the page (colleague, colleague session, colleague tui live/state/render, --json) is re-verified against colleague 1.48.x --help output at authoring time
- A section presents batch work, colleague work: the typed Task -> TaskResult contract (same shape for every engine), throwaway-worktree write isolation on colleague/<id> branches with dirty-tree refusal, the bounded tool-loop (seven base tools plus curated optional ones, guaranteed termination), default-ON advisory pre-finish gates, handoff to branch/commit/PR, and piloting a live run via flight status/guide/stop plus --background, --until-done, --continue
  - instruction: Write the work section from work-and-loop.md, write-isolation.md, flight.md, indefinite-run.md: Task->TaskResult contract, colleague/<id> worktree isolation, bounded loop (seven base tools, default max_steps 25), advisory pre-finish gates, handoff, flight status/guide/stop, --background/--until-done/--continue; include a real work or flight capture pane
  - honesty: every work-lifecycle fact rendered (worktree isolation on colleague/<id>, dirty-tree refusal, seven base tools, max_steps default, flight verbs, --background/--until-done/--continue) is re-verified against docs/features/* or CLI --help at authoring time
- A section presents subagent orchestration and the typed roles workforce: mid-run subagent/subagents loop tools, each child in its own worktree on a sub/<id> branch running the same bounded loop, a merge-subagent that surfaces (never force-merges) conflicts, structural caps (depth 2 / fanout 4 plain; depth 4 / total 24 with roles), and the five built-in roles — explorer, planner, reviewer, validator, writer — where a read-only role provably cannot mutate the tree because the ToolExecutor refuses withheld tools even if the model hallucinates the call
  - instruction: Write the subagents+roles section from subagents.md and subagent-roles.md; render the five-role table from colleague roles list --json captured at authoring; state the caps (2/4 plain, 4/24 roles) and the structural read-only refusal
  - honesty: the roles table rendered on the page matches colleague roles list --json output at authoring time, including which roles are read-only and the structural-refusal claim stated no more strongly than subagent-roles.md states it
- A section presents models-for-purposes: minds resolved by ROLE from the lobes gateway, not by hardcoded model id — cortex, the fast wide-window tool-calling mind that drives the loop (reference rig: Qwen3.6-27B, 128K), and senses, the tools-off multimodal front door that intakes the operator's request and speaks the result back but structurally cannot act (every senses call is tools=[]; reference rig: gemma-4-12B, 32K) — with lobes armed, zero model ids in colleague's own config
  - instruction: Write the cortex-senses section from cortex-senses.md: role-resolved minds via lobes, cortex tool-calling vs senses tools=[] front door, the probed reference rig (Qwen3.6-27B 128K / gemma-4-12B 32K) labeled as reference not requirement, lobes-armed zero-model-id config
  - honesty: the senses-cannot-act claim is stated exactly as the repo grounds it (every senses call is tools=[]; senses.py imports neither ToolExecutor nor subprocess) and the rig models are labeled as the probed reference rig, not as requirements
- A section presents eidetic memory: every work item wrapped in recall-before and remember-after against the repo's eidetic store, a model-callable memory tool mid-run (read-only roles get recall only), triple-gated default-ON, one store shared between colleague and Claude so the two minds read each other's lessons, incomplete runs recorded too — and the measured warm-vs-cold numbers: 5x fewer steps, 5.5x fewer tokens, 3.3x faster on the same task
  - instruction: Write the memory section from memory.md: recall-before/remember-after, the mid-run memory tool, the triple gate, the shared store both minds read, incomplete-runs-recorded; quote the warm-vs-cold pair with run ids 503b0a36c33a / c5774404bc3d and their numbers
  - honesty: the 5x/5.5x/3.3x warm-vs-cold numbers are presented with their provenance (one measured task pair in memory.md, run ids named) — never as a general benchmark claim
- Fact chips verified against live sources: install uv tool install colleague (PyPI serves colleague 1.48.0, homepage agentculture/colleague), repo agentculture/colleague, license Apache-2.0, Python >=3.12, entry points colleague and clg, one base dependency (agentfront)
  - instruction: Render fact chips: install uv tool install colleague, repo agentculture/colleague, PyPI colleague, license Apache-2.0, Python >=3.12, entry points colleague + clg; re-verify each against PyPI JSON and pyproject.toml on authoring day
  - honesty: each fact chip is re-verified against its live source on authoring day: PyPI JSON for install+version, pyproject.toml for license/python/entry-points/deps
- A compact 'more surfaces' section covers, per Ori's decision: the ask-colleague verbs + the ROI loop (always-on WorkStats + 1-5 feedback); the safety/trust model stated honestly (approval gate as policy gate not sandbox, write previews by default, dirty-tree refusal); mesh/culture residency + the organs map; voice (stt/tts), deepthink, and media input (audio + vision); worktree isolation presented as the cross-cutting story spanning work items, subagent sub/<id> branches, and the ask-colleague verbs; and agentfront as the shared foundation that fits humans, agents, and bots (colleague's one base dep, the TAUI cockpit imported from agentfront.taui)
  - instruction: Write the compact more-surfaces section covering ask-colleague+ROI, safety (policy gate not sandbox, preview-by-default write, dirty-tree refusal), mesh residency + organs map, voice/deepthink/media, cross-cutting worktree isolation, and agentfront as the humans/agents/bots foundation; re-verify every fact against its doc
  - honesty: every fact in the more-surfaces section is re-verified against its colleague doc or CLI output at authoring time, and the safety copy never claims sandboxing — policy gate and worktree isolation are stated with the repo's own honest limits
- The page closes with a what's-next section drawn from colleague's live open tracker (the devague-page pattern): themes distilled from open issues, each linking only issues verified open at authoring time
  - instruction: Run gh issue list on agentculture/colleague on authoring day; distill 2-4 themes; link only issues verified open; render as the devague-page what's-next
  - honesty: every issue linked in what's-next is verified open via gh issue list on authoring day; themes cite only issues that exist
- This build's own ask-colleague runs are a first-class captured story on the page: the explore run reading colleague's repo (with its live flight feed) and the pre-PR review run over this very page's diff, captured verbatim like the devague page replaying its own speccing session
  - instruction: Capture this build's own runs verbatim into colleague-captures.ts: the explore flight feed + result summary, and the pre-PR review run over this page's committed diff; carry run ids, dates, colleague version in pane chrome
  - honesty: the dogfood panes replay this build's real runs verbatim — flight feed lines and TaskResult summaries as produced, cuts marked as ellipsis lines, run ids and dates carried in the pane chrome

## Honesty conditions

- the live page presents every surface the announcement names — paradigm, TUI, TAUI, bot JSON, colleague work, subagents, roles, cortex/senses, eidetic memory — each with at least one real capture or authoring-day-verified fact; nothing announced is missing from the page
- a grep of the built page output finds no fetch/XHR/WebSocket and no external asset host; every pane in colleague-captures.ts names its source artifact or fresh-run date+version
- every class injected via set:html is wrapped in :global() and the replay animation is verified live in the built page in both themes — the LobesTerminal silent no-op is the named failure mode being avoided
- the bar is measured on the built page, not assumed: Lighthouse perf+a11y >=95, axe/contrast AA in both themes, reduced-motion serves completed transcripts, and Ori's sign-off happens on a served preview before merge
- every capture pane carries its provenance in the pane chrome or module header: the colleague-repo artifact path it was ported from, or the capture date + colleague version of the fresh run; cuts are first-class ellipsis lines; no kept line is reworded
- each section headline reads as a line Ori would say aloud while presenting — checked by reading the page top to bottom as a script
- a section-by-section walk of the built page against the announcement finds every named surface present with at least one real capture or verified fact
- the hero states the second-mind thesis in words traceable to the repo's own diversity line, not invented marketing
- every ported pane's cited path resolves in the public colleague repo at authoring time (git ls-files check), and every non-public-sourced pane is labeled fresh-run with run id + date + colleague version
- a pane-by-pane review of the final captures module before merge finds no token, key, or private URL, and every omission is a visible first-class ellipsis line

## Success signals

- Same measurable floor as the sibling pages: Lighthouse performance and accessibility >= 95 on the built page, light and dark themes both pass WCAG AA, animations compositor-only honoring prefers-reduced-motion, zero client-side network calls, plus an explicit presentable-as-is preview sign-off from Ori before merge
  - instruction: After build: npx lighthouse against the served page (perf+a11y >=95), axe + contrast in light and dark, verify prefers-reduced-motion shows completed transcripts, then a served preview for Ori's presentable-as-is sign-off

## Scope / boundaries

- Every terminal on the page REPLAYS a real captured session recorded once while authoring, per the contract documented at the head of devague-captures.ts: verbatim cmd/out lines, cuts marked with first-class ellipsis lines, no reworded kept lines, zero client-side network calls — the page never runs colleague at build or view time
  - instruction: Author colleague-captures.ts only from real material: ported artifact paths from the colleague repo or fresh runs executed once while authoring; carry the source in each pane; grep dist for external requests — zero
- Ported capture panes cite only committed, publicly traceable colleague-repo paths (docs/drive-notes/2026-05-29-website-self-build/ — verified committed via git ls-files: notes.md, success-bdd455519da0.json + .trace.jsonl, render.png); .colleague/ run artifacts are gitignored and NOT public, so material from them is presented as a fresh-run capture (run id + date + colleague version in pane chrome), never cited as a public repo path
- No-secrets bar for every pane: no tokens, keys, or private URLs; a line that would need redaction is cut with a first-class ellipsis line, never reworded (the verbatim rule allows cuts, not edits); prefer panes needing no redaction; localhost:8001 endpoints are fine — already public in colleague's own docs

## Non-goals

- This change does not fix LobesTerminal's inert animation, does not restructure the shared components (Layout, PageHero, Header, Footer), and does not touch the devague or lobes pages beyond the one site.ts url flip
- Deploy and DNS are out of scope: the PR delivers the page in-repo; going live rides the standing credentialed operator deploy lane (cultureflare), and AgentCulture.org DNS stays operator-owned

## Assumptions

- ColleagueTerminal.astro reapplies DevagueTerminal's technique deliberately unshared: transcript rendered to an escaped HTML string injected via set:html, with every injected class wrapped in :global() (Astro never stamps its scoping attribute on set:html markup — bare scoped selectors silently no-op, the exact bug live on /agents/lobes), IntersectionObserver class-toggle playback, completed transcript for no-JS and reduced-motion
- Copy idiom follows devague.ts, not lobes.ts: section eyebrows and headlines live in the content model because the page is a presentation Ori talks over — the headlines are spoken copy
- Real capture material comes from two provenanced sources: existing verbatim artifacts in the colleague repo (the 2026-05-29 website-self-build drive notes with its step trace and TaskResult artifacts, .colleague run artifacts like hi-what-is-this-repo and what-model-are-you-running-on, the embedded transcripts in docs/features/ask-colleague.md) and fresh sessions run once for real while authoring this page — including this very build's own ask-colleague explore/review runs

## Scope exploration

- `s1` — `site-astro/src/pages/agents/devague.astro + lobes.astro`: both sibling pages share one shape — PageHero, fast-fact chips, section cards, terminal replay grids, closing CTA — with per-page data + captures modules; devague.astro additionally moves eyebrows/headlines into the content model because it is a spoken presentation
  - seeds: `c2`, `c7`
- `s2` — `site-astro/src/data/site.ts`: agents.entries already lists colleague (Mesh & platform, role: a harness for Qwen, designed to run by itself — and other agents) with url github.com/agentculture/colleague; lobes-cli and devague entries show the flip-to-internal-url pattern
  - seeds: `c3`
- `s3` — `site-astro/src/data/devague-captures.ts`: the captures contract is explicit in the module header: verbatim lines captured once while authoring, ellipsis lines as first-class curator cuts, versions and capture dates carried per pane, no invention
  - seeds: `c4`
- `s4` — `site-astro/src/components/DevagueTerminal.astro`: documents the set:html scoping trap in-source: injected transcript classes must be wrapped in :global() or the CSS silently no-ops (LobesTerminal carries that live bug); playback is IntersectionObserver + class toggle, gated behind html.js and prefers-reduced-motion
  - seeds: `c5`, `c6`
- `s5` — `colleague README.md + CLAUDE.md + docs/organs.md`: the paradigm is stated in the repo's own words: one runtime, many minds (README:3-6); the harness around the model (README:8-14); a different mind, not a stronger one — diversity is the value (README:41-45, ask-colleague SKILL.md); headless task runtime, not a chat assistant (README:55-58); Claude thinks and designs, Colleague does the field-work (CLAUDE.md:328)
  - seeds: `c9`
- `s6` — `colleague docs/features/tui.md + session.md + tier-visibility.md`: three render tiers of ONE CockpitState chosen automatically: human ANSI cockpit, agent TAUI (= Textual Agentic UI, tui.md:24 — a selector-addressed JSON mirror + Markdown render), bot JSON (--json, TaskResult on stdout, chrome to stderr); the cockpit is imported from agentfront.taui since #249
  - seeds: `c10`
- `s7` — `colleague docs/features/work-and-loop.md + write-isolation.md + flight.md + indefinite-run.md`: colleague work runs a typed Task->TaskResult through a bounded engine-agnostic loop in a throwaway worktree on a colleague/<id> branch; pre-finish gates default-ON advisory; flight status/guide/stop is a file-based control plane with cooperative next-turn latency; --background/--until-done/--continue extend the run shape
  - seeds: `c11`
- `s8` — `colleague docs/features/subagents.md + subagent-roles.md + colleague/roles.py`: subagent/subagents fan out children on sub/<id> branches with a merge-subagent that surfaces conflicts; five built-in roles with curated tool subsets; read-only enforcement is structural — a role-aware ToolExecutor refuses withheld tools even if the model hallucinates the call
  - seeds: `c12`
- `s9` — `colleague docs/features/cortex-senses.md + cortex-senses-architecture.md + lobes.py + senses.py`: minds resolve by role from the lobes gateway (cortex, senses of six advertised roles); senses is structurally act-less (tools=[] on every call, no ToolExecutor/subprocess import); reference rig probed live 2026-07-03: cortex Qwen3.6-27B 128K, senses gemma-4-12B 32K, both vLLM behind localhost:8001
  - seeds: `c13`
- `s10` — `colleague docs/features/memory.md + colleague/memory.py`: memory is a CLI adapter shelling to eidetic with an allow-list of exactly recall/remember; recall-before injects one capped advisory block, remember-after upserts one idempotent lesson per work item including INCOMPLETE runs; triple gate config+store+CLI; measured warm-vs-cold: 10 steps/23,358 tok/46.4s cold vs 2 steps/4,266 tok/14.1s warm
  - seeds: `c14`
- `s11` — `colleague docs/drive-notes/2026-05-29-website-self-build/ + .colleague/*.json + docs/features/ask-colleague.md`: real verbatim capture material already exists: a self-build drive with step trace, artifacts and render.png; hundreds of .colleague run artifacts (e.g. hi-what-is-this-repo, what-model-are-you-running-on naming the cortex/senses pair); embedded explore/write/review/feedback/flight transcripts in ask-colleague.md
  - seeds: `c15`
- `s12` — `pypi.org/pypi/colleague/json + colleague pyproject.toml`: PyPI serves colleague 1.48.0 with homepage github.com/agentculture/colleague, matching the checkout: Apache-2.0, Python >=3.12, console scripts colleague and clg, one base dep agentfront>=0.20.0
  - seeds: `c16`
- `s13` — `challenge pass / adjacent-systems lens: colleague .gitignore + docs/drive-notes`: git check-ignore confirms .colleague/ run artifacts are gitignored (not publicly traceable); the 2026-05-29 self-build drive material IS committed (git ls-files: notes.md, success artifact + trace, render.png) — seeded the ported-provenance boundary
  - seeds: `c23`
- `s14` — `challenge pass / security-privacy lens: candidate capture content`: the verbatim rule vs redaction tension resolves by ellipsis cuts, never rewording; no tokens/keys observed in candidate material; localhost:8001 already public in colleague docs
  - seeds: `c24`
- `s15` — `challenge pass / operations-reversibility lens: deploy lane`: deploy is a credentialed operator step via cultureflare per org CLAUDE.md; the PR is git-revertable; DNS operator-owned — seeded the deploy non-goal
  - seeds: `c25`
- `s16` — `challenge pass / unstated-assumption lens: colleague open tracker`: gh issue list verified a live tracker (15+ open issues) with distillable themes: gates/honesty hardening (330/340/341/342), cognitive roles across nodes (273/316/332), voice + retrieval (277/304), three-tier visibility parity (256), lobes pressure routing (250) — c21/h14 hold as stated
- `s17` — `challenge pass / failure-mode lens: rig availability (colleague lobes show)`: lobes armed + reachable; cortex ready at 262144 ctx; senses NOT ready (gemma not loaded); stt not ready — a ready-state cortex+senses capture needs an operator step; the honest not-ready output is itself a presentable real capture; seeded q4
- `s18` — `challenge pass / second-mind lens: colleague explore run e41355e8e5ac`: colleague's independent read (graded 4/5, zero contradictions with the first-pass map) added copy-enriching specifics: embedder relayed-never-consumed, all-stdlib session cockpit, read-only roles deliberately excluding culture/devague, dynamic writer allowlist synced to the tool surface
  - seeds: `c20`, `c22`
- `s19` — `challenge pass / self-description drift lens: org repo strings + astro.config.mjs`: clean — no org CLI or README string enumerates the agent pages (nothing to go stale); astro.config.mjs is pure static output with no sitemap integration or route registry to update
