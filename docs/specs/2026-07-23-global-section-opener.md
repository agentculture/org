# global-section-opener

> AgentCulture's long-form sections share one opener grammar: an eyebrow, a
> stable section heading, and a readable introduction. The retained Devague
> review mock is the visual reference; the current global type and width tokens
> are the implementation source of truth.

## Audience

- readers moving through the four long agent profiles and the long-form article
- maintainers who need to change section typography or reading measure once,
  without editing every page template

## Before → After

- Before: 35 rendered section openers repeat their markup across four agent
  profiles and eight article beats. Their composition is visually similar, but
  semantics, reveal timing, and measures remain page-owned.
- After: those openers render through one `SectionIntro` component while each
  page continues to own its section wrapper and the diagram, terminal, table,
  cards, or evidence notes that follow.

## Why it matters

- the retained Devague mock established a recognisable editorial rhythm:
  eyebrow → constrained title → constrained introduction → page-owned content
- a shared component makes that rhythm part of the global design system rather
  than an agreement maintained through copied markup

## Requirements

- add `site-astro/src/components/SectionIntro.astro`
- render a semantic `header` containing the eyebrow, an `h2` with a required
  stable ID, and the introduction
- use the existing global roles:
  `--ac-type-section-title`, `--ac-measure-heading`,
  `--ac-measure-prose`, `.eyebrow`, `.lede`, and `.muted`
- preserve the current group reveal on agent pages and paragraph reveal on the
  article
- allow the article's optional definitions block to remain between its heading
  and introduction
- migrate 27 agent-profile openers and the one article loop that renders eight
  beats
- label every migrated section with its heading through `aria-labelledby`
- leave breadcrumbs and local “On this page” navigation absent; they remain
  deferred

## Honesty conditions

- extraction does not change the copy, content order, downstream composition,
  route structure, or presentation deck
- the component does not introduce a new font, colour, spacing scale, rail, or
  motion treatment
- “matching the mock” means matching its retained composition and narrow
  reading measures, not restoring the rejected late mock typography override
- the presentation's slide eyebrows remain local because slides are a distinct
  full-viewport pattern

## Success signals

- all 12 owned routes build
- the design-system contract pins the shared component, its token use, the
  expected source migration counts, and the presentation exclusion
- visual checks at 375, 768, 1024, and 1440 pixels show no gutter or wrapping
  regression
- reduced-motion and JavaScript-disabled rendering leave every opener visible

## Scope / boundaries

- in scope:
  `SectionIntro.astro`, the four agent profiles, the
  `mind-nervous-system-body` article, design-system checks, and delivery docs
- out of scope:
  homepage sections, Framework, Engage, index pages, PageHero, ClosingBand,
  the presentation deck, breadcrumbs, local page navigation, and Learn

## Non-goals

- no new routes, redirects, content, or navigation
- no new section-layout abstraction; page-owned content remains page-owned
- no push, pull request, deployment, or Learn repository change

## Assumptions

- the correct retained reference is
  `docs/ux-review/mocks/devague/2026-07-21-review-style`
- the global type and measure tokens already adopted on this branch are newer
  than generic recommendations or stale mock CSS

## Scope exploration

- four agent templates contain 27 structurally identical authored openers:
  Devague 6, Colleague 9, Lobes 5, Reachy Mini CLI 7
- the article contains one loop-authored opener that renders eight beats and
  requires a slot for optional definitions plus paragraph-level reveal timing
- the presentation contains six similar-looking eyebrows but uses a separate
  slide system and is explicitly excluded
- the parent section, not the component, owns the anchor ID and content layout;
  the component owns the heading ID used by `aria-labelledby`
