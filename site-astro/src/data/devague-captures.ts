// Real transcripts for /agents/devague — captured 2026-07-14 from an actual
// devague session run against this very repo: the frame leg (/think) and
// the plan leg (/spec-to-plan) that specced and planned this page. Nothing
// here is invented; every "cmd" and "out" line is copied verbatim from the
// terminal, trimmed only for pane length. Where a real run of lines is
// omitted for length, the cut is marked with its own "ellipsis" line — it
// is never folded silently into a kept line, and no kept line is reworded.
// No tokens, no keys, no private URLs: the only identifiers here are this
// frame/plan's own (now-public) claim, honesty, question, risk, and task
// ids, plus repo-relative paths under .devague/ and docs/.
//
// Two devague versions are represented and labeled separately. The
// speccing/planning session itself (panes below through "plan — task,
// converge, waves, export") ran devague 0.17.0. The closing pane is a
// fresh, read-only re-run against the committed .devague/ state on
// devague 0.17.2 — same frame and plan, confirmed still there and, by now,
// converged end to end.
//
// The page REPLAYS these strings. It never re-invokes devague at build or
// view time: every line below was produced by a real run, once, while
// authoring.
//
// A second batch of panes, added later (scopeSurveySeeds,
// frameGateLiveRefusal, deviateLedgerRead, summarySkeletonRead), was captured
// during the very session that scoped, specced, and planned THIS update — the
// six-leg page rewrite — against devague 0.18.0. Same rule applies: verbatim
// lines, trimmed only for pane length, every cut marked with its own
// "ellipsis" line. Two of the four are a live devague /think transcript
// (scope leg, then the gate); the other two are labeled read-only re-runs —
// `devague --version`, `devague deviate --list`, and `devague summary` — run
// for real, once, against this plan's own committed .devague/ state, not
// re-invoked at build time. The deviate ledger read is short because the
// real ledger is empty: no deviation occurred in this run, and the pane says
// exactly that rather than inventing one (see risk r1 on this plan).

export interface CaptureLine {
  /**
   * "cmd" renders with a prompt and types in; "out" fades in as real
   * command output; "ellipsis" is a curator's marker for a run of real
   * lines omitted for pane length — it is not itself a captured line.
   */
  kind: "cmd" | "out" | "ellipsis";
  text: string;
}

export interface CapturePane {
  /** Stable slug for the pane, e.g. "frame-announce-capture". */
  id: string;
  /** Short pane title, shown in the pane header. */
  title: string;
  /** What this pane is a session against — repo and leg, not a machine. */
  context: string;
  /** Capture date, shown in the pane header. */
  capturedDate: string;
  /** devague version the session ran under. */
  devagueVersion: string;
  lines: CaptureLine[];
}

export const capturedOn = "2026-07-14";
/** Version the specccing/planning session itself ran under. */
export const sessionVersion = "0.17.0";
/** Version of the fresh, read-only re-run closing pane. */
export const freshVersion = "0.17.2";

/** Capture date for the second batch: this update's own scope/frame/gate
 * session and its labeled read-only reads. */
export const newLegsCapturedOn = "2026-07-15";
/** devague version the second batch ran under. */
export const newLegsVersion = "0.18.0";

