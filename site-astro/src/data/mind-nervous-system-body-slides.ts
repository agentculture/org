// Slide dataset for the symbolic presentation deck (/presentations/mind-nervous-system-body/).
//
// SIX-SLIDE SHAPE (org#23): the ten-slide, eight-beat deck (org#21's
// reframe) compresses into six visual, declarative slides — one hero line
// each, the architecture diagram kept at the center of the stack slide, and
// a dual-maturity close. Technical nuance that used to live on-slide (the
// CLI-vs-runtime contrast table, the 7-line bring-up sequence, the
// rules.toml excerpt) moves into the speaker's voice or is dropped
// entirely; nothing is `contrastRows` / `commandLines` / `rulesToml` any
// more. The mind/nervous-system/body metaphor and the article's full
// evidence-pinned beat text stay put in `mind-nervous-system-body.ts`; this
// module still does not derive from it and carries no per-slide evidence
// ids. Sources stay subordinate: see `deckSources` below (repo homes + one
// dated note), rendered once on the close slide, never per-slide.
//
// DECK SHAPE — exactly six slides, one per primary beat (`beat` 1-6, in
// slide order). `slides.length` is always 6.
//
// Slide sequence (id · kind · beat):
//   1. bridge     · bridge   · beat 1 — the CLI as the bridge between an
//      agent's authored behavior and a robot's owned execution; the
//      agent -> interface -> robot illustration is a standalone component
//      (plan task t3), not a dataset field.
//   2. paths      · paths    · beat 2 — three ways intelligence reaches a
//      robot today (coded behavior, learned policy, agent tools) via
//      `columns`; none of them draws a stable boundary.
//   3. stack      · stack    · beat 3 — carries `diagram: true` so the
//      renderer embeds the five-layer architecture component beside the
//      copy; the agent stays above the CLI line, execution stays below it.
//   4. surfaces   · surfaces · beat 4 — Reachy Mini's runtime opened to
//      coder agents across three `labels` (configure, command ad hoc,
//      observe/repair); carries the reachy-mini-action photo.
//   5. autonomy   · autonomy · beat 5 — three `situations` the robot faces
//      without the agent (stuck, disconnected, routine operation); all
//      three are photo-free vignettes.
//   6. close      · close    · beat 6 — the verbatim thesis as `bottomLine`;
//      a `robots` field carries both maturity levels side by side (Reachy
//      Mini's complete native-runtime pattern, ARM101's in-progress
//      contract), one command each, both hero photos.
//
// Photo slots: each of the THREE `PhotoSlotId`s this module references
// (reachy-mini-hero, reachy-mini-action, so101-hero) is referenced EXACTLY
// once — reachy-mini-action on "surfaces", and both hero slots on "close"
// (one per robot entry). "autonomy" carries no photo slot at all.
//
// Terminology discipline (never conflate): "behavior engine" / "behavior
// runtime" / "runtime" name the fixed-rate symbolic loop; "daemon" names only
// the lower-level `reachy-mini-daemon` device service. ARM101 copy never
// claims a shipped or persistent runtime — only the CLI contract (JSON
// output, dry-run unless --apply, torque ownership, overload-aware motion)
// and that persistent behavior is a direction, not a shipped state. Any
// "50 Hz" mention must stay qualified as "design rate".
//
// `DeckSlide` fields, by kind:
//   - id/kind/beat/eyebrow/headline/spokenLine/bottomLine — present on every
//     slide. `headline` is the on-slide hero line; `bottomLine` is the
//     closing declarative line rendered beneath it (verbatim thesis on
//     "close"); `spokenLine` is the speaker's cue, at most 4 sentences.
//   - columns? — present only on "paths": the three intelligence-path
//     columns (`DeckPathColumn[]`).
//   - diagram? — present only on "stack": tells the renderer to embed the
//     five-layer architecture component.
//   - labels?/robot?/photoId? — present only on "surfaces": the three
//     runtime-surface labels plus the one robot photo this slide anchors.
//   - situations? — present only on "autonomy": three `DeckAutonomySituation`
//     entries, in order, all photo-free.
//   - robots? — present only on "close": two `DeckCloseRobot` entries, one
//     per robot, each with its own photo, maturity status, traits, claim,
//     and exactly one CLI command.
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
  | "bridge"
  | "paths"
  | "stack"
  | "surfaces"
  | "autonomy"
  | "close";

