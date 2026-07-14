# agentculture.org/agents/lobes is live — a presentation-grade page introducing lobes: the local thinking engine, its command surface, its profiles, its validated hardware, and the Mesh-brain direction — good enough that Ori can present by just showing the page

> agentculture.org/agents/lobes is live — a presentation-grade page introducing lobes: the local thinking engine, its command surface, its profiles, its validated hardware, and the Mesh-brain direction — good enough that Ori can present by just showing the page.

## Audience

- A live-presentation audience first: Ori presents and just shows this page while explaining. Secondarily, humans and agents browsing agentculture.org/agents/.

## Before → After

- Before: agentculture.org/agents/ lists lobes-cli as a one-line card ('A local thinking agent for the Culture ecosystem') linking to GitHub; there is no page that explains what lobes actually is.
- After: agentculture.org/agents/lobes presents lobes-cli end to end: package/repo name and the 'lobes' command, profiles, hardware validation status, extension/override openness, and the two framings — models as specialized lobes on one machine, and a whole machine as a specialized lobe in a machine mesh (Mesh-brain).

## Why it matters

- The page doubles as the presentation deck: it must be good enough that Ori can present live and just show this page while explaining, no slides.

## Requirements

- Content covers, at minimum: package name lobes-cli / repo agentculture/lobes-cli; the 'lobes' command; profiles (machine x purpose tuning); validated on DGX Spark and Jetson Thor; planned for Jetson AGX Orin with JetPack 7.2; open for extension and override; serves models as specialized lobes; a single machine can serve as a specialized lobe in a machine mesh (Mesh-brain).
  - instruction: Author the page content against the lobes-cli README + docs; cross-check each fact (install name, verbs, profile tables, machine statuses) against the repo before merge — same checkability convention as site.ts.
  - honesty: Every fact on the page is checkable against the lobes-cli repo/docs (the site.ts convention), except explicitly-forward-looking items (AGX Orin JetPack 7.2 plan, Mesh-brain direction) which the page marks as planned/vision.
- Keep the existing site styling: the page uses Layout/PageHero, the established tokens, fonts, reveal animations, and light+dark themes — it must read as the same site as /agents/.
  - instruction: Build as site-astro/src/pages/agents/lobes.astro using Layout + PageHero + existing tokens; verify side-by-side with /agents/ in both themes before preview hand-off.
  - honesty: Viewed side by side with /agents/ in both light and dark themes, the page reads as the same site: same Layout/PageHero/Header/Footer, same tokens and fonts, no new global styles.
- Live, moving examples: animated demonstrations on the page (motion is a core experience element per the established site design bar — calm, compositor-only, honoring prefers-reduced-motion).
  - instruction: Implement animations with transform/opacity only, IntersectionObserver reveals in the existing pattern, and a prefers-reduced-motion path that swaps every animation for its final still frame.
  - honesty: Motion meets the established bar: calm easing, compositor-only (transform/opacity), 60fps, and fully honors prefers-reduced-motion with a still-presentable static fallback.
- Command examples for the single-machine story, and separate multi-machine command examples for the mesh story.
  - instruction: Copy command sequences from real runs: single-machine from spark's local lobes install; multi-machine by curling thor's gateway (`http://thor:8000`) and showing spark+thor side by side; sanitize nothing that isn't secret, and keep secrets/hostnames-that-shouldn't-leak out.
  - honesty: Every command shown exists in the shipped lobes-cli surface (verifiable via the README / lobes --help); no invented verbs or flags.
- The page includes a benchmarking area: what was benchmarked, how, and on what setup — with git links so the setup is downloadable/reproducible (lobes-cli repo: docs/tuning-profiles.md, per-model result docs under docs/, the packaged compose templates; plus the shahizat cross-machine NVFP4 reference on the NVIDIA forums).
  - instruction: Benchmark section: name lobes benchmark + lobes assess as the 'how', the purpose x machine profile tables as the 'what setup', link docs/tuning-profiles.md, the per-model docs, and the shahizat NVIDIA-forums report; every link is a public GitHub URL a reader can clone/download.
  - honesty: Every number shown in the benchmarking area traces to a linked source a reader can open — a lobes-cli doc in git, or the NVIDIA forums reference — and the 'how' names the actual verbs (lobes benchmark for throughput/latency shape-by-purpose, lobes assess for correctness).

## Honesty conditions

