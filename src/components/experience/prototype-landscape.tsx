import { useLayoutEffect, useMemo, useRef } from "react";
import { Color, type InstancedMesh, Object3D, StaticDrawUsage } from "three";

import type { ExperiencePalette } from "@/lib/experience/palette";
import type { ExperienceQuality } from "@/lib/experience/quality";

type LandscapeModule = {
  position: readonly [number, number, number];
  rotationY: number;
  scale: readonly [number, number, number];
  tone: "accent" | "light" | "surface";
};

function createLandscapeModules(
  moduleCount: number,
  columns: number,
): readonly LandscapeModule[] {
  const rows = Math.ceil(moduleCount / columns);

  return Array.from({ length: moduleCount }, (_, index) => {
    const row = Math.floor(index / columns);
    const column = index % columns;
    const depthProgress = row / Math.max(1, rows - 1);
    const chaosFactor = 1 - depthProgress;
    const height =
      0.3 + (index % 5) * 0.16 + Math.max(0, depthProgress - 0.4) * 0.32;
    const x =
      (column - (columns - 1) / 2) * 1.18 +
      Math.sin(index * 1.77) * chaosFactor * 0.64;
    const z = 4 - depthProgress * 18;

    return {
      position: [x, -0.94 + height / 2, z],
      rotationY: Math.sin(index * 2.03) * chaosFactor * 0.42,
      scale: [
        0.68 + (index % 3) * 0.08,
        height,
        0.72 + ((index + 1) % 4) * 0.09,
      ],
      tone: index % 11 === 0 ? "accent" : index % 3 === 0 ? "light" : "surface",
    };
  });
}

export type PrototypeLandscapeProps = {
  palette: ExperiencePalette;
  quality: ExperienceQuality;
};

export function PrototypeLandscape({
  palette,
  quality,
}: PrototypeLandscapeProps) {
  const meshRef = useRef<InstancedMesh>(null);
  const modules = useMemo(
    () => createLandscapeModules(quality.moduleCount, quality.columns),
    [quality.columns, quality.moduleCount],
  );
  const transform = useMemo(() => new Object3D(), []);
  const color = useMemo(() => new Color(), []);

  useLayoutEffect(() => {
    const mesh = meshRef.current;

    if (!mesh) {
      return;
    }

    mesh.instanceMatrix.setUsage(StaticDrawUsage);

    modules.forEach((module, index) => {
      transform.position.set(...module.position);
      transform.rotation.set(0, module.rotationY, 0);
      transform.scale.set(...module.scale);
      transform.updateMatrix();
      mesh.setMatrixAt(index, transform.matrix);
      mesh.setColorAt(index, color.set(palette[module.tone]));
    });

    mesh.instanceMatrix.needsUpdate = true;

    if (mesh.instanceColor) {
      mesh.instanceColor.needsUpdate = true;
    }

    mesh.computeBoundingSphere();
  }, [color, modules, palette, transform]);

  return (
    <group>
      <gridHelper
        args={[30, quality.gridDivisions, palette.grid, palette.depth]}
        position={[0, -1.02, -5]}
      />
      <mesh position={[0, -1, -5]} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[2.4, 26]} />
        <meshStandardMaterial color={palette.depth} roughness={0.92} />
      </mesh>
      <instancedMesh
        args={[undefined, undefined, modules.length]}
        frustumCulled
        ref={meshRef}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color={palette.surface}
          metalness={0.06}
          roughness={0.78}
        />
      </instancedMesh>
    </group>
  );
}
