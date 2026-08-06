import { CircleCheck } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { foundationPageContent } from "@/content/foundation-page";

export function TechnicalFoundation() {
  return (
    <Section
      aria-labelledby="foundation-title"
      className="flex min-h-dvh items-center"
    >
      <Container size="content">
        <div className="rounded-[var(--radius-panel)] border border-border bg-surface p-6 shadow-soft sm:p-10">
          <p className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
            <CircleCheck aria-hidden="true" className="size-5 text-primary" />
            {foundationPageContent.eyebrow}
          </p>

          <h1
            id="foundation-title"
            className="mt-5 text-3xl font-semibold tracking-[-0.035em] text-balance sm:text-5xl"
          >
            {foundationPageContent.title}
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            {foundationPageContent.description}
          </p>

          <ul
            aria-label="Zakres gotowego fundamentu"
            className="mt-8 flex flex-wrap gap-2"
          >
            {foundationPageContent.statusItems.map((item) => (
              <li
                key={item}
                className="rounded-full border border-border bg-secondary px-3 py-1.5 text-sm font-medium text-secondary-foreground"
              >
                {item}
              </li>
            ))}
          </ul>

          <p className="mt-8 border-t border-border pt-6 text-sm leading-6 text-muted-foreground">
            {foundationPageContent.nextStep}
          </p>
        </div>
      </Container>
    </Section>
  );
}