/** The two physical bodies; a robot-anchored slide or entry names exactly one. */
export type DeckRobot = "reachy-mini" | "so101";

/** One column of the "paths" slide — a way intelligence reaches a robot today. */
export interface DeckPathColumn {
  /** Short column label, e.g. "Coded behavior". */
  label: string;
}

/** One situation on the "autonomy" slide — the robot continuing without the agent. */
export interface DeckAutonomySituation {
  /** Short situational label, e.g. "Stuck". */
  label: string;
  /** What happens in that situation. */
  outcome: string;
}

/** One robot's entry on the "close" slide — its maturity, claim, and one command. */
export interface DeckCloseRobot {
  robot: DeckRobot;
  photoId: PhotoSlotId;
  /** Maturity label, e.g. "working system" or "in progress". */
  status: string;
  /** Short trait summary shown under the status. */
  traits: string;
  /** One-line claim about this robot's place in the pattern. */
  claim: string;
  /** Exactly one verbatim CLI invocation for this robot. */
  command: string;
}

/**
 * One full-viewport slide. The renderer draws big imagery/copy from
 * `headline` and `bottomLine`; the speaker talks `spokenLine`. `beat`
 * numbers the deck's six slides in order. See the file header for which
 * optional fields apply to which `kind`.
 */
export interface DeckSlide {
  /** Stable slide id (used for anchors and the trace table). */
  id: string;
  /** Structural role; determines which optional fields are populated. */
  kind: DeckSlideKind;
  /** This slide's position in the deck's six-slide sequence (1-indexed). */
  beat: number;
  /** Present iff `kind === "surfaces"` — the one robot photo this slide anchors. */
  robot?: DeckRobot;
  /** Present iff `kind === "surfaces"` — the one robot photo this slide anchors. */
  photoId?: PhotoSlotId;
  /** Small structural label above the headline. */
  eyebrow: string;
  /** The on-slide hero line — a few words, read at a glance. */
  headline: string;
  /** At most 4 sentences the speaker talks over the slide. */
  spokenLine: string;
  /** The on-slide closing declarative line; verbatim thesis on "close". */
  bottomLine: string;
  /** Present iff `kind === "paths"` — the three intelligence-path columns. */
  columns?: readonly DeckPathColumn[];
  /** Present iff `kind === "stack"` — embed the five-layer architecture component. */
  diagram?: true;
  /** Present iff `kind === "surfaces"` — the three runtime-surface labels. */
  labels?: readonly string[];
  /** Present iff `kind === "autonomy"` — the three situations, in order. */
  situations?: readonly DeckAutonomySituation[];
  /** Present iff `kind === "close"` — one entry per robot, in order. */
  robots?: readonly DeckCloseRobot[];
}

/** Display label per robot, for the renderer. */
export const robotLabel = {
  "reachy-mini": "Reachy Mini",
  so101: "SO-ARM101",
} as const satisfies Record<DeckRobot, string>;

/** Photo slots each robot owns — a robot-anchored slide may only use its own slot. */
export const photoSlotsByRobot = {
  "reachy-mini": ["reachy-mini-hero", "reachy-mini-action"],
  so101: ["so101-hero"],
} as const satisfies Record<DeckRobot, readonly PhotoSlotId[]>;

