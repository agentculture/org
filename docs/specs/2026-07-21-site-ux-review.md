# site-ux-review

> Turn the measured July 2026 UX review into shared site patterns
> without flattening the page-specific compositions that give AgentCulture its
> character.

## Audience

- visitors moving between the site shell, agent directory, agent profiles,
  articles, presentations, and external ecosystem destinations
- maintainers adding routes, cards, navigation entries, terminal evidence, or
  long-form sections
- agents that need one reviewable statement of the accepted UX requirements
  rather than a collection of prototypes and evolving handoff notes

## Baseline findings

The review measured the static site at commit `d71a719`, when the build emitted
eight routes. These findings describe that dated baseline, not the current
branch:

| # | Finding | Accepted requirement |
|---|---|---|
| 1 | Agent cards used one visual treatment for internal pages, repositories, and another hosted product. | Expose the destination kind before activation. |
| 2 | Only the agent name was clickable inside a card-sized visual target. | Make the complete destination card interactive. |
| 3 | Directory introduction copy said every entry linked to a repository. | Keep self-description aligned with the mixed destination model. |
| 4 | Six agent groups had no stable wayfinding. | Give every group a stable fragment and expose grouped navigation. |
| 5 | Learn looked internal even though this repository did not build `/learn/`. | Model Learn as an external product destination. |
| 6 | Four agent pages repeated shared presentation decisions independently. | Extract semantic patterns where the pages genuinely agree; keep bespoke compositions local. |
| 7 | External destinations had no consistent visual or assistive cue. | Apply one safe external-link behavior. |

## Requirements

### Navigation and destinations

- The header uses one typed navigation model with direct links for Framework
  and Engage, grouped menus for Agents and Library, and an external Learn call
  to action.
- The Library menu exposes browse-all destinations plus a deliberately capped
  featured selection; it does not grow automatically with every library item.
- The footer is a grouped sitemap derived from the same navigation data and
  exposes correct current states.
- Agent directory groups keep stable IDs. Agent cards state whether they lead
  to an agent page, a site, or a repository.
- Internal and external destination cards share one interaction model.
  External destinations open in a new tab with `noopener noreferrer`, a visible
  external icon, and assistive text.

### Shared design foundations

- Global type, leading, tracking, rail, measure, diagram-spacing, and sticky
  header-offset roles live in `site-astro/src/styles/global.css`.
- Every authored `.container` receives an explicit page, shell, wide, or deck
  rail role. Readable heading and prose measures remain nested inside those
  outer rails.
- Shared components own repeated semantic patterns: primary navigation,
  destination cards, agent-directory cards, section introductions, structured
  information cards, closing bands, inline code, and external-link cues.
- Agent-specific diagrams, page order, terminal content, article beats, and
  presentation slide layouts remain page-owned.
- Terminal components retain their different content shapes while sharing
  legible type, spacing, overflow, and fixed dark-surface rules.

### Devague experience

- The real-captures section presents three named working sessions and fourteen
  narrated excerpts so a non-technical reader can follow the evidence.
- Excerpts resolve from immutable capture data by exact anchors. Complete
  transcripts remain accessible from a keyboard-operable modal.
- Human-gate examples are read-only previews; they do not add copy controls.
- The pipeline keeps its animated flow as the visual protagonist and presents
  the seven stages as a quieter ruled reference list.
- The method and operator-skills sections use shared structured cards only
  where their metadata, title, body, and footer semantics match.

## Preserve

- WCAG AA contrast in both themes
- one logical heading hierarchy per route
- keyboard-accessible scroll regions and dialogs
- complete no-JavaScript and reduced-motion renderings
- no page-level horizontal overflow at narrow widths
- static output with no client-side network dependency
- verbatim transcript and provenance requirements
- bespoke diagrams and presentation compositions

## Boundaries

- Do not add breadcrumbs or local contents navigation in this change.
- Do not create a generic `AgentPage` or `Terminal` abstraction until a later
  task proves a stable shared interface.
- Do not change Learn source, deployment, or ownership.
- Do not make future pages adopt components automatically.
- Do not replace semantically distinct card families merely because they share
  a rectangular surface.
- Do not retain generated review pages or static mock bundles as a second
  source of truth.

## Success signals

- All twelve routes build with the typed navigation and explicit rail roles.
- Shared components own repeated markup while intentional exclusions remain
  page-local and reviewable.
- Devague story anchors resolve from the capture source during the build, and
  all full transcripts remain reachable.
- The implementation, focused tests, and
  [delivery record](../deliveries/2026-07-21-site-ux-review.md) agree about
  semantics, exclusions, and deferred work.
