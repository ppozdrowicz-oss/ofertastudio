import type { CameraComposition } from "./camera-path.ts";

export type ExperienceQualityTier = "high" | "medium" | "low" | "fallback";

export type ExperienceQuality = {
  antialias: boolean;
  columns: number;
  composition: CameraComposition;
  fieldCount: number;
  fogFar: number;
  fogNear: number;
  gridDivisions: number;
  landscapeDepth: number;
  maxDpr: number;
  minDpr: number;
  moduleCount: number;
  particleBudget: 0;
  pointerStrength: number;
  postprocessing: false;
  signalCount: number;
  tier: ExperienceQualityTier;
};

export type ExperienceCapabilities = {
  devicePixelRatio: number;
  reducedMotion: boolean;
  touch: boolean;
  viewportHeight: number;
  viewportWidth: number;
  webgl: boolean;
};

const qualityPresets = {
  fallback: {
    antialias: false,
    columns: 0,
    composition: "compact",
    fieldCount: 0,
    fogFar: 0,
    fogNear: 0,
    gridDivisions: 0,
    landscapeDepth: 0,
    maxDpr: 1,
    minDpr: 1,
    moduleCount: 0,
    particleBudget: 0,
    pointerStrength: 0,
    postprocessing: false,
    signalCount: 0,
    tier: "fallback",
  },
  high: {
    antialias: true,
    columns: 8,
    composition: "wide",
    fieldCount: 14,
    fogFar: 38,
    fogNear: 12,
    gridDivisions: 30,
    landscapeDepth: 20,
    maxDpr: 2,
    minDpr: 1,
    moduleCount: 72,
    particleBudget: 0,
    pointerStrength: 0.28,
    postprocessing: false,
    signalCount: 24,
    tier: "high",
  },
  low: {
    antialias: false,
    columns: 4,
    composition: "compact",
    fieldCount: 7,
    fogFar: 28,
    fogNear: 9,
    gridDivisions: 14,
    landscapeDepth: 12,
    maxDpr: 1.25,
    minDpr: 1,
    moduleCount: 24,
    particleBudget: 0,
    pointerStrength: 0,
    postprocessing: false,
    signalCount: 8,
    tier: "low",
  },
  medium: {
    antialias: true,
    columns: 6,
    composition: "wide",
    fieldCount: 10,
    fogFar: 34,
    fogNear: 10,
    gridDivisions: 22,
    landscapeDepth: 17,
    maxDpr: 1.5,
    minDpr: 1,
    moduleCount: 48,
    particleBudget: 0,
    pointerStrength: 0.18,
    postprocessing: false,
    signalCount: 16,
    tier: "medium",
  },
} as const satisfies Record<ExperienceQualityTier, ExperienceQuality>;

export function resolveExperienceQuality(
  capabilities: ExperienceCapabilities,
): ExperienceQuality {
  if (!capabilities.webgl) {
    return qualityPresets.fallback;
  }

  let preset: ExperienceQuality;

  if (
    capabilities.reducedMotion ||
    capabilities.touch ||
    capabilities.viewportWidth < 768 ||
    capabilities.viewportHeight < 560
  ) {
    preset = qualityPresets.low;
  } else if (
    capabilities.viewportWidth >= 1280 &&
    capabilities.viewportHeight >= 720
  ) {
    preset = qualityPresets.high;
  } else {
    preset = qualityPresets.medium;
  }

  return {
    ...preset,
    composition:
      capabilities.viewportWidth < 900 ||
      capabilities.viewportWidth / Math.max(1, capabilities.viewportHeight) <
        0.92
        ? "compact"
        : "wide",
    maxDpr: Math.min(
      preset.maxDpr,
      Math.max(preset.minDpr, capabilities.devicePixelRatio),
    ),
    pointerStrength:
      capabilities.reducedMotion || capabilities.touch
        ? 0
        : preset.pointerStrength,
  };
}

export function detectWebGLSupport(): boolean {
  if (typeof document === "undefined") {
    return false;
  }

  try {
    const canvas = document.createElement("canvas");
    const context =
      canvas.getContext("webgl2", { failIfMajorPerformanceCaveat: true }) ??
      canvas.getContext("webgl", { failIfMajorPerformanceCaveat: true });

    if (!context) {
      return false;
    }

    context.getExtension("WEBGL_lose_context")?.loseContext();
    return true;
  } catch {
    return false;
  }
}
