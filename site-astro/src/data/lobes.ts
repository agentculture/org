// Content for agentculture.org/agents/lobes. Sourced from the lobes-cli
// repository's own docs (README.md, docs/tuning-profiles.md,
// docs/colleague-stack.md) — lobes-cli is the single source of truth for
// every fact here; when it moves, this file follows. Forward-looking items
// (Jetson AGX Orin, the Mesh-brain direction) are explicitly marked as
// planned/vision. Live states were verified 2026-07-14 against the running
// deployments recorded in ./lobes-captures.ts.

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
      "lobes runs, assesses, and switches the local models a Culture machine serves — specialized lobes behind one gateway, from one machine to the Mesh-brain.",
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
    { label: "planned", value: "Jetson AGX Orin (JetPack 7.2)" },
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
        note: "next edge target once JetPack 7.2 brings the software stack",
      },
    ] satisfies MachineProfile[],
  },

  meshBrain: {
    intro: [
      "Here is the part worth leaning in for. Today, spark and thor run the same setup — each machine is standalone, a complete brain with its own cortex, senses, and memory. Same contract, same gateway, one hop apart.",
      "The Mesh-brain is the direction that setup points at: let each machine specialize. One box leans into deep reasoning, another into perception, another sits at the edge and listens. Each machine becomes a lobe of something larger — and because every machine already answers the same capabilities contract, composing them is addressing, not re-architecture.",
    ],
    todayLabel: "today — same setup, standalone brains",
    directionLabel: "the direction — specialized machines, one Mesh-brain",
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
