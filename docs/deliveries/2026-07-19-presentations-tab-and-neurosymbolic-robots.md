# Delivery Summary — Presentations tab and neurosymbolic robots

plan: `presentations-tab-and-neurosymbolic-robots` · run: `partial` · date: `2026-07-19`
baseline: `devague summary skeleton`

## Intent

Deliver the confirmed Presentations tab and its first card-driven, static talk:
an evidence-grounded explanation of Reachy Mini and ARM101 through the thesis
“The agent is the mind. The code is the nervous system. The robot is the body.”
The run executed the eight-task plan exported at
`docs/plans/2026-07-19-presentations-tab-and-neurosymbolic-robots.md`.

## Planned Work

Quoted verbatim from the `devague summary` skeleton:

- `t1` — Define the typed presentation catalog and immutable evidence ledger
- `t2` — Add section-aware Presentations wayfinding
- `t3` — Author the sourced eight-beat Mind, nervous system, body narrative
- `t4` — Build the accessible mind–nervous-system–body architecture diagram
- `t5` — Build the reusable Presentations card index
- `t6` — Compose the static first presentation route
- `t7` — Add deterministic presentation checks and verify the delivery boundaries
- `t8` — Apply the required version bump and changelog closeout

## Actual Delivery

| Plan task | Status | What actually landed |
|-----------|--------|----------------------|
| `t1` | delivered | Typed one-card catalog, repository homes, and 12 immutable evidence entries in `site-astro/src/data/presentations.ts`; task commit `de5a989`. |
| `t2` | delivered | Shared, section-aware five-item navigation plus Header, Footer, and home Presentations links; task commit `93cff18`. |
| `t3` | delivered | Exact thesis and the confirmed sourced eight-beat narrative in `site-astro/src/data/mind-nervous-system-body.ts`; task commit `bf210d1`. |
| `t4` | delivered | Static, accessible inline-SVG architecture diagram with distinct shipped, API-only, and future paths; task commit `bdc0285`. |
| `t5` | delivered | Data-driven `/presentations/` index and its single semantic card; task commit `3f16854`. |
| `t6` | partial | The static eight-beat talk route landed in `a938440`, followed by the type-narrowing repair `6b2c5ea`; under approved `d3`, `4fb0b51` hides the overlapping source-note rail and uses a single content column pending a cleanup PR. |
| `t7` | partial | Deterministic built-output checker and `check:presentations` package script landed in `261c5f3`; every presentation contract passes, but the repository link checker retains the exact approved `d2` `/learn/` baseline. |
| `t8` | partial | Version `0.13.0` and the changelog closeout landed in `7dc8d74`; build and presentation gates pass after the bump, while the inherited `/learn/` gate remains deferred under `d2`. |

## Mid-work Decisions

- `d1` — replace the full link-check-exits-zero acceptance with a no-regression
  gate: every new presentation link resolves and the complete checker has only
  the 16 pre-existing `/learn/` failures; keep `org/`, `tests/`, workflows, and
  the Learn route unchanged, and track Learn routing as follow-up — the
  pre-wave baseline Astro build passed but `org site link-check` already exited
  1 on 16 Header/Footer `/learn/` links because this checkout had no local
  `/learn/` route.
- `d2` — replace `d1`'s exact-16 total failure expectation with a structural
  no-regression gate: the original 16 `/learn/` failures remain unchanged, the
  two new presentation pages contribute exactly four inherited Header/Footer
  `/learn/` failures, and every presentation destination resolves — the new
  pages correctly reuse the shared Layout, so each necessarily inherits the
  existing broken links while the Learn route remains out of scope.
- `d3` — temporarily hide the per-beat source-note rail and collapse the talk
  to a single content column; retain the source ledger, source links in the
  document, and external verification for a second cleanup review — the user
  observed that visible source notes overlap the architecture diagram and
  prioritized a working site before a later visual cleanup pass.

## Drift From Plan

| Plan item | Reason for divergence | Classification |
|-----------|-----------------------|----------------|
| `t7` (`d1`) | The pre-wave baseline Astro build passed but `org site link-check` already exited 1 on 16 Header/Footer `/learn/` links because this checkout had no local `/learn/` route. | `needs-follow-up` |
| `t7` (`d2`) | The confirmed pages correctly reuse the shared Layout, so each new built page necessarily inherits the existing broken Header and Footer `/learn/` links while the Learn route remains intentionally out of scope. | `needs-follow-up` |
| `t8` (`d2`) | Its post-bump internal-link acceptance inherits the same approved structural baseline: exactly 20 `/learn/` failures and no other failure. | `needs-follow-up` |
| `t6` (`d3`) | The user observed that visible source notes overlap the architecture diagram and prioritized a working site before a later visual cleanup pass. | `needs-follow-up` |

