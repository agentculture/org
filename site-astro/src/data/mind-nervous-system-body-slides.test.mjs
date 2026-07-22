import assert from "node:assert/strict";
import test from "node:test";

// The slide dataset (`mind-nervous-system-body-slides.ts`) still imports ONLY
// types from its neighbours (`./presentations`, `./presentation-photos`), so
// type stripping erases every import and the module loads bare under
// `node --experimental-strip-types` — no resolve-hook shim is needed here
// (drop it if a future edit reintroduces a value import).
//
// SIX-SLIDE SHAPE (org#23): this file re-pins the deck's contract from the
// ten-slide/eight-beat org#21 reframe to issue 23's six slides — bridge,
// paths, stack, surfaces, autonomy, close. The deck still does not derive
// from the article: there is no `evidenceFor()` dependency and no per-slide
// `evidenceIds`. Sources remain a subordinate, deck-level `deckSources`
// export (repo-home links + one dated note), asserted once, not per slide.

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

/** Flatten every human-readable text field on a slide, across all kinds, for
 *  text-content scans (50 Hz honesty, commit-hash/blob-URL leakage). */
function flattenSlideText(slide) {
  const parts = [slide.eyebrow, slide.headline, slide.spokenLine, slide.bottomLine];
  for (const column of slide.columns ?? []) parts.push(column.label);
  for (const label of slide.labels ?? []) parts.push(label);
  for (const situation of slide.situations ?? []) {
    parts.push(situation.label, situation.outcome);
  }
  for (const robotEntry of slide.robots ?? []) {
    parts.push(robotEntry.status, robotEntry.traits, robotEntry.claim, robotEntry.command);
  }
  return parts.join(" ");
}

/** The deck's seven slides, in order — org#23's six plus the
 *  whats-next-finale-slide spec's trajectory finale. */
const EXPECTED_SLIDE_IDS = [
  "bridge",
  "paths",
  "stack",
  "surfaces",
  "autonomy",
  "close",
  "whats-next",
];

test("exactly seven slides, ids in beat order", () => {
  assert.equal(
    mindNervousSystemBodySlides.length,
    7,
    `expected exactly 7 slides, got ${mindNervousSystemBodySlides.length}`,
  );
  assert.deepEqual(
    mindNervousSystemBodySlides.map((slide) => slide.id),
    EXPECTED_SLIDE_IDS,
  );
  mindNervousSystemBodySlides.forEach((slide, index) => {
    assert.equal(
      slide.beat,
      index + 1,
      `slide ${slide.id}: beat must equal its 1-indexed position`,
    );
  });
});

test("slide 1 (bridge) matches the issue verbatim", () => {
  const slide = mindNervousSystemBodySlides[0];
  assert.equal(slide.kind, "bridge");
  assert.equal(slide.eyebrow, "the bridge");
  assert.equal(slide.headline, "CLI — The Bridge Between Agents and Robots");
  assert.equal(
    slide.bottomLine,
    "Agent-authored behavior. Robot-owned execution.",
  );
});

test("slide 2 (paths) carries the three intelligence-path columns verbatim", () => {
  const slide = mindNervousSystemBodySlides[1];
  assert.equal(slide.kind, "paths");
  assert.equal(slide.headline, "Intelligence reaches robots in different ways");
  assert.deepEqual(
    slide.columns.map((column) => column.label),
    ["Coded behavior", "Learned policy", "Agent tools"],
  );
  assert.equal(slide.bottomLine, "What matters is a stable boundary.");
});

test("slide 3 (stack) embeds the architecture diagram", () => {
  const slide = mindNervousSystemBodySlides[2];
  assert.equal(slide.kind, "stack");
  assert.equal(slide.diagram, true);
  assert.equal(slide.headline, "Keep execution below the model");
  assert.equal(slide.bottomLine, "The agent never owns the motors.");
});

test("slide 4 (surfaces) carries the three runtime-surface labels and the Reachy Mini action photo", () => {
  const slide = mindNervousSystemBodySlides[3];
  assert.equal(slide.kind, "surfaces");
  assert.equal(slide.headline, "Open the runtime to coder agents");
  assert.deepEqual(slide.labels, [
    "Configure behavior",
    "Command ad hoc",
    "Observe and repair",
  ]);
  assert.equal(slide.robot, "reachy-mini");
  assert.equal(slide.photoId, "reachy-mini-action");
  assert.equal(
    slide.bottomLine,
    "The agent maintains the automation. The runtime executes it.",
  );
});

