import { routes } from "../config/routes.ts";
import type { FaqItem } from "../types/content.ts";

export const faqs = [
  {
    id: "where-to-start",
    question: "Nie wiem, której usługi potrzebuję. Od czego zacząć?",
    answer:
      "Opisz obecną sytuację i cel w krótkim briefie. Na tej podstawie ustalimy, czy właściwym krokiem jest konsultacja, audyt czy konkretny zakres wdrożenia.",
    category: "cooperation",
    relatedServiceIds: ["sales-consulting"],
    relatedPageHrefs: [routes.brief, routes.auditsDevelopment],
    status: "draft",
  },
  {
    id: "single-or-combined-service",
    question: "Czy można zlecić jedną usługę, czy tylko cały pakiet?",
    answer:
      "Zakres może obejmować pojedynczy, dobrze zdefiniowany element albo kilka powiązanych usług. Zawsze ustalamy odpowiedzialności i zależności przed rozpoczęciem pracy.",
    category: "scope",
    relatedServiceIds: [
      "product-photos",
      "product-graphics",
      "product-descriptions",
    ],
    relatedPageHrefs: [routes.offer, routes.productPresentation],
    status: "draft",
  },
  {
    id: "existing-shoper-store",
    question: "Czy pracujecie z już działającym sklepem Shoper?",
    answer:
      "Tak. Przed zmianami oceniamy konfigurację, szablon i dotychczasowe modyfikacje, aby dobrać bezpieczny zakres audytu, rozwoju lub stałej opieki.",
    category: "scope",
    relatedServiceIds: ["shoper-audit", "store-ux-development", "store-care"],
    relatedPageHrefs: [routes.stores, routes.shoperAudit],
    status: "draft",
  },
  {
    id: "pricing-method",
    question: "Jak ustalana jest cena projektu?",
    answer:
      "Cena wynika z potwierdzonego zakresu, liczby materiałów, odpowiedzialności i złożoności wdrożenia. Przed wyceną jasno wskazujemy, jakie informacje są jeszcze potrzebne.",
    category: "pricing",
    relatedServiceIds: [],
    relatedPageHrefs: [routes.offer, routes.brief],
    status: "draft",
  },
  {
    id: "product-materials-together",
    question: "Czy zdjęcia, grafiki i opisy mogą powstać w jednym projekcie?",
    answer:
      "Tak. Wspólny plan galerii i argumentów ogranicza powtórzenia oraz pomaga przygotować spójne materiały do sklepu, strony i marketplace.",
    category: "scope",
    relatedServiceIds: [
      "product-photos",
      "product-graphics",
      "product-descriptions",
    ],
    relatedPageHrefs: [routes.productPresentation],
    status: "draft",
  },
  {
    id: "support-after-launch",
    question: "Czy po wdrożeniu można kontynuować współpracę?",
    answer:
      "Tak, jeżeli zakres wymaga dalszego wsparcia. Model opieki, dostępność i sposób rozliczenia ustalamy osobno dla strony, sklepu lub wielokanałowego ekosystemu.",
    category: "support",
    relatedServiceIds: ["website-care", "store-care", "ecosystem-care"],
    relatedPageHrefs: [routes.auditsDevelopment, routes.contact],
    status: "draft",
  },
] as const satisfies readonly FaqItem[];
