import type { CtaId } from "../types/content.ts";

export type GlobalCtaConfig = {
  eyebrow: string;
  title: string;
  description: string;
  primaryCtaId: CtaId;
  secondaryCtaId?: CtaId;
  variant: "default" | "strong";
};

export const globalCtaConfig = {
  eyebrow: "Następny krok",
  title: "Masz stronę, sklep lub oferty, które wymagają uporządkowania?",
  description:
    "Porozmawiajmy o tym, co warto poprawić i jaki zakres prac ma największy sens w twojej sytuacji.",
  primaryCtaId: "project-conversation",
  secondaryCtaId: "need-guidance",
  variant: "strong",
} as const satisfies GlobalCtaConfig;
