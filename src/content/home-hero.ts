import { siteConfig } from "../config/site.ts";
import type { CtaId } from "../types/content.ts";

type HomeHeroContent = {
  competenceAreas: readonly string[];
  eyebrow: string;
  headline: string;
  lead: string;
  primaryCtaId: CtaId;
  secondaryCtaId: CtaId;
};

export const homeHeroContent = {
  competenceAreas: [
    "Strony",
    "Shoper",
    "E-commerce",
    "Allegro",
    "UX/UI",
    "Produkt",
  ],
  eyebrow: siteConfig.descriptor,
  headline: "Tworzymy strony, sklepy i oferty, które pomagają sprzedawać.",
  lead: "Od strony firmowej i sklepu Shoper po prezentację produktu i ofertę Allegro. Projektujemy sposób, w jaki firma wygląda, działa i sprzedaje w internecie.",
  primaryCtaId: siteConfig.primaryCtaId,
  secondaryCtaId: "view-projects",
} as const satisfies HomeHeroContent;
