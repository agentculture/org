# autonomy stuck vignette

> The deck's autonomy slide reads as three matching vignettes: Stuck joins Disconnected and Routine as an animated site-palette SVG, and the photo cell is gone
> instruction: rewrite dataset, vignette component, renderer, node test, and check-presentations.mjs together as one change; verify with 'node --experimental-strip-types --test', 'astro build', and 'node scripts/check-presentations.mjs' all green before opening the PR

## Audience

- same as the parent deck: live-talk audiences and self-guided /presentations/ visitors — slide 5 must now read as one visual family of three situation cards, declarative at presentation distance
  - instruction: view the built autonomy slide full-viewport without the spokenLine: three matching vignette cards, each caption reading label → outcome, must communicate alone

## Before → After

- Before: Before: the Stuck cell renders the so101-action placeholder slate (no real photograph exists in the repo) beside two animated SVG vignettes; the node test pins stuck.photoId === 'so101-action' and check-presentations.mjs pins that figure inside the autonomy section and four photos deck-wide
  - instruction: verify against main before rewriting: the placeholder slate renders on slide 5's Stuck cell and both pins hold
- After: After: slide 5 is a uniform animated trio — Stuck, Disconnected, Routine operation — three site-palette DeckSituationVignettes with label → outcome captions; no photo figure, no data-robot on the section, and no so101-action slot anywhere in the repo
  - instruction: check the built HTML: the autonomy section contains three vignette svgs, zero <figure data-photo-slot>, and no data-robot attribute

## Why it matters

- the slide's message is the three situations, not a photograph — a matching trio reads as one symbol; it also removes the risk of a gray placeholder slate on the wall if pre-talk captures slip, and cancels one of the operator's four owed photographs
  - instruction: design-review the built trio at presentation distance in both dawn themes: three cards, one visual language, stuck clearly distinct from disconnected

## Requirements

