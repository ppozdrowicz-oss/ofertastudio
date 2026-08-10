import { ExperienceCanvas } from "@/components/experience/experience-canvas";
import { HomeHero } from "@/components/home/home-hero";
import { HomeProblemDiagnosis } from "@/components/home/home-problem-diagnosis";

export function HomeStory() {
  return (
    <ExperienceCanvas
      className="home-story"
      layout="story"
      mode="scroll"
      sequence="homepage"
    >
      <HomeHero />
      <HomeProblemDiagnosis />
    </ExperienceCanvas>
  );
}
