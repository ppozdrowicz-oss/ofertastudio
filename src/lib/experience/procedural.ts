import { type DiagnosticDomainId, diagnosticDomainIds } from "./diagnosis.ts";
import {
  conversionLandscapeConfig,
  type SceneVector3,
} from "./scene-config.ts";

export type SpatialTransform = {
  position: SceneVector3;
  rotation: SceneVector3;
  scale: SceneVector3;
};

export type SpatialModuleTone = "accent" | "base" | "elevated";

export type SpatialModuleData = {
  chaos: SpatialTransform;
  depth: number;
  diagnosticDomain: DiagnosticDomainId;
  id: string;
  importance: number;
  structure: SpatialTransform;
  tone: SpatialModuleTone;
  transitionOffset: number;
  variation: number;
};

export type LandscapePlatformData = {
  band: "background" | "foreground" | "middle";
  id: string;
  transform: SpatialTransform;
};

export type SignalConnectionData = {
  chaosFrom: SceneVector3;
  chaosTo: SceneVector3;
  delay: number;
  from: SceneVector3;
  id: string;
  phase: number;
  to: SceneVector3;
};

export type SpatialGenerationOptions = {
  columns: number;
  fieldCount: number;
  landscapeDepth: number;
  moduleCount: number;
  seed?: number;
  signalCount: number;
};

export function createSeededRandom(seed: number): () => number {
  let state = seed >>> 0;

  return () => {
    state += 0x6d2b79f5;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4_294_967_296;
  };
}

function moduleTop(transform: SpatialTransform): SceneVector3 {
  return [
    transform.position[0],
    transform.position[1] + transform.scale[1] / 2 + 0.1,
    transform.position[2],
  ];
}

export function createSpatialModules({
  columns,
  landscapeDepth,
  moduleCount,
  seed = conversionLandscapeConfig.seed,
}: Pick<
  SpatialGenerationOptions,
  "columns" | "landscapeDepth" | "moduleCount" | "seed"
>): readonly SpatialModuleData[] {
  const random = createSeededRandom(seed);
  const rows = Math.ceil(moduleCount / columns);

  return Array.from({ length: moduleCount }, (_, index) => {
    const row = Math.floor(index / columns);
    const column = index % columns;
    const depth = row / Math.max(1, rows - 1);
    const importance = random();
    const variation = random();
    const structuredHeight =
      0.3 + (index % 4) * 0.13 + importance * 0.38 + depth * 0.16;
    const structuredWidth = 0.62 + (index % 3) * 0.1;
    const structuredDepth = 0.66 + ((index + 2) % 4) * 0.08;
    const centeredColumn = column - (columns - 1) / 2;
    const structureX =
      centeredColumn * conversionLandscapeConfig.field.widthStep;
    const structureZ =
      conversionLandscapeConfig.field.frontZ - depth * landscapeDepth;
    const chaosAmplitude = 1.25 + (1 - depth) * 0.85;
    const chaosX = structureX + (random() - 0.5) * chaosAmplitude * 2;
    const chaosY =
      conversionLandscapeConfig.field.moduleBaseY +
      structuredHeight / 2 +
      random() * 0.72;
    const chaosZ = structureZ + (random() - 0.5) * 2.4;

    return {
      chaos: {
        position: [chaosX, chaosY, chaosZ],
        rotation: [
          (random() - 0.5) * 0.18,
          (random() - 0.5) * 0.86,
          (random() - 0.5) * 0.2,
        ],
        scale: [
          structuredWidth * (0.76 + random() * 0.48),
          structuredHeight * (0.72 + random() * 0.62),
          structuredDepth * (0.8 + random() * 0.42),
        ],
      },
      depth,
      diagnosticDomain:
        diagnosticDomainIds[index % diagnosticDomainIds.length] ?? "website",
      id: `module-${String(index + 1).padStart(2, "0")}`,
      importance,
      structure: {
        position: [
          structureX,
          conversionLandscapeConfig.field.moduleBaseY + structuredHeight / 2,
          structureZ,
        ],
        rotation: [0, (column % 2 === 0 ? -1 : 1) * 0.025, 0],
        scale: [structuredWidth, structuredHeight, structuredDepth],
      },
      tone:
        index % 17 === 0 ? "accent" : importance > 0.72 ? "elevated" : "base",
      transitionOffset:
        depth * 0.28 + (column / Math.max(1, columns - 1)) * 0.1,
      variation,
    };
  });
}

export function createLandscapePlatforms({
  columns,
  fieldCount,
  landscapeDepth,
}: Pick<
  SpatialGenerationOptions,
  "columns" | "fieldCount" | "landscapeDepth"
>): readonly LandscapePlatformData[] {
  const width = columns * conversionLandscapeConfig.field.widthStep + 2.4;

  return Array.from({ length: fieldCount }, (_, index) => {
    const depth = index / Math.max(1, fieldCount - 1);
    const band =
      depth < 0.34 ? "foreground" : depth < 0.72 ? "middle" : "background";
    const sideBias = index % 2 === 0 ? -1 : 1;
    const segmentWidth = width * (0.64 + ((index + 1) % 3) * 0.11);

    return {
      band,
      id: `field-${String(index + 1).padStart(2, "0")}`,
      transform: {
        position: [
          sideBias * (width - segmentWidth) * 0.22,
          -1.08 - depth * 0.12,
          conversionLandscapeConfig.field.frontZ -
            depth * (landscapeDepth + 2.5),
        ],
        rotation: [0, sideBias * 0.012, 0],
        scale: [
          segmentWidth,
          conversionLandscapeConfig.field.levelHeight + (index % 2) * 0.035,
          1.12 + (index % 3) * 0.18,
        ],
      },
    };
  });
}

export function createSignalConnections(
  modules: readonly SpatialModuleData[],
  columns: number,
  signalCount: number,
  seed = conversionLandscapeConfig.seed + 73,
): readonly SignalConnectionData[] {
  const random = createSeededRandom(seed);
  const candidates: Array<readonly [number, number]> = [];

  modules.forEach((_, index) => {
    const nextColumn = index + 1;
    const nextRow = index + columns;

    if (nextColumn < modules.length && nextColumn % columns !== 0) {
      candidates.push([index, nextColumn]);
    }

    if (nextRow < modules.length) {
      candidates.push([index, nextRow]);
    }
  });

  const count = Math.min(signalCount, candidates.length);

  return Array.from({ length: count }, (_, index) => {
    const candidateIndex = Math.floor(
      (index / Math.max(1, count)) * candidates.length,
    );
    const candidate = candidates[candidateIndex];
    const fromModule = candidate ? modules[candidate[0]] : undefined;
    const toModule = candidate ? modules[candidate[1]] : undefined;

    if (!fromModule || !toModule) {
      throw new Error("Nie można utworzyć relacji pomiędzy modułami sceny.");
    }

    const chaosFrom = moduleTop(fromModule.chaos);
    const chaosTarget = moduleTop(toModule.chaos);
    const brokenLength = 0.24 + random() * 0.28;

    return {
      chaosFrom,
      chaosTo: [
        chaosFrom[0] + (chaosTarget[0] - chaosFrom[0]) * brokenLength,
        chaosFrom[1] +
          (chaosTarget[1] - chaosFrom[1]) * brokenLength +
          (random() - 0.5) * 0.5,
        chaosFrom[2] + (chaosTarget[2] - chaosFrom[2]) * brokenLength,
      ],
      delay: random() * 0.22,
      from: moduleTop(fromModule.structure),
      id: `signal-${String(index + 1).padStart(2, "0")}`,
      phase: random(),
      to: moduleTop(toModule.structure),
    };
  });
}
