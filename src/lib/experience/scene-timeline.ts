import { clampExperienceProgress } from "./progress.ts";

export const conversionSceneRanges = [
  { end: 0.18, id: "establishing", start: 0 },
  { end: 0.42, id: "chaos", start: 0.18 },
  { end: 0.78, id: "ordering", start: 0.42 },
  { end: 1, id: "structure", start: 0.78 },
] as const;

export type ConversionSceneStateId =
  (typeof conversionSceneRanges)[number]["id"];

export type ConversionSceneFrame = {
  chaosWeight: number;
  focusProgress: number;
  progress: number;
  signalProgress: number;
  state: ConversionSceneStateId;
  stateProgress: number;
  structureProgress: number;
};

function smoothstep(progress: number): number {
  const clamped = clampExperienceProgress(progress);
  return clamped * clamped * (3 - 2 * clamped);
}

function progressBetween(progress: number, start: number, end: number): number {
  return smoothstep((progress - start) / Math.max(end - start, Number.EPSILON));
}

function writeConversionSceneFrame(
  progress: number,
  target: ConversionSceneFrame,
): ConversionSceneFrame {
  const clamped = clampExperienceProgress(progress);
  const range =
    conversionSceneRanges.find((candidate) => clamped < candidate.end) ??
    conversionSceneRanges[3];
  const stateProgress = progressBetween(clamped, range.start, range.end);
  const structureProgress = progressBetween(clamped, 0.4, 0.9);

  target.chaosWeight = 1 - structureProgress;
  target.focusProgress = progressBetween(clamped, 0.64, 0.94);
  target.progress = clamped;
  target.signalProgress = progressBetween(clamped, 0.5, 0.9);
  target.state = range.id;
  target.stateProgress = stateProgress;
  target.structureProgress = structureProgress;

  return target;
}

export function createConversionSceneFrame(progress = 0): ConversionSceneFrame {
  return writeConversionSceneFrame(progress, {
    chaosWeight: 1,
    focusProgress: 0,
    progress: 0,
    signalProgress: 0,
    state: "establishing",
    stateProgress: 0,
    structureProgress: 0,
  });
}

export function getConversionSceneFrame(
  progress: number,
): ConversionSceneFrame {
  return createConversionSceneFrame(progress);
}

export function updateConversionSceneFrame(
  progress: number,
  target: ConversionSceneFrame,
): void {
  writeConversionSceneFrame(progress, target);
}

export function getStaggeredStructureProgress(
  structureProgress: number,
  offset: number,
): number {
  return progressBetween(
    structureProgress,
    Math.min(0.72, Math.max(0, offset)),
    1,
  );
}
