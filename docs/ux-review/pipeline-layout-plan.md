# The pipeline section — layout handoff plan

A coding-ready plan for the layout fixes to the "The pipeline" section of
`/agents/devague/` (and one page-wide heading rule the whole page needs).
Direction was agreed in review on 2026-07-20. Every change below was
prototyped and verified in the review mock — including a caption
approach that was tried and rejected (change 2), and a card treatment
(changes 3–4) that was later superseded by the reference-list treatment
(change 5, the reviewer-approved direction). Three animation bugs found
along the way are specced at the bottom; they ship regardless of the
layout choices. The
[21 July full-page mock](mocks/devague/2026-07-21-review-style/README.md)
retains the last successful integrated render; its manifest records the two
pipeline restoration requests made after that render. No code in this plan has
been applied to the site.

## The problems, measured

1. **Section headings outrun the prose.** Section `h2`s carry no width
   cap, so they span the full 68rem container while the `.prose` block
   below them is 42rem. Measured natural (unwrapped) heading widths:
   pipeline 1112px, method 888px, what's-next 864px, operator-skills
   726px, human-gate 691px — all past the 672px (42rem) prose measure.
   Worse, the base stylesheet's `text-wrap: balance` splits any capped
   heading into two *even* short lines, which reads as scrawny next to a
   full-width paragraph.
2. **The flow caption is eight lines of centered text.** `.flow-caption`
   is `text-align: center; max-width: 34rem` under a centered diagram.
   At two lines that's a caption; at eight it's a wall — both edges
   ragged, so the eye re-finds the margin on every line.
3. **The stage cards misalign internally.** Seven cards in the
   `auto-fit, minmax(16rem, 1fr)` grid land 4+3 on desktop. Grid stretch
   already equalizes heights *within* a row, but the internal zones
   drift: "spec → challenged spec" wraps its title to two lines (and
   some engine lines wrap too), pushing that card's body text out of
   register with its neighbors'.

Net effect: the section cycles through left prose, a centered diagram,
centered-but-ragged-both-edges caption text, and full-width cards. After
these changes: prose and headings share one left-aligned reading column;
the diagram and its caption form one centered module (caption text
left-aligned inside its own box for readability, but that box stays
centered under the diagram — not pulled over to the prose column, which
would visually disconnect it from the figure it describes); cards keep
the full container width.

## Hard constraints (do not violate)

- **Zero copy changes.** The caption and every card string render
  word-for-word as they are in `devague.ts`. This plan is CSS-only.
- No new global styles — everything lands in the two components' own
  scoped `<style>` blocks.
- No accent-bar cards (no left/top decorative borders).
- Compositor-only motion honoring `prefers-reduced-motion`. Nothing here
  touches motion, and the track-width change must not break the
  link-line draw animation (it animates `scaleX`, which is
  width-independent — verify anyway).
- WCAG AA in both themes; static build; Lighthouse ≥ 95 unchanged.

## Changes

### 1. Page-wide heading measure — `site-astro/src/pages/agents/devague.astro`

One rule in the page's scoped style block (Astro scoping makes it
page-only, so the no-global-styles rule holds):

```css
/* A heading never outruns the prose directly beneath it. Card/grid
   modules further down a section still use the full container — they
   are separate visual blocks, not what a heading is read against.
   text-wrap: wrap overrides the base stylesheet's `balance`: balance
   evenly splits any wrapped heading into two short lines even when the
   overflow past 42rem is one word; greedy wrap fills line one and drops
   only the true overflow. */
h2 {
  max-width: 42rem;
  text-wrap: wrap;
}
```

Verified in the mock across all six sections: heading right edge equals
prose right edge, and every two-line heading fills its first line.
`PageHero`'s `h1` is untouched.

### 2. The caption stops being ragged on both edges — one file, one rule

`.flow-wrap` (devague.astro, ~line 341) already centers the whole figure
at 56rem inside the 68rem container — correct, unchanged. The only
problem is `.flow-caption`'s own `text-align: center`, which ragged-edges
both sides of every line once the caption runs past ~2 lines. The fix is
scoped to that rule alone, in `DevagueFlow.astro` (~line 395):

