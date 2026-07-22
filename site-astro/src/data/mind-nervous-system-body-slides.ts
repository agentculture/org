// Slide dataset for the symbolic presentation deck (/presentations/mind-nervous-system-body/).
//
// THE REFRAME (org#21): the deck's protagonist flips from "an agent entering
// a robot" to "a robot architecture that accepts any intelligence". It leads
// with the operational boundary — an interchangeable, optional agent talking
// to a stable CLI control plane, in front of a persistent behavior runtime
// that stays alive with no model attached — rather than the mind/nervous
// system/body metaphor. That metaphor, and the article's full evidence-pinned
// beat text, stay put in `mind-nervous-system-body.ts`; this module no longer
// derives from it and does not carry per-slide evidence ids. Sources are
// subordinate here: see `deckSources` below (repo homes + one dated note),
// consumed once on the deck's close slide, never per-slide.
//
// DECK SHAPE — at most 8 primary beats (org#21's sequence), at most 10
// slides total. A beat spans two slides only where a robot photo demands a
// second slide (Reachy Mini's full stack = beat 5, ARM101's contrast = beat
// 7); every other beat is exactly one slide. `beat` (1-8) is the field that
// groups slides into beats — count `new Set(slides.map(s => s.beat)).size`
// to get the primary-beat count, and `slides.length` for the slide count.
// The thesis headline sits on slide index 1 (the second slide, id "thesis")
// and is the verbatim string "A CLI for intelligence. A runtime for
// embodiment." — downstream tests pin both the position and the exact text.
//
// Slide sequence (id · kind · beat):
//   1. opener                  · opener   · beat 1 — the problem: Model -> SDK
//      -> motors couples nondeterministic reasoning to hardware ownership.
//   2. thesis                  · thesis   · beat 2 — the verbatim headline;
//      names the agent-harness layer (Claude Code / Codex / Colleague /
//      custom / none) in one line, and that the agent is optional/replaceable.
//   3. cli-control-plane       · diagram  · beat 3 — the CLI as the robot's
//      control plane; carries `diagram: true` so the renderer (t6) embeds
//      the five-layer architecture component (t2) beside the copy. Names all
//      four control surfaces (rules, actions, ad-hoc operational commands,
//      daemon or runtime lifecycle) as slide content.
//   4. runtime-nervous-system  · contrast · beat 4 — the runtime as the
//      robot's nervous system (senses, rules, intent admission, per-channel
//      arbitration; 50 Hz ALWAYS labeled design rate); carries the ROS aside
//      and `contrastRows` (the CLI-vs-runtime table).
//   5. reachy-mini-stack       · robot    · beat 5 — Reachy Mini as the
//      complete implementation (hero photo).
//   6. reachy-mini-commands    · commands · beat 5 — the verbatim bring-up
//      command sequence (action photo).
//   7. rules-example           · rules    · beat 6 — a small [[react]] +
//      [[inhibit]] rules.toml excerpt; the agent authors/selects bounded
//      rules, the runtime executes them deterministically.
//   8. arm101-cli-discipline   · robot    · beat 7 — ARM101: same CLI
//      contract, no shipped runtime (hero photo).
//   9. arm101-commands         · commands · beat 7 — the verbatim
//      read/flex/explore command sequence, dry-run vs --apply (action photo).
//  10. close                   · close    · beat 8 — "Replace the model —
//      the runtime remains. Replace the robot — the pattern remains."
//
// Photo slots: each of the four `PhotoSlotId`s (reachy-mini-hero,
// reachy-mini-action, so101-hero, so101-action) is referenced EXACTLY once,
// on slides 5/6 and 8/9 respectively.
//
// Terminology discipline (never conflate): "behavior engine" / "behavior
// runtime" / "runtime" name the fixed-rate symbolic loop; "daemon" names only
// the lower-level `reachy-mini-daemon` device service. ARM101 slides never
// draw or claim a persistent runtime — only the CLI contract (JSON output,
// dry-run unless --apply, torque ownership, overload-aware motion).
//
// `DeckSlide` fields, by kind:
//   - id/kind/beat/eyebrow/headline/spokenLine — present on every slide.
//     `headline` is a few words (verbatim on slides 2 and 10, per org#21);
//     `spokenLine` is the speaker's cue, at most 2 sentences, never a
//     paragraph.
//   - robot?/photoId? — present when the slide anchors one robot's photo
//     slot (kind "robot" and the two robot-scoped "commands" slides here).
//   - diagram? — `true` only on the "diagram"-kind slide; tells the renderer
//     to embed the five-layer architecture component next to the copy.
//   - contrastRows? — present only on the "contrast"-kind slide; a short
//     CLI-vs-runtime table (`ContrastRow[]`).
//   - commandLines? — present only on "commands"-kind slides; the verbatim
//     CLI invocations to render in an ordered code block, one per line.
//   - rulesToml? — present only on the "rules"-kind slide; a verbatim
//     rules.toml excerpt (`[[react]]` + `[[inhibit]]`) to render in a code
//     block.
//
// Runtime note: this module imports ONLY types from its neighbours, so type
// stripping erases every import and the module loads under plain
// `node --experimental-strip-types` with no module-resolution hop. Every
// value below (including `deckSources`) is self-contained — nothing is
// re-exported from a sibling data module.

