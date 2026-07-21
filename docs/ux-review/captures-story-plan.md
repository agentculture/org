# Captures section — the guided-timeline redesign (handoff plan)

A coding-ready plan for restructuring the "Real captures" section of
`/agents/devague/` so a non-technical reader can follow the story the
transcripts tell. Direction and copy were agreed in review; this document is
the handoff. No code in this plan has been applied to the site.

## The problem, in one paragraph

The section asks a casual visitor to reconstruct a three-act story from ten
dark terminal panes (~230 verbatim lines). The three sessions aren't visible
*as* sessions — the only cues are header metadata (`devague 0.17.0 · captured
2026-07-14`). The hero moments — the tool refusing to export, a human's live
decision landing pre-trusted, the honestly-empty deviation ledger — are single
lines buried mid-pane. And nothing tells a lay reader how to read a terminal
at all.

## The decided direction

A **guided timeline** (option B from the review discussion). Each of the three
sessions becomes a titled block: a short plain-language introduction, then a
timeline of *beats* — one narrator sentence paired with a tiny verbatim
excerpt (2–7 lines) lifted from the real pane — then one full "hero" pane
replayed inline. All other panes sit behind the existing view-full-transcript
modal.

Decisions locked during review:

1. **Narrator voice is distinguished typographically only** — the site's serif
   display face (`--font-display`) against the transcripts' monospace. No
   "curator's note" label.
2. **"Session"**, not "Chapter" — honest to what these were.
3. **The beats point.** Narration may direct the eye to a specific word in the
   excerpt (e.g. `confirmed`); that pointing move is the core teaching device.
4. **One hero pane per session** rendered inline with the existing replay
   animation; every other pane opens in the modal.
5. **Ori is named** in narration, as the transcripts already name them.

## Hard constraints (do not violate)

- **The verbatim contract.** `devague-captures.ts` states it: every line is
  from a real run, never reworded, cuts marked with first-class ellipsis
  lines. **Transcripts stay byte-identical.** Excerpts are *rendered slices*
  of the existing lines — never copies edited for length.
- The page is a live-presentation prop; the section must read aloud top to
  bottom in order.
- House rules: no new global styles, compositor-only motion honoring
  `prefers-reduced-motion`, WCAG AA in both themes, zero client-side network
  calls, static build.
- No left or top accent borders on cards; the leg colour continues to carry
  through the dot, the tag pill, the prompt glyph, and the modal button.

## Section architecture (top to bottom)

