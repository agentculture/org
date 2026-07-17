# Delivery Summary — the reachy-mini-cli page

plan: `the-reachy-mini-cli-page` · run: `complete` · date: `2026-07-17`
baseline: `devague summary skeleton`

## Intent

Ship `/agents/reachy-mini-cli` on AgentCulture.org — the physical-embodiment
leg of the agents family, presenting the Reachy Mini operator CLI (the noun
map, the single-SDK-owner model, real live-robot captures) — by executing the
converged 7-task, 5-wave plan via /assign-to-workforce: one agent per task in
isolated worktrees, TDD-gated merges, hardware work operator-run.

## Planned Work

Quoted verbatim from the `devague summary` skeleton:

- `t1` — Run the live capture batch on the rig (operator/main-agent task —
  drives hardware and mutates the rig; never a worktree subagent)
- `t2` — Author src/data/reachy-mini-cli-captures.ts from the raw transcripts
- `t3` — Author src/data/reachy-mini-cli.ts — the page's full content model
- `t4` — Build ReachyTerminal.astro — the page's own replay component
- `t5` — Build ReachyDiagram.astro — the single-SDK-owner model diagram
- `t6` — Compose pages/agents/reachy-mini-cli.astro and flip the site.ts entry
- `t7` — Integrate, gate, and ship the PR

## Actual Delivery

| Plan task | Status | What actually landed |
|-----------|--------|----------------------|
| `t1` | delivered | 15 verbatim transcripts on the rig (scratchpad `captures/00-13`, CLI 0.31.0): whoami, quickstart, doctor, device status/state, move wake, say TTS-refusal + harmonic, 79-tick listen run, two bounded think runs (0 spoken turns — the documented empty-buffer no-op), think demo (3 gestures / 3 phrases), expression catalog, pre/post service status. Live presence unit restored to active after the batch. |
| `t2` | delivered | `site-astro/src/data/reachy-mini-cli-captures.ts` (555 lines, 14 panes: 13 fresh-run + 1 ported) — commit `63e7f7d`; verbatim-ness mechanically spot-verified twice (author + independent validator). |
| `t3` | delivered | `site-astro/src/data/reachy-mini-cli.ts` (562 lines, 10 sections, all copy source-traceable, what's-next cites 14 real open issues) — commit `c20a24a`, corrected by `44a72e7` (see drift). |
| `t4` | delivered | `site-astro/src/components/ReachyTerminal.astro` (404 lines) — commit `45ce6f5`; the `:global()` animation pattern proven alive against built dist output (the LobesTerminal dead-CSS failure mode explicitly checked). |
| `t5` | delivered | `site-astro/src/components/ReachyDiagram.astro` (347 lines, inline SVG of the single-SDK-owner model, theme-token colors, reduced-motion gated) — commit `bbd778c`. |
| `t6` | delivered | `site-astro/src/pages/agents/reachy-mini-cli.astro` (634 lines) + one-line `site.ts` url flip — commit `284f3d9`; build went 7 → 8 pages; all 14 panes rendered exactly once (mechanical export/import/usage check). |
| `t7` | delivered (merge pending) | Version 0.11.0 → 0.12.0 + changelog (`121c62b`); full gate battery green; PR #17 open with Sonar quality gate passed, Qodo 0 bugs / 0 violations / 0 gaps, 0 unresolved threads. Human merge + post-merge URL check remain. |

## Mid-work Decisions

No `/deviate` records were needed — no confirmed-plan item was departed from.
Mid-run decisions not in the plan, captured directly:

- Previous runs' stale `agent/t1..t6` branches (squash-merged in PR #14, tips
  not ancestors of main) collided with the fan-out naming convention — this
  run used `agent/reachy-tN` branch names instead of deleting another run's
  branches unilaterally.
- An external actor upgraded the rig's CLI 0.28.2 → 0.31.0 at 03:13 (binary
  mtime), minutes before t1 would have done it per the q1 decision, and left
  `reachy-live.service` stopped. t1 verified `uv tool upgrade` had nothing to
  do, and treated the (already-inactive) presence unit accordingly.
- t1 restored `reachy-live.service` to **active** after the batch — more
  active than the (externally stopped) pre-batch state — matching the unit's
  `enabled` standing config and the session-start state rather than the
  literal batch-start snapshot.
- Live think cognition never fired (quiet room ⇒ empty event buffer ⇒ no-op
  turns, even with a speech WAV played at the mic) — pre-recorded as plan risk
  `r1`; the frame's confirmed fallback decision c24 applied: cognition content
  is the ported `docs/verification/think-body-expression.md` pane. Not drift —
  the plan contained this path.
