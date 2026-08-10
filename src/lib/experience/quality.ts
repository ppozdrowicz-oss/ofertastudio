export type ExperienceQualityTier = "high" | "medium" | "low" | "fallback";

export type ExperienceQuality = {
  antialias: boolean;
  columns: number;
  fogFar: number;
  fogNear: number;
  gridDivisions: number;
  maxDpr: number;
  minDpr: number;
  moduleCount: number;
  particleBudget: 0;
  pointerStrength: number;
  postprocessing: false;
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
    fogFar: 0,
    fogNear: 0,
    gridDivisions: 0,
    maxDpr: 1,
    minDpr: 1,
    moduleCount: 0,
    particleBudget: 0,
    pointerStrength: 0,
    postprocessing: false,
    tier: "fallback",
  },
  high: {
    antialias: true,
    columns: 8,
    fogFar: 34,
    fogNear: 11,
    gridDivisions: 32,
    maxDpr: 2,
    minDpr: 1,
    moduleCount: 72,
    particleBudget: 0,
    pointerStrength: 0.28,
    postprocessing: false,
    tier: "high",
  },
  low: {
    antialias: false,
    columns: 4,
    fogFar: 26,
    fogNear: 8,
    gridDivisions: 16,
    maxDpr: 1.25,
    minDpr: 1,
    moduleCount: 24,
    particleBudget: 0,
    pointerStrength: 0,
    postprocessing: false,
    tier: "low",
  },
  medium: {
    antialias: true,
    columns: 6,
    fogFar: 30,
    fogNear: 9,
    gridDivisions: 24,
    maxDpr: 1.5,
    minDpr: 1,
    moduleCount: 48,
    particleBudget: 0,
    pointerStrength: 0.18,
    postprocessing: false,
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
