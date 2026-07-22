# Delivery Summary — deck-six-slide-narrative

plan: `deck-six-slide-narrative` · run: `complete` · date: `2026-07-22`
baseline: `devague summary skeleton`

## Intent

Execute the converged deck-six-slide-narrative plan: restructure the
mind–nervous-system–body deck from 10 slides / 8 beats to issue
[#23](https://github.com/agentculture/org/issues/23)'s six visual, declarative
slides — one hero line per slide, technical nuance moved to the spoken track,
the architecture diagram kept, and a dual-maturity close (Reachy Mini working,
ARM101 honestly in progress) — via a 7-task workforce fan-out in three
file-disjoint waves, every merge TDD-gated, closing at PR
[#24](https://github.com/agentculture/org/pull/24).

## Planned Work

Quoted verbatim from the `devague summary` skeleton:

- `t1` — Rewrite the slide dataset and its co-located node test, test-first: six slides per issue 23
- `t2` — Relabel the architecture diagram's runtime layer: 'ROS 2 or native'
- `t3` — Author the deck's new visual elements as standalone theme-aware components (bridge illustration, three path glyphs, situation vignettes)
- `t4` — Version bump and changelog entry for the deck restructure PR
- `t5` — Rebuild the deck renderer for the six-slide layouts (columns, labeled image, situation triptych, dual-robot close)
- `t6` — Re-pin check-presentations.mjs to the six-slide built contract
- `t7` — Full validation and design-review pass over the assembled branch

## Actual Delivery

| Plan task | Status | What actually landed |
|-----------|--------|----------------------|
| `t1` | delivered | Six-slide dataset (`bridge, paths, stack, surfaces, autonomy, close`) + test re-pin, proper red→green TDD (12 failures against the old dataset first, then 17/17). Commit `13cbabb`, merged `b7d2724`. |
| `t2` | delivered | Exactly two strings changed in `CliRuntimeStackDiagram.astro`: runtime sub-label gains "ROS 2 or native", `<desc>` narration updated. Commit `9f33ca9`, merged `be16d59`. |
| `t3` | delivered | Three new components under `site-astro/src/components/deck/` (bridge illustration, path glyphs, situation vignettes), theme-aware, reduced-motion-gated, scope-verified live CSS. Commit `ae8f8be`, merged `9fe7337`. |
| `t4` | delivered | 0.15.0 → 0.16.0 + Keep-a-Changelog entry; version-check CI green. Commit `3ea2d50`, merged `7620f54`. |
| `t5` | delivered | Renderer rebuilt for the six layouts (+768/−234), presenter affordances preserved, HTML contract verified against built dist. Commit `dc34c07`, merged `bbec417`. |
| `t6` | delivered | check-presentations re-pinned (count 6, id order, robot/photo pairing, thesis scoped to close); pins proven to bite against the stale renderer (17/21 pass, exactly the 4 expected deck failures) before the renderer merge turned it 21/21. Commit `b765997`, merged `0262ba9`. |
| `t7` | delivered | Full validation: trio + pytest green, three-way deliberate-break drill, diff audit clean, design review with 24 headless-chromium screenshots. **Zero fixes needed — no commits** (branch tip unchanged). |

## Mid-work Decisions

- Worktree home moved mid-run to `/home/spark/git/.worktrees.org/<name>/` per
  operator instruction; wave 1 finished in the old `../worktrees/` path since
  its agents were already live. A stale root-owned `agent-t3` directory in the
  shared path had already forced an alternate worktree name — exactly the
  collision the new convention prevents.
- `t3` renamed its build-verification temp page (`__t3-check.astro` →
  `t3check.astro`): underscore-prefixed Astro pages silently don't route, so
  the briefed name would have "verified" nothing. Deleted before commit.
- `t1` kept the `beat` field (contiguous 1–6): the interface still declares
  it and removal wasn't mandated.
- `t6`'s merge was deliberately held until after `t5` so its green gate ran
  against the new renderer, not the stale one.
- Post-review (Qodo bug 1 on PR #24): random SVG accessibility ids fixed
  **across all three deck components**, not just the flagged `DeckPathGlyphs` —
  the same `Math.random()` idiom made every `astro build` emit different dist
  output. Commit `a2ddd8a`; two consecutive builds now byte-identical.
- `astro check`'s aria-hidden string-vs-boolean nit in `DeckPathGlyphs` judged
  cosmetic (emitted HTML is the correct `aria-hidden="true"`) and left as-is.

## Drift From Plan

No drift — all seven tasks delivered per their confirmed contracts, backed by
the task-by-task accounting above. No `devague deviate` records exist for this
plan (`devague deviate --list`: none). The post-review deterministic-ids fix
was work the plan never contained (surfaced by PR review), recorded above as a
mid-work decision, not a divergence from any task's contract.

## Evidence

- tests: `site-astro/src/data/mind-nervous-system-body-slides.test.mjs` — 17 pass / 0 fail (node `--experimental-strip-types --test`)
- tests: `uv run pytest -n auto` — 56 passed
- checks: `node site-astro/scripts/check-presentations.mjs` — 21/21 against the built dist
- break drill (t7): thesis removed → node test fails; diagram embed removed → check-presentations fails; expectedDeckSlideCount=7 → check-presentations fails; all restored, tree clean
- determinism: two consecutive `astro build` runs byte-identical after `a2ddd8a`
- diff audit (t7): 15 files in `main...HEAD`, none touching article surfaces, the photo pipeline, or the presentations index
- commits: `3ce376f..a2ddd8a` (spec → challenge → plan → 7 task/merge commits → pointers → review fix)
- PRs / issues: PR [#24](https://github.com/agentculture/org/pull/24) · closes [#23](https://github.com/agentculture/org/issues/23)
- CI on #24: deploy, test, lint, site-build, version-check, GitGuardian, SonarCloud — all green; Sonar quality gate passed; Qodo review: 1 bug (fixed, replied), 0 rule violations
- design review (t7): 24 screenshots — six slides × 1440px / 390px / dark / reduced-motion (session artifacts; four shared with the owner)

## Delivery Claims

| Claim | Confidence | Evidence |
|-------|------------|----------|
| The deck at `/presentations/mind-nervous-system-body/` renders exactly issue #23's six slides, in order, with the dual-maturity close | high | check-presentations 21/21 · test file 17/17 · PR `#24` |
| The thesis "A CLI for intelligence. A runtime for embodiment." is the close slide's final line, pinned by test and built-HTML check | high | commit `13cbabb` · check "deck states the thesis verbatim, on the close slide" |
| The architecture diagram survives untouched except the "ROS 2 or native" runtime label | high | commit `9f33ca9` (2 hunks) · t7 diff audit |
| The enforcement trio bites — each check fails when its expectation is deliberately broken | high | t7 break drill (3 breaks → 3 expected failures → clean restore) |
| Spec boundaries held: article, photo pipeline, and presentations index untouched | high | t7 diff audit file list over `main...HEAD` |
| Builds are deterministic (byte-identical consecutive dist output) | high | commit `a2ddd8a` · double-build diff |
| The deck meets the "fun yet informative", visual-first, reduced-motion-safe bar | medium | t7 design review + 24 screenshots (session artifacts — reproducible via `astro preview`; not committed) |
| The deck presents well on a physical 16:9 projector at the venue | unverified | (no evidence — not claimed; see follow-ups) |

## Remaining Work / Follow-up

- **Real photographs** (plan risk `r1`, owner deliverable): shoot and export
  real Reachy Mini + SO-101 captures over the placeholder filenames before the
  talk — shot brief `docs/presentation-photos.md`, drop-in, zero code changes.
- **Close-slide height** (t7 finding, non-blocking): at 1440×900 the thesis
  sits near the bottom edge and the sources footer is below the fold — a
  touch tight for a 16:9 projector; consider tightening before the talk.
- **Mobile horizontal scroll** (t7 finding, non-blocking): the bridge
  illustration and stack diagram scroll horizontally at 390px, so the
  bridge's robot payoff is off-screen on phones without a swipe.
- **Offline-venue fallback** (frame park `v1`, undecided): the built dist
  serves locally via `astro preview`; decide whether to prepare and rehearse
  that path before the talk.
- **Slide-6 spoken cap** (plan risk `r2`): the close spokenLine sits at
  exactly the 4-sentence cap — any copy edit there trips the test by design.