import type {
  PresentationProjectId,
  PresentationProjectLabel,
} from "./presentations";
import type { PhotoSlotId } from "./presentation-photos";

/** A slide's structural role in the deck; see the file header for per-kind fields. */
export type DeckSlideKind =
  | "opener"
  | "thesis"
  | "diagram"
  | "contrast"
  | "robot"
  | "commands"
  | "rules"
  | "close";

/** The two physical bodies; a robot-anchored slide names exactly one. */
export type DeckRobot = "reachy-mini" | "so101";

/** One row of the CLI-vs-runtime contrast table (see the "contrast" slide). */
export interface ContrastRow {
  /** The dimension being contrasted, e.g. "Lifetime". */
  dimension: string;
  /** How the CLI behaves along that dimension. */
  cli: string;
  /** How the runtime behaves along that dimension. */
  runtime: string;
}

/**
 * One full-viewport slide. The renderer draws big imagery/copy from
 * `headline`; the speaker talks `spokenLine`. `beat` groups slides into the
 * deck's <=8 primary beats. See the file header for which optional fields
 * apply to which `kind`.
 */
export interface DeckSlide {
  /** Stable slide id (used for anchors and the trace table). */
  id: string;
  /** Structural role; determines which optional fields are populated. */
  kind: DeckSlideKind;
  /** Which of the deck's <=8 primary beats this slide belongs to (1-indexed). */
  beat: number;
  /** Present iff the slide anchors one robot's photo slot. */
  robot?: DeckRobot;
  /** Present iff the slide anchors one robot's photo slot. */
  photoId?: PhotoSlotId;
  /** Small structural label above the headline. */
  eyebrow: string;
  /** A few words — the symbol the slide anchors. Verbatim on slides 2 and 10. */
  headline: string;
  /** At most 2 sentences the speaker talks over the slide. */
  spokenLine: string;
  /** Present iff `kind === "diagram"` — embed the five-layer architecture component. */
  diagram?: true;
  /** Present iff `kind === "contrast"` — the CLI-vs-runtime table. */
  contrastRows?: readonly ContrastRow[];
  /** Present iff `kind === "commands"` — verbatim CLI invocations, one per line. */
  commandLines?: readonly string[];
  /** Present iff `kind === "rules"` — a verbatim rules.toml excerpt. */
  rulesToml?: string;
}

/** Display label per robot, for the renderer. */
export const robotLabel = {
  "reachy-mini": "Reachy Mini",
  so101: "SO-101",
} as const satisfies Record<DeckRobot, string>;

/** Photo slots each robot owns — a robot-anchored slide may only use its own slot. */
export const photoSlotsByRobot = {
  "reachy-mini": ["reachy-mini-hero", "reachy-mini-action"],
  so101: ["so101-hero", "so101-action"],
} as const satisfies Record<DeckRobot, readonly PhotoSlotId[]>;