/** Frame leg, part 1: the announcement and the first captured claims. */
export const frameAnnounceCapture: CapturePane = {
  id: "frame-announce-capture",
  title: "frame — announce & capture",
  context: "org repo · frame leg · devague /think",
  capturedDate: capturedOn,
  devagueVersion: sessionVersion,
  lines: [
    {
      kind: "cmd",
      text: 'devague new "agentculture.org/agents/devague is live — a presentation-grade page introducing devague: the CLI that turns a vague idea into a buildable spec, then a buildable plan, by working backwards; the page presents the method (announcement frame, interrogation, convergence, human review loop), the command surface, real captured sessions, and a what\'s-next drawn from its issue tracker — good enough that Ori can present by just showing the page"',
    },
    {
      kind: "out",
      text: "created frame 'agentculture-org-agents-devague-is-live-a-presenta' (announcement = c1)",
    },
    {
      kind: "cmd",
      text: 'devague capture --origin llm --kind audience "A live-presentation audience first: Ori presents and just shows this page while explaining. Secondarily, humans and agents browsing agentculture.org/agents/."',
    },
    { kind: "out", text: "captured c2 (audience, proposed)" },
    {
      kind: "cmd",
      text: 'devague capture --origin llm --kind after_state "agentculture.org/agents/devague presents devague end to end: the idea-to-spec-to-plan pipeline, the announcement-frame method (capture, interrogate, park, converge, export), the human review loop (proposals stay proposed until a human confirms), the deterministic no-LLM CLI, the operator skills (/think, /spec-to-plan, /assign-to-workforce), real captured sessions, and a what\'s-next drawn from the open issue tracker. The /agents/ directory gains a devague card linking to the page."',
    },
    { kind: "out", text: "captured c4 (after_state, proposed)" },
    {
      kind: "ellipsis",
      text: "… (why_it_matters c5, boundary c6 captures elided)",
    },
    {
      kind: "cmd",
      text: 'devague capture --origin llm --kind success_signal "Same measurable floor as /agents/lobes: Lighthouse performance and accessibility >= 95 on the built page, light and dark themes both pass WCAG AA, animations compositor-only honoring prefers-reduced-motion, zero client-side network calls; plus an explicit presentable-as-is preview sign-off from Ori before merge/deploy."',
    },
    { kind: "out", text: "captured c8 (success_signal, proposed)" },
    {
      kind: "cmd",
      text: 'devague capture --origin llm --kind decision "Centerpiece demo is the dogfood loop: the captured session shown on the page is the real devague frame that specced this very page — announcement to converge to export — so the page demonstrates the tool by exhibiting its own origin."',
    },
    { kind: "out", text: "captured c13 (decision, proposed)" },
  ],
};

/**
 * Frame leg, part 2: interrogation, the parked unknown, review — then the
 * mid-session reality shift (the repo went public while this ran) and the
 * confirm/reject split it produced.
 */
export const frameInterrogateReviewShift: CapturePane = {
  id: "frame-interrogate-review-shift",
  title: "frame — interrogate, review & the shift",
  context: "org repo · frame leg · devague /think",
  capturedDate: capturedOn,
  devagueVersion: sessionVersion,
  lines: [
    {
      kind: "cmd",
      text: 'devague interrogate c10 --honesty "Viewed side by side with /agents/ and /agents/lobes in both light and dark themes, the page reads as the same site: same Layout/PageHero/Header/Footer, same tokens and fonts, no new global styles."',
    },
    { kind: "out", text: "interrogated c10: honesty h2" },
    {
      kind: "cmd",
      text: 'devague interrogate c11 --honesty "Motion meets the established bar: compositor-only (transform/opacity), calm easing, 60fps, full prefers-reduced-motion path with a still-presentable static fallback; every replayed session was captured from a real run during authoring — anything not captured live is omitted or clearly marked illustrative."',
    },
    { kind: "out", text: "interrogated c11: honesty h3" },
    {
      kind: "cmd",
      text: "devague question \"The devague repo is private but the package is public on PyPI (devague 0.17.1). Where does the devague card/page point for source: PyPI only, PyPI plus a 'source not yet public' note, or is making agentculture/devague public planned before this ships?\"",
    },
    {
      kind: "out",
      text: "wrote pending decision to .devague/questions/agentculture-org-agents-devague-is-live-a-presenta.md (uncommitted working state)",
    },
    { kind: "out", text: "recorded q1" },
    {
      kind: "cmd",
      text: 'devague park "Exact set of open issues at authoring time — the what\'s-next themes get re-verified against the tracker when the page is written, since issues close and open between now and then." --kind unknown_nonblocking',
    },
    { kind: "out", text: "parked v1 (unknown_nonblocking)" },
    { kind: "cmd", text: "devague review" },
    {
      kind: "out",
      text: "wrote review artifact to .devague/reviews/agentculture-org-agents-devague-is-live-a-presenta.md (unconfirmed, not authoritative)",
    },
    {
      kind: "ellipsis",
      text: "… (mid-session: Ori made the repo public during review)",
    },
    {
      kind: "cmd",
      text: "devague confirm c1 c2 c4 c5 c6 c7 c8 c10 c11 c13 c14 h2 h3 h5 h6",
    },
    { kind: "out", text: "c1 -> confirmed" },
    { kind: "out", text: "c2 -> confirmed" },
    {
      kind: "ellipsis",
      text: "… (c4, c5, c6, c7, c8, c10, c11, c13, c14, h2, h3, h5 also confirmed)",
    },
    { kind: "out", text: "h6 -> confirmed" },
    { kind: "cmd", text: "devague reject c3 c9 c12 h1 h4 h7" },
    { kind: "out", text: "c3 -> rejected" },
    { kind: "out", text: "c9 -> rejected" },
    { kind: "out", text: "c12 -> rejected" },
    { kind: "out", text: "h1 -> rejected" },
    { kind: "out", text: "h4 -> rejected" },
    { kind: "out", text: "h7 -> rejected" },
    {
      kind: "cmd",
      text: 'devague question --resolve q1 --decision "Repo made public (Apache-2.0) on 2026-07-14, ahead of this page; the card and page link GitHub like every other /agents/ entry, with PyPI as the install artifact."',
    },
    { kind: "out", text: "q1 -> resolved" },
    {
      kind: "cmd",
      text: 'devague capture --origin llm --kind before_state "agentculture.org does not mention devague anywhere: no directory entry on /agents/, no page. The repo agentculture/devague went public (Apache-2.0) on 2026-07-14, just ahead of this page; the package is on PyPI as devague 0.17.1."',
    },
    { kind: "out", text: "captured c15 (before_state, proposed)" },
  ],
};

