// Content for agentculture.org/agents/colleague. Every fact here traces to a
// public artifact: the colleague repo (github.com/agentculture/colleague,
// Apache-2.0 — README.md, CLAUDE.md, docs/features/*), PyPI metadata
// (pypi.org/project/colleague, serving colleague 1.48.0), or the installed
// CLI's own output (colleague --help, tui --help, work --help, flight --help,
// roles list --json) — all re-verified 2026-07-16 against colleague 1.48.0 on
// PATH. The what's-next themes were distilled from the live open-issue list
// the same day (gh issue list, agentculture/colleague); each theme links only
// issues verified open at authoring time. Dates live in comments like this
// one (provenance), never in rendered copy.
//
// Captured sessions are a sibling module (./colleague-captures.ts): this file
// carries the section copy, that one carries the verbatim transcripts — the
// page imports both and wires them together, same as /agents/devague.
//
// Same idiom as devague.ts: section eyebrows and headlines live HERE, not in
// the .astro page. This page is a presentation Ori talks over — each headline
// carries the spoken point, so the headlines are copy, and copy lives in the
// content model.

export interface FactChip {
  label: string;
  value: string;
  href?: string;
}

/** One pillar of the one-runtime-many-minds paradigm. */
export interface ParadigmCard {
  name: string;
  detail: string;
}

/** One render tier of the single CockpitState, and who it is for. */
export interface TierCard {
  name: string;
  surface: string;
  commands: string;
  detail: string;
}

/** One stage of the work loop: contract → isolation → loop → gates → handoff → piloting. */
export interface WorkCard {
  name: string;
  verbs: string;
  detail: string;
}

/** One built-in subagent role — rendered from the LIVE `roles list --json` output. */
export interface RoleRow {
  name: string;
  readOnly: boolean;
  tools: string;
  use: string;
}

/** One of colleague's two minds (plus the gateway that resolves them). */
export interface MindCard {
  name: string;
  role: string;
  detail: string;
}

/** One leg of the measured warm-vs-cold memory pair (run ids are the provenance). */
export interface MemoryLeg {
  leg: string;
  workItem: string;
  steps: number;
  modelTurns: number;
  tokens: string;
  duration: string;
}

