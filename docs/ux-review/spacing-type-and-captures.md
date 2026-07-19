# UX review — spacing, type and layout

A UX/UI contribution for `/agents/devague/`. Two areas: a **spacing and type token
system**, and the **captures section layout**.

Everything here is additive. No existing file in this repo has been modified — this
folder contains only new documents. Colour, copy and content are unchanged throughout;
the proposals touch spacing, line-height, letter-spacing and layout only.

| File | What it is |
| --- | --- |
| [`spacing-type-system.html`](./spacing-type-system.html) | The token proposal, with the operator-skills section rendered live from those tokens |
| [`captures-layout.html`](./captures-layout.html) | Four layout options for the captures section, each built with the real transcripts |

Both are self-contained — open them in a browser, no build step, no network.

**How this was measured.** Values were read from the live page at
`https://agentculture.org/agents/devague/` via computed styles and bounding boxes, at a
1280×720 viewport unless stated. Nothing here is estimated from a screenshot.

---

## The short version

The site already has a real token layer — colour, shadow, radius, fonts, easing,
`--section-pad`. What it has **no tokens for is spacing and type rhythm**, and that is
where the incoherence shows.

Three findings are worth acting on regardless of what you think of the layout proposals:

1. **`em` compounding is producing every fractional value on the page.** One section uses
   nine distinct spacing values, none of them round.
2. **A line-height of `1.7` is inherited by single-line labels**, giving them invisible
   phantom leading that makes your spacing values mean different things in different
   places.
3. **The captures render at 10.23px, not 12.48px.** Same root cause, but here it costs
   legibility rather than rhythm.

---

## 1. Spacing — the evidence

The operator-skills section currently uses **nine distinct spacing values**:

```text
4.8   5.6   17.6   18.7   20.16   22.4   24   35.2   43.2
```

None are round, because all are `em`-derived — so the same intended gap computes to a
different pixel value depending on the font-size it happens to sit next to. That is the
mechanism behind the wonkiness. It is not carelessness; it is a unit choice.

### Proposed scale — 8 fixed tokens

Fixed `rem` on a 4px base. Eight is the useful ceiling: enough for micro, component and
section rhythm, few enough that two developers reach for the same one.

| Token | Value |
| --- | --- |
| `--space-1` | 4px |
| `--space-2` | 8px |
| `--space-3` | 12px |
| `--space-4` | 16px |
| `--space-5` | 24px |
| `--space-6` | 32px |
| `--space-7` | 48px |
| `--space-8` | 64px |

Two **fluid** values sit alongside the fixed scale, because section padding and page
gutters legitimately scale with viewport: the existing `--section-pad`, and a proposed
`--gutter: clamp(2rem, 5vw, 6rem)`.

### Where each lands

| Relationship | Now | Proposed |
| --- | --- | --- |
| `.eyebrow` → `h2` | 17.6px | `--space-4` · 16 |
| `h2` → `.prose` | 20.16px | `--space-5` · 24 |
| `.prose p` → `p` | 18.7px | `--space-4` · 16 |
| `.prose` → `.skills` | 35.2px | `--space-7` · 48 |
| `.skills` gap | 17.6px | `--space-5` · 24 |
| `.skill-card` padding | 22.4 / 24px | `--space-5` · 24 |
| `.skill-name` → `.skill-leg` | 4.8px | `--space-2` · 8 |
| `.skill-leg` → `.skill-duty` | 10.4px | `--space-4` · 16 |

Note `.skill-card` padding is currently **asymmetric** — 22.4px block, 24px inline.
Almost certainly unintended (`1.4em` vs `24px`).

---

## 2. Line-height — the finding that matters most

**`1.7` is currently inherited by every element in the section, including single-line
labels.** This is the root cause of the spacing looking arbitrary, and it is invisible in
devtools unless you go looking for it.

Concretely: `.skill-leg` is 11.2px text in a **19.04px line box**. That is 7.8px of
leading the element carries with it — roughly 3.9px above and below the glyphs. So the
4.8px margin in the stylesheet renders as about **8.7px** of visible space. Every label on
the page is silently padded by a different amount, because the phantom leading scales with
each element's own font-size.

Fix the leading and the spacing tokens start meaning what they say.

| Role | Now | Proposed |
| --- | --- | --- |
| Display heading, ≥32px | 1.14 | `--lh-tight` · 1.1 |
| Long-form prose | 1.7 | `--lh-prose` · 1.7 — unchanged, correct at a 672px measure |
| Card body copy | 1.55 | `--lh-normal` · 1.55 — unchanged, already right |
| Single-line labels & titles | 1.7 | `--lh-ui` · 1.25 — **the fix** |

---

## 3. Letter-spacing

| Role | Now | Proposed |
| --- | --- | --- |
| Display, ≥32px | −0.012em | `--ls-display` · −0.02em |
| Body & card copy, 14–19px | normal | `--ls-flat` · 0 — unchanged |
| Monospace (`.skill-name`) | **+0.01em** | `--ls-flat` · 0 |
| Uppercase, ≤13px | 0.17 / 0.12em | `--ls-caps` · 0.12em |

**Never track monospace positively.** The even glyph advance is the point of the face;
adding to it reads as accidentally broken rather than deliberately wide. This appears in
two places — `.skill-name` and the terminal head meta.

The rule behind the table, for anything not listed: **tracking is inversely proportional
to size** — negative above 32px, zero in the 14–19px band, positive only for uppercase at
13px and below, always zero for monospace. **Leading is inversely proportional to size and
directly proportional to measure.**

---