/**
 * The gate: status shows proposed claims still blocking convergence, then
 * the confirm that clears them, converge, and export. This is the
 * proposed-vs-confirmed moment the page's method-arc diagram dramatizes.
 */
export const frameGateConvergeExport: CapturePane = {
  id: "frame-gate-converge-export",
  title: "the gate — status, confirm, converge, export",
  context: "org repo · frame leg · devague /think",
  capturedDate: capturedOn,
  devagueVersion: sessionVersion,
  lines: [
    { kind: "cmd", text: "devague status" },
    {
      kind: "out",
      text: "frame: agentculture-org-agents-devague-is-live-a-presenta    (3 frames total)",
    },
    { kind: "out", text: "convergence: NOT passed — 7 gap(s):" },
    { kind: "out", text: "  - claim c15 still proposed (confirm or reject it)" },
    { kind: "out", text: "  - claim c16 still proposed (confirm or reject it)" },
    {
      kind: "ellipsis",
      text: "… (c17 still proposed; c2, c4, c6 gaps also listed)",
    },
    { kind: "out", text: "  - claim c8 has no confirmed honesty condition" },
    { kind: "out", text: "" },
    { kind: "out", text: "recommended next move (first gap):" },
    {
      kind: "out",
      text: "  this is an LLM proposal — the USER decides: devague confirm c15 (or reject c15)",
    },
    {
      kind: "cmd",
      text: "devague confirm c2 c4 c5 c6 c8 c15 c16 c17 h8 h9 h10 h11 h12 h13 h14",
    },
    { kind: "out", text: "c2 -> confirmed" },
    {
      kind: "ellipsis",
      text: "… (c4, c5, c6, c8, c15, c16, c17, h8 through h13 also confirmed)",
    },
    { kind: "out", text: "h14 -> confirmed" },
    { kind: "cmd", text: "devague converge" },
    { kind: "out", text: "converged ✓" },
    { kind: "cmd", text: "devague export" },
    {
      kind: "out",
      text: "exported spec to docs/specs/2026-07-14-agentculture-org-agents-devague-is-live-a-presenta.md",
    },
  ],
};

/**
 * Plan leg: seeding the plan from the converged frame, one task verbatim
 * (the very task that produced this data module), the risk, confirm,
 * converge, export, and the dependency waves the plan resolves into.
 */
