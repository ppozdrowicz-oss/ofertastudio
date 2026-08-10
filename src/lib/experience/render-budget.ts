import type { ExperienceQuality } from "./quality.ts";

export type ConversionLandscapeInventory = {
  drawCalls: number;
  dynamicLights: number;
  geometries: number;
  instances: number;
  materials: number;
  shadowMaps: number;
  textures: number;
  triangles: number;
};

export type ConversionLandscapeBudget = {
  maxDrawCalls: number;
  maxMaterials: number;
  maxTextures: number;
  maxTriangles: number;
};

export const conversionLandscapeBudgets = {
  fallback: {
    maxDrawCalls: 0,
    maxMaterials: 0,
    maxTextures: 0,
    maxTriangles: 0,
  },
  high: {
    maxDrawCalls: 8,
    maxMaterials: 6,
    maxTextures: 0,
    maxTriangles: 1_600,
  },
  low: {
    maxDrawCalls: 8,
    maxMaterials: 6,
    maxTextures: 0,
    maxTriangles: 700,
  },
  medium: {
    maxDrawCalls: 8,
    maxMaterials: 6,
    maxTextures: 0,
    maxTriangles: 1_100,
  },
} as const satisfies Record<
  ExperienceQuality["tier"],
  ConversionLandscapeBudget
>;

export function getConversionLandscapeInventory(
  quality: ExperienceQuality,
): ConversionLandscapeInventory {
  if (quality.tier === "fallback") {
    return {
      drawCalls: 0,
      dynamicLights: 0,
      geometries: 0,
      instances: 0,
      materials: 0,
      shadowMaps: 0,
      textures: 0,
      triangles: 0,
    };
  }

  const focusInstances = 4;
  const instances =
    quality.moduleCount +
    quality.fieldCount +
    quality.signalCount +
    focusInstances;

  return {
    drawCalls: 7,
    dynamicLights: 3,
    geometries: 3,
    instances,
    materials: 6,
    shadowMaps: 0,
    textures: 0,
    triangles: instances * 12,
  };
}
