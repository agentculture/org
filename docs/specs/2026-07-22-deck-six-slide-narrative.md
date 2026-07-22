# deck-six-slide-narrative

> The mind-nervous-system-body deck tells the issue-23 story in six visual, declarative slides: one hero line per slide, technical nuance moved to the spoken track, the architecture diagram kept, and a dual-maturity close - Reachy Mini as the working system, ARM101 honestly in progress.
> instruction: rewrite dataset, renderer, node test, and check-presentations.mjs together as one change; verify with 'node --experimental-strip-types --test', 'astro build', and 'node scripts/check-presentations.mjs' all green before opening the PR

## Audience

- live-talk audiences watching the spoken presentation, and site visitors walking /presentations/ on their own - each slide must stand alone as a declarative symbol while the nuance lives in the speaker's voice
  - instruction: read each slide's on-slide text in the built deck WITHOUT its spokenLine - it must communicate alone; rework any slide that needs the spoken track to parse

## Before → After

- Before: today's deck is 10 slides across 8 beats that carry the technical nuance on-slide - a contrast table, a 7-line bring-up sequence, and a rules excerpt that belong in the speaker's voice, not on the wall
  - instruction: verify against main before rewriting: the dataset exports 10 slides across 8 beats with contrastRows, commandLines, and rulesToml fields present
- After: the deck is six visual, declarative slides - one hero line each, the architecture diagram at the center of 'Keep execution below the model', and a dual-maturity close showing Reachy Mini working and ARM101 honestly in progress with one command under each
  - instruction: after the rewrite, check slide count and titles against issue 23's list in order, the diagram on the stack slide, and the dual-maturity close last

## Why it matters

- a declarative deck makes the story land in the room: the audience reads one line per slide while the speaker carries the nuance, and the dual-maturity close makes the talk a demonstrated direction rather than a finished-product pitch
  - instruction: design-review the built deck at presentation distance: hero lines legible at a glance; ARM101 copy says in-progress and never claims a persistent runtime

## Requirements

