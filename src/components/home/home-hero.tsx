import { ExperienceCanvas } from "@/components/experience/experience-canvas";
import { HeroContent } from "@/components/home/hero-content";

export function HomeHero() {
  return (
    <ExperienceCanvas
      className="home-hero-track"
      layout="hero"
      mode="scroll"
      sequence="hero"
    >
      <HeroContent />
    </ExperienceCanvas>
  );
}
