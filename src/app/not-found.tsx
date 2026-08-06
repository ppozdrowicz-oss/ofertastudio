import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { PageShell } from "@/components/layout/page-shell";
import { Section } from "@/components/layout/section";
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
    <PageShell
      header={{
        eyebrow: "Błąd 404",
        lead: "Adres może być nieprawidłowy albo strona została przeniesiona.",
        title: "Nie znaleziono tej strony",
        variant: "compact",
      }}
      showGlobalCta={false}
    >
      <Section spacing="compact" variant="muted">
        <Container size="text">
          <ButtonLink href="/" leadingIcon={<ArrowLeft aria-hidden="true" />}>
            Wróć na stronę główną
          </ButtonLink>
        </Container>
      </Section>
    </PageShell>
  );
}