test("slide 5 (autonomy) carries the three situations, all three photo-free", () => {
  const slide = mindNervousSystemBodySlides[4];
  assert.equal(slide.kind, "autonomy");
  assert.equal(slide.headline, "The robot continues without the agent");
  assert.equal(slide.situations.length, 3);
  const [stuck, disconnected, routine] = slide.situations;
  assert.equal(stuck.label, "Stuck");
  assert.equal(stuck.outcome, "inspect and adapt");
  assert.ok(
    !Object.prototype.hasOwnProperty.call(stuck, "robot"),
    "'Stuck' must not carry a robot",
  );
  assert.ok(
    !Object.prototype.hasOwnProperty.call(stuck, "photoId"),
    "'Stuck' must not carry a photo",
  );
  assert.equal(disconnected.label, "Disconnected");
  assert.equal(disconnected.outcome, "behavior continues");
  assert.ok(
    !Object.prototype.hasOwnProperty.call(disconnected, "robot"),
    "'Disconnected' must not carry a robot",
  );
  assert.ok(
    !Object.prototype.hasOwnProperty.call(disconnected, "photoId"),
    "'Disconnected' must not carry a photo",
  );
  assert.equal(routine.label, "Routine operation");
  assert.equal(routine.outcome, "no model required");
  assert.ok(
    !Object.prototype.hasOwnProperty.call(routine, "robot"),
    "'Routine operation' must not carry a robot",
  );
  assert.ok(
    !Object.prototype.hasOwnProperty.call(routine, "photoId"),
    "'Routine operation' must not carry a photo",
  );
  assert.equal(slide.bottomLine, "Spend intelligence on change—not repetition.");
  assert.ok(
    slide.spokenLine.startsWith("When the robot gets stuck"),
    `slide 5 spokenLine must start with "When the robot gets stuck": ${slide.spokenLine}`,
  );
});

test("slide 6 (close) carries both robots and the verbatim thesis", () => {
  const slide = mindNervousSystemBodySlides[5];
  assert.equal(slide.kind, "close");
  assert.equal(slide.headline, "Two robots, one direction");
  assert.equal(
    slide.bottomLine,
    "A CLI for intelligence. A runtime for embodiment.",
  );
  assert.equal(slide.robots.length, 2);
  const [reachy, arm] = slide.robots;
  assert.deepEqual(reachy, {
    robot: "reachy-mini",
    photoId: "reachy-mini-hero",
    status: "working system",
    traits: "Rules · behavior runtime · device daemon",
    claim: "The complete native-runtime pattern.",
    command: "reachy-mini-cli behavior engine run",
  });
  assert.deepEqual(arm, {
    robot: "so101",
    photoId: "so101-hero",
    status: "in progress",
    traits: "JSON · preview/apply · bounded motion",
    claim: "Building the operational contract first; persistent behavior comes next.",
    command: "arm101 arm flex --apply",
  });
});

test("close spokenLine is exactly the 4-sentence passage from the issue", () => {
  const slide = mindNervousSystemBodySlides[5];
  const expected =
    "Reachy Mini demonstrates the complete architecture: the agent can maintain rules while the runtime and daemon retain execution and hardware ownership. ARM101 is the next implementation. It already demonstrates the bounded CLI contract—observable state, explicit application, and guarded motion—and is progressing toward the same persistent runtime model. Whether execution happens through ROS or a native runtime, the principle is the same: give the coder agent a language for behavior, while robot software keeps control.";
  assert.equal(slide.spokenLine, expected);
  assert.equal(sentenceCount(slide.spokenLine), 4);
});

test("every spokenLine is nonempty, at most 6 sentences deck-wide, at most 4 before the finale", () => {
  for (const slide of mindNervousSystemBodySlides) {
    assert.ok(
      typeof slide.spokenLine === "string" && slide.spokenLine.trim().length > 0,
      `slide ${slide.id} must have a spoken line`,
    );
    assert.ok(
      sentenceCount(slide.spokenLine) <= 6,
      `slide ${slide.id} spoken line is more than 6 sentences: ${slide.spokenLine}`,
    );
    if (slide.id !== "whats-next") {
      assert.ok(
        sentenceCount(slide.spokenLine) <= 4,
        `slide ${slide.id} spoken line is more than 4 sentences (only the finale may run to 6): ${slide.spokenLine}`,
      );
    }
  }
});

