// Content for agentculture.org/agents/devague. Every fact here traces to a
// public artifact: the repo (github.com/agentculture/devague, Apache-2.0),
// PyPI metadata (pypi.org/project/devague), or the installed CLI's own
// output (devague --help, plus scope/deviate/summary/plan --help) — all
// re-verified 2026-07-15 against devague 0.18.0 on PATH. The what's-next
// themes were distilled from the live open-issue list the same day
// (gh issue list, agentculture/devague); each theme links only issues
// verified open at authoring time. Dates live in comments like this one
// (provenance), never in rendered copy.
//
// Captured sessions are a sibling module (./devague-captures.ts): this file
// carries the section copy, that one carries the verbatim transcripts — the
// page imports both and wires them together, same as /agents/lobes.
//
// One deliberate departure from the lobes.ts idiom: section eyebrows and
// headlines live HERE, not in the .astro page. This page is a presentation
// Ori talks over — each headline carries the spoken point, so the headlines
// are copy, and copy lives in the content model.

export interface FactChip {
  label: string;
  value: string;
  href?: string;
}

/** One leg of the six-leg arc: scope → spec → plan → build → deviations → delivery. */
export interface PipelineStage {
  name: string;
  engine: string;
  verbs: string;
  detail: string;
}

/** One move of the announcement-frame method, with the question it answers. */
export interface MethodMove {
  verb: string;
  ask: string;
  detail: string;
}

/** One command of the human review loop and what it guarantees. */
export interface ReviewStep {
  cmd: string;
  effect: string;
}

/** One operator skill and the pipeline leg it drives. */
export interface SkillCard {
  name: string;
  leg: string;
  duty: string;
}

export interface IssueLink {
  number: number;
  title: string;
  url: string;
}

/** A what's-next theme: direction distilled from the open tracker. */
export interface NextTheme {
  name: string;
  direction: string;
  issues: IssueLink[];
}

