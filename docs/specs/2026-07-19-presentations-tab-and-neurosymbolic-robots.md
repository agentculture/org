# Presentations tab and neurosymbolic robots

> AgentCulture.org has a Presentations tab: a card-based library of talks, beginning with a presentation on reachy-mini-cli, arm101-cli, and the neurosymbolic architecture of embodied agents — the harness and model provide neural reasoning while robot-specific code provides the symbolic layer that makes behavior grounded, reactive, safe, extensible, and able to retain what it learns.
> instruction: Build the index and first talk, run the static build plus internal link check, then audit every technical sentence against the source ledger before calling the announcement true.

## Audience

- The first presentation serves people evaluating embodied AI and a presenter talking over the page; it must remain legible to someone who has not read either robot repository.
  - instruction: Review the built talk once as a cold reader and once as a presenter, checking jargon order and the eight-beat narrative.

## Before → After

- Before: AgentCulture.org has presentation-grade agent pages but no first-class place for cross-repository talks; the neural-versus-symbolic robotics story is split across two READMEs, long operating guides, source modules, and hardware validation logs.
  - instruction: Record the before-state from the baseline file map and built routes so the delivery can show exactly what changed.
- After: A new primary Presentations destination opens to a card library; its first card opens a dedicated talk connecting reachy-mini-cli and arm101-cli through a neurosymbolic robotics thesis.
  - instruction: Walk the built site from Header, Footer, and home Explore to the index and first talk at desktop and narrow viewport widths.

## Why it matters

- The two repositories make the neural-symbolic split concrete: general reasoning lives in an attachable agent runtime, while robot code turns perception, rules, safety, memory, and motion into grounded symbols an agent can use.
  - instruction: Keep the comparison architectural: cite each repository independently and make the no-shared-runtime boundary visible.

## Requirements

- Add Presentations as a site-level tab and render one card per presentation, beginning with the reachy-mini-cli plus arm101-cli neurosymbolic robotics presentation.
  - instruction: Add the top-level wayfinding and map the presentations data collection into semantic linked cards; verify the initial collection count is one.
  - honesty: Header and Footer each contain one current-aware Presentations link, the home Explore area points to the same index, and the index renders one card for every entry in its data collection.
- Create a presentations index route and a dedicated first-presentation route, with card metadata and long-form talk copy held in data modules while Astro templates compose the UI.
  - instruction: Create dedicated presentations data and talk-content modules, a /presentations/ index template, and the /presentations/mind-nervous-system-body/ talk template.
  - honesty: Both routes build as static HTML, card metadata has one authoritative data source, and narrative copy lives outside the Astro page template except documented structural labels.
- Ground the Reachy half in shipped main-branch evidence: its 50 Hz behavior engine, declarative rules, live senses, arbitration, intent spool, runtime feed, external agent attach client, and zero-token presence continue when the agent detaches.
  - instruction: Source Reachy facts from public main README, operating guide, symbolic-runtime delivery, and behavior/agent source; record the exact links alongside the content.
  - honesty: Every Reachy claim is supported by public main at v0.37.0 or its committed delivery evidence, including the zero-token runtime and attach-detach independence; no stale v0.31.0 agent-page copy is treated as current evidence.
- Ground the ARM101 half in public main-branch evidence: agent-readable CLI contracts, consent gates, torque ownership, overload-safe motion, contact sensing, append-only exploration logs, and persisted reachability maps; label any feat/arm-limits material as in-flight unless the user chooses otherwise.
  - instruction: Read ARM101 facts through git show origin/main and its public validation files; keep branch-only work in a clearly separate future or in-flight callout if used at all.
  - honesty: Every shipped ARM101 statement exists on origin/main 0.22.1; any 0.24.2 feat/arm-limits material is visibly marked in-flight, and the map-integrity and non-consumption limitations remain stated.
- Use learning only for observable retained adaptation: Reachy can generate or stash new reaction seams, and ARM101 can measure and persist physical-envelope knowledge; do not equate this with online neural training.
  - instruction: Present a bounded learning ladder: rules and modes, persisted observations and maps, validated generated extensions, then a clear statement that online neural training is not claimed.
  - honesty: Each use of learn or learning points to a persisted artifact or validated extension path and explicitly distinguishes adaptation from model-weight training.
- The new navigation, card index, and presentation page inherit the static Astro design bar: semantic structure, both themes, WCAG-AA contrast, reduced-motion behavior, no client network dependency, and responsive navigation with five primary items.
  - instruction: Verify the built routes in light, dark, reduced-motion, keyboard, and narrow-width conditions and inspect new animation properties and client scripts.
  - honesty: At mobile through desktop widths the five-item navigation does not clip or obscure content; both themes retain AA contrast; all new motion is transform/opacity-only and disabled or composed under reduced motion; the page makes no client network request.
