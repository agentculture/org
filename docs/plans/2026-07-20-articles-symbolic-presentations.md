# Build Plan — articles + symbolic presentations

slug: `articles-symbolic-presentations` · status: `exported` · from frame: `articles-symbolic-presentations`

> Rename the Presentations section to Articles — the mind-nervous-system-body talk stays as a text article — then rebuild Presentations as a symbolic, image-anchored slide experience: minimal text, each robot on its own slide, narrated around the CLI as the neurosymbolic layer between agent and robot

## Tasks

### t1 — Split the catalog: add the Articles catalog to presentations.ts with its own /articles/ route template; the deck keeps the existing card

- covers: c4, h3, c18, h16
- acceptance:
  - npm exec tsc -- --noEmit passes; the article card routes to /articles/mind-nervous-system-body/
  - git diff over presentationEvidence and presentationProjects is empty — 12 evidence entries and 2 repo homes byte-identical
  - branch state verified before changes: exactly one text-dense presentations page, zero content images (before_state holds)

### t2 — Author the slide dataset: new data module deriving the deck from the 8 beats — per slide {robot, headline, one spoken line, image slot, evidence ids}

- depends on: t1
- covers: c5, h4
- acceptance:
  - every slide headline/spoken line traces verbatim or by tight paraphrase to a beat or the thesis — no new factual claims
  - all slide evidence ids resolve through evidenceFor() without throwing; tsc clean
  - each robot (Reachy Mini, SO-101/ARM101) has its own slide; no slide mixes robots

### t3 — Placeholder images + contributor manifest: intentional-looking placeholder thumb/full pairs under site-astro/public/ plus a manifest naming every expected photo (filename, subject, orientation/aspect, target dimensions, alt text)

- covers: c15, h10
- acceptance:
  - built site shows zero broken-image icons; placeholders read as deliberate design, not errors
  - manifest covers every image slot the deck declares; dropping a real photo over a placeholder filename requires no code change
  - every shipped asset is far below the Cloudflare Pages 25 MiB per-file limit

### t4 — Wayfinding: six-item nav (Articles + Presentations) in navigation.ts, reteach navigation.test.mjs, update the home Explore cards in index.astro

- covers: c2, h1, c7, h6
- acceptance:
  - node --experimental-strip-types --test src/data/navigation.test.mjs passes with retaught assertions
  - `/articles/*` owns Articles section state, `/presentations/*` owns Presentations; no other item claims either
  - home Explore surface links /articles/ and /presentations/ exactly once each

### t5 — Move the text talk to Articles: git mv presentations/index.astro + mind-nervous-system-body.astro under pages/articles/, touching only path-dependent strings

- covers: c3, h2, c13
- acceptance:
  - diff of moved files vs originals shows only back-link, title, and route changes — 8 beats, definitions, evidence baselines, and hidden d3 rail markup unchanged
  - dist/articles/mind-nervous-system-body/index.html serves the full article; the article loses no paragraph

### t6 — Build the symbolic deck: new /presentations/ index + one-route deck page at /presentations/mind-nervous-system-body/ — full-viewport slide sections, one robot per slide, big imagery, minimal text, CLI-as-neurosymbolic-layer through-line

- depends on: t2, t3, t5
- covers: c14, h9, c10, h12, c12, h7, c16, h14, c19, h17, c17
- acceptance:
  - the deck is one built HTML page; slides navigable by scroll, keyboard, and visible prev/next controls
  - under emulated prefers-reduced-motion: reduce every slide is reachable, nothing autoplays, no scroll-snap hijack; animation only behind the (prefers-reduced-motion: no-preference) + html.js gate; any set:html animated content styled via :global()
  - thumbnails below slide one carry loading=lazy; the deck contains no dense paragraph blocks
  - slides alone carry the argument for a viewer who missed the talk; a visible link routes depth-seekers to the article

### t7 — Reteach the deterministic checker: check-presentations.mjs asserts the article routes, thesis, beat ids, and evidence URLs under /articles/, plus new deck checks (route ownership, slide count, one robot per slide, image slots)

- depends on: t5, t6
- covers: c6, h5, h8
- acceptance:
  - npm run check:presentations passes on a fresh build and stays filesystem-only (no network)
  - mutating any of: article route, thesis string, a beat id, an evidence URL, the deck route, or the slide structure makes the checker fail
  - checker asserts the deck owns dist/presentations/mind-nervous-system-body/index.html, the article owns dist/articles/mind-nervous-system-body/index.html, and public/_redirects does not exist

### t8 — Closeout: version bump + changelog, full gate run, restated link-check baseline

- depends on: t4, t7
- covers: c1, h13, c20, h18, c9, h11, c17, h15
- acceptance:
  - npm run build, npm run check:presentations, the navigation tests, tsc, and markdownlint on touched docs all pass
  - uv run org site link-check --json shows only the restated, written-down /learn/ failure count (2 more per net-new page) and zero other failures
  - pyproject.toml version bumped with a Keep-a-Changelog entry; walkthrough at 320px and 1440px, light and dark, on /articles/ and /presentations/

## Risks

- [follow_up] real photos arrive after the build — swapping placeholders for supplied shots of Reachy Mini and the SO-101 is a drop-in follow-up, no code change
