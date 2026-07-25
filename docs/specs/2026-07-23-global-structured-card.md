# global-structured-card

> The simple informational cards across AgentCulture's four agent profiles use
> one shared editorial grammar taken from the retained Devague mock:
> metadata first, a serif title, readable body copy, and an optional compact
> footer.

## Audience

- readers scanning agent capabilities, stages, roles, commands, and operating
  concepts
- maintainers who need one source of truth for the repeated profile-card
  hierarchy and responsive grid

## Before → After

- Before: 77 rendered informational cards across 13 families repeat similar
  page-local CSS. Most use an accent monospace title; metadata appears in
  different positions; grid widths and breakpoints vary by page.
- After: those 77 cards render through `StructuredCard`, with the retained
  mock's hierarchy and one 3 → 2 → 1 responsive grid.

## Why it matters

- the mock's metadata → title → body order is easier to scan than making every
  title look like a command
- serif titles reconnect cards to the site's editorial hierarchy while
  monospace remains reserved for commands, metadata, and compact footers
- one component prevents four profile pages from drifting into subtly
  different versions of the same pattern

## Requirements

- add `site-astro/src/components/StructuredCard.astro`
- render a list item with:
  - optional uppercase monospace metadata
  - an `h3` serif title
  - one substantial body paragraph
  - optional compact monospace footer
- preserve code semantics for command titles while styling them as titles
- omit the mock's copy icon and clipboard interaction; command titles remain
  selectable text rather than controls
- use existing AgentCulture tokens and the global `.card` surface
- use a shared grid capped at the retained 52rem content width:
  three columns above 68rem, two columns through tablet, one below 42.5rem
- retain reveal sequencing, source copy, list semantics, and featured-card
  spans

## Migration scope

- Devague:
  pipeline stages 7, method moves 7, operator skills 7
- Colleague:
  paradigm 4, tiers 3, work loop 6, minds 3, surfaces 9
- Reachy Mini CLI:
  capabilities 9, owner model 5, senses 6, agent-first surfaces 5
- Lobes:
  roles 6

Total: 13 authored component calls rendering 77 cards.

## Honesty conditions

- “new mock style” means the retained hierarchy, type roles, spacing, and
  responsive composition—not the mock's rejected sub-16px substantial body
  copy
- body copy remains 16px with 1.55 leading under the approved global system
- the mock's copy icons are deliberately not adopted
- no card becomes clickable merely because it adopts the visual pattern
- content, order, routes, headings, and destinations do not change

## Exclusions

- agent-directory and library link cards
- article points, evidence/source cards, and definitions
- presentation slides and robot cards
- Devague human-gate command rows
- measured-stat cards, issue/theme cards, tables, diagrams, and terminals
- closing bands, CTAs, navigation, footer, breadcrumbs, and Learn

## Success signals

- all 12 routes build
- a dedicated contract pins 13 authored calls and 77 rendered cards
- every migrated grid renders 3 → 2 → 1 without horizontal overflow
- no structured card adds a button, clipboard handler, or client-side script
- both themes retain readable surfaces, borders, text, and focus states

## Assumptions

- the visual reference is
  `docs/ux-review/mocks/devague/2026-07-21-review-style`
- the adopted global typography and rail decisions take precedence over stale
  late mock overrides and generic design-system recommendations
