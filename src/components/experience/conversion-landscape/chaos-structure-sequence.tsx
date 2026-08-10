import { useFrame } from "@react-three/fiber";
import type { RefObject } from "react";

import {
  type ConversionSceneFrame,
  updateConversionSceneFrame,
} from "@/lib/experience/scene-timeline";

export type ChaosStructureSequenceProps = {
  progressRef: RefObject<number>;
  sceneFrameRef: RefObject<ConversionSceneFrame>;
};

export function ChaosStructureSequence({
  progressRef,
  sceneFrameRef,
}: ChaosStructureSequenceProps) {
  useFrame(() => {
    updateConversionSceneFrame(progressRef.current, sceneFrameRef.current);
  }, -80);

  return null;
}
