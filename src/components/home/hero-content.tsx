import { ArrowDown, ArrowRight } from "lucide-react";

import { HeroCompetenceStrip } from "@/components/home/hero-competence-strip";
import { Container } from "@/components/layout/container";
import { ButtonLink } from "@/components/ui/button";
import { getCta } from "@/config/ctas";
import { homeHeroContent } from "@/content/home-hero";

export type HeroContentProps = {
  headingLevel?: 1 | 2;
  showScrollCue?: boolean;
};

export function HeroContent({
  headingLevel = 1,
  showScrollCue = true,
}: HeroContentProps) {
  const primaryCta = getCta(homeHeroContent.primaryCtaId);
  const secondaryCta = getCta(homeHeroContent.secondaryCtaId);
  const Heading = headingLevel === 1 ? "h1" : "h2";
  const headingId =
    headingLevel === 1 ? "homepage-hero-title" : "hero-preview-title";

  return (
    <section
      aria-labelledby={headingId}
      className="home-hero relative h-full text-experience-foreground"
      data-home-hero-content="true"
    >
      <div aria-hidden="true" className="home-hero__scrim absolute inset-0" />
      <Container
        className="home-hero__container relative flex h-full items-start"
        size="wide"
      >
        <div className="home-hero__copy">
          <p className="home-hero__eyebrow text-overline font-bold text-experience-muted uppercase">
            {homeHeroContent.eyebrow}
          </p>
          <Heading
            className="home-hero__headline mt-4 text-hero font-semibold text-balance"
            id={headingId}
          >
            {homeHeroContent.headline}
          </Heading>
          <p className="home-hero__lead mt-5 max-w-[var(--measure-copy)] text-lead text-experience-muted">
            {homeHeroContent.lead}
          </p>
          <div
            aria-label="Działania wprowadzające"
            className="home-hero__actions mt-7 grid gap-3 sm:flex sm:flex-wrap"
            role="group"
          >
            <ButtonLink
              className="home-hero__action"
              href={primaryCta.href}
              size="large"
              trailingIcon={<ArrowRight aria-hidden="true" />}
            >
              {primaryCta.label}
            </ButtonLink>
            <ButtonLink
              className="home-hero__action"
              href={secondaryCta.href}
              size="large"
              trailingIcon={<ArrowRight aria-hidden="true" />}
              variant="secondary"
            >
              {secondaryCta.label}
            </ButtonLink>
          </div>
          <HeroCompetenceStrip items={homeHeroContent.competenceAreas} />
        </div>
      </Container>
      {showScrollCue && (
        <div
          aria-hidden="true"
          className="home-hero__scroll-cue absolute right-[var(--container-gutter)] bottom-6 flex items-center gap-2 text-caption font-semibold text-experience-muted uppercase"
        >
          <span>Przewiń</span>
          <ArrowDown className="size-4" />
        </div>
      )}
    </section>
  );
}
