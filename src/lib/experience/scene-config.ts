export type SceneVector3 = readonly [number, number, number];

export const conversionLandscapeConfig = {
  field: {
    frontZ: 4,
    levelHeight: 0.12,
    moduleBaseY: -0.92,
    widthStep: 1.36,
  },
  focus: {
    chaosPosition: [-2.1, -0.24, -9.4],
    chaosRotation: [0.04, 0.32, -0.08],
    structurePosition: [0, -0.54, -13.2],
    structureRotation: [0, -0.04, 0],
  },
  grid: {
    frontZ: 6,
    sideMargin: 1.5,
  },
  seed: 0x0f3a6d,
} as const satisfies {
  field: {
    frontZ: number;
    levelHeight: number;
    moduleBaseY: number;
    widthStep: number;
  };
  focus: {
    chaosPosition: SceneVector3;
    chaosRotation: SceneVector3;
    structurePosition: SceneVector3;
    structureRotation: SceneVector3;
  };
  grid: {
    frontZ: number;
    sideMargin: number;
  };
  seed: number;
};
