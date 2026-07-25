# Delivery Summary — global-structured-card

plan: `global-structured-card` · run: `complete locally` · date: `2026-07-23`

## Intent

> Move every matching informational-card family on the four long agent
> profiles to the retained Devague mock's metadata → serif title → body →
> compact footer pattern, without applying that visual treatment to
> semantically different cards.

## Planned Work

- add one shared `StructuredCard` component and responsive grid
- migrate the 13 matching data-driven card families on four agent profiles
- preserve command semantics without adding the mock's copy interaction
- exclude directory/library links, evidence, terminals, tables, measured
  stats, human-gate rows, and presentation cards
- add a built/source contract and record the implementation for review

## Actual Delivery

| Plan task | Status | What actually landed |
|---|---|---|
| `t1` shared component | delivered | `StructuredCard.astro` owns optional metadata, serif h3, 16px body, optional monospace footer, featured span, and reveal delay without client-side behaviour. |
| `t2` Devague | delivered | Pipeline stages 7, method moves 7, and operator skills 7 now use the shared pattern; the lead method card still spans the grid and the seven skills retain code semantics. |
| `t3` Colleague | delivered | Paradigm 4, tiers 3, work loop 6, minds 3, and surfaces 9 now use one hierarchy; tier/mind context moves above the title and command strings remain footers. |
| `t4` Reachy and Lobes | delivered | Reachy capabilities 9, owner model 5, senses 6, agent-first surfaces 5, and Lobes roles 6 now use the component. |
| `t5` contract/docs/validation | delivered locally | A new contract runs in the site-build workflow; the spec, plan, design-system record, and this delivery record describe the boundary and evidence. |

## Mid-work Decisions

- “Switch them all” was applied to every card family matching the simple
  metadata/title/body/footer information model, not to every white rectangle
  on the site.
- The retained mock's hierarchy, 24px padding/gap, 52rem grid, serif title,
  metadata, and 3 → 2 → 1 reflow were adopted. Its late 14.72px explanatory
  copy was rejected; the approved global minimum of 16px / 1.55 leading
  remains authoritative.
- Command titles keep semantic `<code>` markup but inherit the serif title
  treatment. Monospace remains visible in metadata and compact footers.
- The copy icon and clipboard interaction visible in the retained mock are
  deliberately not part of the adopted global pattern. The user corrected
  this requirement after the first implementation; command titles remain
  ordinary selectable text.

## Drift From Plan

The copy interaction was removed following an explicit user correction. No
other scope changed: content, order, routes, destinations, index cards,
articles, presentations, terminals, tables, navigation, footer, Learn, and
deployment remain untouched by this component.

## Evidence

- build: all 12 static routes generated successfully with the repository's
  Node 22 runtime
- structured cards: 13 authored component calls render 77 cards; excluded
  index, article, and presentation card families remain local
- navigation: 7/7 tests pass
- wayfinding: 39 checks pass
- closing bands: 4 adopted routes / 8 unchanged routes / 7 actions pass
- design system: 103 checks pass
- section intros: 28 authored calls render 35 openers
- presentations: 21 checks and 17 slide-data tests pass
- desktop at 1440px: every migrated grid is 832px wide, uses three columns,
  and has no page overflow on all four profiles
- tablet at 768px: every migrated grid is 691px wide, uses two columns, and
  has no page overflow on all four profiles
- mobile at 375px: every migrated grid is 335px wide, uses one column, and
  has no page overflow on all four profiles
- computed Devague card roles: 11px uppercase monospace metadata, 18.4px
  Fraunces title, and 16px / 24.8px body copy
- accessibility tree: `/scope` remains the h3 name with no adjacent control

`astro check` still reports the branch's five pre-existing diagnostics:
three `Footer.astro` `newTab` union errors, one `DeckPathGlyphs.astro`
`aria-hidden` type error, and one `Layout.astro` font import resolution error.
The new component adds no error, warning, or hint.

## Delivery Claims

| Claim | Confidence | Evidence |
|---|---|---|
| Every matching agent-profile information card uses one pattern | high | source/render contract: 13 authored calls / 77 rendered cards |
| The implementation follows the retained mock without restoring rejected small body copy | high | computed type, hierarchy, padding, width, and responsive-grid checks |
| Semantically different card families remain separate | high | exclusion contract plus source inventory |
| Responsive reflow is consistent across all four profiles | high | 1440, 768, and 375px computed geometry with zero overflow |
| Structured cards add no copy interaction | high | component and built-output contract reject copy controls and clipboard handlers |

## Review Checklist

- `/agents/devague/#pipeline`
- `/agents/devague/#method`
- `/agents/devague/#operator-skills`
- `/agents/colleague/#paradigm`
- `/agents/colleague/#tiers`
- `/agents/colleague/#work-loop`
- `/agents/colleague/#cortex-senses`
- `/agents/colleague/#more-surfaces`
- `/agents/reachy-mini-cli/#body`
- `/agents/reachy-mini-cli/#sdk-owner`
- `/agents/reachy-mini-cli/#live-senses`
- `/agents/reachy-mini-cli/#agent-first`
- `/agents/lobes/#lobes`

## Remaining Work / Follow-up

- user visual and keyboard review before any new commit
- no commit, push, pull request, deployment, or Learn change has been made
