# Global typography and section-width system

> **Status:** Implemented in the current `ux-review` working tree on 22 July
> 2026 and awaiting user visual review. The work is uncommitted: no push, PR,
> deployment, route change, or Learn source/deployment change has been made.

> **Audit baseline:** the current `ux-review` working tree at `2cb8101`, plus
> its uncommitted information-architecture and navigation work. That worktree
> contains 12 owned routes, the six-item primary navigation ending in
> **Open Learn**, breadcrumbs, local section navigation, and the grouped footer.

## Adopted direction in one paragraph

The migration adopts the Devague work as a role-based global system, but does
not copy its built CSS and does not replace `.container` in one operation. It
preserves 17px for real body/prose copy; adopts the mock's smaller page-title
ceiling, lede scale, heading measure, terminal size, compact leading, and
tracking roles; and adds
named page, shell, wide, heading, and prose rails. A faithful 58rem shell also
requires moving the desktop-navigation breakpoint because the current six-item
header uses all available inline space at 768px. Bespoke diagrams and the
presentation deck need explicit wide/deck roles rather than inheriting the
standard page rail.

## Scope

This migration covers four connected foundations:

1. font-size roles;
2. line-height roles;
3. letter-spacing roles; and
4. section rails and reading measures.

It deliberately does **not** cover:

- font-family, weight, colour, radius, shadow, or motion changes;
- navigation order, current-state matching, breadcrumbs, footer information
  architecture, or the Open Learn destination;
- changes in the separate Learn source or deployment;
- route, redirect, content, transcript, or presentation-story changes;
- making bespoke diagram labels use editorial text roles; or
- card padding and vertical section spacing, except where later layout testing
  proves they must be adjusted to support the approved type and rail choices.

## Evidence and authority

The sources do not describe one consistent final system. Use this order for
this initiative:

| Priority | Source | Use |
|---:|---|---|
| 1 | Current authored Astro source under [`site-astro/src`](../../site-astro/src) | The source of truth for today's structure, inheritance, components, breakpoints, and blast radius. |
| 2 | The retained [Devague full-page mock](mocks/devague/2026-07-21-review-style/README.md), judged from its rendered computed styles | Visual evidence for the desired density and hierarchy. It is not source code to transplant. |
| 3 | [`spacing-type-system.html`](spacing-type-system.html) and [`spacing-type-and-captures.md`](spacing-type-and-captures.md) | The rationale behind the role model and the terminal-legibility fix. |
| 4 | Earlier UX-review status and adoption documents | Historical context only where they agree with the current source and this reviewed proposal. |

The retained mock began from the production build at `d71a719`, then changed in
a scratchpad and was retained at `cea730b`. The local `ux-review-spacing` branch
currently points to `35cdfd3`. Neither baseline contains the current header,
footer, breadcrumbs, route inventory, or navigation behaviour.

### Dated documents that must not silently govern this work

| Document or artefact | Dated assumption | Treatment here |
|---|---|---|
| [`README.md`](README.md) and [`findings.md`](findings.md) | Audit `d71a719`, `site-astro@0.0.1`, and eight routes. | Retain measured historical evidence; do not use their route count or current-state claims. |
| [`current-direction.md`](current-direction.md) | Says no proposal in the folder has been applied to `site-astro/`. | That describes an earlier worktree and does not describe the current uncommitted IA/navigation implementation. |
| [`design-system.md`](design-system.md) | Freezes the 68rem container, treats Devague as opt-in only, and records four failures in a 20-check presentation baseline. | Its ownership and regression principles remain useful. Its containment decision is the question now being reopened; its test status is stale. The current presentation checker passes 21 checks. |
| [`spacing-type-system.html`](spacing-type-system.html) | Shows a 36px display role, four-column operator-skills layout, grid outdent, 32–96px gutter, 68rem container, and 17px prose. | Use its type-role rationale, not its example layout as the final mock. |
| Retained mock HTML/CSS | Uses an old four-link header and flat footer; contains generated selectors and layered prototype overrides. | Use rendered appearance and measurements only. Never copy `_astro` output into source. |

