# global-structured-card

> Agent-profile information with the same metadata → title → body → footer
> meaning shares one card and grid contract; visually similar but semantically
> different surfaces remain independent.

## Audience

- readers comparing structured information across the four agent profiles
- maintainers adding metadata-led informational card families
- agents deciding whether a proposed card matches the shared semantic contract

## Contract

- `StructuredCard.astro` owns optional metadata, a serif `h3`, 16px body copy,
  an optional compact footer, featured span, and reveal delay.
- Code-like titles keep semantic `<code>` markup without becoming controls.
- The shared grid is capped at 52rem and reflows from three to two to one
  columns.
- Metadata precedes the title, the body follows it, and an optional footer
  closes the card.
- Cards contain no clipboard behavior or copy control.

## Adopted Surfaces

- Devague method moves and operator skills: 2 calls, 14 cards
- Colleague paradigm, tiers, work loop, minds, and surfaces: 5 calls, 25 cards
- Reachy Mini CLI capabilities, owner model, senses, and agent-first surfaces:
  4 calls, 25 cards
- Lobes roles: 1 call, 6 cards

At delivery, this was 12 authored calls and 70 rendered cards.

## Boundaries

- The Devague pipeline is a ruled seven-row reference list, not a structured-card
  family.
- Directory and library destinations use `DestinationCard`.
- Article evidence, terminals, tables, measured statistics, human-gate rows,
  closing bands, and presentation cards remain semantically distinct.
- Equal visual treatment is not sufficient reason to adopt this component.

## Success Signals

- built cards retain metadata → title → body → footer order
- all card grids reflow without page overflow
- only Devague's command titles use code semantics
- excluded routes render no structured-card markers
- the Astro build succeeds and representative card families pass semantic,
  visual, keyboard, and responsive review
