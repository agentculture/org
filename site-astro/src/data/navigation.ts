import { articles, presentations } from "./presentations.ts";
import site from "./site.ts";

export interface SiteSectionNavigationItem {
  kind: "section";
  href: `/${string}/`;
  label: string;
}

export interface LinkNavigationItem {
  kind: "link";
  href: `/${string}/`;
  label: string;
}

export interface NavigationDestination {
  kind: "internal";
  href: `/${string}`;
  label: string;
  description: string;
}

export interface NavigationMenuGroup {
  id: string;
  label: string;
  items: readonly NavigationDestination[];
}

export interface MenuNavigationItem {
  kind: "menu";
  id: "agents" | "library";
  label: string;
  match: readonly `/${string}/`[];
  groups: readonly NavigationMenuGroup[];
}

export interface CtaNavigationItem {
  kind: "cta";
  href: `https://${string}`;
  label: string;
  newTab: true;
}

export type HeaderNavigationItem =
  | LinkNavigationItem
  | MenuNavigationItem
  | CtaNavigationItem;

export interface FooterNavigationItem {
  href: string;
  label: string;
  kind: "internal" | "external" | "product";
  newTab?: true;
}

export interface FooterNavigationGroup {
  id: string;
  label: string;
  items: readonly FooterNavigationItem[];
}

// The five owned section indexes remain the source for the homepage and
// footer. The header can consolidate them without hiding either library.
export const siteSections = [
  { kind: "section", href: "/framework/", label: "Framework" },
  { kind: "section", href: "/agents/", label: "Agents" },
  { kind: "section", href: "/articles/", label: "Articles" },
  { kind: "section", href: "/presentations/", label: "Presentations" },
  { kind: "section", href: "/engage/", label: "Engage" },
] as const satisfies readonly SiteSectionNavigationItem[];

const ownedAgentPages = site.agents.entries.flatMap((entry) => {
  if (typeof entry.url !== "string" || !entry.url.startsWith("/agents/")) {
    return [];
  }

  return [
    {
      kind: "internal" as const,
      href: entry.url as `/${string}`,
      label: entry.name,
      description: entry.role,
    },
  ];
});

const agentAreaLinks = site.agents.groups.map((group) => {
  const count = site.agents.entries.filter(
    (entry) => entry.groupId === group.id,
  ).length;

  return {
    kind: "internal" as const,
    href: `/agents/#${group.id}` as `/${string}`,
    label: group.label,
    description: `${count} ${count === 1 ? "agent" : "agents"}`,
  };
});

export const agentsNavigation = {
  kind: "menu",
  id: "agents",
  label: "Agents",
  match: ["/agents/"],
  groups: [
    {
      id: "agent-pages",
      label: "Agent pages",
      items: [
        {
          kind: "internal",
          href: "/agents/",
          label: "Browse all agents",
          description: "The full fleet, grouped by what each agent does.",
        },
        ...ownedAgentPages,
      ],
    },
    {
      id: "agent-areas",
      label: "Browse by area",
      items: agentAreaLinks,
    },
  ],
} as const satisfies MenuNavigationItem;

export const libraryNavigation = {
  kind: "menu",
  id: "library",
  label: "Library",
  match: ["/articles/", "/presentations/"],
  groups: [
    {
      id: "articles",
      label: "Articles",
      items: [
        {
          kind: "internal",
          href: "/articles/",
          label: "Browse all articles",
          description: "Full-text, sourced talks from the mesh.",
        },
        ...articles.map((article) => ({
          kind: "internal" as const,
          href: article.route,
          label: article.title,
          description: article.summary,
        })),
      ],
    },
    {
      id: "presentations",
      label: "Presentations",
      items: [
        {
          kind: "internal",
          href: "/presentations/",
          label: "Browse all presentations",
          description: "Symbolic decks — the slides behind the talks.",
        },
        ...presentations.map((presentation) => ({
          kind: "internal" as const,
          href: presentation.route,
          label: presentation.title,
          description: presentation.summary,
        })),
      ],
    },
  ],
} as const satisfies MenuNavigationItem;

export const learnNavigation = {
  kind: "cta",
  href: "https://agentculture.org/learn/",
  label: "Learn",
  newTab: true,
} as const satisfies CtaNavigationItem;

export const primaryNavigation = [
  { kind: "link", href: "/framework/", label: "Framework" },
  agentsNavigation,
  libraryNavigation,
  { kind: "link", href: "/engage/", label: "Engage" },
  learnNavigation,
] as const satisfies readonly HeaderNavigationItem[];

export const footerNavigation = [
  {
    id: "explore",
    label: "Explore",
    items: siteSections.slice(0, 4).map(({ href, label }) => ({
      href,
      label,
      kind: "internal" as const,
    })),
  },
  {
    id: "participate",
    label: "Participate",
    items: [
      { href: "/engage/", label: "Engage", kind: "internal" },
      {
        href: "https://github.com/agentculture",
        label: "GitHub",
        kind: "external",
      },
    ],
  },
  {
    id: "products-docs",
    label: "Products & docs",
    items: [
      {
        href: learnNavigation.href,
        label: learnNavigation.label,
        kind: "product",
        newTab: true,
      },
      {
        href: "https://culture.dev",
        label: "culture.dev",
        kind: "external",
      },
      {
        href: "https://tools.culture.dev",
        label: "tools.culture.dev",
        kind: "external",
      },
    ],
  },
] as const satisfies readonly FooterNavigationGroup[];

const withTrailingSlash = (pathname: string) =>
  pathname.endsWith("/") ? pathname : `${pathname}/`;

const matchesPrefix = (pathname: string, prefix: `/${string}/`) =>
  withTrailingSlash(pathname).startsWith(prefix);

export function isPrimaryNavCurrent(
  pathname: string,
  item:
    | HeaderNavigationItem
    | FooterNavigationItem
    | SiteSectionNavigationItem,
): boolean {
  if (item.kind === "menu") {
    return item.match.some((prefix) => matchesPrefix(pathname, prefix));
  }

  const isOwnedLink =
    item.kind === "link" ||
    item.kind === "section" ||
    item.kind === "internal";
  if (!isOwnedLink || !item.href.startsWith("/")) return false;

  return matchesPrefix(pathname, item.href as `/${string}/`);
}

export function isNavigationDestinationCurrent(
  pathname: string,
  destination: NavigationDestination,
): boolean {
  if (destination.href.includes("#")) return false;

  return withTrailingSlash(pathname) === withTrailingSlash(destination.href);
}
