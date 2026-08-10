import { DiagnosisSequence } from "@/components/home/diagnosis-sequence";
import { MiniDiagnosis } from "@/components/home/mini-diagnosis";
import { ProblemField } from "@/components/home/problem-field";
import { ProblemIntro } from "@/components/home/problem-intro";
import { TransformationHandoff } from "@/components/home/transformation-handoff";

export function HomeProblemDiagnosis() {
  return (
    <div
      className="home-problem-diagnosis text-experience-foreground"
      data-home-problem-diagnosis="true"
    >
      <ProblemIntro />
      <ProblemField />
      <DiagnosisSequence />
      <MiniDiagnosis />
      <TransformationHandoff />
    </div>
  );
}
