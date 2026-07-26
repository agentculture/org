# Build Plan — global-section-opener

slug: `global-section-opener` · status: `delivered in draft PR #30`

> Extract the repeated long-form opening grammar without changing page-owned
> content or composition.

## Tasks

### t1 — Add the shared component

- create `SectionIntro.astro` with eyebrow, stable `h2`, optional post-title
  content, introduction paragraphs, title-spacing choice, and reveal choice
- use the shared heading and prose measures
- acceptance: source and built output contain the component's semantic markers,
  measures, and reduced-motion-safe reveal behavior

### t2 — Migrate the agent profiles

- replace repeated opening markup in Devague, Colleague, Lobes, and Reachy Mini
  CLI
- label each migrated parent section with its component heading
- acceptance: authored calls are 6, 9, 5, and 7; existing copy, section IDs,
  reveal timing, and downstream content remain

### t3 — Migrate the article beats

- use one component call inside the existing eight-beat loop
- preserve optional definitions, the first-paragraph lede, paragraph-level
  reveals, evidence notes, and beat layout
- acceptance: all eight rendered headings keep their stable IDs and definitions
  remain between title and prose

### t4 — Pin the contract

- add a source/built check for semantics, measures, counts, copied markup,
  article order, and the presentation exclusion
- wire the check into the site-build workflow
- acceptance: `npm run check:section-intros` reports 28 authored calls and 35
  rendered openings

## Risks

- boolean false attributes can render as literal HTML attributes; use explicit
  template branches for optional reveal markers
- Astro scoped styles can miss component-generated markup; inspect built CSS,
  not source alone
- article definitions can move during extraction; pin their position in built
  output
