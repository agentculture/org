# Design-system adoption plan

> **Status:** Current working agreement, 22 July 2026. Audited on branch
> `ux-review` at `ef392d9`, after merging `origin/main` at `aea608b`. This is a
> documentation-only plan: no file under `site-astro/` has been changed.

> **Visual review companion:** open [`design-system.html`](design-system.html)
> to inspect the token roles, layout rails, responsive pipeline, candidate
> components, interaction contracts, and adoption boundary described here. It
> is a standalone review specimen, not an Astro source implementation.

The Devague mock is now rich enough to be treated as design-system evidence,
but it is not a replacement stylesheet for the site. It contains a mixture of
good shared foundations, promising reusable components, Devague-specific
composition, and retained prototype residue. Its compiled bundle also changes
global rules that every route depends on.

The safe approach is therefore:

1. keep the current Astro source as the production baseline;
2. extract decisions from the mock, not generated markup or CSS;
3. establish an opt-in system of tokens, primitives, components, and contracts
   before changing the live Devague route;
4. prove that system against an isolated reference specimen based on the mock;
5. migrate Devague as the first production consumer only after the system gate;
   and
6. migrate other routes later, promoting a pattern to a global default only
   when it has a second real consumer.

This document records what belongs at each layer, where adoption would collide
with the current site, and the sequence for implementing the work without a
site-wide restyle by accident.

## Sources and authority

| Source | What it is authoritative for |
|---|---|
| [`site-astro/src/styles/global.css`](../../site-astro/src/styles/global.css) | Current production tokens, base elements, layout primitives, cards, focus, reveal, and reduced-motion behaviour. |
| [`site-astro/src/layouts/Layout.astro`](../../site-astro/src/layouts/Layout.astro) | Current document shell, metadata, fonts, header/footer, and shared reveal observer. |
| [`site-astro/src/pages/agents/devague.astro`](../../site-astro/src/pages/agents/devague.astro) | Current production Devague semantics, section order, and component boundaries. |
| [`site-astro/src/components/DevagueFlow.astro`](../../site-astro/src/components/DevagueFlow.astro) | Current production pipeline component and its progressive-enhancement contract. |
| [`site-astro/src/components/DevagueTerminal.astro`](../../site-astro/src/components/DevagueTerminal.astro) | Current production terminal semantics, replay behaviour, and capture rendering. |
| [`design-system.html`](design-system.html) | Current visual review surface for the candidate system, with working interaction and responsive specimens. Appearance here means ready to review, not established in source. |
| [Retained full-page mock](mocks/devague/2026-07-21-review-style/README.md) | The latest integrated visual direction and interaction specimen. |
| [`captures-story-plan.md`](captures-story-plan.md) | Intended guided-session content model, verbatim-evidence contract, and source-component handoff. |
| [`pipeline-layout-plan.md`](pipeline-layout-plan.md) | Intended pipeline hierarchy, responsive behaviour, and animation repairs. |
| [`spacing-type-and-captures.md`](spacing-type-and-captures.md) | Measurements behind the proposed spacing, leading, tracking, and terminal-legibility changes. |
| [`agent-page-scaling.md`](agent-page-scaling.md) | Longer-term sequence for sharing terminal and agent-page architecture. |

When these sources differ, use [`current-direction.md`](current-direction.md) for
status and precedence. Use the retained mock to judge the composition, but use
the current Astro source to understand what an implementation would replace.

### What must not become source

Do not copy the retained `_astro/` CSS, HTML shell, or scripts into
`site-astro/`. In particular:

- `data-astro-cid-*` selectors are build output, not stable authored APIs;
- the built header, footer, and layout predate current source changes;
- hidden comparison variants are provenance, not approved interface states;
- the snapshot duplicates observers and interaction scripts already owned by
  source components; and
- broad selectors such as `body`, `h1`, `.container`, `.card`, and `code` in the
  bundle would escape the Devague page if transplanted.

## The system model

Every decision should have one owner. A useful five-layer model is:

| Layer | Owns | Current examples | Adoption rule |
|---|---|---|---|
| **1. Foundations** | Theme colours, families, raw spacing, type metrics, radii, elevation, easing | `:root` in `global.css` | Global only when the meaning is stable across the site. Never redefine these from a page bundle. |
| **2. Primitives** | Page rail, reading measure, section rhythm, text roles, focus, surface | `.container`, `.prose`, `.section`, `.eyebrow`, `.card` | Keep backward-compatible. Add a named variant instead of changing the base while one page is being redesigned. |
| **3. Components** | A reusable visual and behavioural contract | `PageHero`, terminal, copy control, disclosure, transcript modal | Own markup, styles, state, accessibility, and tests together. Prefer Astro scoping and explicit props. |
| **4. Compositions** | Page-specific ordering and content | Devague pipeline, seven moves, three capture sessions | Compose primitives and components; do not promote exact content structures into global CSS. |
| **5. Experiments** | Alternatives retained for comparison | Hidden flow variants and unused capture layouts | Keep in review artefacts only. Mark as superseded or remove when provenance is no longer needed. |

This prevents a common failure mode: promoting a visually successful page rule
straight into `global.css` before its meaning is understood.

## Current production foundation

The site already has a coherent visual foundation. It should be extended, not
replaced.

### Existing global tokens

The current root has 26 tokens:

- core theme colours: background, surface, ink, accent, and line roles;
- decorative sky and mesh colours;
- two elevation roles;
- display, body, and monospace font families;
- two easing curves; and
- section padding and radius.

Light and dark themes share the same semantic names. The global stylesheet also
owns the focus ring, skip link, one-time reveal system, and the universal
reduced-motion kill switch. Those are system contracts, not Devague styling.

### Gaps the mock usefully exposes

There is no global spacing scale, type-size scale, breakpoint scale, or named
component-density system. The live stylesheet therefore mixes `rem`, `em`,
pixels, `vh`, and component-local values. The measured consequences are:

- nested `em` sizes and margins compound into fractional values;
- prose leading leaks into single-line labels and adds phantom vertical space;
- global `code { font-size: 0.82em; }` shrinks terminal text a second time; and
- sections can appear to have different gutters when page rail, reading measure,
  and component padding are used as if they were the same dimension.

The design-system work should solve those causes without retuning the whole site
inside the Devague change.

## Candidate foundations

The following are candidates extracted from the mock. “Candidate” means they
may enter the opt-in system and its reference specimen; it does not mean they
are approved root replacements or may change a production route yet.

### Spacing

Use a fixed 4px-based raw scale for component relationships:

| Role | Value |
|---|---:|
| `space-1` | 4px |
| `space-2` | 8px |
| `space-3` | 12px |
| `space-4` | 16px |
| `space-5` | 24px |
| `space-6` | 32px |
| `space-7` | 48px |
| `space-8` | 64px |

Raw scale names should not appear everywhere in component markup. Components
should map them to local semantic roles such as `--card-padding`,
`--label-to-title`, or `--section-intro-gap`. That leaves room to tune a
component without changing every use of `space-5`.

For the system implementation, give new tokens a collision-safe namespace, for
example `--ac-space-5`, and define them in the system layer or the component
that owns them. Keep the existing root tokens as the compatibility layer. The
Devague page namespace begins consuming the new tokens only during migration;
promoting them to root defaults is a later, dedicated change.

### Type roles

| Role | Candidate value | Owner now | Intended use |
|---|---:|---|---|
| Body/prose | `1.0625rem` | Global, already live | Default long-form copy; preserve. |
| Eyebrow | `0.75rem` | Global, already live | Uppercase section metadata. |
| Card title | `1.25rem` | Devague candidate | Method, reference, gate, and skill-card titles where the current role is too quiet. |
| Card/body UI | Component-defined | Candidate | Short explanatory copy, not a replacement body size. |
| Terminal | `0.8125rem` | Terminal component candidate | Set once on the transcript and inherit through nested `code`. |
| Terminal note | `0.75rem` | Terminal component candidate | Elision and supporting terminal metadata. |
| Compact tag | `0.6875rem` | Component candidate | Terminal legs and skill metadata, with a legibility check. |

The semantic role matters more than the number. Do not add a token for every
literal size in the mock. The latest snapshot audit found 87 size-setting
declarations: eight use a size token, 77 still use literal values, one inherits,
and one uses zero as a layout technique. Consolidate those literals by role as
source components are written; tokenising a value is not evidence that the role
itself is reusable.

### Leading and tracking

