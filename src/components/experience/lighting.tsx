import { useFrame } from "@react-three/fiber";
import type { RefObject } from "react";
import { useRef } from "react";
import type { DirectionalLight } from "three";

import type { ExperiencePalette } from "@/lib/experience/palette";
import type { ConversionSceneFrame } from "@/lib/experience/scene-timeline";

export type LightingProps = {
  palette: ExperiencePalette;
  sceneFrameRef: RefObject<ConversionSceneFrame>;
};

export function Lighting({ palette, sceneFrameRef }: LightingProps) {
  const focusLightRef = useRef<DirectionalLight>(null);
  const accentLightRef = useRef<DirectionalLight>(null);

  useFrame(() => {
    const focusLight = focusLightRef.current;
    const accentLight = accentLightRef.current;
    const scene = sceneFrameRef.current;

    if (focusLight) {
      focusLight.intensity =
        2.45 + scene.focusProgress * 0.45 + scene.diagnosisProgress * 0.18;
    }

    if (accentLight) {
      accentLight.intensity =
        0.52 + scene.signalProgress * 0.16 + scene.priorityProgress * 0.08;
    }
  });

  return (
    <>
      <hemisphereLight
        color={palette.light}
        groundColor={palette.depth}
        intensity={1.15}
      />
      <directionalLight
        color={palette.focus}
        intensity={2.8}
        position={[6, 9, 7]}
        ref={focusLightRef}
      />
      <directionalLight
        color={palette.accent}
        intensity={0.72}
        position={[-5, 4, -9]}
        ref={accentLightRef}
      />
    </>
  );
}
