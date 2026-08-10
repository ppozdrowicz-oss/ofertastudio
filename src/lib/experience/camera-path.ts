import type { ExperienceSequence } from "./experience-sequence.ts";
import { clampExperienceProgress } from "./progress.ts";
import type { SceneVector3 } from "./scene-config.ts";

export type CameraComposition = "compact" | "wide";
export type CameraShot = "approach" | "establishing" | "passage" | "reveal";
export type HeroCameraShot =
  "arrival" | "recognition" | "approach" | "opening" | "handoff";

export type CameraKeyframe<TShot extends string = CameraShot> = {
  at: number;
  fov: number;
  position: SceneVector3;
  roll: number;
  shot: TShot;
  target: SceneVector3;
};

export type CameraPathSample = {
  fov: number;
  position: SceneVector3;
  roll: number;
  target: SceneVector3;
};

export type MutableCameraPathSample = {
  fov: number;
  position: [number, number, number];
  roll: number;
  target: [number, number, number];
};

export const conversionCameraPaths = {
  compact: [
    {
      at: 0,
      fov: 50,
      position: [4.8, 7.2, 15.8],
      roll: -0.012,
      shot: "establishing",
      target: [0, -0.45, -4.2],
    },
    {
      at: 0.34,
      fov: 48,
      position: [3.2, 5.7, 9.4],
      roll: -0.008,
      shot: "approach",
      target: [-0.25, -0.5, -6.2],
    },
    {
      at: 0.68,
      fov: 47,
      position: [1.1, 4.7, 2.8],
      roll: 0,
      shot: "passage",
      target: [0, -0.52, -9.4],
    },
    {
      at: 1,
      fov: 48,
      position: [0, 5.2, 1.6],
      roll: 0.006,
      shot: "reveal",
      target: [0, -0.5, -9.8],
    },
  ],
  wide: [
    {
      at: 0,
      fov: 43,
      position: [7.2, 6.4, 14.4],
      roll: -0.018,
      shot: "establishing",
      target: [0, -0.28, -3.8],
    },
    {
      at: 0.34,
      fov: 41,
      position: [4.5, 4.5, 8.2],
      roll: -0.01,
      shot: "approach",
      target: [-0.7, -0.36, -6.1],
    },
    {
      at: 0.68,
      fov: 39,
      position: [1.6, 3.35, 0.9],
      roll: 0,
      shot: "passage",
      target: [0.15, -0.42, -9.6],
    },
    {
      at: 1,
      fov: 38,
      position: [-1.35, 3.9, -5.2],
      roll: 0.008,
      shot: "reveal",
      target: [0, -0.46, -13.2],
    },
  ],
} as const satisfies Record<CameraComposition, readonly CameraKeyframe[]>;

export const heroCameraPaths = {
  compact: [
    {
      at: 0,
      fov: 51,
      position: [5.1, 7.8, 15.2],
      roll: -0.006,
      shot: "arrival",
      target: [-0.45, 3.15, -6.2],
    },
    {
      at: 0.2,
      fov: 50,
      position: [4.4, 7.2, 12.2],
      roll: -0.004,
      shot: "recognition",
      target: [-0.35, 3, -7.4],
    },
    {
      at: 0.46,
      fov: 49,
      position: [3.2, 6.5, 8.1],
      roll: -0.002,
      shot: "approach",
      target: [-0.2, 2.76, -9],
    },
    {
      at: 0.74,
      fov: 48,
      position: [1.5, 5.7, 3.9],
      roll: 0.002,
      shot: "opening",
      target: [0, 2.48, -11.1],
    },
    {
      at: 1,
      fov: 49,
      position: [0.35, 5.45, 2.4],
      roll: 0.004,
      shot: "handoff",
      target: [0, 2.24, -12.6],
    },
  ],
  wide: [
    {
      at: 0,
      fov: 44,
      position: [7.4, 5.7, 12.4],
      roll: -0.01,
      shot: "arrival",
      target: [-4.1, -0.16, -8.1],
    },
    {
      at: 0.2,
      fov: 43,
      position: [6.5, 5.15, 9.6],
      roll: -0.008,
      shot: "recognition",
      target: [-4, -0.22, -8.9],
    },
    {
      at: 0.46,
      fov: 41.5,
      position: [5.1, 4.45, 5.5],
      roll: -0.004,
      shot: "approach",
      target: [-3.85, -0.32, -10.2],
    },
    {
      at: 0.74,
      fov: 40,
      position: [3.55, 3.75, 1.1],
      roll: 0,
      shot: "opening",
      target: [-3.65, -0.42, -12],
    },
    {
      at: 1,
      fov: 39,
      position: [2.25, 3.65, -2.9],
      roll: 0.004,
      shot: "handoff",
      target: [-3.4, -0.5, -13.5],
    },
  ],
} as const satisfies Record<
  CameraComposition,
  readonly CameraKeyframe<HeroCameraShot>[]
