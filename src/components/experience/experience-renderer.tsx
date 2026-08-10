import { Canvas } from "@react-three/fiber";
import type { RefObject } from "react";
import { useMemo } from "react";

import { ExperienceScene } from "@/components/experience/experience-scene";
import type { ExperiencePointer } from "@/lib/experience/motion";
import { readExperiencePalette } from "@/lib/experience/palette";
import type { ExperienceQuality } from "@/lib/experience/quality";

export type ExperienceRendererProps = {
  dampedProgressRef: RefObject<number>;
  onContextLost: () => void;
  onReady: () => void;
  pointerRef: RefObject<ExperiencePointer>;
  quality: ExperienceQuality;
  reducedMotion: boolean;
  targetProgressRef: RefObject<number>;
};

export function ExperienceRenderer({
  dampedProgressRef,
  onContextLost,
  onReady,
  pointerRef,
  quality,
  reducedMotion,
  targetProgressRef,
}: ExperienceRendererProps) {
  const palette = useMemo(() => readExperiencePalette(), []);
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

  return (
    <Canvas
      aria-hidden="true"
      camera={{ far: 60, fov: 43, near: 0.1, position: [4.8, 4.5, 11] }}
      className="pointer-events-none size-full"
      dpr={[quality.minDpr, quality.maxDpr]}
      fallback={null}
      frameloop={reducedMotion ? "demand" : "always"}
      gl={rendererOptions}
      onCreated={onReady}
      shadows={false}
      tabIndex={-1}
    >
      <ExperienceScene
        dampedProgressRef={dampedProgressRef}
        onContextLost={onContextLost}
        palette={palette}
        pointerRef={pointerRef}
        quality={quality}
        reducedMotion={reducedMotion}
        targetProgressRef={targetProgressRef}
      />
    </Canvas>
  );
}