export const planTaskConvergeExport: CapturePane = {
  id: "plan-task-converge-export",
  title: "plan — task, converge, waves, export",
  context: "org repo · plan leg · devague /spec-to-plan",
  capturedDate: capturedOn,
  devagueVersion: sessionVersion,
  lines: [
    {
      kind: "cmd",
      text: "devague plan new --frame agentculture-org-agents-devague-is-live-a-presenta",
    },
    {
      kind: "out",
      text: "created plan 'agentculture-org-agents-devague-is-live-a-presenta' from frame 'agentculture-org-agents-devague-is-live-a-presenta' (22 coverage target(s))",
    },
    {
      kind: "cmd",
      text: 'devague plan task --origin llm "Capture real material: store this frame\'s own devague session transcripts as a typed data module (site-astro/src/data/devague-captures.ts) — the frame leg (new, capture, interrogate, review, confirm, status, converge, export) and the plan leg (plan new, task, cover, converge, waves, export), captured from real runs in this repo" --covers c11 --covers h3 --accept "Every captured line is from a real devague 0.17.1 run of this repo\'s own frame/plan session, stored verbatim (trimmed only for length), labeled with version and date; no secrets or private URLs in the stored file" --accept "Captures include both legs: the frame arc (new to export) and the plan arc (plan new to export), plus a status/converge gate moment showing proposed-vs-confirmed"',
    },
    { kind: "out", text: "added t1 (proposed)" },
    {
      kind: "cmd",
      text: 'devague plan task --origin llm "Assemble the page (site-astro/src/pages/agents/devague.astro): Layout + PageHero + existing tokens and reveal pattern, rendering the content model with the diagram and terminal components in spoken-narrative order, one idea per viewport" --dep t2 --dep t3 --dep t4 --covers c10 --covers h2 --covers h12 --covers h6 --accept "Uses Layout/PageHero/Header/Footer and existing global tokens; no new global styles; builds clean with astro build" --accept "Sections follow the presentation arc top to bottom, one idea per viewport; every after_state element findable in one scroll pass"',
    },
    { kind: "out", text: "added t5 (proposed)" },
    {
      kind: "ellipsis",
      text: "… (tasks t2, t3, t4, t6, t7, t8, t9 added the same way)",
    },
    {
      kind: "cmd",
      text: 'devague plan risk "Deploy is a credentialed operator step (cultureflare) — timing depends on the operator being available after sign-off" --kind unknown_nonblocking --task t9',
    },
    { kind: "out", text: "recorded risk r1 (unknown_nonblocking)" },
    { kind: "cmd", text: "devague plan confirm t1" },
    { kind: "out", text: "t1 -> confirmed" },
    {
      kind: "ellipsis",
      text: "… (plan-level confirm takes one id per call — t2 through t9 confirmed the same way, nine calls in all)",
    },
    { kind: "cmd", text: "devague plan converge" },
    { kind: "out", text: "converged ✓" },
    { kind: "cmd", text: "devague plan export" },
    {
      kind: "out",
      text: "exported plan to docs/plans/2026-07-14-agentculture-org-agents-devague-is-live-a-presenta.md",
    },
    { kind: "cmd", text: "devague plan waves" },
    { kind: "out", text: "wave 0: t1, t2, t3, t6" },
    { kind: "out", text: "wave 1: t4" },
    { kind: "out", text: "wave 2: t5" },
    { kind: "out", text: "wave 3: t7" },
    { kind: "out", text: "wave 4: t8" },
    { kind: "out", text: "wave 5: t9" },
  ],
};

/**
 * Fresh, read-only re-run against the committed .devague/ state in this
 * worktree, on devague 0.17.2 — same frame and plan, now converged. Every
 * line here was run live for this pane, not copied from the session above.
 */
export const freshRecheck: CapturePane = {
  id: "fresh-recheck",
  title: "fresh check — 0.17.2, same repo, today",
  context: "org repo · read-only re-run · devague 0.17.2",
  capturedDate: capturedOn,
  devagueVersion: freshVersion,
  lines: [
    { kind: "cmd", text: "devague --version" },
    { kind: "out", text: "devague 0.17.2" },
    { kind: "cmd", text: "devague list" },
    {
      kind: "out",
      text: "* agentculture-org-agents-devague-is-live-a-presenta",
    },
    {
      kind: "out",
      text: "  agentculture-org-agents-lobes-is-live-a-presentati",
    },
    { kind: "out", text: "  agentculture-org-is-live-the-org-site-is-built-in" },
    { kind: "cmd", text: "devague status" },
    {
      kind: "out",
      text: "frame: agentculture-org-agents-devague-is-live-a-presenta    (3 frames total)",
    },
    { kind: "out", text: "convergence: PASSED ✓" },
    {
      kind: "out",
      text: '  ⚠ claim c15 (before_state) is confirmed but carries no instruction — add one so the exported spec is directly actionable (devague interrogate c15 --instruction "<how to verify or implement>")',
    },
    { kind: "out", text: "next move: devague export   # write the buildable spec" },
    { kind: "cmd", text: "devague plan waves" },
    { kind: "out", text: "wave 0: t1, t2, t3, t6" },
    { kind: "out", text: "wave 1: t4" },
    { kind: "out", text: "wave 2: t5" },
    { kind: "out", text: "wave 3: t7" },
    { kind: "out", text: "wave 4: t8" },
    { kind: "out", text: "wave 5: t9" },
    { kind: "cmd", text: "devague learn" },
    {
      kind: "out",
      text: "devague turns a vague idea into a buildable spec by working backwards.",
    },
    { kind: "out", text: "First question: What's the announcement?" },
    {
      kind: "ellipsis",
      text: "… (the guided-stage walkthrough continues — see `devague learn`)",
    },
  ],
};

