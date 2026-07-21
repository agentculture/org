# articles + symbolic presentations

> Rename the Presentations section to Articles — the mind-nervous-system-body talk stays as a text article — then rebuild Presentations as a symbolic, image-anchored slide experience: minimal text, each robot on its own slide, narrated around the CLI as the neurosymbolic layer between agent and robot
> instruction: verify the end state with: npm run build && npm run check:presentations && node --experimental-strip-types --test src/data/navigation.test.mjs, then walk /articles/ and /presentations/ at 320px and 1440px, light and dark

## Audience

- AgentCulture.org visitors: people who hear (or will hear) the talk live and want the slides afterward, plus readers evaluating the mesh's robotics work in depth; secondary — the speaker, presenting directly from the deck

## Before → After

- Before: today the Presentations tab holds one text-dense page — eight beats of dense paragraphs that read as an article, not something to present from — and the site ships zero content images
- After: the site has two distinct surfaces: an Articles tab holding the full 8-beat text talk at /articles/mind-nervous-system-body/, and a Presentations tab holding a symbolic one-route slide deck at /presentations/mind-nervous-system-body/ — big photographs, minimal text, each robot on its own full-viewport slide, the CLI-as-neurosymbolic-layer thesis as the through-line a speaker talks over

## Why it matters

- a deck and an article serve different moments: the deck anchors a live spoken narrative while the slides carry the symbols; the article preserves the evidence-grounded argument for readers — conflating them weakens both, and the current page is the conflation

## Requirements

- navigation.ts's five-item primary nav changes: the /presentations/ item (label Presentations, match: section) becomes /articles/, and a new Presentations item points at the rebuilt slide surface; navigation.test.mjs pins exactly-five links, sole section ownership of /presentations/*, and home-links-Presentations-exactly-once — all three assertions must be retaught
  - instruction: edit navigation.ts to the six-item nav (Articles and Presentations both section-matched as needed); reteach the three pinned assertions in navigation.test.mjs; run the node test to green
  - honesty: navigation.test.mjs is retaught in the same change and passes: the six-item nav renders identically from Header and Footer, /articles/ owns section state for the article routes, /presentations/ owns it for the deck, and no other item ever claims them
- pages/presentations/index.astro and mind-nervous-system-body.astro (the 8-beat text talk, single-column under approved d3) move under pages/articles/; a new pages/presentations/ surface renders the symbolic deck
  - instruction: git mv the two pages to src/pages/articles/ and touch only path-dependent strings (back-link, title, route); diff moved files against originals to prove content preservation
  - honesty: the article page moves content-preserved — the 8 beats, definitions, evidence baselines, hidden d3 source-rail markup, and evidence links are unchanged except path-dependent strings (back-link, page title, route)
- presentations.ts types the card route as /presentations/${string}/ — an Articles catalog needs its own route template; the 12 commit-pinned evidence entries (REACHY_MINI_COMMIT, ARM101_COMMIT) and 2 repository homes are reusable by both surfaces unchanged
  - instruction: add an articles catalog (own /articles/ route template) importing the existing ledger; leave presentationEvidence and presentationProjects byte-identical; npm exec tsc -- --noEmit
  - honesty: the 12 commit-pinned evidence entries and 2 repository-home links remain literally unchanged and are imported by both surfaces from the one ledger — never duplicated or re-pinned
- the presentation duplicate derives a slide-shaped dataset from mind-nervous-system-body.ts: per slide a headline plus one spoken line at most, an image anchor, one robot per slide (Reachy Mini; SO-101/ARM101), with the existing mind / symbolic-nervous-system / body thesis as the CLI-as-neurosymbolic-layer through-line — the 8-beat text stays untouched as the article's content
  - instruction: author the deck dataset deriving each slide {robot, headline, spoken line, image slot, evidence ids} from mindNervousSystemBodyBeats/thesis; review each slide string traces to a beat; resolve evidence ids through evidenceFor()
  - honesty: every slide's headline and spoken line trace back to existing beat text or the thesis — the deck invents no new factual claim; slide evidence ids resolve through the same evidenceFor() ledger
- scripts/check-presentations.mjs hard-codes dist paths presentations/index.html and presentations/mind-nervous-system-body/index.html, the exact thesis string, 8 beat ids, and 12 evidence URLs — the rename breaks every path assertion; the checker must be retaught for /articles/ and extended to cover the new deck
  - instruction: reteach check-presentations.mjs routeFiles to the articles/ paths, keep thesis/beat/evidence assertions, add deck checks (route, slide count, one robot per slide, image slots present); run npm run check:presentations on a fresh build
  - honesty: the retaught checker stays deterministic (filesystem only, no network) and fails on drift in: article routes, thesis string, beat ids, evidence URLs, deck route, and slide count/one-robot-per-slide structure
