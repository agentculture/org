# Build Plan — the reachy-mini-cli page

slug: `the-reachy-mini-cli-page` · status: `exported` · from frame: `the-reachy-mini-cli-page`

> AgentCulture.org /agents/reachy-mini-cli is live: a presentation page for the Reachy Mini operator CLI — the noun map, the single-SDK-owner model, and real live-robot captures — joining devague, lobes, and colleague in the agents family.

## Tasks

### t1 — Run the live capture batch on the rig (operator/main-agent task — drives hardware and mutates the rig; never a worktree subagent)

- covers: c21, h18
- acceptance:
  - rig upgraded first: reachy-mini-cli --version prints 0.31.0 and daemon/device probes stay healthy (on failure: roll back to 0.28.2 and capture there, per q1)
  - raw transcript of every session saved under the session scratchpad before any transcription happens
  - reachy-live.service stopped before sdk-transport captures; after the batch, service status reports mode live with the same active presence unit as before
  - capture set spans no-robot nouns (whoami, quickstart or learn, doctor), live device/move/say/listen, and think — or think's documented ported fallback (c24) if the live run fails

### t2 — Author src/data/reachy-mini-cli-captures.ts from the raw transcripts

- depends on: t1
- covers: c3, h2, c22, h19
- acceptance:
  - every cmd/out line matches its raw transcript verbatim; omissions appear only as ellipsis-kind lines; no pane exists for a run that never happened
  - each pane carries a source line: 'fresh run · <rig>, <date>' or 'ported · <public repo path>'
  - grep over the module finds no credential-shaped strings and no endpoints beyond those the repos' public docs print
  - module exports typed CapturePane[] panes and the site builds green with it

### t3 — Author src/data/reachy-mini-cli.ts — the page's full content model

- depends on: t1
- covers: c19, h7, c14, h13, c17, h16
- acceptance:
  - every arc section (hero+meta, fast facts, capabilities, noun map, single-SDK-owner, senses/presence, think loop, what's-next, closing CTAs) has its copy present and traceable to README.md, docs/operating-reachy.md, docs/export-schema.md, or the live tracker
  - what's-next themes cite real open issue numbers and titles from agentculture/reachy-mini-cli
  - no capability is claimed that the installed CLI does not ship; fast facts match the capture batch (version, install line)
  - headlines read as spoken presentation copy (the sibling-pages test) and the module compiles in the site build

### t4 — Build ReachyTerminal.astro — the page's own replay component

- depends on: t2
- covers: c4, h3
- acceptance:
  - the typing/reveal animation demonstrably plays in the built page: the set:html transcript is styled via :global() (DevagueTerminal's pattern), not scoped-and-dead (LobesTerminal's bug)
  - every animated property is opacity/transform only
  - prefers-reduced-motion disables the animation
  - the component shares no state, selectors, or script with the three sibling terminals

### t5 — Build ReachyDiagram.astro — the single-SDK-owner model diagram

- covers: c6, h5
- acceptance:
  - the diagram asserts only documented relationships: one in-process SDK client, one motion queue, and the sdk-transport conflict set (listen/think/sleep/vision/pat) exactly as docs/operating-reachy.md's conflict matrix states
  - renders correctly in both color themes; any motion is opacity/transform and honors prefers-reduced-motion

### t6 — Compose pages/agents/reachy-mini-cli.astro and flip the site.ts entry

- depends on: t3, t4, t5
- covers: c1, h9, c2, h1, c5, h4, c16, h15, c20, h8
- acceptance:
  - the page composes strictly from the two data modules; any deliberate exception is documented in the page header comment (colleague.astro precedent)
  - site.ts's reachy-mini-cli entry url becomes /agents/reachy-mini-cli/ (pre-flip state — the GitHub url — verified at branch point per h15)
  - npm run build is green with 8 pages; dist contains /agents/reachy-mini-cli/index.html; the agents index card links it
  - every pane exported by the captures module is imported and rendered exactly once
  - page-level check: all animations honor prefers-reduced-motion; animated properties are opacity/transform only

### t7 — Integrate, gate, and ship the PR

- depends on: t6
- covers: c9, h6, c18, h17, c8, h10, c10, h11, c11, h12, c23, h20, c15, h14
- acceptance:
  - version bumped + CHANGELOG entry prepended (version-check job green)
  - full local gate green: pytest, black/isort/flake8/bandit, markdownlint, teken cli doctor --strict, npm run build
  - the PR diff touches nothing under org/, tests/, or .github/workflows/, and carries no uv.lock, .wrangler/, .claude/settings.json, or prior-run artifacts
  - PR opened via the cicd skill and merges green; post-merge, agentculture.org/agents/reachy-mini-cli/ responds and the agents index links it

## Risks

- [unknown_nonblocking] the live think capture may fail on rig-side think config (model/endpoint) — fallback is the c24 ported pane from docs/verification/think-body-expression.md (task t1)
- [unknown_nonblocking] rig mutation risk: the 0.31.0 upgrade could destabilize the working robot setup mid-batch — rollback path is 'uv tool install reachy-mini-cli==0.28.2' per q1's decision (task t1)
- [unknown_nonblocking] physical-environment risk during motion/speech captures (objects near the robot, USB/media contention) — operator supervises the batch live (task t1)
- [follow_up] the LobesTerminal inert-animation fix remains a deliberate follow-up PR outside this delivery
