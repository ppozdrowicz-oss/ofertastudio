import { Container } from "@/components/layout/container";
import { homeProblemDiagnosisContent } from "@/content/home-problem-diagnosis";

export function ProblemIntro() {
  const content = homeProblemDiagnosisContent.intro;

  return (
    <section
      aria-labelledby="problem-intro-title"
      className="home-problem-intro relative flex min-h-[var(--home-problem-intro-height)] items-center"
      data-problem-intro="true"
    >
      <div
        aria-hidden="true"
        className="home-problem-intro__scrim absolute inset-0"
      />
      <Container className="relative" size="wide">
        <div className="max-w-[var(--measure-wide)]">
          <p className="text-overline font-bold text-experience-muted uppercase">
            {content.eyebrow}
          </p>
          <h2
            className="mt-5 max-w-[15ch] text-h1 font-semibold text-balance"
            id="problem-intro-title"
          >
            {content.title}
          </h2>
          <p className="mt-6 max-w-[var(--measure-copy)] text-lead text-experience-muted">
            {content.lead}
          </p>
        </div>
      </Container>
    </section>
  );
}