- mind-nervous-system-body-slides.ts restructures from 10 slides across 8 beats (org#21 reframe) to issue 23's six slides - new slide shapes for the three-column intelligence-paths slide, the three-label runtime-surfaces slide, and the three-situation autonomy slide; each slide carries one declarative hero line with nuance moved to the spoken track; the rules.toml slide and the 7-line bring-up sequence have no slot of their own (slide 6 carries one command per robot); deckSources still renders once on the new close slide
  - instruction: restructure the dataset to issue 23's six slides: bridge, intelligence-paths columns, stack+diagram, runtime-surfaces labels, autonomy situations, dual-robot close; one declarative hero line per slide, nuance in spokenLine
  - honesty: the rewritten mindNervousSystemBodySlides passes kind/shape agreement with the new slide kinds, carries no rules or 7-line command-sequence slide, and deckSources still renders exactly once on the close slide
- mind-nervous-system-body-slides.test.mjs re-pins the six-slide structure - today it pins at-most-10 slides / 8 contiguous beats, the thesis verbatim at index 1, all four photo slots exactly once, kind/shape agreement, a [[react]]+[[inhibit]] rules excerpt, per-robot command prefixes, ARM101 'does not ship a persistent runtime' phrasing, and the verbatim close spokenLine; most assertions change with the restructure
  - instruction: rewrite the assertions in mind-nervous-system-body-slides.test.mjs in the same PR as the dataset; keep the design-rate honesty and no-commit-hash checks
  - honesty: the updated test file pins the six-slide structure (count, kinds, thesis verbatim on the close, 4-sentence spokenLine cap, photo mapping per q3) and fails when any of those regress
- check-presentations.mjs re-pins its built-HTML deck checks - it currently asserts exactly 10 data-deck-slide sections, 2 photo slides per robot, the four deck images exactly once with alt text, the verbatim thesis text, and the architecture diagram embedded exactly once
  - instruction: re-pin expectedDeckSlideCount to 6, the per-robot photo expectations to q3's mapping, and move the thesis-verbatim check to the close slide's section
  - honesty: check-presentations.mjs passes against the built dist with the six-slide expectations and still fails on a deliberately broken build (wrong slide count, missing diagram, missing thesis)
- the deck renderer mind-nervous-system-body.astro gains layouts for the new slide shapes (three columns, labels around an image, three image-led situations, dual-robot close) - it currently branches on kinds opener/thesis/diagram/contrast/robot/commands/rules/close; new layouts meet the confirmed site design bar including reduced-motion support
  - instruction: add layout branches for columns / labeled-image / situation-triptych / dual-robot close in mind-nervous-system-body.astro, reusing the existing reveal system; check both dawn themes and mobile widths
  - honesty: each new slide shape has a dedicated renderer branch with no unstyled fallback, and every animation honors prefers-reduced-motion per the confirmed site design bar
  - honesty: the existing presenter affordances survive the restructure: ArrowRight/ArrowDown keyboard advance, prev/next controls, the dot-rail scroll-spy, and reduced-motion instant jumps all work across the six new slides
  - honesty: every animation in the new layouts actually runs in the built page - no dead CSS from Astro style scoping failing to reach injected or global markup; use :global() per the established terminal-component pattern where needed
- per q2: CliRuntimeStackDiagram's behavior-runtime layer label gains 'ROS 2 or native', with the svg title/desc narration updated to match; no other diagram change
  - instruction: edit CliRuntimeStackDiagram.astro: runtime layer-title gains 'ROS 2 or native', desc narration updated to match; nothing else
  - honesty: the diagram diff touches only the runtime layer label and the svg title/desc narration - every other box, arrow, and label stays byte-identical
- per q1: the close slide carries the verbatim thesis 'A CLI for intelligence. A runtime for embodiment.' as its bottom line; the node test and the built-HTML check re-pin it on the close slide
  - instruction: move the thesis string to the close slide's bottom line in the dataset; update the index-1 pin in the test and the deck-text check in check-presentations.mjs to the close slide
  - honesty: the built close slide's text content includes the verbatim thesis 'A CLI for intelligence. A runtime for embodiment.' and the node test pins it at the last slide index
- per q4: the spokenLine budget relaxes to at most 4 sentences deck-wide so issue 23's slide-6 spoken passage fits the existing field; no separate speaker-notes field
  - instruction: change the sentenceCount cap assertion from 2 to 4; carry issue 23's slide-6 spoken explanation into that slide's spokenLine
  - honesty: the test's sentence budget reads 4 and every slide's spokenLine - including slide 6's passage from issue 23 - fits within it
- the deck is Ori's anchor presentation accompanying the live talk - fun yet informative, image- and diagram-led: every slide carries a visual element (photo, diagram, illustration, or glyph), never text alone
  - instruction: during the design pass, view each slide full-viewport: any slide that is text-alone gets its visual element added; hold the confirmed site design bar including reduced-motion support
  - honesty: a design review of the built deck confirms every slide reads visual-first at presentation distance and the deck feels inviting rather than corporate

## Honesty conditions

- the published deck route renders exactly six data-deck-slide sections matching issue 23's six named slides in order, with the diagram kept and the dual-maturity close present
- the PR diff shows CliRuntimeStackDiagram.astro changed only per c12 (runtime label + narration), and the built deck embeds the diagram exactly once with its title/desc pair
- the PR diff touches no article surface - the article route, mind-nervous-system-body.ts data, and the article checks render and pass byte-identical before and after
- every slide's on-slide text reads as one declarative line or a labeled visual - no slide requires the spoken track to be parseable on its own
- the pre-change dataset on main is verifiably 10 slides across 8 beats carrying the contrast table, the 7-line command sequence, and the rules excerpt on-slide
- the shipped dataset has exactly six slides matching issue 23's six titles in order, the diagram on the stack slide, and the dual-maturity close last
- each hero line renders in the deck's display type readable at a glance, and the close presents both maturity levels without overclaiming ARM101 (no persistent-runtime claim)
- CI runs all three checks (node test, astro build, check-presentations.mjs) and each one fails when its re-pinned expectation is deliberately broken

## Success signals

- node --test, astro build, and check-presentations.mjs all pass with the re-pinned six-slide expectations, and the published deck at /presentations/mind-nervous-system-body/ renders exactly six slides matching issue 23's structure
  - instruction: keep all three checks wired in CI; before merging, deliberately break one expectation of each check, watch it fail, then restore it

## Scope / boundaries

- CliRuntimeStackDiagram.astro survives - the user explicitly likes the diagram; it stays embedded exactly once, on the new 'Keep execution below the model' slide (issue 23 slide 3), with its accessible title/desc pair intact
  - instruction: review the PR diff for CliRuntimeStackDiagram.astro - only the runtime layer-title and the title/desc narration strings may differ; the diagram-embedded-exactly-once check stays green
- the article at /articles/mind-nervous-system-body/ and its evidence-pinned data stay untouched - the deck stopped deriving from the article in org#21 (slides.ts header) and check-presentations.mjs enforces 'deck is not the article'; narrative sharpening is deck-only
  - instruction: run git diff --stat on the PR - no article route, article data, or article check may appear; the article checks in check-presentations.mjs stay untouched and green

## Non-goals

- the photo pipeline keeps its drop-in contract - presentation-photos.ts slots and the docs/presentation-photos.md shot brief stay unchanged; the four webp files are still placeholder slates, so slide 6's Reachy/ARM101 images render placeholders until real captures land over the same filenames
- presentations.ts (the commit-pinned evidence ledger and ARM101_COMMIT) and the Presentations index page stay untouched - the index card names no slide count, only the deck route

## Assumptions

- imagery split per q3: slide 1 gets a new inline SVG illustration (agent -> interface -> robot); slide 4's central image is the Reachy Mini action photo with the three labels around it; slide 5's stuck vignette uses the SO-101 action photo with site-palette SVG vignettes for disconnected and routine; slide 6 uses the two hero photos - all four photo slots stay used exactly once
- slide 2's three intelligence-path columns (coded behavior / learned policy / agent tools) each carry a small glyph or icon in the site palette so the slide reads visual, not as a text table - issue 23 specifies only text columns

## Scope exploration

- `s1` — `issue agentculture/org#23`: six named slides, each visual and declarative with a bottom hero line; technical nuance explicitly belongs in speech; the final slide shows both maturity levels (Reachy Mini working, ARM101 in progress) with one command under each robot
  - seeds: `c2`
- `s2` — `site-astro/src/data/mind-nervous-system-body-slides.ts`: current deck is 10 slides across 8 beats (org#21 reframe); kinds opener/thesis/diagram/contrast/robot/commands/rules/close; deckSources renders once on the close slide; the rules slide and the 7-line bring-up sequence have no slot in the issue's six slides
  - seeds: `c2`
- `s3` — `site-astro/src/data/mind-nervous-system-body-slides.test.mjs`: pins the slide/beat budget, thesis verbatim at index 1, all four photo slots exactly once, kind/shape agreement, the rules excerpt, per-robot command prefixes, the ARM101 no-runtime phrasing, and the verbatim close line - the six-slide restructure rewrites most assertions
  - seeds: `c3`
- `s4` — `site-astro/scripts/check-presentations.mjs`: asserts against built HTML: exactly 10 data-deck-slide sections, 2 photo slides per robot, 4 deck images exactly once with alt text, the verbatim thesis text, the diagram embedded exactly once, and no article beat anchors on the deck
  - seeds: `c4`
- `s5` — `site-astro/src/pages/presentations/mind-nervous-system-body.astro`: 771-line renderer branching per slide kind; the diagram slide embeds CliRuntimeStackDiagram beside the copy; the issue's three-column, labeled-image, situation-triptych, and dual-robot layouts have no existing branch
  - seeds: `c5`
- `s6` — `site-astro/src/components/CliRuntimeStackDiagram.astro`: five accessible layers (optional agent harness -> robot CLI -> behavior runtime -> device daemon -> hardware) with a title/desc narration pair; box and arrow labels verbatim from org#21; no ROS mention anywhere - issue 23's slide-3 stack names 'ROS 2 or native runtime'
  - seeds: `c6`
- `s7` — `article surfaces (slides.ts header + the 'deck is not the article' check)`: the deck stopped deriving from the article in org#21 - the article keeps the mind/nervous-system/body metaphor and the commit-pinned evidence ledger, so narrative sharpening is deck-only
  - seeds: `c7`
- `s8` — `site-astro/src/data/presentation-photos.ts + docs/presentation-photos.md`: four placeholder slots with a drop-in replacement contract (real photo saved over the same filename, nothing in code changes); the doc still says the photographs are not yet taken
  - seeds: `c8`, `c9`
- `s9` — `site-astro/src/data/presentations.ts + site-astro/src/pages/presentations/index.astro`: the index card links to the deck route with no slide-count copy; presentations.ts holds the article's commit-pinned evidence and ARM101_COMMIT - neither changes for a deck-only restructure
  - seeds: `c10`
- `s10` — `challenge pass / presenter-lifecycle lens: deck nav script in mind-nervous-system-body.astro`: keyboard advance (ArrowRight/ArrowDown), prev/next controls, IntersectionObserver dot-rail scroll-spy, and reduced-motion instant jumps already exist, written generically over data-deck-slide sections - the restructure must keep them working
  - seeds: `c5`
- `s11` — `challenge pass / hidden-dependency lens: Astro scoped styles vs injected markup`: the lobes-page lesson: slide animations can ship as dead CSS when Astro's scoped selectors fail to reach runtime-injected markup; the working terminal components use :global() - seeded an animations-actually-run honesty condition on the renderer claim
  - seeds: `c5`
- `s12` — `challenge pass / adjacent-systems lens: check-presentations.mjs no-redirects rule`: old deck deep links (slide anchors) will break when slide ids change; the repo already records this as acceptable - the check asserts public/_redirects must not exist, deep links are allowed to break rather than silently redirect
- `s13` — `challenge pass / cheap probe: issue 23 slide-6 spoken passages vs the 4-sentence cap`: with the test's sentence regex, the spoken explanation counts 3 sentences and the verbal close 1 - exactly 4 combined, fitting the relaxed cap with zero headroom
  - seeds: `c14`
- `s14` — `challenge pass / cheap probe: repo-wide image inventory`: find over site-astro/public returns only the four placeholder slates and apple-touch-icon.png - no real robot photograph exists anywhere in the repo; the agents pages' live captures are terminal captures, not photos - seeded the pre-talk photos question q5
- `s15` — `challenge pass / security, migration, concurrency, reversibility lenses: the deck surfaces`: clean pass: prebuilt static HTML with no runtime state, no auth surface, no migration, single-PR revertable via git; no c19 escalation signal applies - residual risk not eliminated, only unobserved on these surfaces
- `s16` — `challenge pass / observability + rollback lens: CI trio + operator deploy`: the three checks (node test, astro build, check-presentations.mjs) with the deliberate-break verification in h15 are the observability; rollback is git revert plus operator redeploy via cultureflare - no gap found beyond deploy being operator-owned, already a recorded constraint
