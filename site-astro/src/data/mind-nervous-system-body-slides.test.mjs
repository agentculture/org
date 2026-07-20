import assert from "node:assert/strict";
import { register } from "node:module";
import test from "node:test";

// The slide dataset (`mind-nervous-system-body-slides.ts`) only *type*-imports
// its neighbours, so it loads bare. But this test also needs the real
// `evidenceFor()` and thesis string from `mind-nervous-system-body.ts`, whose
// value import (`./presentations`) is written extensionless in the house style.
// Node's type stripping does not add extensions, so we register a tiny resolve
// hook that retries an extensionless relative specifier with `.ts`/`.js`. This
// keeps the test on the exact verify command
// (`node --experimental-strip-types --test`) while resolving the real ledger —
// never a re-implementation of it.
const resolveHook = `
import { existsSync } from "node:fs";
export async function resolve(specifier, context, next) {
  if (/^[.]{1,2}\\//.test(specifier) && !/\\.[a-z]+$/i.test(specifier)) {
    const base = new URL(specifier, context.parentURL);
    for (const ext of [".ts", ".js", ".mjs"]) {
      if (existsSync(new URL(base.href + ext))) {
        return next(specifier + ext, context);
      }
    }
  }
  return next(specifier, context);
}
`;
register(
  "data:text/javascript," + encodeURIComponent(resolveHook),
  import.meta.url,
);

const slidesUrl = new URL(
  "./mind-nervous-system-body-slides.ts",
  import.meta.url,
);
const talkUrl = new URL("./mind-nervous-system-body.ts", import.meta.url);

const { mindNervousSystemBodySlides, photoSlotsByRobot, projectByRobot } =
  await import(slidesUrl.href);
const { evidenceFor, mindNervousSystemBodyHero } = await import(talkUrl.href);

const robotSlides = mindNervousSystemBodySlides.filter(
  (slide) => slide.kind === "robot",
);

/** Count sentence-final punctuation (., !, ?) — em-dashes/colons don't split. */
function sentenceCount(text) {
  return (text.match(/[.!?]+(?=\s|$)/g) ?? []).length;
}

test("the deck has a sensible number of slides and unique ids", () => {
  assert.ok(
    mindNervousSystemBodySlides.length >= 8 &&
      mindNervousSystemBodySlides.length <= 10,
    `expected 8-10 slides, got ${mindNervousSystemBodySlides.length}`,
  );
  const ids = mindNervousSystemBodySlides.map((slide) => slide.id);
  assert.equal(new Set(ids).size, ids.length, "slide ids must be unique");
});

test("every slide's evidenceIds resolve through evidenceFor() without throwing", () => {
  for (const slide of mindNervousSystemBodySlides) {
    assert.ok(
      slide.evidenceIds.length >= 1,
      `slide ${slide.id} must cite at least one evidence id`,
    );
    let resolved;
    assert.doesNotThrow(() => {
      resolved = evidenceFor(slide.evidenceIds);
    }, `slide ${slide.id} has an unknown evidence id`);
    assert.equal(
      resolved.length,
      slide.evidenceIds.length,
      `slide ${slide.id} lost an evidence id in resolution`,
    );
  }
});

test("kind and robot/photo shape agree — only robot slides carry a robot and photo", () => {
  for (const slide of mindNervousSystemBodySlides) {
    const isRobot = slide.kind === "robot";
    assert.equal(
      slide.robot !== undefined,
      isRobot,
      `slide ${slide.id}: 'robot' present iff kind === "robot"`,
    );
    assert.equal(
      slide.photoId !== undefined,
      isRobot,
      `slide ${slide.id}: 'photoId' present iff kind === "robot"`,
    );
  }
});

test("every robot slide names exactly one robot and anchors that robot's photo slot", () => {
  for (const slide of robotSlides) {
    assert.ok(
      slide.robot === "reachy-mini" || slide.robot === "so101",
      `slide ${slide.id}: robot must be a known robot`,
    );
    const ownSlots = photoSlotsByRobot[slide.robot];
    assert.ok(
      ownSlots.includes(slide.photoId),
      `slide ${slide.id}: photo ${slide.photoId} is not one of ${slide.robot}'s slots`,
    );
  }
});

test("a robot slide cites only its own robot's evidence — no mixing", () => {
  for (const slide of robotSlides) {
    const expectedProject = projectByRobot[slide.robot];
    for (const source of evidenceFor(slide.evidenceIds)) {
      assert.equal(
        source.project,
        expectedProject,
        `slide ${slide.id} (${slide.robot}) cites ${source.id} from ${source.project}`,
      );
    }
  }
});

test("each of the two robots has at least one slide", () => {
  const robots = new Set(robotSlides.map((slide) => slide.robot));
  assert.ok(robots.has("reachy-mini"), "Reachy Mini needs at least one slide");
  assert.ok(robots.has("so101"), "SO-101 needs at least one slide");
});

test("no slide's spokenLine exceeds ~2 sentences and each is present", () => {
  for (const slide of mindNervousSystemBodySlides) {
    assert.ok(
      typeof slide.spokenLine === "string" && slide.spokenLine.trim().length > 0,
      `slide ${slide.id} must have a spoken line`,
    );
    assert.ok(
      sentenceCount(slide.spokenLine) <= 2,
      `slide ${slide.id} spoken line is more than 2 sentences: ${slide.spokenLine}`,
    );
  }
});

test("the thesis slide's headline is the exact thesis string", () => {
  const thesisSlides = mindNervousSystemBodySlides.filter(
    (slide) => slide.kind === "thesis",
  );
  assert.equal(thesisSlides.length, 1, "exactly one thesis slide");
  assert.equal(thesisSlides[0].headline, mindNervousSystemBodyHero);
});