/**
 * Scope leg (devague 0.18's new `/scope` verb): the announcement for THIS
 * update, two of its captured claims, three scope entries recording where
 * each claim's finding lives with `--seeds`, and a trimmed read-back of
 * `devague scope --list`. Captured live from this session's own run, before
 * a single honesty condition or confirm — scoping happens ahead of the
 * frame's interrogation loop.
 */
export const scopeSurveySeeds: CapturePane = {
  id: "scope-survey-seeds",
  title: "scope — survey the surfaces, seed the frame",
  context: "org repo · scope leg · devague /scope",
  capturedDate: newLegsCapturedOn,
  devagueVersion: newLegsVersion,
  lines: [
    {
      kind: "cmd",
      text: 'devague new "agentculture.org/agents/devague now presents devague as the complete six-leg method — scope, think, spec-to-plan, assign-to-workforce, deviate, summarize-delivery — as a pure product presentation: the pipeline and method arc carry the execution seam (scope entries on the frame, the deviation ledger, the delivery summary), the operator-skills section shows all six legs, real captured sessions demonstrate the new legs, launch-day meta (public-since dates, dated version chips) is gone, and what\'s-next is re-verified against the live tracker — good enough that Ori presents the product by just showing the page" --title "devague page: six-leg update"',
    },
    {
      kind: "out",
      text: "created frame 'devague-page-six-leg-update' (announcement = c1)",
    },
    {
      kind: "cmd",
      text: 'devague capture --origin llm --kind requirement "Pipeline, diagram, and skills copy reflect the devague 0.18 surface verified against the installed CLI and CHANGELOG: the scope verb (pre-frame scoping recorded on the frame), the deviate verb (append-only deviation ledger under .devague/deliveries/), the summary verb (render-only eight-section skeleton, --pr variant), and plan deliverables/amend."',
    },
    { kind: "out", text: "captured c6 (requirement, proposed)" },
    {
      kind: "cmd",
      text: 'devague capture --origin llm --kind requirement "whatsNext is re-distilled from the live tracker at authoring time (gh issue list on agentculture/devague, 2026-07-15): the resolution-moves cluster (#60, #57, #55, #52, #49, #48, #45) and the consolidated board (#36) remain open; #62, #68, #69, #70 are closed and must not be linked as direction."',
    },
    { kind: "out", text: "captured c15 (requirement, proposed)" },
    {
      kind: "ellipsis",
      text: "… (c2–c5, c7–c14, c16–c18 captures elided)",
    },
    {
      kind: "cmd",
      text: 'devague scope "site-astro/src/data/devague.ts" --finding "carries all page copy: fact chips incl. \'public since 2026-07-14\' and \'version 0.17.2 — 2026-07-14\', the went-public hero paragraph, a 3-stage pipeline, 3 skill cards, and whatsNext linking #62/#68/#69/#70 — all closed by 0.18.0" --seeds c3 c5',
    },
    { kind: "out", text: "recorded s1 (site-astro/src/data/devague.ts)" },
    {
      kind: "cmd",
      text: 'devague scope "devague 0.18.0 (devague --help; ../devague/CHANGELOG.md 0.18.0)" --finding "ships the scope, deviate, and summary verbs plus plan deliverables/amend; docs name the six-leg flow scope→think→spec-to-plan→assign-to-workforce→deviate→summarize-delivery" --seeds c6',
    },
    {
      kind: "out",
      text: "recorded s2 (devague 0.18.0 (devague --help; ../devague/CHANGELOG.md 0.18.0))",
    },
    {
      kind: "cmd",
      text: 'devague scope "site-astro/src/data/devague-captures.ts" --finding "verbatim-replay contract: every line captured from a real run, cuts marked with first-class ellipsis lines, versions and dates carried as pane provenance — new panes must meet the same bar" --seeds c7 c10',
    },
    {
      kind: "out",
      text: "recorded s3 (site-astro/src/data/devague-captures.ts)",
    },
    { kind: "cmd", text: "devague scope --list" },
    {
      kind: "out",
      text: "s1: site-astro/src/data/devague.ts -> carries all page copy: fact chips incl. 'public since 2026-07-14' and 'version 0.17.2 — 2026-07-14', the went-public hero paragraph, a 3-stage pipeline, 3 skill cards, and whatsNext linking #62/#68/#69/#70 — all closed by 0.18.0 [seeds: c3, c5]",
    },
    {
      kind: "out",
      text: "s2: devague 0.18.0 (devague --help; ../devague/CHANGELOG.md 0.18.0) -> ships the scope, deviate, and summary verbs plus plan deliverables/amend; docs name the six-leg flow scope→think→spec-to-plan→assign-to-workforce→deviate→summarize-delivery [seeds: c6]",
    },
    {
      kind: "out",
      text: "s3: site-astro/src/data/devague-captures.ts -> verbatim-replay contract: every line captured from a real run, cuts marked with first-class ellipsis lines, versions and dates carried as pane provenance — new panes must meet the same bar [seeds: c7, c10]",
    },
    {
      kind: "ellipsis",
      text: "… (s4 through s8 — DevagueTerminal.astro, DevagueFlow.astro, the live issue tracker, docs/skill-sources.md, site.ts — cut for length)",
    },
  ],
};

