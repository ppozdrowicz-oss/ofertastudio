import { HeroContent } from "@/components/home/hero-content";

export function HomeHero() {
  return (
    <div className="home-hero-track relative" data-home-hero="true">
      <div className="home-story__sticky-frame">
        <HeroContent />
      </div>
    </div>
  );
}
