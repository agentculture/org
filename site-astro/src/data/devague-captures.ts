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