| Token role | Value | Use |
|---|---:|---|
| Tight display leading | `1.1` | Large display headings. |
| UI leading | `1.25` | Single-line labels, controls, and compact titles. |
| Normal leading | `1.55` | Card body copy. |
| Prose leading | `1.7` | Long-form copy at the 42rem reading measure. |
| Display tracking | `-0.02em` | Large display type. |
| Heading tracking | `-0.01em` | Smaller editorial headings. |
| Flat tracking | `0` | Body and monospace. |
| Caps tracking | `0.12em` | Uppercase labels at 13px and below. |

The first corrective change should be local: reset nested terminal code to
inherit its component size and give one-line labels UI leading. Changing the
global body or generic `code` selector would be a much larger migration.

### Horizontal rhythm: three separate jobs

The mock demonstrated why “gutter” cannot be one catch-all measurement. Keep
these roles separate:

1. **Page rail** — the common outer edge shared by hero, sections, header, and
   footer.
2. **Reading measure** — the maximum line length, currently 42rem; it may sit
   inside a wider rail.
3. **Surface inset** — padding inside a card, terminal, diagram, or modal.

All Devague sections should use the same page rail. A component may constrain
its contents or add surface padding, but it must not nest another page container
and create a second gutter. This is the method for keeping the page edges
consistent at every width.

Keep the live `.container` (`68rem` maximum with 24px minimum edge gutters) as
the site-wide primitive. If Devague needs a narrower presentation rail, add an
explicit local variant. Do not replace `.container` with the mock's `58rem`
maximum plus independent responsive padding: that changes both the width and
the gutter model and can double-count the inset.

## Component catalogue

Use these maturity labels:

- **Existing** — already shared in production; preserve its public contract.
- **Candidate** — specified strongly enough to build and test in the reference
  specimen.
- **Established** — implemented as opt-in and has passed the system acceptance
  gate without changing a production route.
- **Migrated** — adopted by a named production consumer.
- **Page-only** — deliberately belongs to the Devague composition.
- **Dormant** — retained comparison or unused prototype; do not ship from it.
- **Promoted** — proven by at least two real consumers and cross-route tests.

### Existing production contracts

| Pattern | Status | Direction |
|---|---|---|
| Layout, header, footer, and page sky | Existing | Keep current source. Never replace from the built mock. |
| `PageHero` | Existing | Keep shared title, intro, and decorative flourish semantics. Scope any Devague title tuning outside the component until it is proven site-wide. |
| Page rail and reading measure | Existing | Preserve `.container` and `.prose`; add named variants rather than silently changing their meanings. |
| Focus and skip-link treatment | Existing | Preserve. All new controls inherit or visibly meet this standard. |
| Reveal and reduced motion | Existing | Preserve the `html.js` progressive-enhancement convention and global reduced-motion override. |
| Card surface | Existing primitive | Preserve the base. Use Devague-specific card components or modifiers for density and hierarchy. |

### Candidates from the mock

| Pattern | Reusable contract | Page-owned content |
|---|---|---|
| Fast-facts strip | Label/value items and responsive wrapping | The four Devague facts. |
| Process-diagram shell | Figure surface, breakpoint layout, semantic fallback, caption/reference relationship | The nine glyphs, labels, and exact 5+4 / 3×3 / one-column narrative. |
| Quiet reference list | Name/meta, description, tags, separators | The seven pipeline transitions. |
| Method card | Eyebrow, title/question, detail, consistent internal rhythm | The seven moves and their order. |
| Human-gate card | Gate explanation plus terminal thumbnail | The six gates and commands. |
| Copy control | Explicit accessible name, clipboard result, visible success/failure status | The command or skill string copied. |
| Capability card | Metadata, structural title, duty copy, 3/2/1-column layout | The seven operator skills. Keep a real heading in the document outline even when the visual title is monospace. |
| Terminal | Figure/caption, status header, transcript region, line roles, leg modifier, optional replay | Devague transcript data and leg colours. |
| Guided session | Session introduction, one hero preview, narrative beats, raw-evidence links | The three sessions, 14 beats, and ten source panes. |
| Beat timeline | Headline, narration, note, exact terminal excerpt | Devague's chronological story. |
| Disclosure | `aria-expanded`, controlled region, no-JS-readable fallback | Which raw evidence is grouped under a session. |
| Transcript modal | Dialog semantics, focus trap/restore, Escape/backdrop close, previous/next boundaries, scroll restoration | Pane registry, order, captions, and transcripts. |
| Closing band | Compact page CTA separated from the site footer | Devague's closing mark and wording. |

