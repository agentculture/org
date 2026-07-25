# Delivery Summary — global-section-opener

plan: `global-section-opener` · run: `complete locally` · date: `2026-07-23`

## Intent

> Extract the retained Devague section-opener grammar into the global design
> system, then migrate the four long agent profiles and the long-form article
> without changing their page-owned compositions.

## Planned Work

- add one semantic `SectionIntro` component
- migrate 27 agent-profile sections and the article's eight-beat loop
- preserve article definitions and both reveal patterns
- pin the contract in the built site
- compare the retained mock and implementation before review

## Actual Delivery

| Plan task | Status | What actually landed |
|---|---|---|
| `t1` shared component | delivered | `SectionIntro.astro` owns eyebrow, stable h2, optional post-title slot, heading/prose measures, and group or paragraph reveals. |
| `t2` agent profiles | delivered | Devague 6, Colleague 9, Lobes 5, and Reachy Mini CLI 7 calls; parent sections now use matching `aria-labelledby` IDs. |
| `t3` article | delivered | One loop-authored call renders eight beats; definitions remain between title and prose, the first paragraph remains a lede, and paragraph reveal timing is unchanged. |
| `t4` contracts/docs | delivered | A new built/source contract runs in the site-build workflow and this spec/plan/delivery set mirrors the repository's maintainer record. |
| `t5` validation | delivered locally | Production build and all six relevant check lanes pass; narrow and wide computed-layout comparisons are recorded below. |

## Mid-work Decisions

- the retained mock's composition and guttering were adopted, but its stale
  16px prose / later typography override was not restored; the already approved
  global 17px prose and responsive section-title token remain authoritative
- the component's relaxed title-spacing variant preserves the article's
  existing 1em heading separation while agent sections retain their previous
  0.6em separation
- the article's definitions use the component's named `after-title` slot so
  their page-owned markup and scoped styles remain intact
- Astro emits boolean `false` data attributes as literal attributes; the first
  implementation therefore caused false reveal markers to match the global
  selector. The component now renders explicit branches so absent reveal
  attributes are genuinely absent.
- the first scoped style block did not survive into the built CSS, leaving the
  new wrapper outside the old direct-child heading rule. The component now
  emits a narrowly namespaced global style, and the contract pins the actual
  built heading/prose selectors so this cannot regress silently.

## Drift From Plan

No scope drift. The reveal-attribute correction was an implementation fix
inside the planned motion contract. No presentation, index, route, content,
navigation, breadcrumb, local-navigation, Learn, or deployment surface changed
for this component.

## Evidence

- build: 12 static routes generated successfully with the repository's Node 22
  runtime
- navigation: 7/7 tests pass
- wayfinding: 39 checks pass
- closing bands: 4 adopted routes / 8 unchanged routes / 7 actions pass
- design system: 103 checks pass
- section intros: 28 authored calls render 35 openers; all stable labels,
  article order, reveal split, and the deck exclusion pass
- presentations: 21 checks pass
- built Devague at 459px:
  rail width 459px, opener/heading/prose x 22.9px, width 413.1px, no overflow
- retained mock at 459px:
  rail width 459px, heading/prose x 22.9px, width 413.1px, no overflow
- built Devague at 1280px:
  heading 704px (`44rem`), prose 672px (`42rem`), 17px / 28.9px prose,
  no overflow
- browser DOM review:
  six accessible Devague section regions, article heading → definitions →
  prose order retained, no `data-reveal="false"` attributes

## Delivery Claims

| Claim | Confidence | Evidence |
|---|---|---|
| The shared component matches the retained mock's opener grammar and narrow gutter | high | 459px computed geometry matches exactly; visual comparison completed |
| All intended long-form openers use the component | high | source and built contract: 28 authored calls / 35 rendered openers |
| Section semantics improved without adding breadcrumbs or local navigation | high | matching `aria-labelledby`/h2 IDs plus wayfinding contract 39/39 |
| Article definitions and reveal behavior survived extraction | high | built-order and reveal assertions plus browser DOM inspection |
| The presentation remains a separate slide pattern | high | zero built `data-section-intro` markers and six local slide eyebrows |
| Every breakpoint and theme is visually identical after extraction | medium | component has no breakpoint/theme overrides; 459px and 1280px inspected in this run, broader global matrix remains recorded separately |

## Remaining Work / Follow-up

- user visual and keyboard review before any new commit
- no push, pull request, deployment, or Learn change has been made
- breadcrumbs and local “On this page” navigation remain deferred for a later
  information-architecture decision
