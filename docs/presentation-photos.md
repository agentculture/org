# Presentation deck photos

The symbolic deck at `/presentations/mind-nervous-system-body/` anchors each
robot slide on a real photograph. **All three slots now carry real photographs**
— the duotone placeholder slates they shipped with are gone.

This page describes what is in each slot and how to replace it. The typed
manifest the deck imports lives at
`site-astro/src/data/presentation-photos.ts`; the two must stay in step.

## The three shots

Every file lives under `site-astro/public/presentations/`. Each slot has a
full-size image and a thumbnail, at these exact filenames — so a re-shoot is a
drop-in replacement (see below).

| Slot | Full file | Thumb file | What's in it | Orientation | Full / thumb px |
| --- | --- | --- | --- | --- | --- |
| `reachy-mini-hero` | `reachy-mini-hero.webp` | `reachy-mini-hero-thumb.webp` | Reachy Mini on a wooden table facing the lens, antennas rising out of frame, blurred marble fireplace behind | landscape 16:9 | 1920×1080 / 480×270 |
| `reachy-mini-action` | `reachy-mini-action.webp` | `reachy-mini-action-thumb.webp` | Reachy Mini close-up mid-gesture, head tilted up and back, antennas angled out, warm blurred interior | landscape 3:2 | 1800×1200 / 480×320 |
| `so101-hero` | `so101-hero.webp` | `so101-hero-thumb.webp` | SO-ARM101 in side profile on a white surface, raised and reaching forward, gripper open | landscape 16:9 | 1920×1080 / 480×270 |

Reachy Mini is a small expressive desk robot with a movable head, two antennas,
a camera and a speaker. The SO-ARM101 is a hobby robot arm
with a two-finger gripper.

### Alt text

The alt text below rides with each slot in the manifest and describes the photo
that actually ships. **If you re-shoot a slot, re-read its alt text** — a
screen-reader user is told what the alt says, so it has to match the new frame.

| Slot | Alt text |
| --- | --- |
| `reachy-mini-hero` | Reachy Mini, a small white desk robot with a rounded movable head and a pair of dark camera lenses, facing the viewer on a wooden table, its two thin antennas rising out of the top of the frame and a marble fireplace blurred behind it. |
| `reachy-mini-action` | Reachy Mini in close-up mid-gesture, its head tilted up and back on a jointed metal neck and its two antennas angled out, the pair of dark camera lenses reflecting the room, against a warm interior softly out of focus. |
| `so101-hero` | The SO-ARM101 robot arm in side profile on a white surface, its black 3D-printed segments raised and reaching forward, its two-finger gripper open with one white jaw and one black jaw, against a plain pale backdrop. |

## Replacing a photo

The drop-in contract is: **save the new photo over the same filename, in the
same folder, as WebP** — nothing in code changes.

1. Take the shot at (or above) the target full-size dimensions and crop it to
   the slot's aspect ratio.
2. Export it as WebP at the slot's `Full file` name (for example
   `reachy-mini-hero.webp`), overwriting the current image in
   `site-astro/public/presentations/`.
3. Make a downscaled thumbnail and export it as WebP at the `Thumb file` name
   (for example `reachy-mini-hero-thumb.webp`), same folder.
4. Update that slot's `subject` and `alt` in
   `site-astro/src/data/presentation-photos.ts` (and the tables above) if the
   new frame shows something different from the old one.
5. Rebuild: `cd site-astro && npm run build`. The manifest already points at
   these paths, so the deck picks the new photo up with no code edit.

If you would rather ship JPEGs, that is a code change (the manifest `src` /
`thumbSrc` paths and these filenames end in `.webp`), so keep to WebP for a
true drop-in.

## Keep thumbnails small

The thumbnails load below the first slide (lazily) as a quick-scan strip, so
they should stay small for fast loading — target roughly 480 px on the long
edge and **under ~30 KB** each. The full images stay well under ~200 KB and
far below the Cloudflare Pages 25 MiB per-file limit. The shipped photographs
meet this (full images ~39–98 KB, thumbnails ~6–11 KB); match that order of
magnitude when you replace them so the deck stays fast.