This document is the review surface for the implemented migration. It does not
retroactively rewrite the intent of the older artefacts.

## What the retained mock actually renders

The final retained page is not the same as the early spacing prototype. The
following values were measured in a local browser against the retained
snapshot, not inferred from comments:

| Role | 390px viewport | 768px viewport | 1280px viewport | Final rendered rule |
|---|---:|---:|---:|---|
| Body | 16px | 16px | 16px | Browser-default `1rem`, leading `1.7`. |
| Page h1 | 38.4px | 46.08px | 57.6px | `clamp(2.4rem, 6vw, 3.6rem)`, leading `1.1`, tracking `-0.015em`. |
| Lede | 18.4px | 18.4px | 21.6px | `clamp(1.15rem, 2.2vw, 1.35rem)`, leading `1.6`. |
| Section h2 | 25.6px | 25.6px | 33.6px | Restored to `clamp(1.6rem, 3vw, 2.1rem)`, leading `1.14`, tracking `-0.01em`, 44rem maximum. |
| Ordinary section paragraph | 15.2px | 15.2px | 15.2px | A late `.95rem` page override, leading `1.7`. |
| Pipeline card title | 20px | 20px | 20px | `1.25rem`, leading `1.25`, tracking `-0.01em`. |
| Card/skill explanatory copy | 14.72px | 14.72px | 14.72px | `.92rem`, leading `1.55`. |
| Operator-skill title | 18.4px | 18.4px | 18.4px | A later `1.15rem` exception, leading `1.3`. |
| Terminal transcript | 13px | 13px | 13px | `.8125rem`, leading `1.55`, flat tracking; nested code inherits. |

The mock's `.container` has a 58rem **outer** maximum and includes its side
padding because the site uses `box-sizing: border-box`:

| Viewport | Outer container | Inline padding | Usable content width |
|---:|---:|---:|---:|
| 390px | 390px | 20px each side | 350px |
| 768px | 768px | 38.4px each side | 691.2px |
| 1024px and above | 928px | 48px each side | 832px / 52rem |

That distinction matters: “58rem section width” in this mock does not mean
58rem of usable content plus gutters.

### Conflicts inside the old work

The old work contains at least six material conflicts that require an explicit
choice:

1. Intended prose is 17px in the early system, 16px on the mock body, and
   15.2px in most final mock sections.
2. Intended display tracking is `-0.02em`; the retained h1 actually renders at
   `-0.015em`.
3. A late mock rule first flattened h2 to 24px, then another rule restored the
   existing responsive 25.6–33.6px h2.
4. Uppercase tracking is proposed as `0.12em`, but untouched mock eyebrows
   still render at `0.17em`.
5. Operator skills move from the early four-column/outdented example to the
   retained three-column/aligned layout.
6. The card-title token is 20px, while a later operator-skill title exception
   renders at 18.4px.

These are prototype seams, not a global specification.

## Adopted type roles

The following is the recommended normalization. Token names are draft API
names for review; the values and semantic boundaries matter more than the
exact spelling.

