// The content contract between the data layer (src/data/site.ts) and the
// page/component layer. Navigation uses stable group ids so published
// /agents/#... anchors do not drift when a display label changes.

export interface Hero {
  /** The site's one-line identity, e.g. "AgentCulture". */
  title: string;
  /** Sub-line under the title: what this is, in one breath. */
  tagline: string;
  /** 1–3 short paragraphs answering "what is AgentCulture" on their own. */
  intro: string[];
}

export interface Pillar {
  /** Framework pillar name, e.g. "culture". */
  name: string;
  /** owner/repo, e.g. "agentculture/culture" — omit the URL if not public. */
  repo: string;
  /** Public URL for the pillar, or null when the repo is private. */
  url: string | null;
  /** One-line description. */
  tagline: string;
  /** 2–4 short supporting points. */
  points: string[];
}

export interface AgentGroup {
  /** Stable fragment id used by the directory jump navigation. */
  id: string;
  /** Human-readable group heading. */
  label: string;
}

export interface AgentEntry {
  /** Display name, usually the repo token. */
  name: string;
  /** owner/repo. */
  repo: string;
  /** Public URL, or null when the repo is private. */
  url: string | null;
  /** One-line role description. */
  role: string;
  /** Stable grouping key — must match one agents.groups id. */
  groupId: string;
}

export interface EngageChannel {
  title: string;
  description: string;
  url: string;
  /** Short call-to-action label for the link. */
  cta: string;
}

export interface SiteData {
  hero: Hero;
  framework: {
    /** 1–2 paragraphs introducing Organic Development. */
    intro: string[];
    pillars: Pillar[];
  };
  agents: {
    intro: string[];
    /** Ordered groups; every entry's groupId must appear here. */
    groups: AgentGroup[];
    entries: AgentEntry[];
  };
  engage: {
    intro: string[];
    channels: EngageChannel[];
  };
}
