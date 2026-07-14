# Build Plan — devague page: six-leg update

slug: `devague-page-six-leg-update` · status: `exported` · from frame: `devague-page-six-leg-update`

> agentculture.org/agents/devague now presents devague as the complete six-leg method — scope, think, spec-to-plan, assign-to-workforce, deviate, summarize-delivery — as a pure product presentation: the pipeline and method arc carry the execution seam (scope entries on the frame, the deviation ledger, the delivery summary), the operator-skills section shows all six legs, real captured sessions demonstrate the new legs, launch-day meta (public-since dates, dated version chips) is gone, and what's-next is re-verified against the live tracker — good enough that Ori presents the product by just showing the page

## Tasks

### t1 — Capture real material for the new legs: extend site-astro/src/data/devague-captures.ts with panes captured verbatim from this session's own run — the scope leg (devague new + scope entries with --seeds), the frame gate with the mid-session animation decision, and the execution seam via labeled read-only reads of real state (devague deviate --list on this plan's ledger, devague summary skeleton)

- covers: c7, h3
- acceptance:
  - Every line in each new pane is verbatim from this session's transcript or a labeled read-only run against real state on devague 0.18.0; every omission is an explicit ellipsis line; pane headers carry devague 0.18.0 and the capture date
  - New panes cover the scope leg, the frame gate, and the execution seam (deviate ledger read + summary skeleton read); the module compiles (astro build type-checks it); no secrets or private URLs

### t2 — Rewrite the content model site-astro/src/data/devague.ts as the six-leg product presentation: hero without the went-public paragraph, facts without 'public since' and dated version chips, pipeline reshaped around the six legs and the execution seam, method section gains the scope move, review loop gains the deviate confirm surface, six operator-skill cards, captures copy updated, whatsNext re-distilled from the live tracker, closing updated

- covers: c2, h9, c3, h10, c5, h1, c6, h2, c12, c15, h5
- acceptance:
  - grep of devague.ts finds no 'public since', no dated version chip, and no went-public hero paragraph; install / repo / PyPI / license chips remain
  - Copy names all six legs and only 0.18.0-verified surfaces: scope; deviate --list/--confirm/--reject/--classification; summary --pr; plan deliverables; plan amend — each checked against devague --help output
  - Skills section carries six cards; whatsNext links only issues verified open via gh issue list on authoring day; every stated fact traces to the repo, PyPI, the CLI's own output, or the tracker
  - Section headlines stay spoken copy (presentation idiom documented in the module header); one idea per section

### t3 — Extend site-astro/src/components/DevagueFlow.astro with the execution seam: after the build beat, a deviate beat (a ledger amendment moment) and a closing summary beat (the accountability artifact), animated in the same compositor-only language and holding the composed arc

- covers: c9, h12
- acceptance:
  - All new animation is transform/opacity only, gated behind prefers-reduced-motion: no-preference and html.js; with reduced motion or no JS the complete composed arc renders as a legible still
  - No global stylesheet changes; the extended arc stacks vertically on narrow screens with no horizontal overflow; existing beats (claims flip, gate refuses then opens) are preserved unchanged

### t4 — Teach site-astro/src/components/DevagueTerminal.astro the new pane families: scope-, deviate-, and summary- id prefixes get their own leg tags and accent colors in the pane chrome, falling back safely for unknown prefixes; the replay technique is untouched

- covers: c8, h11
- acceptance:
  - Panes with scope-/deviate-/summary- id prefixes render a deliberate leg tag; existing frame-/plan-/check panes render exactly as before
  - The component performs zero network calls and never invokes devague; the pre-scheduled replay (set:html, escaped strings, html.js guards) is unchanged

### t5 — Assemble the updated page site-astro/src/pages/agents/devague.astro: wire the reshaped content model, the extended flow arc, the six skill cards, and the new capture panes in spoken-narrative order, keeping the reveal pattern

- depends on: t1, t2, t3, t4
- covers: c1, h8, c4, h4
- acceptance:
  - One scroll pass encounters all six legs by name, the execution seam in the arc, six operator-skill cards, and real capture panes for scope, deviate, and summary
  - astro build passes; the page uses Layout/PageHero/Header/Footer and existing tokens only; every section keeps the data-reveal pattern and one-idea-per-viewport order

### t6 — Close the provenance seam: update the devague directory card role line in site-astro/src/data/site.ts to name the closed execution loop, and add docs/skill-sources.md rows for the three directly-vendored devague origin skills (scope, deviate, summarize-delivery)

- covers: c16, h6, c17, h7
- acceptance:
  - site.ts devague role line names the delivery/execution side and the card still routes to /agents/devague/
  - docs/skill-sources.md gains one row per new skill naming devague as origin (direct vendor, ask-colleague precedent); the vendored SKILL.md files are byte-identical to ../devague's and carry type: command

### t7 — Verification and release pass: build, lint, grep the built page for dropped meta, re-verify every linked issue open via gh, audit performance/accessibility on the built page, and bump the version with a CHANGELOG entry

- depends on: t5, t6
- covers: c11, h13, h14
- acceptance:
  - astro build clean; markdownlint-cli2 and the repo's lint suite pass; grep of the built page HTML finds no 'public since' and no dated version chip
  - gh issue list re-verification on landing day: every issue linked from the page is open; any closed one is removed before merge
  - Lighthouse (or an equivalent audit of the built page) reports performance and accessibility >= 95; the reduced-motion render shows the complete composed content
  - Version bumped via the version-bump skill with a Keep-a-Changelog entry (version-check CI blocks without it)

## Risks

- [unknown_nonblocking] Whether the fan-out produces a real deviation is unknowable in advance; if none occurs, the deviate pane is a labeled read-only ledger read (real state, real output) rather than a recorded deviation (task t1)
- [unknown_nonblocking] Deploy is a credentialed operator step via agentculture/cultureflare — publish timing is operator-owned and outside this plan (task t7)
- [unknown_nonblocking] Lighthouse tooling may be unavailable in this environment; the audit degrades to an equivalent measurable check, stated honestly in the delivery summary (task t7)