| Role | Recommended value | Applies to | Does not automatically apply to |
|---|---:|---|---|
| Page title | `clamp(2.4rem, 6vw, 3.6rem)` | Shared `PageHero` titles and equivalent editorial page titles. | Home brand hero, article talk title, or deck slide titles until each is deliberately mapped. |
| Section title | `clamp(1.6rem, 3vw, 2.1rem)` | Editorial h2 headings at the section level. | Card headings, diagram labels, or slide typography. |
| Card title | `1.25rem` | Structural card and reference-row titles. | Every h3 merely because it is an h3. |
| Component title | `1.15rem` | Compact component titles where 20px is too loud. | Long editorial headings. |
| Lede | `clamp(1.15rem, 2.2vw, 1.35rem)` | Page introductions and intentional closing statements. | All first paragraphs by selector. |
| Body/prose | `1.0625rem` / 17px | Long-form paragraphs and substantial card copy. | Navigation, metadata, terminal transcripts, or diagram labels. |
| UI/supporting | `0.92rem` / 14.72px | Short navigation/supporting labels with adequate targets. | Paragraph-length explanatory card copy. |
| Metadata | `0.75rem` / 12px | Eyebrows, short tags, and non-essential context. | Primary instructions or essential content. |
| Micro metadata | `0.6875rem` / 11px | Non-essential compact terminal/leg labels only, after zoom and contrast review. | Body copy or interactive labels. |
| Terminal | `0.8125rem` / 13px | Transcript content, set once on the terminal region. | Inline code in prose. |

The recommendation intentionally does **not** carry the mock's 15.2px section
paragraph rule into the global system. It would make long-form copy smaller
than the current site and smaller than the early system intended. Likewise,
`.92rem` is a compact UI role, not a new default card-body size. Multi-line
reading copy should remain at least 1rem, with 17px retained for prose.

### Adopted leading roles

| Role | Value | Intended use |
|---|---:|---|
| Display | `1.1` | Large page titles. |
| Heading | `1.14` | Responsive editorial section headings. |
| Compact UI | `1.25` | Eyebrows, tags, single-line controls, and compact titles. |
| Card copy | `1.55` | Short-measure multi-line supporting copy. |
| Lede | `1.6` | Introductions and highlighted statements. |
| Prose | `1.7` | Long-form reading copy at the prose measure. |

This adds a named `1.14` heading role because both the current site and the
final rendered mock use it. Forcing every h2 into either `1.1` or `1.25` would
lose an established and visually useful middle role.

### Adopted tracking roles

| Role | Value | Intended use |
|---|---:|---|
| Display | `-0.015em` | Page titles; this follows the retained rendered result. |
| Heading | `-0.01em` | Section, card, and component headings. |
| Flat | `0` | Body text and all monospace transcripts. |
| Caps | `0.12em` | Uppercase metadata at 13px and below. |
| Identity | Existing local values | Wordmarks and other brand marks remain deliberate exceptions. |

The global `code, .repo { font-size: .82em; letter-spacing: .01em; }` rule must
not be allowed to shrink or track terminal descendants. Terminals should set
13px once and make their nested `code` and line spans inherit both size and
tracking.

### Implemented token shape

The implemented global API uses these names and values:

```css
--ac-type-page-title: clamp(2.4rem, 6vw, 3.6rem);
--ac-type-section-title: clamp(1.6rem, 3vw, 2.1rem);
--ac-type-card-title: 1.25rem;
--ac-type-component-title: 1.15rem;
--ac-type-lede: clamp(1.15rem, 2.2vw, 1.35rem);
--ac-type-body: 1.0625rem;
--ac-type-ui: 0.92rem;
--ac-type-meta: 0.75rem;
--ac-type-micro: 0.6875rem;
--ac-type-terminal: 0.8125rem;

--ac-leading-display: 1.1;
--ac-leading-heading: 1.14;
--ac-leading-ui: 1.25;
--ac-leading-card: 1.55;
--ac-leading-lede: 1.6;
--ac-leading-prose: 1.7;

--ac-tracking-display: -0.015em;
--ac-tracking-heading: -0.01em;
--ac-tracking-flat: 0;
--ac-tracking-caps: 0.12em;
```

The `--ac-` namespace avoids collisions with the mock's unscoped `--fs-*`,
`--lh-*`, and `--ls-*` experiment tokens.

## Adopted horizontal system

One global width cannot safely serve text, navigation, cards, terminals,
diagrams, and presentation slides. The design system names each job:

| Role | Adopted maximum | Purpose |
|---|---:|---|
| Standard page rail | 58rem outer width, including fluid gutters | Shared heroes and ordinary content sections; this is the retained mock's visual rail. |
| Shell rail | 58rem with a 52rem desktop-menu threshold | Header and grouped footer; the details menu now remains active through 51.99rem. |
| Wide rail | 74rem outer width, providing 68rem of usable content at the maximum gutter | Agent diagrams, dense grids, multi-column terminal compositions, and data-rich surfaces that lose meaning at 58rem. |
| Deck content rail | 68rem usable width inside its existing 24px viewport inset | Six full-viewport slides and their internal compositions; it does not inherit a changed generic `.container`. The name deliberately avoids the deck's existing `.deck-rail` slide navigation. |
| Heading measure | 44rem | Long section headings, with ordinary greedy wrapping rather than globally balanced wrapping. |
| Prose measure | 42rem | Long-form copy; target roughly 65–75 characters per line. |
| Page gutter | `clamp(1.25rem, 5vw, 3rem)` | The retained mock's 20–48px responsive inset. Surface padding remains separate. |

### Header constraint created by the new navigation

At a 768px viewport, the current desktop header measures:

- 158.9px wordmark;
- 537.1px desktop-menu region;
- 24px gap; and
- 720px available width on the current rail.

When the mock's 58rem rail and fluid gutter are simulated, the navigation
shrinks to its 508.3px minimum and the three pieces consume the entire 691.2px
usable width. It fits, but with effectively no tolerance for font metrics,
copy, or browser differences. The retained mock did not reveal this because it
only had four primary links.

The review considered two coherent options:

| Option | Result | Trade-off |
|---|---|---|
| **A — recommended for visual consistency:** use the 58rem shell rail and move the desktop-menu threshold from 48rem to about 52rem. | Header, hero, sections, and footer share one edge system; 768px uses the accessible details menu. | Changes the already-reviewed menu breakpoint and therefore requires another focused navigation test. |
| **B — lowest navigation risk:** retain the 68rem shell rail and its 48rem breakpoint; use 58rem for ordinary page sections only. | Preserves current header behaviour. | Shell and content edges no longer reproduce the retained mock's single rail. |

Option A is adopted. The 58rem shell and 52rem threshold are implemented and
covered by the navigation and rendered geometry checks.

### Why `.container` must not be flipped globally

The current `.container` appears in 55 authored wrappers across 15 files. It
controls the header, footer, `PageHero`, all route families, and every slide in
the current deck. Replacing its declaration would simultaneously:

- change shell fit and the mobile-menu threshold;
- rewrap breadcrumbs and “On this page” links;
- reduce several four-column grids to three and several three-column grids to
  two;
- narrow fixed two-column agent/profile arrangements;
- change terminal viewport widths and internal scrolling; and
- alter six slide compositions without any presentation-specific diff.

Introduce named rail primitives and migrate wrappers intentionally. Keep
`.container` as a compatibility alias until every use has an assigned role;
do not make a base-selector edit the migration mechanism.

## Current blast-radius audit

The current source contains 231 `font-size`, 56 `line-height`, 71
`letter-spacing`, and 67 `max-width` declarations across authored Astro/CSS.
This is not a defect by itself: diagram labels, terminals, slide art, and
editorial copy need different roles. It does mean a global selector change
cannot establish the system safely.

### Shared surfaces

