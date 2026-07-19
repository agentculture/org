import {
  presentationEvidence,
  presentationProjects,
  presentations,
  type PresentationEvidenceSource,
} from "./presentations";

export type PresentationEvidenceId =
  (typeof presentationEvidence)[number]["id"];

export type TalkBeatId =
  | "three-layer-thesis"
  | "agent-as-mind"
  | "symbolic-nervous-system"
  | "robot-as-body"
  | "bounded-learning"
  | "perceive-to-retain"
  | "consequences-and-non-claims"
  | "sources-and-repositories";

export interface TalkDefinition {
  term: string;
  meaning: string;
}

export interface TalkPoint {
  label: string;
  detail: string;
  status?: "shipped" | "api-only" | "boundary" | "future" | "synthesis";
}

export interface TalkBeat {
  id: TalkBeatId;
  eyebrow: string;
  headline: string;
  paragraphs: readonly string[];
  points: readonly TalkPoint[];
  sourceIds: readonly PresentationEvidenceId[];
  definitions?: readonly TalkDefinition[];
}

export interface TalkEvidenceBaseline {
  label: string;
  sourceId: PresentationEvidenceId;
}

const sourceIds = <const T extends readonly PresentationEvidenceId[]>(
  ...ids: T
): T => ids;

export const mindNervousSystemBodyHero =
  "The agent is the mind. The code is the nervous system. The robot is the body.";

export const talkDefinitions = [
  {
    term: "Harness",
    meaning:
      "The agent loop and its tool boundary: it gathers context, calls a model, and dispatches only the actions its tools permit.",
  },
  {
    term: "Model",
    meaning:
      "The neural inference system inside the harness. It interprets context and proposes what to say or do; it does not own the motors.",
  },
  {
    term: "Symbolic nervous system",
    meaning:
      "The robot-specific code that turns sensor readings, rules, safety limits, memory, and commands into grounded symbols and controlled motion.",
  },
  {
    term: "Intent",
    meaning:
      "A named, validated request for the symbolic nervous system to sustain or perform—not a direct write from a model to hardware.",
  },
  {
    term: "Retained adaptation",
    meaning:
      "An observable artifact that survives the moment that produced it, such as a rule, behavior record, validated extension, event log, or map.",
  },
  {
    term: "Body",
    meaning:
      "The physical hardware: sensors, structure, servos, speaker, and every other part that can be measured or moved.",
  },
] as const satisfies readonly TalkDefinition[];

export const talkEvidenceBaselines = [
  {
    label: "Reachy Mini CLI public main v0.37.0",
    sourceId: "reachy-readme",
  },
  {
    label: "ARM101 CLI origin/main 0.22.1",
    sourceId: "arm101-readme",
  },
] as const satisfies readonly TalkEvidenceBaseline[];

