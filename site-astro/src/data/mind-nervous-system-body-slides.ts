// Slide dataset for the symbolic presentation deck (/presentations/).
//
// This is the DATA LAYER only — a later task renders it. Each slide is the
// symbolic counterpart of the text talk in `mind-nervous-system-body.ts`: a
// few-word headline plus ONE short spoken line the speaker talks over, an
// optional robot photo, and the evidence ids that ground the beat it derives
// from. The deck says LESS than the article, never more.
//
// Anti-fabrication contract (enforced by the sibling .test.mjs):
//   - every headline and spokenLine traces to existing beat text or the thesis
//     in `mind-nervous-system-body.ts` — verbatim lift or tight distillation,
//     no new factual claim;
//   - one robot per slide — a `robot` slide names exactly one robot, anchors
//     only that robot's photo slot, and cites only that robot's evidence;
//   - every `evidenceIds` entry resolves through the same `evidenceFor()`
//     ledger the article uses.
//
// Runtime note: this module imports ONLY types from its neighbours, so type
// stripping erases every import and the module loads under plain
// `node --experimental-strip-types` with no module-resolution hop.

import type { PresentationEvidenceId } from "./mind-nervous-system-body";
import type { PhotoSlotId } from "./presentation-photos";
import type { PresentationProjectId } from "./presentations";

/** A slide's structural role in the deck. */
export type DeckSlideKind = "thesis" | "concept" | "robot" | "close";

/** The two physical bodies; a `robot` slide names exactly one. */
export type DeckRobot = "reachy-mini" | "so101";

/**
 * One full-viewport slide. The renderer draws big imagery + `headline`; the
 * speaker talks `spokenLine`. `robot`, `photoId`, and `evidenceIds` let the
 * renderer link the slide to its body, its photo, and its pinned sources.
 */
export interface DeckSlide {
  /** Stable slide id (used for anchors and the trace table). */
  id: string;
  /** Structural role; only `robot` slides carry `robot` + `photoId`. */
  kind: DeckSlideKind;
  /** Present iff `kind === "robot"` — the single body this slide is about. */
  robot?: DeckRobot;
  /** Small structural label above the headline. */
  eyebrow: string;
  /** A few words — the symbol the slide anchors. */
  headline: string;
  /** One short line (<= ~2 sentences) the speaker talks over the slide. */
  spokenLine: string;
  /** Present iff `kind === "robot"` — a photo slot owned by `robot`. */
  photoId?: PhotoSlotId;
  /** Evidence ids that ground this slide; all resolve through `evidenceFor()`. */
  evidenceIds: readonly PresentationEvidenceId[];
}

/** Display label per robot, for the renderer. */
export const robotLabel = {
  "reachy-mini": "Reachy Mini",
  so101: "SO-101",
} as const satisfies Record<DeckRobot, string>;

/** Photo slots each robot owns — a robot slide may only anchor its own slot. */
export const photoSlotsByRobot = {
  "reachy-mini": ["reachy-mini-hero", "reachy-mini-action"],
  so101: ["so101-hero", "so101-action"],
} as const satisfies Record<DeckRobot, readonly PhotoSlotId[]>;

/** Evidence project each robot's slides may cite — reinforces one-robot-per-slide. */
export const projectByRobot = {
  "reachy-mini": "reachy-mini-cli",
  so101: "arm101-cli",
} as const satisfies Record<DeckRobot, PresentationProjectId>;

