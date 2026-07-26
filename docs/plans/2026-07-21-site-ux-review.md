# Build Plan — site-ux-review

slug: `site-ux-review` · status: `delivered in draft PR #30`

> Convert the accepted UX-review findings into named shared patterns, migrate
> the current site, and leave a concise record of final decisions.

## Tasks

### t1 — Establish the shared system and containment rules

- add named typography, leading, tracking, rail, measure, diagram-spacing, and
  sticky-header roles to the global stylesheet
- assign every authored container an explicit rail without changing the
  presentation deck's independent content width
- review token use, rail ownership, terminal legibility, diagram spacing, gate
  previews, and the sticky header across representative pages
- acceptance: the production build succeeds for twelve routes and manual review
  confirms the shared roles without flattening page-specific layouts

### t2 — Unify navigation, wayfinding, and destinations

- centralize header and footer navigation data, including grouped Agents and
  Library menus and the external Learn product
- make agent-directory groups stable destinations and use whole-card links with
  explicit destination labels
- apply the shared destination-card and external-link behaviors to matching
  surfaces
- acceptance: focused navigation tests cover route ownership, grouped
  destinations, footer derivation, and safe new-tab behavior; all links pass the
  built-site link check

### t3 — Extract proven agent-page patterns

- add shared section-introduction, structured-card, closing-band, and inline-code
  components
- migrate only the page families that match each semantic pattern
- align terminal legibility and diagram spacing while retaining the four
  agent-specific terminal and diagram implementations
- acceptance: source review confirms repeated markup moved into shared
  components while other card families and the presentation deck remain local

### t4 — Complete the Devague story and pipeline

- model three guided capture sessions and resolve every excerpt from the
  immutable capture source
- add session, story-beat, transcript-modal, and read-only human-gate preview
  treatments
- repair the flow sequence and replace the competing stage-card grid with a
  ruled seven-row reference list
- acceptance: the Astro build resolves every story anchor, transcripts remain
  complete and keyboard accessible, and the pipeline reference remains separate
  from structured cards

### t5 — Reconcile the final branch

- remove experiments that did not survive review, including breadcrumbs and
  local contents navigation
- record adopted, superseded, and deferred directions without retaining
  generated review artifacts
- run Python, Markdown, Astro, focused navigation, presentation, link, and
  repository-doctor validation
- acceptance: the final PR diff contains source, tests, and formal
  spec/plan/delivery records only; no generated review bundle remains

## Risks

- navigation and footer data can drift if a surface stops deriving from the
  typed model; focused tests pin the durable ownership rules
- component extraction can erase page meaning if it is based on appearance
  alone; every shared component keeps explicit exclusions
- Astro scoped styles can disappear from built output; inspect representative
  built pages where styling is behaviorally significant
- dated review measurements can be mistaken for current state; the delivery
  record is the final reconciliation point