```css
.flow-caption {
  /* text-align: left, not center: at 8 lines, centered text is ragged
     on both edges and the eye has to re-find the margin every line.
     max-width dropped from 34rem to 42rem so this reads as one measure
     with the section's prose, even though the box itself stays centered
     (below). font-size/line-height unchanged. */
  text-align: left;
  max-width: 42rem;
  font-size: 0.92rem;
  line-height: 1.55;
}
```

Leave everything else alone — no change to `.flow-wrap`, `.flow-track`,
or the figure's centering. `.flow`'s flex-column parent uses
`align-items: center`, so `.flow-caption` (no `align-self` override)
keeps centering as a block sized to its own `max-width`, symmetrically
inset under the wider `.flow-track` above it — same figure, same visual
group, just left-aligned text instead of centered text inside that box.

**Do not** add `align-self: flex-start` or otherwise re-anchor the
caption to the prose column's left edge — that was tried first in the
mock and produced two visibly disconnected blocks (diagram centered at
56rem, caption pulled left to the full container edge, no longer reading
as one figure). Caught by screenshot review before this doc was
finalized; the version above is the one that was actually kept.

The figcaption stays inside the `<figure>` — semantics and the
`aria-label` relationship are unchanged; only its paint moves. No
narrow-viewport check needed here (unlike the rejected approach, nothing
about `.flow-track`'s width changed, so the existing stacked-mode
media query at ~line 756 is untouched and unaffected).

### 3. Stage-card zones align — `devague.astro` (fallback — superseded by change 5)

Reserve two lines for the title and engine zones so `.stage-detail`
starts at the same y in every card of a row, however the titles wrap.
The `lh` unit resolves against each element's own line-height, so this
survives any later type changes:

```css
/* Only where columns are narrow enough to wrap: at one column the
   titles never wrap and the reserved line would be dead air. ~36rem is
   where the auto-fit grid goes multi-column — verify the exact
   threshold in DevTools and adjust. */
@media (min-width: 36rem) {
  .stage-name,
  .stage-engine {
    min-height: 2lh;
  }
}
```

Every current title and engine string fits ≤ 2 lines at the 16rem
column floor (longest: "spec → challenged spec" / "the frame engine —
before there is a frame"). `.stage-verbs` is already bottom-pinned via
`.stage-detail { flex-grow: 1 }` — no change.

*Alternative considered:* CSS subgrid (`.stage-card { display: grid;
grid-template-rows: subgrid; grid-row: span 4 }`) sizes each zone to
its row's tallest content instead of reserving space. It's the more
exact tool but interacts with card padding and the parent's row gap;
the `2lh` reservation gets the same visual result for a two-line
change. Use subgrid only if the reserved air bothers you.

### 4. Optional — equalize the two card rows (fallback — superseded by change 5)

`grid-auto-rows: 1fr` on `.stages` would force the 3-card row to match
the 4-card row's height (the operator-skills proposal in this review
does this for its grid). Trade-off: the shorter cards gain empty space.
Skip unless the rows look mismatched after change 3; the 4+3 hole at
the row's end stays left-aligned either way, consistent with the
operator-skills grid.

### 5. The stage cards become one reference list — `devague.astro` (recommended)

Applied and approved in review after 3–4 were written, and it replaces
them: keep changes 3–4 only if the card grid is retained instead.

The diagnosis behind it: the pipeline section tells the same story three
times in one screen — the animated diagram, the caption's prose
re-narration, and seven stage-cards of per-leg detail (with a fourth
telling later on the page, the operator-skills section's seven `/skill`
cards). The cards compete with the diagram at equal visual weight. This
change demotes them to quiet lookup material: the `<ul>` becomes one
card surface; each `<li>` becomes a hairline-separated row laid out as a
2×2 grid, so the name↔detail and engine↔verbs bands align across the
row:

```text
idea → scope      | survey the surfaces the idea touches …
THE FRAME ENGINE… | scope "<surface>" --finding · --seeds · --list
```

CSS-only — markup untouched, all four copy fields (name, engine,
detail, verbs) render verbatim, and the per-row `[data-reveal]` stagger
runs unchanged. The prototype's values:

```css
.stages {
  list-style: none;
  margin-top: 2.2rem;
  display: block;                     /* was the auto-fit card grid */
  background: var(--surface);         /* the .card chrome moves here */
  border: 1px solid var(--line-soft);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 0.35rem 1.7rem;
}
.stage-card {
  background: none;                   /* row, not card */
  border: 0;
  border-radius: 0;
  box-shadow: none;
  display: grid;
  grid-template-columns: 13rem minmax(0, 1fr);
  grid-template-rows: auto auto;
  column-gap: 1.6rem;
  row-gap: 0.3rem;
  align-items: start;
  padding: 1.05rem 0;
}
.stage-card + .stage-card { border-top: 1px solid var(--line-soft); }
.stage-name   { grid-area: 1 / 1; font-size: 0.95rem; }
.stage-engine { grid-area: 2 / 1; font-size: 0.66rem; line-height: 1.5; }
.stage-detail { grid-area: 1 / 2; margin: 0; }
.stage-verbs  { grid-area: 2 / 2; }

/* narrow screens: rows collapse to a stack in DOM order */
@media (max-width: 46rem) {
  .stage-card { display: flex; flex-direction: column; gap: 0.25rem; }
}
```

Measured in the mock: the list is roughly the same height as the card
grid at the same container width (~840px) — the win is weight, not
height. The section reads as one visual protagonist (the diagram)
followed by reference rows, instead of seven cards re-telling the story
at full volume. Verified at desktop and at the mobile stack.

## Bug fixes found along the way (ship regardless of layout choices)

Three defects in `DevagueFlow.astro` itself, independent of every
layout decision above. All three are fixed and verified in the review
mock.

**a. The converge gate reveals two stages early.** Every other stage's
icon is wrapped in a group that fades in on the shared `--d` timeline;
the gate's `<svg>` has no such wrapper, so the whole frame-and-doors
shape is visible from first paint — and its internal beats (bar
dissolve 3.7s, check 4.2s, door animation from 1s) assume that. Fix:
give the gate `<svg>` a `.gate-glyph` class + `style="--d: 4.1s"`
(right after its incoming connector starts at 3.9s) with hidden/reveal
rules mirroring `.spec-doc`'s exactly; re-time the internal beats to
follow the reveal (doors `1.8s` duration, `4.6s` delay — was 3.6s/1s;
bar dissolve `5.7s` — was 3.7s; check `6.2s` — was 4.2s); and shift
every inline `--d` ≥ 4.8s in the component by **+1.5s** so the story
still reads in order. Measured after the fix: claims 1.3s → gate 4.3s →
bar dissolves 6.0s → check 6.5s → spec 6.8s → waves 9.3s — the
"spec exports through the open gate" beat survives.

**b. The waves root dot is visible from first paint.** `.wave-root` has
no reveal at all (unlike `.wave-lane`). Fix: `transform-box: fill-box;
transform-origin: center` on the base rule, hidden/reveal rules
mirroring `.wave-lane`'s, and `style="--d: 9s"` on the element (its
connector, post-shift, is 9.0s).

**c. The summary glyph's third tick is misaligned.** The three ticks'
paths step consistently in y (+7 per row) but the third shifts left to
chase its shortened rule line: `d="M33.5 41.8 35.8 44 40 39"`. A
checklist's tick column is fixed; the shortened rule already carries
the "shorter row" meaning. Fix: `d="M36.5 41.8 38.8 44 43 39"` — same
x-coordinates as ticks one and two.

## Open questions for Ori (content calls, not made in this plan)

