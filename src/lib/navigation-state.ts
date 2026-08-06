import type { SitePath } from "../types/content.ts";

export function isPathActive(pathname: string, href: SitePath): boolean {
  if (href === "/") {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}
