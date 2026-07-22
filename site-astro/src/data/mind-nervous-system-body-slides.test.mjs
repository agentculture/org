import assert from "node:assert/strict";
import test from "node:test";

// The slide dataset (`mind-nervous-system-body-slides.ts`) now imports ONLY
// types from its neighbours (`./presentations`, `./presentation-photos`), so
// type stripping erases every import and the module loads bare under
// `node --experimental-strip-types` — no resolve-hook shim is needed here
// (drop it if a future edit reintroduces a value import).
//
// The deck no longer derives from the article: there is no `evidenceFor()`
// dependency and no per-slide `evidenceIds`. Sources are a subordinate,
// deck-level `deckSources` export (repo-home links + one dated note),
// asserted once, not per slide.

const slidesUrl = new URL(
  "./mind-nervous-system-body-slides.ts",
  import.meta.url,
);

const {
  mindNervousSystemBodySlides,
  robotLabel,
  photoSlotsByRobot,
  deckSources,
} = await import(slidesUrl.href);

/** Count sentence-final punctuation (., !, ?) — em-dashes/colons don't split. */
function sentenceCount(text) {
  return (text.match(/[.!?]+(?=\s|$)/g) ?? []).length;
}

/** The two kinds whose slides anchor a robot photo slot. */
const PHOTO_BEARING_KINDS = new Set(["robot", "commands"]);

test("slide count and primary-beat count stay within budget; beats are contiguous from 1", () => {
  assert.ok(
    mindNervousSystemBodySlides.length <= 10,
    `expected at most 10 slides, got ${mindNervousSystemBodySlides.length}`,
  );
  const beats = mindNervousSystemBodySlides.map((slide) => slide.beat);
  const distinctBeats = new Set(beats);
  assert.ok(
    distinctBeats.size <= 8,
    `expected at most 8 primary beats, got ${distinctBeats.size}`,
  );
  assert.equal(beats[0], 1, "the first slide must belong to beat 1");
  for (let i = 1; i < beats.length; i += 1) {
    assert.ok(
      beats[i] === beats[i - 1] || beats[i] === beats[i - 1] + 1,
      `beat must be nondecreasing and advance by at most 1 per slide ` +
        `(slide index ${i}: beat ${beats[i - 1]} -> ${beats[i]})`,
    );
  }
  assert.equal(
    Math.max(...beats),
    distinctBeats.size,
    "beats must be contiguous 1..N with no gaps",
  );
});

test("slide ids are unique", () => {
  const ids = mindNervousSystemBodySlides.map((slide) => slide.id);
  assert.equal(new Set(ids).size, ids.length, "slide ids must be unique");
});

test("slide index 1 is the thesis slide with the verbatim thesis headline", () => {
  const thesisSlide = mindNervousSystemBodySlides[1];
  assert.equal(thesisSlide.kind, "thesis", "slide index 1 must be the thesis slide");
  assert.equal(
    thesisSlide.headline,
    "A CLI for intelligence. A runtime for embodiment.",
  );
});

