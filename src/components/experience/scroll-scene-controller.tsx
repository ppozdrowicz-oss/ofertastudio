import { useFrame } from "@react-three/fiber";
import type { RefObject } from "react";

import { dampValue, experienceMotion } from "@/lib/experience/motion";

export type ScrollSceneControllerProps = {
  dampedProgressRef: RefObject<number>;
  reducedMotion: boolean;
  targetProgressRef: RefObject<number>;
};

export function ScrollSceneController({
  dampedProgressRef,
  reducedMotion,
  targetProgressRef,
}: ScrollSceneControllerProps) {
  useFrame((_, delta) => {
    const target = reducedMotion
      ? experienceMotion.reducedMotionProgress
      : targetProgressRef.current;

    dampedProgressRef.current = reducedMotion
      ? target
      : dampValue(
          dampedProgressRef.current,
          target,
          experienceMotion.scrollDamping,
          delta,
        );
  }, -100);

  return null;
}
