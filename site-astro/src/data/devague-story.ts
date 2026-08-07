import {
  challengeAdjudicateReexport,
  challengeSweepRoute,
  deviateLedgerRead,
  frameAnnounceCapture,
  frameGateConvergeExport,
  frameGateLiveRefusal,
  frameInterrogateReviewShift,
  planTaskConvergeExport,
  scopeSurveySeeds,
  summarySkeletonRead,
  type CaptureLine,
  type CapturePane,
} from "./devague-captures.ts";

export type CapturePaneId =
  | "frame-announce-capture"
  | "frame-interrogate-review-shift"
  | "frame-gate-converge-export"
  | "plan-task-converge-export"
  | "scope-survey-seeds"
  | "frame-gate-live-refusal"
  | "deviate-ledger-read"
  | "summary-skeleton-read"
  | "challenge-sweep-route"
  | "challenge-adjudicate-reexport";

export const capturePanes: Record<CapturePaneId, CapturePane> = {
  "frame-announce-capture": frameAnnounceCapture,
  "frame-interrogate-review-shift": frameInterrogateReviewShift,
  "frame-gate-converge-export": frameGateConvergeExport,
  "plan-task-converge-export": planTaskConvergeExport,
  "scope-survey-seeds": scopeSurveySeeds,
  "frame-gate-live-refusal": frameGateLiveRefusal,
  "deviate-ledger-read": deviateLedgerRead,
  "summary-skeleton-read": summarySkeletonRead,
  "challenge-sweep-route": challengeSweepRoute,
  "challenge-adjudicate-reexport": challengeAdjudicateReexport,
};

export interface StoryBeat {
  headline: string;
  narration: string;
  paneId: CapturePaneId;
  anchor: string;
  occurrence?: number;
  count: number;
  note?: string;
}

export interface SessionStory {
  n: 1 | 2 | 3;
  title: string;
  date: string;
  version: string;
  intro: string[];
  beats: StoryBeat[];
  heroPaneId: CapturePaneId;
  paneIds: CapturePaneId[];
}

const exactLineStarting = (pane: CapturePane, prefix: string): string => {
  const line = pane.lines.find(({ text }) => text.startsWith(prefix));
  if (!line) {
    throw new Error(`Missing story anchor in ${pane.id}: ${prefix}`);
  }
  return line.text;
};

