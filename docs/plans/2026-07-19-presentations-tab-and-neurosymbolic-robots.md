# Build Plan — Presentations tab and neurosymbolic robots

slug: `presentations-tab-and-neurosymbolic-robots` · status: `exported` · from frame: `presentations-tab-and-neurosymbolic-robots`

> AgentCulture.org has a Presentations tab: a card-based library of talks, beginning with a presentation on reachy-mini-cli, arm101-cli, and the neurosymbolic architecture of embodied agents — the harness and model provide neural reasoning while robot-specific code provides the symbolic layer that makes behavior grounded, reactive, safe, extensible, and able to retain what it learns.

## Tasks

### t1 — Define the typed presentation catalog and immutable evidence ledger

- instruction: Create site-astro/src/data/presentations.ts without widening the frozen SiteData contract. Export typed presentation-card and source-entry contracts, the one-card catalog, distinct repository-home links, and commit-pinned evidence URLs for Reachy 6eab58e5a2e83082c9b6cba1f50342fb2ecf40cf and ARM101 c05bda23b2352bc80f7aca97c6268bbde7114c04.
- covers: c25, h18, c42, h31
- acceptance:
  - The catalog contains exactly one typed card titled Mind, nervous system, body with summary, /presentations/mind-nervous-system-body/ route, topic label, and both source-project labels; omitting any required field fails TypeScript checking.
  - Every factual source entry is a public GitHub blob URL pinned to the specified full 40-character commit, while repository-home URLs are separate latest-following links.
  - The exported catalog is iterable and contains no template-specific markup or hard-coded rendering count, so another entry can be consumed without changing the index structure.
  - site-astro/src/data/site.ts and site-astro/src/data/types.ts remain byte-unchanged.

### t2 — Add section-aware Presentations wayfinding

- instruction: Add Presentations to Header, Footer, and the home Explore surface. Centralize or equivalently synchronize primary-nav data and use section-aware current-state matching so both /presentations/ and descendant talks mark only Presentations current while existing top-level routes keep their behavior.
- covers: c5, h5, c39, h28
- acceptance:
  - Header and Footer each render five primary links with exactly one Presentations link; the home Explore surface links /presentations/ once.
  - Built HTML for /presentations/ and /presentations/mind-nervous-system-body/ marks Presentations programmatically current in both Header and Footer and marks no unrelated primary item current.
  - Built HTML for existing top-level routes still marks only their own primary item current, and navigation labels and destinations other than the added Presentations entry remain unchanged.
  - At 320px and wider the five-item header and footer navigation use an intentional wrapping state with no clipped, overlapping, or obscured link.

### t3 — Author the sourced eight-beat Mind, nervous system, body narrative

- instruction: Create site-astro/src/data/mind-nervous-system-body.ts as the long-form talk data module. Import the catalog/source ledger, preserve the exact hero sentence and confirmed eight-beat order, define terms before use, and keep every Reachy, ARM101, learning, safety, and synthesis statement inside the challenged evidence boundaries.
- depends on: t1
- covers: c1, h1, c3, h3, c4, h4, c8, h8, c9, h9, c10, h10, c28, h21, c30, h22, c34, h25, c37, h26, c41, h30
- acceptance:
  - The module carries the exact hero sentence The agent is the mind. The code is the nervous system. The robot is the body. and exactly eight ordered beats matching the confirmed arc, with presenter-usable headlines.
  - Harness, model, symbolic nervous system, intent, and retained adaptation are defined before reliance; body means physical hardware and nervous system means robot-specific code throughout.
  - Reachy claims are limited to public main v0.37.0 evidence and ARM101 shipped claims to origin/main 0.22.1, with map non-consumption/integrity, load-and-stall contact inference, threshold re-validation, bus-loss release, and deliberate clean-hold limits visible.
  - Learning is limited to retained artifacts or constrained extension paths, explicitly excludes model-weight training, and distinguishes external agent attach, folded-cognition forge auto-activation, Python-API-only stash, and ARM map production rather than presenting one shipped autonomous loop.
  - Every technical beat references ledger source ids, labels neurosymbolic as the presentation's synthesis, and the close carries both repository homes plus /agents/reachy-mini-cli/ with an explicit no-shared-runtime statement.

### t4 — Build the accessible mind–nervous-system–body architecture diagram

- instruction: Create a code-native Astro inline-SVG component in a new file. Show the physical body, symbolic runtime, attached harness-plus-model agent, events, cognition, validated/arbitrated intents, and retained artifacts while making shipped, API-only, and future connectors visually and textually distinct.
- depends on: t1
- covers: c27, h20, c40, h29
- acceptance:
  - The component supplies a complete accessible name and text alternative that explains every layer and connector without requiring vision or animation.
  - Runtime events and cognition output remain separate; agent actions reach hardware only through intents, validation, arbitration, and the symbolic runtime.
  - Agent attach, folded-cognition forge, API-only stash, and ARM map production/non-consumption are distinct tracks; no arrow implies forge/stash tools on agent attach, map-gated flex, a shared runtime, or one shipped closed learning loop.
  - The diagram is useful as static inline SVG in both themes, makes no client request, and any optional motion uses transform/opacity only with a composed reduced-motion final state.

### t5 — Build the reusable Presentations card index

