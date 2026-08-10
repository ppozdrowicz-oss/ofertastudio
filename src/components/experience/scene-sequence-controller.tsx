import { useFrame } from "@react-three/fiber";
import type { RefObject } from "react";

import type { ExperienceSequence } from "@/lib/experience/experience-sequence";
import {
  type ConversionSceneFrame,
  updateExperienceSceneFrame,
} from "@/lib/experience/scene-timeline";

export type SceneSequenceControllerProps = {
  progressRef: RefObject<number>;
  sceneFrameRef: RefObject<ConversionSceneFrame>;
  sequence: ExperienceSequence;
};

export function SceneSequenceController({
  progressRef,
  sceneFrameRef,
  sequence,
}: SceneSequenceControllerProps) {
  useFrame(() => {
    updateExperienceSceneFrame(
      sequence,
      progressRef.current,
      sceneFrameRef.current,
    );
  }, -80);

  return null;
}