- The presentations index owns a reusable card collection with title, summary, route, topic label, and source-project labels; Header, Footer, and the home Explore surface link the new top-level destination.
  - instruction: Define a small typed presentation-card contract and render the index from it; add Presentations to Header, Footer, and home Explore.
  - honesty: Adding a second presentation later requires only another data entry plus its route/content, not a structural rewrite of the index; every card exposes title, summary, route, topic, and source projects accessibly.
- A code-native architecture diagram shows runtime events flowing from the symbolic robot layer to the attached harness-plus-model agent, durable intents flowing back through validation and arbitration, and physical feedback returning to retained maps or rules.
  - instruction: Build an accessible inline SVG or Astro diagram with a complete text alternative and a static reduced-motion final state.
  - honesty: The diagram distinguishes runtime events from cognition output, routes agent actions through intents, validation, and arbitration rather than directly to hardware, and shows retained rules/maps only where the repositories support them.
- Every technical section carries a concise visible source pointer to public repository documentation or committed validation evidence; interpretive neurosymbolic framing is labeled as the presentation's synthesis, not the projects' own terminology.
  - instruction: Maintain a source ledger in the content module and render concise source notes at the technical sections plus a source close.
  - honesty: Every visible source link resolves to a public file, repository, or committed validation artifact, and no sentence implies the repositories themselves use the word neurosymbolic.
- The close links both public repositories and the existing Reachy agent page, while making clear that the presentation connects the systems rather than merging their products or runtimes.
  - instruction: Render the three closing destinations with explicit labels and preserve external-link semantics.
  - honesty: The closing controls link to both public repositories and /agents/reachy-mini-cli/, while copy states that the comparison is architectural and no shared runtime or integration shipped.
- Ship the site change with the repository's required version bump and changelog entry while preserving unrelated working-tree changes.
  - instruction: Run the version-bump skill at implementation close, inspect its exact diff, and stage only intended paths.
  - honesty: The PR changes pyproject.toml and CHANGELOG.md through the repository's version-bump workflow, version-check passes, and pre-existing uv.lock or other dirty files are absent from the commit unless the bump tool legitimately updates them and the diff is reviewed.
- Use this exact three-layer thesis as the presentation's hero and organizing model: The agent is the mind. The code is the nervous system. The robot is the body.
  - honesty: The exact sentence appears in the hero, and its explanation defines agent as harness plus model, nervous system as the symbolic code layer of senses, reflexes, arbitration, memory, and safety, and body as the physical robot; none of the three layers is collapsed into another.
- The first talk follows a spoken eight-beat arc: the three-layer thesis; agent-as-mind; code-as-symbolic-nervous-system; robot-as-body through Reachy and ARM101; a bounded learning ladder; the perceive-to-retain closed loop; consequences and non-claims; source and repository close.
  - instruction: Model the eight beats in the talk data module and compose them in order with spoken-copy headlines and restrained supporting detail.
  - honesty: The built page contains the eight beats in the confirmed order, uses body only for physical hardware and nervous system for robot code, and can be presented top-to-bottom without detouring into repository documentation.
- Presentations remains the programmatically current site section on both /presentations/ and every presentation descendant, including /presentations/mind-nervous-system-body/; Header and Footer use equivalent section-aware current-state semantics without marking unrelated tabs current.
  - instruction: Replace exact-only navigation matching with a shared or equivalent top-level section match, then inspect built index, talk, and unrelated routes for one correct current Presentations state in both navigation regions.
  - honesty: At the built index and talk routes, Header and Footer each expose exactly one Presentations link with an appropriate aria-current value, no unrelated top-level link is current, and existing non-Presentations routes retain their correct current state.
- The perceive-to-retain beat and architecture diagram keep the shipped paths separate: Reachy's external agent attach reads the runtime feed and writes the intent spool; Reachy's forge belongs to folded listen --live --cognition agent and auto-activates validator-gated generated code; Reachy's stash is Python-API-only; ARM101 writes a reachability map that arm flex does not consume. Missing connectors are labeled unshipped or future, never drawn as one closed autonomous learning loop.
  - instruction: Draw separate tracks and label each connector shipped, API-only, or future; use dashed lines only for explicitly unshipped relationships and audit the spoken copy against each repository's current wiring.
  - honesty: No arrow or sentence implies that the external agent-attach client can currently forge or stash, that ARM101's saved map currently gates arm flex, that the two repositories share a runtime, or that either repository ships one autonomous closed learning loop.
