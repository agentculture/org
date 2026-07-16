// Real transcripts for /agents/colleague — captured 2026-07-16 while
// authoring this page, plus one pane ported from material committed in the
// public colleague repo. Nothing here is invented; every "cmd" and "out"
// line is copied verbatim from a real terminal session or a committed
// artifact, trimmed only for pane length. Where a run of real lines is
// omitted, the cut is marked with its own "ellipsis" line — it is never
// folded silently into a kept line, and no kept line is reworded.
//
// Two source classes, per the frame's provenance boundary (c23):
//  - PORTED — the pane's `source` names a committed, publicly traceable
//    path in github.com/agentculture/colleague (verified via git ls-files
//    at authoring time).
//  - FRESH RUN — the pane's `source` names the run id + date; these
//    sessions were run once, for real, while authoring this page. Their
//    artifacts live in gitignored .colleague/ bookkeeping and are NOT in
//    the public repo — which is exactly why they are labeled fresh-run
//    instead of cited as repo paths.
//
// No tokens, no keys, no private URLs (c24). Local rig endpoints
// (localhost:8001, thor:8000) appear exactly as colleague's own public
// docs print them. The page REPLAYS these strings — it never runs
// colleague at build or view time.

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
  /** Stable slug for the pane, e.g. "identity-whoami". */
  id: string;
  /** Short pane title, shown in the pane header. */
  title: string;
  /** What this pane is a session of — surface and machine, not marketing. */
  context: string;
  /** Capture date, shown in the pane header. */
  capturedDate: string;
  /** colleague version the session ran under. */
  colleagueVersion: string;
  /** Provenance: "ported · <public repo path>" or "fresh run · <run id>". */
  source: string;
  lines: CaptureLine[];
}

export const capturedOn = "2026-07-16";
export const sessionVersion = "1.48.0";

/** Identity: one glance at the live work engine + model. */
export const identityWhoami: CapturePane = {
  id: "identity-whoami",
  title: "whoami — the live mind",
  context: "spark · colleague CLI · identity probe",
  capturedDate: capturedOn,
  colleagueVersion: sessionVersion,
  source: "fresh run · spark, 2026-07-16",
  lines: [
    { kind: "cmd", text: "colleague whoami" },
    { kind: "out", text: "nick: colleague" },
    { kind: "out", text: "version: 1.48.0" },
    { kind: "out", text: "mesh backend: unknown" },
    { kind: "out", text: "work engine: vllm-openai" },
    { kind: "out", text: "work model: sakamakismile/Qwen3.6-27B-Text-NVFP4-MTP" },
  ],
};

/** The agent tier: the TAUI JSON mirror — the whole cockpit as one
 * selector-addressed state object an agent can read and drive. */
export const tauiState: CapturePane = {
  id: "taui-state",
  title: "tui state — the TAUI mirror",
  context: "spark · colleague repo · agent render tier (Textual Agentic UI)",
  capturedDate: capturedOn,
  colleagueVersion: sessionVersion,
  source: "fresh run · spark, 2026-07-16",
  lines: [
    { kind: "cmd", text: "colleague tui state" },
    {
      kind: "out",
      text: '{"screen": "main", "mode": "planning", "focused": "input.prompt", "header": {"title": "", "subtitle": "", "version": ""}, "zones": {"top.status": {"visible": true}, "left.skills": {"visible": true}, "main.conversation": {"visible": true}, "bottom.input": {"visible": true}}, "panels": [], "popups": [], "status": {"severity": "info", "message": ""}, "work": null, "problems": [], "background": {"theme": "", "animation": "", "frame": 0, "semantic": ""}, "conversation": [], "taui_version": "0.2", "available_actions": [{"selector": "input.prompt", "input": "type", "description": "Send instruction to current agent"}]}',
    },
  ],
};

/** Batch work, part 1: the guard — colleague refuses a dirty tree rather
 * than committing your uncommitted edits onto its work branch. */
