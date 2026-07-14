// Content for agentculture.org/agents/devague. Every fact here traces to a
// public artifact: the repo (github.com/agentculture/devague — public since
// 2026-07-14, Apache-2.0), PyPI metadata (devague 0.17.2, uploaded
// 2026-07-14), or the installed CLI's own output (devague --help,
// devague plan --help, devague learn) — all re-verified 2026-07-14 against
// devague 0.17.2 on PATH. The what's-next themes were distilled from the
// live open-issue list the same day; each theme links its issues.
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

/** One leg of the idea → spec → plan → build pipeline. */
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
      "devague turns a vague feature idea into a buildable spec, then a buildable plan, by working backwards — a small, deterministic CLI with a human confirmation gate at its heart.",
    intro: [
      "Every feature starts as a vague idea, and most tooling rushes it straight to code. devague goes the other way: a small command-line tool that walks the idea backwards — from the announcement you wish you could make, to a spec you can defend, to a plan you can hand to a workforce.",
      "Until today, this site never mentioned it. The repo went public under Apache-2.0 on 2026-07-14 — the same day this page was specced, with devague. This page is the tour, and the proof.",
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
    { label: "version", value: "0.17.2 — 2026-07-14" },
    { label: "license", value: "Apache-2.0" },
    { label: "public since", value: "2026-07-14" },
  ] satisfies FactChip[],

  // What devague is: the pipeline, and the deterministic-CLI surprise.
  pipeline: {
    eyebrow: "the pipeline",
    headline: "A vague idea in, a buildable plan out — and no model in the middle",
    intro: [
      "The shape is one line: vague idea → buildable spec → buildable plan → build. Two engines share one CLI — the frame engine works backwards from the announcement to a spec, and the plan engine works forwards from that spec to a plan whose tasks cover every confirmed claim.",
      "Here is the part that surprises people: there is no model inside. devague makes zero LLM calls — it is a small, deterministic, fully unit-tested Python CLI, not an agent, service, or daemon. Its state is plain JSON under .devague/ in the repo you are speccing. Your agent proposes; devague keeps score. That split is the whole design.",
    ],
    stages: [
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
        verbs: "plan new · task · accept · depend · cover · converge · export",
        detail:
          "works forwards: tasks that cover every confirmed target, each with acceptance criteria and an honest dependency order",
      },
      {
        name: "plan → build",
        engine: "an operator — never the CLI",
        verbs: "plan waves → parallel fan-out",
        detail:
          "devague only describes the dependency waves, deterministically; an operator performs the fan-out",
      },
    ] satisfies PipelineStage[],
  },

  // The announcement-frame method: capture, interrogate, park, converge, export.
  method: {
    eyebrow: "the method",
    headline: "Start from the announcement — pretend it already shipped",
    intro: [
      "The method is called the announcement frame, and it opens with one question: pretend this shipped successfully — what would you announce? Every claim that announcement makes becomes an object devague can track.",
      "You capture claims by kind — who it is for, what changed for them, what you are not promising. You interrogate each one: what must be true for this line to be honest? And when something is genuinely unknown, you do not paper over it — you park it, as first-class vagueness on the record.",
      "Then the gate. converge lists every gap still standing between the frame and a spec, and export refuses to write one until the list is empty. Convergence has to mean something — otherwise the spec is just confident prose.",
    ],
    moves: [
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

  // The anti-fabrication rule and the review loop that makes it ergonomic.
  reviewLoop: {
    eyebrow: "the human gate",
    headline: "The agent can never confirm its own proposal",
    intro: [
      "devague is built for agent-driven development, and one rule is load-bearing: claims an LLM proposes land as proposed, and they stay proposed until a human confirms them. The agent can propose all day; it cannot confirm its own work. No fabricated rigor.",
      "A rule like that only survives if it is ergonomic, so the loop is three commands. review writes a durable artifact listing every proposal awaiting a decision. You read it, mark each line confirm or reject, and apply it. And confirm is transactional — hand it one bad id and nothing changes at all.",
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
    ] satisfies ReviewStep[],
  },

  // The operator skills around the CLI — and the orchestration boundary.
  skills: {
    eyebrow: "the operator skills",
    headline: "devague keeps score; operators make the moves",
    intro: [
      "Around the CLI sits a set of operator skills — authored in the devague repo, broadcast by steward to the AgentCulture mesh — that drive it end to end: /think walks an idea to an exported spec, /spec-to-plan walks that spec to an exported plan, and /assign-to-workforce fans a converged plan out to parallel agents.",
      "Note what devague itself never does: orchestrate. devague plan waves only describes the dependency graph — deterministic metadata, nothing more. Spawning agents, managing worktrees, gating merges: that is the operator's job. The tool that keeps score should not also play the game.",
    ],
    cards: [
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
        duty: "fan the plan's waves out to parallel agents in isolated git worktrees, with TDD-gated merges",
      },
    ] satisfies SkillCard[],
  },

  // The dogfood beat. The transcripts themselves live in ./devague-captures.ts
  // — the page renders these paragraphs, then replays those captured sessions.
  captures: {
    eyebrow: "real captures",
    headline: "This page specced itself — watch its own frame run",
    intro: [
      "The sessions replayed below are not staged. They are captures from the real devague frame and plan that specced and planned this very page, on 2026-07-14 — announcement to converge to export, then the plan leg through its dependency waves.",
      "And the gate earned its keep mid-session. While the frame was open, the repo went public — and three claims premised on “the repo is private” were suddenly false. They were rejected and re-captured against the new reality, on the record. The human gate is real, not ceremony.",
    ],
    provenance:
      "Transcripts are stored verbatim in a data module and replayed as text — the page never runs devague in your browser, and nothing is invented.",
  },

  // Distilled from the live open-issue list of agentculture/devague on
  // 2026-07-14 — direction, not shipped features. Every issue linked below
  // was open at authoring time.
  whatsNext: {
    eyebrow: "what's next",
    headline: "The tracker is public too — this is direction, not a promise",
    intro: [
      "devague is at 0.17.2 and moving. Now that the tracker is public, the direction is checkable the same way the facts are — three themes stand out in the open issues.",
    ],
    themes: [
      {
        name: "Resolution moves",
        direction:
          "Parking vagueness is first-class; resolving it is not yet. A parked blocking unknown, or a blocking hard question, can deadlock convergence with no CLI verb to release it — today that means hand-editing state. The largest open cluster is about giving resolution the same first-class treatment parking already has.",
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
            number: 52,
            title:
              "Add a CLI verb to resolve a claim's blocking hard question (convergence deadlock; unblocks /think exports)",
            url: "https://github.com/agentculture/devague/issues/52",
          },
          {
            number: 68,
            title:
              "no way to remove a task dependency — rejecting a task strands its dependents and forces recreation",
            url: "https://github.com/agentculture/devague/issues/68",
          },
        ],
      },
      {
        name: "A board you can read",
        direction:
          "The plan engine knows waves, dependencies, coverage, and per-task detail — but shows them one verb at a time. The direction is a consolidated wave/task board, and a “what do we have in the end?” deliverables view at the plan-to-workforce seam.",
        issues: [
          {
            number: 36,
            title:
              "devague plan: render a consolidated wave/task board (waves, width, parallel-win, planned model, what-each-task-does)",
            url: "https://github.com/agentculture/devague/issues/36",
          },
          {
            number: 70,
            title:
              "Add a 'what do we have in the end?' deliverables view at the plan/assign-to-workforce seam",
            url: "https://github.com/agentculture/devague/issues/70",
          },
          {
            number: 69,
            title:
              "assign-to-workforce: split-plan should render one table — wave, task, model, task summary",
            url: "https://github.com/agentculture/devague/issues/69",
          },
        ],
      },
      {
        name: "Closing the delivery loop",
        direction:
          "The pipeline now has a fifth leg: summarize-delivery, shipped in 0.17.0 as a method-only skill that turns an execution run into an accountability artifact — planned versus actual, mid-work decisions, plan drift. Deepening that leg, so decisions and drift are captured as durably as claims are, is open direction.",
        issues: [
          {
            number: 62,
            title:
              "Add summary skill to capture delivery, decisions, and plan drift",
            url: "https://github.com/agentculture/devague/issues/62",
          },
        ],
      },
    ] satisfies NextTheme[],
  },

  closing: {
    paragraphs: [
      "devague is open source, Apache-2.0, and deliberately small — a scorekeeper, not a player. It earned this page the honest way: the page was specced, planned, and built through the tool it presents, and every fact above traces to the public repo, PyPI, or the CLI's own output. Nothing was invented.",
    ],
    repoUrl: "https://github.com/agentculture/devague",
    repoCta: "Read the code",
    pypiUrl: "https://pypi.org/project/devague/",
    pypiCta: "uv tool install devague",
  },
};

export default devague;
