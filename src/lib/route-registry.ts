import { routes } from "../config/routes.ts";
import { plannedPages } from "../content/page-registry.ts";
import type { PageRegistryEntry, SitePath } from "../types/content.ts";
import type { BreadcrumbItem } from "../types/navigation.ts";

const pagesByHref = new Map<SitePath, PageRegistryEntry>(
  plannedPages.map((page) => [page.href, page]),
);
const pagesById = new Map<string, PageRegistryEntry>(
  plannedPages.map((page) => [page.id, page]),
);

export const technicalPageEntries = plannedPages.filter(
  (page) => page.href !== routes.home,
);

export const renderedSiteHrefs = plannedPages.map((page) => page.href);

export function getRegisteredPage(
  href: SitePath,
): PageRegistryEntry | undefined {
  return pagesByHref.get(href);
}

export function getTechnicalRouteParams(): { slug: string[] }[] {
  return technicalPageEntries.map((page) => ({
    slug: page.href.slice(1).split("/"),
  }));
}

export function getBreadcrumbItems(href: SitePath): readonly BreadcrumbItem[] {
  const currentPage = getRegisteredPage(href);

  if (!currentPage || currentPage.href === routes.home) {
    return [];
  }

  const chain: PageRegistryEntry[] = [];
  const visitedIds = new Set<string>();
  let page: PageRegistryEntry | undefined = currentPage;

  while (page) {
    if (visitedIds.has(page.id)) {
      throw new Error(`Cykliczna hierarchia breadcrumbs dla ${href}.`);
    }

    visitedIds.add(page.id);
    chain.unshift(page);
    page = page.parentId ? pagesById.get(page.parentId) : undefined;
  }

  return chain.map((entry, index) =>
    index === chain.length - 1
      ? { label: entry.name }
      : { href: entry.href, label: entry.name },
  );
}