1. **Consolidate per-leg detail into operator-skills.** The stage
   cards/rows and the operator-skills section both enumerate the same
   seven legs with near-identical duty text. The stronger cut: the
   pipeline section keeps the diagram plus three cards for the three
   *engines* (frame engine, plan engine, delivery ledger — the framing
   the section's own intro copy already uses), and leg-by-leg detail
   lives only in operator-skills. Removes the page's real duplication;
   drops the stage-detail sentences from this section, which is why it
   is Ori's call.
2. **Trim the footer caption.** The caption re-narrates the exact arc
   the animation just performed, in eight lines. One or two sentences
   would do; copy call.

## Deliberately untouched

- The diagram's design — it is the centerpiece; centered-against-a-left-
  column is the intended contrast, and its glyph artwork and internal
  spacing are out of scope. (Its reveal *timing* is not untouched — see
  the three bug fixes above, which correct defects rather than restyle.)
- All copy, all data modules, the stage/card markup, `PageHero`.

## Acceptance criteria

- Every section `h2` on the page: right edge equals the prose right
  edge below it; any two-line heading fills its first line (no
  balanced short-short split).
- `.flow-caption`: box is horizontally centered under `.flow-track` (same
  center point — NOT the prose column's left edge); text inside that box
  is left-aligned, measure ≤ 42rem; diagram still horizontally centered.
- Change 5 path (recommended): `.stages` renders as one card surface
  with seven hairline-separated rows; the name↔detail and engine↔verbs
  bands align within each row; below 46rem each row stacks in DOM
  order. (Grid-fallback path instead: all `.stage-detail` elements in
  the same row share the same top y.)
- Reveal order plays idea → frame → converge → spec → challenge →
  waves → build → deviate → summary, nothing visible before its
  incoming connector starts, and the gate opens before the spec
  appears (sample computed opacities on a timer — tool-latency spot
  checks cannot resolve the ordering).
- `git diff` touches only the two components (`<style>` blocks plus
  the three bug fixes' class/`--d`/path-coordinate edits in
  `DevagueFlow.astro`'s template) — zero copy or data changes.
- Lighthouse performance and accessibility ≥ 95; AA in both themes;
  reduced-motion rendering unchanged (all reveal rules stay inside the
  `prefers-reduced-motion: no-preference` + `html.js` gate, so the
  no-JS/reduced-motion still shows the finished diagram).

## Verify recipe (DevTools console, on the built page)

```js
// heading joins the reading column (values should match)
const p = document.querySelector('section[aria-label="The pipeline"] .prose p');
const h2 = document.querySelector('section[aria-label="The pipeline"] h2');
[p.getBoundingClientRect().right, h2.getBoundingClientRect().right];

// caption is centered under the diagram, NOT under the prose column
// (its center, not its left edge, should match .flow-track's center)
const track = document.querySelector('.flow-track');
const cap = document.querySelector('.flow-caption');
const trackCenter = (track.getBoundingClientRect().left + track.getBoundingClientRect().right) / 2;
const capCenter = (cap.getBoundingClientRect().left + cap.getBoundingClientRect().right) / 2;
[Math.round(trackCenter), Math.round(capCenter)];

// change 5: one surface, seven hairline rows
// (grid fallback instead: .stage-detail tops in runs of 4 then 3)
document.querySelectorAll('.stages > .stage-card').length; // 7

// reveal order: sample opacities in-page (tool/manual spot checks can't
// resolve sub-second ordering) — arm before scrolling the flow into view
window.__s = [];
const els = ['.gate-glyph', '.spec-doc', '.wave-root'].map((q) =>
  document.querySelector(q));
const t0 = performance.now();
setInterval(() => window.__s.push([
  Math.round(performance.now() - t0),
  ...els.map((e) => getComputedStyle(e).opacity),
]), 250);
// …scroll the diagram into view, wait ~12s, then inspect window.__s:
// gate crosses 0.5 ≈ 4.3s, spec ≈ 6.8s, waves root ≈ 9.3s.
```

Then a screenshot pass at 1384 / 1024 / 768 / 375 wide.

## Build order

1. The three bug fixes (a–c) — smallest diffs, ship regardless, and
   they make every later visual check trustworthy.
2. Heading rule (change 1) — it also settles the other five sections.
3. Caption fix (change 2) — one property change, one file.
4. Card treatment: the reference list (change 5, recommended) — or
   changes 3–4 if the grid is kept.
5. Verify recipe + screenshot pass, both themes.
6. Separately: put the two open questions to Ori — neither blocks any
   of the above.

Repo mechanics: PRs only (`main` is protected), and every PR needs a
version bump (`/version-bump patch`) per the repo convention.
