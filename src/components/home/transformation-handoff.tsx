import { Container } from "@/components/layout/container";
import { homeProblemDiagnosisContent } from "@/content/home-problem-diagnosis";

export function TransformationHandoff() {
  const content = homeProblemDiagnosisContent.handoff;

  return (
    <section
      aria-labelledby="transformation-handoff-title"
      className="home-transformation-handoff relative flex min-h-[var(--home-transformation-handoff-height)] items-center border-t border-experience-grid py-[var(--space-section-sm)]"
      data-transformation-handoff="true"
    >
      <Container size="wide">
        <div className="max-w-[var(--measure-copy)]">
          <p className="text-overline font-bold text-experience-muted uppercase">
            {content.eyebrow}
          </p>
          <h2
            className="mt-4 text-h2 font-semibold text-balance"
            id="transformation-handoff-title"
          >
            {content.title}
          </h2>
          <p className="mt-5 text-lead text-experience-muted">{content.lead}</p>
        </div>
      </Container>
    </section>
  );
}