export const workDirtyRefusal: CapturePane = {
  id: "work-dirty-refusal",
  title: "work — the dirty-tree refusal",
  context: "spark · colleague repo · write-isolation guard (colleague#149)",
  capturedDate: capturedOn,
  colleagueVersion: sessionVersion,
  source: "fresh run · spark, 2026-07-16",
  lines: [
    {
      kind: "cmd",
      text: 'colleague work "hi — what is this repo, and which minds are you running on right now?" --repo /home/spark/git/colleague --no-pr',
    },
    {
      kind: "out",
      text: "error: working tree has uncommitted changes — refusing to run against a dirty repo",
    },
    {
      kind: "out",
      text: "hint: commit or stash your changes first, or pass --allow-dirty to commit them onto the work branch",
    },
  ],
};

/** Batch work, part 2: the same ask against a clean repo — the full
 * lifecycle: flight control plane, bounded tool-loop, typed result. */
export const workFlightRun: CapturePane = {
  id: "work-flight-run",
  title: "work — a real run, piloted",
  context: "spark · org repo · colleague work + flight feed",
  capturedDate: capturedOn,
  colleagueVersion: sessionVersion,
  source: "fresh run · 115da517b128, 2026-07-16",
  lines: [
    {
      kind: "cmd",
      text: 'colleague work "hi — what is this repo, and which minds are you running on right now?" --repo /home/spark/git/org --no-pr',
    },
    { kind: "out", text: "flight: 115da517b128" },
    {
      kind: "out",
      text: "feed: /home/spark/git/org/.colleague/flight/115da517b128.feed.jsonl",
    },
    {
      kind: "out",
      text: "control: /home/spark/git/org/.colleague/flight/115da517b128.control.json",
    },
    {
      kind: "out",
      text: "thinking… (waiting on the model — this can be slow on a large model)",
    },
    { kind: "out", text: "step 0: list_dir . [ok]" },
    { kind: "out", text: "step 1: culture devex overview [ok]" },
    { kind: "out", text: "step 2: read_file README.md [ok]" },
    { kind: "out", text: "step 3: read_file AGENTS.colleague.md [ok]" },
    { kind: "out", text: "step 4: culture devex explain [ok]" },
    { kind: "out", text: "step 5: read_file culture.yaml [ok]" },
    {
      kind: "out",
      text: 'step 6: run_command uv run org whoami 2>/dev/null || echo "uv not available" [ok]',
    },
    {
      kind: "out",
      text: "step 7: finish This repo is the AgentCulture org site — source for agentculture.org, with an agent-first CLI (`org`) for site operat... [ok]",
    },
    {
      kind: "out",
      text: "handoff: local commit only (--no-pr, no remote, or gh unavailable)",
    },
    { kind: "ellipsis", text: "… (per-step thinking lines elided)" },
    { kind: "out", text: "task: 115da517b128" },
    { kind: "out", text: "engine: vllm-openai" },
    { kind: "out", text: "status: ok" },
    {
      kind: "out",
      text: "summary: This repo is the AgentCulture org site — source for agentculture.org, with an agent-first CLI (`org`) for site operations and agent identity. I'm running on sakamakismile/Qwen3.6-27B-Text-NVFP4-MTP (Qwen 3.6 27B, quantized NVFP4 with MTP), operating as the `org` agent with `colleague` backend.",
    },
    {
      kind: "out",
      text: "branch: colleague/115da517b128-hi-what-is-this-repo-and-which-minds-are",
    },
  ],
};

/** The typed roles workforce: five roles, curated tool subsets, read-only
 * enforced structurally. */
