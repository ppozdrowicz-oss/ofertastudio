import type { ExperiencePalette } from "@/lib/experience/palette";
import type { ExperienceQuality } from "@/lib/experience/quality";

export type AtmosphereProps = {
  palette: ExperiencePalette;
  quality: ExperienceQuality;
};

export function Atmosphere({ palette, quality }: AtmosphereProps) {
  return (
    <>
      <color args={[palette.background]} attach="background" />
      <fog args={[palette.fog, quality.fogNear, quality.fogFar]} attach="fog" />
    </>
  );
}