/** A compact card for the remaining surfaces — each honest about its limits. */
export interface SurfaceCard {
  name: string;
  detail: string;
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

const colleague = {
  hero: {
    title: "colleague",
    metaDescription:
      "colleague is a swappable coder-agent harness — one runtime, many minds. A headless task runtime that turns different model backends into repo workers behind one shared typed contract, with three render tiers, a typed subagent workforce, role-resolved minds, and eidetic memory.",
    intro: [
      // README.md:3-6 ("swappable coder-agent harness … One runtime, many
      // minds.") and README.md:8-14 (the harness around the model, the same
      // typed result every time).
      "colleague is a swappable coder-agent harness that turns different model backends into repo workers behind one shared task runtime — one runtime, many minds. It is the harness around the model, not the model: you point it at a repo task, pick a backend, and it runs the work through that backend's bounded tool-loop and hands back the same typed result every time.",
      // README.md:41-45 (diversity — a second mind, not a stronger model — is
      // the point) and README.md:55-58 (not a chat assistant, not an IDE
      // plugin; a headless task runtime you can script, gate, and audit).
      "The point is not a stronger model — it is a different, independent mind, and that diversity is the value. Think of the colleague at the next desk: a peer you hand scoped work to, not a tool you type into. It is explicitly not a chat assistant and not an IDE plugin — it is a headless task runtime you can script, gate, and audit.",
    ],
  },

  // Chips re-verified 2026-07-16: PyPI JSON reports colleague 1.48.0,
  // Apache-2.0, requires-python >=3.12; pyproject.toml [project.scripts]
  // declares `colleague` and `clg`; dependencies = ["agentfront>=0.20.0"] is
  // the ONE base dep (pyproject.toml:16-27); `clg --version` prints 1.48.0.
  facts: [
    { label: "install", value: "uv tool install colleague" },
    {
      label: "repo",
      value: "agentculture/colleague",
      href: "https://github.com/agentculture/colleague",
    },
    {
      label: "package",
      value: "colleague · PyPI",
      href: "https://pypi.org/project/colleague/",
    },
    { label: "license", value: "Apache-2.0" },
    { label: "python", value: ">=3.12" },
    { label: "entry points", value: "colleague · clg" },
    { label: "base deps", value: "one — agentfront" },
  ] satisfies FactChip[],

  // The paradigm: one runtime, many minds — and the division of labor that
  // motivates it.
  paradigm: {
    eyebrow: "the paradigm",
    headline: "One runtime, many minds — swap the backend and nothing else changes",
    intro: [
      // README.md:8-14, near-verbatim: the problem statement and the harness
      // answer.
      "AI coder backends are not interchangeable — a local vLLM model, an OpenAI-compatible endpoint, and a hosted assistant each bring their own SDK, controls, and output shape. colleague is the harness around the model: the same work command runs the task through whichever backend you pick, and the caller never has to care which mind ran it.",
      // README.md:100-108 (the two shipped engines) and README.md:12-14,
      // 38-40 (same typed TaskResult back from both).
      "Two engines ship today. mock is deterministic and networkless — the CI workhorse, so you can see the shape of a task with no model and no network at all. vllm-openai drives any OpenAI-compatible endpoint with tool calling. Swap one for the other and nothing else about your workflow changes: the same command, the same typed TaskResult.",
      // CLAUDE.md:328 — the repo's own bolded division-of-labor line — and
      // README.md:41-45 for the diversity thesis it rests on.
      "And this is how it actually runs at home: Claude thinks and designs; colleague does the field-work. Not a stronger mind taking over — a different mind at the next desk, catching what the author's mind glides past.",
    ],
    cards: [
      {
        // README.md:10-14.
        name: "the harness, not the model",
        detail:
          "colleague wraps whatever mind you point it at — the same task in, the same typed result out, whichever backend runs underneath",
      },
      {
        // README.md:103 ("deterministic and networkless; the CI workhorse")
        // and README.md:18-20 (see the shape of a task before wiring a model).
        name: "mock — the CI workhorse",
        detail:
          "deterministic and networkless: runs the full loop with no model and no network, so the shape of a task is testable before any real mind is wired up",
      },
      {
        // README.md:104-107 and work-and-loop.md:165-167 (retargeting is a
        // config change, never a code change).
        name: "vllm-openai — any compatible endpoint",
        detail:
          "drives any OpenAI-compatible chat endpoint with tool calling; pointing it at a different server is a config change, never a code change",
      },
      {
        // CLAUDE.md:328-331.
        name: "the field-work split",
        detail:
          "Claude thinks and designs; colleague does the field-work — mechanical sweeps, scoped edits, and second opinions, taken off the designing mind's plate",
      },
    ] satisfies ParadigmCard[],
  },

  // Three render tiers of ONE CockpitState, chosen automatically.
  // tier-visibility.md:12-16 (one shared state, never recomputed
  // per-renderer), session.md:48-58 (the three tiers), tui.md:24-30 (TAUI).
  tiers: {
    eyebrow: "three tiers",
    headline:
      "One cockpit state, three renders — and it picks the right one for whoever is looking",
    intro: [
      // tier-visibility.md:12-16; session.md:48-58; tui.md:32-44 (the pure
      // reducer).
      "Everything colleague shows is one CockpitState — a pure-reducer state tree — rendered through three tiers, and the right tier is chosen automatically for whoever is looking: a human at a terminal, an agent without a screen, a bot that wants only JSON. Nothing is recomputed per renderer; the three views cannot drift apart because there is only one state.",
      // tui.md:24-30 — the TAUI definition, near-verbatim.
      "The middle tier is the unusual one. TAUI — Textual Agentic UI — is the semantic mirror of the live cockpit: a serialised, selector-addressed JSON tree plus a Markdown render, so an agent can read and drive the same UI a human sees without a screen reader and without spending an LLM call on a screenshot.",
      // tui.md:6-22 (the #249 migration to agentfront.taui — imported, not
      // duplicated) and pyproject.toml:16-27 (agentfront as the one base dep).
      "And the cockpit is not colleague's private invention. It is imported from agentfront.taui — agentfront being colleague's one base dependency, the shared agent-first foundation built to fit humans, agents, and bots at once.",
    ],
    cards: [
      {
        // README.md:503-507 (bare `colleague` opens the cockpit at a
        // terminal); session.md:52-54; `colleague tui --help` pins `tui live`
        // (verified 2026-07-16, colleague 1.48.0).
        name: "human",
        surface: "the ANSI cockpit",
        commands: "colleague · colleague session · colleague tui live",
        detail:
          "a dynamic colour cockpit on a TTY — redraw-in-place, with popups on real events, like an error popup when a work step fails",
      },
      {
        // tui.md:24-30; both commands pinned by `colleague tui --help`
        // (verified 2026-07-16).
        name: "agent",
        surface: "TAUI — Textual Agentic UI",
        commands: "colleague tui state · colleague tui render --format markdown",
        detail:
          "the serialised, selector-addressed JSON mirror plus a Markdown render — an agent reads and operates the cockpit without a screen reader or an LLM call",
      },
      {
        // README.md:928 (--json on every verb); session.md:56-58 (one
        // TaskResult on stdout, chrome to stderr); README.md:110 (the
        // .colleague/<id>.json artifact); tui.md / work --help (--tui-events
        // WorkStep JSONL); cli-on-agentfront.md:102 (`colleague mcp serve`).
        name: "bot",
        surface: "structured JSON",
        commands: "--json on every verb · .colleague/<id>.json · colleague mcp serve",
        detail:
          "stdout carries exactly one TaskResult and chrome goes to stderr; every run writes a JSON artifact and can stream WorkStep JSONL, so nothing needs a screen at all",
      },
    ] satisfies TierCard[],
  },

  // The work loop: contract → isolation → bounded loop → gates → handoff →
  // piloting. Sources per card below.
  work: {
    eyebrow: "the work loop",
    headline: "You hand it a goal; it hands you a branch — and your tree is never touched",
    intro: [
      // work-and-loop.md:6-18 — the typed contract and why uniformity is the
      // point.
      "colleague work is the working surface: hand it a goal, and every engine consumes the same typed Task and produces the same typed TaskResult. That uniformity is the whole point — the caller assigns repo work without caring which engine executed it, and the result round-trips through JSON unchanged.",
      // write-isolation.md:1-11 (throwaway worktree at HEAD on
      // colleague/<id>; the operator tree never touched) and
      // write-isolation.md:35-40 (the #149 dirty-tree guard).
      "It never works in your tree. Every run gets a throwaway git worktree at your HEAD on its own colleague/<id> branch — your working tree and checked-out branch are never touched, even if the model commits mid-run. And if your tree is dirty, colleague refuses to start until you acknowledge it: delegating never silently sweeps your uncommitted work.",
      // work-and-loop.md:52-77 (seven base tools + curated optional tools)
      // and work-and-loop.md:97-102 (guaranteed termination, max_steps
      // default 25).
      "The loop itself is bounded, not open-ended. The model is offered seven base tools plus a curated set of optional ones, and every path out of the loop is one of three: the model signals finish, it answers in prose, or it hits the step budget. Termination is guaranteed, not hoped for.",
      // lint-gate.md:1-14, test-integrity.md:1-15, affected-tests.md:1-15
      // (default-ON, advisory, never wedging) and handoff.md:6-9
      // (branch → commit → push → PR).
      "Before the handoff, three gates run by default — lint autofix, test-integrity, affected tests — and all three are advisory: they surface findings on stderr and in the artifact, and they never wedge the run. Then the work lands the way work should land: branch, commit, push, pull request.",
      // flight.md:1-40 (the file-based control plane; cooperative next-turn
      // latency), background.md, indefinite-run.md, and `colleague work
      // --help` (--background, --until-done, --max-episodes, --continue —
      // verified 2026-07-16).
      "And a run is not a black box while it flies. Every run arms a flight — you can read its live feed, inject guidance, or stop it cooperatively, all over a file-based control plane that lands directives at the next turn boundary. Runs detach to the background, chain episodes until the task is done, and resume where they left off.",
    ],
    cards: [
      {
        // work-and-loop.md:13-19.
        name: "typed contract",
        verbs: 'colleague work "<goal>" --repo .',
        detail:
          "one Task in, one TaskResult out — the same shape for every engine, round-tripping through JSON unchanged",
      },
      {
        // write-isolation.md:1-11, 35-40.
        name: "write isolation",
        verbs: "a throwaway worktree on colleague/<id>",
        detail:
          "runs at your HEAD in its own worktree and branch; a dirty tree is refused, not swept — your checkout is never touched",
      },
      {
        // work-and-loop.md:52-64 (the seven base tools) and 97-102
        // (termination; max_steps default 25).
        name: "the bounded loop",
        verbs: "read_file · write_file · edit_file · list_dir · run_command · culture · finish",
        detail:
          "seven base tools plus curated optional ones; termination is guaranteed — finish, a prose turn, or the step budget (default 25)",
      },
      {
        // lint-gate.md, test-integrity.md, affected-tests.md — all three
        // "run on every work item by default" and are non-blocking.
        name: "pre-finish gates",
        verbs: "lint autofix · test-integrity · affected-tests",
        detail:
          "default-ON and advisory: auto-fix what lint can, flag tests that merely mirror the implementation, run the tests that import the changed modules — findings surface, the run never wedges",
      },
      {
        // handoff.md:6-9 and README.md:108-109 (gated so offline/CI never
        // pushes).
        name: "handoff",
        verbs: "branch → commit → push → PR",
        detail:
          "the work lands as a reviewable branch; push and PR are gated so offline and CI runs never reach the network",
      },
      {
        // flight.md:23-40 (verbs + cooperative control), background.md,
        // indefinite-run.md; flags verified against work --help 2026-07-16.
        name: "piloting",
        verbs: "flight status · guide · stop — plus --background · --until-done · --continue",
        detail:
          "a file-based control plane with cooperative next-turn latency; detach a run, chain episodes with --until-done / --max-episodes, resume with --continue",
      },
    ] satisfies WorkCard[],
  },

  // Subagents + the typed workforce. README.md:723-749 (the subagent /
  // subagents tools, sub/<id> worktrees, merge-subagent, depth 2 / fanout 4);
  // subagent-roles.md (the five built-ins, depth 4 / total 24 with roles, the
  // role-aware executor).
  subagents: {
    eyebrow: "the workforce",
    headline:
      "colleague can staff its own workforce — and a read-only role provably cannot write",
    intro: [
      // README.md:723-745: subagent/subagents loop tools, own worktree on a
      // sub/<id> branch, merge-subagent surfaces (never force-merges)
      // conflicts, MAX_SUBAGENT_DEPTH=2 / MAX_SUBAGENT_FANOUT=4;
      // subagent-roles.md:65-72: depth 4 / MAX_SUBAGENT_TOTAL=24 with roles.
      "Mid-work, a backend may hire. The subagent and subagents loop tools delegate scoped children, each isolated in its own throwaway worktree on a sub/<id> branch, and a merge-subagent integrates the branches afterward — surfacing conflicts, never force-merging them. Plain delegation is capped at depth 2 and fanout 4; with roles, the budget deepens to depth 4 under a global cap of 24 agents per work item, charged before any child does work, so every nesting shape terminates.",
      // subagent-roles.md:1-7 ("a read-only role provably cannot mutate the
      // tree" — the doc's own claim, stated no more strongly here),
      // subagent-roles.md:22-26 (the three withheld write/exec vectors), and
      // work-and-loop.md:79-82 (the executor refuses hallucinated calls).
      "Roles are what make the workforce typed. Five built-ins ship, and four of them are read-only: a read-only role is offered neither write_file, edit_file, nor run_command — and the role-aware ToolExecutor refuses a withheld tool even if the model hallucinates the call. In the repo's own words: a read-only role provably cannot mutate the tree.",
      "The table below is not copied from documentation — it is the live surface, exactly as this install reports it.",
    ],
    // Rendered from the LIVE `colleague roles list --json` output (colleague
    // 1.48.0, 2026-07-16). The live tool surface is wider than the docs'
    // minimal table in subagent-roles.md — view_media, deepthink, and memory
    // landed after that table was written — so the live output wins, per the
    // frame. The "use" column paraphrases subagent-roles.md:14-20.
    roles: [
      {
        name: "explorer",
        readOnly: true,
        tools: "read_file · view_media · list_dir · check_test_integrity · deepthink · memory · finish",
        use: "investigate the repo",
      },
      {
        name: "planner",
        readOnly: true,
        tools: "read_file · view_media · list_dir · check_test_integrity · deepthink · memory · finish",
        use: "reason about an approach",
      },
      {
        name: "reviewer",
        readOnly: true,
        tools: "read_file · view_media · list_dir · check_test_integrity · deepthink · memory · finish",
        use: "critique code",
      },
      {
        name: "validator",
        readOnly: true,
        tools:
          "read_file · view_media · list_dir · check_test_integrity · deepthink · memory · finish · run_tests",
        use: "run the suite, report pass/fail",
      },
      {
        name: "writer",
        readOnly: false,
        tools:
          "the full surface — read_file · view_media · write_file · edit_file · list_dir · run_command · culture · devague · subagent · subagents · check_test_integrity · run_tests · memory · finish · deepthink",
        use: "implement a change",
      },
    ] satisfies RoleRow[],
  },

  // Cortex & senses: minds resolved by role from the lobes gateway.
  // docs/features/cortex-senses.md throughout; line cites per claim below.
  cortexSenses: {
    eyebrow: "cortex & senses",
    headline:
      "The minds are resolved by role — armed with lobes, there is not one model id in the config",
    intro: [
      // cortex-senses.md:9-17 — the two roles, near-verbatim.
      "colleague drives with two roles. The cortex is the fast, wide-window, authoritative tool-calling mind — it drives every turn of the bounded loop, and nothing about the loop, the gates, or the handoff changes. The senses is a tools-off multimodal front door: it reads the operator's raw request before cortex acts on it and shapes cortex's raw summary back into a conversational reply — it intakes and speaks, but it structurally cannot act.",
      // cortex-senses.md:188-207 — the cannot-act guarantee, stated exactly
      // as the doc grounds it: tools=[] on the wire; senses.py imports
      // neither ToolExecutor nor subprocess.
      "Cannot act is not a policy promise — it is structural. Every senses call goes out with an explicit empty tool list on the wire, so a senses request cannot carry a tool schema at all; and the senses module imports neither the tool executor nor subprocess, so even a hallucinated tool call from a misbehaving senses model produces only an advisory packet — the repo tree provably untouched.",
      // cortex-senses.md:41-63 (role resolution via the lobes gateway; zero
      // model ids in colleague's own config when lobes is armed). The rig
      // sentence is labeled a probed reference, per the frame; the
      // spark/Thor split is shown live in the capture panes
      // (./colleague-captures.ts — lobesSparkCortex / lobesThorSenses).
      "Both minds resolve by role, not by hardcoded model ids: with a lobes gateway armed, colleague's own config carries zero model ids — they are read live off the wire. The reference rig — a probed reference, not a requirement — pairs a Qwen3.6-27B cortex with a gemma-4-12B senses on vLLM behind lobes. And in the captures on this page you can watch that brain live across the mesh: cortex ready on spark, senses ready on Thor — one mind split over two machines.",
    ],
    cards: [
      {
        // cortex-senses.md:9-11, 36-38.
        name: "cortex",
        role: "the tool-calling mind",
        detail:
          "fast, wide-window, authoritative — drives every turn of the bounded loop; cortex territory is untouched by the split",
      },
      {
        // cortex-senses.md:10-13, 188-207.
        name: "senses",
        role: "the front door that cannot act",
        detail:
          "tools-off multimodal intake and speak-back; every call carries an explicit empty tool list, and the module imports neither ToolExecutor nor subprocess",
      },
      {
        // cortex-senses.md:41-63.
        name: "lobes",
        role: "the discovery rung",
        detail:
          "one stdlib GET to the gateway's /capabilities resolves each role's model, endpoint, and readiness — and degrades to the next config rung on any failure, never raising",
      },
    ] satisfies MindCard[],
  },

  // Eidetic memory. docs/features/memory.md throughout; the warm-vs-cold
  // pair is quoted with its run ids as provenance (memory.md:60-78,
  // measured 2026-07-02 on the live rig), never as a general benchmark.
  memory: {
    eyebrow: "eidetic memory",
    headline: "The second run is cheaper than the first — and failures are the most valuable lessons",
    intro: [
      // memory.md:23-24 — recall-before (ONE advisory block, capped 4000
      // chars) and remember-after (ONE idempotent lesson per work item;
      // INCOMPLETE runs recorded too; "failures are the most valuable
      // lessons" is the doc's own phrase).
      "Every work item is wrapped in a memory exchange against the repo's eidetic store. Recall-before injects one advisory prior-lessons block — capped at 4,000 characters, advice not authority — and remember-after upserts exactly one idempotent lesson per work item, so re-runs never duplicate. Incomplete runs are recorded too, because failures are the most valuable lessons.",
      // memory.md:26 — the model-callable memory loop tool; read-only roles
      // get recall only (remember is a write-capable shell-out the
      // role-aware executor refuses).
      "Mid-run, the model can call a memory tool itself — and here the roles hold: a read-only role gets recall only, because remember is a write-capable shell-out the role-aware executor refuses.",
      // memory.md:30-37 (the triple gate, default-ON) and memory.md:13-16
      // (the same store, scope, and visibility the operator's /remember and
      // /recall skills use — mutually visible lessons).
      "Memory is default-ON but triple-gated: the config switch, a .eidetic/ store in the repo, and the eidetic CLI on PATH — all three, or a strict no-op. And it is one store, shared: the same store the operator's own remember and recall skills use, so colleague's lessons and Claude's notes are mutually visible. The two minds read each other's memory.",
      // memory.md:53-78 — the honest measurement framing.
      "The saving is measured, not asserted — one live pair, the same task run against a cold store and then a warmed one, quoted here with its run ids as provenance rather than as a general benchmark:",
    ],
    // memory.md:66-71, verbatim numbers.
    measured: [
      {
        leg: "cold",
        workItem: "503b0a36c33a",
        steps: 10,
        modelTurns: 9,
        tokens: "23,358",
        duration: "46.4 s",
      },
      {
        leg: "warm",
        workItem: "c5774404bc3d",
        steps: 2,
        modelTurns: 2,
        tokens: "4,266",
        duration: "14.1 s",
      },
    ] satisfies MemoryLeg[],
    // memory.md:71-74, near-verbatim (the punchline plus the
    // verify-not-parrot observation).
    measuredNote:
      "5× fewer steps, 5.5× fewer tokens, 3.3× faster — the same correct answer. And the warm run did not parrot the lesson: it spent its one read step verifying the recalled location against the real file before finishing — recall as a map, evidence still from the territory.",
  },

  // The remaining surfaces, compact — each stated with its own honest limit.
  moreSurfaces: {
    eyebrow: "more surfaces",
    headline: "The rest of the desk — every surface honest about its limits",
    intro: [
      "colleague is a big surface for a small install, and the rest of it deserves at least a card each. One thread runs through all of them: every capability states its own limit, in the repo's own words.",
    ],
    cards: [
      {
        // ask-colleague.md:1-27 (the verbs; review is the headline verb) and
        // .claude/skills/ask-colleague/SKILL.md (feedback + clean verbs).
        name: "ask-colleague",
        detail:
          "five verbs over colleague work — explore, review, write, feedback, clean — and review is the headline: a diverse second opinion on the committed diff, in a throwaway worktree, before you present or open a PR",
      },
      {
        // stats-and-feedback.md:1-17 and README.md:600-617 (always-on
        // WorkStats; exact tokens verbatim from usage, never estimated;
        // feedback 1-5).
        name: "the ROI loop",
        detail:
          "always-on WorkStats on every artifact — exact token counts read verbatim from usage (never estimated), per-tool counts, bytes written — plus a 1–5 feedback grade: stats say what a run cost, grades say what it was worth",
      },
      {
        // README.md:849-857 ("This is a policy gate, not a sandbox" — the
        // README's own bolded words) and README.md:867-874 (the repo-shipped
        // hooks warning); write previews: ask-colleague.md write row;
        // dirty-tree refusal: write-isolation.md:35-40.
        name: "safety, stated honestly",
        detail:
          "the approval gate is a policy gate, not a sandbox — colleague's own docs say so in bold. Writes preview by default, a dirty tree is refused, and repo-shipped hooks are a documented, flagged risk rather than fine print",
      },
      {
        // write-isolation.md (colleague/<id>), README.md:726-727 (sub/<id>),
        // ask-colleague.md:20-26 (throwaway worktrees), cleanup-reap.md /
        // colleague --help (`clean` reaps crash residue).
        name: "worktrees all the way down",
        detail:
          "work items on colleague/<id>, subagents on sub/<id>, ask-colleague verbs in throwaway worktrees — isolation is the cross-cutting story, and colleague clean reaps what a crash leaves behind",
      },
      {
        // docs/organs.md (the organ index: lobes, eidetic, coherence,
        // devague, and peers — each behind its own published contract) and
        // mesh-member.md / promote (Culture residency).
        name: "a mesh resident with organs",
        detail:
          "colleague promotes into a Culture mesh member, and it fronts a small organism of sibling CLIs — lobes serves its minds, eidetic its memory, coherence and devague sit alongside — each behind its own published contract",
      },
      {
        // senses-live-presence.md:69-80 (stt/tts resolved as lobes roles)
        // and pyproject.toml:61-66 (the [voice] extra).
        name: "voice",
        detail:
          "speech-to-text and text-to-speech resolve as roles from the same lobes contract; the [voice] extra arms operator-side capture and spoken replies",
      },
      {
        // deepthink.md:54-56 (reachable from exactly four enumerated points)
        // and deepthink.md:111 ("no automatic task→model routing").
        name: "deepthink",
        detail:
          "a second, stronger reasoner escalated at exactly four enumerated points — a declared escalation surface, not a routing policy; no automatic task-to-model routing exists",
      },
      {
        // media-input.md:1-7.
        name: "media input",
        detail:
          "hand it a screenshot, a diagram, or a voice note — attachments ride the task contract to a multimodal model, and colleague verifies the model actually received them instead of trusting a 200",
      },
      {
        // pyproject.toml:16-27 and cli-on-agentfront.md (CLI, cockpit, and
        // MCP server all rendered from one agentfront App).
        name: "agentfront underneath",
        detail:
          "the one base dependency: the agent-first CLI, the TAUI cockpit, and the MCP server all render from one agentfront App — one foundation fitting humans, agents, and bots",
      },
    ] satisfies SurfaceCard[],
  },

  // Distilled from the live open-issue list of agentculture/colleague on
  // 2026-07-16 (gh issue list --state open --limit 40). Every issue linked
  // below was verified open at authoring time; the four themes are the
  // clearest currents in that list, not its entirety.
  whatsNext: {
    eyebrow: "what's next",
    headline: "The tracker is public too — this is direction, not a promise",
    intro: [
      "colleague moves fast, and its direction is checkable the same way its facts are: on the open tracker. Four currents stand out in the open issues.",
    ],
    themes: [
      {
        name: "Gates that cannot be dodged",
        direction:
          "The honesty machinery keeps hardening. Open work targets the blind spots: changed-set paths the gates never saw get recorded, chained runs that defer their final episode's gates get surfaced instead of staying silent, and a meta-finish that escapes the incompletion classifier gets caught rather than reading as ok with zero changes.",
        issues: [
          {
            number: 342,
            title:
              "Gate changed-set blind spots: record union-dropped paths, and decide on run_command mutations (renames never reach the gates)",
            url: "https://github.com/agentculture/colleague/issues/342",
          },
          {
            number: 340,
            title:
              "Chain gate deferral: a completed chain can hand off with its final episode's gates skipped (ok-finish + declared handoff)",
            url: "https://github.com/agentculture/colleague/issues/340",
          },
          {
            number: 341,
            title:
              "Chained runs: surface deferred-gate episodes on halted chains (ungated WIP branches are silent beyond the per-episode note)",
            url: "https://github.com/agentculture/colleague/issues/341",
          },
          {
            number: 330,
            title:
              "Meta-finish 'COMPACT: … Still need to …' escapes the #313 incompletion classifier — status ok with zero changes",
            url: "https://github.com/agentculture/colleague/issues/330",
          },
        ],
      },
      {
        name: "Cognitive roles across the mesh",
        direction:
          "The cortex/senses split is the first cut of a larger idea: specialized cognitive roles orchestrated across the machines of the mesh — Qwen and Gemma nodes doing what each does best, Gemma evaluated as a runtime in its own right, and possibly a named guide role for colleague's self-knowledge.",
        issues: [
          {
            number: 332,
            title:
              "Orchestrate specialized cognitive roles across Qwen and Gemma nodes",
            url: "https://github.com/agentculture/colleague/issues/332",
          },
          {
            number: 273,
            title:
              "Evaluate Gemma4 MTP as Colleague runtime against Qwen 3.6 27B MTP",
            url: "https://github.com/agentculture/colleague/issues/273",
          },
          {
            number: 316,
            title:
              "A named guide/docent role for self-knowledge, if advisory injection proves shallow",
            url: "https://github.com/agentculture/colleague/issues/316",
          },
        ],
      },
      {
        name: "Voice and retrieval from the lobes contract",
        direction:
          "The lobes gateway already serves more roles than colleague consumes. The open work wires in the rest: a voice loop over the stt/tts roles and retrieval over embedder/reranker — with the live tts proof honestly recorded as blocked on the rig's speech proxy.",
        issues: [
          {
            number: 277,
            title:
              "Voice loop + retrieval: consume stt/tts and embedder/reranker from the lobes role contract (follow-up to the cortex/senses arc)",
            url: "https://github.com/agentculture/colleague/issues/277",
          },
          {
            number: 304,
            title:
              "tts narration of presence updates: live proof blocked on the rig speech proxy (502)",
            url: "https://github.com/agentculture/colleague/issues/304",
          },
        ],
      },
      {
        name: "Every tier tells the whole truth",
        direction:
          "The three-tier promise keeps expanding: capacity gauge, phase status, goal, and mode carried to every surface from the one shared state — and lobes' pressure signals routed into work decisions, so the runtime feels its own rig.",
        issues: [
          {
            number: 256,
            title:
              "Three-tier visibility parity: capacity gauge, phase status, goal, and mode on TUI, markdown/TAUI, and JSON/events/MCP",
            url: "https://github.com/agentculture/colleague/issues/256",
          },
          {
            number: 250,
            title: "Use lobes tier routing for pressure-aware colleague work",
            url: "https://github.com/agentculture/colleague/issues/250",
          },
        ],
      },
    ] satisfies NextTheme[],
  },

  closing: {
    paragraphs: [
      "colleague is open source, Apache-2.0, and running for real: the captures on this page are its own sessions, and every fact above traces to the public repo, PyPI, the open tracker, or the CLI's own output. Nothing was invented — the safety story included, limits and all.",
      "The thesis fits in one line: not a stronger mind — a different one, at the next desk, behind one runtime you can script, gate, and audit. Install it, hand it something small, and let review be your first reflex.",
    ],
    repoUrl: "https://github.com/agentculture/colleague",
    repoCta: "Read the code",
    pypiUrl: "https://pypi.org/project/colleague/",
    pypiCta: "uv tool install colleague",
  },
};

export default colleague;
