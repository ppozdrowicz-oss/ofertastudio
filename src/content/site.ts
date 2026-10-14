import { privacyNotice } from "@/content/privacy";
import { contactMode } from "@/lib/contact";

export const brand = { name: "OfertaStudio", suffix: ".pl" } as const;

export const comparison = {
  frames: [
    { id: "sneakerBefore", label: "W otoczeniu" },
    { id: "sneaker", label: "Na białym tle" },
  ],
  disclosure: "Dwa niezależne ujęcia pokazowe. Nie stanowią pary przed i po retuszu.",
} as const;

const formMode = contactMode(process.env, privacyNotice.approved);

export const site = {
  name: `${brand.name}${brand.suffix}`,
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://ofertastudio.pl",
  title: "OfertaStudio.pl — Packshot i zdjęcia produktowe",
  description:
    "Packshot na białym tle, detale i kompozycje produktowe. Prezentacja produktów do sklepu internetowego, na Allegro i do kampanii. Pokaż nam swój produkt.",
  cta: "Pokaż nam swój produkt",
  portfolioLabel: "Prezentacje pokazowe",
  portfolioDisclosure:
    "Przykładowe prezentacje produktów. Widoczne marki nie oznaczają współpracy.",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || null,
  // Previews remain noindex until final imagery and business/legal information are ready.
  indexable: process.env.NEXT_PUBLIC_INDEXABLE === "true",
  formsEnabled: formMode !== "disabled",
  formTestMode: formMode === "test",
};

export const navigation = [
  { label: "Realizacje", href: "/#realizacje" },
  { label: "Możliwości", href: "/#mozliwosci" },
  { label: "Jak pracujemy", href: "/#proces" },
  { label: "Oferta", href: "/#oferta" },
];

export const services = [
  { title: "Packshot White", description: "produkt na czystym, białym tle." },
  {
    title: "Packshot Premium",
    description: "światło i kompozycja podkreślające charakter produktu.",
  },
  { title: "Detal i retusz", description: "czytelne materiały i dopracowane wykończenie obrazu." },
  {
    title: "Kompleksowa prezentacja oferty",
    description: "spójny zestaw ujęć, detali i informacji.",
  },
] as const;

export const transformationSteps = [
  {
    label: "Źródło",
    text: "Zaczynamy od Twojego produktu.",
    detail: "Sprawdzamy materiał wyjściowy i kierunek prezentacji.",
  },
  {
    label: "Izolacja",
    text: "Zostaje to, co najważniejsze.",
    detail: "Oddzielamy przedmiot od rozpraszającego tła.",
  },
  {
    label: "Retusz",
    text: "Każdy detal na swoim miejscu.",
    detail: "Porządkujemy powierzchnię, zachowując charakter produktu.",
  },
  {
    label: "Światło",
    text: "Forma staje się czytelna.",
    detail: "Wydobywamy materiał, objętość i naturalne odbicia.",
  },
  {
    label: "Gotowy obraz",
    text: "Twój produkt. Gotowy do pokazania.",
    detail: "Domykamy kadr, cień i format docelowy.",
  },
];

export const processSteps = [
  {
    number: "01",
    title: "Pokazujesz produkt.",
    text: "Przesyłasz zdjęcie lub link. Napisz, ile produktów chcesz pokazać i gdzie będą widoczne.",
  },
  {
    number: "02",
    title: "Ustalamy kierunek.",
    text: "Oceniamy materiał, proponujemy sposób prezentacji i wyceniamy konkretny zakres.",
  },
  {
    number: "03",
    title: "Otrzymujesz gotowe obrazy.",
    text: "Przygotowujemy uzgodnione ujęcia, dopracowujemy detale i oddajemy pliki w potrzebnych formatach.",
  },
];