- index.astro's home Explore card (href /presentations/, glyph presentations) needs an Articles card and a kept-or-repointed Presentations card; every PR must also version-bump pyproject.toml + CHANGELOG.md or the version-check CI job fails
  - instruction: update the home Explore cards to link /articles/ and /presentations/ once each; run /version-bump; markdownlint the changelog
  - honesty: the home Explore surface links /articles/ and /presentations/ exactly once each, and the PR lands with a pyproject.toml version bump plus a Keep-a-Changelog entry
- slides anchor on real photographs of the robots with thumbnail-optimized quick loading (responsive sizes, lazy-load below the first slide); any video is delivered via Cloudflare rather than bundled raw in the repo
  - instruction: ship photos under site-astro/public/ as thumb + full pairs; loading=lazy below slide one; assert every dist/ asset stays far below the Pages 25 MiB per-file limit; defer any hosted-video need to a cultureflare operator step
  - honesty: photos ship as static dist/ assets in thumbnail plus full size, lazy-loaded below the first slide; no bundled file approaches the Pages per-file limit; hosted video (Stream/R2) is deferred to a credentialed operator step, never provisioned from this repo
- the symbolic deck owns /presentations/mind-nervous-system-body/ and the text article moves to /articles/mind-nervous-system-body/; no _redirects entries are added — old deep links are allowed to break
  - instruction: after build, assert the deck markup is at dist/presentations/mind-nervous-system-body/index.html and the article at dist/articles/mind-nervous-system-body/index.html; assert public/_redirects does not exist
  - honesty: after the swap, /presentations/mind-nervous-system-body/ serves only the deck, /articles/mind-nervous-system-body/ serves only the article, and no _redirects file is added to public/
- the deck is one route: full-viewport slide sections in a single page, one robot per slide, keyboard/scroll navigable, honoring the reduced-motion boundary already captured (c10)
  - instruction: build the deck as one .astro page of full-viewport slide sections with scroll, keyboard, and visible prev/next controls; verify under emulated prefers-reduced-motion: reduce that every slide is reachable with no snap hijack or autoplay
  - honesty: the deck is one built HTML page navigable by scroll, keyboard, and visible controls; under prefers-reduced-motion: reduce there is no scroll hijacking, no autoplaying motion, and every slide remains fully reachable
- the deck ships with placeholder thumbnail slots plus explicit contributor guidance — a manifest naming each expected file (filename, subject, orientation/aspect, target dimensions, alt text) so the user knows exactly which photos of Reachy Mini and the SO-101 to add; real photos land as drop-in replacements without code changes
  - instruction: write the image manifest (per-file: filename, subject, orientation/aspect, target dimensions, alt text) as an in-repo doc or data file; build with placeholders and confirm the deck looks intentional with zero broken images
  - honesty: an in-repo manifest names every expected image file with subject, orientation/aspect, target dimensions, and alt text; the built site looks intentional with placeholders in place, and dropping in a real photo requires no code change

## Honesty conditions

- the shipped site matches the announcement: an Articles tab serving the unchanged text talk and a Presentations tab serving the one-route symbolic deck, both verified by the retaught deterministic checks
- the restated link-check baseline is written down in the acceptance (exact expected /learn/ failure count after the new pages) and any other failure is a hard stop
- with reduced motion requested, the deck presents all content statically; animation only ever runs behind the (prefers-reduced-motion: no-preference) + html.js gate, and any animated component styles set:html content via :global()
- the deck serves both groups: a viewer who missed the live talk can follow the argument from the slides alone, and a depth-seeking reader is visibly routed to the article
- both tabs are reachable from the primary nav and the home page, and each surface delivers its tab's promise — article: full text; presentation: symbolic slides
- the starting point is accurate at branch time: exactly one text-dense presentations page and zero content images (scope entries s2, s7)
- the split truly separates the moments: the deck contains no dense paragraph blocks, and the article loses none
- every listed check is runnable locally and is actually executed and green before the PR opens

## Success signals

- npm run build, the retaught check:presentations, and the navigation tests all pass; /articles/... serves the unchanged 8-beat text; /presentations/... renders one robot per full-viewport slide with placeholder thumbnails and per-file guidance; reduced-motion is honored; org site link-check reports only the restated /learn/ baseline

## Scope / boundaries

- org site link-check (org/cli/_commands/site.py) walks dist/ generically with a stdlib HTML parser, so no org/ Python change is needed for the rename; but each new page inherits Header/Footer /learn/ links, so the approved d2 structural baseline (20 /learn/ failures) shifts by 2 per added page — restate the baseline in acceptance, never silently regress; the /learn/ route itself stays out of scope under issue #18
  - instruction: write the expected post-change /learn/ failure count into the acceptance; run uv run org site link-check --json and fail on any non-/learn/ finding
