# UX direction after the Devague mock

> **Status:** Current decision map, 21 July 2026. This file is additive. It
> does not replace the original audit, alter an existing mock, or authorize a
> change to the live site.

The first UX review measured the site at commit `d71a719`. Later work on the
Devague page moved several solutions forward, especially the pipeline and real
captures sections. The original measurements remain useful evidence, but not
every recommendation attached to them is still the intended destination.

This document is the reconciliation layer: it says which artefacts describe the
current direction, which remain supporting evidence, and which record an option
that later work superseded.

## Decision hierarchy

When two documents disagree, use this order:

1. This current-direction map for status and precedence.
2. The [preserved full-page Devague mock](mocks/devague/2026-07-21-review-style/README.md)
   for the last successfully rendered integrated composition.
3. The two current Devague handoffs:
   [`captures-story-plan.md`](captures-story-plan.md) and
   [`pipeline-layout-plan.md`](pipeline-layout-plan.md).
4. The original audit for measured evidence:
   [`findings.md`](findings.md).
5. Earlier interactive explorations for rationale, not implementation
   authority.

The full-page Devague review mock is retained in this worktree. Its HTML and
assets match the final successful Claude render; its page CSS contains one
documented, branch-only repair for the diagram's responsive layout. This map and
the snapshot manifest also record two pipeline requests made after the Claude
render. Where the snapshot and a handoff differ, use the snapshot as visual
evidence and the handoff as the intended implementation direction.

## Artefact status

| Artefact | Status | How to use it now |
|---|---|---|
| `current-direction.md` | Current map | Start here for precedence and scope. |
| [Devague full-page mock](mocks/devague/2026-07-21-review-style/README.md) | Latest retained mock | Review the complete composition, interactions, and responsive diagram repair. The manifest records the final pipeline requests that did not land in the Claude render. |
| [`captures-story-plan.md`](captures-story-plan.md) | Current handoff | Governs the Devague real-captures redesign. |
| [`pipeline-layout-plan.md`](pipeline-layout-plan.md) | Current handoff | Governs the Devague pipeline layout and animation fixes. |
| [`agents-directory.html`](agents-directory.html) | Current independent proposal | The directory affordance and wayfinding work remains valid; the Devague mock does not supersede it. |
| [`agent-page-scaling.md`](agent-page-scaling.md) | Active longer-term direction | Use when consolidating shared agent-page and terminal patterns, not as a prerequisite for the Devague page. |
| [`spacing-type-and-captures.md`](spacing-type-and-captures.md) | Supporting diagnosis; partly superseded | Its spacing, leading, tracking, and transcript-legibility measurements remain evidence. Its recommended captures layout is no longer the end state. |
| [`spacing-type-system.html`](spacing-type-system.html) | Supporting prototype | Demonstrates the proposed rhythm system; it is not an approved global token migration by itself. |
| [`captures-layout.html`](captures-layout.html) | Superseded exploration | Retain the four-option comparison and measurements as rationale. Do not implement option D as the final captures experience. |
| [`findings.md`](findings.md) | Baseline snapshot | A measured audit of `d71a719`, not a current backlog in priority order. |
| [`README.md`](README.md) | Master index | Inventory, reading order, and run instructions for the complete UX-review branch. |

## Current Devague direction

### The pipeline

The pipeline should read as one visual argument, not three equally loud
retellings of the same material.

- Section headings share the prose measure: `max-width: 42rem`, using ordinary
  greedy wrapping rather than balanced short-short lines.
- The diagram remains centred as the section's visual protagonist.
- The long caption remains centred *as a box* beneath the diagram, while the
  text inside it becomes left-aligned at a maximum `42rem` measure.
- The seven stage cards become one quieter reference-list surface with seven
  separated rows. The earlier card-zone and equal-row treatments remain
  fallbacks only.
- Three animation defects are part of the current work regardless of layout:
  the converge gate reveals too early, the waves root dot appears at first
  paint, and the third summary tick is misaligned.

