# Build Plan — autonomy stuck vignette

slug: `autonomy-stuck-vignette` · status: `exported` · from frame: `autonomy-stuck-vignette`

> The deck's autonomy slide reads as three matching vignettes: Stuck joins Disconnected and Routine as an animated site-palette SVG, and the photo cell is gone

## Tasks

### t1 — Rewrite the autonomy slide's dataset + co-located node test (TDD-first): Stuck drops robot/photoId, spokenLine goes robot-generic, DeckAutonomySituation loses its photo fields, photoSlotsByRobot.so101 shrinks, robotLabel.so101 becomes 'SO-ARM101', header comment rewritten

- instruction: rewrite the test first: re-pin slide-5 assertions (three photo-free situations, robot-generic spokenLine first clause, photoSlotsByRobot.so101 one entry, robotLabel.so101 'SO-ARM101'), watch it fail against main's dataset, then rewrite the dataset until green; keep the design-rate and no-commit-hash checks untouched; node --experimental-strip-types --test
- covers: c3, c17, c18, c12, h2, h3, h7, h8, h12, c4
- acceptance:
  - the re-pinned test fails against main's dataset (before-state verified), then passes against the rewritten one
  - no autonomy situation carries robot or photoId; photoSlotsByRobot.so101 === ['so101-hero']; robotLabel.so101 === 'SO-ARM101'
  - the autonomy spokenLine starts 'When the robot gets stuck' and stays within the 4-sentence cap

### t2 — Extend DeckSituationVignettes with the 'stuck' situation: union, COPY entry with full-scene desc, and an agent-link-active motif branch on the shared robot base

- instruction: author the stuck motif on the shared robot base: robot blocked at an obstacle with the agent link brightly lit (inspect-and-adapt) — the complement of disconnected's severed link and routine's empty slot; follow the component's existing COPY/motif/uid structure verbatim; inline SVG only, no set:html
- covers: c2, h1
- acceptance:
  - situation='stuck' renders with deterministic id vignette-stuck, role=img + aria-labelledby, and a desc narrating the full scene
  - the stuck motif animates transform/opacity only, gated behind prefers-reduced-motion: no-preference, in both dawn themes
  - the trio renders the same shared robot character in all three cards

### t3 — Delete the so101-action photo slot end-to-end: PhotoSlotId union member, photo record and photoBySlot entry, shot-brief row + narration in docs/presentation-photos.md, both placeholder webp files

- instruction: delete in one sweep after t1 lands (t1 removes the dataset references first): the union member and record in presentation-photos.ts, the photoBySlot entry, the shot-brief row and narration paragraph in docs/presentation-photos.md, and git rm both webp files; verify with the grep acceptance
- depends on: t1
- covers: c16, h6
- acceptance:
  - grep -rn 'so101-action' across the repo returns zero hits and astro build stays green
  - docs/presentation-photos.md reads as three owed captures; the three surviving slots' contract is byte-identical

### t4 — Version bump (minor) + changelog entry for the autonomy-slide trio per the version-check CI gate

- instruction: use the version-bump skill (/version-bump minor): pyproject.toml + Keep-a-Changelog entry; no other file
- acceptance:
  - pyproject.toml version differs from main and CHANGELOG.md gains a Keep-a-Changelog entry describing the trio, the slot deletion, and the SO-ARM101 retitle

### t5 — Rebuild the renderer's autonomy branch: three uniform DeckSituationVignettes cells, vignetteFor maps Stuck, photo conditional and orphaned .cell-photo CSS removed, autonomy arm of sectionRobot derivation dropped, header comment updated

- instruction: render situations unconditionally as DeckSituationVignettes (delete the photoView photo branch inside the autonomy cell), extend vignetteFor with the stuck mapping, drop the autonomy arm of sectionRobot, remove the .cell-photo rules, update the file-header slide-5 line; keep reveal delays and caption markup byte-identical otherwise
- depends on: t1, t2
- covers: c6, h5, c13
- acceptance:
  - the built autonomy section contains three vignette svgs, zero <figure data-photo-slot>, and no data-robot attribute
  - reveal cadence and label → outcome captions survive; presenter affordances (keyboard advance, prev/next, dot-rail, reduced-motion jumps) work across all six slides
  - no .cell-photo rule remains in the page's styles

### t6 — Re-pin check-presentations.mjs to the trio contract: three photos, data-robot so101 once deck-wide, no so101-action in expectations, summary line updated

- instruction: edit only the expectation constants and the two photo checks: expectedSectionRobots, expectedRobotSlideCounts, expectedPhotoSlotSections, deckImagePaths, the 'four robot photos' check title/loop, and the summary line; leave every article check untouched
- depends on: t1
- covers: c5, h4, c4
- acceptance:
  - expectedSectionRobots is surfaces-only, expectedRobotSlideCounts.so101 === 1, deckImagePaths has three entries, and the 'four robot photos' check reads three
  - the re-pinned checks fail against a pre-change build for the expected reasons and pass against the post-t5 build

### t7 — Full validation + design review: CI trio green, deliberate-break drill, diff audit against the boundary, animation-liveness in dist, both-theme presentation-distance review

- instruction: run the three checks; then the deliberate-break drill (wrong vignette count in the dataset test, resurrect a photo figure expectation in the check, wrong data-robot count) watching each fail; audit git diff --stat against the boundary; grep the built dist for the stuck vignette's animation scope hashes; view both dawn themes full-viewport at presentation distance
- depends on: t3, t5, t6
- covers: c1, h9, c8, h10, c11, h11, h13, c14, h14, c15, h15, h1
- acceptance:
  - node --test, astro build, and check-presentations.mjs all green; each check deliberately broken once, observed failing, restored
  - git diff audit: no article surface touched; outside the autonomy change set the only slide diff is the robotLabel string
  - the stuck vignette's animation selectors match elements in the built dist HTML (no dead CSS), and the trio reads as one visual family in both dawn themes at presentation distance

## Risks

- [unknown_nonblocking] the generic vignette robot may still read as specifically Reachy to the live audience — only observable at the talk itself (frame park v1); no build-time mitigation beyond the design-review pass
- [follow_up] the three surviving placeholder slates still await operator captures before the talk — an unchanged, operator-owned obligation this change reduces by one but cannot close
