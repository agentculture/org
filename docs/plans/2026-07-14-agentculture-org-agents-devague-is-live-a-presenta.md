# Build Plan — agentculture.org/agents/devague is live — a presentation-grade page introducing devague: the CLI that turns a vague idea into a buildable spec, then a buildable plan, by working backwards; the page presents the method (announcement frame, interrogation, convergence, human review loop), the command surface, real captured sessions, and a what's-next drawn from its issue tracker — good enough that Ori can present by just showing the page

slug: `agentculture-org-agents-devague-is-live-a-presenta` · status: `exported` · from frame: `agentculture-org-agents-devague-is-live-a-presenta`

> agentculture.org/agents/devague is live — a presentation-grade page introducing devague: the CLI that turns a vague idea into a buildable spec, then a buildable plan, by working backwards; the page presents the method (announcement frame, interrogation, convergence, human review loop), the command surface, real captured sessions, and a what's-next drawn from its issue tracker — good enough that Ori can present by just showing the page

## Tasks

### t1 — Capture real material: store this frame's own devague session transcripts as a typed data module (site-astro/src/data/devague-captures.ts) — the frame leg (new, capture, interrogate, review, confirm, status, converge, export) and the plan leg (plan new, task, cover, converge, waves, export), captured from real runs in this repo

- covers: c11, h3
- acceptance:
  - Every captured line is from a real devague 0.17.1 run of this repo's own frame/plan session, stored verbatim (trimmed only for length), labeled with version and date; no secrets or private URLs in the stored file
  - Captures include both legs: the frame arc (new to export) and the plan arc (plan new to export), plus a status/converge gate moment showing proposed-vs-confirmed

### t2 — Author the page content model (site-astro/src/data/devague.ts): presentation-arc narrative — what devague is (deterministic no-LLM CLI, PyPI devague, uv tool install devague, Apache-2.0, repo newly public), the idea-to-spec-to-plan pipeline, the announcement-frame method, the human review loop, the operator skills (/think, /spec-to-plan, /assign-to-workforce), and the what's-next themes from the live issue tracker

- covers: c2, c4, c15, c16, c17, h9, h10, h11
- acceptance:
  - Every after_state element is present as content: pipeline, method arc, review loop, deterministic CLI, operator skills, captures hook, what's-next; every fact traces to the public repo, PyPI metadata, or the installed CLI's output
  - What's-next is distilled from the live issue tracker at authoring time into 2-4 named themes, each linking at least one open GitHub issue, written as direction not shipped features
  - Copy assumes no prior devague knowledge and tells the story, not a tutorial; each section headline carries a spoken point; the narrative reflects the before-state (site had no devague mention; repo newly public under Apache-2.0)

### t3 — Build the method-arc diagram component (site-astro/src/components/DevagueFlow.astro): an animated centerpiece that walks the pipeline — vague idea, announcement frame with claims flipping proposed to confirmed, the converge gate, exported spec, plan waves, build

- covers: c11, h3
- acceptance:
  - Animation is transform/opacity only (compositor-only), calm easing per the site motion language, holds 60fps
  - prefers-reduced-motion renders a presentable static final frame; the pipeline stays legible without motion

### t4 — Build the terminal replay component (site-astro/src/components/DevagueTerminal.astro): typed/streamed panes replaying the captured sessions from devague-captures.ts — a frame-leg pane and a plan-leg pane — reusing the lobes replay pattern, fully self-contained

- depends on: t1
- covers: c11, h3
- acceptance:
  - Panes replay only strings imported from devague-captures.ts; the component performs zero fetch/XHR/WebSocket calls at page-view time
  - Every command shown exists in the shipped devague 0.17.1 surface (verifiable via devague --help / learn); frame-leg and plan-leg sequences are visually distinct
  - Typing/streaming motion is compositor-only and calm; under prefers-reduced-motion the completed transcript renders as a still
  - If shared code is generalized from the lobes terminal component, the lobes page's rendered output is unchanged (verified by build diff)

### t5 — Assemble the page (site-astro/src/pages/agents/devague.astro): Layout + PageHero + existing tokens and reveal pattern, rendering the content model with the diagram and terminal components in spoken-narrative order, one idea per viewport

- depends on: t2, t3, t4
- covers: c10, h2, h12, h6
- acceptance:
  - Uses Layout/PageHero/Header/Footer and existing global tokens; no new global styles; builds clean with astro build
  - Sections follow the presentation arc top to bottom, one idea per viewport; every after_state element findable in one scroll pass

### t6 — Add the devague directory card and source links: new entry in site-astro/src/data/site.ts under Developer tooling linking /agents/devague/; the page links github.com/agentculture/devague and pypi.org/project/devague

- covers: c15, h8, c16
- acceptance:
  - site.ts gains exactly one new entry (devague, group Developer tooling, url /agents/devague/); no other entry changes
  - The page links the now-public GitHub repo and PyPI; both links resolve

### t7 — Verification pass on the built page: fact cross-check, styling parity, motion bar, and the measurable floor

- depends on: t5, t6
- covers: c8, h14, h2, h3, h9, h10
- acceptance:
  - Lighthouse performance >= 95 and accessibility >= 95 on the built page in both themes, scores recorded for the PR
  - Side by side with /agents/ and /agents/lobes in light and dark themes: same tokens/fonts, WCAG AA contrast in both
  - Network panel on the served page shows zero client-side API calls; built JS greps clean of fetch/XHR to any devague endpoint
  - Every page fact re-checked against the public repo, PyPI, and a real devague run; every what's-next issue link opens and its issue is still open at verification time
  - Animations verified compositor-only at 60fps; the reduced-motion path shows presentable stills

### t8 — Ship lane: version-bump, PR via the cicd skill, and Ori's preview + dry-run sign-off gate

- depends on: t7
- covers: c5, h6, c6, h13
- acceptance:
  - PR diff touches only the new page files (page, components, data modules), the site.ts card, and the version-bump/changelog (uv.lock synced with the bump); no other page's rendered output changes; zero commits to the devague repo
  - A preview is shown to Ori and an explicit presentable-as-is sign-off exists before merge; dry-run holds — the talk can be given with only the page on screen

### t9 — Go live through the operator lane: deploy so agentculture.org/agents/devague is reachable in production (Cloudflare Pages via the credentialed cultureflare step; DNS untouched)

- depends on: t8
- covers: c1, h5
- acceptance:
  - <https://agentculture.org/agents/devague> returns the page in production after sign-off; deploy performed through the established operator lane, not from a checkout

## Risks

- [unknown_nonblocking] Deploy is a credentialed operator step (cultureflare) — timing depends on the operator being available after sign-off (task t9)
- [follow_up] The GitHub repo description of agentculture/devague is stale ('Agent owner for specifix to create specs for changes') and does not match what the page will say — update the repo About before ship so card, page, and repo agree (a devague-side metadata edit, outside this repo's diff)
- [unknown_nonblocking] Issue-set drift between planning and authoring: what's-next themes were distilled on 2026-07-14; issues open and close (summarize-delivery already shipped mid-frame) — re-verify at authoring (t2) and verification (t7)