The modal and terminal are reusable in principle, but they are not yet generic
production components. Build the opt-in versions against a single source of
transcript data in the reference specimen; do not clone snapshot DOM into a
second data path.

### Page-only visual language

Keep the exact nine-stage glyph sequence, seven transitions, seven method moves,
six human gates, seven skills, three sessions, issue groupings, and Devague
closing mark in the Devague composition. Bespoke diagrams are an intentional
part of the agent pages; sharing their shell does not require generalising their
content.

### Dormant prototype residue

The retained snapshot includes a hidden original flow, a hidden static flow,
and unused selectors for earlier terminal-grid, capture-grid, primer, and
session-hero variants. They remain useful provenance, but are not accepted
patterns and must not appear in the production component inventory.

## Overwrite and collision map

The current `global.css` is imported by all 12 route files. The new presentation
deck also uses the global `.container` for each slide and consumes shared colour,
radius, line, font, and surface tokens. A change can therefore pass a content
test while still breaking its geometry.

| Proposed or mock-level change | Blast radius | Risk | Safe containment |
|---|---|---:|---|
| Replace root palette/font/radius tokens | All routes and diagrams | High even when colours look equivalent | Keep current source tokens. Add aliases only when semantics genuinely differ. Keep browser theme-colour metadata in sync with any later root change. |
| Body size from live 17px to browser-default 16px | All prose, navigation, footer, cards, and presentation captions | High | Preserve the live body size. Assign explicit named roles inside Devague components. |
| `h1` maximum from 4.5rem to 3.6rem | Every shared `PageHero` route | High | Scope a Devague title variant only if the page still needs it. |
| Global fixed `h2` at 1.5rem | Content hierarchy across the site | High | Do not adopt. The mock later restores the live fluid Devague section size anyway. |
| `.container` from 68rem to 58rem plus new padding | Header, footer, heroes, nearly every route, and every new presentation slide | High | Keep the live primitive. Use one Devague rail modifier without nested/double gutters. |
| Change `.prose` or `.lede` globally | Agent intros, articles, framework, and presentation copy | Medium–high | Preserve the 42rem measure. Add a specific intro role if needed. |
| Restyle generic `code` as a chip or change its size | Inline commands, terminal descendants, articles, and presentation code | Medium–high | Use `.command-chip`; reset terminal descendants locally to `font-size: inherit`. |
| Tighten global `.card` padding and move hover motion | Home, directory, agent, article, presentation, and engage grids | High | Create a Devague card grammar. Keep hover transforms inside the no-preference motion query. |
| Add unscoped mock `--space-*` / `--fs-*` root tokens | Future namespace collisions and accidental cross-route consumption | Medium | Use a collision-safe system namespace; only the Devague consumer opts in during its migration. Promote through a separate global-token change. |
| Change global `.section` padding or introduce `vh` seams | Every content page; viewport-height-dependent blank bands | High | Give Devague one local vertical-rhythm owner. Test every adjacent section boundary. |
| Replace `DevagueFlow` from generated snapshot CSS | Devague only, but duplicates DOM, observer, and stale breakpoints | Medium–high | Author a source component or explicit mode from accepted markup. Remove the old path only when the replacement is accepted. |
| Rebuild method, gate, and skill cards | Devague only | Medium | Use semantic source components/data maps; preserve heading levels and accessible copy feedback. |
| Replace captures with sessions, disclosure, and modal | Devague only, with complex focus/state/data behaviour | High | Componentise from the handoff, reuse one terminal source, and add interaction/no-JS tests before visual polish is accepted. |
| Copy snapshot header, footer, reveal, or terminal scripts | Every route or duplicated Devague lifecycle | High | Keep current source shell and observer. Make page interactions idempotent and component-owned. |
| Add new global breakpoints | Shell, Devague, and presentation boundary collisions | High | Keep new queries page/component-scoped; prefer component/container intent over a second site-wide breakpoint system. |

## Adoption sequence

Each phase should be a separate, reviewable change. Do not combine a global
primitive migration with a page composition rewrite.

“System established” has a concrete meaning here. Before the production
Devague route changes, the following must exist:

- a named token registry covering spacing, type, colour, surface, elevation,
  motion, page rail, reading measure, and component inset roles;
