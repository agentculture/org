# Build Plan — global-structured-card

slug: `global-structured-card` · status: `delivered in draft PR #30`

> Migrate metadata-led agent-profile information cards to one semantic
> component while preserving different card families.

## Tasks

### t1 — Add the shared card and grid

- create `StructuredCard.astro` with optional metadata/footer, code-title
  semantics, featured span, reveal timing, and namespaced grid styles
- acceptance: metadata → title → body → footer order, 16px body copy, 52rem
  three-to-two-to-one grid, and no client-side copy behavior

### t2 — Migrate Devague

- migrate method moves and operator skills
- keep the lead method card featured and command titles semantic
- acceptance: method and operator-skill cards preserve their content and
  semantics; the pipeline remains a separate ruled reference list

### t3 — Migrate Colleague

- migrate paradigm, tiers, work loop, minds, and surfaces
- keep tier/mind context as metadata and command strings as compact footers
- acceptance: every migrated field retains its meaning and reading order

### t4 — Migrate Reachy Mini CLI and Lobes

- migrate four Reachy families and the Lobes role family
- preserve source copy, repository/model strings, and page order
- acceptance: source copy, repository/model strings, and page order remain

### t5 — Document and validate inclusion and exclusion

- record the adopted families, semantic order, responsive behavior, command
  treatment, absent copy controls, and intentional exclusions
- build the site and review representative card families at narrow and wide
  viewports
- acceptance: the production build passes and excluded families remain local

## Risks

- long command titles can overflow narrow columns; allow semantic code to wrap
- equal-height desktop rows can create dead space on mobile; use natural rows at
  the one-column layout
- later pipeline changes can invalidate recorded counts; treat counts as a
  delivery snapshot and review current source for present inventory
