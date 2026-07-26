# global-section-opener

> Long-form sections share one semantic opening: an eyebrow, a stable section
> heading, optional material between the title and prose, and a readable
> introduction.

## Audience

- readers scanning the four long agent profiles and the long-form article
- maintainers adding or changing a long-form section
- agents deciding whether a page should use the shared opener or keep a local
  presentation pattern

## Contract

- `SectionIntro.astro` owns the eyebrow, `h2`, heading ID, optional
  `after-title` slot, prose wrapper, title spacing, and reveal behavior.
- The parent section uses `aria-labelledby` pointing at the component's heading.
- Headings use `--ac-measure-heading`; introductory prose uses
  `--ac-measure-prose`.
- Agent pages can reveal the introductory group as one unit.
- The article can place definitions between its heading and prose, keep the
  first paragraph as a lede, and reveal paragraphs individually.
- The shared component uses built-output-safe styling and leaves absent reveal
  attributes genuinely absent.

## Adopted Surfaces

- six Devague sections
- nine Colleague sections
- five Lobes sections
- seven Reachy Mini CLI sections
- one article loop rendering eight beat openings

At delivery, this was 28 authored component calls and 35 rendered openings.

## Boundaries

- Fast-facts sections keep their existing local structure.
- The seven-slide presentation keeps its slide-owned eyebrow pattern.
- Section order, IDs, copy, definitions, evidence notes, and downstream page
  compositions remain page-owned.
- The component is selected deliberately; it is not automatic scaffolding for
  every future section.

## Success Signals

- migrated pages contain no copied eyebrow/heading/prose opener markup
- all parent regions and component headings retain matching accessible IDs
- article definitions remain between the heading and prose
- no `data-reveal="false"` attributes appear in built output
- the Astro build succeeds and representative agent/article pages pass semantic,
  visual, keyboard, and reduced-motion review
