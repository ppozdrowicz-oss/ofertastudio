import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import {
  BufferGeometry,
  Color,
  Float32BufferAttribute,
  type LineBasicMaterial,
} from "three";

import type { ExperiencePalette } from "@/lib/experience/palette";
import type { ExperienceQuality } from "@/lib/experience/quality";
import { conversionLandscapeConfig } from "@/lib/experience/scene-config";
import type { ConversionSceneFrame } from "@/lib/experience/scene-timeline";

export type SpatialGridProps = {
  palette: ExperiencePalette;
  quality: ExperienceQuality;
  sceneFrameRef: React.RefObject<ConversionSceneFrame>;
};

function createGridGeometry(
  palette: ExperiencePalette,
  quality: ExperienceQuality,
): BufferGeometry {
  const positions: number[] = [];
  const colors: number[] = [];
  const frontColor = new Color(palette.grid);
  const backColor = new Color(palette.gridMinor);
  const width =
    quality.columns * conversionLandscapeConfig.field.widthStep +
    conversionLandscapeConfig.grid.sideMargin * 2;
  const backZ =
    conversionLandscapeConfig.field.frontZ - quality.landscapeDepth - 3;

  function addSegment(
    from: readonly [number, number, number],
    to: readonly [number, number, number],
    depth: number,
  ): void {
    const color = frontColor.clone().lerp(backColor, depth);
    positions.push(...from, ...to);
    colors.push(color.r, color.g, color.b, color.r, color.g, color.b);
  }

  const railCount = quality.columns + 3;
  for (let index = 0; index < railCount; index += 1) {
    const progress = index / Math.max(1, railCount - 1);
    const x = -width / 2 + width * progress;
    const inset = index % 2 === 0 ? 0 : 0.75;
    addSegment(
      [x, -0.995, conversionLandscapeConfig.grid.frontZ - inset],
      [x, -1.13, backZ + inset * 1.4],
      0.56,
    );
  }

  for (let index = 0; index <= quality.gridDivisions; index += 1) {
    const depth = index / Math.max(1, quality.gridDivisions);
    const z =
      conversionLandscapeConfig.grid.frontZ +
      (backZ - conversionLandscapeConfig.grid.frontZ) * depth;
    const sideInset = (index % 4) * 0.18;

    addSegment(
      [-width / 2 + sideInset, -1.02 - depth * 0.11, z],
      [-0.55, -1.02 - depth * 0.11, z],
      depth,
    );
    addSegment(
      [0.55, -1.02 - depth * 0.11, z],
      [width / 2 - sideInset, -1.02 - depth * 0.11, z],
      depth,
    );
  }

  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new Float32BufferAttribute(positions, 3));
  geometry.setAttribute("color", new Float32BufferAttribute(colors, 3));
  geometry.computeBoundingSphere();
  return geometry;
}

export function SpatialGrid({
  palette,
  quality,
  sceneFrameRef,
}: SpatialGridProps) {
  const materialRef = useRef<LineBasicMaterial>(null);
  const geometry = useMemo(
    () => createGridGeometry(palette, quality),
    [palette, quality],
  );

  useEffect(() => {
    const material = materialRef.current;

    return () => {
      geometry.dispose();
      material?.dispose();
    };
  }, [geometry]);

  useFrame(() => {
    if (materialRef.current) {
      materialRef.current.opacity =
        0.2 +
        sceneFrameRef.current.structureProgress * 0.24 +
        sceneFrameRef.current.diagnosisProgress * 0.08;
    }
  });

  return (
    <lineSegments frustumCulled={false} geometry={geometry}>
      <lineBasicMaterial
        depthWrite={false}
        opacity={0.32}
        ref={materialRef}
        transparent
        vertexColors
      />
    </lineSegments>
  );
}
