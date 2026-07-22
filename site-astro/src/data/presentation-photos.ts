// Photo manifest for the symbolic presentation deck (/presentations/).
//
// The deck anchors each robot slide on a real photograph. Those photographs do
// not exist in the repo yet, so this module ships three intentional *placeholder*
// images — duotone slates in the site palette — under public/presentations/,
// and names, for each slot, exactly what the real photo should be.
//
// Drop-in contract: the site owner exports a real photo over the same filename
// (same WebP format, same public path) and nothing in code changes. The `src`
// / `thumbSrc` paths, the pixel targets, and the alt text are the brief for the
// shoot; see docs/presentation-photos.md for the human-facing guidance.
//
// Three slots — a hero + action pair for Reachy Mini, and a hero for SO-101 —
// one robot per slot, so the deck can guarantee "one robot per slide" (plan
// task t6).

/** Stable slot ids the deck references; one photograph per id. */
export type PhotoSlotId =
  | "reachy-mini-hero"
  | "reachy-mini-action"
  | "so101-hero";

/** Which robot a slot depicts — kept literal so the deck enforces one per slide. */
export type PhotoRobot = "Reachy Mini" | "SO-101";

/** The slot's job in the deck: an establishing hero or an in-motion action shot. */
export type PhotoRole = "hero" | "action";

/** Public paths live under /presentations/ so a drop-in replacement is trivial. */
export type PublicPhotoPath = `/presentations/${string}.webp`;

export interface PresentationPhoto {
  /** Stable slot id the deck references. */
  id: PhotoSlotId;
  /** Public path of the full-size image. Save a real photo over this exact file. */
  src: PublicPhotoPath;
  /** Public path of the thumbnail (lazy-loaded below the first slide). */
  thumbSrc: PublicPhotoPath;
  /** The robot in the frame — never more than one robot per slot. */
  subjectRobot: PhotoRobot;
  /** Establishing hero or in-motion action shot. */
  role: PhotoRole;
  /** One sentence: what the real photograph should show. */
  subject: string;
  /** Human-readable orientation/aspect, e.g. "landscape 16:9". */
  orientation: string;
  /** Target pixel dimensions for the full image and its thumbnail. */
  targetDimensions: {
    /** e.g. "1920×1080". */
    full: string;
    /** e.g. "480×270". */
    thumb: string;
  };
  /** Real alt text describing the *intended* photo (not the placeholder). */
  alt: string;
}

export const presentationPhotos = [
  {
    id: "reachy-mini-hero",
    src: "/presentations/reachy-mini-hero.webp",
    thumbSrc: "/presentations/reachy-mini-hero-thumb.webp",
    subjectRobot: "Reachy Mini",
    role: "hero",
    subject:
      "Reachy Mini on a clean desk in three-quarter view, head turned toward the lens with antennas up, lit by a warm key light.",
    orientation: "landscape 16:9",
    targetDimensions: { full: "1920×1080", thumb: "480×270" },
    alt: "Reachy Mini, a small expressive desk robot with a rounded movable head, two antennas, a single camera eye and a speaker in its base, seen in three-quarter view on a desk.",
  },
  {
    id: "reachy-mini-action",
    src: "/presentations/reachy-mini-action.webp",
    thumbSrc: "/presentations/reachy-mini-action-thumb.webp",
    subjectRobot: "Reachy Mini",
    role: "action",
    subject:
      "Reachy Mini mid-gesture with its head tilted and antennas in motion, a human hand near it for scale, shallow depth of field.",
    orientation: "landscape 3:2",
    targetDimensions: { full: "1800×1200", thumb: "480×320" },
    alt: "Reachy Mini mid-gesture, its head tilted and antennas swinging, a person's hand beside it for scale, background softly out of focus.",
  },
  {
    id: "so101-hero",
    src: "/presentations/so101-hero.webp",
    thumbSrc: "/presentations/so101-hero-thumb.webp",
    subjectRobot: "SO-101",
    role: "hero",
    subject:
      "The SO-101 robot arm at rest in its home pose, gripper open, in a clean side profile against a plain seamless backdrop.",
    orientation: "landscape 16:9",
    targetDimensions: { full: "1920×1080", thumb: "480×270" },
    alt: "The SO-101 hobby robot arm at rest in a clean side profile, its jointed segments folded into the home pose and its two-finger gripper open, against a plain backdrop.",
  },
] as const satisfies readonly PresentationPhoto[];

/** Lookup by slot id, so the deck can index a photo without a `.find()`.
 *  `satisfies` proves every PhotoSlotId is present exactly once. */
export const photoBySlot = {
  "reachy-mini-hero": presentationPhotos[0],
  "reachy-mini-action": presentationPhotos[1],
  "so101-hero": presentationPhotos[2],
} satisfies Record<PhotoSlotId, PresentationPhoto>;
