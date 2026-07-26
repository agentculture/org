# Delivery Summary — global-section-opener

plan: `global-section-opener` · run: `complete` · date: `2026-07-26` · draft
PR: [#30](https://github.com/agentculture/org/pull/30)

## Intent

Give long-form sections one accessible, readable opening grammar while
preserving the article's definitions and every page's bespoke downstream
composition.

## Actual Delivery

| Plan task | Status | What landed |
|---|---|---|
| `t1` shared component | delivered | `SectionIntro.astro` owns eyebrow, stable heading, optional post-title content, readable measures, title spacing, and reveal behavior. |
| `t2` agent profiles | delivered | Devague 6, Colleague 9, Lobes 5, and Reachy Mini CLI 7 authored calls; parent sections use matching `aria-labelledby` IDs. |
| `t3` article | delivered | One loop-authored call renders eight beat openings while definitions, lede styling, paragraph reveals, and evidence notes remain local. |
| `t4` validation | delivered | The production build and focused semantic/visual review covered ordering, measures, accessible labels, reveal behavior, and the presentation exclusion. |

## Final Decisions

- Agent sections use grouped introductory reveals; the article retains
  paragraph-level reveals.
- The article's definitions use the named `after-title` slot rather than moving
  into the shared component's data model.
- Agent headings use standard title spacing; the article keeps its relaxed
  variant.
- Explicit template branches prevent absent reveal flags from becoming literal
  false-valued data attributes.
- The presentation remains a separate slide pattern.

## Evidence

- delivery snapshot: 28 authored component calls render 35 section openings
- all five migrated routes retain stable heading IDs and labelled parent regions
- article heading → definitions → prose order is preserved in built output
- the seven-slide presentation renders no shared section-introduction markers
- the Astro production build passes

## Boundaries

- no copy, section order, route, breadcrumb, local-navigation, Learn, or
  deployment change belongs to this component
- future pages must opt into the component deliberately
