import { Container } from "@/components/layout/container";
import { homeProblemDiagnosisContent } from "@/content/home-problem-diagnosis";

export function DiagnosisSequence() {
  const content = homeProblemDiagnosisContent.diagnosis;

  return (
    <section
      aria-labelledby="diagnosis-title"
      className="home-diagnosis relative flex min-h-[var(--home-diagnosis-height)] items-center py-[var(--space-section-md)]"
      data-diagnosis-sequence="true"
    >
      <Container size="wide">
        <div className="home-diagnosis__panel grid gap-[var(--space-content-gap)] border border-experience-grid p-[var(--space-card-padding)] lg:grid-cols-12 lg:p-[var(--space-section-sm)]">
          <header className="lg:col-span-5">
            <p className="text-overline font-bold text-experience-accent uppercase">
              {content.eyebrow}
            </p>
            <h2
              className="mt-4 max-w-[14ch] text-h2 font-semibold text-balance"
              id="diagnosis-title"
            >
              {content.title}
            </h2>
            <p className="mt-5 max-w-[var(--measure-narrow)] text-body-lg text-experience-muted">
              {content.lead}
            </p>
          </header>

          <div className="lg:col-span-7 lg:pl-[var(--space-content-gap)]">
            <ol className="border-t border-experience-grid">
              {content.steps.map((step) => (
                <li
                  className="grid gap-3 border-b border-experience-grid py-5 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-5"
                  data-diagnosis-step={step.id}
                  key={step.id}
                >
                  <span
                    aria-hidden="true"
                    className="text-caption font-semibold text-experience-accent"
                  >
                    {step.index}
                  </span>
                  <div>
                    <h3 className="text-h4 font-semibold">{step.title}</h3>
                    <p className="mt-2 max-w-[var(--measure-copy)] text-body-sm text-experience-muted">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-6 border-l-2 border-experience-accent pl-5 text-body-lg font-medium text-experience-foreground">
              {content.result}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