- The page is reachable at agentculture.org/agents/lobes in production, deployed through the established operator lane, only after the preview sign-off (c11).
- The page reads as a presentation arc: sections in spoken-narrative order, one idea per viewport, so a first-time audience can follow it while Ori talks.
- Checkable today: /agents/ renders lobes-cli as a card with role text and a GitHub link only; no /agents/lobes route exists (site-astro/src/pages has no agents/ subdirectory).
- Every element named in the after_state is present and findable in one scroll pass: name+repo+command, profiles, hardware status, extension/override, models-as-lobes, Mesh-brain.
- Dry-run test: the page alone suffices to give the talk — no slide deck, no second tab; each section headline carries the spoken point.
- Example outputs shown on the page are captured from real runs (spark locally, thor over the network) during authoring; any output that could not be captured live is either omitted or clearly marked illustrative.
- A preview (local build or preview URL) is shown to Ori and an explicit 'presentable as-is' sign-off exists before merge/deploy — no cutover on assumption.
- The PR diff touches only the new page files, the /agents/ card link, and the mandatory version-bump/changelog — no other page's rendered output changes.
- User-stated 2026-07-14: calls to lobes/spark/thor happen only locally, for the demo plan/recording. The built page contains no fetch/XHR to those hosts — verifiable by grepping dist/ for the hostnames and by a clean network panel on the published page.
- Shipping the page requires zero commits to lobes-cli; 'Mesh-brain' appears on the page framed as the direction this page names, not as an existing lobes-cli feature.
- Verified by running Lighthouse on the built page (both themes) and recording the scores in the PR; the network panel on the published page shows zero requests to lobes/spark/thor hosts.

## Success signals

- During the build, the command examples are validated against real hardware — e.g. curl over 'thor' — so what the page shows is authentic output, not invented.
  - instruction: During authoring, run the shown commands for real (lobes status/overview on spark; curl `thor:8000/health`, /v1/models, and one chat completion) and paste captured output into the page verbatim minus secrets.
- Presentation-readiness gate: Ori reviews the page in a live preview and signs off that it is presentable as-is, before it merges/deploys — same preview gate the site itself had.
- Measurable floor (same bar as the site itself): Lighthouse performance and accessibility both >= 95 on the built /agents/lobes page, light and dark themes both pass WCAG AA, animations are compositor-only at 60fps, and the page ships zero client-side requests to lobes endpoints (0 external API calls in the network panel).

## Scope / boundaries

- This is one new page plus the minimal link change on /agents/ (the lobes-cli card gains a link to /agents/lobes); no redesign of the rest of the site.
- The published page makes no live network calls to lobes endpoints from visitors' browsers. 'Live, moving examples' are self-contained animated recreations of real, captured output — the curl-over-thor test happens at build/authoring time, not at page-view time (the tunnel is auth-gated; hostnames and keys must not appear in the page).
- The page presents lobes-cli as it is; it does not require any change to the lobes-cli repo itself. 'Mesh-brain' is introduced as the direction/vision term on this page even though the lobes-cli docs do not use the word yet.

## Non-goals

- Not an install/tutorial doc mirroring the README — the page tells the story (what lobes is, why it exists, where it runs); the README and 'lobes learn' stay the reference.

## Assumptions

- Probed live 2026-07-14: `http://thor:8000/health` returns model-gear-gateway 0.40.1 and /v1/models lists 4 warm models (Qwen3.6-27B primary, Gemma 4 12B multimodal, Qwen3 embedder + reranker) — Jetson Thor is running the lobes fleet right now, which is the evidence behind the page's 'validated on Jetson Thor' wording (the tuning-profiles doc still says 'configured' for thor).

## Decisions

- The 'live, moving examples' take two forms: (1) a centerpiece animated lobes diagram that morphs between the two framings — models as specialized lobes inside one machine, then whole machines as specialized lobes in the Mesh-brain; (2) animated terminal panes that replay real captured sessions — a single-machine 'lobes' command sequence and a multi-machine sequence (spark + thor), typed/streamed with the site's calm motion language.
- Page facts pinned to captured reality: install as 'uv tool install lobes-cli', repo agentculture/lobes-cli, binary 'lobes'; profiles = machine (spark/thor/blackwell/generic) x purpose (balanced/prompt-heavy/decode-heavy) with explicit flag overrides = the 'open for extension and override' story; fleet gateway routes by model field with role aliases (cortex/senses/embedder/reranker).
