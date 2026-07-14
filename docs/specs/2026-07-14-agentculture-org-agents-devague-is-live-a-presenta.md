# agentculture.org/agents/devague is live — a presentation-grade page introducing devague: the CLI that turns a vague idea into a buildable spec, then a buildable plan, by working backwards; the page presents the method (announcement frame, interrogation, convergence, human review loop), the command surface, real captured sessions, and a what's-next drawn from its issue tracker — good enough that Ori can present by just showing the page

> agentculture.org/agents/devague is live — a presentation-grade page introducing devague: the CLI that turns a vague idea into a buildable spec, then a buildable plan, by working backwards; the page presents the method (announcement frame, interrogation, convergence, human review loop), the command surface, real captured sessions, and a what's-next drawn from its issue tracker — good enough that Ori can present by just showing the page
> instruction: Build as site-astro/src/pages/agents/devague.astro plus a devague card in the /agents/ directory (site.ts); deploy through the established operator lane only after the preview sign-off.

## Audience

- A live-presentation audience first: Ori presents and just shows this page while explaining. Secondarily, humans and agents browsing agentculture.org/agents/.
  - instruction: Write section headlines so each carries the spoken point; validate with a dry-run read-through in presentation order before preview hand-off.

## Before → After

- Before: agentculture.org does not mention devague anywhere: no directory entry on /agents/, no page. The repo agentculture/devague went public (Apache-2.0) on 2026-07-14, just ahead of this page; the package is on PyPI as devague 0.17.1.
- After: agentculture.org/agents/devague presents devague end to end: the idea-to-spec-to-plan pipeline, the announcement-frame method (capture, interrogate, park, converge, export), the human review loop (proposals stay proposed until a human confirms), the deterministic no-LLM CLI, the operator skills (/think, /spec-to-plan, /assign-to-workforce), real captured sessions, and a what's-next drawn from the open issue tracker. The /agents/ directory gains a devague card linking to the page.
  - instruction: Structure the page as sections in spoken order: what devague is (idea-to-spec-to-plan), the method (frame arc), the human review loop, the operator skills, real captured sessions, what's-next; add the devague card to site.ts under Developer tooling.

## Why it matters

- The page doubles as the presentation deck: good enough that Ori presents live by just showing this page — no slides, no second tab.
  - instruction: Dry-run the talk against the preview: give the explanation with only the page on screen; any point that needs a second tab becomes a page fix.

## Requirements

- Keep the existing site styling: the page uses Layout/PageHero, the established tokens, fonts, reveal animations, and light+dark themes — side by side with /agents/ and /agents/lobes it reads as the same site.
  - instruction: Build using Layout + PageHero + existing tokens; verify side by side with /agents/lobes in both themes before preview hand-off.
  - honesty: Viewed side by side with /agents/ and /agents/lobes in both light and dark themes, the page reads as the same site: same Layout/PageHero/Header/Footer, same tokens and fonts, no new global styles.
- Live, moving examples: animated terminal panes replaying real captured devague sessions — the frame leg (new / capture / interrogate / review / confirm / converge / export) and the plan leg (plan new / task / cover / converge / export) — with the site's calm motion language.
  - instruction: Animations transform/opacity-only with IntersectionObserver reveals in the existing pattern; capture real sessions during authoring (this frame's own transcript qualifies) and replay as typed/streamed terminal panes; ship the reduced-motion still-frame path.
  - honesty: Motion meets the established bar: compositor-only (transform/opacity), calm easing, 60fps, full prefers-reduced-motion path with a still-presentable static fallback; every replayed session was captured from a real run during authoring — anything not captured live is omitted or clearly marked illustrative.
- Every fact on the page is checkable against a public artifact: the now-public repo agentculture/devague (Apache-2.0), PyPI metadata (devague, uv tool install devague), and the installed CLI's own output (devague learn / explain / status --json / --help) — same checkability convention as site.ts. The card and page link GitHub like every other /agents/ entry.
  - instruction: Author facts against the devague README/docs plus captured CLI output; cross-check each fact (package name, version, verbs, engine split, review-loop behavior, license) against the repo and a real devague run before merge.
  - honesty: Every fact shown traces to the public repo, PyPI, or the installed CLI's own output — any reader can verify the entire page without special access.
- A what's-next section grounded in the open issue tracker (now public), presented as direction not shipped features, with linkable issues: (1) resolution moves — no CLI verb yet resolves parked vagueness or blocking hard questions, the tracker's top deadlock theme; (2) a consolidated plan/wave board with a deliverables view; (3) deepening the delivery-closure leg — summarize-delivery shipped in 0.17.0, capturing decisions and plan drift remains open.
  - instruction: Re-pull the open issue list at authoring time; distill into 2-4 named themes; now that the tracker is public, each theme links its issues on GitHub.
  - honesty: Every what's-next theme traces to at least one open issue in agentculture/devague at authoring time, linked on the page; themes read as direction, not shipped features.

## Honesty conditions

- The page is reachable at agentculture.org/agents/devague in production, deployed through the established operator lane, only after the presentable-as-is preview sign-off.
- The page assumes no prior devague knowledge: a first-time viewer can state what devague is and what the converge gate does after one scroll pass.
- Every element named in the after_state is present and findable in one scroll pass: pipeline, method arc, review loop, deterministic CLI, operator skills, real captures, what's-next — and the /agents/ card links to the page.
- The page reads as a presentation arc: sections in spoken-narrative order, one idea per viewport; dry-run test — the page alone suffices to give the talk, each section headline carries the spoken point.
- The PR diff touches only the new page files, new data files, the /agents/ directory card, and the mandatory version-bump/changelog — no other page's rendered output changes; zero commits to the devague repo.
- Verified by running Lighthouse on the built page in both themes and recording the scores in the PR; the network panel on the published page shows zero client-side API calls.
- Checkable today: grep of site-astro/src finds no occurrence of 'devague'; the GitHub API reports agentculture/devague public with license apache-2.0; PyPI serves devague 0.17.1.

## Success signals

- Same measurable floor as /agents/lobes: Lighthouse performance and accessibility >= 95 on the built page, light and dark themes both pass WCAG AA, animations compositor-only honoring prefers-reduced-motion, zero client-side network calls; plus an explicit presentable-as-is preview sign-off from Ori before merge/deploy.
  - instruction: Run Lighthouse against the built page in both themes before preview hand-off; record scores in the PR; audit the network panel for zero API calls.

## Scope / boundaries

- One new page plus a new devague card in the /agents/ directory; no redesign of the rest of the site; shipping requires zero commits to the devague repo itself.
  - instruction: Keep the diff to site-astro/src/pages/agents/devague.astro, new data files under site-astro/src/data/, the site.ts card entry, and version-bump/changelog files.

## Non-goals

- Not an install/tutorial doc mirroring the README — 'devague learn' and the README stay the reference; the page tells the story (what devague is, why the method works, where it is heading).

## Assumptions

- devague 0.17.1 is the current public release on PyPI at build time; page facts pin to it (or to whatever release is current when the page is authored).

## Decisions

- Centerpiece demo is the dogfood loop: the captured session shown on the page is the real devague frame that specced this very page — announcement to converge to export — so the page demonstrates the tool by exhibiting its own origin.