export const mindNervousSystemBodySlides = [
  {
    id: "opener",
    kind: "opener",
    beat: 1,
    eyebrow: "the problem",
    headline: "The agent should not own the motors",
    spokenLine:
      "Model to SDK to motors is a straight line that couples nondeterministic reasoning to hardware ownership. The model should propose; robot software should decide and execute.",
  },
  {
    // Verbatim thesis headline — pinned to slide index 1 by contract.
    id: "thesis",
    kind: "thesis",
    beat: 2,
    eyebrow: "the thesis",
    headline: "A CLI for intelligence. A runtime for embodiment.",
    spokenLine:
      "The agent — Claude Code, Codex, Colleague, a custom tool-use agent, or none — is optional and replaceable; the CLI is the stable control plane, the behavior runtime keeps the robot continuously alive, and the daemon owns the hardware underneath it.",
  },
  {
    id: "cli-control-plane",
    kind: "diagram",
    beat: 3,
    diagram: true,
    eyebrow: "the control plane",
    headline: "One deterministic language, four surfaces",
    spokenLine:
      "The CLI is one deterministic language for humans, agents, scripts, and CI — structured args in, structured stdout out, diagnostics on stderr, an exit code, and dry-run until an explicit apply. Through it you reach the same four surfaces whether a human types them or an agent calls them: rules, actions, ad-hoc operational commands, and daemon or runtime lifecycle control.",
  },
  {
    id: "runtime-nervous-system",
    kind: "contrast",
    beat: 4,
    eyebrow: "the nervous system",
    headline: "Continuously alive, with or without a mind attached",
    spokenLine:
      "The behavior runtime is a deterministic fixed-rate loop (50 Hz design rate) composing senses, rules, intent admission, and per-channel arbitration — it stays operational with no model attached. The layering is deliberately familiar — ros2 CLI, nodes, drivers, behavior trees — and the contribution here is the agent-facing CLI contract plus the machine-checked zero-LLM runtime boundary.",
    contrastRows: [
      {
        dimension: "Lifetime",
        cli: "short-lived, one invocation",
        runtime: "long-lived, continuous process",
      },
      {
        dimension: "Invocation",
        cli: "explicit, one call per intent",
        runtime: "continuous execution, no calling required",
      },
      {
        dimension: "Scope",
        cli: "lifecycle control plus direct operational intervention",
        runtime: "sensing, arbitration, and behavior execution",
      },
      {
        dimension: "Cadence",
        cli: "one command at a time",
        runtime: "a persistent loop",
      },
    ],
  },
  {
    id: "reachy-mini-stack",
    kind: "robot",
    beat: 5,
    robot: "reachy-mini",
    photoId: "reachy-mini-hero",
    eyebrow: "the body · Reachy Mini",
    headline: "Reachy Mini: the complete implementation",
    spokenLine:
      "Every layer ships and runs on this one robot — CLI, behavior runtime, device daemon, hardware. The agent is the only optional part.",
  },
  {
    id: "reachy-mini-commands",
    kind: "commands",
    beat: 5,
    robot: "reachy-mini",
    photoId: "reachy-mini-action",
    eyebrow: "commands · Reachy Mini",
    headline: "Bring the whole stack up, layer by layer",
    spokenLine:
      "One sequence takes the robot from a cold daemon to a running behavior engine with its rules validated and an agent attached over the runtime feed. Daemon lifecycle, ad-hoc status, rules, and agent attach — the same CLI, every time.",
    commandLines: [
      "reachy-mini-cli daemon start",
      "reachy-mini-cli device status",
      "reachy-mini-cli behavior rules check --json",
      "reachy-mini-cli behavior engine start",
      "reachy-mini-cli behavior status --json",
      "reachy-mini-cli behavior reload",
      "reachy-mini-cli agent attach --feed runtime.jsonl --export -",
    ],
  },
  {
    id: "rules-example",
    kind: "rules",
    beat: 6,
    eyebrow: "rules are executable culture",
    headline: "Rules are executable culture",
    spokenLine:
      "The agent authors or selects bounded rules — a reaction, a cooldown, an inhibition. The runtime executes them deterministically, every tick, with no model in the loop.",
    rulesToml: `[[react]]
id = "pat-acknowledge"
when = { field = "pat", op = "is_true" }
run = "pet-reaction"
cooldown_s = 5.0

[[inhibit]]
id = "quiet-while-patted"
when = { field = "pat", op = "is_true" }
disable = ["feel-alive", "antenna-sway"]
cooldown_s = 2.0`,
  },
  {
    id: "arm101-cli-discipline",
    kind: "robot",
    beat: 7,
    robot: "so101",
    photoId: "so101-hero",
    eyebrow: "the body · SO-101",
    headline: "ARM101: same CLI discipline, a different runtime maturity",
    spokenLine:
      "Every arm command speaks the identical contract — JSON output, dry-run unless --apply, torque ownership, overload-aware motion. ARM101 does not ship a persistent runtime; there is no behavior engine here.",
  },
  {
    id: "arm101-commands",
    kind: "commands",
    beat: 7,
    robot: "so101",
    photoId: "so101-action",
    eyebrow: "commands · SO-101",
    headline: "Read, flex, explore — one process at a time",
    spokenLine:
      "A run without --apply always prints a dry-run plan first, so --apply is the only way to actually move the arm. This is the CLI contract standing alone, with no continuously alive process behind it.",
    commandLines: [
      "arm101 arm read --json",
      "arm101 arm flex",
      "arm101 arm flex --apply",
      "arm101 arm explore --apply",
    ],
  },
  {
    id: "close",
    kind: "close",
    beat: 8,
    eyebrow: "the boundary: interchangeable intelligence, persistent embodiment",
    headline:
      "Replace the model — the runtime remains. Replace the robot — the pattern remains.",
    spokenLine:
      "Every robot should expose a CLI for intelligence and a runtime for embodiment.",
  },
] as const satisfies readonly DeckSlide[];

/** One source project entry in `deckSources` — repo-home link, not a pinned blob. */
export interface DeckSourceProject {
  id: PresentationProjectId;
  label: PresentationProjectLabel;
  /** Repository home — intentionally follows the project's latest state. */
  repositoryUrl: `https://github.com/${string}/${string}`;
}

/**
 * The deck's subordinate sources note, rendered once on the close slide (not
 * per-slide): repo-home links for both projects plus one dated note. This is
 * the deck's evidence surface — the article keeps the strict, commit-pinned
 * ledger in `presentations.ts` / `mind-nervous-system-body.ts`, untouched.
 */
export const deckSources = {
  projects: [
    {
      id: "reachy-mini-cli",
      label: "Reachy Mini CLI",
      repositoryUrl: "https://github.com/agentculture/reachy-mini-cli",
    },
    {
      id: "arm101-cli",
      label: "ARM101 CLI",
      repositoryUrl: "https://github.com/agentculture/arm101-cli",
    },
  ],
  note: "reachy-mini-cli v0.42.0 retired the AI-first flow — the robot's presence is the symbolic runtime.",
} as const satisfies {
  projects: readonly DeckSourceProject[];
  note: string;
};
