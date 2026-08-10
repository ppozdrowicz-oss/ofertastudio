import { siteConfig } from "../config/site.ts";
import type { CtaId } from "../types/content.ts";

type HomeHeroContent = {
  competenceAreas: readonly string[];
  eyebrow: string;
  handoff: {
    description: string;
    eyebrow: string;
    title: string;
  };
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
  handoff: {
    description:
      "Niespójna strona, trudny sklep i nieczytelna oferta zwiększają wysiłek klienta. Dlatego zaczynamy od uporządkowania problemu i właściwego następnego kroku.",
    eyebrow: "Dlaczego to ma znaczenie",
    title: "Dobry produkt może przegrać przez sposób, w jaki został pokazany.",
  },
  headline: "Tworzymy strony, sklepy i oferty, które pomagają sprzedawać.",
  lead: "Od strony firmowej i sklepu Shoper po prezentację produktu i ofertę Allegro. Projektujemy sposób, w jaki firma wygląda, działa i sprzedaje w internecie.",
  primaryCtaId: siteConfig.primaryCtaId,
  secondaryCtaId: "view-projects",
} as const satisfies HomeHeroContent;
