import type { RefObject } from "react";
import { useRef } from "react";

import { Atmosphere } from "@/components/experience/atmosphere";
import { CameraRig } from "@/components/experience/camera-rig";
import { ConversionLandscape } from "@/components/experience/conversion-landscape/conversion-landscape";
import { Lighting } from "@/components/experience/lighting";
import {
  type ExperienceRuntimeMetrics,
  PerformanceController,
} from "@/components/experience/performance-controller";
import { SceneSequenceController } from "@/components/experience/scene-sequence-controller";
import { ScrollSceneController } from "@/components/experience/scroll-scene-controller";
import type { ExperienceSequence } from "@/lib/experience/experience-sequence";
import type { ExperiencePointer } from "@/lib/experience/motion";
import type { ExperiencePalette } from "@/lib/experience/palette";
import type { ExperienceQuality } from "@/lib/experience/quality";
import { createExperienceSceneFrame } from "@/lib/experience/scene-timeline";

export type ExperienceSceneProps = {
  dampedProgressRef: RefObject<number>;
  onContextLost: () => void;
  onMetrics?: (metrics: ExperienceRuntimeMetrics) => void;
  palette: ExperiencePalette;
  pointerRef: RefObject<ExperiencePointer>;
  quality: ExperienceQuality;
  reducedMotion: boolean;
  sequence: ExperienceSequence;
  targetProgressRef: RefObject<number>;
};

export function ExperienceScene({
  dampedProgressRef,
  onContextLost,
  onMetrics,
  palette,
  pointerRef,
  quality,
  reducedMotion,
  sequence,
  targetProgressRef,
}: ExperienceSceneProps) {
  const sceneFrameRef = useRef(createExperienceSceneFrame(sequence, 0));

  return (
    <>
      <PerformanceController
        onContextLost={onContextLost}
        onMetrics={onMetrics}
        quality={quality}
        reducedMotion={reducedMotion}
      />
      <ScrollSceneController
        dampedProgressRef={dampedProgressRef}
        reducedMotion={reducedMotion}
        sequence={sequence}
        targetProgressRef={targetProgressRef}
      />
      <SceneSequenceController
        progressRef={dampedProgressRef}
        sceneFrameRef={sceneFrameRef}
        sequence={sequence}
      />
      <CameraRig
        dampedProgressRef={dampedProgressRef}
        pointerRef={pointerRef}
        quality={quality}
        reducedMotion={reducedMotion}
        sequence={sequence}
      />
      <Atmosphere palette={palette} quality={quality} />
      <Lighting palette={palette} sceneFrameRef={sceneFrameRef} />
      <ConversionLandscape
        palette={palette}
        quality={quality}
        reducedMotion={reducedMotion}
        sceneFrameRef={sceneFrameRef}
      />
    </>
  );
}