>;

function smoothstep(progress: number): number {
  const clamped = clampExperienceProgress(progress);
  return clamped * clamped * (3 - 2 * clamped);
}

function writeInterpolatedTuple(
  from: SceneVector3,
  to: SceneVector3,
  progress: number,
  target: [number, number, number],
): void {
  target[0] = from[0] + (to[0] - from[0]) * progress;
  target[1] = from[1] + (to[1] - from[1]) * progress;
  target[2] = from[2] + (to[2] - from[2]) * progress;
}

export function updateConversionCameraPathSample(
  progress: number,
  composition: CameraComposition,
  target: MutableCameraPathSample,
): void {
  updateCameraPathSample(progress, conversionCameraPaths[composition], target);
}

export function updateExperienceCameraPathSample(
  progress: number,
  composition: CameraComposition,
  sequence: ExperienceSequence,
  target: MutableCameraPathSample,
): void {
  if (sequence === "hero") {
    updateCameraPathSample(progress, heroCameraPaths[composition], target);
    return;
  }

  updateCameraPathSample(progress, conversionCameraPaths[composition], target);
}

function updateCameraPathSample(
  progress: number,
  keyframes: readonly CameraKeyframe<string>[],
  target: MutableCameraPathSample,
): void {
  const clamped = clampExperienceProgress(progress);
  const upperIndex = keyframes.findIndex((keyframe) => clamped <= keyframe.at);
  const resolvedUpperIndex =
    upperIndex === -1 ? keyframes.length - 1 : upperIndex;
  const resolvedLowerIndex = Math.max(0, resolvedUpperIndex - 1);
  const lower = keyframes[resolvedLowerIndex] ?? keyframes[0];
  const upper = keyframes[resolvedUpperIndex] ?? keyframes.at(-1);

  if (!lower || !upper) {
    throw new Error("Ścieżka kamery nie zawiera wymaganych klatek.");
  }

  const duration = Math.max(upper.at - lower.at, Number.EPSILON);
  const localProgress = smoothstep((clamped - lower.at) / duration);

  target.fov = lower.fov + (upper.fov - lower.fov) * localProgress;
  target.roll = lower.roll + (upper.roll - lower.roll) * localProgress;
  writeInterpolatedTuple(
    lower.position,
    upper.position,
    localProgress,
    target.position,
  );
  writeInterpolatedTuple(
    lower.target,
    upper.target,
    localProgress,
    target.target,
  );
}

export function sampleConversionCameraPath(
  progress: number,
  composition: CameraComposition,
): CameraPathSample {
  const target: MutableCameraPathSample = {
    fov: 43,
    position: [0, 0, 0],
    roll: 0,
    target: [0, 0, 0],
  };
  updateConversionCameraPathSample(progress, composition, target);
  return target;
}

export function sampleExperienceCameraPath(
  progress: number,
  composition: CameraComposition,
  sequence: ExperienceSequence,
): CameraPathSample {
  const target: MutableCameraPathSample = {
    fov: 43,
    position: [0, 0, 0],
    roll: 0,
    target: [0, 0, 0],
  };
  updateExperienceCameraPathSample(progress, composition, sequence, target);
  return target;
}