- instruction: Create site-astro/src/pages/presentations/index.astro using the typed catalog as its only card source. Follow the existing Layout/PageHero/card language and render semantic linked cards with all confirmed metadata.
- depends on: t1
- covers: c5, h5, c25, h18
- acceptance:
  - Astro builds /presentations/index.html and the page renders exactly one semantic linked card from the catalog, pointing to /presentations/mind-nervous-system-body/.
  - The card exposes title, summary, topic, and both source-project labels accessibly, with no duplicate hard-coded metadata in the template.
  - The template maps the catalog collection generically; adding a second valid data entry would render a second card without structural template changes.
  - The index remains complete without JavaScript and introduces no client network request.

### t6 — Compose the static first presentation route

- instruction: Create site-astro/src/pages/presentations/mind-nervous-system-body.astro by composing Layout, the narrative data module, and the architecture diagram. Keep prose in data, templates structural, sources concise, and the page a scrolling spoken narrative rather than a slide deck.
- depends on: t3, t4, t5
- covers: c2, h2, c6, h6, c28, h21, c30, h22, c34, h25, c37, h26
- acceptance:
  - Astro builds /presentations/mind-nervous-system-body/index.html; the card opens it and a cold reader encounters the exact hero thesis before repository-specific detail.
  - The rendered page contains exactly eight semantic beats in confirmed order, defines its terms, uses body and nervous system consistently, and is presentable top-to-bottom without detouring into source documents.
  - Every technical section renders a concise commit-pinned source pointer, neurosymbolic is explicitly labeled synthesis, and source notes remain subordinate to the spoken narrative.
  - The accessible architecture diagram appears in the appropriate beat, and the close links both public repositories and /agents/reachy-mini-cli/ while denying shared runtime or shipped integration.
  - Narrative copy lives outside the Astro page except documented structural labels; the route is static, works without JavaScript, and performs no client network request.

### t7 — Add deterministic presentation checks and verify the delivery boundaries

- instruction: Add a zero-dependency built-output checker under site-astro/scripts and a package script to run it, without altering org/, tests/, or workflows. Build the site, run the existing internal link checker, separately resolve external evidence links, and perform the responsive/theme/reduced-motion/presenter walkthrough while preserving sibling and pre-existing dirty state.
- depends on: t2, t6
- covers: c11, h11, c12, h12, c14, h13, c15, h14, c19, h15, c20, h16, c23, h17, c38, h27
- acceptance:
  - The checker fails unless both named routes exist and built HTML contains all Header/Footer/home wayfinding, exactly one index card, the exact three-layer hero, exactly eight ordered beats, both repository links, commit-pinned source links, explicit synthesis/no-integration/no-neural-training limits, and correct current-state navigation.
  - npm run build, the new presentation checker, and the existing org site link-check all exit 0; the package lock remains unchanged when no dependency changes are needed.
  - A separate external-source check resolves every factual permalink to its expected public file and commit; the internal-only link checker is not reported as external-link evidence.
  - A 320px/mobile, tablet, and desktop walkthrough in light, dark, keyboard-only, no-JS, and reduced-motion modes finds no clipping or obscured content, retains AA text contrast, and confirms all new motion is transform/opacity-only or disabled.
  - Baseline and final diff checks prove there was no Presentations route before, the existing Reachy agent page/data/component files are byte-unchanged and still build, and no changes land under org/, tests/, .github/workflows/, ../reachy-mini-cli, or ../arm101-cli.
  - No verification command starts or changes either robot; the evidence uses only static diagrams, built HTML, git data, and committed public artifacts.

### t8 — Apply the required version bump and changelog closeout

- instruction: After every site and verification task passes, use the repository version-bump workflow to update pyproject.toml and prepend the Keep-a-Changelog entry. Inspect the exact diff and stage only intended presentation, plan/spec, version, and changelog paths.
- depends on: t7
- covers: c33, h24
- acceptance:
  - pyproject.toml carries the approved version increment and CHANGELOG.md has a concise entry for the Presentations index and Mind, nervous system, body talk.
  - The repository version-check comparison against main passes and the site build, presentation checker, and internal link check remain green after the bump.
  - git diff and staged-path inspection exclude pre-existing uv.lock, settings, wrangler, sibling-repository, and other unrelated dirty artifacts unless a required tool legitimately changed a file and that exact diff was reviewed.
  - No implementation, source, test, or workflow file is changed during closeout beyond the already-confirmed task outputs plus pyproject.toml and CHANGELOG.md.

## Risks

- [unknown_nonblocking] The eight beats plus visible source and safety caveats may read as dense documentation rather than a spoken presentation; settle this only on the built t6 page with the cold-reader and presenter walkthrough, trimming supporting copy without removing confirmed claims. (task t6)
- [unknown_nonblocking] External GitHub permalink resolution depends on network and public repository availability outside the static build; t7 must report that check separately and may retry it, but must not substitute the internal link checker or unpinned latest links. (task t7)
- [unknown_nonblocking] The org and sibling worktrees already contain unrelated dirty and untracked files, including uv.lock; t8 must use explicit-path diff/staging and stop if the version workflow overlaps an unrelated edit that cannot be separated safely. (task t8)
- [out_of_scope] Live robot captures, motion, speech, service changes, and fresh hardware validation are outside this plan; all implementation and verification use static site output plus already committed evidence. (task t7)
