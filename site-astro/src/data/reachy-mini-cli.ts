// Content for agentculture.org/agents/reachy-mini-cli. Every fact here traces
// to a public artifact: the repo (github.com/agentculture/reachy-mini-cli,
// MIT — README.md, docs/operating-reachy.md, docs/export-schema.md,
// docs/adr-0001-sdk-transport-extra.md, docs/verification/*), the packaging
// metadata (pyproject.toml — reachy-mini-cli 0.31.0, requires-python >=3.12,
// the `sdk`/`daemon` extras pulling reachy-mini>=1.0), or the installed CLI's
// own output (the `think` overview text, the `--export` sink hint). The
// what's-next themes were distilled from the live open-issue list of
// agentculture/reachy-mini-cli (gh issue list --state open), grouped on
// 2026-07-17; each theme links only issues verified open at authoring time.
// The live-rig references — a robot on the rig "spark", the daemon at
// localhost:8000, an arducam, the 2026-07-17 capture batch — are a probed
// reference, not a claim the CLI can self-verify. Dates live in comments like
// this one (provenance), never in rendered copy.
//
// Same idiom as colleague.ts and devague.ts: section eyebrows and headlines
// live HERE, not in the .astro page. This page is a presentation Ori talks
// over — each headline carries the spoken point, so the headlines are copy,
// and copy lives in the content model. The page template (a later task)
// composes strictly from this module; a diagram component narrated by the
// sdkOwner section already exists.

export interface FactChip {
  label: string;
  value: string;
  href?: string;
}

/** One thing the body can do, mapped to the noun that exposes it. */
export interface CapabilityCard {
  name: string;
  detail: string;
}

/** One row of the complete noun map — the whole robot surface, faithfully. */
export interface NounRow {
  noun: string;
  does: string;
  transport: string;
}

/** One pillar of the single-SDK-owner model the diagram narrates. */
export interface OwnerCard {
  name: string;
  detail: string;
}

/** One live behavior of the folded sense loop. */
export interface SenseCard {
  name: string;
  detail: string;
}

/** One face of the agent-first CLI surface. */
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