- opt-in primitives and component APIs, including their states and variants;
- an isolated reference specimen that exercises the system against the approved
  Devague mock without replacing a public route;
- responsive, theme, keyboard, focus, reduced-motion, and no-JavaScript
  acceptance contracts; and
- a status record separating established system rules from Devague-only content
  and unresolved decisions.

This is system-first without pretending the design is universal. The mock is
the reference evidence, the specimen proves the implementation, and Devague is
the first production migration.

### Phase 0 — freeze the baseline

- Work on a feature/UX branch, never directly on `main`.
- Update from `origin/main` before implementation and record the baseline SHA.
- Build the current site and capture reference images for the regression routes.
- Record light/dark, JavaScript/no-JavaScript, and reduced-motion states.
- Keep the retained mock immutable; create a new snapshot if its specimen state
  changes materially.

**Gate:** the baseline is reproducible and failures are known before code is
changed.

### Phase 1 — specify and approve the system

- Complete the token registry and map every accepted mock value to a semantic
  role, an existing compatibility token, or a documented page-only exception.
- Freeze the page rail, reading measure, component-inset, type-role, surface,
  motion, and breakpoint contracts.
- Define component responsibilities, props, states, semantics, and ownership.
- Record the approved light pipeline surface, larger card-title role, and
  content that deliberately remains Devague-only.
- Do not edit `devague.astro` or change a current global selector.

**Gate:** the system contract is reviewable as a whole, every mock pattern has
an owner/status, and no production route has changed.

### Phase 2 — build and prove the opt-in system

- Add collision-safe tokens and opt-in primitives without changing the current
  global defaults.
- Build the facts, reference-row, method-card, gate-card, capability-card,
  command-chip, terminal, pipeline, guided-session, disclosure, and modal
  contracts as source components.
- Exercise them together in an isolated reference specimen using the real mock
  content and transcript data.
- Resolve excerpts by exact transcript anchors and fail validation when an
  anchor drifts.
- Keep the live `PageHero`, header, footer, Devague route, and other routes
  unchanged.

**Gate:** the specimen reaches visual and interaction parity with the approved
mock; heading outline, keyboard names, copy states, focus lifecycle, 3/2/1
layouts, pipeline breakpoints, gutters, themes, reduced motion, no-JavaScript,
and transcript integrity pass; production route snapshots remain unchanged.

### Phase 3 — migrate Devague as the first consumer

- Add the `.devague-page` consumer namespace and assemble the established
  system components in the live source route.
- Cut over in small commits on the UX branch, but judge acceptance against the
  complete page rather than shipping a mixture of old and new systems.
- Preserve the current source Layout, `PageHero`, header, footer, data
  provenance, and global progressive-enhancement contracts.
- Use the approved light pipeline surface with one semantic DOM path and verify
  one column up to 40rem, 3×3 from 40–60rem, and 5+4 above 60rem.
- Migrate all three guided sessions, disclosures, and transcript-modal
  interactions from the established components.
- Remove superseded Devague components, hidden variants, and observers only
  after parity is proven.

**Gate:** the production Devague page matches the accepted specimen across the
full regression matrix, with no duplicate flow, data source, observer, listener,
or horizontal overflow.

### Phase 4 — harden the system after first migration

- Run the cross-route containment suite, including the presentation deck.
- Fix weaknesses in the system owner rather than adding Devague-local patches.
- Reconcile the implemented token/component registry with this document and
  record any deliberate exceptions.
- Keep all non-Devague routes on their existing design until separately planned.

**Gate:** Devague is a clean first consumer, the system contract still describes
the implementation, and no other route has visually migrated by accident.

### Phase 5 — migrate the rest of the site separately

- Choose a second real consumer through a separate migration plan.
- Compare it with Devague and generalise only the semantics both genuinely
  share.
- Promote opt-in tokens or primitives to global defaults only with cross-route
  evidence and an explicit compatibility strategy.
- Migrate remaining routes in bounded groups rather than through one global CSS
  switch.
- Keep Devague content, glyphs, and composition local.

Likely first promotion candidates are the copy control, terminal shell, quiet
reference row, and transcript modal. The shared terminal work should follow the
richest-case-first sequence in [`agent-page-scaling.md`](agent-page-scaling.md),
not be hidden inside the Devague redesign.