/**
 * The gate, on this same frame: the confirm batch (trimmed), `converge`
 * refusing on six missing honesty conditions, `export` refusing to write
 * with the matching error/hint, then the pivot — a USER-origin capture
 * (`devague capture` with no `--origin llm`) auto-lands `confirmed`, unlike
 * every LLM-origin claim above it that needed an explicit `devague confirm`.
 * That contrast IS the honesty-gate story: Ori, watching live, wrote "Note
 * that I love the animations on page" and "Keep them and add for the new
 * steps" — captured verbatim as c19. The remaining honesty conditions are
 * then confirmed, and the frame converges and exports for real.
 */
export const frameGateLiveRefusal: CapturePane = {
  id: "frame-gate-live-refusal",
  title: "the gate — refuses, Ori decides live, converges",
  context: "org repo · frame leg · devague /think",
  capturedDate: newLegsCapturedOn,
  devagueVersion: newLegsVersion,
  lines: [
    {
      kind: "cmd",
      text: "devague confirm c1 c2 c3 c4 c5 c6 c7 c8 c9 c10 c11 c12 c13 c14 c15 c16 c17 c18 h1 h2 h3 h4 h5 h6 h7 h8",
    },
    { kind: "out", text: "c1 -> confirmed" },
    { kind: "out", text: "c2 -> confirmed" },
    {
      kind: "ellipsis",
      text: "… (c3 through h7 confirmed the same way, 24 more lines)",
    },
    { kind: "out", text: "h8 -> confirmed" },
    { kind: "cmd", text: "devague converge" },
    { kind: "out", text: "not converged:" },
    { kind: "out", text: "  - claim c2 has no confirmed honesty condition" },
    { kind: "out", text: "  - claim c3 has no confirmed honesty condition" },
    {
      kind: "ellipsis",
      text: "… (c8, c9, c11 gaps also listed)",
    },
    { kind: "out", text: "  - claim c12 has no confirmed honesty condition" },
    { kind: "cmd", text: "devague export" },
    {
      kind: "out",
      text: "error: frame has not converged; cannot export",
    },
    {
      kind: "out",
      text: "hint: resolve: claim c2 has no confirmed honesty condition; claim c3 has no confirmed honesty condition; claim c8 has no confirmed honesty condition; claim c9 has no confirmed honesty condition; claim c11 has no confirmed honesty condition; claim c12 has no confirmed honesty condition",
    },
    {
      kind: "cmd",
      text: 'devague capture --kind decision "Ori loves the page\'s animations: every existing animated beat is preserved, and the new steps get their own animated beats — the DevagueFlow arc\'s execution-seam stages animate in the same compositor-only language, and every new capture pane replays with the same typing/settle motion."',
    },
    { kind: "out", text: "captured c19 (decision, confirmed)" },
    { kind: "cmd", text: "devague confirm h9 h10 h11 h12 h13 h14" },
    { kind: "out", text: "h9 -> confirmed" },
    {
      kind: "ellipsis",
      text: "… (h10 through h13 confirmed the same way)",
    },
    { kind: "out", text: "h14 -> confirmed" },
    { kind: "cmd", text: "devague converge" },
    { kind: "out", text: "converged ✓" },
    { kind: "cmd", text: "devague export" },
    {
      kind: "out",
      text: "exported spec to docs/specs/2026-07-14-devague-page-six-leg-update.md",
    },
  ],
};

