import type { DiagnosticDomainId } from "../lib/experience/diagnosis.ts";
import type { CtaId } from "../types/content.ts";

export type HomeProblemItem = {
  category: string;
  description: string;
  id: string;
  index: string;
  sceneDomain: DiagnosticDomainId;
  title: string;
};

export type HomeDiagnosisStep = {
  description: string;
  id: string;
  index: string;
  title: string;
};

type HomeProblemDiagnosisContent = {
  diagnosis: {
    eyebrow: string;
    lead: string;
    result: string;
    steps: readonly HomeDiagnosisStep[];
    title: string;
  };
  handoff: {
    eyebrow: string;
    lead: string;
    title: string;
  };
  intro: {
    eyebrow: string;
    lead: string;
    title: string;
  };
  miniDiagnosis: {
    ctaId: CtaId;
    eyebrow: string;
    lead: string;
    note: string;
    title: string;
  };
  problemField: {
    eyebrow: string;
    lead: string;
    problems: readonly HomeProblemItem[];
    title: string;
  };
};

export const homeProblemDiagnosisContent = {
  diagnosis: {
    eyebrow: "Diagnoza przed zakresem",
    lead: "Najpierw sprawdzamy, gdzie powstaje największe tarcie, jak elementy wpływają na siebie i co ma sens zmienić w pierwszej kolejności.",
    result:
      "Wiemy, co wymaga zmiany — i czego nie trzeba ruszać. To podstawa do ustalenia właściwego zakresu, nie obietnica gotowego rozwiązania.",
    steps: [
      {
        description:
          "Łączymy objawy z miejscami, w których klient traci orientację albo pewność decyzji.",
        id: "relationships",
        index: "01",
        title: "Rozpoznajemy zależności",
      },
      {
        description:
          "Oddzielamy problem istotny dla całej ścieżki od zmian, które mogą poczekać.",
        id: "priority",
        index: "02",
        title: "Ustalamy priorytet",
      },
      {
        description:
          "Dobieramy pierwszy etap tak, aby nie przebudowywać sprawnych elementów bez powodu.",
        id: "scope",
        index: "03",
        title: "Wyznaczamy sensowny zakres",
      },
    ],
    title: "Nie zawsze trzeba przebudowywać wszystko.",
  },
  handoff: {
    eyebrow: "Następny rozdział",
    lead: "Kiedy wiemy, gdzie leży problem, możemy zmienić sposób, w jaki klient odbiera całość.",
    title: "Diagnoza to dopiero początek.",
  },
  intro: {
    eyebrow: "To, że działa, nie znaczy, że działa dobrze",
    lead: "Klient odbiera stronę, sklep, produkt i ofertę jako jedno doświadczenie. Gdy struktura, treść albo kolejny krok przestają być czytelne, cały system wymaga więcej wysiłku — nawet jeśli każdy element technicznie działa.",
    title: "Technicznie działa. Ale czy pomaga sprzedawać?",
  },
  miniDiagnosis: {
    ctaId: "free-diagnosis",
    eyebrow: "Pierwszy krok",
    lead: "Pokaż nam swoją stronę, sklep lub ofertę. Najpierw sprawdzimy, gdzie naprawdę leży problem i jaki następny krok ma sens.",
    note: "Bezpłatna diagnoza służy kwalifikacji potrzeby. Nie jest automatycznym audytem ani obietnicą wyniku.",
    title: "Nie wiesz, od czego zacząć?",
  },
  problemField: {
    eyebrow: "Sześć punktów tarcia",
    lead: "Problem rzadko kończy się na jednym ekranie. Poniższe sytuacje pokazują miejsca, w których prezentacja, użyteczność i ścieżka decyzji przestają ze sobą współpracować.",
    problems: [
      {
        category: "Shoper",
        description:
          "Brakuje hierarchii i elementów, które odróżniają ofertę oraz prowadzą przez zakup.",
        id: "template-without-identity",
        index: "01",
        sceneDomain: "shoper",
        title: "Sklep działa, ale nadal wygląda jak gotowy szablon.",
      },
      {
        category: "Mobile",
        description:
          "Nawigacja, filtry albo kontakt są dostępne, lecz wymagają zbyt wielu nieoczywistych działań.",
        id: "mobile-friction",
        index: "02",
        sceneDomain: "mobile",
        title:
          "Wersja mobilna mieści treść, lecz utrudnia najważniejsze działania.",
      },
      {
        category: "Produkt",
        description:
          "Parametry, korzyści i materiały konkurują o uwagę zamiast odpowiadać na pytania w dobrej kolejności.",
        id: "product-hierarchy",
        index: "03",
        sceneDomain: "product",
        title: "Karta produktu zawiera informacje bez czytelnej hierarchii.",
      },
      {
        category: "Allegro",
        description:
          "Zdjęcia, grafiki i opis nie tworzą jednego argumentu, który ułatwia porównanie i decyzję.",
        id: "marketplace-distinction",
        index: "04",
        sceneDomain: "marketplace",
        title:
          "Oferta Allegro jest kompletna, lecz nie pokazuje przewagi produktu.",
      },
      {
        category: "Strona",
        description:
          "Odbiorca poznaje firmę, ale nie widzi jasno, co powinien zrobić i czego może oczekiwać dalej.",
        id: "unclear-next-step",
        index: "05",
        sceneDomain: "website",
        title:
          "Strona buduje pierwsze wrażenie, ale nie prowadzi jasno do kontaktu.",
      },
      {
        category: "System",
        description:
          "Różna hierarchia, język i oprawa osłabiają rozpoznawalność oraz utrudniają rozwój kolejnych materiałów.",
        id: "fragmented-ecosystem",
        index: "06",
        sceneDomain: "ecosystem",
        title:
          "Strona, sklep i marketplace pokazują tę samą firmę w różny sposób.",
      },
    ],
    title: "Skuteczność traci się w kilku połączonych miejscach.",
  },
} as const satisfies HomeProblemDiagnosisContent;
