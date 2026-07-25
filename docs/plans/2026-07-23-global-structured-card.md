# Build Plan — global-structured-card

slug: `global-structured-card` · status: `complete locally`

> Extract the retained Devague information-card style and migrate every simple
> agent-profile card family that matches its metadata/title/body/footer
> contract.

## Tasks

### t1 — Build the shared card and grid

- instruction: add `StructuredCard.astro` with optional metadata/footer,
  command-title semantics, and namespaced shared grid styles
- acceptance:
  - metadata → title → body → footer order
  - 16px body copy with approved card leading
  - 3 → 2 → 1 responsive grid capped at 52rem
  - no copy control or client-side card script

### t2 — Migrate Devague

- instruction: migrate stages, method moves, and operator skills; preserve the
  lead method card and command semantics
- acceptance:
  - 3 authored calls render 21 cards
  - method questions become serif card titles
  - skill titles remain semantic code without becoming controls

### t3 — Migrate Colleague

- instruction: migrate paradigm, tiers, work loop, minds, and surfaces
- acceptance:
  - 5 authored calls render 25 cards
  - tier/mind metadata moves above the title
  - commands/verbs remain compact footers

### t4 — Migrate Reachy and Lobes

- instruction: migrate four Reachy families and the Lobes role family
- acceptance:
  - 5 authored calls render 31 cards
  - source copy and repository/model strings remain intact

### t5 — Contract, documentation, and validation

- instruction: add a built/source contract, wire it into CI, update the global
  design-system record, build all routes, run existing checks, and visually
  review representative pages
- acceptance:
  - source/render count is 13 / 77
  - excluded card families remain outside the component
  - build and existing navigation/wayfinding/design/presentation contracts pass
  - no commit, push, PR, deployment, or Learn change

## Risks

- long command titles must wrap without pushing the card grid beyond its rail
- global component CSS can be silently absent from Astro output; pin the built
  selector as well as the source
- equal-height desktop rows can create dead space on mobile; disable equal-row
  sizing in the one-column layout
- moving metadata above titles changes reading order intentionally; verify
  every mapped field still means “context for this title”
