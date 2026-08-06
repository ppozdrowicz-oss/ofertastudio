import type { Project, ProjectCategory } from "../types/project.ts";

type ProjectCategoryDefinition = {
  id: ProjectCategory;
  label: string;
  description: string;
};

export const projectCategories = [
  {
    id: "website",
    label: "Strona internetowa",
    description: "Strony firmowe, usługowe, landing page’e i modernizacje.",
  },
  {
    id: "online-store",
    label: "Sklep internetowy",
    description: "Projekty i rozwój sklepów niezależnie od platformy.",
  },
  {
    id: "shoper",
    label: "Shoper",
    description: "Wdrożenia, konfiguracje i personalizacje sklepów Shoper.",
  },
  {
    id: "allegro",
    label: "Allegro",
    description: "Tworzenie, optymalizacja i audyty ofert marketplace.",
  },
  {
    id: "product-photography",
    label: "Zdjęcia produktowe",
    description: "Sesje i galerie produktowe przygotowane do sprzedaży online.",
  },
  {
    id: "branding-sales",
    label: "Branding sprzedażowy",
    description: "Spójne systemy grafik, treści i prezentacji produktów.",
  },
  {
    id: "own-project",
    label: "Projekt własny",
    description:
      "Zweryfikowane projekty wewnętrzne pokazujące kompetencje studia.",
  },
] as const satisfies readonly ProjectCategoryDefinition[];

export const projects: readonly Project[] = [];
