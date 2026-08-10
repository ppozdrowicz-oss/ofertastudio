import type { ExperienceSequence } from "./experience-sequence.ts";
import { clampExperienceProgress } from "./progress.ts";

export const conversionSceneRanges = [
  { end: 0.18, id: "establishing", start: 0 },
  { end: 0.42, id: "chaos", start: 0.18 },
  { end: 0.78, id: "ordering", start: 0.42 },
  { end: 1, id: "structure", start: 0.78 },
] as const;

export type ConversionSceneStateId =
  (typeof conversionSceneRanges)[number]["id"];

export const heroSceneRanges = [
  { end: 0.2, id: "arrival", start: 0 },
  { end: 0.42, id: "recognition", start: 0.2 },
  { end: 0.66, id: "approach", start: 0.42 },
  { end: 0.86, id: "opening", start: 0.66 },
  { end: 1, id: "handoff", start: 0.86 },
] as const;

export type HeroSceneStateId = (typeof heroSceneRanges)[number]["id"];

export const homepageStoryRanges = [
  { end: 0.12, id: "hero", start: 0 },
  { end: 0.24, id: "problem-intro", start: 0.12 },
  { end: 0.46, id: "fragmented", start: 0.24 },
  { end: 0.58, id: "observe", start: 0.46 },
  { end: 0.72, id: "diagnose", start: 0.58 },
  { end: 0.82, id: "prioritize", start: 0.72 },
  { end: 0.9, id: "structured", start: 0.82 },
  { end: 0.97, id: "mini-diagnosis", start: 0.9 },
  { end: 1, id: "handoff", start: 0.97 },
] as const;

export const homepageHeroEnd = homepageStoryRanges[0].end;

export type HomepageStoryStateId = (typeof homepageStoryRanges)[number]["id"];

export type HeroScenePhase = {
  progress: number;
  state: HeroSceneStateId;
  stateProgress: number;
};

export type HomepageStoryPhase = {
  progress: number;
  state: HomepageStoryStateId;
  stateProgress: number;
};

export type ConversionSceneFrame = {
  chaosWeight: number;
  diagnosisProgress: number;
  diagnosticFocus: number;
  focusProgress: number;
  fragmentationProgress: number;
  priorityProgress: number;
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

function resolveHeroSceneRange(progress: number) {
  return (
    heroSceneRanges.find((candidate) => progress < candidate.end) ??
    heroSceneRanges[4]
  );
}

function resolveHomepageStoryRange(progress: number) {
  return (
    homepageStoryRanges.find((candidate) => progress < candidate.end) ??
    homepageStoryRanges[8]
  );
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
  target.diagnosisProgress = 0;
  target.diagnosticFocus = 0;
  target.focusProgress = progressBetween(clamped, 0.64, 0.94);
  target.fragmentationProgress = 0;
  target.priorityProgress = 0;
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
    diagnosisProgress: 0,
    diagnosticFocus: 0,
    focusProgress: 0,
    fragmentationProgress: 0,
    priorityProgress: 0,
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

export function getHeroScenePhase(progress: number): HeroScenePhase {
  const clamped = clampExperienceProgress(progress);
  const range = resolveHeroSceneRange(clamped);

  return {
    progress: clamped,
    state: range.id,
    stateProgress: progressBetween(clamped, range.start, range.end),
  };
}

export function getHomepageStoryPhase(progress: number): HomepageStoryPhase {
  const clamped = clampExperienceProgress(progress);
  const range = resolveHomepageStoryRange(clamped);

  return {
    progress: clamped,
    state: range.id,
    stateProgress: progressBetween(clamped, range.start, range.end),
  };
}

export function updateHeroSceneFrame(
  progress: number,
  target: ConversionSceneFrame,
): void {
  const clamped = clampExperienceProgress(progress);
  const structureProgress = 0.86 + smoothstep(clamped) * 0.14;
  const range = resolveHeroSceneRange(clamped);

  target.chaosWeight = 1 - structureProgress;
  target.diagnosisProgress = 0;
  target.diagnosticFocus = 0;
  target.focusProgress = 0.76 + progressBetween(clamped, 0.12, 0.78) * 0.24;
  target.fragmentationProgress = 0;
  target.priorityProgress = 0;
  target.progress = clamped;
  target.signalProgress = 0.68 + progressBetween(clamped, 0.16, 0.88) * 0.32;
  target.state = "structure";
  target.stateProgress = progressBetween(clamped, range.start, range.end);
  target.structureProgress = structureProgress;
}

export function updateHomepageSceneFrame(
  progress: number,
  target: ConversionSceneFrame,
): void {
  const clamped = clampExperienceProgress(progress);

  if (clamped <= homepageHeroEnd) {
    updateHeroSceneFrame(clamped / homepageHeroEnd, target);
    target.progress = clamped;
    return;
  }

  const fragmentation = progressBetween(clamped, 0.12, 0.46);
  const observation = progressBetween(clamped, 0.42, 0.58);
  const diagnosis = progressBetween(clamped, 0.52, 0.78);
  const priority = progressBetween(clamped, 0.68, 0.88);
  const intermediateStructure = 1 - fragmentation * 0.72 + diagnosis * 0.5;
  const range = resolveHomepageStoryRange(clamped);

  target.chaosWeight = 1 - intermediateStructure;
  target.diagnosisProgress = diagnosis;
  target.diagnosticFocus =
    Math.min(1, observation * 0.45 + diagnosis * 0.55) * 5;
  target.focusProgress = 1 - fragmentation * 0.42 + diagnosis * 0.34;
  target.fragmentationProgress = fragmentation * (1 - diagnosis * 0.58);
  target.priorityProgress = priority;
  target.progress = clamped;
  target.signalProgress = 1 - fragmentation * 0.76 + diagnosis * 0.56;
  target.state =
    clamped < 0.46 ? "chaos" : clamped < 0.82 ? "ordering" : "structure";
  target.stateProgress = progressBetween(clamped, range.start, range.end);
  target.structureProgress = intermediateStructure;
}

export function createExperienceSceneFrame(
  sequence: ExperienceSequence,
  progress = 0,
): ConversionSceneFrame {
  const frame = createConversionSceneFrame(progress);

  if (sequence === "hero") {
    updateHeroSceneFrame(progress, frame);
  } else if (sequence === "homepage") {
    updateHomepageSceneFrame(progress, frame);
  }

  return frame;
}

export function updateExperienceSceneFrame(
  sequence: ExperienceSequence,
  progress: number,
  target: ConversionSceneFrame,
): void {
  if (sequence === "hero") {
    updateHeroSceneFrame(progress, target);
    return;
  }

  if (sequence === "homepage") {
    updateHomepageSceneFrame(progress, target);
    return;
  }

  updateConversionSceneFrame(progress, target);
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