- ARM101 safety and contact language stays inside the evidence envelope: contact is inferred from servo load plus stall behavior rather than a tactile sensor, several per-joint thresholds remain estimates pending physical re-validation, abnormal-exit torque release requires a functioning bus, and a clean successful motion may deliberately leave torque holding.
  - instruction: Add a compact limitations callout in the ARM101 beat and source it to origin/main README plus hardware-validation-arm-explore.md; avoid unqualified phrases such as detects every contact or makes motion safe.
  - honesty: The talk never describes ARM101 as having tactile sensing, detecting every physical contact reliably, or making motion inherently safe; its visible caveats name the threshold re-validation gap, bus-loss release limit, deliberate clean-exit hold, and map-integrity/non-consumption limits.
- The technical source ledger uses immutable commit-pinned public URLs for factual evidence—Reachy origin/main 6eab58e5a2e83082c9b6cba1f50342fb2ecf40cf and ARM101 origin/main c05bda23b2352bc80f7aca97c6268bbde7114c04—while separate repository-home links may follow latest; delivery verifies external evidence links separately because the existing site link checker intentionally skips them.
  - instruction: Build factual source URLs from GitHub blob permalinks at the recorded commits, retain friendly repository-home links for discovery, run the internal link checker for site routes, and record a separate external-source resolution check before delivery.
  - honesty: Every technical evidence link resolves to the expected public file at the recorded 40-character commit, repository-home links remain visibly distinct, and delivery evidence does not treat the internal-only site link check as proof that external sources resolve.

## Honesty conditions

- The built site exposes the announced Presentations destination and first talk, and every neural, symbolic, reactive, safety, extension, and learning phrase has a resolvable source or an explicit synthesis label.
- A cold visitor can reach the Presentations index from primary navigation, identify the first card, open the talk, and understand its central thesis without visiting either repository first.
- The page defines harness, model, symbolic layer, intent, and retained adaptation before relying on them, while each section headline remains usable as a presenter's spoken beat.
- Reachy's attachable cognition and deterministic runtime, and ARM101's safe persistent physical mapping, can each be demonstrated from public main-branch artifacts without claiming an integration that does not exist.
- Git status and diff after authoring show no new or modified files in either sibling robot repository and no unrelated org working-tree artifact included in the change.
- The existing Reachy agent route still builds and its page/data/component files are byte-unchanged; the new talk links to it as related material rather than replacing it.
- The delivery diff contains no changes under org/, tests/, or .github/workflows/, while the existing Astro build and link-check lanes pass unchanged.
- No command in the scope or build evidence starts, stops, moves, speaks through, or changes persistent state on either robot; all visual evidence comes from code-native diagrams and committed public artifacts.
- The acceptance walkthrough mechanically finds both routes, all wayfinding links, exactly one index card, all eight narrative beats, both repository links, visible provenance, and the explicit non-claims.
- At the baseline commit there is no /presentations/ route or Presentations nav item, and the cross-repository thesis cannot be read from any single existing site page.
- The build and deterministic content audit prove both named routes, all wayfinding links, one card, the exact three-layer hero, all eight beats, both source projects, and every explicit non-claim.

## Success signals

- A built-site walkthrough reaches Presentations from primary navigation, sees a reusable card index, opens the first talk, and can trace every technical claim to the two source repositories without overstating learning or embodiment.
  - instruction: Turn the success signal into built-HTML assertions or an equivalent deterministic inspection in addition to the normal Astro build and link check.
- The static build emits /presentations/ and /presentations/mind-nervous-system-body/; Header, Footer, and home wayfinding reach the index; the index renders exactly one initial card; the talk presents all eight beats, public source links, both repositories, and no unsupported neural-learning or sentience claim.
  - instruction: Add or run proportionate built-output assertions for the stated signals and include their commands in the delivery evidence.

## Scope / boundaries

- Treat ../reachy-mini-cli and ../arm101-cli as read-only source repositories; this delivery changes only the org site and its required version/changelog artifacts.
  - instruction: Use sibling repositories read-only and stage future commits by explicit path rather than git add -A.
- Keep the existing /agents/reachy-mini-cli page and agents directory role intact; the new presentation is a cross-repository talk, not a replacement agent profile.
  - instruction: Add only the new presentation surfaces and shared navigation edits; do not rewrite agents/reachy-mini-cli.astro or its content modules.
- Ride the existing site build and Cloudflare deploy lanes; no org CLI, Python tests, or GitHub workflow changes are part of this presentation feature.
  - instruction: Ride the existing npm build, org site link-check, and Cloudflare path-filtered workflow without altering their implementation.
