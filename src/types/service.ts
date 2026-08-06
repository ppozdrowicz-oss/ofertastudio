import type { CtaId, IconName, PageSeo, SitePath } from "./core.ts";

export type ServiceGroupId =
  | "audits-development"
  | "marketplace"
  | "product-presentation"
  | "stores-shoper"
  | "websites";

export type ServiceId =
  | "allegro-audit"
  | "allegro-offer-creation"
  | "allegro-offer-optimization"
  | "company-websites"
  | "ecosystem-care"
  | "landing-pages"
  | "olx-offers"
  | "product-descriptions"
  | "product-graphics"
  | "product-photos"
  | "sales-consulting"
  | "shoper-audit"
  | "shoper-configuration"
  | "shoper-stores"
  | "shoper-template-customization"
  | "store-audit"
  | "store-care"
  | "store-ux-development"
  | "website-audit"
  | "website-care"
  | "website-modernization";

export type ServiceEntryPoint =
  | {
      kind: "group";
      id: ServiceGroupId;
    }
  | {
      kind: "service";
      id: ServiceId;
    };

export type RelatedServiceReference = {
  serviceId: ServiceId;
  relationship: "alternative" | "complement" | "next-step";
  reason: string;
};

export type ServiceGroup = {
  id: ServiceGroupId;
  slug: string;
  name: string;
  shortName: string;
  summary: string;
  customerQuestion: string;
  href: SitePath;
  icon: IconName;
  capabilities: readonly string[];
  featured: boolean;
  status: "planned" | "ready";
  primaryCtaId: CtaId;
  seo: PageSeo;
};

export type Service = {
  id: ServiceId;
  slug: string;
  name: string;
  shortName?: string;
  group: ServiceGroupId;
  summary: string;
  outcome: string;
  scope: readonly string[];
  href: SitePath;
  icon?: IconName;
  featured: boolean;
  status: "planned" | "ready";
  primaryCtaId: CtaId;
  relatedServices: readonly RelatedServiceReference[];
  seo: PageSeo;
};