- The say TTS run failed (endpoint down); the clean `error:`/`hint:` refusal
  was kept as a page pane and the offline harmonic engine used for real audio.
- The pre-PR `ask-colleague review` reflex failed twice on the local backend
  (drives `16338ec0e844`, `34056f6b3fc3` — incomplete, malformed tool-call
  output; echoes reachy-mini-cli#41). Substituted a fresh-context read-only
  validator subagent, which found two real copy over-claims (see drift).

## Drift From Plan

| Plan item | Reason for divergence | Classification |
|-----------|-----------------------|----------------|
| `t3` | Two rendered-copy over-claims survived the task's own gate: a fabricated "automatic TTS→harmonic fallback" (0.31.0 ships no runtime engine switch; the two captures were separate invocations) and an unconditional "comes back on its own after a restart" contradicted by open issues #21/#62. Caught by the post-build validation pass; fixed by the operator at the merge gate in `44a72e7`. | acceptable |
| `t7` | "Merges green + post-merge URL responds" cannot complete until the human merges PR #17 — the gate itself is the human's. | needs-follow-up |

No other task drifted; the task-by-task accounting above is contract-exact.

## Evidence

- tests: `uv run pytest -n auto` — 56 passed
- lint: `black --check` / `isort --check-only` / `flake8` / `bandit` — all pass
- lint: `markdownlint-cli2` (28 files) — 0 errors
- rubric: `uv run teken cli doctor . --strict` — PASS (exit 0)
- build: `npm run build` — 8 pages (was 7); `dist/agents/reachy-mini-cli/index.html` present; agents index links `/agents/reachy-mini-cli/`
- commits: `2914428..44a72e7` (branch `feat/agents-reachy-mini-cli-page`)
- PRs / issues: PR #17 (Sonar gate passed, Qodo 0/0/0, 0 unresolved threads); reachy-mini-cli tracker issues cited in copy verified open on 2026-07-17
- raw capture transcripts: session scratchpad `captures/00-13` (ephemeral; verbatim-ness verified against them twice before they age out)

## Delivery Claims

| Claim | Confidence | Evidence |
|-------|------------|----------|
| The page exists, builds, and is linked from the agents index | high | commit `284f3d9` · build 7→8 pages · dist grep of the index link |
| Every capture pane replays a real session, labeled fresh-run or ported, no invented lines | high | commit `63e7f7d` · two independent line-level verifications (t2 author + validator, incl. `listenRun`, `quickstart`, `thinkPorted` full-pane checks) |
| The replay animation is alive in the built page (not the LobesTerminal dead-CSS bug) | high | commit `45ce6f5` · dist CSS/markup selector-match proof in the t4 report |
| Rendered copy claims no capability 0.31.0 does not ship | high | validator pass (2 blockers found → fixed in `44a72e7`; re-checked sections otherwise clean) |
| The diagram asserts only documented single-SDK-owner relationships | high | commit `bbd778c` · t5 edge-by-edge check against `operating-reachy.md`'s mermaid + conflict matrix |
| Reduced motion honored; animations opacity/transform only | medium | t4/t5 built-CSS brace-matched checks + sibling-pattern reuse; not re-audited page-wide by a second party |
| The page is live on agentculture.org | unverified | PR #17 unmerged — not claimed done |

## Remaining Work / Follow-up

- `t7` tail: human merges PR #17, Cloudflare Pages deploys, then verify
  `https://agentculture.org/agents/reachy-mini-cli/` responds and the index
  links it (honesty conditions h14/h6 close then).
- Upstream bug found during t1, worth filing on agentculture/reachy-mini-cli:
  `think run` leaks a raw `KeyboardInterrupt` traceback on Ctrl-C/SIGINT
  during its sleep (`reachy/speech/cognition.py:541`) — violates the
  no-traceback contract `explain think` promises. Not filed yet (operator
  approval for the outward post pending).
- The colleague review backend is emitting malformed tool calls (two
  incomplete drives this run) — worth a look alongside reachy-mini-cli#41.
- Pre-existing, out of scope, unchanged: stale `agent/t1..t6` branches from
  PR #14's squash merge; the uncommitted `devague-page-six-leg-update.json`
  delivery record; the `Layout.astro` fontsource `astro check` error; the
  LobesTerminal inert-animation fix (plan risk `r4`, deliberate follow-up).
