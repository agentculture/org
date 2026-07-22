# cli-runtime-reframe

> The mind-nervous-system-body presentation now leads with the operational architecture: a CLI for intelligence, a runtime for embodiment. The agent is optional and replaceable; the deck shows agent harness, robot CLI, behavior runtime, device daemon, and hardware as distinct layers, and never conflates the behavior runtime with the device daemon.
> instruction: Verify on the built dist page: the architecture diagram names all five layers with the CLI and runtime boxes emphasized; grep the deck HTML to confirm 'reachy-mini-daemon' appears only as the device layer, never as the runtime

## Audience

- Talk audiences and /presentations/ visitors: developers and agent operators deciding how to connect an agent (Claude Code, Codex, Colleague, custom, or none) to a robot — the deck backs a spoken talk, so slides carry symbols, not paragraphs
- The talk audience is technical roboticists; the deck backs a 15-20 minute spoken presentation (operator directive at the challenge pass; c22's developer/agent-operator audience remains the secondary web audience)

## Before → After

- Before: Today's deck tells the mind-first story: 10 slides distilled from the article's beats with the agent as protagonist, all robot code lumped as one 'nervous system', no CLI layer drawn, no runtime/daemon distinction, and substantial repo-separation and learning-ladder content
- After: The deck leads with the architecture: at most 8 primary beats, the CLI-for-intelligence / runtime-for-embodiment thesis visible by beat 2, the four layers drawn as separate visual layers with the agent optional and replaceable, Reachy as the full-stack demo, one small rules example, ARM101 as the CLI-contract contrast, and an independent-evolution close

## Why it matters

- The reusable contribution — a stable operational boundary between interchangeable intelligence and persistent embodiment — is currently hidden behind the metaphor; audiences leave with an analogy instead of an architecture they can apply to their own robots

## Requirements

- Reframe the deck per org#21: at most 8 primary beats, primary thesis visible by beat 2, protagonist flipped from an-agent-entering-a-robot to a-robot-architecture-that-accepts-any-intelligence, following the issue's proposed sequence (agent should not own the motors -> CLI+runtime thesis -> CLI as control plane -> runtime as nervous system -> Reachy full stack -> rules example -> ARM101 contrast -> independent-evolution close)
  - instruction: Author the new slide sequence in mind-nervous-system-body-slides.ts following org#21's outline (motors-problem opener, thesis, control plane, nervous-system runtime, Reachy full stack, rules example, ARM101 contrast, close); assert beat count and thesis position in the sibling test
  - honesty: The shipped deck has at most 8 primary beats and the CLI+runtime thesis is on beat 2
- Rewrite site-astro/src/data/mind-nervous-system-body-slides.ts (currently 10 slides distilled from article beats) to the new sequence, and update the sibling .test.mjs contract in the same change: slide count, the thesis-headline===hero equality test, spoken-line limits, one-robot-per-slide rules
  - instruction: Rewrite mind-nervous-system-body-slides.test.mjs: drop the thesis-headline===hero equality and beat-derivation comments, keep evidence-resolution/robot-photo shape checks that still apply, add beat-count<=8 and thesis-on-slide-2 assertions; run node --experimental-strip-types --test site-astro/src/data/mind-nervous-system-body-slides.test.mjs
  - honesty: The slides test passes and every assertion describes the new deck — no assertion still encodes the old derive-from-article-beats contract
- Update site-astro/scripts/check-presentations.mjs deck expectations in lockstep: expectedDeckSlideCount (pinned exactly 10), expectedRobotSlideCounts (2 per robot), card-text pins ('Mind, nervous system, body', 'Neurosymbolic robotics'), deck-is-not-the-article markers, and the four-photo imagery check
  - instruction: Update check-presentations.mjs: new expectedDeckSlideCount, robot-slide counts if changed, retitled presentation-card text, deck thesis/diagram checks; leave article hero/beats/evidence checks as they are; run npm run build && npm run check:presentations
  - honesty: npm run check:presentations passes against the rebuilt dist with expectations matching the new deck, and the article-side checks are byte-for-byte unchanged in what they assert
- Extend the deck renderer (site-astro/src/pages/presentations/mind-nervous-system-body.astro): new slide shapes for an architecture-diagram slide (accessible SVG with role=img + title + desc, matching the article diagram's a11y bar), a command-sequence slide, and a CLI-vs-runtime contrast — with visual emphasis on the CLI and runtime layers; preserve the progressive-enhancement nav and prefers-reduced-motion gating already in the page
  - instruction: Extend the deck renderer with diagram / command-sequence / contrast slide shapes; copy the a11y pattern from MindNervousSystemBodyDiagram.astro (role=img + title/desc ids); test with JS off and with reduced motion enabled
  - honesty: The diagram slide is an accessible SVG (role=img with labelled title and desc), the page remains a complete scrolling document with JavaScript disabled, and every animation is gated behind prefers-reduced-motion: no-preference
- The deck's core message (operator's words): use the CLI to connect agents to robots — without overloading the agent with information, while keeping the agent in control via rules, actions, ad-hoc operational commands, and control of the robot lifetime daemon
  - instruction: Map each of the four control surfaces (rules, actions, ad-hoc commands, daemon lifecycle) to a visible element on at least one slide; keep spoken lines to <=2 sentences so the deck stays talkable
  - honesty: A first-time viewer can restate the message after the deck: agents connect to robots through the CLI, are not overloaded with information, and stay in control via rules, actions, ad-hoc operational commands, and daemon lifecycle
- Deck priority (operator's steer): the message and its visualization for the audience come first — less strict than pinning information to the repo. Evidence stays subordinate on the deck (a light sources note / repo links); the article remains the strict commit-pinned surface
  - instruction: Keep evidence in one collapsed sources block on the close slide (repo homes + a v0.42.0 note); never place pins or paths in a headline or spoken line
  - honesty: No slide's primary content is a commit hash or file path; sources appear only in a subordinate note on the close slide
- The deck carries a light, subordinate sources note — repository home links plus a reachy-mini-cli v0.42.0 reference — implemented apart from the article's immutable evidence ledger; presentations.ts's pinned entries and REACHY_MINI_COMMIT stay untouched (they serve the article)
  - instruction: Implement the deck's sources note without touching the evidence ledger types or entries; run check:presentations to confirm the article's immutable-evidence check still passes
  - honesty: presentations.ts's pinned evidence entries and REACHY_MINI_COMMIT/ARM101_COMMIT are unchanged by the PR, and the article still passes its closed evidence-URL check
- Wire the presentation contract into CI: tests.yml site-build runs npm run check:presentations and the slides test (node --experimental-strip-types --test) after npm run build, so a contract regression fails the PR
  - instruction: Add the two commands to tests.yml site-build after npm run build; verify locally, then rely on the PR run as proof
  - honesty: A deliberately broken deck contract (e.g. wrong slide count) fails the site-build CI job
- State the tick rate honestly for an expert audience: '50 Hz' is the design rate — reachy CHANGELOG v0.42.0 (#97) records 23 Hz achieved before a partial absolute-deadline fix with tick-work overrun still open — so the deck says 'a deterministic fixed-rate loop (50 Hz design rate)' or omits the number; it never presents 50 Hz as measured fact
  - honesty: No slide or spoken line presents 50 Hz as an achieved/measured rate; if the number appears it is labeled as the design rate
- Calibrate explanation depth to roboticists: control-loop, arbitration, and daemon concepts are assumed knowledge; the agent-harness layer (what Claude Code / Codex / Colleague are, and why the agent is optional) gets the one line of explanation instead
  - honesty: A roboticist hearing the talk is never lectured on what a control loop or arbitration is, and never left guessing what an agent harness is
- The deck is presentable live: keyboard advance already ships under html.js; type must stay legible at projection distance — verify the built deck at 1920x1080 as part of acceptance
  - honesty: The built deck reviewed at 1920x1080 has every headline and code line readable

## Honesty conditions

- The built deck page shows agent harness, robot CLI, behavior runtime, device daemon, and hardware as visually distinct layers, and the behavior engine is never labeled reachy-mini-daemon
- Deck copy and diagram labels use 'behavior engine/runtime' for the 50 Hz loop and 'daemon' only for the device service, matching org#21's terminology table
- No deck slide claims ARM101 ships a daemon or persistent runtime; its slides show only the CLI contract (JSON, dry-run/--apply, torque ownership, gentle motion)
- git diff shows no content change to mind-nervous-system-body.ts, the articles page, or MindNervousSystemBodyDiagram.astro; the rendered article is unchanged
- Slides carry a few-word headline plus at most one short spoken line — no paragraph blocks on any slide
- Accurately describes the deck at current main (10 slides, beat-derived, no CLI layer) — verifiable by checking out main
- The new deck names the intelligence/embodiment operational boundary explicitly rather than leaving it implied by the metaphor
- Each element is checkable on the built page: beat count <=8, thesis on beat 2, four-layer diagram with the agent optional, Reachy demo, rules example, ARM101 contrast, close
- All three commands run green locally and in the PR's site-build job before merge
- A timed run-through of the built deck lands inside 15-20 minutes for a roboticist audience, with beat pacing per c31

## Success signals

- npm run build, npm run check:presentations, and the slides test all pass with contracts rewritten for the new deck and newly enforced in CI; org#21's acceptance criteria check off against the built page; the PR goes green (version-check, Sonar) and the deck deploys on merge

## Scope / boundaries

- The behavior runtime and the lower-level reachy-mini-daemon are never conflated: the deck names four layers consistently per org#21's terminology (agent harness / robot CLI / behavior runtime / device daemon+hardware); 'behavior engine' is the 50 Hz symbolic runtime, 'daemon' is the device service
- ARM101 is presented as the CLI-contract contrast only — JSON output, dry-run vs explicit --apply, torque ownership, overload-aware motion — never as shipping a persistent daemon/runtime (verified at pinned arm101-cli c05bda2 README: flex/explore are per-process gated motion)
- Article surfaces stay content-intact: mind-nervous-system-body.ts beats, the /articles/ page, and MindNervousSystemBodyDiagram.astro — org#21 keeps the learning ladder, the multi-track retained-artifact diagram, and the repo-separation discussion in the article, and that diagram already lives only there (perceive-to-retain beat)

## Non-goals

- No edits to reachy-mini-cli or arm101-cli — they are read-only, commit-pinned evidence sources for the site
- The route stays /presentations/mind-nervous-system-body/ and no redirects work is done (check-presentations.mjs explicitly forbids public/_redirects)

## Assumptions

- Every command in org#21's proposed sequences exists at the currently pinned evidence commits — reachy 6eab58e has daemon start, device status, behavior rules check, behavior engine start/status, behavior reload, agent attach --feed/--export; arm101 c05bda2 has arm read --json, arm flex, arm explore with dry-run-unless---apply gating; the rules.toml [[react]]/[[inhibit]]/cooldown_s example matches reachy/behavior/default_rules.toml — so the reframe can ship without re-pinning
- The four existing photo slots (two per robot) suffice — Reachy keeps primary-implementation slides, ARM101 keeps contrast slides; no new photography
- Ships as a normal org PR: version bump + CHANGELOG (version-check gate), cicd lane, deploy on merge via deploy.yml — no operator DNS step for a content update
- v0.42.0 strengthens the deck's evidence: a machine-checked zero-LLM boundary suite (tests/test_zero_llm_boundary.py), five senses ported into the runtime and live-verified, service modes reduced to demo|runtime, and 'agent attach remains the external, optional AI surface' — all directly citable for the runtime-for-embodiment thesis
- Eight beats at roughly 2-2.5 spoken minutes each fits the 15-20 minute slot; spokenLine is a speaking cue, not a script, so the <=2-sentence rule stands

## Scope exploration

- `s1` — `org#21 (issue body)`: Full reframe brief: protagonist flips to a robot architecture that accepts any intelligence; four named layers (agent harness / robot CLI control plane / behavior runtime / device daemon + hardware); 8-beat proposed sequence; 10 acceptance criteria including thesis-by-beat-2 and CLI/runtime as separate visual layers; explicit remove-to-article and preserve lists
  - seeds: `c2`
- `s2` — `site-astro/src/data/mind-nervous-system-body-slides.ts`: Deck data layer: 10 slides (thesis/concept/robot/close kinds) whose every headline and spokenLine traces to article beats under an anti-fabrication contract ('the deck says LESS than the article, never more') — the new CLI/runtime/daemon distinctions do not exist in those beats, so the derivation contract cannot survive unchanged (q1)
  - seeds: `c3`
- `s3` — `site-astro/src/data/mind-nervous-system-body-slides.test.mjs`: Enforces 8-10 slides, unique ids, evidence resolution via evidenceFor(), robot/photo shape, one-robot-per-slide evidence purity, <=2-sentence spoken lines, and thesis-slide headline === mindNervousSystemBodyHero — each assertion must move with the new deck
  - seeds: `c3`
- `s4` — `site-astro/src/data/mind-nervous-system-body.ts`: The article's 8 beats + hero thesis + definitions; the check script pins the hero string and 8 ordered beat ids on the article page — org#21 keeps removed deck content here, so this file is preserved unless q1 resolves to extend-the-beats
  - seeds: `c9`
- `s5` — `site-astro/scripts/check-presentations.mjs`: Post-build contract, NOT run in CI: pins exactly 10 deck slides, 2 photo slides per robot, one <img> per photo path, card text on both indexes, article hero === old thesis, 8 ordered article beats, closed evidence-URL set on the article page (deck evidence is unconstrained there), deck-carries-no-data-talk-beat markers, nav current-state; forbids public/_redirects
  - seeds: `c4`
- `s6` — `.github/workflows/tests.yml (site-build job)`: CI runs only npm ci + npm run build for the site; check:presentations and the node --experimental-strip-types --test slides test are manual verify commands from the prior plans — the reframe must run both locally, and wiring them into CI is a cheap open option (q3)
- `s7` — `site-astro/src/pages/presentations/mind-nervous-system-body.astro`: Renderer stages slides as full-viewport sections with dot-rail anchors, js-gated prev/next chrome, and (prefers-reduced-motion: no-preference)-gated snap/reveal; it supports only text+photo slides today — no diagram, code-sequence, or table shapes, so the issue's diagram and CLI-vs-runtime criteria need new slide kinds here
  - seeds: `c5`
- `s8` — `reachy-mini-cli @ pinned 6eab58e vs HEAD 92e34b2`: Every org#21 command verified at the pinned commit (daemon start, device status, behavior rules check / engine start / status / reload, agent attach --feed/--export); [[react]]/[[inhibit]] rules.toml syntax matches reachy/behavior/default_rules.toml; all seven cited paths also survive at HEAD v0.42.0 ('Retire the AI-first flow: the robot's presence is the symbolic runtime'), so re-pinning is possible but needs a claim re-audit (q2)
  - seeds: `c12`, `c7`
- `s9` — `arm101-cli @ pinned c05bda2`: README at the pinned commit confirms arm read/flex/explore with TTY-confirm or dry-run-unless---apply gating and overload-safe gentle_move — supports the CLI-contract contrast; nothing there ships a persistent runtime, so the deck must not draw one
  - seeds: `c8`
- `s10` — `site-astro/src/data/presentations.ts`: Evidence ledger (13 commit-pinned entries: 7 reachy, 5 arm101... 12 entries total plus projects) and both cards; no entry today covers the behavior CLI surface (behavior.py) or the shipped default rules file, and the presentation card summary/topic still tell the old mind-first story
  - seeds: `c6`
- `s11` — `site-astro/src/components/MindNervousSystemBodyDiagram.astro + articles page`: The multi-track retained-artifact diagram is rendered only inside the article's perceive-to-retain beat — org#21's 'remove the large multi-track diagram from the presentation' is already satisfied; its accessible-SVG shape (role=img + labelled title/desc, checked by check-presentations) is the a11y bar the deck's NEW architecture diagram should match
  - seeds: `c9`, `c5`
- `s12` — `site-astro/src/data/presentation-photos.ts + public/presentations/*.webp`: Four photo slots, two per robot (hero + action), each consumed exactly once by the deck per the imagery check — the new sequence keeps Reachy-primary and ARM101-contrast slides, so the slots are reusable without new photography
  - seeds: `c13`
- `s13` — `org repo conventions (CLAUDE.md, tests.yml version-check, deploy.yml)`: PR-only main, version-bump-every-PR enforced by CI, cicd skill lane for the PR, deploy.yml publishes on merge — a content update needs no operator/DNS coordination
  - seeds: `c14`
- `s14` — `reachy-mini-cli CHANGELOG.md + CLI surface @ HEAD 92e34b2 (v0.42.0)`: v0.42.0 'retired the AI-first flow': REMOVED think, listen --live + folded hooks, listen noun, cognition/marker engines, live presence mode; cognition demoted to agent attach only; added the zero-LLM AST boundary test; forge/stash files survive but the folded flow that auto-activated forge output is gone — a shared re-pin therefore invalidates the article's folded-cognition claims while strengthening the deck's
  - seeds: `c16`, `c17`
- `s15` — `challenge pass / audience lens: operator directive`: The talk targets technical roboticists in a 15-20 minute slot — reframes c22 (web/developer audience becomes secondary) and seeds pacing + explanation-depth findings
  - seeds: `c27`, `c29`, `c31`
- `s16` — `challenge pass / counter-evidence lens: reachy-mini-cli CHANGELOG v0.42.0 (#97) + README 50 Hz claims`: README states a 'deterministic 50 Hz loop'; the v0.42.0 changelog records 23 Hz achieved before a partial absolute-deadline fix, tick-work overrun still open — an expert audience will probe this, so the deck must phrase the rate as design intent
  - seeds: `c28`
- `s17` — `challenge pass / prior-art lens: issue org#21 + exported spec + both repo READMEs`: No surface in the frame mentions ROS 2, ros2 CLI, executors, or behavior trees; for a roboticist audience the layering reads as familiar middleware discipline — whether to position against it is a user decision (q5)
- `s18` — `challenge pass / delivery failure-mode lens: deck renderer (presentations/mind-nervous-system-body.astro)`: Keyboard prev/next and dot rail already exist under html.js, so live advance works; projection legibility at 1920x1080 is the remaining acceptance check
  - seeds: `c30`
- `s19` — `challenge pass / adjacent-systems + reversibility lenses: check script, tests.yml, deploy.yml, article ledger`: Clean pass — these were swept in the scope leg (s5, s6, s13) and are guarded by confirmed claims c4, c9, c19, c20; rollback for a static-site content change is a PR revert; residual venue uncertainty parked as v1

## Decisions

- The presentation card is retitled toward 'A CLI for intelligence, a runtime for embodiment' with a matching summary/topic; the route stays /presentations/mind-nervous-system-body/ and the article card keeps its existing title (q4)
