import { useFrame } from "@react-three/fiber";
import { useLayoutEffect, useMemo, useRef } from "react";
import {
  Color,
  DynamicDrawUsage,
  type InstancedMesh,
  MathUtils,
  Object3D,
} from "three";

import type { LandscapeResources } from "@/components/experience/conversion-landscape/use-landscape-resources";
import { getDiagnosticDomainIndex } from "@/lib/experience/diagnosis";
import type { ExperiencePalette } from "@/lib/experience/palette";
import type { SpatialModuleData } from "@/lib/experience/procedural";
import {
  type ConversionSceneFrame,
  getStaggeredStructureProgress,
} from "@/lib/experience/scene-timeline";

export type SpatialModulesProps = {
  modules: readonly SpatialModuleData[];
  palette: ExperiencePalette;
  resources: LandscapeResources;
  sceneFrameRef: React.RefObject<ConversionSceneFrame>;
};

function writeModuleTransforms(
  mesh: InstancedMesh,
  modules: readonly SpatialModuleData[],
  transform: Object3D,
  sceneFrame: Pick<
    ConversionSceneFrame,
    "diagnosisProgress" | "diagnosticFocus" | "structureProgress"
  >,
): void {
  modules.forEach((module, index) => {
    const progress = getStaggeredStructureProgress(
      sceneFrame.structureProgress,
      module.transitionOffset,
    );
    const diagnosticDistance = Math.abs(
      getDiagnosticDomainIndex(module.diagnosticDomain) -
        sceneFrame.diagnosticFocus,
    );
    const diagnosticEmphasis =
      Math.max(0, 1 - diagnosticDistance) * sceneFrame.diagnosisProgress;

    transform.position.set(
      MathUtils.lerp(
        module.chaos.position[0],
        module.structure.position[0],
        progress,
      ),
      MathUtils.lerp(
        module.chaos.position[1],
        module.structure.position[1],
        progress,
      ) +
        diagnosticEmphasis * 0.24,
      MathUtils.lerp(
        module.chaos.position[2],
        module.structure.position[2],
        progress,
      ),
    );
    transform.rotation.set(
      MathUtils.lerp(
        module.chaos.rotation[0],
        module.structure.rotation[0],
        progress,
      ),
      MathUtils.lerp(
        module.chaos.rotation[1],
        module.structure.rotation[1],
        progress,
      ),
      MathUtils.lerp(
        module.chaos.rotation[2],
        module.structure.rotation[2],
        progress,
      ),
    );
    transform.scale.set(
      MathUtils.lerp(
        module.chaos.scale[0],
        module.structure.scale[0],
        progress,
      ) *
        (1 + diagnosticEmphasis * 0.08),
      MathUtils.lerp(
        module.chaos.scale[1],
        module.structure.scale[1],
        progress,
      ) *
        (1 + diagnosticEmphasis * 0.18),
      MathUtils.lerp(
        module.chaos.scale[2],
        module.structure.scale[2],
        progress,
      ) *
        (1 + diagnosticEmphasis * 0.08),
    );
    transform.updateMatrix();
    mesh.setMatrixAt(index, transform.matrix);
  });

  mesh.instanceMatrix.needsUpdate = true;
}

export function SpatialModules({
  modules,
  palette,
  resources,
  sceneFrameRef,
}: SpatialModulesProps) {
  const meshRef = useRef<InstancedMesh>(null);
  const transform = useMemo(() => new Object3D(), []);
  const color = useMemo(() => new Color(), []);

  useLayoutEffect(() => {
    const mesh = meshRef.current;

    if (!mesh) {
      return;
    }

    mesh.instanceMatrix.setUsage(DynamicDrawUsage);

    modules.forEach((module, index) => {
      const tone =
        module.tone === "accent"
          ? palette.accent
          : module.tone === "elevated"
            ? palette.surfaceElevated
            : palette.surface;
      mesh.setColorAt(index, color.set(tone));
    });

    writeModuleTransforms(mesh, modules, transform, {
      diagnosisProgress: 0,
      diagnosticFocus: 0,
      structureProgress: 0,
    });

    if (mesh.instanceColor) {
      mesh.instanceColor.needsUpdate = true;
    }

    mesh.computeBoundingSphere();
  }, [color, modules, palette, transform]);

  useFrame(() => {
    const mesh = meshRef.current;

    if (!mesh) {
      return;
    }

    writeModuleTransforms(mesh, modules, transform, sceneFrameRef.current);
  });

  return (
    <instancedMesh
      args={[resources.boxGeometry, resources.moduleMaterial, modules.length]}
      ref={meshRef}
    />
  );
}
