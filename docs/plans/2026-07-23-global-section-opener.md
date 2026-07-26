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
- acceptance: existing copy, section IDs, reveal timing, accessible labels, and
  downstream content remain

### t3 — Migrate the article beats

- use one component call inside the existing eight-beat loop
- preserve optional definitions, the first-paragraph lede, paragraph-level
  reveals, evidence notes, and beat layout
- acceptance: all eight rendered headings keep their stable IDs and definitions
  remain between title and prose

### t4 — Document and validate the migration

- record the adopted surfaces, semantic requirements, article ordering, and
  presentation exclusion
- build the site and review representative agent and article output
- acceptance: the production build passes; semantic order, readable measures,
  reduced-motion behavior, and the presentation exclusion survive review

## Risks

- boolean false attributes can render as literal HTML attributes; use explicit
  template branches for optional reveal markers
- Astro scoped styles can miss component-generated markup; inspect built output,
  not source alone
- article definitions can move during extraction; verify their rendered order
