import type { ProcessStep } from "../types/content.ts";

export const processSteps = [
  {
    id: "diagnosis",
    order: 1,
    name: "Diagnoza sytuacji",
    summary:
      "Poznajemy produkt, odbiorców, obecne kanały, cele i ograniczenia, zanim określimy rozwiązanie.",
    clientInput:
      "Kontekst biznesowy, obecne materiały, dostęp do potrzebnych danych i osoby decyzyjne.",
    deliverable:
      "Wspólne rozumienie problemu oraz informacji wymagających potwierdzenia.",
  },
  {
    id: "direction",
    order: 2,
    name: "Kierunek i zakres",
    summary:
      "Ustalamy priorytety, odpowiedzialności, etapy i kryteria akceptacji odpowiednie dla skali projektu.",
    clientInput:
      "Decyzje dotyczące priorytetów, budżetu, terminów i dostępnych zasobów.",
    deliverable:
      "Uzgodniony zakres, kolejność prac i przejrzyste założenia współpracy.",
  },
  {
    id: "solution-design",
    order: 3,
    name: "Treść i projekt rozwiązania",
    summary:
      "Łączymy strukturę informacji, komunikaty, materiały i UX w spójną koncepcję przed wdrożeniem.",
    clientInput:
      "Informacje merytoryczne, produkty, materiały źródłowe i terminowy feedback.",
    deliverable:
      "Zatwierdzona struktura, treść robocza i kierunek projektowy dla zakresu.",
  },
  {
    id: "implementation",
    order: 4,
    name: "Wdrożenie i kontrola jakości",
    summary:
      "Realizujemy uzgodniony zakres, testujemy kluczowe scenariusze i przygotowujemy rozwiązanie do publikacji.",
    clientInput:
      "Dostępy, dane formalne, akceptacje i materiały wymagane do uruchomienia.",
    deliverable:
      "Przetestowane wdrożenie wraz z listą ustaleń i elementów przekazywanych klientowi.",
  },
  {
    id: "launch-development",
    order: 5,
    name: "Start i dalszy rozwój",
    summary:
      "Po publikacji obserwujemy realne potrzeby, porządkujemy kolejne zadania i ustalamy model dalszego wsparcia.",
    clientInput:
      "Informacje zwrotne z obsługi, klientów i dostępnych danych po uruchomieniu.",
    deliverable:
      "Plan kolejnych usprawnień albo jasno zakończony i przekazany projekt.",
  },
] as const satisfies readonly ProcessStep[];
