export type ExperiencePointer = {
  x: number;
  y: number;
};

export const experienceMotion = {
  cameraDamping: 4.8,
  maxFrameDelta: 1 / 20,
  pointerDamping: 7.2,
  reducedMotionProgress: 0.52,
  scrollDamping: 5.4,
} as const;

export function dampValue(
  current: number,
  target: number,
  damping: number,
  delta: number,
): number {
  const safeDelta = Math.min(
    experienceMotion.maxFrameDelta,
    Math.max(0, delta),
  );
  const factor = 1 - Math.exp(-damping * safeDelta);
  return current + (target - current) * factor;
}