test("slide 7 (whats-next) is the finale — trajectory content verbatim", () => {
  const slide = mindNervousSystemBodySlides[6];
  assert.equal(slide.kind, "next");
  assert.equal(
    slide,
    mindNervousSystemBodySlides[mindNervousSystemBodySlides.length - 1],
    "whats-next must be the last slide",
  );
  assert.equal(slide.headline, "What's next: See. Remember. Act.");
  assert.equal(
    slide.bottomLine,
    "The same architecture, expressed through a different body.",
  );
  assert.equal(slide.nextEntries.length, 2);
  const [reachy, arm] = slide.nextEntries;
  assert.deepEqual(reachy, {
    robot: "reachy-mini",
    claim: "Give presence understanding and history.",
    traits: "Semantic vision · embodied memory · behavior informed by experience",
  });
  assert.deepEqual(arm, {
    robot: "so101",
    claim: "Apply the same autonomy pattern to manipulation.",
    traits:
      "Persistent runtime · reachability memory · load-aware rules · supervised recovery",
  });
  assert.deepEqual(slide.separation, [
    "agent authors and supervises",
    "runtime persists and arbitrates",
    "body retains control",
  ]);
});

test("whats-next spokenLine is the six-sentence trajectory close, verbatim", () => {
  const slide = mindNervousSystemBodySlides[6];
  const expected =
    "Reachy already has an autonomous presence. Next, it should understand more of what it sees and retain useful memory of people, objects, events, and its environment. ARM101 already has the beginning of a safe operational language: observable state, guarded motion, overload sensing, and reachability exploration. Next, it gets the same persistent sense–rule–intent runtime—adapted for manipulation rather than expression. First, we gave an expressive robot an agent-maintainable presence. Next, we give that presence memory—and give a robotic arm the same autonomy.";
  assert.equal(slide.spokenLine, expected);
  assert.equal(sentenceCount(slide.spokenLine), 6);
});

test("bridge carries the speaker byline", () => {
  assert.equal(mindNervousSystemBodySlides[0].byline, "Ori Nachum");
});

test("kind/shape agreement — each optional field appears only on its matching kind", () => {
  for (const slide of mindNervousSystemBodySlides) {
    assert.equal(
      Array.isArray(slide.columns) && slide.columns.length > 0,
      slide.kind === "paths",
      `slide ${slide.id}: nonempty 'columns' present iff kind === "paths"`,
    );
    assert.equal(
      slide.diagram === true,
      slide.kind === "stack",
      `slide ${slide.id}: 'diagram' present iff kind === "stack"`,
    );
    assert.equal(
      Array.isArray(slide.labels) && slide.labels.length > 0,
      slide.kind === "surfaces",
      `slide ${slide.id}: nonempty 'labels' present iff kind === "surfaces"`,
    );
    assert.equal(
      slide.robot !== undefined,
      slide.kind === "surfaces",
      `slide ${slide.id}: top-level 'robot' present iff kind === "surfaces"`,
    );
    assert.equal(
      slide.photoId !== undefined,
      slide.kind === "surfaces",
      `slide ${slide.id}: top-level 'photoId' present iff kind === "surfaces"`,
    );
    assert.equal(
      Array.isArray(slide.nextEntries) && slide.nextEntries.length > 0,
      slide.kind === "next",
      `slide ${slide.id}: nonempty 'nextEntries' present iff kind === "next"`,
    );
    assert.equal(
      Array.isArray(slide.separation) && slide.separation.length > 0,
      slide.kind === "next",
      `slide ${slide.id}: nonempty 'separation' present iff kind === "next"`,
    );
    assert.equal(
      slide.byline !== undefined,
      slide.kind === "bridge",
      `slide ${slide.id}: 'byline' present iff kind === "bridge"`,
    );
    assert.equal(
      Array.isArray(slide.situations) && slide.situations.length > 0,
      slide.kind === "autonomy",
      `slide ${slide.id}: nonempty 'situations' present iff kind === "autonomy"`,
    );
    assert.equal(
      Array.isArray(slide.robots) && slide.robots.length > 0,
      slide.kind === "close",
      `slide ${slide.id}: nonempty 'robots' present iff kind === "close"`,
    );
    for (const retired of ["contrastRows", "commandLines", "rulesToml"]) {
      assert.ok(
        !Object.prototype.hasOwnProperty.call(slide, retired),
        `slide ${slide.id} must not carry the retired '${retired}' field`,
      );
    }
  }
});

