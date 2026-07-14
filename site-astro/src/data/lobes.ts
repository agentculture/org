// Content for agentculture.org/agents/lobes. Sourced from the lobes-cli
// repository's own artifacts (README.md, docs/tuning-profiles.md,
// docs/machine-profiles.md, docs/colleague-stack.md, and for the Mesh-brain
// section the shape TOMLs under lobes/profiles/builtin_shapes/, CHANGELOG
// 0.42.0, and the two 2026-07-14 brain-shape specs under docs/specs/) —
// lobes-cli is the single source of truth for every fact here; when it
// moves, this file follows. Forward-looking items (the Jetson AGX Orin
// joining the mesh brain, the #112 one-lobe end-state) are explicitly marked
// as future. Live states were verified 2026-07-14 against lobes-cli 0.42.0
// (main @ 8aa2d2f) and the running deployments recorded in
// ./lobes-captures.ts.

export interface FactChip {
  label: string;
  value: string;
  href?: string;
}

export interface Lobe {
  role: string;
  model: string;
  duty: string;
}

export interface PurposeProfile {
  name: string;
  batching: string;
  shape: string;
}

export interface MachineProfile {
  name: string;
  hardware: string;
  memUtil: string;
  context: string;
  status: "validated" | "configured" | "planned";
  note: string;
}

export interface BenchLink {
  title: string;
  description: string;
  url: string;
}

