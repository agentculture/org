# devague page: the challenge leg

> agentculture.org/agents/devague now presents the seven-leg method: the new /challenge blind-spot discovery skill (devague 0.19.0, issue 73) is vendored into org's skill kit and the page teaches it in its true flow position — third leg, between /think and /spec-to-plan
> instruction: treat the exported spec's requirement claims c5-c9 as the work items; the success signal c15 is the verification lane

## Audience

- visitors to agentculture.org/agents/devague — the presentation page Ori talks over — plus mesh agents and operators who learn the devague method from it

## Before → After

- Before: the page presents the six-leg method everywhere copy counts legs (hero, pipeline intro, skills intro, closing), and org's .claude/skills/ kit has no challenge skill
- After: the page presents the seven-leg method with /challenge as the third leg between /think and /spec-to-plan, and .claude/skills/challenge/ is vendored verbatim from ../devague at 0.19.0

## Why it matters

- the page is the method's public proof — its closing paragraph promises 'nothing was invented', so the moment the method grows a leg the page doesn't teach, that promise rots

## Requirements

- vendor .claude/skills/challenge/ verbatim from ../devague/.claude/skills/challenge/ — direct-vendor precedent set by scope/deviate/summarize-delivery at devague 0.18.0; SKILL.md already carries type: command
  - instruction: cp -R ../devague/.claude/skills/challenge .claude/skills/ then verify with diff -ru ../devague/.claude/skills/challenge .claude/skills/challenge (expect no output)
  - honesty: after vendoring, diff -ru ../devague/.claude/skills/challenge .claude/skills/challenge is empty — verbatim copy, type: command frontmatter included
- docs/skill-sources.md: the 'Six skills … are devague-origin' line becomes seven, and a challenge row lands in the ledger table (direct vendor, 2026-07-15, devague 0.19.0)
  - instruction: in docs/skill-sources.md change the 'Six skills (…)' sentence to seven incl. challenge, and add a challenge table row modeled on the deviate/summarize-delivery direct-vendor rows
  - honesty: the ledger's opening count and its table agree: seven devague-origin skills, and the challenge row carries origin=devague, direct vendor, 2026-07-15, devague 0.19.0
- site-astro/src/data/devague.ts: every six-leg copy site moves to seven legs — hero metaDescription + intro, pipeline intro arc sentence, skills intro, closing paragraph — plus a seventh SkillCard for /challenge and a seventh PipelineStage for the challenge leg; provenance header comment re-verified against devague 0.19.0
  - instruction: edit the five copy sites s4 enumerated (hero.metaDescription, hero.intro[1], pipeline.intro[0], skills.intro[0], closing.paragraphs[0]), insert a challenge PipelineStage after 'idea → spec' and a /challenge SkillCard after /think, and update the provenance header comment to devague 0.19.0
  - honesty: grep -in 'six' site-astro/src/data/devague.ts returns no rendered-copy hits after the edit, and the seventh SkillCard/PipelineStage sit third in leg order matching the skill's declared flow position
- site-astro/src/pages/agents/devague.astro: the header comment's six-leg description moves to seven legs; the skills grid (auto-fit minmax 18rem) absorbs a seventh card without CSS changes
  - instruction: rewrite the six-leg narration in the header comment of site-astro/src/pages/agents/devague.astro; verify the 7-card grid renders 3+3+1 in the build
  - honesty: the .astro header comment describes exactly what the page renders after the change — seven legs, seven skills — and the skills grid needed no CSS edits
- version bump + CHANGELOG entry — the version-check CI job fails any PR whose pyproject.toml version equals main's
  - instruction: run the version-bump skill (minor — the site gains a feature section and the kit gains a skill)
  - honesty: pyproject.toml version on the PR branch differs from main and CHANGELOG.md carries a matching Keep-a-Changelog entry
