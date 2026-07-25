# Delivery Summary — autonomy stuck vignette

plan: `autonomy-stuck-vignette` · run: `complete` · date: `2026-07-22`
baseline: `devague summary skeleton`

## Intent

Execute the converged autonomy-stuck-vignette plan: the deck's slide 5 ("The
robot continues without the agent") becomes a uniform trio of animated
site-palette vignettes — Stuck joins Disconnected and Routine — with the
so101-action photo slot deleted end-to-end, the slide robot-generic in visuals
and speech, and the close card retitled to SO-ARM101. Seven TDD-gated tasks
over three file-disjoint waves, fanned out by /assign-to-workforce.

## Planned Work

Quoted verbatim from the `devague summary` skeleton:

- `t1` — Rewrite the autonomy slide's dataset + co-located node test
  (TDD-first): Stuck drops robot/photoId, spokenLine goes robot-generic,
  DeckAutonomySituation loses its photo fields, photoSlotsByRobot.so101
  shrinks, robotLabel.so101 becomes 'SO-ARM101', header comment rewritten
- `t2` — Extend DeckSituationVignettes with the 'stuck' situation: union,
  COPY entry with full-scene desc, and an agent-link-active motif branch on
  the shared robot base
- `t3` — Delete the so101-action photo slot end-to-end: PhotoSlotId union
  member, photo record and photoBySlot entry, shot-brief row + narration in
  docs/presentation-photos.md, both placeholder webp files
- `t4` — Version bump (minor) + changelog entry for the autonomy-slide trio
  per the version-check CI gate
- `t5` — Rebuild the renderer's autonomy branch: three uniform
  DeckSituationVignettes cells, vignetteFor maps Stuck, photo conditional and
  orphaned .cell-photo CSS removed, autonomy arm of sectionRobot derivation
  dropped, header comment updated
- `t6` — Re-pin check-presentations.mjs to the trio contract: three photos,
  data-robot so101 once deck-wide, no so101-action in expectations, summary
  line updated
- `t7` — Full validation + design review: CI trio green, deliberate-break
  drill, diff audit against the boundary, animation-liveness in dist,
  both-theme presentation-distance review

## Actual Delivery

