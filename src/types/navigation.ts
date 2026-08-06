import type { CtaId, SitePath } from "./content.ts";

export type NavigationItem = {
  id: string;
  label: string;
  href: SitePath;
  description?: string;
  kind: "link" | "menu";
  children?: readonly NavigationItem[];
};

export type FooterNavigationGroup = {
  id: string;
  label: string;
  items: readonly NavigationItem[];
};

export type NavigationConfig = {
  header: readonly NavigationItem[];
  mobile: readonly NavigationItem[];
  footer: readonly FooterNavigationGroup[];
  headerCtaId: CtaId;
  mobileCtaId: CtaId;
};