- DevagueFlow.astro gains a ninth 'challenge' stage between spec and waves — new glyph in the house style, the 0.55s-10.55s animation cascade re-timed to include it, and the stacking breakpoint re-sized to the 9-stage row (resolves q1)
  - instruction: add the stage li + glyph SVG between spec and waves in DevagueFlow.astro, shift the --d delays of waves/build/deviate/summary and the gate keyframe delays accordingly, update the aria-label narrative, and raise the 59rem stacking breakpoint to fit the 9-stage row
  - honesty: the played diagram shows nine stages with challenge third-to-fifth in visual order (between spec and waves), motion stays compositor-only (transform/opacity), reduced-motion/no-JS still renders the full composed nine-stage arc, and the stacked mobile track never scrolls horizontally
- devague-captures.ts gains a third labeled batch: verbatim panes from THIS run's real /challenge session at devague 0.19.0, and the captures section copy moves from 'twice' to three runs (resolves q2)
  - instruction: collect the real /challenge session transcript from this run, add a third batch header comment + CapturePane exports in devague-captures.ts, wire the new pane(s) into a term-grid row in devague.astro, and update captures.headline/intro from 'twice' to three runs
  - honesty: every line in the new panes is copied verbatim from this session's real terminal output (trims marked with ellipsis lines), the batch is labeled devague 0.19.0 with its own capture date, and no existing pane is altered

## Honesty conditions

- the live page and the vendored kit agree with upstream: /challenge exists in .claude/skills/, and the rendered page teaches it as the third leg of a seven-leg method — no copy anywhere still says six
- the page stays presentation-first: each leg's card and copy describe what the skill actually does, verified against its SKILL.md — operators who learn the method here are not misled
- on main today, grep -n 'six' site-astro/src/data/devague.ts hits exactly the five enumerated copy sites, and .claude/skills/challenge/ does not exist
- after merge, both the rendered page and the vendored kit place challenge third in flow order — matching the position upstream's SKILL.md declares (seventh origin skill, third leg)
- at merge time, diff -ru of the vendored challenge skill against ../devague's copy is still empty
- the PR diff touches no files under org/ (the CLI package) or tests/
- the PR diff leaves the whatsNext block of devague.ts byte-identical
- every command named in c15's instruction exits 0 on the PR branch
- every new fact in the copy traces to an upstream artifact — the challenge SKILL.md, the 2026-07-15 challenge spec's recorded decisions, or CHANGELOG 0.19.0 — the same provenance bar the file already enforces

## Success signals

