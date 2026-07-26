# Delivery Summary — site-ux-review

plan: `site-ux-review` · run: `complete` · date: `2026-07-26` · draft PR:
[#30](https://github.com/agentculture/org/pull/30)

## Intent

Turn a measured review of the original site into reusable, enforced foundations
for the current twelve-route Astro build. Preserve the site's visual identity
and bespoke page compositions while making navigation, wayfinding, destination
cues, long-form openings, information cards, terminal treatments, and Devague
evidence easier to understand and maintain.

## Actual Delivery

| Plan task | Status | What landed |
|---|---|---|
| `t1` shared system | delivered | Named type, leading, tracking, rail, measure, diagram-spacing, and sticky-header roles; explicit container ownership; built/source design-system contract. |
| `t2` navigation and destinations | delivered | Typed grouped header, grouped sitemap footer, stable agent groups, capped Library features, external Learn product, whole-card destinations, and safe external cues. |
| `t3` agent-page patterns | delivered | Shared `SectionIntro`, `StructuredCard`, `DestinationCard`, `ClosingBand`, and inline-code treatments; aligned terminal and diagram rules; bespoke compositions retained. |
| `t4` Devague | delivered | Three guided sessions, fourteen source-anchored excerpts, accessible full transcripts, read-only gate previews, repaired flow sequence, and a ruled seven-stage pipeline reference. |
| `t5` reconciliation | delivered | Breadcrumbs/local navigation experiments removed, formal contracts wired into CI, version advanced to `0.19.0`, and review artifacts consolidated into this record set. |

## Final Decisions

| Direction | Final status | Reason |
|---|---|---|
| Typed grouped navigation and sitemap footer | adopted | Keeps route ownership, current states, featured coverage, and Learn's external ownership explicit. |
| Whole-card destination links with visible kind | adopted | Resolves the directory's target-size and destination-ambiguity findings together. |
| Shared semantic components | adopted | Reduces repeated presentation decisions without forcing unrelated content into one visual primitive. |
| Guided Devague sessions and transcript modal | adopted | Teaches the evidence while preserving complete, verbatim captures. |
| Ruled pipeline reference list | adopted | Keeps the animated flow primary and makes the stage detail quieter lookup material. |
| Directory filter and sticky jump list | superseded | Stable group fragments and grouped navigation provide the accepted wayfinding without another control surface. |
| Generic `AgentPage` and `Terminal` components | deferred | The four pages share design rules but still have meaningfully different structures and terminal contracts. |
| Breadcrumbs and local contents navigation | deferred | They were removed from this PR pending a separate information-architecture decision. |
| Automatic adoption by future pages | deferred | New pages must choose semantic components deliberately. |
| Generated review pages and static snapshots | retired | Source, contracts, and these records now contain the accepted decisions. |

## Evidence

- Astro production build: twelve static routes
- navigation: 15 tests
- wayfinding: 52 checks across twelve pages
- closing bands: four adopted routes, eight unchanged routes, seven actions
- design system: 182 source and built-output checks
- section introductions: 28 authored calls, 35 rendered openers
- structured cards: 12 authored calls, 70 rendered cards
- Devague story: three sessions, fourteen anchored excerpts
- presentations: 23 built-page checks and 20 slide-data tests
- Python test, coverage, formatting, lint, security, Markdown, local-link, and
  strict repository-doctor lanes pass on the final branch

## Source of Truth

The implementation and its executable contracts are authoritative for current
behavior. This delivery records the final PR state. The matching
[spec](../specs/2026-07-21-site-ux-review.md) preserves accepted requirements,
and the [plan](../plans/2026-07-21-site-ux-review.md) preserves the delivery
sequence.

Focused records cover the shared
[section introduction](2026-07-23-global-section-opener.md) and
[structured card](2026-07-23-global-structured-card.md) contracts.

## Remaining Work

- complete manual visual and keyboard review on the draft deploy preview
- decide breadcrumbs/local contents navigation separately
- consider broader agent-page or terminal abstraction only when another page
  provides enough evidence for a stable interface
- keep Learn source and deployment in its owning project
