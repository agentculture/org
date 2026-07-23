export interface SectionNavigationItem {
  kind: "section";
  href: `/${string}/`;
  label: string;
}

export interface CtaNavigationItem {
  kind: "cta";
  href: `https://${string}`;
  label: string;
  newTab: true;
}

export type HeaderNavigationItem =
  | SectionNavigationItem
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

export const sectionNavigation = [
  { kind: "section", href: "/framework/", label: "Framework" },
  { kind: "section", href: "/agents/", label: "Agents" },
  { kind: "section", href: "/articles/", label: "Articles" },
  { kind: "section", href: "/presentations/", label: "Presentations" },
  { kind: "section", href: "/engage/", label: "Engage" },
] as const satisfies readonly SectionNavigationItem[];

export const learnNavigation = {
  kind: "cta",
  href: "https://agentculture.org/learn/",
  label: "Open Learn",
  newTab: true,
} as const satisfies CtaNavigationItem;

export const primaryNavigation = [
  ...sectionNavigation,
  learnNavigation,
] as const satisfies readonly HeaderNavigationItem[];

export const footerNavigation = [
  {
    id: "explore",
    label: "Explore",
    items: sectionNavigation.slice(0, 4).map(({ href, label }) => ({
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

export function isPrimaryNavCurrent(
  pathname: string,
  item: HeaderNavigationItem | FooterNavigationItem,
): boolean {
  const isSection = item.kind === "section" || item.kind === "internal";
  if (!isSection || !item.href.startsWith("/")) return false;

  const here = withTrailingSlash(pathname);
  return here.startsWith(item.href);
}
