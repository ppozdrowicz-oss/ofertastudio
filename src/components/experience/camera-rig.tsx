import { useFrame } from "@react-three/fiber";
import type { RefObject } from "react";
import { useRef } from "react";
import { PerspectiveCamera, Vector3 } from "three";

import {
  type MutableCameraPathSample,
  updateConversionCameraPathSample,
} from "@/lib/experience/camera-path";
import {
  dampValue,
  experienceMotion,
  type ExperiencePointer,
} from "@/lib/experience/motion";
import type { ExperienceQuality } from "@/lib/experience/quality";

export type CameraRigProps = {
  dampedProgressRef: RefObject<number>;
  pointerRef: RefObject<ExperiencePointer>;
  quality: ExperienceQuality;
  reducedMotion: boolean;
};

export function CameraRig({
  dampedProgressRef,
  pointerRef,
  quality,
  reducedMotion,
}: CameraRigProps) {
  const sampleRef = useRef<MutableCameraPathSample>({
    fov: 43,
    position: [0, 0, 0],
    roll: 0,
    target: [0, 0, 0],
  });
  const smoothedTargetRef = useRef(new Vector3());
  const smoothedPointerRef = useRef<ExperiencePointer>({ x: 0, y: 0 });
  const smoothedRollRef = useRef(0);

  useFrame(({ camera }, delta) => {
    if (!(camera instanceof PerspectiveCamera)) {
      return;
    }

    const sample = sampleRef.current;
    const smoothedTarget = smoothedTargetRef.current;
    updateConversionCameraPathSample(
      dampedProgressRef.current,
      quality.composition,
      sample,
    );

    const pointerTargetX = reducedMotion
      ? 0
      : pointerRef.current.x * quality.pointerStrength;
    const pointerTargetY = reducedMotion
      ? 0
      : pointerRef.current.y * quality.pointerStrength;

    smoothedPointerRef.current.x = dampValue(
      smoothedPointerRef.current.x,
      pointerTargetX,
      experienceMotion.pointerDamping,
      delta,
    );
    smoothedPointerRef.current.y = dampValue(
      smoothedPointerRef.current.y,
      pointerTargetY,
      experienceMotion.pointerDamping,
      delta,
    );

    const targetPositionX = sample.position[0] + smoothedPointerRef.current.x;
    const targetPositionY =
      sample.position[1] + smoothedPointerRef.current.y * 0.5;
    const targetPositionZ = sample.position[2];
    const targetX = sample.target[0] + smoothedPointerRef.current.x * 0.3;
    const targetY = sample.target[1] + smoothedPointerRef.current.y * 0.16;
    const targetZ = sample.target[2];

    if (reducedMotion) {
      camera.position.set(targetPositionX, targetPositionY, targetPositionZ);
      smoothedTarget.set(targetX, targetY, targetZ);
      camera.fov = sample.fov;
      smoothedRollRef.current = sample.roll;
    } else {
      camera.position.set(
        dampValue(
          camera.position.x,
          targetPositionX,
          experienceMotion.cameraDamping,
          delta,
        ),
        dampValue(
          camera.position.y,
          targetPositionY,
          experienceMotion.cameraDamping,
          delta,
        ),
        dampValue(
          camera.position.z,
          targetPositionZ,
          experienceMotion.cameraDamping,
          delta,
        ),
      );
      smoothedTarget.set(
        dampValue(
          smoothedTarget.x,
          targetX,
          experienceMotion.cameraDamping,
          delta,
        ),
        dampValue(
          smoothedTarget.y,
          targetY,
          experienceMotion.cameraDamping,
          delta,
        ),
        dampValue(
          smoothedTarget.z,
          targetZ,
          experienceMotion.cameraDamping,
          delta,
        ),
      );
      camera.fov = dampValue(
        camera.fov,
        sample.fov,
        experienceMotion.cameraDamping,
        delta,
      );
      smoothedRollRef.current = dampValue(
        smoothedRollRef.current,
        sample.roll,
        experienceMotion.cameraDamping,
        delta,
      );
    }

    camera.lookAt(smoothedTarget);
    camera.rotation.z += smoothedRollRef.current;
    camera.updateProjectionMatrix();
  }, -50);

  return null;
}
