# Build Plan — AgentCulture.org is live: the org site is built in the org repo and deployed to Cloudflare Pages at the apex, and both open org issues are closed out — issue #2's build brief is delivered end to end, and issue #4's fleet-audit findings are dispatched as downstream issues to their real owners

slug: `agentculture-org-is-live-the-org-site-is-built-in` · status: `exported` · from frame: `agentculture-org-is-live-the-org-site-is-built-in`

> AgentCulture.org is live: the org site is built in the org repo and deployed to Cloudflare Pages at the apex, and both open org issues are closed out — issue #2's build brief is delivered end to end, and issue #4's fleet-audit findings are dispatched as downstream issues to their real owners.

## Tasks

### t1 — Post the IA + stack proposal as a comment on org#2 (the brief's explicit gate)

- covers: c12, h2
- acceptance:
  - a comment on org#2 states the stack (Astro output:'static', no adapter, site-astro/), the rationale (house direction, culture-tools precedent, gitignore trap), the four-section IA, the deploy shape (Direct Upload Pages + deploy.yml + wrangler), and the cutover plan; it is signed per convention and predates the merge of any site PR

### t2 — Dispatch issue #4: file the six downstream issues and the tracker comment

- covers: c18, h8, c7, h16, c5, h14
- acceptance:
  - issues exist on devex (teach colleague + gemini backends — reproduce the exit-2 lint break in a colleague repo when filing), culture-agent-template (false seed sentence), devague (claude-code → claude), and culture / katvan / culture-sonar-cli (each missing prompt file); each issue names only its repo's defect and cites the audit's verified evidence/repro for that repo
  - org#4 gets exactly one comment with a checklist linking all six issues and stays open as the tracker; the org diff for this work contains zero code changes driven by #4 findings

### t3 — Provision Cloudflare via cultureflare: Pages project agentculture-org + custom domains

- covers: c15, h5
- acceptance:
  - cf-pages-project-create.sh agentculture-org --direct-upload runs as dry-run first, then --apply; the real *.pages.dev subdomain is recorded from the apply output into a deploy runbook (docs/), never assumed
  - agentculture.org and <www.agentculture.org> are attached as custom domains via cf-pages-domain-add.sh (dry-run then --apply); the redirect rule still winning at this stage is expected and verified (apex still 301s to culture.dev — no premature go-live)

### t4 — Scaffold the Astro site in site-astro/ (static, no adapter, CI-built)

- depends on: t1
- covers: c11, h1
- acceptance:
  - astro build emits a pure-static dist/ (no adapter, no SSR); git ls-files confirms site-astro/ is tracked (only its dist/ ignored); a CI job builds the site green on the PR

### t5 — Site content: the four IA sections, every fact checkable against a live repo

- depends on: t4
- covers: c13, h3, c2, h11
- acceptance:
  - Home answers 'what is AgentCulture' on its own; Framework covers Organic Development (culture mesh, cite-don't-import, awareness agents); Agents & Repos lists the fleet; Engage links GitHub org, culture.dev, sibling sites — and every named agent, repo, and framework fact is checkable against a live repo or doc, nothing invented
  - content lives in site-astro/src/content/ (data/markdown), disjoint from the design task's layout/style/component files

### t6 — Design + motion system: exceptionally beautiful, animated, calm

- depends on: t4
- covers: c21, h10, c26, h19
- acceptance:
  - deliberate design direction, not template defaults: intentional typography scale, palette, spacing; light and dark themes; WCAG AA contrast validated; owns site-astro/src/{layouts,styles,components,pages}
  - motion layer: entrance/scroll transitions with gentle easing, steady 60fps with no jank on mid-range hardware; prefers-reduced-motion fully honored with the still site remaining complete; Lighthouse >=95 on performance and accessibility against the built site

### t7 — org CLI site verbs + self-description realignment

- depends on: t4
- covers: c17, h7
- acceptance:
  - site build / preview / deploy / link-check land as a noun group obeying the three contracts (stdout/stderr split, CliError, exit codes), each with --json and an explain-catalog entry (test_every_catalog_path_resolves green); site deploy is dry-run by default with --apply
  - uv run pytest -n auto, black, isort, flake8, bandit, markdownlint, and teken cli doctor . --strict are all green; README/learn/explain no longer claim the site is unbuilt (doc-test-alignment)

### t8 — deploy.yml: the site's GitHub Actions deploy in the vacated slot

- depends on: t4, t3
- covers: c14, h4, c6, h15
- acceptance:
  - triggers on push to main scoped to site paths (+ the workflow itself); builds the Astro site and uploads with wrangler pages deploy dist/ --project-name agentculture-org; contains zero uv build / uv publish / PyPI steps; a branch run publishes a branch preview deployment
  - CLOUDFLARE_API_TOKEN (and CLOUDFLARE_ACCOUNT_ID) are configured as repo Actions secrets by the operator; a green run ends with the deployment live on the recorded *.pages.dev subdomain

### t9 — Preview gate: operator reviews the live *.pages.dev preview

- depends on: t5, t6, t8
- covers: c21, h10, c26, h19
- acceptance:
  - the operator (Ori) reviews the live preview URL and explicitly approves the aesthetic — beautiful, smooth, wholesome, peace-and-awe, and the animated smoothness evoking relief — before any apex cutover; the Lighthouse >=95 perf+a11y report is attached to the approval

### t10 — Merge the org PR through the cicd lane

- depends on: t5, t6, t7, t8
- covers: c4, h13
- acceptance:
  - version bumped via /version-bump; PR opened with cicd open; review threads resolved and SonarCloud quality gate green (cicd await clean); merged to main; the post-merge deploy.yml run is green and the production *.pages.dev deployment serves the site

### t11 — Cutover: re-scope the redirect rule so the apex serves the site

- depends on: t9, t10
- covers: c16, h6, c8, h17
- acceptance:
  - the operator explicitly authorizes before --apply; the 'claudeflare managed redirect' rule (zone-scoped, single rule — verified) is edited/removed so agentculture.org and www no longer match; culture.dev and every other zone's redirect behavior verified unchanged
  - post-cutover: curl -sI on apex and www return 200 serving the org site; dig MX still returns the three route*.mx.cloudflare.net hosts; SPF and DKIM TXT byte-identical; chat.agentculture.org still resolves through its cfargotunnel CNAME

### t12 — Close-out: verification sweep + issue comments

- depends on: t2, t11
- covers: c1, h9, c3, h12, c10, h18
- acceptance:
  - each success signal runs unattended and green: curl -sI apex + www (200, no location: culture.dev), gh run list --workflow deploy.yml (green), gh issue view 2 and 4 (linking comments present); the before-state 301 evidence and after-state checks are recorded in the closing comment on #2
  - org#2's owed checklist is fully accounted: proposal comment, merged site PR, live domain each linked; #2 closes, #4 stays open as tracker

## Risks

- [unknown_nonblocking] cultureflare token scopes can't be preflighted (CF API limitation) — a missing Pages/ruleset write scope surfaces as a 403 only at --apply time; remediation: operator re-mints per cultureflare docs/SETUP.md (task t3)
- [unknown_nonblocking] attaching the apex/www custom domains may require CF to repoint the zone's A/CNAME records at the Pages project; harmless while the redirect rule wins, but every DNS mutation must be recorded in the runbook (task t3)
- [unknown_nonblocking] CI needs a pinned Node toolchain for astro build alongside uv; unpinned versions drift (task t8)
- [unknown_nonblocking] Sonar coverage gate (fail_under=60) with new CLI verbs — the deploy verb's network path needs mockable seams or coverage sinks below the gate (task t7)
