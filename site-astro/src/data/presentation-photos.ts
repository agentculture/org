// Photo manifest for the symbolic presentation deck (/presentations/).
//
// The deck anchors each robot slide on a real photograph. All three slots now
// carry real photographs under public/presentations/ — the duotone placeholder
// slates they replaced are gone. Each slot's `subject` and `alt` describe the
// photograph that actually ships, not an intended shot.
//
// Drop-in contract (still live for re-shoots): export a new photo over the same
// filename — same WebP format, same public path, same pixel target — and
// nothing in code changes. Only `subject` and `alt` need revisiting, and only
// if the new frame shows something different; see docs/presentation-photos.md.
//
// Three slots — a hero + action pair for Reachy Mini, and a hero for SO-ARM101 —
// one robot per slot, so the deck can guarantee "one robot per slide" (plan
// task t6).

/** Stable slot ids the deck references; one photograph per id. */
export type PhotoSlotId =
  | "reachy-mini-hero"
  | "reachy-mini-action"
  | "so101-hero";

/** Which robot a slot depicts — kept literal so the deck enforces one per slide. */
export type PhotoRobot = "Reachy Mini" | "SO-ARM101";

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
  /** Alt text describing the photograph that actually ships in this slot. */
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
      "Reachy Mini on a wooden table, facing the lens with antennas up, a marble fireplace softly out of focus behind it.",
    orientation: "landscape 16:9",
    targetDimensions: { full: "1920×1080", thumb: "480×270" },
    alt: "Reachy Mini, a small white desk robot with a rounded movable head and a pair of dark camera lenses, facing the viewer on a wooden table, its two thin antennas rising out of the top of the frame and a marble fireplace blurred behind it.",
  },
  {
    id: "reachy-mini-action",
    src: "/presentations/reachy-mini-action.webp",
    thumbSrc: "/presentations/reachy-mini-action-thumb.webp",
    subjectRobot: "Reachy Mini",
    role: "action",
    subject:
      "Reachy Mini in close-up mid-gesture, head tilted up and back on its jointed neck, antennas angled out, shallow depth of field.",
    orientation: "landscape 3:2",
    targetDimensions: { full: "1800×1200", thumb: "480×320" },
    alt: "Reachy Mini in close-up mid-gesture, its head tilted up and back on a jointed metal neck and its two antennas angled out, the pair of dark camera lenses reflecting the room, against a warm interior softly out of focus.",
  },
  {
    id: "so101-hero",
    src: "/presentations/so101-hero.webp",
    thumbSrc: "/presentations/so101-hero-thumb.webp",
    subjectRobot: "SO-ARM101",
    role: "hero",
    subject:
      "The SO-ARM101 robot arm in side profile on a white surface, raised and reaching forward with its gripper open, plain pale backdrop.",
    orientation: "landscape 16:9",
    targetDimensions: { full: "1920×1080", thumb: "480×270" },
    alt: "The SO-ARM101 robot arm in side profile on a white surface, its black 3D-printed segments raised and reaching forward, its two-finger gripper open with one white jaw and one black jaw, against a plain pale backdrop.",
  },
] as const satisfies readonly PresentationPhoto[];

/** Lookup by slot id, so the deck can index a photo without a `.find()`.
 *  `satisfies` proves every PhotoSlotId is present exactly once. */
export const photoBySlot = {
  "reachy-mini-hero": presentationPhotos[0],
  "reachy-mini-action": presentationPhotos[1],
  "so101-hero": presentationPhotos[2],
} satisfies Record<PhotoSlotId, PresentationPhoto>;
