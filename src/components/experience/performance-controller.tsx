import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

import type { ExperienceQuality } from "@/lib/experience/quality";

export type PerformanceControllerProps = {
  onContextLost: () => void;
  quality: ExperienceQuality;
  reducedMotion: boolean;
};

export function PerformanceController({
  onContextLost,
  quality,
  reducedMotion,
}: PerformanceControllerProps) {
  const gl = useThree((state) => state.gl);
  const invalidate = useThree((state) => state.invalidate);
  const setDpr = useThree((state) => state.setDpr);

  useEffect(() => {
    setDpr(
      Math.min(
        quality.maxDpr,
        Math.max(quality.minDpr, window.devicePixelRatio),
      ),
    );
    invalidate();
  }, [invalidate, quality.maxDpr, quality.minDpr, setDpr]);

  useEffect(() => {
    const canvas = gl.domElement;

    function handleContextLost(event: Event): void {
      event.preventDefault();
      onContextLost();
    }

    canvas.addEventListener("webglcontextlost", handleContextLost);

    return () => {
      canvas.removeEventListener("webglcontextlost", handleContextLost);
    };
  }, [gl, onContextLost]);

  useEffect(() => {
    if (reducedMotion) {
      invalidate();
    }
  }, [invalidate, reducedMotion]);

  return null;
}