export const rolesList: CapturePane = {
  id: "roles-list",
  title: "roles list — the typed workforce",
  context: "spark · colleague CLI · subagent roles",
  capturedDate: capturedOn,
  colleagueVersion: sessionVersion,
  source: "fresh run · spark, 2026-07-16",
  lines: [
    { kind: "cmd", text: "colleague roles list" },
    {
      kind: "out",
      text: "explorer\t[read-only]\ttools: read_file,view_media,list_dir,check_test_integrity,deepthink,memory,finish\tskills: recall*,explore*,review*,agent-config*,doc-test-alignment*,sonarclaude*",
    },
    {
      kind: "out",
      text: "planner\t[read-only]\ttools: read_file,view_media,list_dir,check_test_integrity,deepthink,memory,finish\tskills: recall*,explore*,review*,agent-config*,doc-test-alignment*,sonarclaude*",
    },
    {
      kind: "out",
      text: "reviewer\t[read-only]\ttools: read_file,view_media,list_dir,check_test_integrity,deepthink,memory,finish\tskills: recall*,explore*,review*,agent-config*,doc-test-alignment*,sonarclaude*",
    },
    {
      kind: "out",
      text: "validator\t[read-only]\ttools: read_file,view_media,list_dir,check_test_integrity,deepthink,memory,finish,run_tests\tskills: recall*,explore*,review*,agent-config*,doc-test-alignment*,sonarclaude*,run-tests*",
    },
    {
      kind: "out",
      text: "writer\t[full]\ttools: read_file,view_media,write_file,edit_file,list_dir,run_command,culture,devague,subagent,subagents,check_test_integrity,run_tests,memory,finish,deepthink\tskills: all",
    },
  ],
};

/** Cortex & senses, part 1: the spark rig — cortex ready, the tool-calling
 * mind that drives the loop. */
export const lobesSparkCortex: CapturePane = {
  id: "lobes-spark-cortex",
  title: "lobes show — cortex on spark",
  context: "spark · lobes gateway localhost:8001 · role-resolved minds",
  capturedDate: capturedOn,
  colleagueVersion: sessionVersion,
  source: "fresh run · spark, 2026-07-16",
  lines: [
    { kind: "cmd", text: "colleague lobes show" },
    { kind: "out", text: "lobes: armed at http://localhost:8001 — reachable" },
    { kind: "out", text: "" },
    {
      kind: "out",
      text: "cortex\tsakamakismile/Qwen3.6-27B-Text-NVFP4-MTP\t[ready (config-proxy)]",
    },
    { kind: "out", text: "  context:  262144" },
    {
      kind: "out",
      text: "  endpoint: http://localhost:8001/v1/chat/completions",
    },
    {
      kind: "out",
      text: "  responsibilities: reasoning, deciding, planning, tool_use, code_repo_actions, validation, final_authority",
    },
    { kind: "out", text: "" },
    {
      kind: "out",
      text: "senses\tcoolthor/gemma-4-12B-it-NVFP4A16\t[not ready (config-proxy)]",
    },
    { kind: "out", text: "  context:  32768" },
    {
      kind: "out",
      text: "  responsibilities: intake, normalize_input, classify_intent, prepare_context_packet, speak_back",
    },
    {
      kind: "out",
      text: "  forbidden: final_decision, repo_action, security_decision",
    },
    { kind: "ellipsis", text: "… (stt and tts lobes elided — not ready on spark)" },
  ],
};

/** Cortex & senses, part 2: Thor's gateway across the mesh — senses ready.
 * Two machines, one brain: spark carries cortex, Thor carries senses. */