test("photo discipline — each of the three slots is used exactly once, each on its own robot", () => {
  const allSlots = Object.values(photoSlotsByRobot).flat();
  const usedPhotos = [];
  for (const slide of mindNervousSystemBodySlides) {
    if (slide.photoId !== undefined) {
      usedPhotos.push({ photoId: slide.photoId, robot: slide.robot });
    }
    for (const situation of slide.situations ?? []) {
      if (situation.photoId !== undefined) {
        usedPhotos.push({ photoId: situation.photoId, robot: situation.robot });
      }
    }
    for (const robotEntry of slide.robots ?? []) {
      usedPhotos.push({ photoId: robotEntry.photoId, robot: robotEntry.robot });
    }
  }
  assert.equal(
    usedPhotos.length,
    allSlots.length,
    `expected all ${allSlots.length} photo slots used exactly once, got ${usedPhotos.length}`,
  );
  assert.deepEqual(
    usedPhotos.map((p) => p.photoId).sort(),
    [...allSlots].sort(),
    "every photo slot must be used exactly once, with no duplicates or leftovers",
  );
  for (const { photoId, robot } of usedPhotos) {
    assert.ok(
      photoSlotsByRobot[robot].includes(photoId),
      `photo ${photoId} is not one of ${robot}'s slots`,
    );
  }
  assert.equal(
    mindNervousSystemBodySlides[3].photoId,
    "reachy-mini-action",
    "reachy-mini-action must sit on the surfaces slide",
  );
  const closeRobots = mindNervousSystemBodySlides[5].robots;
  assert.deepEqual(
    closeRobots.map((r) => r.photoId).sort(),
    ["reachy-mini-hero", "so101-hero"],
    "both hero photos must sit on the close slide",
  );
});

test("robotLabel and photoSlotsByRobot cover both robots", () => {
  assert.ok(robotLabel["reachy-mini"]);
  assert.equal(robotLabel.so101, "SO-ARM101");
  assert.deepEqual(photoSlotsByRobot["reachy-mini"], [
    "reachy-mini-hero",
    "reachy-mini-action",
  ]);
  assert.deepEqual(photoSlotsByRobot.so101, ["so101-hero"]);
});

test("design-rate honesty — any 50 Hz mention is always qualified as 'design rate'", () => {
  for (const slide of mindNervousSystemBodySlides) {
    const text = flattenSlideText(slide);
    if (/50\s*Hz/.test(text)) {
      assert.ok(
        text.includes("design rate"),
        `slide ${slide.id} mentions 50 Hz without qualifying it as "design rate"`,
      );
    }
  }
});

test("no commit hashes or /blob/ URLs leak into any slide text", () => {
  const commitHash = /\b[0-9a-f]{40}\b/i;
  for (const slide of mindNervousSystemBodySlides) {
    const text = flattenSlideText(slide);
    assert.ok(!commitHash.test(text), `slide ${slide.id} contains a 40-char commit hash`);
    assert.ok(!text.includes("/blob/"), `slide ${slide.id} contains a /blob/ URL`);
  }
});

test("close robots' commands are prefixed with the correct robot's CLI binary, one each", () => {
  const closeSlide = mindNervousSystemBodySlides[5];
  const reachy = closeSlide.robots.find((r) => r.robot === "reachy-mini");
  const arm = closeSlide.robots.find((r) => r.robot === "so101");
  assert.ok(reachy, "expected a close-slide entry for reachy-mini");
  assert.ok(arm, "expected a close-slide entry for so101");
  assert.equal(typeof reachy.command, "string");
  assert.equal(typeof arm.command, "string");
  assert.ok(
    reachy.command.startsWith("reachy-mini-cli "),
    `reachy command does not start with "reachy-mini-cli ": ${reachy.command}`,
  );
  assert.ok(
    arm.command.startsWith("arm101 "),
    `arm101 command does not start with "arm101 ": ${arm.command}`,
  );
});

test("the ARM101 close entry is honestly in-progress, never claiming a persistent runtime", () => {
  const closeSlide = mindNervousSystemBodySlides[5];
  const arm = closeSlide.robots.find((r) => r.robot === "so101");
  assert.equal(arm.status, "in progress");
  const entryText = [arm.status, arm.traits, arm.claim, arm.command].join(" ");
  assert.ok(
    !/persistent runtime/i.test(entryText),
    `ARM101 close entry must not claim a persistent runtime: ${entryText}`,
  );
});

test("deckSources names exactly 2 GitHub projects and a note; no slide carries evidenceIds", () => {
  assert.equal(deckSources.projects.length, 2, "expected exactly 2 source projects");
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
