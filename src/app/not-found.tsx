import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { LinkButton } from "@/components/ui/link-button";

export const metadata: Metadata = {
  robots: {
    follow: false,
    index: false,
  },
  title: "Nie znaleziono strony",
};

export default function NotFound() {
  return (
    <main>
      <Section
        aria-labelledby="not-found-title"
        className="flex min-h-dvh items-center"
      >
        <Container size="content">
          <p className="text-sm font-semibold text-muted-foreground">
            Błąd 404
          </p>
          <h1
            id="not-found-title"
            className="mt-3 text-3xl font-semibold tracking-[-0.035em] text-balance sm:text-5xl"
          >
            Nie znaleziono tej strony.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
            Adres może być nieprawidłowy albo strona została przeniesiona.
          </p>
          <LinkButton className="mt-8" href="/">
            <ArrowLeft aria-hidden="true" className="size-4" />
            Wróć na stronę główną
          </LinkButton>
        </Container>
      </Section>
    </main>
  );
}
