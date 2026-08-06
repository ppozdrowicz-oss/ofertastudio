import { ArrowRight } from "lucide-react";

import { PageShell } from "@/components/layout/page-shell";
import { TechnicalFoundation } from "@/components/sections/technical-foundation";
import { ButtonLink } from "@/components/ui/button";
import { foundationPageContent } from "@/content/foundation-page";

export default function HomePage() {
  return (
    <PageShell
      header={{
        eyebrow: foundationPageContent.eyebrow,
        lead: foundationPageContent.description,
        primaryAction: (
          <ButtonLink
            href="/design-system"
            size="large"
            trailingIcon={<ArrowRight aria-hidden="true" />}
          >
            Otwórz design system
          </ButtonLink>
        ),
        title: foundationPageContent.title,
      }}
    >
      <TechnicalFoundation />
    </PageShell>
  );
}
