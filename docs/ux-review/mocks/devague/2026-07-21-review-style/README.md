# Devague full-page review mock — 21 July 2026

> **Status:** Latest integrated prototype from the Claude review session, with
> documented responsive, theme, and type refinements made while consolidating
> the branch.
> This is a UX artefact, not the Astro source page and not an implementation
> against `site-astro/`.

The snapshot is the page previously served at
`http://localhost:4601/agents/devague/`. It began as a copy of the production
static build at commit `d71a719`, then the Devague route and its page stylesheet
were iterated independently in a temporary scratchpad.

## Run it

From the repository root:

```bash
python3 -m http.server 4601 \
  --directory docs/ux-review/mocks/devague/2026-07-21-review-style
```

Then open <http://localhost:4601/agents/devague/>.

Serve this snapshot as the HTTP root. Its retained HTML deliberately uses the
original root-relative `/_astro/` and icon URLs so that the copied bytes remain
unchanged.

## What is retained

- The complete Devague page: header, footer, nine content sections, and both
  themes.
- The review-style pipeline composition and seven-row reference surface.
- Three guided capture sessions, fourteen narrated beats, three inline hero
  terminals, and the complete transcript modal.
- Inline interaction code for reveals, terminal replay, theme handling,
  session controls, modal focus management, and reduced motion.
- The page CSS and exact local font files required to render the route, plus
  icons.

There are no remote assets, runtime fetches, or dependencies on the real Astro
build. Navigation links to the rest of the site are present for visual fidelity
but are not included in this focused snapshot.

## Integrity

| File | SHA-256 |
| --- | --- |
| `agents/devague/index.html` | `74be88a1bb3e11e3bbdb3ac172b4e5f4115b00c0cbaf7c9b2b6f7657299a6f08` |
| Claude source CSS, before the branch repair | `48cd05baf906f95910f62c5bce0eb8d8aea01984040f527c1896ab08ae000fd2` |
| `_astro/devague.BV2ssJGa.css`, with the branch refinements | `29121fd585323fad236a37b1d3b272e7c143702a6bf4eecb1c4fc5f4338561fa` |

The HTML still matches the 21:03 source scratchpad file byte for byte. The CSS
is derived from the 21:11 source and includes the explicitly documented branch
refinements below.

## Responsive diagram repair

At a 554px viewport, the mock's unconstrained flex row wrapped the nine stages
into accidental `3 / 2 / 3 / 1` rows. Horizontal arrows were left pointing at
empty space and the summary became an orphaned final row.

The retained branch mock now uses three intentional states without changing the
stage content or DOM order:

- up to `40rem`: one compact vertical stepper with continuous connectors;
- over `40rem` through `60rem`: a numbered `3 × 3` grid with no misleading
  arrows; and
- over `60rem`: the original two-row `5 + 4` composition.

The three states were checked at 554px, 768px, and 1200px respectively. None
produces horizontal page overflow.

## Diagram, gutter, and card-title refinements

- The pipeline diagram follows the page surface token instead of forcing a
  dark panel, so it is light in the light theme and remains theme-aware.
- Diagram labels, kinds, arrows, and mobile connectors now use semantic colour
  tokens rather than a dark-panel-only retint layer.
- The operator-skills section now inherits the same page container as every
  other section; its extra `2rem` inset on each side was removed.
- Pipeline reference-row titles use the new `--fs-card-title` semantic token at
  `1.25rem` (20px), together with the shared heading tracking and UI
  line-height tokens.

## Known boundary

This snapshot records the last successful render, not every final request from
the interrupted review session. Requests made immediately afterward to restore
the pipeline eyebrow and the original pipeline animation did not land before
that session ended. Treat
[`pipeline-layout-plan.md`](../../../pipeline-layout-plan.md) as the handoff
for the intended animated pipeline behaviour, and do not infer that this static
pipeline state is the final implementation decision.

The captures treatment is the latest integrated guided-session prototype. Its
implementation contract is in
[`captures-story-plan.md`](../../../captures-story-plan.md).
