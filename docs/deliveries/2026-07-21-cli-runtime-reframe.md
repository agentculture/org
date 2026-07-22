# Delivery Summary — cli-runtime-reframe

plan: `cli-runtime-reframe` · run: `complete` · date: `2026-07-21`
baseline: `devague summary skeleton`

## Intent

Execute the nine-task, four-wave plan that reframes the deck at
`/presentations/mind-nervous-system-body/` around the operational
architecture of org#21 — *a CLI for intelligence, a runtime for embodiment* —
for a technical roboticist audience in a 15–20 minute slot, fanned out by
`/assign-to-workforce` (five parallel worktree agents in wave 1, two in wave
2, one each in waves 3–4, TDD-gated merges by the main agent). The article
and its commit-pinned evidence ledger stay untouched.

## Planned Work

Quoted verbatim from the `devague summary` skeleton:

- `t1` — Rewrite the deck slide data to the CLI/runtime story (site-astro/src/data/mind-nervous-system-body-slides.ts)
- `t2` — Build the accessible five-layer architecture diagram component (new site-astro/src/components/ file)
- `t3` — Retitle the presentation card in site-astro/src/data/presentations.ts
- `t4` — Wire the presentation contracts into CI (.github/workflows/tests.yml site-build)
- `t5` — Version bump + changelog entry (pyproject.toml, CHANGELOG.md)
- `t6` — Render the new slide shapes in the deck page (site-astro/src/pages/presentations/mind-nervous-system-body.astro)
- `t7` — Rewrite the slides test contract (site-astro/src/data/mind-nervous-system-body-slides.test.mjs)
- `t8` — Update check-presentations.mjs and run the full local verify
- `t9` — Rehearsal and projection acceptance on the built deck

## Actual Delivery

| Plan task | Status | What actually landed |
|-----------|--------|----------------------|
| `t1` | delivered | 10-slide / 8-beat deck data (commit `51bc86a`): thesis verbatim on slide 2, four photo slots exactly once, design-rate 50 Hz, ROS aside, `[[react]]`/`[[inhibit]]` rules payload, verbatim command sequences, `deckSources` replacing per-slide evidence ids |
| `t2` | delivered | `CliRuntimeStackDiagram.astro` (commit `671cfa5`): accessible five-layer SVG, CLI/runtime emphasized, agent + robot drawn replaceable, direct CLI→device path, dotted feed/intent paths; compile-proofed via a throwaway `astro build` probe |
| `t3` | delivered | presentations[0] retitled "A CLI for intelligence, a runtime for embodiment" / "Robot operational architecture" (commit `3b3269f`); articles[0] and evidence ledger byte-identical |
| `t4` | delivered | `site-build` runs `check:presentations` + the slides test after `npm run build` (commit `949b17b`); proven live on PR #22's green run |
| `t5` | delivered | 0.15.0 + Keep-a-Changelog entry (commit `008ecfa`); `uv.lock` caught up in `6da2c23` |
| `t6` | delivered | Deck page renders opener/thesis/diagram/contrast/robot/commands/rules/close kinds (commit `65a2e65`); no-JS document behavior and `prefers-reduced-motion` gating preserved; `deckSources` close block |
| `t7` | delivered | 14-test contract (commit `e997e14`) incl. a verified deliberate-failure check; the old derive-from-article assertions removed |
| `t8` | delivered | Check script in lockstep (commit `9d305af`): retitled card, diagram presence, design-rate check, repo-home-only deck sources; article-side checks unchanged; negative proof (slide count 9 → exit 1) |
| `t9` | delivered | 1920×1080 screenshot review of all ten slides; two defects found and fixed in `6da2c23` (see Mid-work Decisions); timed run-through pending with the operator (see Remaining Work) |

## Mid-work Decisions

No `/deviate` records were needed; these were made inside task acceptance and
are captured here directly:

- t9's legibility review found the long `agent attach` invocation clipped
  off-screen in the commands block — a projected audience cannot scroll a
  `pre`. Fixed in `6da2c23`: each command is its own block-level `code` line
  wrapping with a hanging indent. Contracts re-verified after the fix.
- The exported spec tripped markdownlint MD045 (`no-alt-text`) on verbatim
  claim text naming a literal `<img>` element. Same machine-exported-artifact
  trap as the documented MD033 case; MD045 scoped off in
  `docs/.markdownlint.yaml` with the same reasoning (`6da2c23`) rather than
  hand-editing the exported artifact.
