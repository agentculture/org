# Agent pages don't scale — finding 6 in full

The four presentation pages under `/agents/` are the best work on the site. They
are also, structurally, one page written four times. This note sets out the
measurement, why it is a UX problem rather than only a tidiness problem, and a
proposed shape that keeps everything good about the current pages.

This is the one finding that is cheaper to act on before the fifth page than
after.

## What is there now

| Page | Lines | Diagram | Terminal | Terminal lines |
|------|-------|---------|----------|----------------|
| `colleague.astro` | 844 | `ColleagueDiagram` | `ColleagueTerminal` | 485 |
| `reachy-mini-cli.astro` | 634 | `ReachyDiagram` | `ReachyTerminal` | 406 |
| `devague.astro` | 612 | `DevagueFlow` | `DevagueTerminal` | 426 |
| `lobes.astro` | 497 | `LobesDiagram` | `LobesTerminal` | 200 |

2,587 lines of page, 1,517 lines of terminal component. Four agents presented.
Thirty in the directory.

Every page imports the same seven modules in the same order:

```astro
import Layout from "../../layouts/Layout.astro";
import PageHero from "../../components/PageHero.astro";
import <X>Diagram from "../../components/<X>Diagram.astro";
import <X>Terminal from "../../components/<X>Terminal.astro";
import site from "../../data/site";
import <x> from "../../data/<x>";
```

Every page opens with a `Fast facts` section and closes with `Closing`. In
between, the four share no structure whatsoever:

| | Sections between `Fast facts` and `Closing` |
|---|---|
| colleague | The paradigm · Three tiers · The work loop · The workforce · Cortex and senses · Eidetic memory · More surfaces · Dogfood · What's next |
| devague | The pipeline · The method · The human gate · The operator skills · Real captures · What's next |
| lobes | The lobes · The command · Profiles · The Mesh-brain · Benchmarks |
| reachy | The body · The noun map · The single-SDK-owner model · The senses, live · Thinking out loud · Agent-first · What's next |

Some of that divergence is real and good — a robot page should not be shaped
like a spec-pipeline page. But the *shared* parts diverge too, and that is the
part worth fixing.

## The terminal components are the clear case

All four render the same idea: a captured terminal session with a title bar, a
timestamp, a prompt, and output. `ReachyTerminal` is `ColleagueTerminal` with
every class name given an `r` prefix:

| ColleagueTerminal | ReachyTerminal |
|-------------------|----------------|
| `.term` | `.rterm` |
| `.term-head` | `.rterm-head` |
| `.dot` | `.rdot` |
| `.stamp` | `.rstamp` |
| `.title` | `.rtitle` |
| `.context` | `.rcontext` |
| `.source` | `.rsource` |

Astro scopes component styles automatically — every element in the built HTML
carries a `data-astro-cid-*` attribute, and the four terminals already have four
different ones. The rename prevented a collision that could not have occurred.
That is the signature of copy-paste rather than of divergent design need.

Reproduce:

```bash
cd site-astro/src/components
diff <(sed 's/[Cc]olleague//g' ColleagueTerminal.astro) \
     <(sed 's/[Rr]eachy//g' ReachyTerminal.astro) | grep -c '^[<>]'
```

## Why this is a UX problem, not only a code problem

Four independent copies means four places where the same decision gets made, and
nothing holds them in agreement.

The drift is already measurable. `LobesTerminal` is 200 lines; `ColleagueTerminal`
is 485. The two render the same concept at less than half the fidelity — the
lobes terminal has no `.context`, no `.source`, no provenance tagging, where the
colleague one does. A visitor moving between the two pages is looking at two
different components that are trying to be the same thing.

With four pages this reads as variety. With ten it reads as inconsistency, and
the site stops feeling like one site. The presentation pages are the org's
strongest argument that it builds carefully; a directory of pages that each
handle a terminal capture slightly differently undercuts exactly that argument.

There is also a straightforward cost argument. Written this way, agent five is
another ~600 lines of page and another ~400 of terminal, most of it transcribed
from a sibling. Written against a shared shell, agent five is a data module.

## The data layer is already the right shape

This is the part that makes the fix cheap. The per-agent data modules already
exist and already separate content from presentation:

```text
src/data/colleague.ts          657 lines
src/data/devague.ts            445
src/data/reachy-mini-cli.ts    562
src/data/lobes.ts              236
src/data/*-captures.ts         (four more, capture content)
src/data/types.ts              the shared shape
```