- Scope is documentation and read-only code exploration only; live robot motion, speech, capture sessions, and hardware state changes belong to a later approved build phase.
  - instruction: Do not run hardware verbs or service-management commands; treat any future capture request as separately approved work.

## Non-goals

- Do not claim that deterministic robot code is itself sentient or the neural AI, that arm101-cli runs a learned neural policy, or that its current reachability map is rigorous six-degree-of-freedom ground truth.
- Do not turn the talk into a general academic survey of neurosymbolic AI, add a shared robot runtime, implement cross-repository integration, or redesign unrelated agent pages.

## Assumptions

- Use the standard spelling neurosymbolic in the title and copy while preserving the user's intended neural-plus-symbolic concept.

## Scope exploration

- `s1` — `site-astro/src/components/Header.astro + Footer.astro + pages/index.astro`: Primary wayfinding is duplicated in Header and Footer as Learn/Framework/Agents/Engage, while the home page maintains its own teaser list; a real Presentations tab touches all three and must keep the five-item responsive layout legible.
  - seeds: `c2`, `c5`, `c14`
- `s2` — `site-astro/src/data/types.ts + data/site.ts + pages/agents.astro`: The site uses typed data-backed directories and maps entries into reusable cards; a presentations index naturally needs an equivalent metadata contract and one-card-per-presentation collection rather than hardcoded cards.
  - seeds: `c5`, `c6`
- `s3` — `site-astro/src/pages/agents/reachy-mini-cli.astro + data/reachy-mini-cli.ts`: Existing presentation-grade pages are long scrolling Astro narratives whose spoken copy lives in data modules; the Reachy profile is a reusable house pattern but remains an agent-specific page, so the cross-repository talk should be a separate route.
  - seeds: `c3`, `c6`, `c12`, `c16`
- `s4` — `../reachy-mini-cli main: README.md + docs/operating-reachy.md + docs/deliveries/2026-07-17-symbolic-runtime-70.md`: Shipped main documents a deterministic zero-LLM 50 Hz presence, declarative rules, senses, arbitration, intents, a runtime feed, and external agent attach; the delivery evidence says detach does not stop the loop and offline CI proves the runtime works with AI endpoints unreachable.
  - seeds: `c4`, `c7`, `c8`, `c20`
- `s5` — `../reachy-mini-cli/reachy/behavior + reachy/cli/_commands/agent.py + reachy/speech/agent_turn.py`: The source separates the symbolic tick seam and same-spool intent actuation from the model-backed AgentTurnEngine; publish-only speech/pose tools keep an attached agent from becoming a second robot owner.
  - seeds: `c7`, `c8`, `c13`
- `s6` — `../reachy-mini-cli/docs/operating-reachy.md forge loop + reachy/forge + reachy/stash`: Reachy's observable learning/extensibility is bounded: forge asks a coder model for a reaction skill, AST-validates and hot-registers it, while stash persists declarative behavior records; this supports retained adaptation but not a claim that rules are neural learning.
  - seeds: `c10`, `c13`
- `s7` — `../arm101-cli origin/main:0.22.1 README.md + arm101/explore + hardware/gentle.py + hardware/safety.py + docs/hardware-validation-arm-explore.md`: Public main supplies a deterministic agent-first control and safety layer: consent gates, torque ownership, overload-safe moves, contact classification, resumable JSONL exploration, and derived maps; the validation explicitly warns the current map is not rigorous 6-DOF ground truth and is not yet consumed by arm flex.
  - seeds: `c4`, `c9`, `c10`, `c13`
- `s8` — `../arm101-cli current feat/arm-limits branch at 0.24.2 versus origin/main 0.22.1`: The checkout contains substantial unmerged measurement, classification, limit, re-zero, and rolling-frame work across 53 files; whether branch-only physical-learning facts may appear is a content-baseline decision, not something scope can silently settle.
  - seeds: `c9`, `c17`
- `s9` — `repo-wide search in ../reachy-mini-cli and ../arm101-cli for neurosymbolic`: Neither repository uses the term neurosymbolic; it is the presentation's interpretive framing. Copy must distinguish sourced architecture facts from this synthesis and avoid presenting the label as either project's own claim.
  - seeds: `c7`, `c13`, `c18`
- `s10` — `CLAUDE.md + site-astro/src/styles/global.css + .github/workflows/deploy.yml`: The feature rides the existing static Astro, reduced-motion, card, build, and Cloudflare lanes; every PR still needs the repository version/changelog convention, but no Python CLI, test, or workflow surface needs to change.
  - seeds: `c11`, `c14`, `c15`, `c19`, `c20`