- astro build green, the rendered page counts seven legs and shows the /challenge card in flow position, and the full org lint gate (black/isort/flake8/bandit/markdownlint/teken --strict) passes
  - instruction: cd site-astro && npm run build (or the repo's site build lane); then uv run black --check org tests, isort --check-only, flake8, bandit, markdownlint-cli2, uv run teken cli doctor . --strict

## Scope / boundaries

- the vendored SKILL.md body stays verbatim — cite-don't-import; markdownlint and sonar.exclusions already skip .claude/skills/** so no reformatting pressure exists
- no org CLI changes: doctor's skills_present check is count-agnostic (dir non-empty), and learn/explain never enumerate devague skills
- the whatsNext section stays untouched — all 14 linked issues re-verified open on 2026-07-15 via gh issue list, and closed issue 73 was never listed there

## Non-goals

- no changes to the devague repo itself — upstream already shipped challenge in 0.19.0; org only consumes
- the page still never runs devague in the browser — any new pane is a verbatim replay of a real captured session, per the existing captures invariant

## Assumptions

- the seventh skill card reads acceptably in the existing auto-fit grid (3+3+1); if it reads awkward at build time the task owner may give the row a deliberate treatment like the moves grid's full-width lead card — a styling call inside the task, not a new requirement

## Scope exploration

- `s1` — `../devague/.claude/skills/challenge/SKILL.md (290 lines, read in full)`: the seventh origin skill is method-only: no script, no new CLI verb — findings route through existing moves (capture/interrogate/question/park/scope/plan risk); frontmatter already carries type: command, so org's skill_loader will pick it up verbatim
  - seeds: `c5`
- `s2` — `../devague CHANGELOG 0.19.0 + docs/specs/2026-07-15-challenge-skill.md`: challenge shipped today in devague 0.19.0 (issue 73); its spec records the load-bearing decisions c17 (runs after /think export, re-exports the same dated file), c18 (resilience lands spec-side or plan-side by what-vs-how), c19 (the escalation signals) — source material the page copy can cite
  - seeds: `c4`, `c7`
- `s3` — `docs/skill-sources.md (org's provenance ledger)`: the ledger's opening line counts 'Six skills' as devague-origin and the table shows the direct-vendor precedent: scope/deviate/summarize-delivery landed 2026-07-15 at devague 0.18.0 as 'direct vendor; guildmaster re-broadcast pending' — challenge follows the same row shape at 0.19.0
  - seeds: `c6`
- `s4` — `site-astro/src/data/devague.ts (433 lines, read in full)`: six-leg copy lives in exactly five places: hero.metaDescription, hero.intro[1], pipeline.intro[0], skills.intro[0], closing.paragraphs[0]; stages[] and skills.cards[] each hold six entries in leg order; the provenance header says re-verified against 0.18.0
  - seeds: `c7`
- `s5` — `site-astro/src/pages/agents/devague.astro (594 lines)`: the header comment narrates the six-leg arc and six operator skills; the skills grid is repeat(auto-fit, minmax(18rem,1fr)) so a seventh card lands 3+3+1 with no CSS change; terminals are wired pane-by-pane in term-grid rows
  - seeds: `c8`
- `s6` — `site-astro/src/components/DevagueFlow.astro (930 lines, read in full)`: the centerpiece is an 8-stage arc (idea/frame/converge/spec/waves/build/deviate/summary) with a hand-timed 0.55s-10.55s cascade and a responsive breakpoint sized to the 8-stage row (~56rem); inserting a challenge stage is a real design job, not a label edit — parked as a user decision
  - seeds: `c16`
- `s7` — `site-astro/src/data/devague-captures.ts (592 lines, structure + headers)`: two labeled capture batches exist (0.17.0/0.17.2 original run; 0.18.0 update run) under a verbatim-lines-only rule with explicit ellipsis markers; a third batch from this run would follow the same CapturePane shape at 0.19.0
  - seeds: `c14`
- `s8` — `agentculture/devague open tracker (gh issue list + per-issue state, 2026-07-15)`: all 14 issues linked from whatsNext are still OPEN and issue 73 (challenge) — now CLOSED — was never among them, so the whatsNext section needs no refresh
  - seeds: `c12`
- `s9` — `org/cli/_commands/doctor.py skills_present check`: the check only asserts .claude/skills/ is non-empty — adding a skill directory cannot break it; no org CLI surface enumerates devague skills
  - seeds: `c11`
- `s10` — `challenge pass / unstated-assumptions lens: devague.astro skills grid CSS`: the six cards sit 3+3; a seventh lands 3+3+1 with the last card alone — surfaced the layout assumption nobody had stated and proposed it for adjudication
  - seeds: `c19`
- `s11` — `challenge pass / adjacent-systems lens: grep DevagueFlow|DevagueTerminal across site-astro/src`: both components are imported only by pages/agents/devague.astro — re-timing the flow cascade cannot ripple into other pages; clean
- `s12` — `challenge pass / adjacent-systems lens: site.ts devague directory entry`: the directory role text describes the arc without counting legs, so it stays honest with no edit; clean
- `s13` — `challenge pass / operations+reversibility lens: .github/workflows/deploy.yml`: merge to main auto-deploys site-astro/** to Cloudflare Pages (push-path trigger, secrets-gated, PR builds included) — the page goes live on merge with no separate operator step, and a git revert redeploys the old page; no rollback gap
- `s14` — `challenge pass / cheap-probe lens: npm run build on the untouched tree`: astro build exits 0 (6 pages, ~209ms) — c15's verification lane confirmed live before the workforce depends on it; dist/ is gitignored so the probe mutated nothing tracked
- `s15` — `challenge pass / security+migration+concurrency+failure-modes lenses: the change surface as a class`: statically-built page + verbatim skill vendor: no auth, no stored data, no schema, no concurrent writers; the only failure mode is a red build or an ugly render, both caught by c15's lane before merge — lenses examined, nothing to route
