import {
  sessions,
  validateDevagueStory,
} from "../src/data/devague-story.ts";

validateDevagueStory();

const beatCount = sessions.reduce(
  (total, session) => total + session.beats.length,
  0,
);

if (sessions.length !== 3 || beatCount !== 14) {
  throw new Error(
    `Unexpected Devague story shape: ${sessions.length} sessions, ${beatCount} beats`,
  );
}

console.log(
  `Devague story anchors resolve: ${sessions.length} sessions, ${beatCount} excerpts.`,
);