- `s11` — `git status in org, reachy-mini-cli, and arm101-cli`: All three checkouts already contain unrelated dirty or untracked state; future delivery must isolate its site and Devague artifacts and must not sweep sibling-repo memory, skill, spec, settings, uv.lock, or wrangler changes into a commit.
  - seeds: `c11`, `c19`
- `s12` — `challenge pass / adjacent-systems lens: site-astro/src/components/Header.astro + Footer.astro + pages/index.astro`: Header current-state logic is exact-route-only and Footer has no current-state logic; the confirmed talk is a descendant route, so the new tab needs section-aware semantics rather than another literal entry.
  - seeds: `c39`
- `s13` — `challenge pass / counter-evidence + data-flow lenses: reachy origin/main agent.py + forge/activate.py + forge/validator.py + operating-reachy.md; arm101 origin/main README.md`: The apparent learning loop is multiple distinct seams: external agent attach has intent tools, forge auto-activates only in folded live cognition, stash is not wired to a noun or agent tool, and ARM101 stores a map that flex does not consume.
  - seeds: `c40`
- `s14` — `challenge pass / failure-mode + hardware-safety lenses: arm101 origin/main README.md + docs/hardware-validation-arm-explore.md + hardware/gentle.py`: Contact is a load-and-stall inference with partially estimated thresholds; the recorded threshold exercise was gravity load, software cannot release torque after physical bus loss, and successful motion may deliberately hold torque.
  - seeds: `c41`
- `s15` — `challenge pass / lifecycle + observability lenses: sibling git remotes/commits + org/cli/_commands/site.py link checker`: Facts are tied to local origin/main snapshots 6eab58e5... and c05bda23..., while the site checker skips every schemed external URL; immutable evidence permalinks and a separate external resolution check close the provenance gap.
  - seeds: `c42`
- `s16` — `challenge pass / security + migration + concurrency + operations + reversibility lenses: Astro config, Layout.astro, package.json, tests.yml, deploy.yml`: The additive static pages introduce no auth, user data, schema migration, server state, or concurrent writer; no client fetch is required, CI builds before deploy, and rollback is the existing git/Pages deployment path. No additional product claim was warranted.
  - seeds: `c14`, `c15`, `c19`
- `s17` — `challenge pass / overlooked-actors + lifecycle lenses: Layout.astro, global.css, PageHero.astro, existing agent presentation pages`: Cold readers, presenters, keyboard/no-JS users, reduced-motion users, and narrow viewports are already represented by confirmed audience/design claims; exact visual density remains implementation evidence, not a new requirement.
  - seeds: `c3`, `c14`, `c37`
- `s18` — `challenge pass / cheap-probe lens: literal Header.astro current-route predicate against the confirmed nested talk route`: Substituting /presentations/mind-nervous-system-body/ into the existing normalized equality check against /presentations/ evaluates false, reproducing the nested-current defect before implementation.
  - seeds: `c39`

## Decisions

- Presentations open as house-style scrolling narrative pages, not fullscreen slide decks.
- ARM101 claims use public origin/main 0.22.1 as the shipped baseline; feat/arm-limits 0.24.2 material may appear only when explicitly labeled in-flight.
- Version one requires no new live hardware capture: use code-native diagrams, public source links, and already committed delivery or hardware-validation evidence; never fabricate terminal output or robot behavior for visual effect.
- Use Mind, nervous system, body as the card and page title and /presentations/mind-nervous-system-body/ as the route.

## Hard questions

- risk: Neurosymbolic can imply a formal hybrid reasoning algorithm; this talk uses it operationally for an attached neural reasoner plus a deterministic symbolic embodiment layer, so that definition must appear before the label carries argumentative weight.
- risk: Learning is the easiest overclaim: generated tools, stashed behavior records, and reachability maps are retained adaptation, not evidence that either robot updates model weights online.
- risk: A fifth primary navigation item can wrap awkwardly at narrow widths even though the current header flexes; responsive verification must treat wrapping as a designed state, not merely an absence of horizontal overflow.
- risk: Visible provenance can turn a talk into documentation clutter; source notes must remain concise and subordinate while still being resolvable.

## Resolved vagueness

- [unknown_nonblocking] The exact talk title, route slug, card metadata fields, and visual motif remain design choices for the later think phase. — resolved: Title and route fixed by c36: Mind, nervous system, body at /presentations/mind-nervous-system-body/; card contract by c25; visual motif remains implementation latitude.
- [unknown_nonblocking] Whether the built talk needs new live robot captures or can rely on diagrams, committed logs, and source citations remains undecided; scope performed no hardware actions. — resolved: Version one uses code-native diagrams and committed public evidence; no live hardware capture, per c29.
