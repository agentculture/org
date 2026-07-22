# Build Plan — deck-six-slide-narrative

slug: `deck-six-slide-narrative` · status: `exported` · from frame: `deck-six-slide-narrative`

> The mind-nervous-system-body deck tells the issue-23 story in six visual, declarative slides: one hero line per slide, technical nuance moved to the spoken track, the architecture diagram kept, and a dual-maturity close - Reachy Mini as the working system, ARM101 honestly in progress.

## Tasks

### t1 — Rewrite the slide dataset and its co-located node test, test-first: six slides per issue 23

- instruction: work test-first in site-astro/src/data: rewrite the co-located test to pin the six-slide contract, watch it fail, then rewrite mind-nervous-system-body-slides.ts until green; keep the module type-only-imports so node --experimental-strip-types loads it bare; touch no other file
- covers: c2, h2, c3, h3, c13, c14, h8, c16, h12, h7
- acceptance:
  - node --experimental-strip-types --test passes: exactly six slides whose ids and titles match issue 23 in order; the thesis 'A CLI for intelligence. A runtime for embodiment.' verbatim as the close slide's bottom line, pinned at the last index
  - spokenLine cap asserted at 4 sentences and slide 6's combined spoken passage (3-sentence explanation + 1-sentence verbal close) fits exactly
  - photo mapping pinned per q3: reachy-mini-action on slide 4, so101-action on slide 5, both hero slots on slide 6, each of the four slots exactly once
  - no rulesToml or multi-line command-sequence fields remain; slide 6 carries exactly one command per robot (reachy-mini-cli behavior engine start / arm101 arm flex --apply); deckSources export retained for the close slide; ARM101 copy says in-progress, never persistent-runtime
  - before-state verified against main (10 slides across 8 beats with contrastRows/commandLines/rulesToml) before rewriting; the file header comment rewritten to describe the six-slide shape

### t2 — Relabel the architecture diagram's runtime layer: 'ROS 2 or native'

- instruction: edit site-astro/src/components/CliRuntimeStackDiagram.astro only - the runtime layer-title string and the svg title/desc narration; verify with git diff that nothing else changed
- covers: c6, h9, c12, h6
- acceptance:
  - the diff touches only the runtime layer-title text and the svg title/desc narration strings - every other box, arrow, and label in CliRuntimeStackDiagram.astro stays byte-identical
  - the runtime layer label includes 'ROS 2 or native', the desc narration mentions it, and the component keeps its role=img + aria-labelledby accessibility contract

### t3 — Author the deck's new visual elements as standalone theme-aware components (bridge illustration, three path glyphs, situation vignettes)

- instruction: create new files under site-astro/src/components/ only (a deck/ subfolder is fine); follow the site palette and both dawn themes as CliRuntimeStackDiagram does; no edits to existing files so wave-0 merges stay disjoint
- covers: c20
- acceptance:
  - new component files under site-astro/src/components/ deliver: the slide-1 agent-to-interface-to-robot illustration, three slide-2 intelligence-path glyphs, and two situation vignettes (disconnected, routine) - all inline SVG in the site palette, legible in both dawn themes
  - any animation honors prefers-reduced-motion, and each SVG carries a title/desc pair or aria-hidden per its informative/decorative role
  - components render standalone in a scratch page without the deck renderer (no circular dependency on t5's layouts)

### t4 — Version bump and changelog entry for the deck restructure PR

- instruction: run the version-bump skill (minor - the site gains a restructured deck) from the repo root; it updates pyproject.toml and prepends the CHANGELOG.md entry
- acceptance:
  - the version-check CI job passes: pyproject.toml version differs from main and CHANGELOG.md carries a Keep-a-Changelog entry describing the six-slide deck restructure (use the version-bump skill)

### t5 — Rebuild the deck renderer for the six-slide layouts (columns, labeled image, situation triptych, dual-robot close)

- instruction: rework site-astro/src/pages/presentations/mind-nervous-system-body.astro: replace the retired contrast/commands/rules branches with the four new layouts, import t3's components, keep the nav script generic over data-deck-slide sections; verify animations in BUILT html (lobes lesson - :global for selectors targeting injected markup)
- depends on: t1, t3
- covers: c5, h5, h17, h18, c15, h11, c17
- acceptance:
  - each of the six slide shapes has a dedicated layout branch with no unstyled fallback; astro build succeeds; the diagram slide still embeds CliRuntimeStackDiagram exactly once
  - presenter affordances survive: ArrowRight/ArrowDown advance, prev/next controls, dot-rail scroll-spy, and reduced-motion instant jumps work across the six slides
  - animations are live in the built page - verified in built HTML, not source; :global() used where selectors target injected markup (the lobes-page lesson)
  - every slide reads visual-first (photo, diagram, illustration, or glyph present) and its on-slide text communicates without the spoken track, at mobile and desktop widths

### t6 — Re-pin check-presentations.mjs to the six-slide built contract

- instruction: edit site-astro/scripts/check-presentations.mjs: update the deck expectation constants, the thesis-location check, and the photo mapping; leave every article check untouched; verify against a fresh astro build
- depends on: t1
- covers: c4, h4, h7
- acceptance:
  - expectedDeckSlideCount is 6; per-robot photo expectations match q3's mapping (action on slides 4/5, heroes on 6); the thesis-verbatim check targets the close slide's text; diagram-once, alt-text, and no-article-anchor checks retained
  - the script passes against the built dist and fails when slide count, the diagram embed, or the thesis text is deliberately broken (each break tried and restored)

### t7 — Full validation and design-review pass over the assembled branch

- instruction: read-only validation over the assembled branch with fixups only where a check fails: run the three checks, the deliberate-break drill on each, the diff audit against main, and the design review in the built preview - desktop and mobile, both themes, reduced-motion on and off
- depends on: t2, t4, t5, t6
- covers: c1, h1, c7, h10, c18, h14, c19, h15, h13, h16, c20
- acceptance:
  - all three checks green on the branch: node --experimental-strip-types --test, astro build, and check-presentations.mjs; the built deck renders exactly six data-deck-slide sections matching issue 23's order with the dual-maturity close last
  - deliberate-break verification: each of the three checks fails when one of its re-pinned expectations is broken, then passes again on restore
  - diff audit: no article surface, no photo-pipeline file (presentation-photos.ts, docs/presentation-photos.md, public webp), and no presentations-index change appears in the PR diff
  - design review at presentation distance: hero lines legible at a glance, the deck reads fun and inviting rather than corporate, ARM101 copy never overclaims, both dawn themes and reduced-motion verified in the built page

## Risks

- [follow_up] real photographs are an operator-owned deliverable outside the build (q5): the deck ships on placeholder slates until Ori exports real captures over the same filenames before the talk
- [unknown_nonblocking] slide 6's spokenLine sits exactly at the 4-sentence cap (probe s13) - any future copy edit to that slide can trip the test with zero headroom
- [unknown_nonblocking] wave-parallel tasks are file-disjoint by construction, but t5 (renderer) is the single largest file and carries the design bar - it is the schedule bottleneck, not mergeable in pieces