const reachyMiniCli = {
  hero: {
    title: "reachy-mini-cli",
    metaDescription:
      "reachy-mini-cli is an agent and CLI for operating the Reachy Mini expressive desk robot — the body of the agents family. It turns each of the robot's senses and motions into a noun you run from a shell or an agent loop, behind one honest transport model and the single-SDK-owner rule.",
    intro: [
      // README.md:3-4 (agent and CLI for operating the Reachy Mini expressive
      // robot) and README.md:19-29 (each capability is a noun you run).
      "reachy-mini-cli is the agent and command-line tool for operating a Reachy Mini — an expressive desk robot with a movable head, two antennas, a rotating body, a mic array that hears direction, a camera, and a speaker. Every capability the robot has becomes a noun you run from a shell or drop into an agent loop: hold the hardware, feel alive, orient to sound, turn toward motion, speak, think out loud, feel a head pat, fall asleep, and survive a reboot.",
      // Family framing per the agents-family arc: devague = the method, lobes =
      // the split brain, colleague = the swappable mind, reachy-mini-cli = the
      // body. This page is the embodiment leg.
      "If the agents family has a method, a brain, and a mind — devague is the method that works an idea backwards into a plan, lobes is the split brain that serves cognition across machines, and colleague is the swappable mind you point at a repo — then this is the body. reachy-mini-cli is the embodiment leg: the place where all of that stops being text on a screen and starts leaning its antennas toward the person who just spoke.",
      // Everything on this page is real: 0.31.0 on PyPI, a live robot on the
      // rig "spark". The capture provenance is stated plainly here so the tour
      // never overclaims.
      "Everything on this page is real. The version is 0.31.0, the same one on PyPI. The captures were taken today against a live robot on the rig we call spark — its daemon answering on localhost, an arducam for eyes — and where a service was down, you will see the robot's honest fallback rather than a staged success.",
    ],
  },

  // Packaging facts, from pyproject.toml (reachy-mini-cli 0.31.0, MIT,
  // requires-python >=3.12; [project.scripts] declares `reachy-mini-cli` and
  // `reachy`; the sdk/daemon extras pull reachy-mini>=1.0) and README's
  // install table + hardware one-liner.
  facts: [
    { label: "install", value: "uv tool install 'reachy-mini-cli[daemon]'" },
    {
      label: "repo",
      value: "agentculture/reachy-mini-cli",
      href: "https://github.com/agentculture/reachy-mini-cli",
    },
    {
      label: "package",
      value: "reachy-mini-cli 0.31.0 · PyPI",
      href: "https://pypi.org/project/reachy-mini-cli/",
    },
    { label: "license", value: "MIT" },
    { label: "python", value: ">=3.12" },
    { label: "commands", value: "reachy-mini-cli · reachy" },
    { label: "transports", value: "sdk (in-process) · http (daemon REST)" },
    {
      label: "hardware",
      value: "head + antennas + body · mic array · camera · speaker",
    },
    { label: "agents family", value: "the body — embodiment leg" },
  ] satisfies FactChip[],

  // What the body can do, one card per capability, each mapped to its noun.
  // Sources: operating-reachy.md:19-40 (the capability bullets) and the noun
  // map in README.md:36-51.
  capabilities: {
    eyebrow: "the body",
    headline: "Everything the robot can do is a verb you can type",
    intro: [
      "Start with what it is: a small desk robot that can look at you, listen for you, and move like it means it. reachy-mini-cli does not hide any of that behind an app — it hands you each capability as a plain command, so a human at a terminal and an agent in a loop reach the robot exactly the same way.",
      "Here is the whole body, one line at a time. None of these is a promise for later; each is a noun that ships in 0.31.0.",
    ],
    cards: [
      {
        // README.md:38-41; operating-reachy.md:26-27.
        name: "hold the hardware",
        detail:
          "daemon owns the robot process and wakes it; device and move run low-level state and one-shot goto / wake / sleep animations against it",
      },
      {
        // README.md:42; operating-reachy.md:28-29.
        name: "feel alive",
        detail:
          "demo-mode is the always-on idle loop — gentle breathing, glances, antenna sway — so the robot looks present even when nothing is happening",
      },
      {
        // README.md:44; operating-reachy.md:30-31.
        name: "orient to sound",
        detail:
          "listen leans its antennas toward a voice, then turns its head and body to face it — reading real direction-of-arrival off the mic array",
      },
      {
        // README.md:45; operating-reachy.md:32-33.
        name: "turn toward what it sees",
        detail:
          "vision turns toward motion or light in the camera using pure pixel math — frame differences and brightness, no machine-learning model in the loop",
      },
      {
        // README.md:46; operating-reachy.md:34.
        name: "speak",
        detail:
          "say is a dumb pipe — text in, voice out to the speaker — in either a text-to-speech voice or an offline harmonic one, with no LLM and no senses attached",
      },
      {
        // README.md:47; operating-reachy.md:35-37.
        name: "think out loud",
        detail:
          "think is the cognition loop: it reads the senses, asks an LLM for a first-person thought, speaks it sentence by sentence, and moves its body in step with the words",
      },
      {
        // README.md:48; operating-reachy.md:38-39.
        name: "feel a head pat",
        detail:
          "pat notices a hand on its head from how the pose deviates from what it commanded — no touch sensor — and leans into the touch: lean, nuzzle, settle",
      },
      {
        // README.md:49; operating-reachy.md:40.
        name: "fall asleep",
        detail:
          "sleep decays from alert to drowsy to asleep when left alone, and wakes on speech, a snap, its wake word, or a pat",
      },
      {
        // README.md:29,50; operating-reachy.md:221-241.
        name: "survive a reboot",
        detail:
          "service makes exactly one presence mode boot-persistent through systemd, so the robot comes back on its own after a restart instead of waiting to be launched by hand",
      },
    ] satisfies CapabilityCard[],
  },

  // The complete noun map, faithful to README.md:36-51 — 13 robot nouns plus
  // the introspection row as the 14th, transports quoted verbatim.
  nounMap: {
    eyebrow: "the noun map",
    headline: "One robot, fourteen nouns — and every one of them speaks JSON",
    intro: [
      "This is the entire surface, nothing held back. Fourteen entries: thirteen robot nouns and one row of agent-first introspection that needs no robot at all. Every noun supports --json, and reachy-mini-cli explain <noun> prints its full flag reference.",
      "Read the transport column closely — it is the whole operating model in one word per row. The sense nouns default to the in-process sdk transport; device, app, and move default to http, the daemon's REST API. That split is not an accident; it is the next section.",
    ],
    rows: [
      {
        noun: "daemon",
        does: "start / stop / status the local reachy-mini-daemon process",
        transport: "none — manages the process",
      },
      {
        noun: "device",
        does: "daemon and live robot state (status, state)",
        transport: "http (default)",
      },
      {
        noun: "app",
        does: "list / start / stop daemon apps",
        transport: "http",
      },
      {
        noun: "move",
        does: "one-shot goto / wake / sleep animations",
        transport: "http (default)",
      },
      {
        noun: "demo-mode",
        does: 'always-on "feel alive" idle loop (breathe, glances, sway)',
        transport: "sdk / http",
      },
      {
        noun: "behavior",
        does: "50 Hz engine that composes named behaviors per channel",
        transport: "sdk / http",
      },
      {
        noun: "listen",
        does:
          "two-tier sound orienting (antenna lean → head/body turn); --live folds every sense into one loop",
        transport: "sdk default",
      },
      {
        noun: "vision",
        does: "turn toward motion or light (pure pixel math, no ML)",
        transport: "sdk default",
      },
      {
        noun: "say",
        does: "dumb pipe: text → voice (TTS or offline harmonic) → speaker",
        transport: "sdk default",
      },
      {
        noun: "think",
        does: "LLM cognition loop: speaks and expresses; --export JSONL feed",
        transport: "sdk default",
      },
      {
        noun: "pat",
        does: "feel a head pat and lean into it (no touch sensor)",
        transport: "sdk only",
      },
      {
        noun: "sleep",
        does: "decay to sleep when idle; wake on sound / wake-word / pat",
        transport: "sdk default",
      },
      {
        noun: "service",
        does:
          "boot-persist exactly one presence mode (demo or live) via systemd --user",
        transport: "none — manages systemd",
      },
      {
        noun: "whoami · quickstart · learn · explain · overview · doctor · cli",
        does: "agent-first introspection — no robot needed",
        transport: "—",
      },
    ] satisfies NounRow[],
  },

  // The single-SDK-owner model, narrated over the existing diagram. Sources:
  // operating-reachy.md:47-148 (two single resources, the conflict matrix, the
  // two composition escapes, the flag-file arbitration).
  sdkOwner: {
    eyebrow: "the one model that matters",
    headline: "One robot serves one mind at a time — learn that or fight it",
    intro: [
      "If you take one thing from this page, take this. The CLI will happily let you launch any two nouns at once, but the hardware underneath has two single resources, each with room for exactly one owner. This trips up humans and agents alike, over and over.",
      "The first single resource is the SDK client and its media session: on the sdk transport, listen, think, and sleep each open a single-consumer mic session, and vision and pat read camera frames and head pose through the same one in-process client. So only one sdk-sense noun can own the robot at a time. The second is the head itself — every move, from an idle sway to a sound-orienting turn to an expression, flows through one serial motion queue, one move at a time, so motion is always smooth and never fights itself. Two motion drivers still fight over the same head.",
      "Because both resources are single-owner, you cannot run two sdk-sense nouns as separate processes against one robot. The second one is starved — a stray pat process next to listen gets throttled to about one hertz, far too slow to feel a hand. There are exactly two ways to compose behaviors anyway, and the diagram beside this traces both.",
    ],
    cards: [
      {
        // operating-reachy.md:88-106 — the two single resources.
        name: "two single resources",
        detail:
          "one in-process SDK client with a single-consumer media session, and one serial motion queue for the head — each serves exactly one owner",
      },
      {
        // operating-reachy.md:115 — the five sdk-sense nouns.
        name: "five nouns, one seat",
        detail:
          "listen, think, sleep, vision, and pat are mutually exclusive on the sdk transport — run one sdk-sense owner per robot, never two",
      },
      {
        // operating-reachy.md:129-133 — the #43 fold pattern.
        name: "escape one — fold into one loop",
        detail:
          "listen run --live folds think, vision, and sleep into listen's single loop alongside the head-pat hook: every live sense on one media session, in one process",
      },
      {
        // operating-reachy.md:134-138 — the http escape.
        name: "escape two — put the second noun on http",
        detail:
          "an http-transport noun polls the daemon's DoA route and opens no SDK client at all, so it never competes — the way to layer a second behavior onto the one local owner",
      },
      {
        // operating-reachy.md:139-148 — the flag-file head arbitration.
        name: "the head is arbitrated by priority",
        detail:
          "when senses are folded together, think, pat, and sleep drop flag files the always-alive idle layer reads, yielding the motion channel by rank: sleep over pat over think",
      },
    ] satisfies OwnerCard[],
  },

  // The live senses, folded. Sources: operating-reachy.md:440-489 (the
  // per-noun sense/motion table), 221-241 (boot persistence, one presence per
  // reboot), README.md:110-131 (the folded live loop).
  senses: {
    eyebrow: "the senses, live",
    headline: "One process, every sense — this is the presence the robot boots into",
    intro: [
      "Because only one sdk media owner can run at a time, the supported way to run all the senses at once is a single command — listen run --live — that folds think, vision, and sleep into listen's loop beside the head-pat hook. Every live sense rides the one media session and the one motion queue, in one process, arbitrated by those priority flags. This is exactly the loop the live boot presence runs.",
      "Below is each behavior the folded loop carries. Where a sense is honest about its limits, the card says so — because the robot does too.",
    ],
    cards: [
      {
        // operating-reachy.md:485 (listen two-tier).
        name: "listen — two tiers of reaction",
        detail:
          "tier one leans the antennas toward every sound; tier two turns the head and then the body on speech or a snap — reading real direction-of-arrival, not a guess",
      },
      {
        // operating-reachy.md:486 (vision, pure pixel math).
        name: "vision — sight without a model",
        detail:
          "turns toward motion by frame difference and toward light by brightness centroid — pure pixel math, no ML and no GPU; on http it can report its specs but not move",
      },
      {
        // operating-reachy.md:488 (pat, pose read-back).
        name: "pat — touch without a sensor",
        detail:
          "there is no touch sensor; pat infers a hand from how the actual head pose deviates from the commanded one, then leans, nuzzles, and settles into it",
      },
      {
        // operating-reachy.md:489 (sleep state machine).
        name: "sleep — a real drowsiness curve",
        detail:
          "decays alert to drowsy to asleep when nothing is happening, breathing slower as it fades, and wakes on speech, a snap, its wake word, or a pat",
      },
      {
        // operating-reachy.md:437 (demo-mode idle presence).
        name: "demo-mode — the feel-alive idle",
        detail:
          "the motion-only presence for a robot that just needs to look present: continuous gentle breathing, glances, and antenna sway, with no senses attached",
      },
      {
        // operating-reachy.md:221-268 (service, one presence per reboot).
        name: "service — one presence per reboot",
        detail:
          "boots exactly one presence — the idle demo loop or the folded live loop — through systemd; enabling one disables the sibling, so two presences never fight for the robot",
      },
    ] satisfies SenseCard[],
  },

  // The cognition loop, the harmonic voice, the export feed, the empty-buffer
  // no-op. Sources: think.py:162-171 (the loop + the no-op turn),
  // operating-reachy.md:498-531 (the harmonic voice), export-schema.md +
  // _export.py:53-54 (the '-'-only sink, the exact CLI hint).
  think: {
    eyebrow: "thinking out loud",
    headline: "It reasons, speaks a sentence at a time, and moves as it thinks",
    intro: [
      "think is the noun where the body and the mind meet. Each turn snapshots what the robot just perceived — direction-of-arrival, mic loudness, speech — and asks an LLM for one or two short first-person sentences. The reply is sentence-streamed: the first sentence is synthesized and played while the later ones are still being generated, so thinking and speaking overlap the way they do in a person. Emoji markers in that stream drive calm body poses that arrive timed to the words, and each move goes onto the one serial motion queue. The captured demo runs three gestures against three spoken phrases so you can watch the timing without an LLM in the loop.",
      "It has a second voice for when the first one is unreachable. The default is text-to-speech over an HTTP service, but that service can be down — and when it is, live cognition would otherwise go silent. So the robot also has a harmonic voice: fully offline, deterministic, in-process. It does not read the words; it renders their meaning as a short note-melody in the robot's own identity signature. Today's capture caught this exactly — the TTS endpoint was down, and instead of failing, the robot answered in its own harmonic identity, the emphasis in the text coming through as musical stress.",
      "And you can watch it think from outside. think run --export - streams a newline-delimited JSON feed of what the robot is thinking, saying, and feeling — one object per line, tagged thinking, message, or emotion, each with a timestamp. The renderer lives out of this repo by design: the CLI emits a documented contract, and a separate consumer renders it. Be precise about what ships, though — in 0.31.0 only the stdout sink, spelled '-', is wired. Point --export at a file or an HTTP URL and the CLI says so itself: only '-' (stdout) is supported in this version; HTTP and file sinks are future work. A clean exit-one error, not a broken promise.",
      "One last honesty: the loop does nothing gracefully. When the sense-event buffer is empty, the turn is a no-op — no LLM call, no audio. A bounded think run against a quiet room can finish with zero spoken turns and that is the design, not a failure. It is the same discipline everywhere in this tool: the robot would rather do nothing legibly than fake being busy.",
    ],
  },

  // The agent-first CLI surface. Sources: README.md:205-221 (the introspection
  // verbs + stdout/stderr split + exit codes), the daemon/asoundrc troubleshooting
  // table (operating-reachy.md:391-413), ADR-0001 + operating-reachy.md:162-165
  // (the clean CliError on a bare install), the export sink hint.
  agentFirst: {
    eyebrow: "agent-first, all the way down",
    headline: "Built for an agent to drive — every answer is structured, every failure is a contract",
    intro: [
      "This is not a robot toy with a scripting hook bolted on. It is an agent-first CLI, cited from teken's agent-first foundation, and the same design that makes it pleasant for a person makes it drivable by a model. The introspection verbs — whoami, quickstart, learn, explain, overview, doctor — all work with no robot attached, so an agent can learn the whole surface before it touches hardware.",
      "The contracts underneath are the point. Every command takes --json. Results go to stdout and diagnostics to stderr, never mixed, so a program can read the answer without parsing around chatter. Exit codes mean one thing each: zero for success, one for a user-input error, two for an environment error, three and up reserved. And a failure is never a Python traceback — it is a structured error: line with a hint: line telling you what to do next.",
      "You can see the contract hold on a bare install. Run an sdk-transport noun without the SDK extra and you do not get an ImportError — you get exit two and a hint to install [sdk] or use --transport http. In today's captures the same shape appears for real: the TTS service was down, and the robot returned its clean error-and-hint pair and fell back to the harmonic voice rather than crashing. The failures on this page are the CLI keeping its promises.",
    ],
    cards: [
      {
        // README.md:205-217 — the introspection verbs, no robot needed.
        name: "introspection with no robot",
        detail:
          "whoami, quickstart, learn, explain, overview, and doctor run on any install — an agent reads its own identity, the bring-up sequence, and per-noun docs before a robot is even attached",
      },
      {
        // README.md:219-221 — --json everywhere, the stdout/stderr split.
        name: "--json on every verb",
        detail:
          "structured output on every command, results on stdout and diagnostics on stderr and never mixed, so a program reads the answer cleanly and a human reads the chatter separately",
      },
      {
        // README.md:220-221; operating-reachy.md:394-403 — the exit-code policy.
        name: "exit codes that mean one thing",
        detail:
          "zero success, one user-input error, two environment error, three and up reserved — the same policy across every noun, so a caller branches on the number without scraping text",
      },
      {
        // operating-reachy.md:393-413; _export.py:53-54 — the error:/hint: contract.
        name: "error: and hint:, never a traceback",
        detail:
          "every failure is a structured pair — the TTS-down capture shows it live: a clean error line, a hint to fix it, and a fallback to the harmonic voice instead of a crash",
      },
      {
        // ADR-0001; operating-reachy.md:162-165, 407 — the bare-install CliError.
        name: "a bare install fails cleanly",
        detail:
          "the SDK is an optional extra, lazily imported; run an sdk noun without it and you get exit two with a remediation to install [sdk] or use --transport http — never an ImportError from deep in a library",
      },
    ] satisfies SurfaceCard[],
  },

  // Distilled from the live open-issue list of agentculture/reachy-mini-cli
  // (gh issue list --state open), grouped on 2026-07-17. Every issue linked
  // below was verified open at authoring time; the four themes are the
  // clearest currents in that list, not its entirety — direction, not shipped.
  whatsNext: {
    eyebrow: "what's next",
    headline: "The tracker is public too — this is direction, not a promise",
    intro: [
      "The body is still growing, and its direction is checkable the same way its facts are: on the open tracker. Four currents stand out — and note that everything in this section is open work, not something 0.31.0 ships.",
    ],
    themes: [
      {
        name: "A presence that truly survives a reboot",
        direction:
          "service can already boot-persist one presence, but the lifecycle around it has known gaps. The open work closes them: a service unit that is written but never starts, a daemon noun that cannot restart or stop a service-managed daemon, the underlying fact that the daemon does not survive a host restart on its own, and a followable log stream to see why when it does not.",
        issues: [
          {
            number: 62,
            title:
              "`service` can write a `reachy-daemon.service` that never starts (203/EXEC) — bare-name ExecStart fallback",
            url: "https://github.com/agentculture/reachy-mini-cli/issues/62",
          },
          {
            number: 61,
            title:
              "`daemon` noun cannot restart or stop a service-managed daemon — no `restart` verb, and `stop`/`status` are pidfile-only",
            url: "https://github.com/agentculture/reachy-mini-cli/issues/61",
          },
          {
            number: 21,
            title: "Daemon does not survive host restart — must be started manually",
            url: "https://github.com/agentculture/reachy-mini-cli/issues/21",
          },
          {
            number: 10,
            title: "Add `daemon logs [--follow]` (daemon log websocket + tracked log file)",
            url: "https://github.com/agentculture/reachy-mini-cli/issues/10",
          },
        ],
      },
      {
        name: "Sight that reaches cognition",
        direction:
          "Vision today is a standalone reflex — turn toward motion or light with pure pixel math. The open work makes it real on hardware and wires it into thinking: the live reachy_mini camera-frame API, camera cues flowing into the think event feed so the robot reasons about what it sees, and the foundational camera support they both rest on.",
        issues: [
          {
            number: 28,
            title:
              "vision run --transport sdk: wire the real reachy_mini camera frame API (live hang found on hardware)",
            url: "https://github.com/agentculture/reachy-mini-cli/issues/28",
          },
          {
            number: 32,
            title: "think: wire vision cues (motion + light) into the cognition event feed",
            url: "https://github.com/agentculture/reachy-mini-cli/issues/32",
          },
          {
            number: 22,
            title: "Add basic vision (camera) support to the CLI",
            url: "https://github.com/agentculture/reachy-mini-cli/issues/22",
          },
        ],
      },
      {
        name: "From heard to addressed — live conversation",
        direction:
          "The robot already hears words; holding a conversation is the next leg. The open work turns orientation into address: a head-turn when it hears its own name, durable audio-service addressing, LLM-judged context for what is meant for it, live-verifying the wake word once the STT service is healthy, and a pluggable wake-word backend.",
        issues: [
          {
            number: 55,
            title:
              "Live conversation: head-turn-on-name, durable audio-service addressing, LLM-judged context",
            url: "https://github.com/agentculture/reachy-mini-cli/issues/55",
          },
          {
            number: 39,
            title:
              "Live-verify sleep wake-word once model-gear Parakeet STT is healthy (blocked-by model-gear#39/#40)",
            url: "https://github.com/agentculture/reachy-mini-cli/issues/39",
          },
          {
            number: 36,
            title:
              "sleep: pat-only wake when audio-listening is off; pluggable wake-word backend (external HTTP STT default + on-box openwakeword [cpu])",
            url: "https://github.com/agentculture/reachy-mini-cli/issues/36",
          },
        ],
      },
      {
        name: "One supervisor, one mesh",
        direction:
          "The single-SDK-owner model wants to become code, not just a rule. The open work proposes a unified real-mode supervisor that owns the single sdk session, a shared process-supervisor to de-duplicate the motion and vision supervisors, an arbitration so demo-mode and reachy_nova stop fighting over the head, and mesh awareness that publishes robot and daemon liveness to the Culture mesh — the spark-reachy use-case.",
        issues: [
          {
            number: 45,
            title: "Redesign strategy: a unified real-mode supervisor that owns the single sdk session",
            url: "https://github.com/agentculture/reachy-mini-cli/issues/45",
          },
          {
            number: 30,
            title:
              "Extract a shared process-supervisor to de-duplicate reachy.motion / reachy.vision supervisors",
            url: "https://github.com/agentculture/reachy-mini-cli/issues/30",
          },
          {
            number: 12,
            title:
              "`demo-mode` and reachy_nova both drive the robot — define motion ownership so they don't fight",
            url: "https://github.com/agentculture/reachy-mini-cli/issues/12",
          },
          {
            number: 14,
            title:
              "Mesh awareness: publish robot/daemon liveness to the Culture mesh (the `spark-reachy` use-case)",
            url: "https://github.com/agentculture/reachy-mini-cli/issues/14",
          },
        ],
      },
    ] satisfies NextTheme[],
  },

  closing: {
    paragraphs: [
      "reachy-mini-cli is open source, MIT, and running for real — the captures on this page are a live robot's own sessions, taken today on the rig we call spark. Every fact above traces to the public repo, the packaging metadata, the export schema, or the CLI's own output, and where a service was down you saw the honest fallback, not a staged success.",
      "That is the whole thesis of the body: the same agent-first discipline the rest of the family runs on — structured output, honest failures, one clear owner of a shared resource — made physical, in a robot that leans toward you when you speak and answers in its own voice even when the network does not. Install it, bring the daemon up, and say something near it.",
    ],
    repoUrl: "https://github.com/agentculture/reachy-mini-cli",
    repoCta: "Read the code",
    pypiUrl: "https://pypi.org/project/reachy-mini-cli/",
    pypiCta: "uv tool install 'reachy-mini-cli[daemon]'",
  },
};

export default reachyMiniCli;
