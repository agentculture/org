# whats next finale slide

> The deck gains a seventh finale slide — What's next: See. Remember. Act. — turning ARM101 from unfinished second example into evidence the architecture expands from social presence to manipulation
> instruction: ship dataset, glyph component, renderer branch, test re-pins, and check re-pins together as one change; verify with node --experimental-strip-types --test, astro build, and check-presentations.mjs all green before opening the PR

## Audience

- the same deck audiences as the parent frames — live-talk listeners and self-guided visitors; the finale must read as trajectory (working system → next step) with ARM101 as evidence of expansion, never as an unfinished example
  - instruction: read slide 7 in the built deck without its spokenLine: two robot next-steps and the shared separation band must communicate the expansion alone

## Before → After

- Before: Before: the deck is exactly six slides (dataset header 'always 6', test 'exactly six slides, ids in beat order', check expectedDeckSlideCount=6 with a pinned id list); the close is last with the verbatim thesis; the spokenLine cap is 4; no 'next' slide kind or glyph-triad component exists
  - instruction: verify on main before building: the six-slide pins hold and grep finds no 'next'-kind branch in the renderer
- After: After: seven slides ending on 'whats-next' (kind 'next', beat 7) — headline 'What's next: See. Remember. Act.', the glyph triad, two robot next-step entries, the shared separation band, bottomLine 'The same architecture, expressed through a different body.', a six-sentence spoken close — with every count/id/cap pin re-pinned to the new shape
  - instruction: check the built HTML: 7 data-deck-slide sections, the new slide last, dot rail shows 7, pager reads n / 7

## Why it matters

