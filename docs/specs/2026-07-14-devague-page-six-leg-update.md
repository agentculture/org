# devague page: six-leg update

> agentculture.org/agents/devague now presents devague as the complete six-leg method — scope, think, spec-to-plan, assign-to-workforce, deviate, summarize-delivery — as a pure product presentation: the pipeline and method arc carry the execution seam (scope entries on the frame, the deviation ledger, the delivery summary), the operator-skills section shows all six legs, real captured sessions demonstrate the new legs, launch-day meta (public-since dates, dated version chips) is gone, and what's-next is re-verified against the live tracker — good enough that Ori presents the product by just showing the page
> instruction: Verify by building the site (astro build), scrolling the page once, and checking: six legs named, execution seam in the arc, six skill cards, real capture panes for the new legs, no dates/public-since in presentation copy.

## Audience

- A live-presentation audience first: Ori presents devague by showing this page. Secondarily, humans and agents browsing agentculture.org/agents/ who should leave knowing what the tool delivers.

## Before → After

- Before: The live page presents a three-skill pipeline (/think, /spec-to-plan, /assign-to-workforce) per site-astro/src/data/devague.ts; its facts carry 'public since 2026-07-14' and 'version 0.17.2 — 2026-07-14' chips; the hero says 'Until today, this site never mentioned it'; and whatsNext links issues #62, #68, #69, #70 — all closed by devague 0.18.0.
- After: The page presents the full six-leg method: the pipeline section and DevagueFlow arc carry the execution seam, the operator-skills section shows six cards (/scope, /think, /spec-to-plan, /assign-to-workforce, /deviate, /summarize-delivery), the method section includes the scope move, real captures demonstrate the new legs, and whatsNext reflects only issues open on the live tracker at authoring time.

## Why it matters

- The page is the product's face for presentations: a three-leg story undersells a six-leg product, and a page whose subject is honesty gates cannot cite closed issues as open direction — the facts must hold to the page's own standard.

## Requirements

