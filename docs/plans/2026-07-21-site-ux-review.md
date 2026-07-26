# Build Plan — site-ux-review

slug: `site-ux-review` · status: `delivered in draft PR #30`

> Convert the accepted UX-review findings into named source contracts, migrate
> the current site, and leave a concise record of final decisions.

## Tasks

### t1 — Establish the shared system and containment rules

- add named typography, leading, tracking, rail, measure, diagram-spacing, and
  sticky-header roles to the global stylesheet
- assign every authored container an explicit rail without changing the
  presentation deck's independent content width
- add a design-system contract that pins tokens, rail ownership, terminal
  legibility, diagram spacing, gate previews, and the sticky header
- acceptance: the production build succeeds for twelve routes and the
  design-system contract passes against source and built output

### t2 — Unify navigation, wayfinding, and destinations

- centralize header and footer navigation data, including grouped Agents and
  Library menus and the external Learn product
- make agent-directory groups stable destinations and use whole-card links with
  explicit destination labels
- apply the shared destination-card and external-link contracts to matching
  surfaces
- acceptance: navigation tests and the built wayfinding contract cover desktop
  and mobile panels, exact current states, grouped footer links, safe new-tab
  behavior, and all twelve routes

### t3 — Extract proven agent-page patterns

- add shared section-introduction, structured-card, closing-band, and inline-code
  components
- migrate only the page families that match each semantic contract
- align terminal legibility and diagram spacing while retaining the four
  agent-specific terminal and diagram implementations
- acceptance: component contracts pin authored/rendered counts and reject copied
  markup or unintended adoption by other card families and the presentation
  deck

### t4 — Complete the Devague story and pipeline

- model three guided capture sessions and resolve every excerpt from the
  immutable capture source
- add session, story-beat, transcript-modal, and read-only human-gate preview
  treatments
- repair the flow sequence and replace the competing stage-card grid with a
  ruled seven-row reference list
- acceptance: story-anchor validation passes, transcripts remain complete and
  keyboard accessible, and structured-card checks treat the pipeline reference
  as a deliberate exclusion

### t5 — Reconcile the final branch

- remove experiments that did not survive review, including breadcrumbs and
  local contents navigation
- record adopted, superseded, and deferred directions without retaining
  generated review artifacts
- run Python, Markdown, Astro, navigation, component, presentation, link, and
  repository-doctor validation
- acceptance: the final PR diff contains source, tests, and formal
  spec/plan/delivery records only; no generated review bundle remains

## Risks

- navigation and footer data can drift if a surface stops deriving from the
  typed model; source and built checks pin both
- component extraction can erase page meaning if it is based on appearance
  alone; every shared component keeps explicit exclusions
- Astro scoped styles can disappear from built output; contracts inspect the
  generated site where styling is behaviorally significant
- dated review measurements can be mistaken for current state; the delivery
  record is the final reconciliation point