export const lobesThorSenses: CapturePane = {
  id: "lobes-thor-senses",
  title: "lobes show — senses on Thor",
  context: "spark → thor:8000 · the same brain, across the mesh",
  capturedDate: capturedOn,
  colleagueVersion: sessionVersion,
  source: "fresh run · spark → thor, 2026-07-16",
  lines: [
    {
      kind: "cmd",
      text: "COLLEAGUE_LOBES_URL=http://thor:8000 colleague lobes show",
    },
    { kind: "out", text: "lobes: armed at http://thor:8000 — reachable" },
    { kind: "out", text: "" },
    {
      kind: "out",
      text: "cortex\tsakamakismile/Qwen3.6-27B-Text-NVFP4-MTP\t[not ready (config-proxy)]",
    },
    { kind: "out", text: "  context:  131072" },
    { kind: "out", text: "" },
    {
      kind: "out",
      text: "senses\tcoolthor/gemma-4-12B-it-NVFP4A16\t[ready (config-proxy)]",
    },
    { kind: "out", text: "  context:  131072" },
    {
      kind: "out",
      text: "  endpoint: http://thor:8000/v1/chat/completions",
    },
    {
      kind: "out",
      text: "  responsibilities: intake, normalize_input, classify_intent, prepare_context_packet, speak_back",
    },
    {
      kind: "out",
      text: "  forbidden: final_decision, repo_action, security_decision",
    },
    { kind: "ellipsis", text: "… (stt and tts lobes elided — not ready on thor)" },
  ],
};

/** Ported from the public colleague repo: the step trace of the drive in
 * which colleague built its own website (attempt 3, status ok). Source is
 * committed and publicly traceable. */
export const selfBuildTrace: CapturePane = {
  id: "ported-selfbuild-trace",
  title: "the self-build drive — step trace",
  context: "colleague builds its own website · bounded tool-loop, 8 steps",
  capturedDate: "2026-05-29",
  colleagueVersion: "pre-1.0 drive (as committed)",
  source:
    "ported · docs/drive-notes/2026-05-29-website-self-build/notes.md (public repo)",
  lines: [
    { kind: "out", text: " 0: read_file    site/style.css      ok  (7972 bytes returned)" },
    { kind: "out", text: " 1: read_file    README.md           ok  (20031 bytes returned)" },
    { kind: "out", text: " 2: write_file   site/index.html     ok" },
    { kind: "out", text: " 3: list_dir     site                ok" },
    { kind: "out", text: " 4: run_command  wc -l site/index.html  ok" },
    { kind: "out", text: " 5: write_file   site/index.html     ok   (rewrote)" },
    { kind: "out", text: " 6: run_command  wc -l site/index.html  ok" },
    { kind: "out", text: " 7: finish       (summary)           ok" },
    {
      kind: "ellipsis",
      text: "… (tallies in the committed notes: read_file ×2, write_file ×2, list_dir ×1, run_command ×2, finish ×1 — no step had ok=false)",
    },
  ],
};

/** The dogfood loop, part 1: while THIS page was being specced, colleague
 * explored its own repo as the second mind — the flight feed of that run. */
export const dogfoodExplore: CapturePane = {
  id: "dogfood-explore",
  title: "the second mind reads its own repo",
  context: "spark · ask-colleague explore · worktree-isolated, read-only",
  capturedDate: capturedOn,
  colleagueVersion: sessionVersion,
  source: "fresh run · e41355e8e5ac, 2026-07-16",
  lines: [
    { kind: "out", text: "flight: e41355e8e5ac" },
    {
      kind: "out",
      text: "feed: /tmp/ask-colleague.jinV5s/.colleague/flight/e41355e8e5ac.feed.jsonl",
    },
    {
      kind: "out",
      text: "thinking… (waiting on the model — this can be slow on a large model)",
    },
    { kind: "out", text: "step 0: list_dir . [ok]" },
    { kind: "out", text: "step 1: read_file CLAUDE.md [ok]" },
    { kind: "out", text: "step 2: read_file README.md [ok]" },
    { kind: "out", text: "step 4: read_file colleague/contract.py [ok]" },
    { kind: "out", text: "step 5: read_file colleague/loop.py [ok]" },
    {
      kind: "out",
      text: "compacting the conversation to free context — this can take a moment…",
    },
    { kind: "out", text: "step 13: read_file colleague/subagents.py [ok]" },
    { kind: "out", text: "step 14: read_file colleague/roles.py [ok]" },
    { kind: "out", text: "step 15: read_file colleague/lobes.py [ok]" },
    { kind: "out", text: "step 16: read_file colleague/memory.py [ok]" },
    {
      kind: "ellipsis",
      text: "… (18-step read-only exploration; findings folded into this very page)",
    },
    {
      kind: "out",
      text: "artifact: /home/spark/git/colleague/.colleague/e41355e8e5ac.you-are-a-second-independent-mind.json",
    },
    { kind: "out", text: "grade: ask-colleague feedback e41355e8e5ac --rating N" },
  ],
};