## 4. Layout findings — operator skills

- **Card text is misaligned with the prose by 25px.** Heading and prose start at x=96; the
  first card's text starts at x=121. The card *border* is aligned instead of the card
  *copy*. Fixed by outdenting the grid one card-padding plus the 1px border.
- **The two card rows are different heights** — 282px and 236px — so the block reads as two
  mismatched bands. `grid-auto-rows: 1fr` makes all seven equal.
- **The outdent has a precondition:** the gutter must exceed it. The live gutter floor is
  24px and the outdent is 25px, so at narrow widths cards would overhang by 1px. Raise the
  floor to 32px, or drop the outdent below the 4-column breakpoint. It only appears in a
  band of viewport widths, which is how this kind of thing ships unnoticed.
- **The empty eighth grid slot is correct as-is.** Seven items in a four-column grid always
  leaves one gap; centring the last row would break the left edge every other element
  shares. Noted so nobody "fixes" it later.

---

## 5. Captures section — the whitespace

### What is actually causing it

The ten captures are **not one gallery**. They are five separate `.term-grid` containers,
each holding exactly two figures. Each pair sizes independently, so a short card can never
borrow the space left by its tall neighbour. The gap below it is structural.

| Row | Left | Right | Dead space |
| --- | --- | --- | --- |
| 1 — frame announce / interrogate | 742px | 948px | 206px |
| 2 — the gate / plan | 496px | 945px | 449px |
| 3 — scope / the gate refuses | 1084px | 684px | 400px |
| 4 — deviate / summary | 205px | 563px | 358px |
| 5 — challenge sweep / adjudicate | 712px | 377px | 335px |
| **Total** | | | **1748px** |

**Every option below requires the same markup change:** all ten figures move into one
container. That is the real work; the CSS is small.

### The legibility problem underneath

The transcripts do not render at 12.48px. `pre` is 12.48px, but `code` and `.tl` inside it
shrink again by `.82em`, so **the actual rendered transcript text is 10.23px** — and the
elision notes, shrunk once more, land at **8.70px**. Nobody chose those numbers; they are
what `em` compounding produces through three nested levels.

Set the size once on `pre` and let it inherit. Cards get taller as a result — that is the
honest price of readable text, and it argues *for* a capped option rather than against the
fix.

### The four options, measured at 1400px

| Option | Height | Dead space | Order | Hidden content |
| --- | --- | --- | --- | --- |
| A — masonry (CSS columns) | 4840px | none | **scrambled** — 1–4 left, 5–10 right | none |
| B — capped + internal scroll | 2496px | none | preserved | 9 of 10 cards scroll |
| C — single column, full width | 6300px | none | preserved | none |
| **D — capped preview, expands in place** | **2496px** | 254px \* | preserved | one click, nothing nested |

\* Option D's 254px is one row, beside the *deviate* capture, which is genuinely only 226px
of content. Option B reaches 0 only by padding that same card out to a uniform 480px — the
empty space still exists, it just sits inside the card instead of beside it. The two are
equivalent; D's is the more honest presentation.

### Recommendation — Option D

**The measurement undercuts masonry.** Option A sits in the middle on height while being
the only one of the four that reorders the captures. It pays a real cost — a pipeline
narrative read out of sequence — and does not buy the shortest section in return.

**Option D matches B's 2496px, the shortest of the four, while removing every one of B's
costs.** Nothing scrolls inside anything. Nothing is permanently hidden. Order is
preserved, verified with a card open. And an expanded card is the best reading mode on the
page: at full width the transcript wraps so much less that capture 1 shows *completely* in
607px, having needed a 480px window to show a fraction of itself collapsed.

Two caveats:

- **The cost is the JavaScript** — about fifteen lines. A `<details>` version cannot show a
  clipped preview, because closed means empty; the checkbox-and-label alternative has real
  accessibility problems. A `<button>` with `aria-expanded` is the honest way to build it.
  If a no-JS constraint exists, that rules D out.
- **Option C is the best no-JS answer.** 6300px, nothing hidden, nothing nested, nothing
  reordered. Note it is *not* double Option A despite having half the columns — at full
  width the transcripts wrap far less, so each card is much shorter.

### A simplification worth taking either way

The six leg colours currently drive four properties each through repeated rules. A single
`--leg` custom property per card collapses roughly 24 rules into 6 declarations, and the
border, dot, pill and prompt all follow from it.

---

## What was verified, and what was not

Verified in-browser via computed styles and bounding boxes:

- Type: display 36px/1.1/−0.02em; labels at 1.25 leading; mono tracking at 0
- Operator skills: all 7 cards equal height; heading, prose and card text sharing one left
  edge to the pixel; no overhang at 1400 / 1000 / 390px; no horizontal scroll
- Captures: 30 cards across three static galleries, zero horizontal overflow on any
  transcript
- Option D: 9 of 10 cards clipped and given a control, the 10th correctly given none;
  `aria-expanded` and `aria-controls` wired; expanding spans 541px → 1106px and shows the
  full transcript; visual order still 1–10 with a card open; collapse restores exactly

**Not verified visually.** Screenshot capture returns blank for `file://` pages in the
tooling used, so these are geometric and computed-style checks, not a human looking at the
result. Please open both files before acting on them — particularly to judge the 30rem
preview cap in Option D and the gutter width, which are taste calls that measurement
cannot settle.

**Fonts.** Fraunces and Albert Sans are declared exactly as the site declares them but are
not loaded in these standalone files, so they fall back to system faces. Spacing, metrics
and layout are accurate; the letterforms are not.
