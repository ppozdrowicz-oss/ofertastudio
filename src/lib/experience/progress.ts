export const experienceSceneRanges = [
  { end: 0.15, id: "hero", start: 0 },
  { end: 0.3, id: "chaos", start: 0.15 },
  { end: 0.45, id: "diagnosis", start: 0.3 },
  { end: 0.65, id: "transformation", start: 0.45 },
  { end: 0.82, id: "services", start: 0.65 },
  { end: 1, id: "conversion", start: 0.82 },
] as const;

export type ExperienceSceneId = (typeof experienceSceneRanges)[number]["id"];

export type ExperienceScenePhase = {
  id: ExperienceSceneId;
  localProgress: number;
  progress: number;
};

export type ScrollProgressMetrics = {
  elementHeight: number;
  elementTop: number;
  scrollY: number;
  viewportHeight: number;
};

export function clampExperienceProgress(progress: number): number {
  return Math.min(1, Math.max(0, progress));
}

export function normalizeScrollProgress({
  elementHeight,
  elementTop,
  scrollY,
  viewportHeight,
}: ScrollProgressMetrics): number {
  const travelDistance = Math.max(1, elementHeight - viewportHeight);
  return clampExperienceProgress((scrollY - elementTop) / travelDistance);
}

export function getExperienceScenePhase(
  progress: number,
): ExperienceScenePhase {
  const clampedProgress = clampExperienceProgress(progress);
  const range =
    experienceSceneRanges.find(
      (candidate) => clampedProgress < candidate.end,
    ) ?? experienceSceneRanges[5];
  const duration = range.end - range.start;

  return {
    id: range.id,
    localProgress: clampExperienceProgress(
      (clampedProgress - range.start) / duration,
    ),
    progress: clampedProgress,
  };
}