| Surface | Current dependency | Impact and required treatment |
|---|---|---|
| [`global.css`](../../site-astro/src/styles/global.css) | 17px body, 1.7 leading, 2.6–4.5rem h1, 1.6–2.1rem h2, 42rem prose, 68rem container, generic `.82em` code. | Add namespaced roles first. Avoid changing body, h1, `.container`, `.card`, or `code` as a migration shortcut. |
| [`Layout.astro`](../../site-astro/src/layouts/Layout.astro) | Imports the global sheet and renders shell components for every route. | Makes every base-selector change site-wide. No new document-shell behaviour is needed. |
| [`Header.astro`](../../site-astro/src/components/Header.astro) and [`PrimaryNavigation.astro`](../../site-astro/src/components/PrimaryNavigation.astro) | Current rail, 48rem menu breakpoint, 1.22rem wordmark, `.92rem` links and Open Learn CTA. | Assign shell rail and UI roles together. Keep Open Learn last, green, new-tab, and outside current-section matching. Re-test exact breakpoint fit. |
| [`Footer.astro`](../../site-astro/src/components/Footer.astro) | Current rail plus several local text sizes and grouped navigation. | Assign shell rail and supporting/meta roles; verify group wrapping and external-link cues in both themes. |
| [`PageHero.astro`](../../site-astro/src/components/PageHero.astro) | Global h1, lede, prose, and container inherited by nine routes. | First shared editorial consumer. A title or rail change immediately affects nine route openings, breadcrumbs, intros, and local section navigation. |
| [`Breadcrumbs.astro`](../../site-astro/src/components/Breadcrumbs.astro) | `.82rem` text and wrapping inside heroes/deck opening. | Map to compact UI without reducing the 44px interactive target context; test long current-page labels at 320px. |
| [`SectionNav.astro`](../../site-astro/src/components/SectionNav.astro) | `.72rem` caps label and `.82rem` links. | Map label to caps/meta and links to compact UI; verify wrapping and focus order after rail changes. |
| [`AgentDirectoryCard.astro`](../../site-astro/src/components/AgentDirectoryCard.astro) | Local title, role, repository, and destination sizes. | Map by semantic role. The role paragraph is reading copy and should not be reduced to the compact `.92rem` default merely because it sits in a card. |

### Route families

| Routes | What will move | Primary risks / required exception |
|---|---|---|
| `/` | Home title and tagline are explicitly sized; About and Explore still use global rail/prose; five Explore cards use a 15.5rem auto-fit grid. | Keep a named brand-hero type separate from page-title type. A 58rem inner width changes the Explore layout from roughly 4+1 to 3+2 at wide screens; review that composition, do not accept it accidentally. Keep the mesh scene on its 76rem visual rail. |
| `/framework/` | Shared hero plus a 46rem pillar column with local h2/tagline/point sizes. | Standard-page candidate. Preserve the vertical thread alignment when heading metrics change. |
| `/agents/` | Shared hero, Browse-by-area jump list, group headings, destination labels, and auto-fill directory grid. | A 58rem rail changes the wide directory from four cards to three. Recheck group-anchor landings, counts, and whole-card focus/hover states. |
| `/agents/devague/` | Shared hero plus pipeline, facts, cards, skills, terminals, issue grids, and a custom 56rem flow cap. | Reference consumer for the role system, not source CSS. Decide which compositions need page versus wide rail. Preserve transcript data and progressive enhancement. |
| `/agents/colleague/` | Shared hero plus the largest local type surface: facts, pills, tables, capability grids, diagrams, terminals, and two-column evidence layouts. | Highest profile-page regression risk. Several 15–16rem auto-fit grids lose a column; tables and terminals need independent overflow checks. |
| `/agents/lobes/` | Shared hero, method/capability grids, diagrams, code surfaces, and terminals. | 13.5–15rem grids can lose columns. Keep diagram typography isolated from editorial roles. |
| `/agents/reachy-mini-cli/` | Shared hero, runtime diagram, agent/robot facts, terminal evidence, and 2:3 evidence layout. | Physical-system diagrams and wide terminal evidence require wide-rail review; its 2:3 layout already collapses at 52rem, which may collide with a new shell breakpoint. |
| `/articles/` | Shared hero and 20rem minimum library cards. | A 58rem usable width changes the likely wide layout from three cards to two. Map topic/source metadata separately from summaries. |
| `/articles/mind-nervous-system-body/` | Bespoke 2.8–6rem talk title, breadcrumbs, section nav, 47rem intro, 46rem narrative blocks, beat grid, evidence grid, diagram, and closing links. | Treat the talk title as an editorial-feature role, not the normal page-title token. Test long-form measure, heading wrapping, beat numbering, evidence cards, and sticky/jump offsets. |
| `/presentations/` | Shared hero, 20rem library cards, thumbnail pairs, metadata, and summaries. | Same three-to-two-column risk as Articles, plus thumbnail legibility. |
| `/presentations/mind-nervous-system-body/` | Six full-viewport slides use `.container`, many local clamps, 26–58rem content caps, responsive multi-column layouts, and presentation breadcrumbs. | Must receive an explicit deck rail and retain its own type scale. Only shared breadcrumbs/shell tokens should migrate automatically. Global `.container`, h1, h2, or body changes must not resize slide art by inheritance. |
| `/engage/` | Shared hero and 46rem channel list. | Standard-page candidate; verify icon/title alignment and 44px interactive targets after type mapping. |

