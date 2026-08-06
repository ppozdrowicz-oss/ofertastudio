import type { CtaId, PageSeo, SitePath } from "./core.ts";
import type { ServiceEntryPoint, ServiceId } from "./service.ts";

export type {
  CannibalizationRisk,
  CtaId,
  IconName,
  PageSeo,
  SearchIntent,
  SitePath,
} from "./core.ts";

export type Cta = {
  id: CtaId;
  label: string;
  href: SitePath;
  purpose: string;
  placement: "contextual" | "global" | "supporting";
  style: "primary" | "secondary" | "text";
};

export type AudienceId =
  | "inconsistent-sales-ecosystem"
  | "local-service-businesses"
  | "marketplace-sellers"
  | "online-sales-starters"
  | "shoper-store-owners"
  | "small-medium-commerce";

export type AudienceSegment = {
  id: AudienceId;
  name: string;
  summary: string;
  primaryProblem: string;
  needs: readonly string[];
  purchaseConcerns: readonly string[];
  expectedOutcome: string;
  entryPoint: ServiceEntryPoint;
  salesArgument: string;
  ctaId: CtaId;
  priority: "primary" | "secondary";
};

export type ProcessStepId =
  | "diagnosis"
  | "direction"
  | "implementation"
  | "launch-development"
  | "solution-design";

export type ProcessStep = {
  id: ProcessStepId;
  order: number;
  name: string;
  summary: string;
  clientInput: string;
  deliverable: string;
};

export type FaqCategory = "cooperation" | "pricing" | "scope" | "support";

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  category: FaqCategory;
  relatedServiceIds: readonly ServiceId[];
  relatedPageHrefs: readonly SitePath[];
  status: "approved" | "draft";
};

export type HomepageSectionId =
  | "audiences"
  | "audit"
  | "client-problems"
  | "collaboration-models"
  | "faq"
  | "final-cta"
  | "hero"
  | "outcomes"
  | "process"
  | "proof"
  | "projects"
  | "service-pillars"
  | "shoper-specialization";

export type PageSectionPlan = {
  id: HomepageSectionId;
  order: number;
  name: string;
  purpose: string;
  keyMessage: string;
  contentFormat: string;
  ctaIds: readonly CtaId[];
  linkedHrefs: readonly SitePath[];
  conversionRole: string;
};

export type ServicePageSectionId =
  | "applications"
  | "differentiators"
  | "faq"
  | "final-cta"
  | "hero"
  | "outcome"
  | "pricing"
  | "problem"
  | "process"
  | "projects"
  | "related-services"
  | "scope";

export type ServicePageSectionPlan = {
  id: ServicePageSectionId;
  order: number;
  name: string;
  requirement: "conditional" | "optional" | "required";
  purpose: string;
  contentGuidance: string;
  condition?: string;
};

export type ConversionPathId =
  | "allegro-seller"
  | "needs-website"
  | "ongoing-partnership"
  | "shoper-owner"
  | "unsure-need";

export type ConversionPath = {
  id: ConversionPathId;
  name: string;
  intent: string;
  steps: readonly SitePath[];
  barriers: readonly string[];
  trustSignals: readonly string[];
  primaryCtaId: CtaId;
  secondaryCtaId: CtaId;
  requiredInformation: readonly string[];
};

export type PageType =
  | "about"
  | "brief"
  | "contact"
  | "home"
  | "legal"
  | "offer"
  | "process"
  | "project-index"
  | "service"
  | "service-group";

export type PageRegistryEntry = {
  id: string;
  href: SitePath;
  name: string;
  type: PageType;
  parentId?: string;
  status: "planned" | "ready";
  primaryCtaId?: CtaId;
  seo: PageSeo;
};

export type SiteConfig = {
  name: string;
  fullName: string;
  legalName: string | null;
  descriptor: string;
  positioning: string;
  tagline: string;
  valueProposition: string;
  url: `https://${string}`;
  language: "pl";
  locale: "pl_PL";
  primaryCtaId: CtaId;
  metadata: {
    defaultTitle: string;
    titleTemplate: string;
    description: string;
  };
};

export type SocialNetwork = "facebook" | "instagram" | "linkedin" | "youtube";

export type ContactConfig = {
  email: string | null;
  phone: string | null;
  address: string | null;
  legalName: string | null;
  taxId: string | null;
  businessHours: string | null;
  socialProfiles: Record<SocialNetwork, string | null>;
  contactHref: SitePath;
  briefHref: SitePath;
  status: "requires-confirmation" | "verified";
};
