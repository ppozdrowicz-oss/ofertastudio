import type { RefObject } from "react";

import { Atmosphere } from "@/components/experience/atmosphere";
import { CameraRig } from "@/components/experience/camera-rig";
import { Lighting } from "@/components/experience/lighting";
import { PerformanceController } from "@/components/experience/performance-controller";
import { PrototypeLandscape } from "@/components/experience/prototype-landscape";
import { ScrollSceneController } from "@/components/experience/scroll-scene-controller";
import type { ExperiencePointer } from "@/lib/experience/motion";
import type { ExperiencePalette } from "@/lib/experience/palette";
import type { ExperienceQuality } from "@/lib/experience/quality";

export type ExperienceSceneProps = {
  dampedProgressRef: RefObject<number>;
  onContextLost: () => void;
  palette: ExperiencePalette;
  pointerRef: RefObject<ExperiencePointer>;
  quality: ExperienceQuality;
  reducedMotion: boolean;
  targetProgressRef: RefObject<number>;
};

export function ExperienceScene({
  dampedProgressRef,
  onContextLost,
  palette,
  pointerRef,
  quality,
  reducedMotion,
  targetProgressRef,
}: ExperienceSceneProps) {
  return (
    <>
      <PerformanceController
        onContextLost={onContextLost}
        quality={quality}
        reducedMotion={reducedMotion}
      />
      <ScrollSceneController
        dampedProgressRef={dampedProgressRef}
        reducedMotion={reducedMotion}
        targetProgressRef={targetProgressRef}
      />
      <CameraRig
        dampedProgressRef={dampedProgressRef}
        pointerRef={pointerRef}
        quality={quality}
        reducedMotion={reducedMotion}
      />
      <Atmosphere palette={palette} quality={quality} />
      <Lighting palette={palette} />
      <PrototypeLandscape palette={palette} quality={quality} />
    </>
  );
}
