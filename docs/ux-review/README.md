# UX review — agentculture.org

An outside UX review of the built site, contributed for the maintainers and their
agents to work with. Nothing here changes any site file; every artefact is a
proposal, and each states its method so it can be checked rather than taken on
trust.

Reviewed against a local production build at commit `d71a719`
(`site-astro@0.0.1`, Astro static output, 8 routes).

## Start here

**[`findings.md`](findings.md)** — the audit. Seven findings, each with the
measurement behind it and a re-run recipe. It also records what was checked and
found correct, which matters as much as the findings: contrast, heading order,
scrollable-table accessibility, mobile layout and the reduced-motion / no-JS
handling are all in good shape, and it would be easy to regress them while
addressing something else.

## The artefacts

The review comes in two halves, written independently and gathered here.

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
| [`spacing-type-and-captures.md`](spacing-type-and-captures.md) | Markdown | The write-up for both artefacts below — evidence, tokens, and the layout recommendation |
| [`spacing-type-system.html`](spacing-type-system.html) | Interactive | Spacing and type tokens, with the operator-skills section rendered live from them |
| [`captures-layout.html`](captures-layout.html) | Interactive | Four layouts for the captures section, measured, recommending option D |

The HTML files are self-contained — no build step, no network requests, no
dependencies. Open them directly in a browser, or serve the folder:

```bash
npx serve docs/ux-review -l 4400
```

Each one copies the site's own token values verbatim from
`site-astro/src/styles/global.css`. No artefact introduces a colour, font, radius
or shadow that the site does not already define. Where a proposal adds a token —
the spacing and line-height scales in `spacing-type-system.html` — it is marked
as proposed and shown against the current value it replaces.

## Suggested reading order

For a maintainer or an agent picking this up cold:

1. `findings.md` — the summary table alone gives the shape of it.
2. `agents-directory.html` — the highest-value change, and the one with the
   smallest diff. Findings 1 and 2 share a fix that costs one derived boolean.
3. `agent-page-scaling.md` — the finding that compounds. Cheaper to act on before
   the fifth agent page than after.
4. `spacing-type-and-captures.md` and its two artefacts, which are narrower,
   measured against `/agents/devague/`, and can be picked up independently of
   everything above.

The two halves reach the same conclusion from opposite ends. The site-wide audit
finds the pattern library drifting because it is copied per page
(`agent-page-scaling.md`); the section-level work finds spacing drifting because
it is `em`-derived rather than tokenised (`spacing-type-and-captures.md`). Both
are the same class of problem — a value that is re-decided in each new place
instead of being defined once — and the fixes are complementary rather than
overlapping.

## What has and has not been verified

**Verified by measurement** — every number in `findings.md` was taken from the
built site or the source, and the command that produced it is quoted alongside.
The `agents-directory.html` demo re-derives its central measurement live in the
browser from the rendered DOM rather than asserting it, and independently arrives
at the same 4% figure quoted in the audit.

**Not verified** — none of the proposals has been implemented against the real
site, so none has been through the repo's own gates: `npm run build`,
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
