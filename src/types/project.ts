import type { CtaId, SitePath } from "./content.ts";
import type { ServiceId } from "./service.ts";

export type ProjectCategory =
  | "allegro"
  | "branding-sales"
  | "online-store"
  | "own-project"
  | "product-photography"
  | "shoper"
  | "website";

export type ProjectAsset = {
  src: SitePath;
  alt: string;
  width: number;
  height: number;
  kind: "after" | "before" | "detail" | "overview";
};

export type ProjectTestimonial = {
  quote: string;
  author: string;
  role: string | null;
  consentConfirmed: true;
};

type ProjectBase = {
  id: string;
  slug: string;
  name: string;
  categories: readonly ProjectCategory[];
  summary: string;
  relatedServiceIds: readonly ServiceId[];
  primaryCtaId: CtaId;
};

export type PlannedProject = ProjectBase & {
  status: "planned";
};

export type PublishedProject = ProjectBase & {
  status: "published";
  initialState: string;
  problem: string;
  scope: readonly string[];
  process: readonly string[];
  solutions: readonly string[];
  outcome: {
    summary: string;
    evidence: readonly string[];
  };
  gallery: readonly ProjectAsset[];
  beforeAfter?: {
    before: ProjectAsset;
    after: ProjectAsset;
    explanation: string;
  };
  technologies: readonly string[];
  testimonial?: ProjectTestimonial;
};

export type Project = PlannedProject | PublishedProject;