| Plan task | Status | What actually landed |
|-----------|--------|----------------------|
| `t1` | delivered | Test re-pinned first (2 assertions failed against main's dataset, proving the before-state), then dataset rewritten to 17/17: all three situations photo-free, spokenLine "When the robot gets stuck, …", `photoSlotsByRobot.so101 = ["so101-hero"]`, `robotLabel.so101 = "SO-ARM101"`. Commit `d192996`, merged `5bfb6c1`. |
| `t2` | delivered | `stuck` situation added to the vignette component: lit AGENT chip ("model live / adapting") with live dot, bright active link carrying a traveling pulse, obstacle barrier, three staggered probe scan arcs — all transform/opacity behind `prefers-reduced-motion: no-preference`, deterministic `vignette-stuck` ids. Commit `7683f75`, merged `e2a922e`. |
| `t3` | delivered | Slot removed from the `PhotoSlotId` union, `presentationPhotos`, and `photoBySlot` (remaining indices verified); shot-brief and alt-text rows removed from docs/presentation-photos.md ("three shots"); both webp placeholders `git rm`'d. Commit `63f8fbb`, merged `fd4d624`. |
| `t4` | delivered | 0.16.0 → 0.17.0 + Keep-a-Changelog entry; 56 pytest green. Commit `01f4e39`, merged `2f110cd`. |
| `t5` | delivered | Autonomy branch renders three vignettes unconditionally; `vignetteFor` maps stuck/routine/disconnected; autonomy `sectionRobot` arm and `.cell-photo` CSS removed; header updated. Dist contract verified: 3 vignettes (one each), 0 photo slots in section, no `data-robot` on section, `so101` ×1 / `reachy-mini` ×2 deck-wide; animation liveness proven by matching scope hashes in compiled CSS. Commit `d13759a`, merged `f26dd12`. |
| `t6` | delivered | All expectation constants re-pinned; new "deck autonomy trio" check added (3 vignettes, one each, 0 photo slots); explicit no-`data-robot`-on-autonomy assertion; summary line "3 captioned photos". Verified biting: 21/22 against the pre-t5 build with exactly the designed `vignette-stuck` failure, 22/22 after t5 merged. Commit `19eadc7`, merged `bfd09a6`. |
| `t7` | delivered | Run by the main agent on the merged branch: node test 17/17, astro build clean, check-presentations 22/22, pytest 56/56; deliberate-break drill on all three checks (each failed, restored); diff audit clean against the boundary; live-surface grep zero hits; both-theme screenshots reviewed at presentation distance (trio reads as one visual family, Stuck distinct). No commit — validation only, drills reverted. |

## Mid-work Decisions

No `/deviate` records exist for this run; the following were captured
directly:

- **h6's grep scoped to live surfaces.** The honesty condition's letter
  ("grep for so101-action returns zero hits across the repo") is
  unsatisfiable without rewriting committed history: the string legitimately
  survives in the historical records describing this very deletion
  (docs/specs, docs/plans, `.devague/` state, CHANGELOG.md). Delivered as:
  zero hits across live surfaces (site-astro src/public/scripts,
  docs/presentation-photos.md), records exempt. Surfaced to the operator
  mid-run before t3 executed; no objection raised.
- **Worktree paths `asv-*` instead of `agent-*`.** A stale root-owned
  `worktrees/agent-t3` directory from an unrelated July 5 run blocked the
  conventional path; this run's wave-2 worktrees used an `asv-` prefix. No
  plan impact; the debris is flagged under Remaining Work.
- **t5 repaired the t1 merge window's type debt.** Between t1's merge and
  t5's, the renderer held dangling `situation.photoId`/`situation.robot`
  references (type-level only; builds stayed green because astro build does
  not typecheck). t5's rebuild removed them, dropping `astro check` errors
  from 6 to 2 (the 2 remaining are pre-existing and unrelated).
- **t6 added a new check beyond re-pinning.** The "deck autonomy trio" check
  (three vignette figures, one each, zero photo slots) is new enforcement of
  h13, not a re-pin of an existing assertion — added so the built-HTML
  contract pins the trio positively rather than only by absence of photos.
- **Post-review naming-consistency fix (Qodo, PR #25).** Qodo's review
  flagged that the close card's heading (now "SO-ARM101" per q3) and its hero
  photo's alt/subject strings (still "SO-101") named the same robot two ways
  on one card. Fixed by renaming the photo metadata (`PhotoRobot` union,
  `subjectRobot`, subject/alt strings) and the shot-brief doc to SO-ARM101 —
  a deliberate extension of q3's "single robotLabel string" scope, applied
  only to deck-consumed photo metadata; the article surfaces keep their own
  hardware naming and stay byte-identical.

## Drift From Plan

| Plan item | Reason for divergence | Classification |
|-----------|-----------------------|----------------|
| `t3` | Acceptance criterion said "grep -rn 'so101-action' across the repo returns zero hits"; delivered as zero hits across live surfaces, with committed historical records (specs, plans, frame state, changelog) exempt — the records describe the deletion itself | acceptable |

No other task drifted: t1, t2, t4, t5, t6, t7 delivered to their confirmed
contracts per the task-by-task accounting above.

## Evidence

- tests: `site-astro/src/data/mind-nervous-system-body-slides.test.mjs` —
  17/17 pass (`node --experimental-strip-types --test`)
- checks: `node site-astro/scripts/check-presentations.mjs` — 22/22 pass
  ("Presentation contract passed: 22 checks across 12 pages … 3 captioned
  photos")
- tests: `uv run pytest -n auto` — 56 passed
- break drill: wrong `robotLabel` → node test 16 pass / 1 fail; wrong
  `expectedRobotSlideCounts.so101` → check 21/22; broken component reference
  → astro build failure; all three restored green
- lint: `markdownlint-cli2 CHANGELOG.md docs/presentation-photos.md` — 0
  errors
- grep: `grep -rln so101-action site-astro docs/presentation-photos.md` — 0
  files
- commits: `3e98fda..f26dd12` (spec, plan, 7 task commits, 6 merge commits)

## Delivery Claims

| Claim | Confidence | Evidence |
|-------|------------|----------|
| Slide 5 renders a uniform trio of three animated vignettes (stuck, disconnected, routine), no photo, no `data-robot` | high | commit `d13759a` · check "deck autonomy trio" 22/22 · dist counts in t5's merge record |
| The stuck motif's animations actually run in the built page (no dead CSS) | high | scope hash `data-astro-cid-*` matched between dist HTML elements and compiled CSS rules, all inside `prefers-reduced-motion: no-preference` |
| The so101-action slot is gone from every live surface; operator owes three pre-talk captures | high | commit `63f8fbb` · zero-hit grep · docs/presentation-photos.md "three shots" |
| The close card title reads "SO-ARM101"; slide 5 names no specific robot | high | commit `d192996` · node test 17/17 (pins both) |
| Deck-wide contract: `data-robot` reachy-mini ×2 / so101 ×1, three captioned photos, diagram once, verbatim thesis | high | check-presentations 22/22 on the merged branch |
| Every check bites when its expectation is broken | high | t7 break drill (three deliberate failures observed and restored) |
| The trio reads as one visual family in both dawn themes at presentation distance | medium | both-theme screenshots reviewed in-session (t7); design judgment, not machine-checkable |
| The article surfaces are byte-identical | high | diff audit `main...HEAD` — no article route, data, or check in the stat; article checks green in 22/22 |

## Remaining Work / Follow-up

- Open the final PR (human gate 3) and pass CI + SonarCloud — next step,
  operator-owned review.
- Three placeholder slates still await real operator captures before the talk
  (plan risk `r2`, reduced from four by this run).
- Whether the generic vignette robot reads as "any robot" to a live audience
  is observable only at the talk (plan risk `r1` / frame park `v1`, accepted
  by the user).
- Stale worktree debris outside this repo (`worktrees/agent-t3`, root-owned,
  July 5; `agent-t3.orphan-20260620`; old `agent/reachy-t*` branches) —
  optional cleanup, needs elevated permissions for the root-owned directory.
