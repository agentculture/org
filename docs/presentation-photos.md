# Presentation deck photos

The symbolic deck at `/presentations/mind-nervous-system-body/` anchors each
robot slide on a real photograph. Until those photographs are taken, the deck
ships three **placeholder** images — duotone slates in the site palette — so the
built site looks intentional, with zero broken-image icons.

This page is the shot brief. The typed manifest the deck imports lives at
`site-astro/src/data/presentation-photos.ts`; the two must stay in step.

## The three shots

Every file lives under `site-astro/public/presentations/`. Each slot has a
full-size image and a thumbnail. The placeholders ship at these exact filenames
so a real photo is a drop-in replacement (see below).

| Slot | Full file | Thumb file | Subject | Orientation | Full / thumb px |
| --- | --- | --- | --- | --- | --- |
| `reachy-mini-hero` | `reachy-mini-hero.webp` | `reachy-mini-hero-thumb.webp` | Reachy Mini on a clean desk, three-quarter view, head toward the lens, antennas up, warm key light | landscape 16:9 | 1920×1080 / 480×270 |
| `reachy-mini-action` | `reachy-mini-action.webp` | `reachy-mini-action-thumb.webp` | Reachy Mini mid-gesture, head tilted and antennas in motion, a hand near it for scale | landscape 3:2 | 1800×1200 / 480×320 |
| `so101-hero` | `so101-hero.webp` | `so101-hero-thumb.webp` | SO-ARM101 arm at rest in its home pose, gripper open, clean side profile on a plain backdrop | landscape 16:9 | 1920×1080 / 480×270 |

Reachy Mini is a small expressive desk robot with a movable head, two antennas,
a camera and a speaker. The SO-ARM101 is a hobby robot arm
with a two-finger gripper.

### Alt text

The alt text below rides with each slot in the manifest. It describes the
*intended* photo, so it is already correct once the real image is dropped in —
you do not need to touch it.

| Slot | Alt text |
| --- | --- |
| `reachy-mini-hero` | Reachy Mini, a small expressive desk robot with a rounded movable head, two antennas, a single camera eye and a speaker in its base, seen in three-quarter view on a desk. |
| `reachy-mini-action` | Reachy Mini mid-gesture, its head tilted and antennas swinging, a person's hand beside it for scale, background softly out of focus. |
| `so101-hero` | The SO-ARM101 hobby robot arm at rest in a clean side profile, its jointed segments folded into the home pose and its two-finger gripper open, against a plain backdrop. |

## Replacing a placeholder with a real photo

The drop-in contract is: **save the real photo over the same filename, in the
same folder, as WebP** — nothing in code changes.

1. Take the shot at (or above) the target full-size dimensions and crop it to
   the slot's aspect ratio.
2. Export it as WebP at the slot's `Full file` name (for example
   `reachy-mini-hero.webp`), overwriting the placeholder in
   `site-astro/public/presentations/`.
3. Make a downscaled thumbnail and export it as WebP at the `Thumb file` name
   (for example `reachy-mini-hero-thumb.webp`), same folder.
4. Rebuild: `cd site-astro && npm run build`. The manifest already points at
   these paths, so the deck picks the real photo up with no code edit.

If you would rather ship JPEGs, that is a code change (the manifest `src` /
`thumbSrc` paths and these filenames end in `.webp`), so keep to WebP for a
true drop-in.

## Keep thumbnails small

The thumbnails load below the first slide (lazily) as a quick-scan strip, so
they should stay small for fast loading — target roughly 480 px on the long
edge and **under ~30 KB** each. The full images stay well under ~200 KB and
far below the Cloudflare Pages 25 MiB per-file limit. The shipped placeholders
already meet this (full images ~30–40 KB, thumbnails ~5–7 KB); match that order
of magnitude when you replace them so the deck stays fast.
