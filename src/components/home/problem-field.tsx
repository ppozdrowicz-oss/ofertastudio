import { Container } from "@/components/layout/container";
import { homeProblemDiagnosisContent } from "@/content/home-problem-diagnosis";

export function ProblemField() {
  const content = homeProblemDiagnosisContent.problemField;

  return (
    <section
      aria-labelledby="problem-field-title"
      className="home-problem-field relative py-[var(--space-section-md)]"
      data-problem-field="true"
    >
      <Container size="wide">
        <div className="grid gap-[var(--space-content-gap)] xl:grid-cols-12 xl:items-start">
          <header className="xl:sticky xl:top-[calc(var(--header-height-desktop)+var(--space-stack-lg))] xl:col-span-5">
            <p className="text-overline font-bold text-experience-muted uppercase">
              {content.eyebrow}
            </p>
            <h2
              className="mt-4 max-w-[15ch] text-h2 font-semibold text-balance"
              id="problem-field-title"
            >
              {content.title}
            </h2>
            <p className="mt-5 max-w-[var(--measure-narrow)] text-body-lg text-experience-muted">
              {content.lead}
            </p>
          </header>

          <ol className="border-t border-experience-grid xl:col-span-7">
            {content.problems.map((problem) => (
              <li
                className="home-problem-item grid gap-4 border-b border-experience-grid py-[var(--space-card-padding)] sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-6"
                data-problem-id={problem.id}
                data-scene-domain={problem.sceneDomain}
                key={problem.id}
              >
                <span
                  aria-hidden="true"
                  className="text-caption font-semibold text-experience-accent"
                >
                  {problem.index}
                </span>
                <div>
                  <p className="text-overline font-bold text-experience-muted uppercase">
                    {problem.category}
                  </p>
                  <h3 className="mt-3 max-w-[28ch] text-h4 font-semibold text-balance">
                    {problem.title}
                  </h3>
                  <p className="mt-3 max-w-[var(--measure-copy)] text-body text-experience-muted">
                    {problem.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
