# AgentCulture.org is live: the org site is built in the org repo and deployed to Cloudflare Pages at the apex, and both open org issues are closed out — issue #2's build brief is delivered end to end, and issue #4's fleet-audit findings are dispatched as downstream issues to their real owners

> AgentCulture.org is live: the org site is built in the org repo and deployed to Cloudflare Pages at the apex, and both open org issues are closed out — issue #2's build brief is delivered end to end, and issue #4's fleet-audit findings are dispatched as downstream issues to their real owners.
> instruction: Verify by: curl -sI <https://agentculture.org> (expect 200, org site, no location: culture.dev); gh issue view 2 and 4 --repo agentculture/org showing the closing/linking comments; a push to main on org redeploying via the Actions workflow

## Audience

- Two audiences: humans and agents landing on AgentCulture.org to understand the organization (what AgentCulture is, the agent fleet, how to engage), and the sibling-repo maintainers who receive issue #4's downstream issues.

## Before → After

- Before: agentculture.org 301-redirects every path to culture.dev via the 'claudeflare managed redirect' dynamic-redirect rule (the apex A 192.0.2.1 is a proxied dummy); the org repo has no site directory; issues #2 and #4 are open with no downstream issues filed.
- After: <https://agentculture.org> serves the org site from a Direct Upload Cloudflare Pages project with the apex and www attached as custom domains; the redirect rule no longer captures agentculture.org; the org repo holds the site source plus a GitHub Actions deploy workflow; issue #2's owed checklist is complete and issue #4 has a downstream issue filed with each owner.

## Why it matters

- org is the organization's public front door — until the site exists the domain bounces visitors to culture.dev and AgentCulture has no self-description; and #4's devex lint break keeps the documented PR lane unusable in 29 repos until the fix is dispatched to devex.

## Requirements

- Stack: Astro with output:'static' and no adapter, site source in site-astro/ — the house direction (culture-tools precedent, katvan mid-migration), and the directory name sidesteps the /site gitignore trap.
  - honesty: astro build emits a pure-static dist/ (no adapter, no SSR), site-astro/ is tracked by git (not swallowed by the /site or dist/ ignore stanzas), and the site builds green in CI before any deploy step exists
- The information-architecture + stack proposal is posted as a comment on org#2 BEFORE any site code is merged — the brief makes the proposal-on-issue an explicit gate.
  - honesty: a comment on org#2 containing the stack choice, its rationale, and the IA exists and predates the merge of the first site PR
