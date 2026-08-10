import { useFrame } from "@react-three/fiber";
import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import {
  type BufferAttribute,
  type BufferGeometry,
  DynamicDrawUsage,
  type InstancedMesh,
  type LineBasicMaterial,
  MathUtils,
  Object3D,
} from "three";

import type { LandscapeResources } from "@/components/experience/conversion-landscape/use-landscape-resources";
import type { SignalConnectionData } from "@/lib/experience/procedural";
import {
  type ConversionSceneFrame,
  getStaggeredStructureProgress,
} from "@/lib/experience/scene-timeline";

export type SignalFieldProps = {
  connections: readonly SignalConnectionData[];
  reducedMotion: boolean;
  resources: LandscapeResources;
  sceneFrameRef: React.RefObject<ConversionSceneFrame>;
  signalColor: string;
};

function interpolate(from: number, to: number, progress: number): number {
  return MathUtils.lerp(from, to, progress);
}

export function SignalField({
  connections,
  reducedMotion,
  resources,
  sceneFrameRef,
  signalColor,
}: SignalFieldProps) {
  const markersRef = useRef<InstancedMesh>(null);
  const lineGeometryRef = useRef<BufferGeometry>(null);
  const lineMaterialRef = useRef<LineBasicMaterial>(null);
  const linePositionRef = useRef<BufferAttribute>(null);
  const markerTransform = useMemo(() => new Object3D(), []);
  const linePositions = useMemo(
    () => new Float32Array(connections.length * 6),
    [connections.length],
  );

  useLayoutEffect(() => {
    markersRef.current?.instanceMatrix.setUsage(DynamicDrawUsage);
    linePositionRef.current?.setUsage(DynamicDrawUsage);
  }, []);

  useEffect(() => {
    const geometry = lineGeometryRef.current;
    const material = lineMaterialRef.current;

    return () => {
      geometry?.dispose();
      material?.dispose();
    };
  }, []);

  useFrame(() => {
    const markers = markersRef.current;
    const lineMaterial = lineMaterialRef.current;
    const linePosition = linePositionRef.current;
    const scene = sceneFrameRef.current;

    if (!markers || !lineMaterial || !linePosition) {
      return;
    }

    connections.forEach((connection, index) => {
      const structureProgress = getStaggeredStructureProgress(
        scene.structureProgress,
        connection.delay,
      );
      const fromX = interpolate(
        connection.chaosFrom[0],
        connection.from[0],
        structureProgress,
      );
      const fromY = interpolate(
        connection.chaosFrom[1],
        connection.from[1],
        structureProgress,
      );
      const fromZ = interpolate(
        connection.chaosFrom[2],
        connection.from[2],
        structureProgress,
      );
      const toX = interpolate(
        connection.chaosTo[0],
        connection.to[0],
        structureProgress,
      );
      const toY = interpolate(
        connection.chaosTo[1],
        connection.to[1],
        structureProgress,
      );
      const toZ = interpolate(
        connection.chaosTo[2],
        connection.to[2],
        structureProgress,
      );
      const markerProgress = reducedMotion
        ? connection.phase
        : (connection.phase +
            scene.progress * (1.35 - scene.diagnosisProgress * 0.5)) %
          1;
      const markerScale = Math.max(
        0.001,
        scene.signalProgress * (0.72 + scene.priorityProgress * 0.1),
      );

      linePosition.setXYZ(index * 2, fromX, fromY, fromZ);
      linePosition.setXYZ(index * 2 + 1, toX, toY, toZ);

      markerTransform.position.set(
        interpolate(fromX, toX, markerProgress),
        interpolate(fromY, toY, markerProgress),
        interpolate(fromZ, toZ, markerProgress),
      );
      markerTransform.lookAt(toX, toY, toZ);
      markerTransform.scale.set(
        markerScale * 0.08,
        markerScale * 0.08,
        markerScale * 0.32,
      );
      markerTransform.updateMatrix();
      markers.setMatrixAt(index, markerTransform.matrix);
    });

    linePosition.needsUpdate = true;
    markers.instanceMatrix.needsUpdate = true;
    lineMaterial.opacity =
      0.08 + scene.signalProgress * 0.42 + scene.diagnosisProgress * 0.08;
  });

  return (
    <group>
      <lineSegments frustumCulled={false}>
        <bufferGeometry ref={lineGeometryRef}>
          <bufferAttribute
            args={[linePositions, 3]}
            attach="attributes-position"
            ref={linePositionRef}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color={signalColor}
          depthWrite={false}
          opacity={0.08}
          ref={lineMaterialRef}
          transparent
        />
      </lineSegments>
      <instancedMesh
        args={[
          resources.boxGeometry,
          resources.accentMaterial,
          connections.length,
        ]}
        frustumCulled={false}
        ref={markersRef}
      />
    </group>
  );
}
