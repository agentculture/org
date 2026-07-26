# Delivery Summary — global-structured-card

plan: `global-structured-card` · run: `complete` · date: `2026-07-26` · draft
PR: [#30](https://github.com/agentculture/org/pull/30)

## Intent

Give matching agent-profile information cards one hierarchy and responsive grid
without turning every rectangular surface into the same component.

## Actual Delivery

| Plan task | Status | What landed |
|---|---|---|
| `t1` shared component | delivered | `StructuredCard.astro` owns optional metadata/footer, serif title, 16px body, featured span, reveal delay, and the responsive grid. |
| `t2` Devague | delivered | Method moves and operator skills use 2 authored calls for 14 cards; command titles retain code semantics. |
| `t3` Colleague | delivered | Five families use 5 authored calls for 25 cards; metadata and compact command footers retain their meaning. |
| `t4` Reachy and Lobes | delivered | Four Reachy families and one Lobes family use 5 authored calls for 31 cards. |
| `t5` validation | delivered | The production build and focused semantic/responsive review covered ordering, command treatment, absent copy controls, and explicit exclusions. |

## Final Decisions

- Shared treatment is based on the metadata/title/body/footer information model,
  not visual similarity alone.
- Command titles remain selectable semantic code and do not become buttons.
- The Devague pipeline initially matched the card family, then moved to a ruled
  reference list so the animated flow remained the section's visual
  protagonist. Its seven rows are therefore excluded from the delivery
  snapshot.
- Directory/library links, article evidence, terminals, tables, measured
  statistics, gate previews, closing bands, and presentation cards stay local.

## Evidence

- delivery snapshot: 12 authored component calls render 70 cards across four
  agent profiles
- route counts are Devague 14, Colleague 25, Reachy Mini CLI 25, and Lobes 6
- built cards preserve metadata → title → body → footer order
- shared grids contain three-column desktop, two-column intermediate, and
  one-column narrow rules
- excluded routes render no structured-card markers
- the Astro production build passes

## Boundaries

- no card adds clipboard behavior or a copy control
- future card families must match the semantic contract before adopting the
  component