The current handoff keeps pipeline copy unchanged. Two possible copy reductions
remain human decisions and are listed under [Open decisions](#open-decisions).

The retained composition stops at the last successful 21:11 Claude render; the
branch adds only the responsive diagram repair documented in its manifest. The
subsequent requests to restore the pipeline eyebrow and original animation are
not visible there; they remain implementation work rather than a reason to
discard the snapshot.

### The real captures

The goal has moved from fitting ten terminal panes into less vertical space to
helping a non-technical reader understand the evidence.

- Present the material as three named working sessions.
- Introduce the terminal language with one short primer.
- Tell each session as a sequence of plain-language beats paired with tiny,
  verbatim excerpts from the existing capture data.
- Render one animated hero pane inline per session.
- Put the remaining complete panes in an accessible transcript modal.
- Keep every transcript line byte-identical. Excerpts are resolved as slices of
  the source data by exact anchors and protected by a build-time check.
- Preserve chronological order and the page's use as a live-presentation prop.

This supersedes option D's capped, expand-in-place gallery as the final design.
The older layout comparison still explains why masonry, nested scrolling, and
five independent two-card grids were rejected.

### Spacing and type

The original diagnosis remains useful:

- nested `em` values create accidental fractional spacing;
- inherited prose leading creates phantom space around single-line labels;
- nested font-size rules make terminal copy smaller than intended; and
- positive tracking weakens the monospace texture.

The proposed fixed spacing and type-role scales are supporting design-system
work. They should not be treated as a completed global migration or allowed to
override the current handoffs' explicit no-new-global-styles constraint.

## Independent site-wide work that remains valid

The Devague mock does not resolve the rest of the original audit.

- **Agents directory:** whole-card links, explicit local-page versus repository
  cues, group anchors and counts, and optional progressive filtering remain the
  current proposal.
- **Agent-page scaling:** a shared terminal component followed by an extracted
  page shell remains the preferred sequence before the family grows much
  further. Bespoke diagrams stay bespoke.
- **External-link affordance:** still a low-priority site-wide improvement.
- **Learn:** treat this as a deployment cutover dependency. `/learn/` is served
  by the separate `learn-cli` Cloudflare Pages project rather than by the
  `org` static build; it is not primarily a page-design defect.

## Preserve these strengths

Later work must not trade away what the baseline audit found correct:

- the existing dawn/pre-dawn visual system, fonts, colour tokens, radii, and
  shadows;
- WCAG AA contrast in both themes;
- one logical heading hierarchy per route;
- keyboard-accessible scrollable tables and transcript regions;
- no horizontal page overflow at a 360px viewport;
- complete no-JavaScript and reduced-motion renderings;
- static output with no client-side network calls;
- compositor-only motion where motion remains; and
- the verbatim transcript and provenance contract.

For the two current Devague handoffs, keep styles component-scoped and do not
introduce decorative top or left accent bars.

## Superseded or rejected directions

Keep these for the reasoning trail, but do not present them as the latest
recommendation:

- option D, the capped expand-in-place captures gallery, as the final captures
  experience;
- retaining the stage-card grid and merely reserving two-line internal zones,
  unless the approved reference-list direction is explicitly reversed;
- equalising the two stage-card rows as an end in itself; and
- pulling the flow caption to the prose column's left edge. That treatment was
  tested and rejected because it detached the caption from its figure.

## Open decisions

These are still choices for Ori, not decisions hidden inside an implementation
plan:

1. Whether to remove duplicate per-leg detail from the pipeline and let the
   operator-skills section own it, leaving the pipeline with three engine-level
   summaries.
2. Whether to reduce the eight-line flow caption to one or two sentences.
3. Where the directory and shared agent-page work sit relative to the Devague
   implementation in delivery order.

## Implementation boundary

No proposal in this folder has been applied to `site-astro/` in this worktree.
The original Devague page and its capture data remain unchanged. Adding this
document does not change that boundary.

If implementation is requested later, begin with the current handoffs, preserve
the safeguards above, and then run the repository's build, link, lint,
accessibility, responsive, theme, no-JavaScript, and reduced-motion checks.

## Suggested reading order

1. This document.
2. The [preserved full-page Devague mock](mocks/devague/2026-07-21-review-style/README.md).
3. [`captures-story-plan.md`](captures-story-plan.md).
4. [`pipeline-layout-plan.md`](pipeline-layout-plan.md).
5. [`findings.md`](findings.md), for the measured baseline and verified
   strengths.
6. The relevant supporting prototype or architecture note only when its topic
   is being implemented.
