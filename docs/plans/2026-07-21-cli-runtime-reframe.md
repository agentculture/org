# Build Plan — cli-runtime-reframe

slug: `cli-runtime-reframe` · status: `exported` · from frame: `cli-runtime-reframe`

> The mind-nervous-system-body presentation now leads with the operational architecture: a CLI for intelligence, a runtime for embodiment. The agent is optional and replaceable; the deck shows agent harness, robot CLI, behavior runtime, device daemon, and hardware as distinct layers, and never conflates the behavior runtime with the device daemon.

## Tasks

### t1 — Rewrite the deck slide data to the CLI/runtime story (site-astro/src/data/mind-nervous-system-body-slides.ts)

- instruction: Follow org#21's proposed sequence and the confirmed frame claims; extend DeckSlide kinds for diagram/command-sequence/contrast slides; source command text verbatim from reachy-mini-cli v0.42.0 README and arm101-cli README; shape the rules example on reachy/behavior/default_rules.toml; keep the existing photo-slot ids
- covers: c2, h2, c15, h6, c18, h7, c28, h18, c29, h19, c8, h11, c22, h13, c23, h14, c24, h15
- acceptance:
  - The data module defines at most 8 primary beats: motors-problem opener on slide 1, the thesis 'A CLI for intelligence. A runtime for embodiment.' on slide 2, then control plane, runtime, Reachy full stack, rules example, ARM101 contrast, close
  - All four photo slots are referenced exactly once; every spokenLine is <=2 sentences; slides carry a headline plus one spoken line, never a paragraph block; no headline or spoken line contains a commit hash or file path
  - 50 Hz appears only labeled as the design rate; the ROS aside is present; the [[react]]/[[inhibit]] rules example and all four control surfaces (rules, actions, ad-hoc operational commands, daemon lifecycle) each appear as slide content; ARM101 slides claim only the CLI contract, never a shipped runtime; the intelligence/embodiment boundary is named explicitly; agent-harness gets the explanation line, control-loop concepts are assumed known

### t2 — Build the accessible five-layer architecture diagram component (new site-astro/src/components/ file)

- instruction: Model the SVG on org#21's mermaid diagram (agent + human/script entries, CLI, runtime, device daemon, robot); copy MindNervousSystemBodyDiagram.astro's a11y pattern (role=img, title/desc ids) and theme via the site's existing CSS custom properties so light/dark both work
- covers: c1, h1, c7, h10
- acceptance:
  - A new Astro component renders an SVG with role=img and labelled title+desc, naming agent harness, robot CLI, behavior runtime, device daemon, and hardware as visually distinct layers
  - The CLI and runtime boxes carry the visual emphasis; the agent is drawn optional/replaceable; arrows include direct CLI->daemon intervention plus the runtime event-feed/intent dotted paths; 'reachy-mini-daemon' labels only the device layer and any 50 Hz label says design rate

### t3 — Retitle the presentation card in site-astro/src/data/presentations.ts

- instruction: Edit only the presentations[0] card literal; articles[0], evidence entries, commit constants, and all types stay untouched; the route field keeps its current value
- covers: c19, h8
- acceptance:
  - presentations[0] title/summary/topic tell the CLI-for-intelligence / runtime-for-embodiment story; articles[0] and the evidence ledger (entries, commit constants, types) are byte-identical to main

### t4 — Wire the presentation contracts into CI (.github/workflows/tests.yml site-build)

- instruction: Two run steps after npm run build in site-build (working-directory already site-astro): npm run check:presentations, then node --experimental-strip-types --test src/data/mind-nervous-system-body-slides.test.mjs
- covers: c20, h9
- acceptance:
  - site-build runs npm run check:presentations and the slides test (node --experimental-strip-types --test) after npm run build
  - A deliberately broken expectation (e.g. wrong slide count) makes the command sequence exit non-zero locally, proving a contract regression fails the job

### t5 — Version bump + changelog entry (pyproject.toml, CHANGELOG.md)

- instruction: Run the version-bump skill: /version-bump minor (site reframe = feature); verify the version-check job's comparison basis is origin/main
- acceptance:
  - pyproject.toml version differs from main and CHANGELOG.md gains a Keep-a-Changelog entry describing the deck reframe

### t6 — Render the new slide shapes in the deck page (site-astro/src/pages/presentations/mind-nervous-system-body.astro)

- instruction: Preserve the existing dot-rail, nav script, and data-reveal pattern; branch on slide kind; command slides render in a pre block with overflow-x auto inside the slide grid; the sources details block follows the current close-slide pattern
- depends on: t1, t2
- covers: c5, h5, c1, h1
- acceptance:
  - The deck page renders diagram, command-sequence, and CLI-vs-runtime contrast slides from the data module, embedding the diagram component; sources appear only as one collapsed block on the close slide (repo home links + a v0.42.0 note)
  - With JavaScript disabled the page is a complete scrolling document; every snap/reveal animation is gated behind (prefers-reduced-motion: no-preference); keyboard prev/next still works under html.js

### t7 — Rewrite the slides test contract (site-astro/src/data/mind-nervous-system-body-slides.test.mjs)

- instruction: Keep the resolve-hook preamble only if the data module still imports extensionless neighbours; write assertions against the new data shape; verify with node --experimental-strip-types --test
- depends on: t1
- covers: c3, h3
- acceptance:
  - node --experimental-strip-types --test passes; assertions pin <=8 primary beats, thesis on slide 2, spoken-line limits, exactly-once photo-slot usage, and design-rate phrasing for any 50 Hz mention
  - No assertion still encodes the old derive-from-article-beats contract (thesis-headline===hero equality, beat-derivation comments)

### t8 — Update check-presentations.mjs and run the full local verify

- instruction: Update the constants block (deck slide count, card text, thesis handling) and deck checks only; article-side check bodies stay untouched; then npm run build && npm run check:presentations && the slides test, and git diff main over the three article files must be empty
- depends on: t6, t7
- covers: c4, h4, c9, h12, c25, h16, c26, h17
- acceptance:
  - npm run build && npm run check:presentations passes with expectations matching the new deck (slide count, retitled card, diagram present, deck-not-article markers); article-side checks assert exactly what they asserted before
  - git diff vs main shows no content change to mind-nervous-system-body.ts, the articles page, or MindNervousSystemBodyDiagram.astro; the route is still /presentations/mind-nervous-system-body/ with no public/_redirects; every after-state element (thesis on beat 2, four-layer diagram, Reachy demo, rules example, ARM101 contrast, close) is verified on the built page

### t9 — Rehearsal and projection acceptance on the built deck

- instruction: npm run preview against the built dist, review at 1920x1080 (screenshots or browser tooling), read every slide aloud against a timer; record both results in the PR description
- depends on: t8
- covers: c27, h21, c30, h20
- acceptance:
  - The built deck reviewed at 1920x1080 has every headline and code line readable
  - A timed run-through by the operator lands inside 15-20 minutes for a roboticist audience

## Risks

- [unknown_nonblocking] CI proof for h9/h17 completes only on the PR run — local verification is the proxy until the PR's site-build job goes green
- [unknown_nonblocking] Venue behavior (projector color/contrast, offline fallback via npm run preview) stays open past the PR — parked as v1 on the frame