The pages are not carrying the content — the data modules are. What the pages
carry is layout, and that is what has been copied. The refactor is therefore
mostly deletion, not redesign.

## Proposed shape

Two shared components and one convention. Nothing here changes what any page
says, only how it is assembled.

### 1. `<Terminal>` — one component, content from data

```astro
---
// src/components/Terminal.astro
interface Props {
  /** Window title — e.g. "colleague run --task …" */
  title: string;
  /** Timestamp shown in the head bar. */
  stamp?: string;
  /** Where this capture came from — repo, run id, or doc reference. */
  source?: string;
  /** Working context line shown above the prompt. */
  context?: string;
  /** The captured lines. */
  lines: TerminalLine[];
  /** Provenance: "fresh" | "ported" — rendered as a tag when present. */
  provenance?: "fresh" | "ported";
}
---
```

`TerminalLine` goes in `src/data/types.ts` alongside the existing shapes:

```ts
export type TerminalLine =
  | { kind: "prompt"; text: string }
  | { kind: "out"; text: string; accent?: string }
  | { kind: "ellipsis" };
```

Every accent class currently hard-coded per agent — `.accent-dogfood`,
`.accent-lobes`, `.leg-challenge`, `.prov-ported` and the rest — becomes the
`accent` field on a line, resolved against one shared map. That is what makes a
single component able to serve all four pages without losing any of the
per-agent colour they currently have.

### 2. `<AgentPage>` — the shell

```astro
---
// src/components/AgentPage.astro
interface Props {
  /** Matches the directory entry name in data/site.ts. */
  name: string;
  /** One-line role, reused from data/site.ts — single source of truth. */
  role: string;
  /** The Fast facts rows every page already opens with. */
  facts: Fact[];
  /** The closing section every page already ends with. */
  closing: string[];
}
// Sections in between arrive via named slots, so pages keep full freedom
// over their own middle while the shell guarantees the shared parts.
---
```

Pages then read as their own structure and nothing else:

```astro
<AgentPage name="lobes-cli" role={…} facts={lobes.facts} closing={lobes.closing}>
  <section slot="body">…the lobes…</section>
  <section slot="body">…the command…</section>
</AgentPage>
```

### 3. Keep the bespoke diagrams

`ColleagueDiagram`, `LobesDiagram`, `ReachyDiagram` and `DevagueFlow` should stay
separate. They genuinely draw different things — a tier stack, a lobe map, a
robot body, a nine-stage flow — and there is no shared abstraction worth
inventing for four drawings that have nothing in common. This proposal is about
the parts that are the same, not the parts that merely sit in the same slot.

## What this buys

| | Now | Proposed |
|---|---|---|
| Lines to add agent five | ~1,000 | a data module |
| Places a terminal style is defined | 4 | 1 |
| Guarantee two pages agree | none | structural |
| Per-agent visual identity | per-page CSS | `accent` in data |
| Bespoke diagrams | 4 | 4, unchanged |

## Suggested sequence

The refactor is worth doing in this order, because each step is independently
reviewable and each leaves the site working:

1. **Add `TerminalLine` to `types.ts` and build `<Terminal>`** against the
   richest existing case, `ColleagueTerminal`. Nothing else changes yet.
2. **Port `lobes` to it** — the smallest and least risky of the four, and the one
   that currently loses the most by being a thin copy. This is where the
   consistency win becomes visible.
3. **Port `reachy` and `devague`.** Delete the three superseded components.
4. **Extract `<AgentPage>`** once three pages have been through step 3 and the
   genuinely shared shell is known from evidence rather than guessed at.

Step 4 deliberately comes last. The shell should be extracted from what the pages
turned out to share, not designed up front — the current pages are the best
available evidence of what an agent page actually needs, and that evidence is
easier to read once the terminals stop varying.

## What this proposal does not touch

- No change to any page's copy, section order, or bespoke diagram.
- No change to the data modules' content — only the addition of `TerminalLine`
  to `types.ts`.
- No change to the accessibility work, which is correct throughout and documented
  in [`findings.md`](findings.md) under *What is already right*. In particular the
  `role="region"` / `tabindex="0"` / `aria-label` treatment on scrollable tables
  is consistent across all four tables today and must survive any shell
  extraction.
- No new runtime dependency. `pyproject.toml`'s zero-dependency rule is a Python
  constraint and does not reach the site, but the site has no framework JS today
  and this proposal does not add any.