### Component classes that need containment

1. **Editorial text:** `PageHero`, article narrative, framework, directory
   summaries, card summaries. These should consume the new global roles.
2. **Shell/UI text:** header, footer, breadcrumbs, local navigation, tags, and
   destination cues. These use compact roles but retain 44px targets.
3. **Terminal text:** all four agent terminal components. These need one 13px
   transcript role, flat tracking, nested inheritance, and intentional
   horizontal scrolling.
4. **Diagram/data labels:** agent diagrams, article architecture diagram, home
   mesh, and deck illustrations. Their pixel/rem values are visual-encoding
   choices and should remain component-owned in this pass.
5. **Presentation typography:** slide titles, statements, captions, rails, and
   source labels. The deck is its own responsive type system and opts out of
   editorial defaults.

## Implementation sequence and current status

Each stage remains a reviewable working-tree change. No PR or handoff is
implied. Phases 1–7 are implemented; phase 8 remains intentionally deferred
until visual review confirms the migration.

### Phase 0 — record decisions — complete

Approve or amend the choices at the end of this document. Capture reference
screenshots of all 12 current routes before visual changes.

### Phase 1 — add tokens — complete

Add namespaced type, leading, tracking, measure, and rail tokens. Initially map
existing selectors to their current computed values so token introduction and
visual redesign are separate diffs.

### Phase 2 — add named text and rail primitives — complete

Add explicit page, shell, wide, deck, prose, and heading roles. Do not redefine
`.container`. Add compatibility aliases only where they preserve current
rendering.

### Phase 3 — migrate shell and shared wayfinding — complete

Migrate Header, PrimaryNavigation, Footer, Breadcrumbs, SectionNav, and
PageHero. If shell option A is approved, change and test the menu breakpoint in
this phase with the rail; never as a later incidental fix.

### Phase 4 — migrate standard/index routes — complete

Migrate Framework, Engage, Home prose/Explore, Agents directory, Articles
index, and Presentations index. Review grid column-count changes as design
decisions rather than generic responsive fallout.

### Phase 5 — migrate long-form editorial content — complete

Migrate the article detail route, preserving its feature-title role and 42rem
reading measure. Review every section heading at actual copy length.

### Phase 6 — migrate agent profiles one at a time — complete

Use Devague first to prove the roles, then Colleague, Lobes, and Reachy. Assign
page versus wide rails section by section. Consolidate terminal typography as
a component change, not repeated page overrides.

### Phase 7 — contain and verify the deck — complete

Give the presentation an explicit deck rail and type ownership. Only then
remove any remaining dependence on the legacy `.container` meaning.

### Phase 8 — decide legacy cleanup — deferred

After all 12 routes have an assigned role, decide whether `.container`,
generic h1/h2 rules, and generic code sizing can be deprecated or safely
aliased. Cleanup is not part of the first visual migration.

## Acceptance plan

### Automated contracts

- `npm run build` produces all 12 routes.
- `npm run test:navigation` retains exact order, descendant matching, false-
  prefix rejection, and Open Learn metadata.
