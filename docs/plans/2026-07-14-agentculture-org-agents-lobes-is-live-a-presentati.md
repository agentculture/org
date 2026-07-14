# Build Plan — agentculture.org/agents/lobes is live — a presentation-grade page introducing lobes: the local thinking engine, its command surface, its profiles, its validated hardware, and the Mesh-brain direction — good enough that Ori can present by just showing the page.

slug: `agentculture-org-agents-lobes-is-live-a-presentati` · status: `exported` · from frame: `agentculture-org-agents-lobes-is-live-a-presentati`

> agentculture.org/agents/lobes is live — a presentation-grade page introducing lobes: the local thinking engine, its command surface, its profiles, its validated hardware, and the Mesh-brain direction — good enough that Ori can present by just showing the page.

## Tasks

### t1 — Capture real material: run the shown commands for real and store transcripts as a typed data module (site-astro/src/data/lobes-captures.ts) — on spark locally (lobes status/overview/whoami, fleet status) and over the network to thor (curl thor:8000/health, /v1/models, one chat completion)

- covers: c10, h5, h4
- acceptance:
  - Every captured command is a shipped lobes-cli verb or a real HTTP call; transcripts labeled with machine + date; zero secrets/tokens in the stored file
  - The thor probe (gateway /health + /v1/models + one completion) is re-captured fresh and stored verbatim minus secrets

### t2 — Author the page content model (site-astro/src/data/lobes.ts): presentation-arc narrative — what lobes is, lobes-cli / agentculture/lobes-cli / 'lobes' binary, command surface, profiles (machine x purpose), hardware status (spark+thor validated, AGX Orin/JetPack 7.2 planned), extension/override, models-as-lobes, Mesh-brain direction, benchmarking area with downloadable git links; story not tutorial

- depends on: t1
- covers: c2, c4, c5, c6, c14, h15, c19
- acceptance:
  - Every after_state element present in the content model; every fact cross-checkable against lobes-cli repo/docs; forward-looking items (AGX Orin JetPack 7.2, Mesh-brain) explicitly marked planned/vision; Mesh-brain framed as the direction this page names, requiring zero lobes-cli commits
  - Benchmark section names lobes benchmark + lobes assess as the how, the purpose x machine tables as the setup, and links docs/tuning-profiles.md, per-model docs, and the shahizat NVIDIA-forums report as public URLs a reader can open/clone
  - Copy tells the story, not a tutorial: no install walkthrough duplicating the README; section headlines each carry a spoken point in presentation order

### t3 — Build the animated lobes diagram component (site-astro/src/components/LobesDiagram.astro): a centerpiece that morphs between the two framings — models as specialized lobes inside one machine, then whole machines as specialized lobes in the Mesh-brain

- covers: c8
- acceptance:
  - Animation is transform/opacity only (compositor-only), calm easing per the site motion language, and holds 60fps
  - prefers-reduced-motion swaps the morph for a presentable static final frame; both framings remain legible without motion

### t4 — Build the terminal replay component (site-astro/src/components/LobesTerminal.astro): animated panes that type/stream the captured sessions — one single-machine lobes sequence, one multi-machine sequence (spark + thor side by side) — fully self-contained, replaying t1's captures

- depends on: t1
- covers: c9, c13, h13
- acceptance:
  - Panes replay only strings imported from lobes-captures.ts; the component performs zero fetch/XHR/WebSocket calls — no lobes/spark/thor endpoint is dialed at page-view time
  - Every command line shown exists in the shipped lobes-cli surface or is a real curl against the gateway API; single-machine and multi-machine sequences are visually distinct sections
  - Typing/streaming motion is compositor-friendly, calm, and under prefers-reduced-motion renders the completed transcript as a still

### t5 — Assemble the page (site-astro/src/pages/agents/lobes.astro): Layout + PageHero + existing tokens/reveal pattern, rendering the content model with the diagram and terminal components in spoken-narrative order, one idea per viewport

- depends on: t2, t3, t4
- covers: c7, h8, h10
- acceptance:
  - Uses Layout/PageHero/Header/Footer and existing global tokens; no new global styles; builds clean with astro build
  - Sections follow the presentation arc top-to-bottom; every after_state element findable in one scroll pass

### t6 — Point the lobes-cli card on /agents/ at /agents/lobes (site-astro/src/data/site.ts url field); the new page links out to github.com/agentculture/lobes-cli

- covers: c3, h9
- acceptance:
  - Card url is /agents/lobes; GitHub repo link present on the new page; no other site.ts entry changes

### t7 — Verification pass on the built page: fact cross-check, styling parity, motion bar, and the measurable floor

- depends on: t5, t6
- covers: c20, h16, h1, h2, h3, c8, h6
- acceptance:
  - Side-by-side with /agents/ in light and dark themes: same tokens/fonts, WCAG AA contrast in both
  - Lighthouse performance >= 95 and accessibility >= 95 on the built page in both themes, scores recorded for the PR
  - grep of site-astro/dist/ shows no thor/spark hostnames or lobes endpoints; devtools network panel on the served page shows zero requests to lobes hosts
  - Animations verified compositor-only at 60fps; prefers-reduced-motion path shows presentable stills; every page fact re-checked against the lobes-cli repo/docs
  - Every number in the benchmarking area traces to a linked, openable source (lobes-cli doc in git or the NVIDIA forums report)

### t8 — Ship lane: version-bump, PR via cicd, and Ori's preview sign-off gate

- depends on: t7
- covers: c11, h14, c12, h12, h11, c5
- acceptance:
  - PR diff touches only the new page files (page, components, data modules), the site.ts card link, and the version-bump/changelog — no other page's rendered output changes
  - A preview (local build or preview URL) is shown to Ori and an explicit presentable-as-is sign-off exists before merge; the dry-run test holds: the page alone suffices to give the talk

### t9 — Go live through the operator lane: deploy the built site so agentculture.org/agents/lobes is reachable in production (Cloudflare Pages via the credentialed operator step; DNS untouched)

- depends on: t8
- covers: c1, h7
- acceptance:
  - https://agentculture.org/agents/lobes returns the page in production after sign-off; deploy performed through the established operator lane, not from a checkout

## Risks

- [unknown_nonblocking] Deploy is a credentialed operator step (cultureflare) — timing depends on the operator being available after sign-off (task t9)
- [follow_up] lobes-cli docs/tuning-profiles.md still marks thor as 'configured' while the page says validated (live-probe evidence); consider an upstream doc refresh in lobes-cli after this ships