- `uv.lock` drifted when local tooling re-locked against t5's version bump;
  committed with the t9 fixes as it belongs to the bump.
- The robot photo slots render the repo's *intentional* placeholder art —
  `presentation-photos.ts` documents the swap-in-place contract for real
  captures. Observed at t9, deliberately not "fixed": out of this plan's
  scope (confirmed assumption c13).

## Drift From Plan

| Plan item | Reason for divergence | Classification |
|-----------|-----------------------|----------------|
| `t9` | Acceptance found two defects (clipped command line; MD045 on the exported spec) that the plan's tasks did not anticipate; both fixed by the main agent in `6da2c23` within the run rather than routed back to a task agent | acceptable |
| `t9` | The timed 15–20 minute run-through (honesty condition h21) requires the human operator and remains open at summary time; the artifact does not claim it done | needs-follow-up |

No other task drifted: t1–t8 merged as contracted, verified by the per-task
accounting above.

## Evidence

- tests: `node --experimental-strip-types --test src/data/mind-nervous-system-body-slides.test.mjs` — 14/14 pass
- tests: `uv run pytest -n auto` — 56 passed
- contract: `npm run check:presentations` — 20/20 checks pass; negative proof (expectedDeckSlideCount=9) fails with exit 1
- lint: `black --check` / `isort --check-only` / `flake8` / `bandit` / `markdownlint-cli2` / `teken cli doctor . --strict` — all pass
- article-unchanged proof: `git diff main -- site-astro/src/data/mind-nervous-system-body.ts site-astro/src/pages/articles/mind-nervous-system-body.astro site-astro/src/components/MindNervousSystemBodyDiagram.astro` — empty
- commits: `854bfe7..6da2c23` (20 commits on `cli-runtime-reframe`; task commits `51bc86a`, `671cfa5`, `3b3269f`, `949b17b`, `008ecfa`, `65a2e65`, `e997e14`, `9d305af`)
- PRs / issues: PR #22 (all 7 CI checks green, incl. the newly wired contract steps; 0 unresolved threads) · issue #21
- screenshots: ten 1920×1080 captures of the built deck, reviewed slide by slide (session artifact, shared with the operator)

## Delivery Claims

| Claim | Confidence | Evidence |
|-------|------------|----------|
| The deck leads with the CLI/runtime architecture in ≤8 beats with the thesis on slide 2 | high | test file `site-astro/src/data/mind-nervous-system-body-slides.test.mjs` (14/14) · commit `51bc86a` |
| The five-layer architecture diagram is present, accessible, and never conflates runtime with daemon | high | file `site-astro/src/components/CliRuntimeStackDiagram.astro` · check "accessible architecture diagram on the deck" (20/20 run) |
| 50 Hz is stated only as a design rate, deck-wide | high | slides test assertion 8 · check-presentations design-rate check · PR #22 |
| The deck contracts gate in CI and genuinely fail on regression | high | PR #22 green `site-build` · negative proof (slide count 9 → exit 1) |
| The article and its pinned evidence ledger are untouched | high | empty `git diff main` over the three article files · check-presentations article checks unchanged |
| The presentation card is retitled; the article card is not | high | commit `3b3269f` · presentations-index card check (20/20 run) |
| Every slide is legible when projected at 1920×1080 | medium | ten screenshots reviewed by the main agent after the `6da2c23` wrap fix — no automated legibility metric exists |
| The deck can be spoken to a roboticist audience inside 15–20 minutes | unverified | timed run-through (h21) not yet performed — not claimed done |

## Remaining Work / Follow-up

- `t9` (timed run-through, h21) — the operator reads the built deck aloud
  against a timer (the PR #22 deploy preview works for this) before or during
  the final PR review. Owner: operator.
- Real robot photographs — replace the four placeholder `.webp` files in
  `site-astro/public/presentations/` in place when the photo shoot happens;
  zero code change required (`presentation-photos.ts` documents the
  contract). Owner: operator; pre-existing, not introduced by this run.
- Venue behavior (projector color/contrast, offline fallback via
  `npm run preview`) — parked as non-blocking `v1` on the frame; untestable
  from this repo. Owner: operator, at the venue.
- Exporter-side escaping of verbatim claim text (the MD033/MD045 family) —
  follow-up owed to `agentculture/devague`, tracked in
  `docs/.markdownlint.yaml`'s comments.
