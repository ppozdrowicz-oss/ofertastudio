import { useFrame } from "@react-three/fiber";
import { useLayoutEffect, useMemo, useRef } from "react";
import {
  type Group,
  type InstancedMesh,
  MathUtils,
  Object3D,
  StaticDrawUsage,
} from "three";

import type { LandscapeResources } from "@/components/experience/conversion-landscape/use-landscape-resources";
import { conversionLandscapeConfig } from "@/lib/experience/scene-config";
import type { ConversionSceneFrame } from "@/lib/experience/scene-timeline";

export type FocusObjectProps = {
  resources: LandscapeResources;
  sceneFrameRef: React.RefObject<ConversionSceneFrame>;
};

const focusParts = [
  { position: [0, 0, 0], scale: [2.45, 0.15, 1.55] },
  { position: [-0.4, 0.5, -0.18], scale: [1.35, 0.82, 0.1] },
  { position: [0.82, 0.28, 0.24], scale: [0.46, 0.5, 0.62] },
] as const;

export function FocusObject({ resources, sceneFrameRef }: FocusObjectProps) {
  const groupRef = useRef<Group>(null);
  const bodyRef = useRef<InstancedMesh>(null);
  const accentRef = useRef<InstancedMesh>(null);
  const transform = useMemo(() => new Object3D(), []);

  useLayoutEffect(() => {
    const body = bodyRef.current;
    const accent = accentRef.current;

    if (!body || !accent) {
      return;
    }

    body.instanceMatrix.setUsage(StaticDrawUsage);
    focusParts.forEach((part, index) => {
      transform.position.set(
        part.position[0],
        part.position[1],
        part.position[2],
      );
      transform.rotation.set(0, 0, 0);
      transform.scale.set(part.scale[0], part.scale[1], part.scale[2]);
      transform.updateMatrix();
      body.setMatrixAt(index, transform.matrix);
    });
    body.instanceMatrix.needsUpdate = true;

    transform.position.set(-0.96, 0.24, 0.46);
    transform.scale.set(0.09, 0.56, 0.09);
    transform.updateMatrix();
    accent.setMatrixAt(0, transform.matrix);
    accent.instanceMatrix.needsUpdate = true;
  }, [transform]);

  useFrame(() => {
    const group = groupRef.current;
    const scene = sceneFrameRef.current;

    if (!group) {
      return;
    }

    const progress = scene.focusProgress;
    const {
      chaosPosition,
      chaosRotation,
      structurePosition,
      structureRotation,
    } = conversionLandscapeConfig.focus;

    group.position.set(
      MathUtils.lerp(chaosPosition[0], structurePosition[0], progress),
      MathUtils.lerp(chaosPosition[1], structurePosition[1], progress),
      MathUtils.lerp(chaosPosition[2], structurePosition[2], progress),
    );
    group.rotation.set(
      MathUtils.lerp(chaosRotation[0], structureRotation[0], progress),
      MathUtils.lerp(chaosRotation[1], structureRotation[1], progress),
      MathUtils.lerp(chaosRotation[2], structureRotation[2], progress),
    );
    group.scale.setScalar(0.72 + progress * 0.28);
  });

  return (
    <group ref={groupRef}>
      <instancedMesh
        args={[
          resources.boxGeometry,
          resources.elevatedMaterial,
          focusParts.length,
        ]}
        ref={bodyRef}
      />
      <instancedMesh
        args={[resources.boxGeometry, resources.accentMaterial, 1]}
        ref={accentRef}
      />
    </group>
  );
}