**Gate:** two consumers, cross-route snapshots, accessibility tests, and a clear
rollback path.

## Regression matrix

### Routes

Broad primitive or token changes require all current routes:

- `/`
- `/agents/`
- `/agents/devague/`
- `/agents/colleague/`
- `/agents/lobes/`
- `/agents/reachy-mini-cli/`
- `/articles/`
- `/articles/mind-nervous-system-body/`
- `/engage/`
- `/framework/`
- `/presentations/`
- `/presentations/mind-nervous-system-body/`

A Devague-scoped component change still needs one non-Devague sentinel route and
the new presentation deck to prove containment.

### Viewports and boundary checks

Use representative snapshots at 375, 640, 768, 960, and 1440px. When a change
touches queries, also test one pixel either side of every relevant boundary:
544, 640, 736, 768, 832, 960, and 1056px. The pipeline specifically needs its
40rem and 60rem transitions checked.

### State and behaviour

For each affected pattern, check:

- light and dark colour schemes;
- normal and reduced motion;
- JavaScript enabled and disabled;
- keyboard-only focus order and visible focus;
- 200% text zoom and long inline-code wrapping;
- no horizontal page or transcript overflow;
- consistent page rails at every section seam;
- logical heading order and landmark semantics;
- no hidden content at first paint or after back/forward navigation;
- no new client-side network dependency; and
- verbatim transcript/provenance integrity.

Repository content/structure checks remain necessary, but are not sufficient.
For example, `check:presentations` does not detect a narrower global container
breaking slide geometry, so visual containment needs its own assertion.

### Dated baseline result

The merged baseline was checked on 22 July 2026 before any site implementation:

- `npm run build` passes on Node 24.14.0 and generates all 12 routes;
- Markdown lint passes across `docs/ux-review/`;
- `git diff origin/main -- site-astro` is empty; and
- `npm run check:presentations` already fails four of 20 contracts on the
  unchanged `origin/main` site: the library-card title, accessible architecture
  diagram, verbatim thesis, and Reachy repository link.

That presentation result is a known baseline failure, not an effect of this
documentation. It should be resolved or explicitly accepted before visual
implementation begins, so later regressions are attributable.

## Change record for each adoption

Every design-system PR should answer these questions in its description:

| Field | Required record |
|---|---|
| Decision | What user or content problem is being solved? |
| Layer and owner | Foundation, primitive, component, composition, or experiment; which source file owns it? |
| Status | Candidate, established, page-only, migrated, promoted, or superseded. |
| Existing contract touched | Selectors, components, tokens, data, and interaction lifecycle. |
| Consumers | Every route/component that currently matches the changed contract. |
| Containment | Namespace, component scope, modifier, or migration strategy. |
| Accessibility | Semantics, name/role/value, focus, contrast, motion, and no-JS behaviour. |
| Evidence | Mock state, measured finding, screenshots, and automated checks. |
| Rollback | Component/variant or commit that can be removed without restoring a mutated base rule. |

## Current decisions and open calls

### Decisions recorded here

- The current Astro site is the production source of truth.
- The retained mock is a specimen, not an installable stylesheet.
- Global palette, fonts, body size, heading scale, container, header, footer,
  reveal, and reduced-motion contracts stay unchanged during the Devague work.
- The pipeline diagram uses the approved light background rather than returning
  to the earlier dark treatment.
- Devague card titles use the larger `1.25rem` semantic role where the mock has
  established that hierarchy; this does not retune global `h3` elements.
- The system is specified, built, and proven in an isolated reference specimen
  before the live Devague route is migrated.
- Devague is the first production consumer; other routes migrate in later,
  separately approved passes.
- Page rail, reading measure, and component inset are separate roles.
- A token or component may be established as opt-in from the mock and reference
  specimen; becoming a global default requires a second real consumer and
  regression proof.
- Dormant comparison variants do not enter the production system.

### Human decisions still required before their phase

1. Whether the pipeline copy reductions listed in
   [`current-direction.md`](current-direction.md) are accepted.
2. Which Devague candidates should be trialled on a second page and in what
   order.
3. Whether the raw spacing scale eventually becomes global or remains expressed
   through component-owned semantic tokens.

Those choices do not block establishing the opt-in system or migrating Devague
as its first consumer. They do block later global promotion and the migration of
other routes.
