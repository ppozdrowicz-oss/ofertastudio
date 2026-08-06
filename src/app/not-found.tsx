import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { ButtonLink } from "@/components/ui/button";

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
        <Container size="text">
          <SectionHeading
            description="Adres może być nieprawidłowy albo strona została przeniesiona."
            eyebrow="Błąd 404"
            level={1}
            size="h1"
            title="Nie znaleziono tej strony."
            titleId="not-found-title"
          />
          <ButtonLink
            className="mt-8"
            href="/"
            leadingIcon={<ArrowLeft aria-hidden="true" />}
          >
            Wróć na stronę główną
          </ButtonLink>
        </Container>
      </Section>
    </main>
  );
}
