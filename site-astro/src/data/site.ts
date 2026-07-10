// PLACEHOLDER DATA — the content task replaces every value in this file with
// verified facts (each checkable against a live repo or doc). The shape is
// fixed by ./types.ts; do not change the shape here.

import type { SiteData } from "./types";

const site: SiteData = {
  hero: {
    title: "AgentCulture",
    tagline: "Placeholder tagline — replaced by the content task.",
    intro: [
      "Placeholder introduction paragraph one.",
      "Placeholder introduction paragraph two.",
    ],
  },
  framework: {
    intro: ["Placeholder framework introduction."],
    pillars: [
      {
        name: "placeholder-pillar",
        repo: "agentculture/placeholder",
        url: null,
        tagline: "Placeholder pillar tagline.",
        points: ["Placeholder point one.", "Placeholder point two."],
      },
    ],
  },
  agents: {
    intro: ["Placeholder agents introduction."],
    groups: ["Placeholder group"],
    entries: [
      {
        name: "placeholder-agent",
        repo: "agentculture/placeholder",
        url: null,
        role: "Placeholder role.",
        group: "Placeholder group",
      },
    ],
  },
  engage: {
    intro: ["Placeholder engage introduction."],
    channels: [
      {
        title: "Placeholder channel",
        description: "Placeholder description.",
        url: "https://example.com/",
        cta: "Placeholder",
      },
    ],
  },
};

export default site;
