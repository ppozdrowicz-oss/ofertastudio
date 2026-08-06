import { routes } from "../config/routes.ts";
import type { PageRegistryEntry } from "../types/content.ts";
import type { Service, ServiceGroup } from "../types/service.ts";
import { serviceGroups } from "./service-groups.ts";
import { services } from "./services.ts";

const corePages = [
  {
    id: "page:home",
    href: routes.home,
    name: "Strona główna",
    type: "home",
    status: "ready",
    primaryCtaId: "project-conversation",
    seo: {
      title: "OfertaStudio — strony, sklepy i skuteczna sprzedaż online",
      description:
        "Butikowe studio łączące strategię, treść, design i technologię dla stron, sklepów i ofert sprzedażowych.",
      primaryKeyword: "studio sprzedaży internetowej",
      intent: "commercial",
      supportingKeywords: [
        "OfertaStudio",
        "strony sklepy i oferty",
        "sprzedaż internetowa dla firm",
      ],
      canonical: routes.home,
      indexable: true,
      cannibalization: {
        risk: "low",
        note: "Strona główna pozycjonuje markę i system usług, nie przejmuje fraz filarów.",
      },
    },
  },
  {
    id: "page:projects",
    href: routes.projects,
    name: "Realizacje",
    type: "project-index",
    parentId: "page:home",
    status: "planned",
    primaryCtaId: "project-conversation",
    seo: {
      title: "Realizacje OfertaStudio — strony, sklepy i oferty",
      description:
        "Zobacz zweryfikowane projekty stron, sklepów Shoper, ofert marketplace i prezentacji produktów.",
      primaryKeyword: "realizacje stron i sklepów internetowych",
      intent: "commercial",
      supportingKeywords: [
        "portfolio Shoper",
        "realizacje Allegro",
        "projekty OfertaStudio",
      ],
      canonical: routes.projects,
      indexable: true,
      cannibalization: {
        risk: "none",
        note: "Indeks realizacji wspiera strony usługowe dowodami, nie zastępuje ich treści.",
      },
    },
  },
  {
    id: "page:offer",
    href: routes.offer,
    name: "Oferta i modele współpracy",
    type: "offer",
    parentId: "page:home",
    status: "planned",
    primaryCtaId: "project-conversation",
    seo: {
      title: "Oferta współpracy — projekty, audyty i stały rozwój",
      description:
        "Poznaj obszary usług OfertaStudio oraz różnice między wdrożeniem, audytem i stałą współpracą.",
      primaryKeyword: "oferta sprzedaży internetowej",
      intent: "commercial",
      supportingKeywords: [
        "usługi e-commerce",
        "oferta stron i sklepów",
        "stała obsługa online",
      ],
      canonical: routes.offer,
      indexable: true,
      cannibalization: {
        risk: "medium",
        note: "Strona porównuje modele współpracy i odsyła do filarów; nie optymalizuje się jej na szczegółowe frazy usługowe.",
      },
    },
  },
  {
    id: "page:process",
    href: routes.process,
    name: "Jak pracujemy",
    type: "process",
    parentId: "page:home",
    status: "planned",
    primaryCtaId: "project-conversation",
    seo: {
      title: "Jak pracujemy — proces współpracy z OfertaStudio",
      description:
        "Poznaj etapy od diagnozy i zakresu przez treść, projekt i wdrożenie po dalszy rozwój rozwiązania.",
      primaryKeyword: "proces tworzenia strony internetowej",
      intent: "informational",
      supportingKeywords: [
        "jak wygląda tworzenie sklepu internetowego",
        "etapy współpracy z agencją",
        "proces wdrożenia strony",
      ],
      canonical: routes.process,
      indexable: true,
      cannibalization: {
        risk: "low",
        note: "Strona opisuje wspólny proces, a strony usługowe tylko jego wariant kontekstowy.",
      },
    },
  },
  {
    id: "page:about",
    href: routes.about,
    name: "O nas",
    type: "about",
    parentId: "page:home",
    status: "planned",
    primaryCtaId: "project-conversation",
    seo: {
      title: "O OfertaStudio — butikowym studiu sprzedaży internetowej",
      description:
        "Poznaj specjalizację, sposób myślenia i zasady pracy OfertaStudio przy stronach, sklepach i ofertach online.",
      primaryKeyword: "OfertaStudio",
      intent: "navigational",
      supportingKeywords: ["o OfertaStudio", "studio sprzedaży internetowej"],
      canonical: routes.about,
      indexable: true,
      cannibalization: {
        risk: "none",
        note: "Strona buduje wiarygodność marki i nie przejmuje intencji usługowych.",
      },
    },
  },
  {
    id: "page:contact",
    href: routes.contact,
    name: "Kontakt",
    type: "contact",
    parentId: "page:home",
    status: "planned",
    primaryCtaId: "contact",
    seo: {
      title: "Kontakt — porozmawiajmy o projekcie",
      description:
        "Skontaktuj się z OfertaStudio w sprawie strony, sklepu Shoper, ofert marketplace lub prezentacji produktów.",
      primaryKeyword: "kontakt OfertaStudio",
      intent: "navigational",
      supportingKeywords: [
        "OfertaStudio kontakt",
        "wycena projektu internetowego",
      ],
      canonical: routes.contact,
      indexable: true,
      cannibalization: {
        risk: "none",
        note: "Strona obsługuje intencję kontaktową i brandową.",
      },
    },
  },
  {
    id: "page:brief",
    href: routes.brief,
    name: "Brief projektu",
    type: "brief",
    parentId: "page:contact",
    status: "planned",
    primaryCtaId: "need-guidance",
    seo: {
      title: "Brief projektu dla OfertaStudio",
      description:
        "Opisz swoją sytuację, cel i dostępne materiały, abyśmy mogli wskazać właściwy następny krok.",
      primaryKeyword: "brief projektu internetowego",
      intent: "transactional",
      supportingKeywords: [
        "brief strony internetowej",
        "brief sklepu internetowego",
      ],
      canonical: routes.brief,
      indexable: false,
      cannibalization: {
        risk: "none",
        note: "Formularz kwalifikacyjny pozostaje poza indeksem i wspiera konwersję.",
      },
    },
  },
  {
    id: "page:privacy",
    href: routes.privacy,
    name: "Polityka prywatności",
    type: "legal",
    parentId: "page:home",
    status: "planned",
    seo: {
      title: "Polityka prywatności",
      description: "Informacje o przetwarzaniu danych w serwisie OfertaStudio.",
      primaryKeyword: "polityka prywatności OfertaStudio",
      intent: "navigational",
      supportingKeywords: [],
      canonical: routes.privacy,
      indexable: false,
      cannibalization: {
        risk: "none",
        note: "Strona formalna nie uczestniczy w strategii pozyskiwania ruchu.",
      },
    },
  },
  {
    id: "page:cookies",
    href: routes.cookies,
    name: "Polityka cookies",
    type: "legal",
    parentId: "page:home",
    status: "planned",
    seo: {
      title: "Polityka cookies",
      description:
        "Informacje o wykorzystaniu plików cookies w serwisie OfertaStudio.",
      primaryKeyword: "polityka cookies OfertaStudio",
      intent: "navigational",
      supportingKeywords: [],
      canonical: routes.cookies,
      indexable: false,
      cannibalization: {
        risk: "none",
        note: "Strona formalna nie uczestniczy w strategii pozyskiwania ruchu.",
      },
    },
  },
] as const satisfies readonly PageRegistryEntry[];

function serviceGroupToPage(group: ServiceGroup): PageRegistryEntry {
  return {
    id: `group:${group.id}`,
    href: group.href,
    name: group.name,
    type: "service-group",
    parentId: "page:home",
    status: group.status === "ready" ? "ready" : "planned",
    primaryCtaId: group.primaryCtaId,
    seo: group.seo,
  };
}

function serviceToPage(service: Service): PageRegistryEntry {
  return {
    id: `service:${service.id}`,
    href: service.href,
    name: service.name,
    type: "service",
    parentId: `group:${service.group}`,
    status: service.status === "ready" ? "ready" : "planned",
    primaryCtaId: service.primaryCtaId,
    seo: service.seo,
  };
}

export const plannedPages: readonly PageRegistryEntry[] = [
  ...corePages,
  ...serviceGroups.map(serviceGroupToPage),
  ...services.map(serviceToPage),
];