export const mindNervousSystemBodySlides = [
  {
    // Opener. Headline is the verbatim thesis string; spoken line distils
    // beat `three-layer-thesis` paragraph 1 ("Start with roles, not mystique…").
    id: "thesis",
    kind: "thesis",
    eyebrow: "the thesis",
    headline:
      "The agent is the mind. The code is the nervous system. The robot is the body.",
    spokenLine:
      "Start with roles, not mystique: the mind proposes an action, the nervous system translates it for one machine, the body is the hardware that senses and moves.",
    evidenceIds: ["reachy-readme", "arm101-readme"],
  },
  {
    // Beat `agent-as-mind` + beat-1 point "Mind" (spoken line is that detail
    // near-verbatim: "…can reason over context, but it reaches the machine
    // only through allowed tools and intents").
    id: "mind",
    kind: "concept",
    eyebrow: "the mind",
    headline: "A harness plus a model",
    spokenLine:
      "A harness plus a model can reason over context—but it reaches the machine only through allowed tools and intents.",
    evidenceIds: ["reachy-agent-attach", "reachy-operating-guide"],
  },
  {
    // Beat `symbolic-nervous-system`: headline is its headline distilled;
    // spoken line compresses paragraph 1's sense → reflex → intent → arbitration
    // → motion chain.
    id: "nervous-system",
    kind: "concept",
    eyebrow: "the nervous system",
    headline: "Thought into grounded symbols",
    spokenLine:
      "Robot-specific code gives physical signals names and consequences: sense, reflex, intent, arbitration—then motion.",
    evidenceIds: ["reachy-readme", "reachy-symbolic-runtime-delivery"],
  },
  {
    // Beat `robot-as-body` paragraph 1 (Reachy Mini). Hero photo.
    id: "reachy-mini-body",
    kind: "robot",
    robot: "reachy-mini",
    eyebrow: "the body · Reachy Mini",
    headline: "Reachy Mini: built for presence",
    spokenLine:
      "Reachy Mini's hardware is expressive—a movable head, antennas, a microphone array, camera, and speaker—organized around continuous presence.",
    photoId: "reachy-mini-hero",
    evidenceIds: ["reachy-readme", "reachy-operating-guide"],
  },
  {
    // Reachy Mini in action: the attach/intent/arbitration story. Traces to
    // beat `robot-as-body` ("an agent can attach without taking ownership of the
    // SDK") + beat `symbolic-nervous-system` point "Intent" ("…still has to win
    // arbitration"). Action photo.
    id: "reachy-mini-attach",
    kind: "robot",
    robot: "reachy-mini",
    eyebrow: "the body · Reachy Mini",
    headline: "Attach without taking over",
    spokenLine:
      "An agent can attach and propose validated intents—each one still has to win arbitration before the body moves.",
    photoId: "reachy-mini-action",
    evidenceIds: ["reachy-agent-attach", "reachy-operating-guide"],
  },
  {
    // Beat `robot-as-body` paragraph 2 (SO-101). Hero photo. Spoken line is a
    // near-verbatim lift: "…explicit about what was commanded, what was measured,
    // and which safety action actually succeeded."
    id: "so101-body",
    kind: "robot",
    robot: "so101",
    eyebrow: "the body · SO-101",
    headline: "The SO-101 arm: a different problem",
    spokenLine:
      "The SO-101 arm's nervous system is explicit about what was commanded, what was measured, and which safety action actually succeeded.",
    photoId: "so101-hero",
    evidenceIds: ["arm101-readme", "arm101-safety"],
  },
  {
    // SO-101 in action: gentle motion + honest safety limits. Traces to beat
    // `robot-as-body` paragraph 3 ("Those mechanisms narrow risk; they do not
    // make motion inherently safe. ARM101 infers contact from servo load and
    // stall behavior, not from a tactile sensor."). Action photo.
    id: "so101-gentle",
    kind: "robot",
    robot: "so101",
    eyebrow: "the body · SO-101",
    headline: "Gentle motion, honest limits",
    spokenLine:
      "Contact is inferred from servo load and stall, not a tactile sensor—these mechanisms narrow risk, they don't make motion inherently safe.",
    photoId: "so101-action",
    evidenceIds: ["arm101-gentle-motion", "arm101-safety", "arm101-hardware-validation"],
  },
  {
    // Beat `bounded-learning`: headline distils its headline; spoken line lifts
    // paragraph 1 ("retained adaptation… survives the event… It does not mean
    // either robot updates model weights online") — kept robot-agnostic.
    id: "bounded-learning",
    kind: "concept",
    eyebrow: "a bounded learning ladder",
    headline: "Learning leaves a trace",
    spokenLine:
      "Here learning means a retained, inspectable artifact that survives the moment—not online model-weight training.",
    evidenceIds: ["reachy-operating-guide", "reachy-forge-validation", "arm101-reachability-map"],
  },
  {
    // Beat `consequences-and-non-claims`: headline is its headline distilled;
    // spoken line joins paragraph 1 ("Separating mind, nervous system, and
    // physical hardware lets each layer fail differently") with paragraph 3's
    // limits ("an architectural comparison, not proof of sentience… online
    // neural training").
    id: "honest-limits",
    kind: "concept",
    eyebrow: "consequences and limits",
    headline: "Reactivity, safety, and honest limits",
    spokenLine:
      "Separating the layers lets each fail differently—and this stays an architectural comparison, not a claim of sentience or online neural training.",
    evidenceIds: ["reachy-symbolic-runtime-delivery", "arm101-safety"],
  },
  {
    // Close. Beat `sources-and-repositories`: headline distils its headline;
    // spoken line lifts paragraph 1 ("The architecture rhymes, but the products
    // do not merge… no shared runtime or shipped cross-repository integration")
    // and routes depth-seekers to the article's pinned evidence.
    id: "close",
    kind: "close",
    eyebrow: "keep the two systems separate",
    headline: "Keep the synthesis, keep them separate",
    spokenLine:
      "The architecture rhymes, but the two products don't merge—no shared runtime, no shipped integration; the full article carries the evidence.",
    evidenceIds: ["reachy-readme", "arm101-readme"],
  },
] as const satisfies readonly DeckSlide[];