- DeckSituationVignettes.astro gains a third situation 'stuck' — extend the Situation union, COPY map, and add a stuck motif branch, keeping the shared robot base, deterministic vignette-stuck ids (PR #24 review), role=img + aria-labelledby, and transform/opacity animation gated behind prefers-reduced-motion: no-preference
  - instruction: extend the Situation union and COPY map with 'stuck' and add its motif branch beside the existing two; keep the shared robot base, the deterministic vignette-stuck id, role=img + aria-labelledby; transform/opacity animation only, behind prefers-reduced-motion: no-preference; check both dawn themes
  - honesty: the built page's stuck vignette actually animates in the dist HTML (scoped-style hashes reach the animated elements — the lobes lesson), renders exactly once, and carries a full-scene desc narration matching the depth of disconnected's and routine's
- mind-nervous-system-body-slides.ts: the autonomy slide's Stuck situation drops photoId so all three situations render photo-free; the file-header photo-slot map (four slots exactly once, so101-action on Stuck) is rewritten to match
  - instruction: drop robot and photoId from the Stuck situation, remove the orphaned optional fields from DeckAutonomySituation, shrink photoSlotsByRobot.so101, and rewrite the header comment to match
  - honesty: no autonomy situation carries robot or photoId, the now-consumer-less robot?/photoId? fields are gone from DeckAutonomySituation, photoSlotsByRobot.so101 equals ['so101-hero'], and the file-header photo-slot map tells the three-slot story
- mind-nervous-system-body-slides.test.mjs re-pins: the slide-5 test asserts all three situations photo-free (today it pins stuck.photoId === so101-action), and the photo-discipline test's exactly-once-over-all-slots contract changes with the slot decision
  - instruction: rewrite the slide-5 test to assert all three situations photo-free and the photo-discipline test to cover exactly the three remaining slots; keep the design-rate and no-commit-hash checks untouched; watch the re-pinned assertions fail before touching the dataset
  - honesty: the re-pinned test file fails against main's dataset and passes against the new one, while still pinning slide count and order, kind/shape agreement, the verbatim thesis on the close slide, the 4-sentence spokenLine cap, and the ARM101 honesty phrasing
- check-presentations.mjs re-pins its built-HTML deck checks: expectedPhotoSlotSections drops so101-action→autonomy, 'four robot photos with alt text' and the '4 captioned photos' summary become three, and the data-robot=so101 twice-deck-wide count follows the section-anchor decision
  - instruction: re-pin expectedSectionRobots to surfaces-only, expectedRobotSlideCounts.so101 to 1, drop so101-action from expectedPhotoSlotSections and deckImagePaths, and update the 'four robot photos' check plus the '4 captioned photos' summary line to three
  - honesty: check-presentations.mjs passes against the built dist with the re-pinned expectations (three photos with alt text, data-robot so101 exactly once deck-wide, no so101-action anywhere) and still fails on a deliberately broken build
- mind-nervous-system-body.astro's autonomy branch renders three DeckSituationVignettes cells — vignetteFor() extends to map Stuck, the per-cell photo conditional goes (or goes dead), and the sectionRobot derivation from situations.find(s => s.robot) follows the anchor decision
  - instruction: render all three autonomy cells as DeckSituationVignettes (remove the photo conditional and the now-orphaned .cell-photo CSS rules), extend vignetteFor to map Stuck, drop the autonomy arm of the sectionRobot derivation, and update the renderer's file-header slide map; keep the reveal cadence and the label → outcome caption layout
  - honesty: the built autonomy section stamps no data-robot, contains three vignette svgs and zero <figure data-photo-slot>, and the presenter affordances — ArrowRight/ArrowDown advance, prev/next controls, dot-rail scroll-spy, reduced-motion instant jumps — still work across all six slides
- the so101-action photo slot is deleted end-to-end: the PhotoSlotId union member, its photo record and photoBySlot entry in presentation-photos.ts, photoSlotsByRobot.so101 shrinking to ['so101-hero'], the shot-brief row and narration in docs/presentation-photos.md, both placeholder files (so101-action.webp, so101-action-thumb.webp) in public/presentations/, and the check's deckImagePaths entries
  - instruction: after the change, grep -rn 'so101-action' across the repo returns zero hits and astro build stays green
  - honesty: grep -rn 'so101-action' across the repo returns zero hits, the three surviving slots keep the drop-in contract byte-identical, and docs/presentation-photos.md reads as three owed captures
- slide 5 goes fully robot-generic in speech as well as visuals: the autonomy spokenLine's first clause becomes 'When the robot gets stuck, …' (dropping the SO-101 name), so the trio shows one generic robot in three situations and the deck's only specific-robot naming lives on the close slide
  - instruction: edit only the first clause of the autonomy spokenLine; the sentence count stays within the 4-sentence cap and the other two clauses stay verbatim
  - honesty: the shipped slide 5 — on-slide text, captions, spokenLine, and the stuck vignette's aria narration — names no specific robot, and grep for 'SO-101' in the dataset hits only the robotLabel map (still used by the close card)
    - instruction: q3 amendment: after the SO-ARM101 retitle, the dataset grep for the display string 'SO-101' returns nothing at all — slide 5 names no robot and the close card carries the bridged product name
- per q3: robotLabel.so101 becomes 'SO-ARM101', rendering only in the close card's on-screen title — a one-string dataset edit; every other close-slide byte stays untouched
  - instruction: edit the single robotLabel string; verify the built close card title reads 'SO-ARM101' and nothing else on the close slide changes
  - honesty: the built close card title reads 'SO-ARM101' and the display string 'SO-101' no longer appears anywhere in the deck's rendered text — the lowercase so101 identifier (robot id, data-robot, photo slot) rightly remains

## Honesty conditions

- the shipped PR is one change carrying dataset, vignette component, renderer, node test, and check-presentations.mjs together, and all three checks pass green on it
- the PR's git diff touches no article surface, and outside the autonomy change set the only deck-slide diff is the single robotLabel string per q3
- read without the spoken track, each of slide 5's three cards communicates label → outcome alone at presentation distance
- verified on main before rewriting: the stuck.photoId pin and the four-photo built-HTML check hold, and the Stuck cell renders the placeholder slate
- the built autonomy section contains exactly three vignette svgs, zero photo figures, and no data-robot attribute, and a repo-wide grep for so101-action is empty
- the built trio reads as one visual family in both dawn themes, and no gray placeholder slate remains anywhere in the published deck
- each of the three checks was deliberately broken once and observed failing before merge, then restored green

## Success signals

- node --test, astro build, and check-presentations.mjs all pass with the re-pinned three-vignette expectations, and the published autonomy slide renders the matching trio
  - instruction: before merging, deliberately break one re-pinned expectation per check (wrong vignette count, resurrect a photo figure, wrong data-robot count), watch each fail, then restore

## Scope / boundaries

- the other five slides, CliRuntimeStackDiagram, the surfaces slide's reachy-mini-action photo, both close-slide hero photos, and every article surface stay byte-identical — this is an autonomy-slide-only change per the deck-is-not-the-article check
  - instruction: one carved exception per q3: the single robotLabel.so101 string becomes 'SO-ARM101', rendering in the close card title — beyond that string, slides 1-4 and 6, the diagram, the surfaces photo, both hero photos, and every article surface stay byte-identical

## Non-goals

- no new photo slot and no new photography obligation: the change only ever shrinks the docs/presentation-photos.md drop-in contract, never extends it

## Scope exploration

- `s1` — `docs/specs/2026-07-22-deck-six-slide-narrative.md`: the current slide-5 imagery is a resolved user decision (q3: so101-action on the Stuck cell, SVG vignettes for the other two) with photo discipline 'all four slots exactly once'; s14 records that no real robot photograph exists in the repo — all four webp are placeholder slates, real captures operator-owed pre-talk
  - seeds: `c10`, `c9`
- `s2` — `site-astro/src/components/deck/DeckSituationVignettes.astro`: 522-line component with a Situation union of exactly 'disconnected' | 'routine', a COPY map, a shared lit robot base, per-situation motif branches, deterministic vignette-<situation> ids, and reduced-motion-gated transform/opacity animation — a third 'stuck' situation is an additive extension of each
  - seeds: `c2`, `c7`
- `s3` — `site-astro/src/data/mind-nervous-system-body-slides.ts`: the autonomy slide's situations carry robot+photoId only on Stuck (lines 236-241); the file header documents the four-slot exactly-once map with so101-action on autonomy's Stuck; DeckAutonomySituation marks robot/photoId as present only on the photo-bearing situation
  - seeds: `c3`
- `s4` — `site-astro/src/data/mind-nervous-system-body-slides.test.mjs`: pins stuck.photoId === 'so101-action' (line 127), the other two situations photo-free, and a photo-discipline test asserting every slot in photoSlotsByRobot is used exactly once — both re-pin with the change; the slot-fate decision (q1) decides whether photoSlotsByRobot itself shrinks
  - seeds: `c4`
- `s5` — `site-astro/scripts/check-presentations.mjs`: asserts expectedPhotoSlotSections['so101-action']='autonomy', data-robot per robot exactly twice deck-wide, 'deck imagery: four robot photos with alt text' over deckImagePaths, and a '4 captioned photos' summary line — every one re-pins; the data-robot count depends on the anchor decision (q2)
  - seeds: `c5`
- `s6` — `site-astro/src/pages/presentations/mind-nervous-system-body.astro`: the autonomy branch conditionally renders a <figure data-photo-slot> for the photo-bearing situation and DeckSituationVignettes otherwise, via vignetteFor() mapping only 'disconnected'|'routine'; sectionRobot (the data-robot stamp) derives from situations.find(s => s.robot) — all three constructs move with the change
  - seeds: `c6`
- `s7` — `site-astro/src/data/presentation-photos.ts + docs/presentation-photos.md + site-astro/public/presentations/`: so101-action is a first-class PhotoSlotId with a shot-brief row and two placeholder webp files (so101-action.webp + thumb) under the drop-in contract 'real photo saved over the same filename'; orphaning it needs an explicit fate decision (q1)
  - seeds: `c9`
- `s8` — `the untouched deck surfaces (slides 1-4, 6; CliRuntimeStackDiagram; article route + checks)`: the reframe is confined to the autonomy slide: surfaces keeps reachy-mini-action, close keeps both heroes, the diagram embeds once on stack, and check-presentations' article checks enforce deck-is-not-the-article — none of these change
  - seeds: `c8`
- `s9` — `SO-101 naming across deck surfaces`: grep shows 'SO-101' in exactly one deck string — the autonomy spokenLine (slides.ts line 234); robotLabel.so101='SO-101' remains consumed by the close card, and neither the node test nor check-presentations.mjs pins the SO-101 mention — the rename is a one-clause edit with no check fallout
  - seeds: `c17`
- `s10` — `challenge pass / adjacent-systems lens: presentations index.astro + photo-module consumers`: the index card consumes only photoBySlot['reachy-mini-hero'] and ['so101-hero'] thumbs; repo-wide, presentation-photos is imported by exactly the deck page, the index, and the two data modules — so101-action's deletion has no consumer outside the deck page and the photos module
  - seeds: `c16`
- `s11` — `challenge pass / adjacent-systems lens: robotLabel + close-card naming`: card-name renders robotLabel.so101='SO-101' on-screen (renderer line 374) while the close command reads 'arm101 arm flex --apply', the spokenLine says ARM101, and deckSources says 'ARM101 CLI'; after c17, the close card title is the deck's only visible SO-101 — seeded q3; no test or check pins the title string
  - seeds: `c17`
- `s12` — `challenge pass / hidden-dependency lens: autonomy branch CSS`: the .cell-photo rules (renderer ~867, 876) orphan once the photo figure goes — folded their removal into c6's instruction; .autonomy-cell/.autonomy-figure survive for the three uniform vignette cells
  - seeds: `c6`
- `s13` — `challenge pass / lifecycle + deep-links lens: slide ids and the spoken cap`: all six slide ids are unchanged (autonomy stays autonomy), so deep-link anchors survive and the no-_redirects policy is untouched; the edited spokenLine counts 2 sentences against the 4-sentence cap
  - seeds: `c17`
- `s14` — `challenge pass / security, migration, concurrency, reversibility lenses: the deck surfaces`: clean pass: prebuilt static HTML, no runtime state, no auth, no data store; the only deletions are two placeholder webp files, single-PR revertable via git; no c19 escalation signal applies — residual risk on these surfaces is unobserved, not eliminated
- `s15` — `challenge pass / observability + rollback + visual-weight lenses`: observability is the CI trio with c15's deliberate-break drill; rollback is git revert + operator redeploy via cultureflare (a recorded constraint); the parent spec's every-slide-carries-a-visual bar still holds — slide 5 joins slides 1-3 as illustration-led while photos remain on slides 4 and 6
  - seeds: `c15`
