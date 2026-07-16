# Build Plan — the colleague page

slug: `the-colleague-page` · status: `exported` · from frame: `the-colleague-page`

> agentculture.org/agents/colleague is live — a presentation-grade page introducing colleague to someone who has never seen it: the paradigm behind it (a second, independent mind on a different backend, run as a peer), its three interaction surfaces (interactive TUI, agent-interactive TAUI, bot-interactive JSON), batch work via colleague work, subagent orchestration, roles, models-for-purposes (cortex and senses), and eidetic memory — presented with real captured sessions, good enough that Ori can present colleague by just showing the page

## Tasks

### t1 — Harvest and author colleague-captures.ts — every pane real: port committed self-build drive material (docs/drive-notes/2026-05-29, paths verified via git ls-files), run fresh sessions once (whoami, tui state excerpt, roles list --json, lobes show against Thor with senses ready, a small work run with flight feed), and capture this build's own dogfood story (explore e41355e8e5ac + the pre-PR review)

- covers: c4, c22, c23, c24, h15, h16, h21, h22
- acceptance:
  - colleague-captures.ts passes astro check and exports panes covering paradigm/whoami, TAUI tui state excerpt, work+flight, roles list, lobes show (Thor, senses ready), and the dogfood explore + review
  - every pane carries id, title, context, capturedDate, colleagueVersion and a source label: a public committed path (git ls-files verified) or a fresh-run id + date
  - zero tokens/keys/private URLs; every omission is a first-class ellipsis line; no kept line reworded

### t2 — Author colleague.ts — the content model with spoken headlines: hero (second-mind thesis), verified fact chips, and section copy for paradigm, three tiers, work+flight, subagents+roles, cortex/senses, eidetic memory, more-surfaces, what's-next (from the live tracker), closing

- covers: c9, c10, c11, c12, c13, c14, c16, c19, c20, c21, h3, h4, h5, h6, h7, h8, h9, h13, h14, h20
- acceptance:
  - colleague.ts passes astro check; every paradigm line carries a source comment traceable to colleague's README/CLAUDE/docs; TAUI expanded as Textual Agentic UI; every command re-verified against colleague 1.48.x --help
  - fact chips re-verified against PyPI JSON + pyproject.toml on authoring day; roles table matches roles list --json; warm-vs-cold numbers carry run ids and provenance; senses-cannot-act stated exactly as the repo grounds it; safety copy never claims sandboxing
  - what's-next themes link only issues verified open via gh issue list on authoring day; headlines read as spoken lines

### t3 — Build ColleagueTerminal.astro — the replay component, DevagueTerminal's technique deliberately unshared: escaped-string transcript via set:html, every injected class wrapped in :global(), IntersectionObserver class-toggle playback, its own data marker, leg/tier accent colors for colleague pane kinds

- acceptance:
  - renders a CapturePane with the pinned interface (kind cmd/out/ellipsis lines; id/title/context/capturedDate/colleagueVersion; optional source label)
  - every class injected via set:html is wrapped in :global(); no-JS and reduced-motion render the completed transcript; astro check passes

### t4 — Compose colleague.astro and flip the site.ts card url to /agents/colleague/

- depends on: t1, t2, t3
- covers: c2, c3, h1, h2
- acceptance:
  - npm run build emits dist/agents/colleague/index.html; the agents index card links /agents/colleague/; the page still links the GitHub repo (fact chip + closing CTA)
  - git diff touches no shared component (Layout, PageHero, Header, Footer) and no sibling page

### t5 — Validate the built page against the design bar and the announcement

- depends on: t4
- covers: c1, c8, c17, c18, h12, h17, h18, h19
- acceptance:
  - npm run build green; Lighthouse performance and accessibility >= 95 on the served page; axe/contrast AA in both themes; prefers-reduced-motion shows completed transcripts
  - grep of dist finds no fetch/XHR/WebSocket and no external asset host; no deploy workflow added by this change
  - a top-to-bottom read as a spoken script passes; a section-by-section walk against the announcement finds every named surface with at least one real capture or verified fact; served preview ready for Ori's sign-off

### t6 — Version-bump the org repo and update CHANGELOG (every PR bumps; CI enforces)

- acceptance:
  - pyproject.toml version bumped via the version-bump skill; Keep-a-Changelog entry prepended; uv run pytest -n auto green; teken cli doctor . --strict green

### t7 — Build ColleagueDiagram.astro — a small inline-SVG diagram of the one-runtime-many-minds shape (three render tiers around one CockpitState, cortex/senses split), theme-aware, reduced-motion-safe

- acceptance:
  - inline SVG only, no external assets; both themes AA-legible; honors prefers-reduced-motion; astro check passes

## Risks

- [unknown_nonblocking] Thor's lobes gateway may be unreachable from this machine at capture time — the senses-ready lobes show pane depends on it (fallback: Ori loads gemma locally or the pane is deferred, a recorded deviation) (task t1)
- [unknown_nonblocking] the local vLLM rig (cortex) could go down mid-build, blocking fresh work/flight captures — verified live today via colleague whoami and lobes show (task t1)
- [unknown_nonblocking] page weight and animation cost of many capture panes is unmeasured until the page is built — bounded by the measured design bar (Lighthouse gate in t5) (task t5)
