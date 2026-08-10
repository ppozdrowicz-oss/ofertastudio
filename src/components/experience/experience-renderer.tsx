import { Canvas, type RootState } from "@react-three/fiber";
import type { RefObject } from "react";
import { useCallback, useMemo } from "react";

import { ExperienceScene } from "@/components/experience/experience-scene";
import type { ExperienceRuntimeMetrics } from "@/components/experience/performance-controller";
import { sampleConversionCameraPath } from "@/lib/experience/camera-path";
import type { ExperiencePointer } from "@/lib/experience/motion";
import { readExperiencePalette } from "@/lib/experience/palette";
import type { ExperienceQuality } from "@/lib/experience/quality";

export type ExperienceRendererProps = {
  dampedProgressRef: RefObject<number>;
  onContextLost: () => void;
  onMetrics?: (metrics: ExperienceRuntimeMetrics) => void;
  onReady: () => void;
  pointerRef: RefObject<ExperiencePointer>;
  quality: ExperienceQuality;
  reducedMotion: boolean;
  targetProgressRef: RefObject<number>;
};

export function ExperienceRenderer({
  dampedProgressRef,
  onContextLost,
  onMetrics,
  onReady,
  pointerRef,
  quality,
  reducedMotion,
  targetProgressRef,
}: ExperienceRendererProps) {
  const palette = useMemo(() => readExperiencePalette(), []);
  const initialCamera = useMemo(
    () => sampleConversionCameraPath(0, quality.composition),
    [quality.composition],
  );
  const rendererOptions = useMemo(
    () => ({
      alpha: false,
      antialias: quality.antialias,
      depth: true,
      powerPreference: "high-performance" as const,
      stencil: false,
    }),
    [quality.antialias],
  );
  const handleCreated = useCallback(
    ({ gl }: RootState) => {
      gl.domElement.setAttribute("aria-hidden", "true");
      gl.domElement.setAttribute("role", "presentation");
      gl.domElement.tabIndex = -1;
      gl.domElement.style.pointerEvents = "none";
      onReady();
    },
    [onReady],
  );

  return (
    <Canvas
      aria-hidden="true"
      camera={{
        far: 70,
        fov: initialCamera.fov,
        near: 0.1,
        position: [...initialCamera.position],
      }}
      className="pointer-events-none size-full"
      dpr={[quality.minDpr, quality.maxDpr]}
      fallback={null}
      frameloop={reducedMotion ? "demand" : "always"}
      gl={rendererOptions}
      onCreated={handleCreated}
      shadows={false}
      tabIndex={-1}
    >
      <ExperienceScene
        dampedProgressRef={dampedProgressRef}
        onContextLost={onContextLost}
        onMetrics={onMetrics}
        palette={palette}
        pointerRef={pointerRef}
        quality={quality}
        reducedMotion={reducedMotion}
        targetProgressRef={targetProgressRef}
      />
    </Canvas>
  );
}