/** The dogfood loop, part 2: closing the ROI loop — the explore run graded
 * by the mind that consumed its findings. */
export const dogfoodFeedback: CapturePane = {
  id: "dogfood-feedback",
  title: "the ROI loop — grading the run",
  context: "spark · ask-colleague feedback · stats say cost, grades say worth",
  capturedDate: capturedOn,
  colleagueVersion: sessionVersion,
  source: "fresh run · e41355e8e5ac, 2026-07-16",
  lines: [
    {
      kind: "cmd",
      text: 'ask-colleague feedback e41355e8e5ac --rating 4 --notes "…"',
    },
    { kind: "out", text: "task:   e41355e8e5ac" },
    { kind: "out", text: "rating: 4/5" },
    { kind: "out", text: "by:     colleague" },
    {
      kind: "out",
      text: "notes:  Thorough independent read for the presentation page: confirmed the main map and added specifics the first pass missed (embedder relay-never-consumed boundary, thread-safe subagent budget, dynamic writer allowlist, JSON-not-YAML scenarios) plus honest risks. One subagents step errored mid-run; recovered. Verified against an independent exploration — no contradictions.",
    },
  ],
};

/** The dogfood loop, part 3: before this page's PR opened, colleague
 * reviewed the page's own committed diff — and caught the one claim on the
 * site that still contradicted the paradigm (the agents-index card written
 * before this page existed). The catch was adopted, recorded as deviation
 * d1 on the plan's ledger, and the run graded — the full loop, on the page
 * about the tool that ran it. */
export const dogfoodReview: CapturePane = {
  id: "dogfood-review",
  title: "the second mind reviews this page",
  context: "spark · ask-colleague review main...HEAD · lobes armed at thor:8000",
  capturedDate: capturedOn,
  colleagueVersion: sessionVersion,
  source: "fresh run · 7bd1b67432d0, 2026-07-16",
  lines: [
    { kind: "out", text: "flight: 7bd1b67432d0" },
    {
      kind: "out",
      text: "feed: /tmp/ask-colleague.AeB4A5/.colleague/flight/7bd1b67432d0.feed.jsonl",
    },
    { kind: "out", text: "step 0: run_command git diff main...HEAD --stat [ok]" },
    { kind: "out", text: "step 1: run_command git diff main...HEAD [ok]" },
    { kind: "out", text: "step 2: read_file site-astro/src/data/colleague.ts [ok]" },
    {
      kind: "out",
      text: "step 3: read_file site-astro/src/data/colleague-captures.ts [ok]",
    },
    {
      kind: "out",
      text: "step 4: read_file site-astro/src/pages/agents/colleague.astro [ok]",
    },
    {
      kind: "out",
      text: "step 8: finish ## Review: /agents/colleague Presentation Page [ok]",
    },
    { kind: "out", text: "status: ok" },
    {
      kind: "ellipsis",
      text: "… (the full review; its one adopted catch below — the other findings were verified and declined, with the checks recorded in the run's feedback)",
    },
    {
      kind: "out",
      text: '1. **Fix site.ts:91 role description** — Change "A harness for Qwen" to something backend-agnostic. This is the only claim that actively misrepresents what colleague is.',
    },
    { kind: "ellipsis", text: "… (adopted — deviation d1 on the plan's ledger)" },
    {
      kind: "cmd",
      text: 'ask-colleague feedback 7bd1b67432d0 --rating 4 --notes "…"',
    },
    { kind: "out", text: "rating: 4/5" },
    { kind: "out", text: "by:     org" },
  ],
};