export const sessions: SessionStory[] = [
  {
    n: 1,
    title: "The page specs itself",
    date: "14 July 2026",
    version: "devague 0.17",
    intro: [
      'Before this page was built, the team ran devague on the idea of the page. One sentence — "imagine this page is live: what does it contain?" — was broken into eighteen separate promises. A human approved or rejected every one. Only when each promise had an answer did the tool write the final spec — and the build plan\'s first task was to record this very session, so you can read it below.',
    ],
    beats: [
      {
        headline: "One sentence, pretended true",
        narration:
          "The method starts by pretending the work is finished: describe the launch you wish you could announce. The tool turns that one sentence into a frame — a container for every promise the announcement quietly makes.",
        paneId: "frame-announce-capture",
        anchor: exactLineStarting(
          frameAnnounceCapture,
          'devague new "agentculture.org/agents/devague is live',
        ),
        count: 2,
      },
      {
        headline: 'Promises land as "proposed"',
        narration:
          "Each promise is captured one at a time. Watch the last word of the reply: proposed. The AI suggested it — nobody has agreed to it yet.",
        paneId: "frame-announce-capture",
        anchor: exactLineStarting(
          frameAnnounceCapture,
          "devague capture --origin llm --kind audience",
        ),
        count: 2,
      },
      {
        headline: "Reality answers mid-session",
        narration:
          "Earlier the session hit a question it couldn't answer: the code was private but the package public — where should links point? While that question sat open, Ori made the repository public in real life. The session resolved its own question with something that had just actually happened.",
        paneId: "frame-interrogate-review-shift",
        anchor: exactLineStarting(
          frameInterrogateReviewShift,
          "devague question --resolve q1",
        ),
        count: 2,
      },
      {
        headline: "Fifteen yes, six no",
        narration:
          "A human went through every promise. Fifteen were approved — and six were rejected outright, on the record. Rejection is a first-class outcome here, not a failure.",
        paneId: "frame-interrogate-review-shift",
        anchor: "devague reject c3 c9 c12 h1 h4 h7",
        count: 7,
      },
      {
        headline: '"The USER decides"',
        narration:
          "When asked for status, the tool listed seven promises still undecided — and look at how it phrases the next step. It will not decide for you.",
        paneId: "frame-gate-converge-export",
        anchor: "recommended next move (first gap):",
        count: 2,
      },
      {
        headline: "Converged — and a plan in waves",
        narration:
          "With every promise settled, the spec became a build plan, and the plan sorted itself into waves — what can be built in parallel, and what has to wait. The first task in wave zero: record this session.",
        paneId: "plan-task-converge-export",
        anchor: "devague plan waves",
        count: 7,
      },
    ],
    heroPaneId: "frame-announce-capture",
    paneIds: [
      "frame-announce-capture",
      "frame-interrogate-review-shift",
      "frame-gate-converge-export",
      "plan-task-converge-export",
    ],
  },
  {
    n: 2,
    title: "The tool outgrows its own page",
    date: "15 July 2026",
    version: "devague 0.18",
    intro: [
      "By the next day the tool had grown three new abilities — which made this page out of date the moment they shipped. So the page went back through its own process. This session ran before the seventh leg existed, and its transcript honestly announces the method as it then stood: one leg shorter. This time, the tool refused to finish until the missing evidence arrived.",
    ],
    beats: [
      {
        headline: "Look first, then promise",
        narration:
          "New in this version: before promising anything, the session reads the real files and writes down what it found — with receipts naming exactly what was read.",
        paneId: "scope-survey-seeds",
        anchor: exactLineStarting(
          scopeSurveySeeds,
          'devague scope "site-astro/src/data/devague.ts"',
        ),
        count: 2,
      },
      {
        headline: "The gate refuses",
        narration:
          "Six promises still had no evidence behind them. The tool didn't warn — it refused, and listed exactly what was missing.",
        paneId: "frame-gate-live-refusal",
        anchor: "devague export",
        occurrence: 1,
        count: 3,
      },
      {
        headline: "Ori decides, live",
        narration:
          "Then a human typed an instruction directly. Watch the last word — every AI suggestion above needed explicit approval, but a person's own words are trusted the moment they land.",
        paneId: "frame-gate-live-refusal",
        anchor: exactLineStarting(
          frameGateLiveRefusal,
          'devague capture --kind decision "Ori loves',
        ),
        count: 2,
        note: "confirmed instantly — no separate approval step, because a human said it.",
      },
      {
        headline: "The empty ledger, said plainly",
        narration:
          "The tool keeps a ledger of moments the build had to leave the plan. Nothing went off-plan in this run — and the ledger says so, instead of inventing drama. Honesty over padding.",
        paneId: "deviate-ledger-read",
        anchor: "devague --version",
        count: 4,
      },
      {
        headline: "The report refuses to pretend",
        narration:
          "The delivery report was test-run before anything was built — so every result field correctly says 'fill this in later' rather than claiming work that hadn't happened.",
        paneId: "summary-skeleton-read",
        anchor: "## Mid-work Decisions",
        count: 4,
      },
    ],
    heroPaneId: "scope-survey-seeds",
    paneIds: [
      "scope-survey-seeds",
      "frame-gate-live-refusal",
      "deviate-ledger-read",
      "summary-skeleton-read",
    ],
  },
  {
    n: 3,
    title: "The what-did-we-miss pass",
    date: "15 July 2026",
    version: "devague 0.19",
    intro: [
      "One more ability arrived: a formal blind-spot check. It swept the finished spec through a fixed checklist of angles — hidden assumptions, security, what-if-it-breaks, can-we-undo-it — specifically to catch what nobody had thought to ask.",
    ],
    beats: [
      {
        headline: "One real catch",
        narration:
          "The sweep found a genuinely undecided question — seven cards in a grid designed for six — and routed it to a human to decide, rather than quietly picking an answer.",
        paneId: "challenge-sweep-route",
        anchor: exactLineStarting(
          challengeSweepRoute,
          'devague scope "challenge pass / unstated-assumptions lens',
        ),
        count: 2,
      },
      {
        headline: "Honest about the unknown",
        narration:
          "One thing couldn't be known yet — how a layout reads on tablet-sized screens — so it was parked as an open unknown instead of being papered over.",
        paneId: "challenge-sweep-route",
        anchor: exactLineStarting(
          challengeSweepRoute,
          'devague park "how the re-timed 9-stage cascade',
        ),
        count: 2,
      },
      {
        headline: "Adjudicated, reconverged, re-exported",
        narration:
          "Ori confirmed the one open call, the frame converged again, and the export rewrote the same spec file — the pass made the existing spec stronger rather than spawning a new one.",
        paneId: "challenge-adjudicate-reexport",
        anchor: "devague confirm c19",
        count: 7,
      },
    ],
    heroPaneId: "challenge-sweep-route",
    paneIds: ["challenge-sweep-route", "challenge-adjudicate-reexport"],
  },
];

export const getCapturePane = (paneId: CapturePaneId): CapturePane =>
  capturePanes[paneId];

export const resolveStoryBeat = (
  beat: StoryBeat,
): { pane: CapturePane; lines: CaptureLine[] } => {
  const pane = getCapturePane(beat.paneId);
  const occurrence = beat.occurrence ?? 1;
  let seen = 0;
  const start = pane.lines.findIndex((line) => {
    if (line.text !== beat.anchor) return false;
    seen += 1;
    return seen === occurrence;
  });

  if (start < 0) {
    throw new Error(
      `Story anchor did not resolve in ${pane.id} (occurrence ${occurrence}): ${beat.anchor}`,
    );
  }

  const lines = pane.lines.slice(start, start + beat.count);
  if (lines.length !== beat.count) {
    throw new Error(
      `Story excerpt overruns ${pane.id}: wanted ${beat.count} lines from ${beat.anchor}`,
    );
  }

  return { pane, lines };
};

export const validateDevagueStory = (): void => {
  for (const session of sessions) {
    for (const beat of session.beats) resolveStoryBeat(beat);
  }
};

validateDevagueStory();
