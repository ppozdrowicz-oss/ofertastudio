import { ArrowRight } from "lucide-react";

import { Container } from "@/components/layout/container";
import { ButtonLink } from "@/components/ui/button";
import { getCta } from "@/config/ctas";
import { homeProblemDiagnosisContent } from "@/content/home-problem-diagnosis";

export function MiniDiagnosis() {
  const content = homeProblemDiagnosisContent.miniDiagnosis;
  const cta = getCta(content.ctaId);

  return (
    <section
      aria-labelledby="mini-diagnosis-title"
      className="home-mini-diagnosis relative flex min-h-[var(--home-mini-diagnosis-height)] items-center py-[var(--space-section-sm)]"
      data-mini-diagnosis="true"
    >
      <Container size="wide">
        <div className="home-mini-diagnosis__panel grid gap-8 border-t border-experience-grid pt-[var(--space-content-gap)] lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div>
            <p className="text-overline font-bold text-experience-accent uppercase">
              {content.eyebrow}
            </p>
            <h2
              className="mt-4 max-w-[16ch] text-h2 font-semibold text-balance"
              id="mini-diagnosis-title"
            >
              {content.title}
            </h2>
            <p className="mt-5 max-w-[var(--measure-copy)] text-lead text-experience-muted">
              {content.lead}
            </p>
            <p className="mt-5 max-w-[var(--measure-copy)] text-caption text-experience-muted">
              {content.note}
            </p>
          </div>
          <ButtonLink
            className="w-full lg:w-auto"
            href={cta.href}
            size="large"
            trailingIcon={<ArrowRight aria-hidden="true" />}
          >
            {cta.label}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