const lobes = {
  hero: {
    title: "lobes",
    metaDescription:
      "lobes runs, assesses, and switches the local models a Culture machine serves — specialized lobes behind one gateway, with shipped deployment shapes that compose machines into a Mesh-brain.",
    intro: [
      "Every machine on the Culture mesh thinks locally. lobes is the tool that makes that true: it runs, assesses, and switches the OpenAI-compatible models a machine serves — not as one monolithic endpoint, but as specialized lobes, each with a role.",
      "One command surface, dry-run by default, built for agents to operate. This page is the tour.",
    ],
  },

  facts: [
    { label: "install", value: "uv tool install lobes-cli" },
    {
      label: "repo",
      value: "agentculture/lobes-cli",
      href: "https://github.com/agentculture/lobes-cli",
    },
    { label: "command", value: "lobes" },
    { label: "validated on", value: "DGX Spark · Jetson Thor" },
    { label: "shapes", value: "machine-as-brain · spark-lobe · thor-lobe" },
    { label: "next", value: "Jetson AGX Orin (JetPack 7.2)" },
  ] satisfies FactChip[],

  // The six first-class roles of the colleague stack — lobes-cli
  // docs/colleague-stack.md; live via `lobes capabilities` / GET /capabilities.
  roles: [
    {
      role: "cortex",
      model: "Qwen3.6 27B NVFP4",
      duty: "reasoning, deciding, planning — final authority",
    },
    {
      role: "senses",
      model: "Gemma 4 12B NVFP4A16",
      duty: "intake, vision, classify intent, speak back",
    },
    {
      role: "embedder",
      model: "Qwen3 Embedding 0.6B",
      duty: "vectorization, memory retrieval",
    },
    {
      role: "reranker",
      model: "Qwen3 Reranker 0.6B",
      duty: "retrieval ordering, relevance",
    },
    {
      role: "stt",
      model: "Parakeet TDT 0.6B",
      duty: "hearing — audio in, text out",
    },
    {
      role: "tts",
      model: "Chatterbox",
      duty: "voice — text in, audio out",
    },
  ] satisfies Lobe[],

  story: {
    what: [
      "A machine running lobes serves a small fleet: an always-warm text primary, a multimodal gear, tiny embedding and reranking gears, audio in and out — fronted by one gateway that routes each request by its model field. Callers address a lobe by role — cortex, senses, embedder, reranker — and never need to know which checkpoint answers.",
      "Every verb speaks --json, results go to stdout and diagnostics to stderr, and every write verb is a dry run until you say --apply. Agents call CLIs in loops; safe-by-default is not a nicety here, it is the contract.",
    ],
    commands: [
      "The tour in four verbs: whoami tells you which machine and which model. status tells you the configured model and container health. switch changes the served model — showing you the full resolved config before touching anything. And capabilities tells you, machine by machine, which lobes are ready.",
    ],
  },

  profiles: {
    intro: [
      "A model never runs bare. lobes resolves its serve config through three layers — the machine profile, the workload purpose, and the model's own catalog entry — and any explicit flag overrides them all.",
      "That last clause is the point: the profiles are shipped defaults, not fences. New machine? Add a profile. Different workload? Pass --purpose, or override a single knob with a flag. Open for extension, open for override.",
    ],
    purposes: [
      {
        name: "balanced",
        batching: "4 seqs · 8192 batched tokens",
        shape: "≈1K in / 1K out",
      },
      {
        name: "prompt-heavy",
        batching: "4 seqs · 16384 batched tokens",
        shape: "≈8K in / 1K out",
      },
      {
        name: "decode-heavy",
        batching: "8 seqs · 4096 batched tokens",
        shape: "≈1K in / 8K out",
      },
    ] satisfies PurposeProfile[],
    machines: [
      {
        name: "spark",
        hardware: "DGX Spark — GB10, 128 GB unified",
        memUtil: "0.6",
        context: "262144",
        status: "validated",
        note: "load-tested; the reference deployment, shared with other mesh agents",
      },
      {
        name: "thor",
        hardware: "Jetson Thor — unified memory",
        memUtil: "0.6",
        context: "32768",
        status: "validated",
        note: "running the full fleet live — probed while writing this page",
      },
      {
        name: "blackwell",
        hardware: "RTX PRO 6000 — dedicated VRAM",
        memUtil: "0.85",
        context: "65536",
        status: "configured",
        note: "profile shipped, awaiting load-testing",
      },
      {
        name: "orin",
        hardware: "Jetson AGX Orin — JetPack 7.2",
        memUtil: "—",
        context: "—",
        status: "planned",
        note: "joins the mesh brain as its small-model lobe once JetPack 7.2 brings the software stack; declared-but-unvalidated until a physical Orin boots it",
      },
    ] satisfies MachineProfile[],
  },

  meshBrain: {
    intro: [
      "Here is the part worth leaning in for. When this page first went up, this section described a direction. As of lobes 0.42.0 it describes a shipped choice: a deployment shape — which of the six lobes a box hosts. machine-as-brain, the default, keeps the whole brain on one box, exactly as before. The mesh shapes give each box the lobes it is best at: spark-lobe keeps the Qwen cortex and drops Gemma senses; thor-lobe keeps Gemma senses and drops the Qwen cortex.",
      "The reason is arithmetic. Co-residency taxes every lobe: sharing the Spark, cortex is trimmed to 131072 context at 0.30 GPU util so senses can fit alongside. Move the box to its shape — lobes init --shape spark-lobe, dry-run by default, --apply to commit — and cortex gets its machine back: 262144 context, the checkpoint's full native window, at 0.44 util. The mirror move on Thor serves senses at 131072, four times its 32768 co-resident trim. Both shapes were validated live on the physical boxes on 2026-07-14; the numbers are deployed env values, not estimates.",
      "And a dropped lobe is dropped honestly. capabilities flags it, /v1/models omits it, and a request for it returns 404 role_infeasible — never a silent reroute to a different model. Each box tells the truth about what it hosts, so composing boxes into one brain stays addressing, not archaeology.",
    ],
    todayLabel: "machine-as-brain — the default: the whole brain on one box",
    directionLabel: "mesh shapes — shipped: each box hosts the lobes it is best at",
    endState: [
      "The far end of the axis is specced, not shipped — and the spec has converged (lobes-cli #112), its decisions recorded: one heavy lobe per box, with the cheap gears (embedder, reranker, stt, tts — about 0.06 GPU each) co-residing on every box that wants them. Cross-box reachability is direct + honest referral: no data-plane proxying — with opt-in peer config, a box's capabilities and 404s name the peer that hosts the role it dropped.",
    ],
    nextStep:
      "The named next step: the Jetson AGX Orin 64GB joins the mesh brain as its small-model lobe once JetPack 7.2 brings the software stack. Its shape ships as declared-but-unvalidated data until a physical Orin boots it and its probes pass — the same house rule this page follows: no claim outruns a live transcript.",
  },

  benchmarks: {
    intro: [
      "Every deployment claim above is measured, and the harness ships in the box. lobes benchmark measures decode throughput and prefill latency — its request shape follows the configured --purpose, so the numbers track what the machine is actually tuned for. lobes assess runs correctness probes against the served model, in markdown ready for a per-model doc.",
      "The setup is not a lab secret: the profiles are a pure data module, the compose templates are packaged in the repo, and each runtime model has a doc recording how it ran, its live test results, and its caveats. Clone it, run the same two verbs, compare.",
    ],
    links: [
      {
        title: "tuning-profiles.md",
        description:
          "The purpose × machine × model layering, and the measured numbers behind the shipped defaults.",
        url: "https://github.com/agentculture/lobes-cli/blob/main/docs/tuning-profiles.md",
      },
      {
        title: "machine-profiles.md",
        description:
          "The per-chip strategy registry and per-role budgets — the substrate the deployment shapes compose on.",
        url: "https://github.com/agentculture/lobes-cli/blob/main/docs/machine-profiles.md",
      },
      {
        title: "per-model docs",
        description:
          "One doc per runtime model — how to run it, live assess/benchmark results, caveats.",
        url: "https://github.com/agentculture/lobes-cli/tree/main/docs",
      },
      {
        title: "lobes/templates/",
        description:
          "The compose templates lobes init scaffolds — the exact deployment this page's captures ran on.",
        url: "https://github.com/agentculture/lobes-cli/tree/main/lobes/templates",
      },
      {
        title: "shahizat's NVFP4 benchmark",
        description:
          "The cross-machine reference (DGX Spark / Jetson Thor / Blackwell 6000 Pro) the throughput flags follow.",
        url: "https://forums.developer.nvidia.com/t/benchmark-report-qwen3-6-35b-a3b-nvfp4-on-nvidia-dgx-spark-jetson-thor-blackwell-6000-pro/371810",
      },
    ] satisfies BenchLink[],
  },

  closing: {
    paragraphs: [
      "lobes is open source, agent-first, and one of a fleet — sibling to culture, the workspace its models think inside. The captures on this page were taken live on 2026-07-14; nothing was invented.",
    ],
    repoUrl: "https://github.com/agentculture/lobes-cli",
    repoCta: "Read the code",
  },
};

export default lobes;
