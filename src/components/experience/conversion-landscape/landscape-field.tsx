import { useLayoutEffect, useMemo, useRef } from "react";
import { type InstancedMesh, Object3D, StaticDrawUsage } from "three";

import type { LandscapeResources } from "@/components/experience/conversion-landscape/use-landscape-resources";
import type { LandscapePlatformData } from "@/lib/experience/procedural";

export type LandscapeFieldProps = {
  platforms: readonly LandscapePlatformData[];
  resources: LandscapeResources;
};

export function LandscapeField({ platforms, resources }: LandscapeFieldProps) {
  const meshRef = useRef<InstancedMesh>(null);
  const transform = useMemo(() => new Object3D(), []);

  useLayoutEffect(() => {
    const mesh = meshRef.current;

    if (!mesh) {
      return;
    }

    mesh.instanceMatrix.setUsage(StaticDrawUsage);

    platforms.forEach((platform, index) => {
      transform.position.set(...platform.transform.position);
      transform.rotation.set(...platform.transform.rotation);
      transform.scale.set(...platform.transform.scale);
      transform.updateMatrix();
      mesh.setMatrixAt(index, transform.matrix);
    });

    mesh.instanceMatrix.needsUpdate = true;
    mesh.computeBoundingSphere();
  }, [platforms, transform]);

  return (
    <instancedMesh
      args={[resources.boxGeometry, resources.fieldMaterial, platforms.length]}
      ref={meshRef}
    />
  );
}
