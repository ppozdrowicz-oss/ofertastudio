import type { Cta, CtaId } from "../types/content.ts";
import { routes } from "./routes.ts";

export const ctas = [
  {
    id: "project-conversation",
    label: "Porozmawiajmy o projekcie",
    href: routes.contact,
    purpose: "Główne zaproszenie do rozmowy o konkretnym projekcie.",
    placement: "global",
    style: "primary",
  },
  {
    id: "free-diagnosis",
    label: "Zacznij od bezpłatnej diagnozy",
    href: routes.brief,
    purpose:
      "Krótka kwalifikacja potrzeb dla osób, które nie mają jeszcze ustalonego zakresu.",
    placement: "contextual",
    style: "primary",
  },
  {
    id: "view-projects",
    label: "Zobacz realizacje",
    href: routes.projects,
    purpose: "Przejście do zweryfikowanych przykładów pracy i case studies.",
    placement: "supporting",
    style: "secondary",
  },
  {
    id: "contact",
    label: "Skontaktuj się",
    href: routes.contact,
    purpose: "Neutralne przejście do danych i możliwości kontaktu.",
    placement: "contextual",
    style: "secondary",
  },
  {
    id: "need-guidance",
    label: "Opisz swoją sytuację",
    href: routes.brief,
    purpose:
      "Niski próg wejścia dla użytkownika, który nie wie, jak nazwać potrzebną usługę.",
    placement: "contextual",
    style: "text",
  },
] as const satisfies readonly Cta[];

export function getCta(ctaId: CtaId): Cta {
  const cta = ctas.find((candidate) => candidate.id === ctaId);

  if (!cta) {
    throw new Error(`Nieznane CTA: ${ctaId}.`);
  }

  return cta;
}