/**
 * Execution seam, part 1 — a labeled read-only read of this plan's own
 * deviate ledger, run for real in the worktree that carries this task
 * (not replayed from an old session). The ledger is genuinely empty: no
 * deviation happened during this run, and the pane says exactly that
 * instead of inventing one, per the risk this plan itself parked
 * (r1: "if none occurs, the deviate pane is a labeled read-only ledger
 * read"). Short on purpose — honesty over padding.
 */
export const deviateLedgerRead: CapturePane = {
  id: "deviate-ledger-read",
  title: "deviate — the ledger, read live",
  context: "org repo · read-only ledger read · devague 0.18.0",
  capturedDate: newLegsCapturedOn,
  devagueVersion: newLegsVersion,
  lines: [
    { kind: "cmd", text: "devague --version" },
    { kind: "out", text: "devague 0.18.0" },
    { kind: "cmd", text: "devague deviate --list" },
    { kind: "out", text: "no deviations recorded yet" },
  ],
};

/**
 * Execution seam, part 2 — a labeled read-only read of `devague summary`
 * against this plan's own committed state, trimmed to the skeleton's shape:
 * header/intent, the actual-delivery table (fill-in placeholders — nothing
 * here is claimed as delivered), and the honesty mechanism in the
 * mid-work/drift sections refusing to backfill a deviation that never
 * happened.
 */
export const summarySkeletonRead: CapturePane = {
  id: "summary-skeleton-read",
  title: "summary — the skeleton, read live",
  context: "org repo · read-only summary read · devague 0.18.0",
  capturedDate: newLegsCapturedOn,
  devagueVersion: newLegsVersion,
  lines: [
    { kind: "cmd", text: "devague summary" },
    {
      kind: "out",
      text: "# Delivery Summary — devague page: six-leg update",
    },
    {
      kind: "out",
      text: "plan: `devague-page-six-leg-update` · run: `<complete | partial | failed>` · date: `2026-07-14`",
    },
    {
      kind: "out",
      text: "baseline: `devague plan (devague-page-six-leg-update)`",
    },
    { kind: "out", text: "## Intent" },
    {
      kind: "out",
      text: "> agentculture.org/agents/devague now presents devague as the complete six-leg method — scope, think, spec-to-plan, assign-to-workforce, deviate, summarize-delivery — as a pure product presentation: the pipeline and method arc carry the execution seam (scope entries on the frame, the deviation ledger, the delivery summary), the operator-skills section shows all six legs, real captured sessions demonstrate the new legs, launch-day meta (public-since dates, dated version chips) is gone, and what's-next is re-verified against the live tracker — good enough that Ori presents the product by just showing the page",
    },
    {
      kind: "ellipsis",
      text: "… (## After, ## Planned Work — t1 through t7 — elided)",
    },
    { kind: "out", text: "## Actual Delivery" },
    {
      kind: "out",
      text: "| Plan task | Status | What actually landed |",
    },
    {
      kind: "ellipsis",
      text: "… (rows `t1` through `t7`, each `<fill: status>` / `<fill: what landed>`, elided)",
    },
    { kind: "out", text: "## Mid-work Decisions" },
    { kind: "out", text: "(no deviations recorded yet)" },
    { kind: "out", text: "## Drift From Plan" },
    {
      kind: "out",
      text: "no approved deviation records yet — record drift via `devague deviate` before this section can be filled in",
    },
    {
      kind: "ellipsis",
      text: "… (## Evidence, ## Delivery Claims sections — all `<fill: ...>` placeholders — elided)",
    },
    { kind: "out", text: "## Remaining Work / Follow-up" },
    {
      kind: "out",
      text: "- `<fill: remaining item>` — `<fill: next step / owner>`",
    },
  ],
};