## Evidence

- build: `npm run build` — pass; 10 static pages built
- presentation contract: `npm run check:presentations` — pass; 8 checks,
  1 card, 8 ordered beats, and 12 immutable evidence links
- navigation tests:
  `node --experimental-strip-types --test src/data/navigation.test.mjs` — pass,
  5/5
- types: `npm exec tsc -- --noEmit` — pass
- Markdown:
  `markdownlint-cli2 CHANGELOG.md docs/specs/2026-07-19-presentations-tab-and-neurosymbolic-robots.md docs/plans/2026-07-19-presentations-tab-and-neurosymbolic-robots.md`
  — pass, 0 errors
- patch hygiene: `git diff --check` — pass
- Astro diagnostics: `npm run astro -- check` — one pre-existing
  `@fontsource-variable/albert-sans` side-effect-import diagnostic in
  `site-astro/src/layouts/Layout.astro`; 0 presentation diagnostics
- internal links: `uv run --frozen org site link-check --json` — exact approved
  `d2` result: 20 `/learn/` missing-file failures across 10 pages, with zero
  other failures and zero presentation-destination failures
- external sources: all 12 commit-pinned GitHub blob URLs in
  `site-astro/src/data/presentations.ts` resolved with HTTP 200
- responsive/accessibility walkthrough: 320px light/no-JS/reduced-motion and
  1440px dark had no document overflow; Presentations was current in Header and
  Footer; the diagram remained scroll-contained; the keyboard skip link was
  visible; minimum measured text contrast was 6.37:1
- commits: `e11b172..ae34209`
- PRs / issues: Reachy prerequisite PR `#17` merged; Learn-route follow-up issue
  `#18` open

## Delivery Claims

| Claim | Confidence | Evidence |
|-------|------------|----------|
| Presentations is a primary destination with a reusable card index and a working first talk route. | high | files `site-astro/src/data/navigation.ts`, `site-astro/src/pages/presentations/index.astro`, and `site-astro/src/pages/presentations/mind-nervous-system-body.astro`; `npm run build`; `npm run check:presentations` |
| The first talk preserves the exact mind–nervous-system–body thesis and eight-beat narrative. | high | file `site-astro/src/data/mind-nervous-system-body.ts`; `npm run check:presentations` |
| Reachy Mini and ARM101 claims are backed by 12 public, commit-pinned evidence links while repository-home links remain latest-following. | high | file `site-astro/src/data/presentations.ts`; external-source HTTP 200 check; `npm run check:presentations` |
| The architecture diagram is code-native, static, accessible, and separates events, cognition, validated intents, hardware, and retained artifacts. | high | file `site-astro/src/components/MindNervousSystemBodyDiagram.astro`; commit `bdc0285`; `npm run build` |
| The source-note overlap is removed from the working page by hiding the rail without deleting its ledger or DOM links. | high | file `site-astro/src/pages/presentations/mind-nervous-system-body.astro`; commit `4fb0b51` |
| The release is recorded as version `0.13.0`. | high | files `pyproject.toml` and `CHANGELOG.md`; commit `7dc8d74` |
| The repository-wide internal link check is fully green. | unverified | It is not green: the approved `d2` baseline is exactly 20 inherited `/learn/` failures; issue `#18` tracks the fix. |

## Remaining Work / Follow-up

- `t6` / `d3` — in a new cleanup PR, redesign and re-enable presentation
  source notes so they remain subordinate to the spoken narrative and cannot
  overlap the architecture diagram.
- `t7` / `d1` / `d2` — fix the site-wide `/learn/` navigation target under
  issue `#18`, then rerun the complete internal-link gate to zero.
- `t8` / `d2` — after issue `#18` lands, rerun the post-version internal-link
  acceptance that this run could only satisfy structurally.
- Resolve the pre-existing Albert Sans Astro side-effect-import diagnostic in a
  separate maintenance change; it does not originate in the presentation
  files.
