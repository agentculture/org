# UX review — agentculture.org

An outside UX review of the built site, contributed for the maintainers and their
agents to work with. Nothing here changes any site file; every artefact is a
proposal, and each states its method so it can be checked rather than taken on
trust.

Reviewed against a local production build at commit `d71a719`
(`site-astro@0.0.1`, Astro static output, 8 routes).

## Start here

**[`current-direction.md`](current-direction.md)** is the current decision map.
It reconciles the measured audit with the later Devague work and labels each
artefact as current, supporting, or superseded.

The original [`findings.md`](findings.md) remains the evidence baseline: seven
findings with measurements and re-run recipes, plus the accessibility,
responsive, reduced-motion, and no-JavaScript behaviour that later work must
preserve.

## The artefacts

The work now has three layers: the current decision and handoff layer, the
original site-wide audit, and the earlier section-level explorations.

**Current direction and handoffs** — use these for the latest Devague state:

| File | Kind | Covers |
|------|------|--------|
| [`current-direction.md`](current-direction.md) | Markdown | Status, precedence, current decisions, and open calls |
| [`design-system.md`](design-system.md) | Markdown | Design-system layers, mock-to-site collision map, component catalogue, staged adoption plan, and regression gates |
| [`mocks/devague/2026-07-21-review-style/`](mocks/devague/2026-07-21-review-style/README.md) | Full-page snapshot | Latest integrated Devague mock plus the documented responsive diagram repair |
| [`captures-story-plan.md`](captures-story-plan.md) | Markdown | Guided three-session captures handoff and complete copy deck |
| [`pipeline-layout-plan.md`](pipeline-layout-plan.md) | Markdown | Pipeline hierarchy, reference-list treatment, and animation fixes |

**Site-wide** — information architecture, affordance and pattern consistency
across all 8 routes:

| File | Kind | Covers |
|------|------|--------|
| [`findings.md`](findings.md) | Markdown | The full audit — findings 1–7, method, and what is already right |
| [`agents-directory.html`](agents-directory.html) | Interactive | Findings 1–4. Live before/after on real data, three options measured |
| [`agent-page-scaling.md`](agent-page-scaling.md) | Markdown | Finding 6 in full, with a proposed component API and sequencing |

**Section-level** — spacing, type rhythm and layout, measured against
`/agents/devague/`:

| File | Kind | Covers |
|------|------|--------|
| [`spacing-type-and-captures.md`](spacing-type-and-captures.md) | Markdown | Supporting spacing, leading, tracking, and legibility evidence; its captures recommendation is superseded |
| [`spacing-type-system.html`](spacing-type-system.html) | Interactive | Spacing and type tokens, with the operator-skills section rendered live from them |
| [`captures-layout.html`](captures-layout.html) | Historical interactive exploration | Four measured gallery layouts; option D was later superseded by the guided-session direction |

The early HTML prototypes are self-contained and can be opened directly. The
preserved full-page mock is a small static bundle with local CSS and fonts; serve
its snapshot folder as the HTTP root:

```bash
python3 -m http.server 4601 \
  --directory docs/ux-review/mocks/devague/2026-07-21-review-style
```

Then open <http://localhost:4601/agents/devague/>.

Each one copies the site's own token values verbatim from
`site-astro/src/styles/global.css`. No artefact introduces a colour, font, radius
or shadow that the site does not already define. Where a proposal adds a token —
the spacing and line-height scales in `spacing-type-system.html` — it is marked
as proposed and shown against the current value it replaces.

## Suggested reading order

For a maintainer or an agent picking this up cold:

1. `current-direction.md` — the precedence and status map.
2. `design-system.md` — the safe ownership, containment, and adoption method.
3. The preserved full-page Devague mock — the latest integrated visual state.
4. `captures-story-plan.md` and `pipeline-layout-plan.md` — the implementation
   handoffs, including the pipeline work requested after the final mock render.
5. `findings.md` — the measured baseline and verified strengths.
6. `agents-directory.html` and `agent-page-scaling.md` — independent site-wide
   proposals not superseded by the Devague work.
7. The spacing/type and captures explorations when their rationale is needed.

The site-wide audit finds the pattern library drifting because it is copied per
page (`agent-page-scaling.md`); the section-level work finds spacing drifting
because it is `em`-derived rather than tokenised
(`spacing-type-and-captures.md`). The later Devague work turns those observations
into a concrete page direction without making either diagnosis obsolete.

## What has and has not been verified

**Verified by measurement** — every number in `findings.md` was taken from the
built site or the source, and the command that produced it is quoted alongside.
The `agents-directory.html` demo re-derives its central measurement live in the
browser from the rendered DOM rather than asserting it, and independently arrives
at the same 4% figure quoted in the audit.

**Not implemented** — none of the proposals has been applied to the real site.
The documentation and current-site baseline may be checked with the repo's own
gates, but the proposed components have not yet been through `npm run build`,
`org site link-check`, `markdownlint-cli2`, or the SonarCloud quality gate. The
component API sketched in `agent-page-scaling.md` is a proposal, not tested code;
it should be treated as a starting shape to argue with, not a specification.

**One correction worth surfacing** — an earlier pass of this review recorded a
scroll-reveal bug on `/agents/`, where elements sat at `opacity: 0` inside the
viewport. That was wrong, and it is retracted in `findings.md`. The
`IntersectionObserver` threshold behaviour is correct, and the blank renders that
prompted it came from a stuck renderer in the review tooling, not from the site.
The reveal system is sound. It is flagged here because a reader skimming for
problems should not carry away a defect that does not exist.

## Constraints respected

- **No site files touched.** This folder is additive; nothing under `site-astro/`
  is modified.
- **Markdown lints clean** against the repo's `.markdownlint-cli2.yaml`.
- **Version bump.** The repo's `version-check` CI job fails any PR whose
  `pyproject.toml` version matches `main`'s, including docs-only changes. That
  bump has not been made here — use the `version-bump` skill before opening a PR.
- **`main` is protected**, so this arrives as a branch for review rather than a
  direct push.

## Scope

This review covers the site's user experience: information architecture,
interaction, affordance, accessibility and the consistency of the pattern
library. It does not cover the Python CLI, the deploy workflow, the vendored
skills, or content accuracy beyond the one place where copy contradicts the page
it sits on (finding 3).
