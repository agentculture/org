# Build Plan — devague page: the challenge leg

slug: `devague-page-the-challenge-leg` · status: `exported` · from frame: `devague-page-the-challenge-leg`

> agentculture.org/agents/devague now presents the seven-leg method: the new /challenge blind-spot discovery skill (devague 0.19.0, issue 73) is vendored into org's skill kit and the page teaches it in its true flow position — third leg, between /think and /spec-to-plan

## Tasks

### t1 — Vendor the challenge skill and update the provenance ledger

- instruction: cp -R ../devague/.claude/skills/challenge .claude/skills/ ; verify diff -ru empty; model the docs/skill-sources.md row on the deviate/summarize-delivery direct-vendor rows and update the opening count sentence
- covers: c5, h1, c6, h2, c10, h12
- acceptance:
  - diff -ru ../devague/.claude/skills/challenge .claude/skills/challenge produces no output (verbatim copy incl. type: command)
  - docs/skill-sources.md counts seven devague-origin skills and the new challenge row matches the direct-vendor row shape (origin devague, 2026-07-15, devague 0.19.0)
  - markdownlint-cli2 over tracked markdown still passes (.claude/skills/** stays excluded)

### t2 — Move devague.ts to the seven-leg copy (incl. captures story to three runs)

- instruction: edit only site-astro/src/data/devague.ts; the five six-leg copy sites are hero.metaDescription, hero.intro[1], pipeline.intro[0], skills.intro[0], closing.paragraphs[0]; insert the challenge PipelineStage after 'idea → spec' and the /challenge SkillCard after /think; source facts from the upstream challenge SKILL.md and its 2026-07-15 spec decisions c17/c18/c19; keep whatsNext byte-identical
- covers: c7, h3, c12, h14, c18
- acceptance:
  - grep -in 'six' site-astro/src/data/devague.ts returns no rendered-copy hits (comments about others' six-of-something excluded)
  - a seventh PipelineStage and a seventh /challenge SkillCard sit third in leg order, copy citing the upstream skill (blind-spot pass, findings land proposed, clean pass records lenses examined)
  - the whatsNext block is byte-identical to main
  - captures.headline/intro tell three runs; provenance header comment re-verified against devague 0.19.0

### t4 — Add the ninth challenge stage to DevagueFlow.astro

- instruction: edit only site-astro/src/components/DevagueFlow.astro; insert the challenge stage li between spec and waves; design the glyph in the existing SVG idiom (a lens/sweep motif over a spec page suits the blind-spot beat); shift --d delays of waves/build/deviate/summary and gate keyframe timing; raise the 59rem stacking breakpoint to fit nine stages; update the figure aria-label
- covers: c17, h7
- acceptance:
  - the played diagram shows nine stages with challenge between spec and waves — own glyph in the house SVG style, stage-label 'challenge', stage-kind 'blind spots'
  - the animation cascade is re-timed monotonically left-to-right (waves/build/deviate/summary --d delays and gate keyframes shifted); motion stays transform/opacity only
  - reduced-motion and no-JS render the full composed nine-stage arc; the stacking breakpoint is raised so the row never scrolls horizontally
  - the figure aria-label narrates the challenge beat

### t5 — Author the third capture batch (this run's real /challenge session)

- instruction: edit only site-astro/src/data/devague-captures.ts; append a third batch header comment + two CapturePane exports (challengeSweepRoute, challengeAdjudicateReexport) using ONLY the verbatim lines embedded in the task brief; mark every cut with an ellipsis line; never reword a kept line
- covers: c18, h8
- acceptance:
  - a third batch header comment documents: captured 2026-07-15, devague 0.19.0, verbatim-lines rule, trims marked with ellipsis lines
  - two new CapturePane exports (challenge sweep/route; adjudicate/reconverge/re-export) whose lines match the transcript embedded in the task brief exactly
  - every existing pane and export in devague-captures.ts is byte-identical to main

### t6 — Version bump (minor) + CHANGELOG entry

- instruction: run the version-bump skill: minor bump + Keep-a-Changelog entry covering the vendored challenge skill and the seven-leg page update
- covers: c9, h5
- acceptance:
  - pyproject.toml version differs from main's
  - CHANGELOG.md gains a Keep-a-Changelog entry describing the challenge-skill vendor and the seven-leg page update

### t3 — Rewrite devague.astro header comment and wire the challenge capture panes

- instruction: edit only site-astro/src/pages/agents/devague.astro; import the two new pane exports from devague-captures.ts and add one term-grid row for them in the captures section; rewrite the header comment for seven legs; c19 grants styling latitude on the 7-card grid if 3+3+1 reads awkward
- depends on: t2, t5
- covers: c8, h4
- acceptance:
  - the header comment narrates seven legs / seven skills and matches what the page renders
  - a new term-grid row renders the two challenge panes imported from devague-captures.ts
  - the skills grid needed no CSS change (or carries the deliberate c19 treatment if 3+3+1 read awkward at build)
  - cd site-astro && npm run build exits 0

### t7 — Final verification and honesty-condition audit on the assembled branch

- instruction: on the assembled branch run: cd site-astro && npm run build; uv run black --check org tests; uv run isort --check-only org tests; uv run flake8 org tests; uv run bandit -c pyproject.toml -r org; markdownlint-cli2 per repo config; uv run teken cli doctor . --strict; uv run pytest -n auto; then audit h6/h10-h14/h16 with grep/diff and report per-condition PASS/FAIL with evidence
- depends on: t1, t2, t3, t4, t5, t6
- covers: c1, h6, c2, h9, c3, h10, c4, h11, c11, h13, c15, h15, c16, h16
- acceptance:
  - npm run build (site-astro) and the full org lint gate all exit 0: black --check, isort --check-only, flake8, bandit, markdownlint-cli2, teken cli doctor . --strict
  - the built dist HTML for /agents/devague counts seven legs, shows the /challenge card third, and renders the nine-stage flow markup
  - the PR diff touches no files under org/ or tests/, leaves whatsNext byte-identical, and the vendored skill still diffs empty against upstream
  - every new page fact traces to the challenge SKILL.md, the upstream 2026-07-15 challenge spec, or CHANGELOG 0.19.0

## Risks

- [unknown_nonblocking] mid-tablet rendering of the re-timed 9-stage cascade is only observable in a browser — t4 verifies during the build (parked v1 on the frame, routed plan-side) (task t4)
- [unknown_nonblocking] the c18 capture batch's source transcript exists only in this operator session and is embedded verbatim in t5's brief — if a pane needs lines beyond the brief, the task must stop and ask rather than invent (task t5)
