export type SitePath = "/" | `/${string}`;

export type SearchIntent =
  "commercial" | "informational" | "local" | "navigational" | "transactional";

export type CannibalizationRisk = "high" | "low" | "medium" | "none";

export type PageSeo = {
  title: string;
  description: string;
  primaryKeyword: string;
  intent: SearchIntent;
  supportingKeywords: readonly string[];
  canonical: SitePath;
  indexable: boolean;
  cannibalization: {
    risk: CannibalizationRisk;
    note: string;
  };
};

export type IconName =
  | "audit"
  | "camera"
  | "commerce"
  | "content"
  | "marketplace"
  | "support"
  | "websites";

export type CtaId =
  | "contact"
  | "free-diagnosis"
  | "need-guidance"
  | "project-conversation"
  | "view-projects";