export const mindNervousSystemBodyBeats = [
  {
    id: "three-layer-thesis",
    eyebrow: "beat 1 · the thesis",
    headline:
      "The agent is the mind. The code is the nervous system. The robot is the body.",
    definitions: talkDefinitions,
    paragraphs: [
      "Start with roles, not mystique. The mind interprets a situation and proposes an action. The symbolic nervous system translates between that proposal and one particular machine. The body is the physical hardware that senses, moves, resists, and can be damaged.",
      "This presentation uses neurosymbolic as its own architectural synthesis: neural inference in a harness-plus-model mind, joined to deterministic robot code that names perceptions, checks requests, arbitrates motion, and retains explicit artifacts. Neither source project describes itself with that term, and these roles are not a claim of sentience.",
    ],
    points: [
      {
        label: "Mind",
        detail:
          "A harness plus a model can reason over context, but it reaches the machine only through allowed tools and intents.",
        status: "synthesis",
      },
      {
        label: "Nervous system",
        detail:
          "Robot-specific symbolic code makes perception, reflexes, arbitration, safety, and retained state explicit.",
        status: "synthesis",
      },
      {
        label: "Body",
        detail:
          "Physical Reachy Mini and SO-101 hardware supplies the measurable world in which the architecture has consequences.",
        status: "synthesis",
      },
    ],
    sourceIds: sourceIds("reachy-readme", "arm101-readme"),
  },
  {
    id: "agent-as-mind",
    eyebrow: "beat 2 · agent as mind",
    headline: "A mind is a harness plus a model—not a motor controller",
    paragraphs: [
      "A model alone is a prediction engine. The harness gives it a working loop: collect events, construct context, ask for a response, expose a bounded tool set, validate the result, and report what happened. Together they form the agent role in this presentation.",
      "Reachy's external `agent attach` client makes that boundary concrete. It reads the deterministic runtime feed, turns events into cues for a tool-use model, validates four intent tools, and writes atomic requests to the intent spool. It never opens the robot SDK, and its speech and pose tools are publish-only. The 50 Hz runtime keeps ticking when the client detaches.",
      "That external client is not Reachy's folded `listen --live --cognition agent` process. Both use model-backed tool cognition, but they attach to different seams and must stay separate when we discuss extension and memory later.",
    ],
    points: [
      {
        label: "Harness",
        detail:
          "Context assembly, turn-taking, tool exposure, validation, dispatch, and feedback around a model.",
        status: "synthesis",
      },
      {
        label: "Model",
        detail:
          "Neural reasoning proposes actions inside that boundary; it does not bypass the symbolic runtime.",
        status: "synthesis",
      },
      {
        label: "External attach",
        detail:
          "Runtime events flow in and durable, catalog-validated intents flow out; direct hardware ownership stays elsewhere.",
        status: "shipped",
      },
    ],
    sourceIds: sourceIds(
      "reachy-agent-attach",
      "reachy-operating-guide",
      "reachy-symbolic-runtime-delivery",
    ),
  },
  {
    id: "symbolic-nervous-system",
    eyebrow: "beat 3 · code as nervous system",
    headline: "The nervous system turns thought into grounded symbols",
    paragraphs: [
      "Robot-specific code is the symbolic nervous system because it gives physical signals names and consequences. A direction of arrival becomes a sense event. A declarative rule can react or inhibit. An intent is checked against a catalog. Arbitration chooses one owner per motion channel. Only then does the physical hardware receive motion.",
      "Reachy's behavior engine runs that work at 50 Hz with a passive feel-alive layer, declarative rules and modes, a durable intent spool, structured runtime events, and per-channel arbitration. The loop is deterministic and can run with zero LLM calls, so presence and reflexes do not disappear when no agent is attached.",
      "This layer is not the neural AI and it is not merely plumbing. It is the machine-specific knowledge that makes a general reasoner grounded, reactive, inspectable, and constrained on this physical platform.",
    ],
    points: [
      {
        label: "Sense",
        detail:
          "A raw reading becomes a typed event that rules, operators, and an attached agent can interpret consistently.",
        status: "shipped",
      },
      {
        label: "Reflex",
        detail:
          "Declarative rules and modes can react or inhibit without waiting for neural inference.",
        status: "shipped",
      },
      {
        label: "Intent",
        detail:
          "A validated, durable request enters the same tick seam as other behaviors and still has to win arbitration.",
        status: "shipped",
      },
    ],
    sourceIds: sourceIds(
      "reachy-readme",
      "reachy-operating-guide",
      "reachy-symbolic-runtime-delivery",
      "reachy-agent-attach",
    ),
  },
  {
    id: "robot-as-body",
    eyebrow: "beat 4 · robot as body",
    headline: "Two physical bodies reveal two kinds of machine knowledge",
    paragraphs: [
      "Reachy Mini's physical hardware is expressive: a movable head, antennas and body base, a microphone array, camera, and speaker. Its nervous system is organized around continuous presence—senses become events, behaviors compete for channels, and an agent can attach without taking ownership of the SDK.",
      "The SO-101 arm's physical hardware poses a different problem. ARM101 CLI exposes agent-readable contracts around consent-gated motion, torque ownership, overload-aware movement, contact inference, append-only exploration logs, and a persisted reachability map. Its nervous system is explicit about what was commanded, what was measured, and which safety action actually succeeded.",
      "Those mechanisms narrow risk; they do not make motion inherently safe. ARM101 infers contact from servo load and stall behavior, not from a tactile sensor, and the limitations below are part of the architecture rather than footnotes.",
    ],
    points: [
      {
        label: "Contact is inferred",
        detail:
          "A reading counts as contact only when present load crosses a threshold and the joint has stopped advancing; load alone is insufficient, and not every physical contact is guaranteed to be detected.",
        status: "boundary",
      },
      {
        label: "Thresholds remain empirical",
        detail:
          "Only shoulder lift and gripper had a hard numeric band in the recorded validation; four per-joint defaults remain estimates pending physical re-validation.",
        status: "boundary",
      },
      {
        label: "Release needs a working bus",
        detail:
          "Abnormal exits attempt per-motor torque release, but losing the physical bus removes the software's channel to the servos, so release cannot be guaranteed.",
        status: "boundary",
      },
      {
        label: "A clean command can keep holding",
        detail:
          "Successful gentle motion may deliberately hold torque so the arm or gripper keeps the requested state; clean exit is not the same as limp.",
        status: "boundary",
      },
      {
        label: "The map has integrity and consumption limits",
        detail:
          "Recorded grid cells can diverge from the physical six-joint pose as limp joints sag, so the map is not rigorous 6-DOF ground truth; `arm flex` does not consume it to gate targets.",
        status: "boundary",
      },
    ],
    sourceIds: sourceIds(
      "reachy-readme",
      "reachy-operating-guide",
      "arm101-readme",
      "arm101-hardware-validation",
      "arm101-gentle-motion",
      "arm101-safety",
      "arm101-reachability-map",
    ),
  },
  {
    id: "bounded-learning",
    eyebrow: "beat 5 · a bounded learning ladder",
    headline: "Learning means leaving a useful, inspectable trace behind",
    paragraphs: [
      "Use learning carefully. Here it means retained adaptation: an explicit artifact or constrained extension path that survives the event that produced it and can be inspected later. It does not mean either robot updates model weights online.",
      "The ladder starts with persisted rules and modes, then observations and maps, then declarative behavior records, and finally generated code that must pass a validator before activation. Each rung gains flexibility by leaving a stronger review burden behind.",
      "Nothing in this evidence demonstrates model-weight training, an ARM learned neural policy, or unconstrained self-modification. Neural inference may propose; the symbolic nervous system decides what form can be retained and what is allowed to run.",
    ],
    points: [
      {
        label: "1 · Rules and modes",
        detail:
          "Reachy's authored declarative configuration persists named reactions, inhibitions, and operating modes without embedding executable code.",
        status: "shipped",
      },
      {
        label: "2 · Observations and maps",
        detail:
          "ARM exploration keeps an append-only JSONL source of truth and derives a compact reachability map that can be resumed and queried offline.",
        status: "shipped",
      },
      {
        label: "3 · Declarative behavior memory",
        detail:
          "Reachy stash records persist a known generator plus typed parameters and explanation, but the seam is Python API only—not a CLI noun or agent tool.",
        status: "api-only",
      },
      {
        label: "4 · Validated generated extension",
        detail:
          "Reachy's folded agent cognition can ask a coder model for a reaction seam; AST validation is fail-closed before generated code is auto-activated.",
        status: "shipped",
      },
    ],
    sourceIds: sourceIds(
      "reachy-operating-guide",
      "reachy-forge-activation",
      "reachy-forge-validation",
      "reachy-stash-record",
      "arm101-readme",
      "arm101-hardware-validation",
      "arm101-reachability-map",
    ),
  },
  {
    id: "perceive-to-retain",
    eyebrow: "beat 6 · perceive to retain",
    headline: "Trace four honest paths—do not invent one learning loop",
    paragraphs: [
      "A neat diagram tempts us to draw one circle: perceive, reason, act, remember, repeat. The shipped evidence is more interesting because it contains four distinct tracks with missing connectors left visible.",
      "Reachy's external attach track is a reactive control loop, not a learning loop. Runtime events reach a harness and model; validated intents return through a durable spool; the engine applies rules and arbitration before motion. The attached client has no forge or stash tools.",
      "The other three tracks retain artifacts, but they are not wired together: forge auto-activation belongs to folded live cognition; stash is reachable through the Python API; and ARM exploration produces a map that current flex motion does not consume. Joining those tracks would be future integration, not a shipped autonomous loop.",
    ],
    points: [
      {
        label: "External agent attach",
        detail:
          "runtime events → harness plus model → validated intent → spool → tick driver → arbitration → physical motion",
        status: "shipped",
      },
      {
        label: "Folded-cognition forge",
        detail:
          "live sense events → folded tool-use agent → coder-model artifact → fail-closed AST validation → auto-activation on the next turn",
        status: "shipped",
      },
      {
        label: "Behavior stash",
        detail:
          "typed declarative record → persisted semantic index → later search and application through the Python API",
        status: "api-only",
      },
      {
        label: "ARM map production",
        detail:
          "measured position plus load/stall inference → append-only events → derived map; map-gated flex remains an unshipped connector",
        status: "future",
      },
    ],
    sourceIds: sourceIds(
      "reachy-agent-attach",
      "reachy-operating-guide",
      "reachy-forge-activation",
      "reachy-forge-validation",
      "reachy-stash-record",
      "arm101-readme",
      "arm101-hardware-validation",
      "arm101-reachability-map",
    ),
  },
  {
    id: "consequences-and-non-claims",
    eyebrow: "beat 7 · consequences and limits",
    headline: "The separation earns reactivity, safety, and honest limits",
    paragraphs: [
      "Separating mind, nervous system, and physical hardware lets each layer fail differently. Reachy's deterministic runtime can stay present without neural services. An attached model proposes intents without becoming a second hardware owner. ARM101 can record measurements and report incomplete release instead of claiming safety it could not verify.",
      "It also makes memory inspectable. Rules, spool commands, behavior records, JSONL observations, generated artifacts, and maps can be named, checked, rejected, replayed, or removed. That is a more useful claim than saying the robot simply learns.",
      "The limits are equally important: this is an architectural comparison, not proof of sentience, a formal hybrid-reasoning algorithm, online neural training, universal contact detection, rigorous 6-DOF truth, shared code, or one autonomous closed learning loop.",
    ],
    points: [
      {
        label: "Reactive without pretending",
        detail:
          "Deterministic senses, rules, arbitration, and safety paths can respond continuously even when a model is absent or detached.",
        status: "synthesis",
      },
      {
        label: "Smart without direct ownership",
        detail:
          "The model can interpret context and propose named actions while validation and arbitration remain in robot-specific code.",
        status: "synthesis",
      },
      {
        label: "Learning without neural-training claims",
        detail:
          "Retained artifacts and constrained extensions are observable adaptation; no source establishes online model-weight updates.",
        status: "boundary",
      },
    ],
    sourceIds: sourceIds(
      "reachy-symbolic-runtime-delivery",
      "reachy-agent-attach",
      "reachy-operating-guide",
      "arm101-hardware-validation",
      "arm101-safety",
    ),
  },
  {
    id: "sources-and-repositories",
    eyebrow: "beat 8 · source and repository close",
    headline: "Keep the synthesis—and keep the two systems separate",
    paragraphs: [
      "The architecture rhymes, but the products do not merge. Reachy Mini CLI and ARM101 CLI target different physical hardware, expose different robot-specific nervous systems, and have no shared runtime or shipped cross-repository integration.",
      "Follow each repository to see its current work, use the pinned evidence beside each technical beat to audit the claims made here, and visit the existing Reachy Mini agent page for the deeper single-project story. The comparison belongs to this presentation; the source projects remain independently grounded.",
    ],
    points: [
      {
        label: "Public source",
        detail:
          "Factual links are pinned to the reviewed commits; repository-home links intentionally follow the projects' latest state.",
        status: "boundary",
      },
      {
        label: "Related AgentCulture page",
        detail:
          "The existing Reachy Mini agent profile remains the deeper product tour at /agents/reachy-mini-cli/.",
        status: "shipped",
      },
      {
        label: "Integration boundary",
        detail:
          "The presentation connects an architectural idea; it does not claim shared code, a shared runtime, or a shipped integration.",
        status: "boundary",
      },
    ],
    sourceIds: sourceIds("reachy-readme", "arm101-readme"),
  },
] as const satisfies readonly TalkBeat[];

export const mindNervousSystemBodyClose = {
  repositoryHomes: presentationProjects,
  relatedAgentPage: {
    label: "Reachy Mini CLI on AgentCulture",
    href: "/agents/reachy-mini-cli/",
  },
  boundary:
    "This is an architectural comparison: the repositories have no shared runtime and no cross-repository integration shipped.",
} as const;

export const mindNervousSystemBodyTalk = {
  card: presentations[0],
  hero: mindNervousSystemBodyHero,
  evidenceBaselines: talkEvidenceBaselines,
  beats: mindNervousSystemBodyBeats,
  close: mindNervousSystemBodyClose,
} as const;

/** Resolve only ids admitted by the immutable catalog ledger. */
export function evidenceFor(
  ids: readonly PresentationEvidenceId[],
): readonly PresentationEvidenceSource[] {
  return ids.map((id) => {
    const source = presentationEvidence.find((candidate) => candidate.id === id);
    if (!source) {
      throw new Error(`Unknown presentation evidence id: ${id}`);
    }
    return source;
  });
}