- `npm run check:wayfinding` retains breadcrumbs, structured data, anchors,
  footer groups, and new-tab cues.
- `npm run check:presentations` remains green; add geometry-oriented deck
  assertions because content contracts cannot detect a narrowed slide.
- Link checking remains green and no Learn source/deployment is touched.
- Add a rendered-style audit that fails when terminal `code` is smaller than
  its terminal container or when page/shell rails use an unassigned width.

### Visual and accessibility matrix

Test all 12 routes at 320, 375, 768, 1024, and 1440px, plus one pixel on each
side of every changed breakpoint. Run in light and dark themes, JavaScript on
and off, reduced motion, keyboard-only navigation, and at 200% browser zoom.

Verify:

- no horizontal page overflow;
- header and Open Learn remain visible and reachable;
- mobile `<details>` has one logical tab sequence;
- headings do not orphan a single short word unnecessarily;
- ordinary prose stays near 65–75 characters per line;
- body and substantial card copy remain at least 16px;
- 11–12px metadata is non-essential, high-contrast, and legible at zoom;
- every interactive target remains at least 44px;
- directory and library column-count changes look intentional;
- breadcrumbs and local section navigation wrap without collisions;
- terminal transcript text computes to 13px and nested code inherits;
- terminals scroll internally where necessary without causing page overflow;
- bespoke diagrams retain label fit and accessible descriptions; and
- all six slides preserve their intended composition and viewport behaviour.

## Recorded decisions for this migration

| Decision | Recommendation | Approval |
|---|---|---|
| Body/prose size | Keep 17px; reject the mock's 15.2px section override as a global role. | Adopted |
| Shared page-title size | Adopt `clamp(2.4rem, 6vw, 3.6rem)` for normal page titles. | Adopted |
| Home/article/deck titles | Keep explicit feature roles; review them separately rather than inheriting the normal page title. | Adopted |
| Section h2 | Keep the final responsive 25.6–33.6px rule, 1.14 leading, `-0.01em` tracking, and 44rem measure. | Adopted |
| Display tracking | Use the retained rendered `-0.015em`, not the earlier `-0.02em` intention. | Adopted |
| Caps tracking | Normalize ordinary uppercase metadata to `0.12em`; keep identity exceptions local. | Adopted |
| Compact copy | Limit `.92rem` to short supporting/UI text; keep substantial multi-line copy at least 1rem. | Adopted |
| Terminal typography | Adopt 13px / 1.55 / flat tracking with nested inheritance across all four terminal components. | Adopted |
| Standard page rail | Adopt the retained 58rem outer rail with 20–48px fluid gutters. | Adopted |
| Shell rail and nav breakpoint | Use the 58rem shell and a 52rem desktop-menu threshold. | Adopted |
| Wide and deck rails | Add explicit roles; do not force diagrams, dense terminal grids, or slides onto the standard rail. | Adopted |
| Grid reflow | Assign page and wide rails route by route, then review the rendered column counts rather than inheriting one global width. | Implemented; user visual review pending |

## Implementation boundary and verification

Implementation remains confined to this `org` repository and uncommitted. It
does not modify or deploy Learn. The existing information-architecture work,
grouped site footer, and four-profile `ClosingBand` treatment remain separate
semantic surfaces and are preserved by dedicated contracts.

The current working tree has passed:

- a 12-route production build and local link check with zero broken links;
- 7 navigation tests and 38 wayfinding checks;
- the 4-route closing-band contract, including all 7 reviewed actions;
- 103 design-system checks, including explicit wrapper roles, shell geometry,
  six deck content rails, and four terminal inheritance contracts;
- 21 presentation checks and 17 slide-data tests; and
- a rendered route matrix in both themes at 320, 375, 768, 832, 833, 1024,
  and 1440px, with reduced motion, JavaScript disabled, 200% text sizing,
  terminal inheritance, 44px Open Learn targets, and horizontal overflow
  checks.

Manual visual and keyboard review remains appropriate before any commit or PR.
