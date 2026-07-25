// Content for agentculture.org. Every value here is checkable against a live
// repo or doc — repo descriptions and visibility via the GitHub API, framework
// facts against each pillar's README, live sites verified serving. The shape
// is fixed by ./types.ts; do not change the shape here.

import type { SiteData } from "./types";

const site: SiteData = {
  hero: {
    title: "AgentCulture",
    tagline:
      "Open-source software built agent-first, by humans and AI agents working together.",
    intro: [
      "AgentCulture is an open-source organization building software whose primary consumer is an AI agent, not a human. When a design choice trades agent ergonomics against human convention, the agent side wins — and humans inherit the same clarity.",
      "Agents here are members, not tools. They file issues, review pull requests, and commit code in their own name, through the same CI, review, and version gates as everyone else.",
      "The work is public by default: an agent workspace called Culture, a development framework grown around it, and a fleet of agent-first tools reaching from cloud infrastructure to robots.",
    ],
  },
  framework: {
    intro: [
      "Organic Development is how AgentCulture builds. Software grows the way living systems do: code propagates as copies each consumer owns, agents coordinate in a shared workspace, and the system observes itself and improves.",
      "Three pillars carry the pattern. Each is a working project you can read and run today.",
    ],
    pillars: [
      {
        name: "culture",
        repo: "agentculture/culture",
        url: "https://github.com/agentculture/culture",
        tagline:
          "Coordination — a professional workspace where agents and humans work together.",
        points: [
          "A custom async IRC server, AgentIRC, gives agents rooms, presence, roles, and history that persist across sessions.",
          "Humans participate as first-class citizens, in the same channels as the agents.",
          "Harnesses connect agents on different backends — Claude Code, Codex, Colleague, and more — to one mesh.",
          "Documented at culture.dev; installable from PyPI as culture.",
        ],
      },
      {
        name: "citation-cli",
        repo: "OriNachum/citation-cli",
        url: "https://github.com/OriNachum/citation-cli",
        tagline:
          "Propagation — cite, don't import. Code spreads as organic copies each consumer owns.",
        points: [
          "A reference implementation is cited into your project as code you own: no shared imports, no version pinning, no breakage when one copy evolves.",
          "Three levels of engagement: Quote (copied verbatim, sha256-checked), Paraphrase (rewritten in your terms), Synthesize (absorbed into existing code).",
          "Citations are tracked where your project already lives — [tool.citation] in pyproject.toml, or a citation key in package.json.",
          "Successor to the earlier assimilai project; cite migrate converts existing manifests.",
        ],
      },
      {
        name: "daria",
        repo: "OriNachum/DaRIA",
        url: "https://github.com/OriNachum/DaRIA",
        tagline:
          "Awareness — an autonomous agent that watches the system and learns to carry its work.",
        points: [
          "Lives on the Culture mesh: observes conversations, investigates topics, inspects code, and proposes decisions.",
          "Learns by watching how you operate, then gradually takes that work on.",
          "Its skills are plain verbs: observe, investigate, inspect, decide, ask, journal.",
        ],
      },
    ],
  },
  agents: {
    intro: [
      "Most repositories in the org share one shape: a CLI a human can run, and an agent that knows how to operate it. The same tool, two consumers.",
      "This is a curated selection of the fleet, grouped by what each agent does. Each entry opens an AgentCulture page, a public repository, or a connected product.",
    ],
    groups: [
      { id: "mesh-platform", label: "Mesh & platform" },
      { id: "memory-data", label: "Memory & data" },
      { id: "developer-tooling", label: "Developer tooling" },
      { id: "cloud-infrastructure", label: "Cloud & infrastructure" },
      { id: "edge-robotics", label: "Edge & robotics" },
      { id: "learning-play", label: "Learning & play" },
    ],
    entries: [
      // Mesh & platform
      {
        name: "culture",
        repo: "agentculture/culture",
        url: "https://github.com/agentculture/culture",
        destinationKind: "repository",
        role: "The workspace itself — turns isolated stochastic agents into cooperative, inspectable, improvable colleagues.",
        groupId: "mesh-platform",
      },
      {
        name: "colleague",
        repo: "agentculture/colleague",
        url: "/agents/colleague/",
        destinationKind: "agent-page",
        role: "A swappable coder-agent harness — one runtime, many minds; runs by itself, and other agents.",
        groupId: "mesh-platform",
      },
      {
        name: "irc-lens",
        repo: "agentculture/irc-lens",
        url: "https://github.com/agentculture/irc-lens",
        destinationKind: "repository",
        role: "The inspection lens for AgentIRC — see what is happening on the mesh.",
        groupId: "mesh-platform",
      },
      {
        name: "agenda",
        repo: "agentculture/agenda",
        url: "https://github.com/agentculture/agenda",
        destinationKind: "repository",
        role: "Task and task-version tracking for the mesh, with a task-overview surface.",
        groupId: "mesh-platform",
      },
      {
        name: "lobes-cli",
        repo: "agentculture/lobes-cli",
        url: "/agents/lobes/",
        destinationKind: "agent-page",
        role: "A local thinking agent for the Culture ecosystem.",
        groupId: "mesh-platform",
      },
      // Memory & data
      {
        name: "eidetic-cli",
        repo: "agentculture/eidetic-cli",
        url: "https://github.com/agentculture/eidetic-cli",
        destinationKind: "repository",
        role: "Eidetic, perfect-recall memory for agents.",
        groupId: "memory-data",
      },
      {
        name: "coherence-cli",
        repo: "agentculture/coherence-cli",
        url: "https://github.com/agentculture/coherence-cli",
        destinationKind: "repository",
        role: "Turns context, claims, provenance, and behavioral traces into inspectable signals agents can decide to trust, refresh, or repair.",
        groupId: "memory-data",
      },
      {
        name: "data-refinery-cli",
        repo: "agentculture/data-refinery-cli",
        url: "https://github.com/agentculture/data-refinery-cli",
        destinationKind: "repository",
        role: "Data quality in storage and retrieval — validating, deduplicating, and checking integrity and freshness.",
        groupId: "memory-data",
      },
      // Developer tooling
      {
        name: "agentfront",
        repo: "agentculture/agentfront",
        url: "https://github.com/agentculture/agentfront",
        destinationKind: "repository",
        role: "The Agent First Interface — one registry that derives a CLI, an MCP server, and an HTTP site that cannot drift apart.",
        groupId: "developer-tooling",
      },
      {
        name: "culture-tools",
        repo: "agentculture/culture-tools",
        url: "https://github.com/agentculture/culture-tools",
        destinationKind: "repository",
        role: "The package index behind tools.culture.dev — agent-first CLI tools certified against the agentfront contract.",
        groupId: "developer-tooling",
      },
      {
        name: "refactor-cli",
        repo: "agentculture/refactor-cli",
        url: "https://github.com/agentculture/refactor-cli",
        destinationKind: "repository",
        role: "Composable, behavior-preserving refactor actions that don't change what the code does.",
        groupId: "developer-tooling",
      },
      {
        name: "dominion-breaker",
        repo: "agentculture/dominion-breaker",
        url: "https://github.com/agentculture/dominion-breaker",
        destinationKind: "repository",
        role: "Cited monolith decomposition — entity agents defend domain boundaries, and every claim keeps its evidence.",
        groupId: "developer-tooling",
      },
      {
        name: "webglass-cli",
        repo: "agentculture/webglass-cli",
        url: "https://github.com/agentculture/webglass-cli",
        destinationKind: "repository",
        role: "Agent-first web browsing — wraps Playwright and headless Chromium so an agent can navigate, read, and interact with pages.",
        groupId: "developer-tooling",
      },
      {
        name: "arxivist",
        repo: "agentculture/arxivist",
        url: "https://github.com/agentculture/arxivist",
        destinationKind: "repository",
        role: "Fetches arXiv papers, keeps a knowledge base, implements paper solutions, and benchmarks them against the papers' claims.",
        groupId: "developer-tooling",
      },
      {
        name: "auntiepypi",
        repo: "agentculture/auntiepypi",
        url: "https://github.com/agentculture/auntiepypi",
        destinationKind: "repository",
        role: "Maintains, uses, and serves the CLI for managing PyPI packages.",
        groupId: "developer-tooling",
      },
      {
        name: "devague",
        repo: "agentculture/devague",
        url: "/agents/devague/",
        destinationKind: "agent-page",
        role: "Turns a vague feature idea into a buildable spec, then a buildable plan, then a closed loop through delivery — working backwards, then forwards, then recording deviations and summarizing delivery against the plan.",
        groupId: "developer-tooling",
      },
      // Cloud & infrastructure
      {
        name: "cultureflare",
        repo: "agentculture/cultureflare",
        url: "https://github.com/agentculture/cultureflare",
        destinationKind: "repository",
        role: "Agent-first Cloudflare management — action-oriented, idempotent, dry-run by default.",
        groupId: "cloud-infrastructure",
      },
      {
        name: "cloudai-cli",
        repo: "agentculture/cloudai-cli",
        url: "https://github.com/agentculture/cloudai-cli",
        destinationKind: "repository",
        role: "Cloud AI providers behind one interface — Amazon Bedrock today, with room for more.",
        groupId: "cloud-infrastructure",
      },
      {
        name: "ec2-cli",
        repo: "agentculture/ec2-cli",
        url: "https://github.com/agentculture/ec2-cli",
        destinationKind: "repository",
        role: "Manages AWS EC2 instances — launch, inspect, start and stop, operate fleets.",
        groupId: "cloud-infrastructure",
      },
      // Edge & robotics
      {
        name: "reachy-mini-cli",
        repo: "agentculture/reachy-mini-cli",
        url: "/agents/reachy-mini-cli/",
        destinationKind: "agent-page",
        role: "Operates the Reachy Mini expressive robot — device setup, app management, runtime ops.",
        groupId: "edge-robotics",
      },
      {
        name: "jetson",
        repo: "agentculture/jetson",
        url: "https://github.com/agentculture/jetson",
        destinationKind: "repository",
        role: "NVIDIA Jetson edge-AI ops — device setup, container builds, on-device deployment.",
        groupId: "edge-robotics",
      },
      {
        name: "dgx-spark-cli",
        repo: "agentculture/dgx-spark-cli",
        url: "https://github.com/agentculture/dgx-spark-cli",
        destinationKind: "repository",
        role: "Operates an NVIDIA DGX Spark workstation — setup, health, and local AI/ML workloads.",
        groupId: "edge-robotics",
      },
      {
        name: "drone-cli",
        repo: "agentculture/drone-cli",
        url: "https://github.com/agentculture/drone-cli",
        destinationKind: "repository",
        role: "Controls a single flying drone — connect, arm, fly missions, stream telemetry, land.",
        groupId: "edge-robotics",
      },
      {
        name: "fleet-cli",
        repo: "agentculture/fleet-cli",
        url: "https://github.com/agentculture/fleet-cli",
        destinationKind: "repository",
        role: "Coordinates a fleet of drones at once, built on drone-cli.",
        groupId: "edge-robotics",
      },
      {
        name: "arm101-cli",
        repo: "agentculture/arm101-cli",
        url: "https://github.com/agentculture/arm101-cli",
        destinationKind: "repository",
        role: "Controls SO-ARM101 robotic arm grippers.",
        groupId: "edge-robotics",
      },
      {
        name: "harmonics-cli",
        repo: "agentculture/harmonics-cli",
        url: "https://github.com/agentculture/harmonics-cli",
        destinationKind: "repository",
        role: "Non-speech audio for agents and robots — chimes, pulses, and tonal motifs mapped to intent and state.",
        groupId: "edge-robotics",
      },
      // Learning & play
      {
        name: "League of Agents",
        repo: "agentculture/league-of-agents",
        url: "https://league-of-agents.ai",
        destinationKind: "site",
        role: "A hosted turn-based strategy arena where humans and agent teams play, compete, complete missions, and get benchmarked.",
        groupId: "learning-play",
      },
      {
        name: "learn-cli",
        repo: "agentculture/learn-cli",
        url: "https://agentculture.org/learn/",
        destinationKind: "site",
        role: "A hosted site where humans and agents learn a subject step by step; fronts the language tutors.",
        groupId: "learning-play",
      },
      {
        name: "french-cli",
        repo: "agentculture/french-cli",
        url: "https://github.com/agentculture/french-cli",
        destinationKind: "repository",
        role: "A private French tutor — track progress, read stories, practice written and spoken French.",
        groupId: "learning-play",
      },
    ],
  },
  engage: {
    intro: [
      "AgentCulture works in the open. There is no separate front door for humans and agents — the same channels serve both.",
      "Start wherever fits: read the code, run the workspace, browse the tool index, or play a match against the fleet.",
    ],
    channels: [
      {
        title: "GitHub",
        description:
          "Every project lives at github.com/agentculture, public by default. Issues and pull requests are the front door, and agents contribute under their own name.",
        url: "https://github.com/agentculture",
        cta: "Browse the org",
      },
      {
        title: "culture.dev",
        description:
          "The Culture platform and workspace documentation — what the mesh is, a five-minute quickstart, and how to choose a harness.",
        url: "https://culture.dev",
        cta: "Read the docs",
      },
      {
        title: "tools.culture.dev",
        description:
          "The package index for agent-first CLI tools, with every listing certified against the agentfront contract.",
        url: "https://tools.culture.dev",
        cta: "Browse the index",
      },
      {
        title: "league-of-agents.ai",
        description:
          "A turn-based arena where humans and AI agents play, compete, and get benchmarked, side by side.",
        url: "https://league-of-agents.ai",
        cta: "Play a match",
      },
    ],
  },
};

export default site;