export const mindNervousSystemBodySlides = [
  {
    id: "bridge",
    kind: "bridge",
    beat: 1,
    eyebrow: "the bridge",
    headline: "CLI — The Bridge Between Agents and Robots",
    spokenLine:
      "The agent authors behavior; the robot owns how that behavior actually runs. This talk walks the bridge between those two worlds — a CLI that lets intelligence reach a robot without ever touching the motors directly.",
    bottomLine: "Agent-authored behavior. Robot-owned execution.",
  },
  {
    id: "paths",
    kind: "paths",
    beat: 2,
    eyebrow: "three paths, one gap",
    headline: "Intelligence reaches robots in different ways",
    spokenLine:
      "Some robots run fixed, hand-coded behavior; others run a learned policy trained end to end; a growing set let an agent call tools directly against the hardware. Each path works, but none of them draws a clean line between what the agent decides and what the robot's software is responsible for executing.",
    columns: [
      { label: "Coded behavior" },
      { label: "Learned policy" },
      { label: "Agent tools" },
    ],
    bottomLine: "What's missing is a stable boundary.",
  },
  {
    id: "stack",
    kind: "stack",
    beat: 3,
    diagram: true,
    eyebrow: "the architecture",
    headline: "Keep execution below the model",
    spokenLine:
      "The stack has five layers: an optional agent, a stable CLI, a deterministic behavior runtime, a device daemon, and the hardware itself. Reasoning stays above the CLI line; execution stays below it, in the runtime and daemon, so the model can be interchangeable without ever owning the motors.",
    bottomLine: "The agent never owns the motors.",
  },
  {
    id: "surfaces",
    kind: "surfaces",
    beat: 4,
    robot: "reachy-mini",
    photoId: "reachy-mini-action",
    eyebrow: "opening the runtime",
    headline: "Open the runtime to coder agents",
    spokenLine:
      "A coder agent doesn't just call the robot once — it can configure the behavior runtime's rules, issue ad hoc commands outside those rules, and observe the runtime's own feed to repair or extend automation over time. Reachy Mini's CLI opens all three surfaces the same way a human operator would use them.",
    labels: ["Configure behavior", "Command ad hoc", "Observe and repair"],
    bottomLine: "The agent maintains the automation. The runtime executes it.",
  },
  {
    id: "autonomy",
    kind: "autonomy",
    beat: 5,
    eyebrow: "beyond the agent",
    headline: "The robot continues without the agent",
    spokenLine:
      "When the robot gets stuck, an agent can inspect the state and adapt the plan — that's exactly where intelligence earns its keep. When the agent disconnects, the behavior runtime keeps running unattended; during routine operation, no model is in the loop at all.",
    situations: [
      { label: "Stuck", outcome: "inspect and adapt" },
      { label: "Disconnected", outcome: "behavior continues" },
      { label: "Routine operation", outcome: "no model required" },
    ],
    bottomLine: "Spend intelligence on change—not repetition.",
  },
  {
    id: "close",
    kind: "close",
    beat: 6,
    eyebrow: "the direction",
    headline: "Two robots, one direction",
    spokenLine:
      "Reachy Mini demonstrates the complete architecture: the agent can maintain rules while the runtime and daemon retain execution and hardware ownership. ARM101 is the next implementation. It already demonstrates the bounded CLI contract—observable state, explicit application, and guarded motion—and is progressing toward the same persistent runtime model. Whether execution happens through ROS or a native runtime, the principle is the same: give the coder agent a language for behavior, while robot software keeps control.",
    robots: [
      {
        robot: "reachy-mini",
        photoId: "reachy-mini-hero",
        status: "working system",
        traits: "Rules · behavior runtime · device daemon",
        claim: "The complete native-runtime pattern.",
        command: "reachy-mini-cli behavior engine start",
      },
      {
        robot: "so101",
        photoId: "so101-hero",
        status: "in progress",
        traits: "JSON · preview/apply · bounded motion",
        claim:
          "Building the operational contract first; persistent behavior comes next.",
        command: "arm101 arm flex --apply",
      },
    ],
    bottomLine: "A CLI for intelligence. A runtime for embodiment.",
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