const devague = {
  hero: {
    title: "devague",
    metaDescription:
      "devague turns a vague feature idea into a buildable spec, a buildable plan, and an accountable delivery — six legs, one small deterministic CLI, and a human confirmation gate at its heart.",
    intro: [
      "Every feature starts as a vague idea, and most tooling rushes it straight to code. devague goes the other way: a small command-line tool that walks the idea backwards — from the announcement you wish you could make, to a spec you can defend, to a plan you can hand to a workforce — and then keeps score while the workforce builds, so what you ship is what you can prove.",
      "Six legs, one deterministic CLI, and a human gate at every point where a machine might otherwise grade its own work. This page is the tour, and the proof.",
    ],
  },

  facts: [
    { label: "install", value: "uv tool install devague" },
    {
      label: "repo",
      value: "agentculture/devague",
      href: "https://github.com/agentculture/devague",
    },
    {
      label: "package",
      value: "devague · PyPI",
      href: "https://pypi.org/project/devague/",
    },
    { label: "license", value: "Apache-2.0" },
  ] satisfies FactChip[],

  // What devague is: the six-leg arc, the deterministic-CLI surprise, and
  // the execution seam where the CLI hands the build to operators.
  pipeline: {
    eyebrow: "the pipeline",
    headline:
      "A vague idea in, an accountable delivery out — and no model in the middle",
    intro: [
      "The arc is six legs: scope the idea, think it backwards into a spec, plan it forwards, fan the plan out to a workforce, stop for every deviation the build forces, then summarize what was actually delivered. Three engines share one CLI — the frame engine works backwards from the announcement, the plan engine works forwards from that spec, and the delivery ledger keeps score from the first departure to the final summary.",
      "Here is the part that surprises people: there is no model inside. devague makes zero LLM calls — it is a small, deterministic, fully unit-tested Python CLI, not an agent, service, or daemon. Its state is plain JSON under .devague/ in the repo you are speccing. Your agent proposes; devague keeps score. That split is the whole design.",
      "And the seam where execution begins is deliberate. The CLI describes the build — plan waves says what can run in parallel, plan deliverables says what exists once every task completes — and there its writ ends. Operators take over at the seam; devague follows the build from the ledger.",
    ],
    stages: [
      {
        name: "idea → scope",
        engine: "the frame engine — before there is a frame",
        verbs: 'scope "<surface>" --finding · --seeds · --list',
        detail:
          "survey the surfaces the idea touches before framing it; each finding lands as first-class state citing what was actually read — provenance, not disclaimers",
      },
      {
        name: "idea → spec",
        engine: "the frame engine",
        verbs: "new · capture · interrogate · park · converge · export",
        detail:
          "works backwards from the announcement, capturing and pressure-testing every claim it makes",
      },
      {
        name: "spec → plan",
        engine: "the plan engine",
        verbs: "plan new · task · accept · depend · cover · amend · converge · export",
        detail:
          "works forwards: tasks that cover every confirmed target, each with acceptance criteria and an honest dependency order — amendable without starting over",
      },
      {
        name: "plan → build",
        engine: "an operator — never the CLI",
        verbs: "plan waves · plan deliverables → parallel fan-out",
        detail:
          "the execution seam: devague describes the dependency waves and the end state, deterministically; an operator performs the fan-out",
      },
      {
        name: "during the build",
        engine: "the delivery ledger",
        verbs: "deviate · --confirm · --reject · --list",
        detail:
          "the moment execution must leave the confirmed plan, the run stops; the approved departure lands as an append-only record — never folded silently into drift",
      },
      {
        name: "after the build",
        engine: "the delivery ledger",
        verbs: "summary · summary --pr",
        detail:
          "planned versus actual, mid-work decisions, classified drift, evidence-backed claims, remaining work — rendered from state alone, on complete, partial, and failed runs",
      },
    ] satisfies PipelineStage[],
  },

  // The announcement-frame method: scope, capture, interrogate, park,
  // converge, export.
  method: {
    eyebrow: "the method",
    headline: "Start from the announcement — pretend it already shipped",
    intro: [
      "When the idea touches an existing codebase, the method opens before the announcement: scope. Survey the surfaces the idea reaches — code, docs, CI, the repos next door — and record each finding with what was actually read, so the frame starts seeded with provenance instead of guesses. It scales with the idea: small ones skip straight to the announcement, and no wizard insists.",
      "The frame itself is called the announcement frame, and it opens with one question: pretend this shipped successfully — what would you announce? Every claim that announcement makes becomes an object devague can track.",
      "You capture claims by kind — who it is for, what changed for them, what you are not promising. You interrogate each one: what must be true for this line to be honest? And when something is genuinely unknown, you do not paper over it — you park it, as first-class vagueness on the record.",
      "Then the gate. converge lists every gap still standing between the frame and a spec, and export refuses to write one until the list is empty. Convergence has to mean something — otherwise the spec is just confident prose.",
    ],
    moves: [
      {
        verb: "scope",
        ask: "what does this idea actually touch?",
        detail:
          "survey the surfaces before framing — findings land on the frame, each citing what was read",
      },
      {
        verb: "new",
        ask: "what are we saying shipped?",
        detail: "start a frame from the announcement",
      },
      {
        verb: "capture",
        ask: "what does the announcement claim?",
        detail:
          "record and classify a claim — audience, after-state, boundary, success signal",
      },
      {
        verb: "interrogate",
        ask: "what must be true for this to be honest?",
        detail: "attach honesty conditions and hard questions to a claim",
      },
      {
        verb: "park",
        ask: "what do we honestly not know yet?",
        detail:
          "record open vagueness as first-class state instead of forcing an answer",
      },
      {
        verb: "converge",
        ask: "is this solid enough to build from?",
        detail: "list every gap still standing between the frame and a spec",
      },
      {
        verb: "export",
        ask: "then, and only then —",
        detail: "write the buildable spec; refused until converge passes",
      },
    ] satisfies MethodMove[],
  },

  // The anti-fabrication rule and the review loop that makes it ergonomic —
  // now extended past the spec into the build, via the deviation ledger.
  reviewLoop: {
    eyebrow: "the human gate",
    headline: "The agent can never confirm its own proposal",
    intro: [
      "devague is built for agent-driven development, and one rule is load-bearing: claims an LLM proposes land as proposed, and they stay proposed until a human confirms them. The agent can propose all day; it cannot confirm its own work. No fabricated rigor.",
      "A rule like that only survives if it is ergonomic, so the loop is three commands. review writes a durable artifact listing every proposal awaiting a decision. You read it, mark each line confirm or reject, and apply it. And confirm is transactional — hand it one bad id and nothing changes at all.",
      "And the rule does not stop at the spec. When a build must leave the confirmed plan, the run stops and the departure lands exactly the way a claim does: proposed if an agent raised it, approved only by you, classified acceptable, risky, or needs-follow-up. It is not a fourth gate — it is the owner of the plan gate amending it, one in-flight decision at a time, on an append-only ledger.",
    ],
    steps: [
      {
        cmd: "devague review",
        effect:
          "writes .devague/reviews/<slug>.md — a durable artifact of every proposal awaiting a human decision",
      },
      {
        cmd: "devague confirm c2 h1 h3",
        effect:
          "transactional — one bad id in the batch and nothing changes at all",
      },
      {
        cmd: "devague confirm --from-review <file>",
        effect: "applies the confirm/reject decisions from an edited review file",
      },
      {
        cmd: "devague reject c3",
        effect:
          "the other half of the gate — a rejected claim stays on the record as rejected, not deleted",
      },
      {
        cmd: 'devague deviate "…" --task t3 --origin llm',
        effect:
          "mid-build, the same rule — an agent-raised deviation lands as proposed, with a reason and a classification, never as approved",
      },
      {
        cmd: "devague deviate --confirm d1",
        effect:
          "user-only, like every confirm — you approve that specific departure, or --reject it; either way it stays on the ledger",
      },
    ] satisfies ReviewStep[],
  },

  // The operator skills around the CLI — one per leg — and the
  // orchestration boundary.
  skills: {
    eyebrow: "the operator skills",
    headline: "devague keeps score; operators make the moves",
    intro: [
      "Around the CLI sit six operator skills — authored in the devague repo, broadcast to the AgentCulture mesh — one per leg: /scope surveys before the frame, /think walks an idea to an exported spec, /spec-to-plan walks that spec to an exported plan, /assign-to-workforce fans the plan out to a parallel workforce, /deviate stops the run when execution must leave the plan, and /summarize-delivery closes the loop.",
      "Note what devague itself never does: orchestrate. devague plan waves only describes the dependency graph — deterministic metadata, nothing more. Spawning agents, managing worktrees, gating merges: that is the operator's job. The tool that keeps score should not also play the game.",
    ],
    cards: [
      {
        name: "/scope",
        leg: "idea → scope",
        duty: "survey the surfaces the idea touches before framing — each finding lands on the frame citing what was actually read",
      },
      {
        name: "/think",
        leg: "idea → spec",
        duty: "drive the frame engine — announce, capture, interrogate, park; export once the frame converges",
      },
      {
        name: "/spec-to-plan",
        leg: "spec → plan",
        duty: "drive the plan engine — tasks that cover every confirmed target, with acceptance criteria and honest dependencies",
      },
      {
        name: "/assign-to-workforce",
        leg: "plan → build",
        duty: "fan the plan's waves out to parallel agents in isolated git worktrees, with TDD-gated merges — the human owns three gates: the spec, the split plan, the final PR",
      },
      {
        name: "/deviate",
        leg: "during the build",
        duty: "stop the run the moment execution must leave the plan; the approved departure lands on the ledger before work resumes",
      },
      {
        name: "/summarize-delivery",
        leg: "after the build",
        duty: "record planned versus actual, mid-work decisions, classified drift, and evidence-backed claims — on complete, partial, and failed runs alike",
      },
    ] satisfies SkillCard[],
  },

  // The dogfood beat. The transcripts themselves live in ./devague-captures.ts
  // — the page renders these paragraphs, then replays those captured sessions.
  captures: {
    eyebrow: "real captures",
    headline: "This page specced itself — twice",
    intro: [
      "The sessions replayed below are not staged, and by now they tell two true stories. The first is the original run — the real frame and plan that specced and planned this very page, announcement to converge to export, then the plan leg through its dependency waves.",
      "The second is this update. When the page had to catch up with the tool, the tool ran its full arc on it: a scope survey before the frame, the convergence gate refusing an incomplete frame live, a user decision landing mid-session, a deviation put on the ledger, and the delivery-summary skeleton closing the loop.",
      "The gate has earned its keep in both. In the first run, reality changed while the frame was open — and claims that were no longer true were rejected and re-captured, on the record. The human gate is real, not ceremony.",
    ],
    provenance:
      "Transcripts are stored verbatim in a data module and replayed as text — the page never runs devague in your browser, and nothing is invented.",
  },

  // Distilled from the live open-issue list of agentculture/devague on
  // 2026-07-15 (gh issue list) — direction, not shipped features. Every
  // issue linked below was open at authoring time; the three themes cover
  // that list completely.
  whatsNext: {
    eyebrow: "what's next",
    headline: "The tracker is public too — this is direction, not a promise",
    intro: [
      "devague is small and moving, and its direction is checkable the same way its facts are: on the open tracker. Three themes stand out in the open issues.",
    ],
    themes: [
      {
        name: "Resolution moves",
        direction:
          "Parking vagueness is first-class; resolving it is not yet. A parked blocking unknown, or a claim's blocking hard question, can deadlock convergence with no CLI verb to release it — today that means hand-editing state. The largest open cluster is about giving resolution the same first-class treatment parking already has.",
        issues: [
          {
            number: 60,
            title:
              "No verb to resolve parked vagueness (or edit task text) — operators hand-edit .devague state JSON",
            url: "https://github.com/agentculture/devague/issues/60",
          },
          {
            number: 57,
            title:
              "no unpark/resolve move: a parked unknown_blocking blocks convergence forever",
            url: "https://github.com/agentculture/devague/issues/57",
          },
          {
            number: 55,
            title:
              "No CLI verb to resolve parked vagueness (blocking vagueness can only be removed by editing frame state)",
            url: "https://github.com/agentculture/devague/issues/55",
          },
          {
            number: 52,
            title:
              "Add a CLI verb to resolve a claim's blocking hard question (convergence deadlock; unblocks /think exports)",
            url: "https://github.com/agentculture/devague/issues/52",
          },
          {
            number: 48,
            title:
              "Add a CLI verb to resolve blocking hard questions (converge is permanently blocked without one)",
            url: "https://github.com/agentculture/devague/issues/48",
          },
          {
            number: 45,
            title:
              "Add a move to reclassify/resolve a parked vagueness (unblocks /think convergence after a dependency is downgraded)",
            url: "https://github.com/agentculture/devague/issues/45",
          },
        ],
      },
      {
        name: "Views that tell the whole truth",
        direction:
          "What devague renders should carry everything its state knows. Today the exported spec still shows resolved hard questions as open and drops non-blocking parks, the think skill's docs point at paths that have since moved, and the plan engine knows waves, width, and per-task detail but shows them one verb at a time instead of one board.",
        issues: [
          {
            number: 49,
            title:
              "export is lossy: shows resolved hard questions as open, drops unknown_nonblocking parks",
            url: "https://github.com/agentculture/devague/issues/49",
          },
          {
            number: 47,
            title:
              "think SKILL.md: After-export step documents stale frame/review paths (.devague/<slug>.json vs .devague/frames/, docs/reviews/ vs .devague/reviews/)",
            url: "https://github.com/agentculture/devague/issues/47",
          },
          {
            number: 36,
            title:
              "devague plan: render a consolidated wave/task board (waves, width, parallel-win, planned model, what-each-task-does)",
            url: "https://github.com/agentculture/devague/issues/36",
          },
        ],
      },
      {
        name: "Skills that travel",
        direction:
          "The operator skills are shipped software now, running on machines their authors do not control — and the open work reads like it: portability to macOS's older bash, interpreters resolved through uv instead of a bare python3, shell-lint findings, a downstream consumer's code review, and aligning the vendored outsource skill with devague's own setup.",
        issues: [
          {
            number: 37,
            title:
              "assign-to-workforce: host-environment portability fixes (macOS bash 3.2 + remove agex/workflow.sh references)",
            url: "https://github.com/agentculture/devague/issues/37",
          },
          {
            number: 41,
            title:
              "assign-to-workforce.sh: resolve the Python interpreter via uv (don't call `python3` bare in split-plan)",
            url: "https://github.com/agentculture/devague/issues/41",
          },
          {
            number: 42,
            title:
              "Shell-lint: fix shelldre S7688/S7679 in assign-to-workforce/think/spec-to-plan scripts",
            url: "https://github.com/agentculture/devague/issues/42",
          },
          {
            number: 40,
            title:
              "Code review findings on operator skills (from a downstream consumer)",
            url: "https://github.com/agentculture/devague/issues/40",
          },
          {
            number: 44,
            title: "Align the vendored outsource skill to devague's setup",
            url: "https://github.com/agentculture/devague/issues/44",
          },
        ],
      },
    ] satisfies NextTheme[],
  },

  closing: {
    paragraphs: [
      "devague is open source, Apache-2.0, and deliberately small — a scorekeeper, not a player. It earned this page the honest way, twice over: the page was specced, planned, and built through the tool it presents, and this very update ran all six legs, scope to delivery summary. Every fact above traces to the public repo, PyPI, the open tracker, or the CLI's own output. Nothing was invented.",
    ],
    repoUrl: "https://github.com/agentculture/devague",
    repoCta: "Read the code",
    pypiUrl: "https://pypi.org/project/devague/",
    pypiCta: "uv tool install devague",
  },
};

export default devague;
