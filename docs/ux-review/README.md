# UX review — agentculture.org

This folder began as an outside UX review of the built site. It now contains a
mixture of historical proposals, retained visual evidence, and the current
review record for work implemented on the local `ux-review` branch.
Each artefact states its date and method so it can be checked rather than taken
on trust.

> **Current working-tree implementation record:**
> [`global-type-and-section-width-system.md`](global-type-and-section-width-system.md)
> audits the present 12-route `ux-review` worktree and the retained Devague
> mock, records the adopted global typography and rail decisions, and reports
> their current verification status, including the shared section-opener and
> structured-card migrations. The eight-route baseline and earlier
> adoption-status statements below remain historical.

The original review baseline was a local production build at commit `d71a719`
(`site-astro@0.0.1`, Astro static output, 8 routes).

## Start here

For the new site-wide typography and section-width initiative, start with
**[`global-type-and-section-width-system.md`](global-type-and-section-width-system.md)**.
It audits the current source and explicitly identifies which older documents
are dated.

**[`current-direction.md`](current-direction.md)** remains the decision map for
the earlier Devague-composition work. It reconciles the measured audit with
that later mock and labels each artefact as current, supporting, or superseded
at the time it was written.

**[`design-system.html`](design-system.html)** is the visual review surface. It
renders the proposed foundations, layout roles, responsive pipeline,
components, interactions, ownership boundaries, and migration gate without
changing the Astro site.

Its compact “On this page” example is retained as historical visual evidence.
Breadcrumbs and local contents navigation are not present in the current Astro
review branch and will be reconsidered separately.

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
| [`global-type-and-section-width-system.md`](global-type-and-section-width-system.md) | Markdown | Current 12-route typography/rail evidence, stale-document reconciliation, adopted roles, migration status, and verification record |
| [`current-direction.md`](current-direction.md) | Markdown | Status, precedence, current decisions, and open calls |
| [`design-system.html`](design-system.html) | Interactive visual reference | Established foundations, Devague-derived candidates, page-only content, working interactions, and the system gate |
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

The HTML review artefacts are self-contained. To review the visual system with
its local fonts and links intact, serve this folder as the HTTP root:

```bash
python3 -m http.server 4620 --directory docs/ux-review
```

Then open <http://localhost:4620/design-system.html>.

The preserved full-page mock is a small static bundle with local CSS and fonts;
to render its original `/agents/devague/` path, serve the snapshot folder as the
HTTP root:

```bash
python3 -m http.server 4601 \
  --directory docs/ux-review/mocks/devague/2026-07-21-review-style
```

Then open <http://localhost:4601/agents/devague/>.

The visual system preserves the site's semantic colour, font, radius, shadow,
and theme contracts. New spacing, type-size, leading, and tracking scales are
visibly labelled as candidates. Devague leg colours and the always-light
pipeline pairing are explicitly page-owned rather than implied global tokens.

## Suggested reading order

For a maintainer or an agent picking this up cold:

1. `global-type-and-section-width-system.md` — the current implementation and
   verification record.
2. `current-direction.md` — the earlier Devague precedence and status map.
3. `design-system.html` — the historical visual-system review surface.
4. `design-system.md` — the earlier ownership, containment, and adoption method.
5. The preserved full-page Devague mock — the source visual evidence.
6. `captures-story-plan.md` and `pipeline-layout-plan.md` — the implementation
   handoffs, including the pipeline work requested after the final mock render.
7. `findings.md` — the measured baseline and verified strengths.
8. `agents-directory.html` and `agent-page-scaling.md` — independent site-wide
   proposals not superseded by the Devague work.
9. The spacing/type and captures explorations when their rationale is needed.

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

**Current Astro status** — the global typography/rail system and related IA
work are implemented on the local `ux-review` branch. The main implementation
is committed locally at `b12762e`; the removal of breadcrumbs and local
contents navigation remains an uncommitted review change. The
standalone HTML artefacts remain historical review surfaces rather than source
components. Older statements that no proposal has touched Astro describe their
own earlier baselines, not the current working tree.

The review documents pass Markdown lint and local-link checks. A future Astro
implementation must still pass `npm run build`, `org site link-check`, the
responsive and accessibility suites, and the SonarCloud quality gate. The
component API sketched in `agent-page-scaling.md` remains a proposal rather than
tested source; treat it as a starting shape to argue with, not a specification.

**One correction worth surfacing** — an earlier pass of this review recorded a
scroll-reveal bug on `/agents/`, where elements sat at `opacity: 0` inside the
viewport. That was wrong, and it is retracted in `findings.md`. The
`IntersectionObserver` threshold behaviour is correct, and the blank renders that
prompted it came from a stuck renderer in the review tooling, not from the site.
The reveal system is sound. It is flagged here because a reader skimming for
problems should not carry away a defect that does not exist.

## Current constraints

- **Site files are changed locally for review.** The main implementation is
  committed locally. Nothing has been pushed, deployed, or submitted as a PR.
- **Learn is untouched.** The separate Learn source and deployment are outside
  this migration.
- **Version bump.** The repo's `version-check` CI job fails any PR whose
  `pyproject.toml` version matches `main`'s, including docs-only changes. That
  bump has not been made because no PR is being prepared yet.
- **`main` is protected.** The current work remains on `ux-review` for local
  review.

## Scope

This review covers the site's user experience: information architecture,
interaction, affordance, accessibility and the consistency of the pattern
library. It does not cover the Python CLI, the deploy workflow, the vendored
skills, or content accuracy beyond the one place where copy contradicts the page
it sits on (finding 3).