- the slide gives the presentation a real trajectory: it turns ARM101 from 'unfinished second example' into evidence that the architecture is expanding from social presence to manipulation (the user's review, verbatim), and hands the talk its natural final sentence
  - instruction: design-review the finale at presentation distance in both dawn themes: trajectory reads forward-looking, not roadmap-vague

## Requirements

- slide 7 content verbatim per the user's review: headline "What's next: See. Remember. Act."; Reachy Mini entry — claim "Give presence understanding and history.", traits "Semantic vision · embodied memory · behavior informed by experience"; SO-ARM101 entry — claim "Apply the same autonomy pattern to manipulation.", traits "Persistent runtime · reachability memory · load-aware rules · supervised recovery"; bottomLine "The same architecture, expressed through a different body."
  - instruction: transcribe the user's review text verbatim into the dataset — headline, both card claims and trait lines, bottomLine; no paraphrase, punctuation preserved
  - honesty: the built slide 7 carries the headline, both robot claims, both trait lines, and the bottomLine verbatim, and the node test pins each string
- slide 7 spokenLine, exactly the user's 4-sentence spoken version: Reachy already has an autonomous presence / understand more of what it sees and retain useful memory of people, objects, events, and its environment / ARM101 already has the beginning of a safe operational language: observable state, guarded motion, overload sensing, and reachability exploration / it gets the same persistent sense–rule–intent runtime—adapted for manipulation rather than expression
  - instruction: append the two trajectory sentences (per q2) after the four spoken sentences, preserving the user's punctuation (sense–rule–intent runtime—adapted; memory—and)
  - honesty: the finale's spokenLine is the user's four sentences plus the two-sentence trajectory close, six sentences by the test's sentence regex, all verbatim
- the separation triple renders on the slide: "agent authors and supervises / runtime persists and arbitrates / body retains control"
  - instruction: render the triple as the shared center band per q3 — three short lines between/below the two cards, one visual band, not per-card
  - honesty: the built slide renders 'agent authors and supervises', 'runtime persists and arbitrates', 'body retains control' in one shared band, verbatim
- every six-slide pin re-pins to seven: expectedDeckSlideCount and expectedDeckSlideIds in check-presentations.mjs, the test's exactly-six/beat-order assertions and 'deck's six slides' prose, the dataset header's 'always 6' and beat 1-6 — plus a new beat-7 'next' slide kind with its own renderer branch (no unstyled fallback)
  - instruction: re-pin: dataset header ('always 7', beats 1-7, slide list), test (count, id order, kinds, per-kind shape), check (expectedDeckSlideCount=7, expectedDeckSlideIds + the new section's checks); the dot rail and pager derive from slides.length automatically — verify, don't edit them
  - honesty: every former six-slide pin now reads seven, and the new 'next' kind has a dedicated renderer branch with no unstyled fallback
- the deck-wide spokenLine sentence cap relaxes 4 → 6 (test assertion + dataset header prose) so the finale's six-sentence spoken close fits; every slide 1-6 stays within four
  - instruction: change the cap assertion to 6 and add a companion assertion that slides 1-6 each stay ≤ 4, so the relaxation cannot silently loosen the rest of the deck
  - honesty: the test asserts the deck-wide cap of 6, a companion assertion pins slides 1-6 at ≤ 4 sentences each, and the finale counts exactly 6
- a new DeckNextGlyphs-style inline-SVG component supplies the See/Remember/Act triad in the house pattern: site-palette custom properties, role=img + aria per idiom, deterministic ids, transform/opacity-only animation behind prefers-reduced-motion: no-preference, authored inline (no set:html)
  - instruction: model the component on DeckPathGlyphs.astro (single prop selecting the glyph, decorative by default); verify the triad's animation selectors reach the built HTML (scope-hash check, the lobes lesson)
  - honesty: the triad renders once on the finale with role=img + aria labels, and its animation selectors match elements in the built dist HTML (scope hashes verified)
- slide 1 (bridge) carries a small speaker byline — 'Ori Nachum' — quiet and seamless beside the title block
  - instruction: add an optional byline field to the bridge slide's dataset entry and render it in the bridge branch as a small, ink-soft line near the headline block — eyebrow-weight, unobtrusive, legible in both dawn themes; pin the string in the node test
  - honesty: the built bridge slide renders 'Ori Nachum' exactly once, visually subordinate to the headline, and the node test pins the byline string

## Honesty conditions

- the shipped PR is one change and all three checks pass green on the seven-slide deck
- the dataset diff touches slides 1-6 only in the file-header prose; the close keeps thesis, sources, photos, and cards byte-identical; no article surface appears in the PR diff
- read without the spoken track, the built finale communicates both robots' next steps and the shared separation alone at presentation distance
- verified on main before building: expectedDeckSlideCount=6, the test's exactly-six assertion, and the absence of any 'next' renderer branch all hold
- the built deck renders 7 data-deck-slide sections with 'whats-next' last, the dot rail counts 7, and the pager reads n / 7
- a both-theme design review at presentation distance confirms the finale reads as trajectory — forward-looking, visual-first, ARM101 as expanding evidence
- each of the three checks was deliberately broken once against the seven-slide expectations, observed failing, and restored green

## Success signals

- node --test, astro build, and check-presentations.mjs all pass with the seven-slide re-pins, and the published deck renders the finale last
  - instruction: before opening the PR, deliberately break one re-pinned expectation per check (slide count, missing finale section, cap regression), watch each fail, restore

## Scope / boundaries

- slides 1-6 stay content-identical: the close keeps the verbatim thesis as its bottomLine, both hero photos, its two maturity cards, and deckSources rendering exactly once on it — the finale adds, never edits
  - instruction: audit the PR diff: no article route/data/check, no close-slide content change beyond the dataset header prose; run the article checks and confirm byte-identical results

## Non-goals

- no new photo obligation: slide 7 carries no photo slot — the three existing slots keep their exactly-once discipline; the slide's visual element is a new inline-SVG component in the house pattern

## Decisions

- naming discipline per the review: never "proper vision" (Reachy already has functioning motion/light vision and optional face perception) — the next step is "semantic vision"; on-slide wording is "the same autonomy pattern" (spoken may say "the same autonomy"); ARM101 inherits the separation, not Reachy's behavior
- slide position per the user: a seventh slide AFTER the close — the deck becomes 7 slides with "What's next: See. Remember. Act." as the finale; the verbatim thesis stays on slide 6 (close), and the talk's last spoken word becomes the trajectory sentence
