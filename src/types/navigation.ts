import type { CtaId, SitePath } from "./core.ts";

export type BreadcrumbItem = {
  label: string;
  href?: SitePath;
};

export type NavigationLinkItem = {
  id: string;
  label: string;
  href: SitePath;
  description?: string;
  kind: "link";
};

export type NavigationMenuGroup = {
  id: string;
  label: string;
  itemIds: readonly string[];
};

export type NavigationMenuItem = {
  id: string;
  label: string;
  href: SitePath;
  description: string;
  kind: "menu";
  align?: "left" | "right";
  presentation: "dropdown" | "mega";
  context?: {
    label: string;
    description: string;
  };
  groups?: readonly NavigationMenuGroup[];
  children: readonly NavigationLinkItem[];
};

export type NavigationItem = NavigationLinkItem | NavigationMenuItem;

export type FooterNavigationGroup = {
  id: string;
  label: string;
  items: readonly NavigationLinkItem[];
};

export type NavigationConfig = {
  header: readonly NavigationItem[];
  mobile: readonly NavigationItem[];
  footer: readonly FooterNavigationGroup[];
  headerCtaId: CtaId;
  mobileCtaId: CtaId;
};
