# Build Plan — global-section-opener

slug: `global-section-opener` · status: `implemented locally; awaiting review`

> Extract the retained Devague section-opener grammar into the global design
> system, then migrate the four long agent profiles and the long-form article
> without changing their page-owned compositions.

## Tasks

### t1 — Add the shared `SectionIntro` component

- instruction: create a semantic component for eyebrow, stable `h2`, optional
  post-title content, and introductory paragraphs; use only existing global
  type, colour, measure, and reveal roles
- acceptance:
  - heading measure is `--ac-measure-heading`
  - introduction measure is `--ac-measure-prose`
  - agent pages can reveal the introduction as a group
  - the article can reveal its paragraphs individually and render definitions
    between heading and prose

### t2 — Migrate agent-profile openers

- instruction: replace the repeated opener markup in Devague, Colleague,
  Lobes, and Reachy Mini CLI; change each migrated parent section from an
  ad-hoc label to `aria-labelledby`
- acceptance:
  - source counts are 6, 9, 5, and 7 respectively
  - all existing copy, IDs, reveal timing, and downstream content remain
  - fast-facts sections remain unchanged

### t3 — Migrate the article beat opener

- instruction: use one component call inside the existing eight-beat loop;
  preserve optional definitions, first-paragraph lede styling, paragraph reveal
  timing, evidence notes, and beat grid
- acceptance:
  - all eight rendered headings retain `${beat.id}-title`
  - definitions still precede prose when present
  - source notes and article-only layouts remain unchanged

### t4 — Pin the contract and document delivery

- instruction: extend the design-system check to verify component semantics,
  token use, migration counts, absence of copied opener markup, and the
  presentation exclusion; record actual delivery and evidence
- acceptance:
  - the check fails if a migrated page reintroduces a copied opener
  - the check fails if the component stops using either measure token
  - the presentation retains its six local slide eyebrows

### t5 — Validate behavior and appearance

- instruction: build the site, run all navigation/wayfinding/design-system/
  presentation checks, and compare representative agent and article pages at
  375, 768, 1024, and 1440 pixels
- acceptance:
  - build and all relevant checks pass
  - no horizontal overflow, gutter widening, heading-order regression, or
    hidden reduced-motion content
  - no commit, push, pull request, or deployment is made

## Risks

- scoped component styles could fail to reach the component's own dynamic
  markup; verify the built CSS and computed measures
- article definitions could move relative to prose during extraction; pin and
  inspect their order
- generic design-system recommendations could overwrite the retained
  AgentCulture identity; existing tokens remain authoritative