- IA v1, four sections: Home (what AgentCulture is), the Organic Development framework (culture mesh, cite-don't-import, awareness agents), Agents & Repos (the fleet directory), and Engage (how to interact — GitHub org, culture.dev, sibling sites). Every fact on the site is derivable from repos/docs that exist today.
  - honesty: every named agent, repo, and framework fact on the site is checkable against a live repo or doc — nothing is invented for the page
- Deploy: a GitHub Actions workflow in the slot the removed publish.yml vacated — builds the Astro site and uploads dist/ with wrangler pages deploy (Direct Upload), authenticated by a single CLOUDFLARE_API_TOKEN repo secret, per the house sub-site pattern; CF's GitHub integration is not used.
  - honesty: the workflow triggers on push to main (site paths), holds zero PyPI/uv-publish steps, and a green run ends with the new deployment live on the *.pages.dev subdomain
- Provisioning via cultureflare: create the Direct Upload Pages project (cf-pages-project-create.sh, recording the real *.pages.dev subdomain from apply output), then attach agentculture.org and <www.agentculture.org> as custom domains (cf-pages-domain-add.sh). All mutations dry-run first, --apply to commit.
  - honesty: every cultureflare mutation is shown as a dry-run plan before --apply, and the project's real *.pages.dev subdomain is recorded from the apply output rather than assumed (CF auto-suffixes name collisions)
- Cutover: edit the 'claudeflare managed redirect' ruleset so its rule no longer matches agentculture.org/www (other zones' redirects untouched), letting the proxied apex resolve to the Pages custom domain. This is the operator-owned go-live step and happens only with explicit operator authorization.
  - honesty: the operator explicitly authorizes the redirect-rule edit before --apply; after cutover, culture.dev and every other zone's redirect behavior is verified unchanged, and agentculture.org email routing still validates (MX/SPF/DKIM untouched)
- The org CLI grows the site operator verbs (site build / preview / deploy / link-check) obeying the three stable contracts (stdout/stderr split, CliError, exit-code policy), each with --json and a catalog entry; mutating verbs dry-run by default with --apply; teken cli doctor --strict stays green.
  - honesty: uv run pytest, all four linters, and teken cli doctor . --strict are green with the new verbs; each verb has an explain-catalog entry (test_every_catalog_path_resolves passes)
- Issue #4 dispatch via the communicate skill: file downstream issues on devex (D — teach it colleague + gemini backends; the one-liner that unbreaks the PR lane in 29 repos), culture-agent-template (A — fix the false seed sentence), devague (C — claude-code to claude), and culture / katvan / culture-sonar-cli (B — restore each missing prompt file), then comment on #4 linking them all.
  - honesty: each downstream issue names the concrete defect, cites the audit's verified evidence/repro for that repo alone, and is signed per the communicate skill; #4 gets one comment linking all of them
- The site is exceptionally beautiful: a smooth, wholesome experience that reflects peace and awe. Design is a first-class deliverable, not a template default.
  - honesty: beauty is gated twice: an objective floor — deliberate design direction (intentional typography, palette, spacing, restrained motion; no template defaults), responsive, light and dark themes, WCAG AA contrast, prefers-reduced-motion respected, Lighthouse >=95 on performance and accessibility — and a subjective gate: the operator reviews the live *.pages.dev preview and approves the aesthetic before the apex cutover
- The site is animated: smooth, gentle motion is a core part of the experience — the animated smoothness itself should evoke relief in the visitor. (User, mid-frame: 'Animated site and smooth experience makes me feel relief.')
  - honesty: motion is pervasive but calm: entrance/scroll transitions with gentle easing, steady 60fps with no jank on mid-range hardware, fully honoring prefers-reduced-motion (the still site must remain complete), and the relief feeling is judged by the operator at the same preview gate as h10

## Honesty conditions

- the three deliverables are all independently checkable: the apex serves the site (curl, no 301), org#2's checklist items are each closed by a linked artifact (proposal comment, merged site PR, live domain), and org#4 carries the comment linking every downstream issue
- the site answers both audiences' first question within one click: a visitor can say what AgentCulture is from the home page alone, and each downstream issue is actionable by its repo maintainer without reading org#4 in full
- verified live 2026-07-10: curl -sI <https://agentculture.org> returns 301 location <https://culture.dev/>; the zone's http_request_dynamic_redirect entrypoint holds exactly one rule, matching apex+www; gh issue list shows only #2 and #4 open
- every element is independently observable: curl shows 200 from Pages at apex and www; the redirect entrypoint no longer matches agentculture.org; deploy.yml exists on org main; issues #2/#4 carry their linking comments
- both pains are reproducible today, not asserted: curl -sI shows the 301 bounce, and devex pr lint exits 2 with 'unknown backend colleague' in any of the 29 colleague repos
- deploy.yml contains no uv build / uv publish / pypa publish action steps, and no Trusted Publisher registration exists for org
- the org diff for this work contains no code change driven by a #4 finding; every fix lands as an issue on the owning repo
- post-cutover: dig MX agentculture.org still returns the three route*.mx.cloudflare.net hosts, the SPF and DKIM TXT records are byte-identical, and chat.agentculture.org still resolves through its cfargotunnel CNAME
- each signal is a single command an agent can run unattended: curl -sI on apex and www, gh run list --workflow deploy.yml, gh issue view 2 and 4

## Success signals

- curl -sI <https://agentculture.org> returns 200 serving the org site (no 301 to culture.dev); www reaches the same site; a push to org main triggers a redeploy; issues #2 and #4 each carry a closing/linking comment.

## Scope / boundaries

- No PyPI, ever: the deploy workflow publishes a static site to Cloudflare Pages and nothing else — no uv build/uv publish steps, no Trusted Publisher (org#1 is settled law).
- None of issue #4's fixes land in the org repo — org files the downstream issues and updates the tracking issue; the code changes belong to devex, culture-agent-template, devague, culture, katvan, and culture-sonar-cli.
- The zone's live email routing (MX, SPF, DKIM records) and the chat.agentculture.org tunnel CNAME are untouched by the cutover — only the redirect rule's capture of the apex/www changes.

## Non-goals

- No content migration: the deleted landing-page repo left nothing to recover; the site starts fresh.

## Assumptions

- The cultureflare .env operator token carries the write scopes for Pages project create, custom domains, and zone ruleset edit — CF cannot preflight scopes, so a gap surfaces as a 403 mid-run with the dry-run having looked fine.
- The user (Ori) is 'the operator' the brief says to coordinate DNS with — authorization for go-live happens in this session, not via a third party.

## Decisions

- Deploy workflow filename: deploy.yml (resolves v1 — clearer intent than reusing the publish.yml name org must never regrow).
- Issue #4 stays open as the tracking issue after dispatch, carrying a checklist that links every downstream issue (resolves v3).
- Cloudflare Pages project name: agentculture-org (resolves v2); the real *.pages.dev subdomain is still recorded from apply output.
- <www.agentculture.org> is attached as a Pages custom domain alongside the apex (resolves v4).

## Hard questions

- the redirect ruleset is shared, zone-scoped state named 'claudeflare managed redirect' — does editing its expression via the API risk clobbering rules another agent/session manages, and is there a safe idempotent edit path (fetch entrypoint, modify one rule, PUT back)?
