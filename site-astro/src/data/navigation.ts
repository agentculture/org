export interface PrimaryNavigationItem {
  href: `/${string}/`;
  label: string;
  match?: "section";
}

export const primaryNavigation = [
  { href: "/learn/", label: "Learn" },
  { href: "/framework/", label: "Framework" },
  { href: "/agents/", label: "Agents" },
  { href: "/presentations/", label: "Presentations", match: "section" },
  { href: "/engage/", label: "Engage" },
] as const satisfies readonly PrimaryNavigationItem[];

const withTrailingSlash = (pathname: string) =>
  pathname.endsWith("/") ? pathname : `${pathname}/`;

export function isPrimaryNavCurrent(
  pathname: string,
  item: PrimaryNavigationItem,
): boolean {
  const here = withTrailingSlash(pathname);

  if (item.match === "section") {
    return here.startsWith(item.href);
  }

  return here === item.href;
}