- Launch-day meta is dropped from the presentation: the 'public since' fact chip, the dated 'version 0.17.2 — 2026-07-14' chip, and the hero paragraph about the repo going public — the copy carries only what devague delivers, its demos, and its concepts (per Ori's instruction this session).
  - honesty: A grep of the shipped page source finds no 'public since' chip, no dated version chip, and no went-public hero paragraph; the install / repo / PyPI / license chips remain.
- Pipeline, diagram, and skills copy reflect the devague 0.18 surface verified against the installed CLI and CHANGELOG: the scope verb (pre-frame scoping recorded on the frame), the deviate verb (append-only deviation ledger under .devague/deliveries/), the summary verb (render-only eight-section skeleton, --pr variant), and plan deliverables/amend.
  - honesty: Every verb and flag the copy names exists on the installed devague 0.18.0 --help surface: scope, deviate (--list / --confirm / --reject / --classification), summary (--pr), plan deliverables, plan amend.
- Every new capture pane replayed on the page comes from a real devague run — this session's own frame/plan/deviate/summary run is the primary material — stored verbatim in devague-captures.ts, trimmed only for length, cuts marked with first-class ellipsis lines, no invented output.
  - honesty: Each new pane's lines are copy-pasted verbatim from this session's own transcript (or a labeled read-only re-run against real state); every omission is an explicit ellipsis line; each pane header carries its devague version and capture date.
- whatsNext is re-distilled from the live tracker at authoring time (gh issue list on agentculture/devague, 2026-07-15): the resolution-moves cluster (#60, #57, #55, #52, #49, #48, #45) and the consolidated board (#36) remain open; #62, #68, #69, #70 are closed and must not be linked as direction.
  - honesty: Every issue linked on the page is open on agentculture/devague at the moment the copy lands, re-checked with gh issue list the same day.
- The three new origin skills (scope, deviate, summarize-delivery) copied from agentculture/devague into org/.claude/skills/ this session are committed with provenance recorded in docs/skill-sources.md, matching how think/spec-to-plan/assign-to-workforce already live here.
  - honesty: org/.claude/skills/{scope,deviate,summarize-delivery}/SKILL.md are byte-identical to ../devague's copies, each carries type: command, and docs/skill-sources.md gains a row for each naming devague as origin (direct vendor, ask-colleague precedent).
- The devague directory card in site-astro/src/data/site.ts gains the delivery side: its role line currently stops at 'working backwards, then forwards' and should say the method now closes the loop through execution.
  - honesty: The site.ts devague role line names the delivery/execution side of the method and the card still routes to /agents/devague/.

## Honesty conditions

- The built /agents/devague page, scrolled once top to bottom, presents the six-leg method in order as a product: concepts, demos, and real captures — with no launch-day meta anywhere in the copy.
- The page reads as a presentation: each section leads with a spoken headline, one idea per viewport — Ori can talk over it top to bottom without a separate deck.
- The before-state is checkable against git: the cited chips, hero paragraph, three-card skills section, and closed-issue links all exist in the committed devague.ts on main.
- One scroll pass of the built page encounters all six legs by name, the execution seam in the arc diagram, six operator-skill cards, and at least one real capture for each new leg (scope, deviate, summary).
- The built page's client JS performs no network calls and never invokes devague; every terminal pane renders from build-time strings imported from devague-captures.ts.
- The PR diff touches no global stylesheet and adds no new global tokens; every animated property added is transform or opacity, gated behind prefers-reduced-motion: no-preference and html.js.
- Lighthouse against the built page reports performance and accessibility >= 95 in both themes' rendering, and the reduced-motion render shows the complete composed content with nothing hidden.
- Every factual statement in the shipped copy traces to a public artifact — the repo, PyPI, the installed CLI's own output, or the live tracker — nothing invented, matching the page's existing provenance bar.

## Success signals

- Same measurable floor as the page's original frame: Lighthouse performance and accessibility >= 95 on the built page, WCAG AA in light and dark, compositor-only animation honoring prefers-reduced-motion, zero client-side network calls, astro build clean — plus Ori's presentable-as-is sign-off at the final PR gate.

## Scope / boundaries

- The page stays replay-only: it never runs devague in the browser, makes zero client-side network calls, and DevagueTerminal's pre-scheduled replay technique is reused unchanged (per its authored contract in DevagueTerminal.astro).
- No new global styles: Layout/PageHero/Header/Footer and existing tokens only; motion stays compositor-only (transform/opacity) with the full prefers-reduced-motion still-legible fallback, matching DevagueFlow.astro's authored contract.

## Non-goals

- The page does not retell release history: no 'shipped in 0.17.0/0.18.0' beats, no changelog narration, no dates in the presentation copy — versions and capture dates survive only as provenance stamps on the capture panes themselves.

## Assumptions

- DevagueTerminal derives its leg tag from the pane id prefix (frame-/plan-/else check) — new pane families (scope-, deviate-, summary-) need either new id prefixes with matching leg tags or deliberate reuse of an existing bucket; the replay technique itself does not change.

## Scope exploration

- `s1` — `site-astro/src/data/devague.ts`: carries all page copy: fact chips incl. 'public since 2026-07-14' and 'version 0.17.2 — 2026-07-14', the went-public hero paragraph, a 3-stage pipeline, 3 skill cards, and whatsNext linking #62/#68/#69/#70 — all closed by 0.18.0
  - seeds: `c3`, `c5`
- `s2` — `devague 0.18.0 (devague --help; ../devague/CHANGELOG.md 0.18.0)`: ships the scope, deviate, and summary verbs plus plan deliverables/amend; docs name the six-leg flow scope→think→spec-to-plan→assign-to-workforce→deviate→summarize-delivery
  - seeds: `c6`
- `s3` — `site-astro/src/data/devague-captures.ts`: verbatim-replay contract: every line captured from a real run, cuts marked with first-class ellipsis lines, versions and dates carried as pane provenance — new panes must meet the same bar
  - seeds: `c7`, `c10`
- `s4` — `site-astro/src/components/DevagueTerminal.astro`: replays pre-scheduled panes with zero network calls; derives its leg tag from the pane id prefix (frame-/plan-/else check), so new pane families need new prefixes+tags or deliberate bucket reuse
  - seeds: `c8`, `c14`
- `s5` — `site-astro/src/components/DevagueFlow.astro`: the six-stage arc (idea→frame→converge→spec→waves→build) is compositor-only, plays once, fully legible as a reduced-motion still, and accepts per-stage label overrides — extending the arc with the execution seam must keep that contract
  - seeds: `c9`
- `s6` — `gh issue list agentculture/devague (live tracker, 2026-07-15)`: open: #60 #57 #55 #52 #49 #48 #47 #45 #44 #42 #41 #40 #37 #36 — the resolution-moves cluster and the board issue remain; #62 #68 #69 #70 are closed
  - seeds: `c15`
- `s7` — `docs/skill-sources.md (org)`: think/spec-to-plan/assign-to-workforce are tracked as devague-origin (re-broadcast via guildmaster); ask-colleague sets the precedent for direct vendoring with a tracked note — the three new skills copied from ../devague this session follow that pattern
  - seeds: `c16`
- `s8` — `site-astro/src/data/site.ts (directory card)`: devague's role line stops at 'working backwards, then forwards' — predates the delivery side of the method
  - seeds: `c17`

## Decisions

- The dogfood beat continues and deepens: this very update is scoped, specced, planned, fanned out, and summarized with the new legs it presents — the captures exhibit their own origin, including the frame's scope entries.
- The DevagueFlow arc presents the execution seam as a continuation of the existing six stages — the build beat hands into a deviate (ledger) beat and closes on the summary artifact — designed within the component's existing contract: compositor-only, plays once, legible as a reduced-motion still, no horizontal overflow on mobile.
- Ori loves the page's animations: every existing animated beat is preserved, and the new steps get their own animated beats — the DevagueFlow arc's execution-seam stages animate in the same compositor-only language, and every new capture pane replays with the same typing/settle motion.
