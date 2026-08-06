import type { SiteConfig } from "../types/content.ts";

export const siteConfig = {
  name: "OfertaStudio",
  fullName: "OfertaStudio — butikowe studio sprzedaży internetowej",
  legalName: null,
  descriptor: "Butikowe studio sprzedaży internetowej",
  positioning:
    "Butikowe studio sprzedaży internetowej łączące strategię, treść, design i technologię.",
  tagline: "Od produktu do skutecznej sprzedaży w internecie.",
  valueProposition:
    "Tworzymy strony, sklepy i oferty, które pomagają sprzedawać — od strategii i treści po design i wdrożenie.",
  url: "https://ofertastudio.pl",
  language: "pl",
  locale: "pl_PL",
  primaryCtaId: "project-conversation",
  metadata: {
    defaultTitle: "OfertaStudio — strony, sklepy i skuteczna sprzedaż online",
    titleTemplate: "%s | OfertaStudio",
    description:
      "Projektujemy strony, sklepy i prezentacje ofert, łącząc strategię sprzedaży, treść, design i technologię.",
  },
} as const satisfies SiteConfig;
