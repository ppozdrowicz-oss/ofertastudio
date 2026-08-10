import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { homeHeroContent } from "@/content/home-hero";

export function HomeHandoff() {
  return (
    <Section
      aria-labelledby="home-handoff-title"
      className="home-handoff"
      spacing="spacious"
    >
      <Container size="wide">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-9">
            <SectionHeading
              description={homeHeroContent.handoff.description}
              eyebrow={homeHeroContent.handoff.eyebrow}
              size="h2"
              title={homeHeroContent.handoff.title}
              titleId="home-handoff-title"
              width="wide"
            />
          </div>
          <p className="border-l-2 border-accent pl-5 text-body-sm text-muted-foreground lg:col-span-3">
            Najpierw rozpoznajemy, gdzie klient traci orientację, a dopiero
            potem dobieramy zakres zmian.
          </p>
        </div>
      </Container>
    </Section>
  );
}