1. Eyebrow + headline — **kept as-is** (`real captures` / "This page specced
   itself — three times now").
2. One short framing paragraph (new copy, below).
3. **Primer card** — "How to read these terminals" (new copy, below).
4. **Session 1 block**: header (Session 1 · 14 July 2026 · devague 0.17) →
   serif intro → 6 beats → hero pane `frame-gate-converge-export` →
   "View the other 3 panes from this session" (modal).
5. **Session 2 block**: header (Session 2 · 15 July 2026 · devague 0.18) →
   serif intro → 5 beats → hero pane `frame-gate-live-refusal` → modal link
   for the other 3.
6. **Session 3 block**: header (Session 3 · 15 July 2026 · devague 0.19) →
   serif intro → 3 beats → hero pane `challenge-sweep-route` → modal link for
   `challenge-adjudicate-reexport`.
7. Provenance line — **kept verbatim**.

## Data model (additive)

New module `site-astro/src/data/devague-story.ts`. `devague-captures.ts` is
not modified.

```ts
export interface StoryBeat {
  headline: string;      // "The gate refuses"
  narration: string;     // serif voice, may point at a word in the excerpt
  paneId: string;        // CapturePane.id
  anchor: string;        // exact text of the excerpt's first line
  occurrence?: number;   // 1-based, when the anchor text repeats in the pane
  count: number;         // number of consecutive lines to render
  note?: string;         // optional one-liner under the excerpt
}

export interface SessionStory {
  n: 1 | 2 | 3;
  title: string;
  date: string;          // "14 July 2026"
  version: string;       // "devague 0.17"
  intro: string[];       // serif paragraphs
  beats: StoryBeat[];
  heroPaneId: string;
  paneIds: string[];     // every pane belonging to this session
}
```

**Excerpts are anchored by text, not index**: the renderer locates `anchor`
(exact match on `line.text`, nth `occurrence`) and slices `count` lines. Add
one build-time test asserting every anchor resolves — a captures-file edit
that orphans an excerpt must fail the build loudly, not render the wrong
lines.

## Components

- `CaptureStoryBeat.astro` — timeline node: dot + connector, headline,
  narration, static excerpt block (no typing animation — excerpts render
  settled; only hero panes replay), optional note, "View the full session"
  link opening the modal on that beat's pane.
- `CaptureSessionHeader.astro` — "Session N · date · version" + serif intro.
- Section rewrite in `devague.astro`: the five `term-grid` wrappers are
  replaced by the three session blocks. The pane components and their props
  are unchanged.
- The transcript modal (already prototyped in review): frosted light
  backdrop `rgba(244,245,251,.72)` with `blur(10px) saturate(140%)` (include
  the `-webkit-backdrop-filter` prefix — without it Safari renders no blur),
  panel `min-height: min(28rem, 70vh)`, `max-height: 86vh`, `role="dialog"`,
  `aria-modal`, focus to close button and back to the trigger, Escape and
  backdrop close, scroll lock, full-width per-leg-colour trigger buttons.

## Copy deck

Everything below is new copy in the narrator's voice unless marked KEPT.
Transcript lines referenced by anchors are quoted here only to identify them
— they are rendered from the data module, never retyped.

### Framing paragraph (replaces the four current intro paragraphs)

> Three real working sessions are replayed below — recorded live, never
> edited, never reworded. Each is told twice: first the story in plain
> language, then the terminal record it comes from. The human gate is real,
> not ceremony.

(The closing phrase is preserved from the current intro's fourth paragraph.)

### Primer card

Card title: "How to read these terminals". Body:

> Lines starting with `$` were typed by a person or the AI assistant. Grey
> lines are the tool's replies — recorded live, never edited. The coloured
> pill names the stage each session belongs to.
>
> One rule underneath everything: **proposed** means the AI suggests —
> **confirmed** means a human decided. Nothing ships while anything is still
> only proposed.

### Session 1 — The page specs itself

Header: `Session 1 · 14 July 2026 · devague 0.17`
Panes: `frame-announce-capture`, `frame-interrogate-review-shift`,
`frame-gate-converge-export` (hero), `plan-task-converge-export`.

Intro:

> Before this page was built, the team ran devague on the idea of the page.
> One sentence — "imagine this page is live: what does it contain?" — was
> broken into eighteen separate promises. A human approved or rejected every
> one. Only when each promise had an answer did the tool write the final
> spec — and the build plan's first task was to record this very session, so
> you can read it below.

Beats:

1. **One sentence, pretended true** — pane `frame-announce-capture`, anchor
   `devague new "agentculture.org/agents/devague is live — a presentation-…`
   (the full `devague new` line), count 2.
   Narration: "The method starts by pretending the work is finished:
   describe the launch you wish you could announce. The tool turns that one
   sentence into a frame — a container for every promise the announcement
   quietly makes."
2. **Promises land as "proposed"** — same pane, anchor the `devague capture
   --origin llm --kind audience` line, count 2.
   Narration: "Each promise is captured one at a time. Watch the last word
   of the reply: *proposed*. The AI suggested it — nobody has agreed to it
   yet."
3. **Reality answers mid-session** — pane `frame-interrogate-review-shift`,
   anchor the `devague question --resolve q1` line, count 2.
   Narration: "Earlier the session hit a question it couldn't answer: the
   code was private but the package public — where should links point? While
   that question sat open, Ori made the repository public in real life. The
   session resolved its own question with something that had just actually
   happened."
4. **Fifteen yes, six no** — same pane, anchor `devague reject c3 c9 c12 h1
   h4 h7`, count 7.
   Narration: "A human went through every promise. Fifteen were approved —
   and six were rejected outright, on the record. Rejection is a first-class
   outcome here, not a failure."
5. **"The USER decides"** — pane `frame-gate-converge-export`, anchor
   `recommended next move (first gap):`, count 2.
   Narration: "When asked for status, the tool listed seven promises still
   undecided — and look at how it phrases the next step. It will not decide
   for you."
6. **Converged — and a plan in waves** — pane `plan-task-converge-export`,
   anchor `devague plan waves`, count 7.
   Narration: "With every promise settled, the spec became a build plan, and
   the plan sorted itself into waves — what can be built in parallel, and
   what has to wait. The first task in wave zero: record this session."

### Session 2 — The tool outgrows its own page

Header: `Session 2 · 15 July 2026 · devague 0.18`
Panes: `scope-survey-seeds`, `frame-gate-live-refusal` (hero),
`deviate-ledger-read`, `summary-skeleton-read`.

Intro:

> By the next day the tool had grown three new abilities — which made this
> page out of date the moment they shipped. So the page went back through
> its own process. This session ran before the seventh leg existed, and its
> transcript honestly announces the method as it then stood: one leg
> shorter. This time, the tool refused to finish until the missing evidence
> arrived.

Beats:

1. **Look first, then promise** — pane `scope-survey-seeds`, anchor the
   `devague scope "site-astro/src/data/devague.ts"` line, count 2.
   Narration: "New in this version: before promising anything, the session
   reads the real files and writes down what it found — with receipts naming
   exactly what was read."
2. **The gate refuses** — pane `frame-gate-live-refusal`, anchor
   `devague export`, occurrence 1, count 3.
   Narration: "Six promises still had no evidence behind them. The tool
   didn't warn — it refused, and listed exactly what was missing."
3. **Ori decides, live** — same pane, anchor the `devague capture --kind
   decision "Ori loves the page's animations…` line, count 2.
   Narration: "Then a human typed an instruction directly. Watch the last
   word — every AI suggestion above needed explicit approval, but a person's
   own words are trusted the moment they land."
   Note: "confirmed instantly — no separate approval step, because a human
   said it."
4. **The empty ledger, said plainly** — pane `deviate-ledger-read`, anchor
   `devague --version`, count 4.
   Narration: "The tool keeps a ledger of moments the build had to leave the
   plan. Nothing went off-plan in this run — and the ledger says so, instead
   of inventing drama. Honesty over padding."
5. **The report refuses to pretend** — pane `summary-skeleton-read`, anchor
   `## Mid-work Decisions`, count 4.
   Narration: "The delivery report was test-run before anything was built —
   so every result field correctly says 'fill this in later' rather than
   claiming work that hadn't happened."

### Session 3 — The what-did-we-miss pass

Header: `Session 3 · 15 July 2026 · devague 0.19`
Panes: `challenge-sweep-route` (hero), `challenge-adjudicate-reexport`.

Intro:

> One more ability arrived: a formal blind-spot check. It swept the finished
> spec through a fixed checklist of angles — hidden assumptions, security,
> what-if-it-breaks, can-we-undo-it — specifically to catch what nobody had
> thought to ask.

Beats:

1. **One real catch** — pane `challenge-sweep-route`, anchor the `devague
   scope "challenge pass / unstated-assumptions lens…` line, count 2.
   Narration: "The sweep found a genuinely undecided question — seven cards
   in a grid designed for six — and routed it to a human to decide, rather
   than quietly picking an answer."
2. **Honest about the unknown** — same pane, anchor the `devague park "how
   the re-timed 9-stage cascade…` line, count 2.
   Narration: "One thing couldn't be known yet — how a layout reads on
   tablet-sized screens — so it was parked as an open unknown instead of
   being papered over."
3. **Adjudicated, reconverged, re-exported** — pane
   `challenge-adjudicate-reexport`, anchor `devague confirm c19`, count 7.
   Narration: "Ori confirmed the one open call, the frame converged again,
   and the export rewrote the *same* spec file — the pass made the existing
   spec stronger rather than spawning a new one."

## Ledger of changes to existing copy

| Existing copy | Status |
|---|---|
| Eyebrow `real captures` | **Kept** |
| Headline "This page specced itself — three times now" | **Kept** |
| Intro paragraph 1 (the original run) | **Replaced** — becomes Session 1's serif intro, rewritten plain |
| Intro paragraph 2 (the period piece / catch-up) | **Replaced** — becomes Session 2's intro; the "one leg shorter" honesty point is preserved in it |
| Intro paragraph 3 (the challenge update) | **Replaced** — becomes Session 3's intro |
| Intro paragraph 4 ("the gate has earned its keep") | **Replaced** — its closing phrase "The human gate is real, not ceremony" is preserved verbatim in the new framing paragraph; the mid-session-shift story moves into Session 1, beat 3 |
| Provenance line | **Kept verbatim**, still closes the section |
| Pane titles, context lines, version/date metadata | **Kept verbatim** |
| All transcript lines | **Untouched — byte-identical** |
| HTML comments in `devague.astro` marking "story one/two/three" | Superseded by the real session structure (dev-facing only, no rendered copy lost) |

## Acceptance criteria

- After one scroll, a non-technical reader can answer: *Who decides what's
  true here? What happened when proof was missing? Why did this page go
  through the process three times?*
- `git diff site-astro/src/data/devague-captures.ts` is empty.
- Every excerpt anchor resolves (build-time test); no excerpt is a retyped
  copy.
- Narrator copy renders in `--font-display`; no rendered label says
  "narrator" or "curator".
- Lighthouse performance and accessibility ≥ 95; AA contrast in both themes;
  `prefers-reduced-motion` leaves the section complete and static.
- Modal meets the a11y spec above; transcripts in the modal render at full
  height.

## Build order

1. `devague-story.ts` data module + anchor-resolution test.
2. `CaptureStoryBeat` / `CaptureSessionHeader` components, static excerpt
   rendering.
3. Section rewrite in `devague.astro` (sessions replace the five grids;
   hero panes keep the existing replay).
4. Transcript modal (port the reviewed prototype).
5. Copy pass against this deck; then the acceptance list.
