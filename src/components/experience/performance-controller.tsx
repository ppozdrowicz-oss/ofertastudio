import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";

import type { ExperienceQuality } from "@/lib/experience/quality";

export type PerformanceControllerProps = {
  onContextLost: () => void;
  onMetrics?: (metrics: ExperienceRuntimeMetrics) => void;
  quality: ExperienceQuality;
  reducedMotion: boolean;
};

export type ExperienceRuntimeMetrics = {
  calls: number;
  geometries: number;
  programs: number;
  textures: number;
  triangles: number;
};

export function PerformanceController({
  onContextLost,
  onMetrics,
  quality,
  reducedMotion,
}: PerformanceControllerProps) {
  const gl = useThree((state) => state.gl);
  const invalidate = useThree((state) => state.invalidate);
  const setDpr = useThree((state) => state.setDpr);
  const metricsElapsedRef = useRef(0);
  const lastMetricsReportRef = useRef(-1);

  useFrame((_state, delta) => {
    if (!onMetrics) {
      return;
    }

    metricsElapsedRef.current += delta;
    const elapsed = metricsElapsedRef.current;
    if (
      lastMetricsReportRef.current >= 0 &&
      elapsed - lastMetricsReportRef.current < 0.75
    ) {
      return;
    }

    lastMetricsReportRef.current = elapsed;
    onMetrics({
      calls: gl.info.render.calls,
      geometries: gl.info.memory.geometries,
      programs: gl.info.programs?.length ?? 0,
      textures: gl.info.memory.textures,
      triangles: gl.info.render.triangles,
    });
  });

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