- the slide experience must honor prefers-reduced-motion: global.css gates all data-reveal animation behind (prefers-reduced-motion: no-preference) + html.js per the confirmed site design bar, and any animated slide component must use :global() for CSS reaching set:html content (the LobesTerminal dead-animation trap)
  - instruction: keep all deck motion behind the (prefers-reduced-motion: no-preference) + html.js gate; style any set:html animated content via :global(); verify with emulated reduce

## Non-goals

- the d3 source-notes-rail cleanup (display:none rail in the talk page) remains its own follow-up PR — the hidden markup moves with the article unchanged; vendored .claude/skills/, the zero-dep rule, and the never-publish-to-PyPI constraint are untouched

## Assumptions

- the repo ships zero content images today — site-astro/public/ holds only favicons and there is no src/assets/ — so robot imagery for the slides is a genuinely new asset surface (sourcing, optimization, and alt-text conventions all unestablished)

## Scope exploration

- `s1` — `site-astro/src/data/navigation.ts + navigation.test.mjs`: primaryNavigation is the single shared source Header/Footer render from; the test pins the exact five-item array, /presentations/ section ownership incl. the talk route, and the home Explore surface linking /presentations/ exactly once — a rename+duplicate touches every one of those assertions
  - seeds: `c2`
- `s2` — `site-astro/src/pages/presentations/`: index.astro is a data-driven card grid over presentations[]; mind-nervous-system-body.astro renders 8 beats of dense paragraphs with the source-note rail display:none under approved d3 (delivery 2026-07-19) — this is the text-heavy page the user wants kept as an article
  - seeds: `c3`
- `s3` — `site-astro/src/data/presentations.ts`: PresentationCard.route is template-typed /presentations/${string}/; presentationEvidence holds 12 immutable commit-pinned GitHub blob URLs over reachy-mini-cli and arm101-cli; repositoryUrl links intentionally follow latest
  - seeds: `c4`
- `s4` — `site-astro/src/data/mind-nervous-system-body.ts`: the 8-beat narrative (442 lines: paragraphs, points with shipped/api-only/boundary/future statuses, definitions, evidence baselines) is exactly the text-dense content to preserve as the article and to distill into slides; evidenceFor() already resolves ledger ids for reuse
  - seeds: `c5`
- `s5` — `site-astro/scripts/check-presentations.mjs + package.json check:presentations`: the deterministic built-output checker (385 lines) pins routeFiles {home, presentations/index.html, presentations/mind-nervous-system-body/index.html}, the thesis string, expectedBeatIds, and expectedEvidenceUrls — every one breaks on rename; it runs via npm run check:presentations and is not a CI gate today (tests.yml site job runs only npm ci + npm run build)
  - seeds: `c6`
- `s6` — `site-astro/src/pages/index.astro + .github/workflows/tests.yml`: home Explore card links /presentations/ once with a presentations glyph (nav test pins the exactly-once count); tests.yml enforces version-check on every PR per repo convention
  - seeds: `c7`
- `s7` — `site-astro/public/ + asset sweep`: only apple-touch-icon.png, favicon.ico, favicon.svg exist; no tracked image anywhere in site-astro (agents pages use terminal-capture data files and inline-SVG diagram components, not raster images)
  - seeds: `c8`
- `s8` — `org/cli/_commands/site.py + delivery 2026-07-19 d1/d2 baseline`: link-check is route-agnostic (walks dist/, pure stdlib per the zero-dep rule); the d2-approved baseline is exactly 20 /learn/ missing-file failures across 10 pages with issue #18 open to fix the Learn route
  - seeds: `c9`
- `s9` — `site-astro/src/styles/global.css + memory: site design bar / LobesTerminal trap`: data-reveal animation is gated behind (prefers-reduced-motion: no-preference) + html.js with a reduce fallback at line 358; DevagueTerminal is the working :global() precedent for animated set:html content
  - seeds: `c10`
- `s10` — `docs/deliveries/2026-07-19-presentations-tab-and-neurosymbolic-robots.md`: d3 approved hiding the source-note rail pending its own cleanup PR; the ledger, DOM links, and external verification were retained — that follow-up must not be absorbed into this rename
  - seeds: `c11`
- `s11` — `docs/deploy-runbook.md (Cloudflare state)`: Pages project agentculture-org (Direct Upload) serves dist/ on Cloudflare's CDN — static thumbnails/photos ride that for free; no Stream/R2/Images resource is provisioned in the runbook ledger, so video beyond a static dist/ asset is a credentialed operator step via the cultureflare checkout
  - seeds: `c12`

## Resolved vagueness

- [unknown_blocking] the actual photo/video files do not exist in the repo yet — real shots of Reachy Mini and the SO-101 must be supplied (or captured) before the deck can ship with real imagery — resolved: ship thumbnail placeholders now with per-file guidance; the user supplies the real photos afterward as drop-ins
