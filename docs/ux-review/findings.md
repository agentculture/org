# UX findings — agentculture.org

An outside review of the built site, measured against a local production build
at commit `d71a719` (`site-astro@0.0.1`, Astro static output, 8 routes).

Every claim below is measured, not impressionistic. Method is stated per finding
so an agent can re-run it and confirm or refute independently. Where the site was
checked and found correct, that is recorded too — see
[What is already right](#what-is-already-right). Those sections are not padding:
they mark the things a well-meaning refactor could easily break.

## How to re-run the measurements

```bash
cd site-astro
npm ci && npm run build     # needs Node >= 22.12 (.nvmrc says 24)
npx serve dist -l 4321
```

Then evaluate the snippets quoted in each finding against the served page.

## Summary

| # | Finding | Surface | Severity |
|---|---------|---------|----------|
| 1 | One affordance, two destinations — cards leave the site with no signal | `/agents/` | High |
| 2 | The clickable region is 4% of the card | `/agents/` | High |
| 3 | Intro copy contradicts the page it introduces | `/agents/` | Medium |
| 4 | 30 entries, 6 groups, no wayfinding | `/agents/` | Medium |
| 5 | `Learn` is in the primary nav and 404s in this build | all pages | Medium |
| 6 | Agent pages are structural clones — the pattern does not scale | `/agents/*` | Structural |
| 7 | 92 outbound links, no "leaves the site" affordance | all pages | Low |

Findings 1–4 are one page and are worth fixing together; a worked, interactive
proposal for all four is in [`agents-directory.html`](agents-directory.html).
Finding 6 is the one that compounds — see
[`agent-page-scaling.md`](agent-page-scaling.md).

## 1 — One affordance, two destinations

`/agents/` renders 30 cards in a single visual language. They lead to three
different kinds of place:

| Destination | Count | Example |
|-------------|-------|---------|
| An in-site presentation page | 4 | `colleague` → `/agents/colleague/` |
| GitHub, off-site | 25 | `irc-lens` → `github.com/agentculture/irc-lens` |
| A different hosted site | 1 | `learn-cli` → `agentculture.org/learn/` |

Nothing in the card distinguishes them. A visitor who clicks `colleague` lands on
a considered 844-line presentation page and learns the org builds those. The same
visitor clicking `irc-lens` — visually identical, one card away — is thrown to a
GitHub repo, out of the site, with no way back but the back button.

The four presentation pages are the most substantial work in the repo, and the
directory hides them behind the same treatment as a bare repo link. This is the
finding with the largest gap between effort spent and effort visible.

**Method.** From `src/data/site.ts`:

```bash
node -e '
const s=require("fs").readFileSync("src/data/site.ts","utf8");
const urls=[...s.matchAll(/url: "([^"]+)",\n\s+role:/g)].map(m=>m[1]);
console.log(urls.length, urls.filter(u=>u.startsWith("/")).length,
            urls.filter(u=>u.startsWith("https://github.com")).length);'
# → 30 4 25
```

**Suggested direction.** The data layer already knows which is which — `url`
starting with `/` is in-site. The distinction can be derived, with no new field
and no content edit. Rendering it is the whole fix: a "Read the page →" action on
the four, a repo glyph on the rest. Worked in
[`agents-directory.html`](agents-directory.html), option A.

## 2 — The clickable region is 4% of the card

On `/agents/` the card is a `div.card.entry`; only the agent name inside `h3` is
an anchor. The visual target is the card, the actual target is one short line of
text.

| Measure | Value |
|---------|-------|
| Card area (1280px viewport) | 54,903 px² |
| Anchor area, median | ~1,700 px² |
| Anchor as share of card | **4%** |
| Anchor height | 24 px |

24 px meets WCAG 2.2 SC 2.5.8 (Target Size Minimum, 24×24) but sits well under
the 44×44 that platform guidance and SC 2.5.5 (AAA) ask for.

The same site already does this the other way round. On `/`, the three teasers
are `a.card` — the whole card is the anchor, with a hover lift and an arrow that
slides. Two card grids, two interaction models, one site.

**Method.** On `/agents/`:

```js
[...document.querySelectorAll('.entry')].map(c => {
  const a = c.querySelector('h3 a'), cr = c.getBoundingClientRect();
  const ar = a.getBoundingClientRect();
  return (ar.width * ar.height) / (cr.width * cr.height);
});
// → median ≈ 0.04
```

**Suggested direction.** Promote the card to `a.card`, matching the home page.
This also resolves finding 1's affordance problem for free: a whole-card anchor
has somewhere to put a destination cue.

## 3 — Intro copy contradicts the page it introduces

`/agents/` opens with (`src/data/site.ts`, `agents.intro[1]`):

> This is a curated selection of the fleet, grouped by what each agent does.
> Every entry links to its public repository.

Five of the 30 no longer do — the four presentation pages and `learn-cli`. The
sentence was true when written and the site outgrew it.

This is the drift `CLAUDE.md` already names under *"Self-description must track
reality"*, and the `doc-test-alignment` skill exists to catch. It is worth noting
that the skill did not catch this one, because the claim is prose in the data
layer rather than a doc assertion — which may be a gap worth closing separately.

**Suggested direction.** Rewrite to describe both destinations, which is a
stronger sentence anyway once finding 1 is fixed — the presentation pages become
something the intro can advertise rather than something it denies.

## 4 — 30 entries, 6 groups, no wayfinding

The page is a flat scroll. The six group headings (`Mesh & platform`, `Memory &
data`, `Developer tooling`, `Cloud & infrastructure`, `Edge & robotics`,
`Learning & play`) are only discoverable by scrolling past them, there is no jump
list, no filter, no count, and no anchor links to share a group.

At 30 entries this is friction. The org is visibly still growing.

**Suggested direction.** A sticky group jump-list, and `id` anchors on group
headings so `/agents/#edge-robotics` is linkable. A text filter is proposed as a
progressive enhancement only — it must not become the only way to find something.
Worked in [`agents-directory.html`](agents-directory.html), option B.

## 5 — `Learn` is in the primary nav and 404s in this build

`src/components/Header.astro` hard-codes four nav links, the first being
`/learn/`. No `/learn/` route exists in this repo, and `npm run build` emits no
`dist/learn/`:

```bash
npm run build && ls dist/learn
# → ls: dist/learn: No such file or directory
```

Commit `1e2816f` records the intent — the `learn-cli` site merges in at cutover —
so this is deliberate and dated, not an oversight. Flagging it for two reasons:

- If the site deploys before the `learn-cli` merge, the first item in the primary
  nav is a 404 on every page of the site.
- `org site link-check` walks `dist/` for internal links that 404. Either it
  catches this and CI is red, or it does not walk the header, which is a gap in
  the check. Both are worth knowing before cutover.

**Suggested direction.** Nothing in the site's design needs to change. Confirm
which of the two cases holds, and gate the nav item on the merge if the deploy
could land first.

## 6 — Agent pages are structural clones

The four presentation pages are, structurally, one page written four times.

| Page | Lines | Bespoke components |
|------|-------|--------------------|
| `colleague.astro` | 844 | `ColleagueDiagram`, `ColleagueTerminal` (485) |
| `reachy-mini-cli.astro` | 634 | `ReachyDiagram`, `ReachyTerminal` (406) |
| `devague.astro` | 612 | `DevagueFlow`, `DevagueTerminal` (426) |
| `lobes.astro` | 497 | `LobesDiagram`, `LobesTerminal` (200) |

Every one imports the same seven modules in the same order, opens with a
`Fast facts` section and closes with `Closing`. In between they share no
structure at all.

The terminal components are the clearest case. All four render the same idea — a
captured terminal session. `ReachyTerminal` is `ColleagueTerminal` with every
class name given an `r` prefix:

| ColleagueTerminal | ReachyTerminal |
|-------------------|----------------|
| `.term` | `.rterm` |
| `.term-head` | `.rterm-head` |
| `.dot` | `.rdot` |
| `.stamp` | `.rstamp` |
| `.title` | `.rtitle` |
| `.context` | `.rcontext` |
| `.source` | `.rsource` |

Astro scopes component styles automatically (`data-astro-cid-*` is on every
element in the built HTML), so the rename prevented a collision that could not
have happened. That is the signature of copy-paste, not of divergent design need.

**Why it matters for UX, not just for the codebase.** Four independent copies
means four places for a spacing decision to be made differently, and nothing
holds them in agreement. The drift is already visible — `LobesTerminal` is 200
lines against `ColleagueTerminal`'s 485, so the two render meaningfully different
UI for the same concept. There are 30 agents in the directory and four pages
built. Written this way, agent five is another ~600 lines and another chance to
diverge, and the pages stop feeling like one site.

**Method.**

```bash
cd site-astro/src/components
diff <(sed 's/[Cc]olleague//g' ColleagueTerminal.astro) \
     <(sed 's/[Rr]eachy//g' ReachyTerminal.astro) | grep -c '^[<>]'
```

**Suggested direction.** A shared `<AgentPage>` shell plus one `<Terminal>` taking
its content from the per-agent data module — which already exists and is already
the right shape (`data/colleague.ts`, `data/lobes.ts`, …). Sketched with a
proposed component API in [`agent-page-scaling.md`](agent-page-scaling.md).

This is the one finding that is cheaper to act on before the fifth page than
after.

## 7 — 92 outbound links, no "leaves the site" affordance

92 anchors across the built site point at external origins. None carry a visual
or assistive cue that the destination is off-site.

```bash
grep -ohE '<a [^>]*href="https?://[^"]*"' dist/*.html dist/*/index.html \
  dist/agents/*/index.html | wc -l
# → 92
```

Worth stating clearly: none use `target="_blank"`, so there is **no**
`rel="noopener"` vulnerability here and none needs adding. Navigation happens in
the same tab, which is the right default and should be kept. The gap is purely
that the visitor cannot tell in advance.

**Suggested direction.** A small outbound glyph on external anchors, plus visually
hidden text for screen reader users. Lowest priority of the seven — it only
becomes pressing on `/agents/`, where finding 1 makes it acute.

## What is already right

Checked, measured, and found correct. Recorded so that work on the findings above
does not regress any of it.

**Colour contrast passes AA everywhere, in both themes.** The claim in
`global.css`'s header comment is accurate. All ten text/background token pairs:

| Pair | Light | Dark |
|------|-------|------|
| `--ink` on `--bg` | 12.78 | 16.15 |
| `--ink-soft` on `--bg` | 6.86 | 8.88 |
| `--ink-soft` on `--surface` | 7.46 | 7.88 |
| `--accent` on `--bg` | 6.37 | 11.77 |
| `--accent` on `--surface` | 6.93 | 10.44 |

Lowest is 6.37:1 against a 4.5:1 requirement. There is real headroom, which is
what makes the palette safe to extend.

**Heading order is clean on all 8 routes.** No skipped levels, exactly one `h1`
per page, `h2`/`h3` properly nested — including the 37-heading `/agents/` page and
the 39-heading `colleague` page.

**Scrollable tables are correctly exposed.** All four wide tables across three
pages carry `tabindex="0"`, `role="region"` and a descriptive `aria-label`, so
they are keyboard-scrollable and announced. This is done consistently on every
one, which is rarer than it should be.

**Mobile layout holds at 360px.** No horizontal page scroll; the one element wider
than the viewport is the roles table, correctly contained in its `.table-wrap`
scroller rather than pushing the page.

**Reduced motion and no-JS are handled thoroughly.** Entrance-hidden states are
gated behind both `html.js` and `prefers-reduced-motion: no-preference`, so the
site renders complete and composed with JavaScript off or motion suppressed —
and there is a global kill switch catching component-scoped transitions too. The
reveal system degrades to nothing rather than to blank content.

> One correction to an earlier draft of this review: elements sitting at
> `opacity: 0` while inside the viewport were briefly recorded here as a reveal
> bug. They were not. The `IntersectionObserver` uses `threshold: 0.12` with
> `rootMargin: "0px 0px -36px 0px"`, so an element peeking a few pixels above the
> fold correctly has not yet triggered. The blank screenshots that prompted it
> came from a stuck renderer in the review tooling; `document.elementFromPoint`
> confirmed the content painted at `opacity: 1` throughout. The reveal system is
> sound.

## Artefacts in this folder

| File | What it is |
|------|------------|
| [`agents-directory.html`](agents-directory.html) | Interactive. Findings 1–4, live before/after, three options measured |
| [`agent-page-scaling.md`](agent-page-scaling.md) | Finding 6 in full, with a proposed component API |
| [`spacing-type-system.html`](spacing-type-system.html) | Interactive. Spacing and type tokens for the operator-skills section |
| [`captures-layout.html`](captures-layout.html) | Interactive. Three layouts for the captures section, measured |
