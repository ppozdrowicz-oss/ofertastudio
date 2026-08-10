import { useFrame } from "@react-three/fiber";
import type { RefObject } from "react";
import { useRef } from "react";
import { MathUtils, PerspectiveCamera, Vector3 } from "three";

import {
  dampValue,
  experienceMotion,
  type ExperiencePointer,
} from "@/lib/experience/motion";
import { clampExperienceProgress } from "@/lib/experience/progress";
import type { ExperienceQuality } from "@/lib/experience/quality";

type VectorTuple = readonly [number, number, number];

type CameraKeyframe = {
  at: number;
  fov: number;
  position: VectorTuple;
  roll: number;
  target: VectorTuple;
};

type CameraSample = {
  fov: number;
  position: Vector3;
  roll: number;
  target: Vector3;
};

const cameraKeyframes = [
  {
    at: 0,
    fov: 43,
    position: [4.8, 4.5, 11],
    roll: -0.025,
    target: [0, -0.15, 0],
  },
  {
    at: 0.15,
    fov: 42,
    position: [3.7, 4.1, 8.6],
    roll: -0.018,
    target: [-0.7, -0.2, -1.7],
  },
  {
    at: 0.3,
    fov: 41,
    position: [2.6, 3.7, 6.1],
    roll: -0.01,
    target: [-0.25, -0.25, -3.5],
  },
  {
    at: 0.45,
    fov: 40,
    position: [1.7, 3.25, 3.2],
    roll: 0,
    target: [0, -0.3, -5.4],
  },
  {
    at: 0.65,
    fov: 39,
    position: [0.6, 2.9, -0.7],
    roll: 0.008,
    target: [0.1, -0.35, -8.1],
  },
  {
    at: 0.82,
    fov: 38,
    position: [-0.35, 2.65, -3.7],
    roll: 0.012,
    target: [0, -0.4, -10.7],
  },
  {
    at: 1,
    fov: 37,
    position: [-1.15, 2.45, -7.2],
    roll: 0.016,
    target: [0, -0.45, -13.4],
  },
] as const satisfies readonly CameraKeyframe[];

function interpolateTuple(
  from: VectorTuple,
  to: VectorTuple,
  progress: number,
  target: Vector3,
): void {
  target.set(
    MathUtils.lerp(from[0], to[0], progress),
    MathUtils.lerp(from[1], to[1], progress),
    MathUtils.lerp(from[2], to[2], progress),
  );
}

function sampleCameraPath(progress: number, sample: CameraSample): void {
  const clamped = clampExperienceProgress(progress);
  const upperIndex = cameraKeyframes.findIndex(
    (keyframe) => clamped <= keyframe.at,
  );
  const resolvedUpperIndex =
    upperIndex === -1 ? cameraKeyframes.length - 1 : upperIndex;
  const resolvedLowerIndex = Math.max(0, resolvedUpperIndex - 1);
  const lower = cameraKeyframes[resolvedLowerIndex];
  const upper = cameraKeyframes[resolvedUpperIndex];

  if (!lower || !upper) {
    return;
  }

  const segmentDuration = Math.max(upper.at - lower.at, Number.EPSILON);
  const localProgress = clampExperienceProgress(
    (clamped - lower.at) / segmentDuration,
  );
  const easedProgress = localProgress * localProgress * (3 - 2 * localProgress);

  interpolateTuple(
    lower.position,
    upper.position,
    easedProgress,
    sample.position,
  );
  interpolateTuple(lower.target, upper.target, easedProgress, sample.target);
  sample.fov = MathUtils.lerp(lower.fov, upper.fov, easedProgress);
  sample.roll = MathUtils.lerp(lower.roll, upper.roll, easedProgress);
}

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
  const sampleRef = useRef<CameraSample>({
    fov: 43,
    position: new Vector3(),
    roll: 0,
    target: new Vector3(),
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
    sampleCameraPath(dampedProgressRef.current, sample);

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

    sample.position.x += smoothedPointerRef.current.x;
    sample.position.y += smoothedPointerRef.current.y * 0.55;
    sample.target.x += smoothedPointerRef.current.x * 0.35;
    sample.target.y += smoothedPointerRef.current.y * 0.18;

    if (reducedMotion) {
      camera.position.copy(sample.position);
      smoothedTarget.copy(sample.target);
      camera.fov = sample.fov;
      smoothedRollRef.current = sample.roll;
    } else {
      camera.position.set(
        dampValue(
          camera.position.x,
          sample.position.x,
          experienceMotion.cameraDamping,
          delta,
        ),
        dampValue(
          camera.position.y,
          sample.position.y,
          experienceMotion.cameraDamping,
          delta,
        ),
        dampValue(
          camera.position.z,
          sample.position.z,
          experienceMotion.cameraDamping,
          delta,
        ),
      );
      smoothedTarget.set(
        dampValue(
          smoothedTarget.x,
          sample.target.x,
          experienceMotion.cameraDamping,
          delta,
        ),
        dampValue(
          smoothedTarget.y,
          sample.target.y,
          experienceMotion.cameraDamping,
          delta,
        ),
        dampValue(
          smoothedTarget.z,
          sample.target.z,
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