test("every spokenLine is nonempty and at most 2 sentences", () => {
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

test("kind/shape agreement — each optional field appears only on its matching kind", () => {
  for (const slide of mindNervousSystemBodySlides) {
    assert.equal(
      slide.diagram === true,
      slide.kind === "diagram",
      `slide ${slide.id}: 'diagram' present iff kind === "diagram"`,
    );
    assert.equal(
      Array.isArray(slide.contrastRows) && slide.contrastRows.length > 0,
      slide.kind === "contrast",
      `slide ${slide.id}: nonempty 'contrastRows' present iff kind === "contrast"`,
    );
    assert.equal(
      Array.isArray(slide.commandLines) && slide.commandLines.length > 0,
      slide.kind === "commands",
      `slide ${slide.id}: nonempty 'commandLines' present iff kind === "commands"`,
    );
    assert.equal(
      typeof slide.rulesToml === "string" && slide.rulesToml.length > 0,
      slide.kind === "rules",
      `slide ${slide.id}: nonempty 'rulesToml' present iff kind === "rules"`,
    );
    const expectsPhoto = PHOTO_BEARING_KINDS.has(slide.kind);
    assert.equal(
      slide.robot !== undefined,
      expectsPhoto,
      `slide ${slide.id}: 'robot' present iff kind is "robot" or "commands"`,
    );
    assert.equal(
      slide.photoId !== undefined,
      expectsPhoto,
      `slide ${slide.id}: 'photoId' present iff kind is "robot" or "commands"`,
    );
  }
});

test("photo discipline — each of the four slots is used exactly once, each on its own robot", () => {
  const allSlots = Object.values(photoSlotsByRobot).flat();
  const photoSlides = mindNervousSystemBodySlides.filter(
    (slide) => slide.photoId !== undefined,
  );
  const usedSlots = photoSlides.map((slide) => slide.photoId);
  assert.equal(
    usedSlots.length,
    allSlots.length,
    `expected all ${allSlots.length} photo slots used exactly once, ` +
      `got ${usedSlots.length} photo-bearing slides`,
  );
  assert.deepEqual(
    [...usedSlots].sort(),
    [...allSlots].sort(),
    "every photo slot must be used exactly once, with no duplicates or leftovers",
  );
  for (const slide of photoSlides) {
    const ownSlots = photoSlotsByRobot[slide.robot];
    assert.ok(
      ownSlots.includes(slide.photoId),
      `slide ${slide.id}: photo ${slide.photoId} is not one of ${slide.robot}'s slots`,
    );
  }
});

test("each robot has at least one slide, and both robots appear", () => {
  const robots = new Set(
    mindNervousSystemBodySlides
      .filter((slide) => slide.robot !== undefined)
      .map((slide) => slide.robot),
  );
  assert.ok(robots.has("reachy-mini"), "Reachy Mini needs at least one slide");
  assert.ok(robots.has("so101"), "SO-101 needs at least one slide");
  assert.ok(robotLabel["reachy-mini"], "robotLabel must cover reachy-mini");
  assert.ok(robotLabel.so101, "robotLabel must cover so101");
});

test("design-rate honesty — any 50 Hz mention is always qualified as 'design rate'", () => {
  for (const slide of mindNervousSystemBodySlides) {
    const text = [
      slide.headline,
      slide.spokenLine,
      slide.rulesToml ?? "",
      (slide.commandLines ?? []).join(" "),
    ].join(" ");
    if (/50\s*Hz/.test(text)) {
      assert.ok(
        text.includes("design rate"),
        `slide ${slide.id} mentions 50 Hz without qualifying it as "design rate"`,
      );
    }
  }
});

test("no commit hashes or /blob/ URLs leak into headline or spokenLine", () => {
  const commitHash = /\b[0-9a-f]{40}\b/i;
  for (const slide of mindNervousSystemBodySlides) {
    for (const field of ["headline", "spokenLine"]) {
      const text = slide[field];
      assert.ok(
        !commitHash.test(text),
        `slide ${slide.id}.${field} contains a 40-char commit hash`,
      );
      assert.ok(
        !text.includes("/blob/"),
        `slide ${slide.id}.${field} contains a /blob/ URL`,
      );
    }
  }
});

test("the rules slide's rulesToml contains a react rule and an inhibit rule", () => {
  const rulesSlide = mindNervousSystemBodySlides.find(
    (slide) => slide.kind === "rules",
  );
  assert.ok(rulesSlide, "expected exactly one 'rules'-kind slide");
  assert.ok(
    rulesSlide.rulesToml.includes("[[react]]"),
    "rulesToml must contain a [[react]] rule",
  );
  assert.ok(
    rulesSlide.rulesToml.includes("[[inhibit]]"),
    "rulesToml must contain an [[inhibit]] rule",
  );
});

test("commandLines are prefixed with the correct robot's CLI binary", () => {
  const reachyCommands = mindNervousSystemBodySlides.find(
    (slide) => slide.kind === "commands" && slide.robot === "reachy-mini",
  );
  const arm101Commands = mindNervousSystemBodySlides.find(
    (slide) => slide.kind === "commands" && slide.robot === "so101",
  );
  assert.ok(reachyCommands, "expected a commands slide for reachy-mini");
  assert.ok(arm101Commands, "expected a commands slide for so101");
  for (const line of reachyCommands.commandLines) {
    assert.ok(
      line.startsWith("reachy-mini-cli "),
      `reachy commandLine does not start with "reachy-mini-cli ": ${line}`,
    );
  }
  for (const line of arm101Commands.commandLines) {
    assert.ok(
      line.startsWith("arm101 "),
      `arm101 commandLine does not start with "arm101 ": ${line}`,
    );
  }
});

test("deckSources names exactly 2 GitHub projects and a note; no slide carries evidenceIds", () => {
  assert.equal(
    deckSources.projects.length,
    2,
    "expected exactly 2 source projects",
  );
  for (const project of deckSources.projects) {
    assert.ok(
      project.repositoryUrl.startsWith("https://github.com/"),
      `project ${project.id} repositoryUrl must be a github.com URL`,
    );
  }
  assert.ok(
    typeof deckSources.note === "string" && deckSources.note.trim().length > 0,
    "deckSources.note must be nonempty",
  );
  for (const slide of mindNervousSystemBodySlides) {
    assert.ok(
      !Object.prototype.hasOwnProperty.call(slide, "evidenceIds"),
      `slide ${slide.id} must not carry an evidenceIds property — the deck no longer derives from the article`,
    );
  }
});

test("the ARM101 robot slide says it does not ship a persistent runtime", () => {
  const arm101RobotSlide = mindNervousSystemBodySlides.find(
    (slide) => slide.kind === "robot" && slide.robot === "so101",
  );
  assert.ok(arm101RobotSlide, "expected a 'robot'-kind slide for so101");
  assert.match(
    arm101RobotSlide.spokenLine,
    /does not ship a persistent runtime/,
  );
});

test("the close slide's spokenLine is the deck's final line, verbatim", () => {
  const closeSlide =
    mindNervousSystemBodySlides[mindNervousSystemBodySlides.length - 1];
  assert.equal(closeSlide.kind, "close", "the last slide must be the close slide");
  assert.equal(
    closeSlide.spokenLine,
    "Every robot should expose a CLI for intelligence and a runtime for embodiment.",
  );
});
