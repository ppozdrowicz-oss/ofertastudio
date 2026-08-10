import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

import { PerspectiveCamera, Vector3 } from "three";

import {
  conversionCameraPaths,
  heroCameraPaths,
  sampleConversionCameraPath,
  sampleExperienceCameraPath,
} from "../src/lib/experience/camera-path.ts";
import { dampValue, experienceMotion } from "../src/lib/experience/motion.ts";
import {
  createSignalConnections,
  createSpatialModules,
  type SpatialModuleData,
} from "../src/lib/experience/procedural.ts";
import {
  clampExperienceProgress,
  experienceSceneRanges,
  getExperienceScenePhase,
  normalizeScrollProgress,
} from "../src/lib/experience/progress.ts";
import {
  type ExperienceCapabilities,
  resolveExperienceQuality,
} from "../src/lib/experience/quality.ts";
import {
  conversionLandscapeBudgets,
  getConversionLandscapeInventory,
} from "../src/lib/experience/render-budget.ts";
import { conversionLandscapeConfig } from "../src/lib/experience/scene-config.ts";
import {
  conversionSceneRanges,
  createExperienceSceneFrame,
  getConversionSceneFrame,
  getHeroScenePhase,
  getStaggeredStructureProgress,
  heroSceneRanges,
} from "../src/lib/experience/scene-timeline.ts";

const projectRoot = process.cwd();
const experienceRoot = join(projectRoot, "src", "components", "experience");
const errors: string[] = [];

function check(condition: boolean, message: string): void {
  if (!condition) {
    errors.push(message);
  }
}

function source(relativePath: string): string {
  return readFileSync(join(projectRoot, relativePath), "utf8");
}

function collectFiles(directory: string): readonly string[] {
  return readdirSync(directory, { withFileTypes: true })
    .flatMap((entry) => {
      const entryPath = join(directory, entry.name);
      return entry.isDirectory() ? collectFiles(entryPath) : [entryPath];
    })
    .filter((file) => file.endsWith(".ts") || file.endsWith(".tsx"));
}

function capabilities(
  overrides: Partial<ExperienceCapabilities> = {},
): ExperienceCapabilities {
  return {
    devicePixelRatio: 1,
    reducedMotion: false,
    touch: false,
    viewportHeight: 900,
    viewportWidth: 1440,
    webgl: true,
    ...overrides,
  };
}

function checkContinuousRanges(
  ranges: readonly { end: number; id: string; start: number }[],
  label: string,
): void {
  check(
    ranges[0]?.start === 0 && ranges.at(-1)?.end === 1,
    `${label}: zakresy nie obejmują pełnego progresu 0–1.`,
  );

  ranges.forEach((range, index) => {
    check(range.start < range.end, `${label}: ${range.id} nie ma długości.`);
    const previous = ranges[index - 1];
    if (previous) {
      check(
        previous.end === range.start,
        `${label}: pomiędzy ${previous.id} i ${range.id} występuje luka lub nakładanie.`,
      );
    }
  });
}

checkContinuousRanges(experienceSceneRanges, "Narracja globalna");
checkContinuousRanges(conversionSceneRanges, "Chaos → Structure");
checkContinuousRanges(heroSceneRanges, "Hero cinematic entry");

check(
  getExperienceScenePhase(0).id === "hero" &&
    getExperienceScenePhase(0.15).id === "chaos" &&
    getExperienceScenePhase(0.3).id === "diagnosis" &&
    getExperienceScenePhase(0.45).id === "transformation" &&
    getExperienceScenePhase(0.65).id === "services" &&
    getExperienceScenePhase(0.82).id === "conversion",
  "Granice globalnej narracji nie mapują się na oczekiwane sceny.",
);
check(
  getConversionSceneFrame(0).state === "establishing" &&
    getConversionSceneFrame(0.18).state === "chaos" &&
    getConversionSceneFrame(0.42).state === "ordering" &&
    getConversionSceneFrame(0.78).state === "structure",
  "Granice sekwencji Chaos → Structure nie mapują się na oczekiwane stany.",
);
check(
  getConversionSceneFrame(0.35).structureProgress < 0.05 &&
    getConversionSceneFrame(0.65).structureProgress > 0.4 &&
    getConversionSceneFrame(1).structureProgress === 1,
  "Semantyczna transformacja nie zachowuje kontrolowanego rytmu.",
);
check(
  getHeroScenePhase(0).state === "arrival" &&
    getHeroScenePhase(0.2).state === "recognition" &&
    getHeroScenePhase(0.42).state === "approach" &&
    getHeroScenePhase(0.66).state === "opening" &&
    getHeroScenePhase(0.86).state === "handoff",
  "Granice cinematic entry nie mapują się na oczekiwane stany Hero.",
);
check(
  createExperienceSceneFrame("hero", 0).structureProgress >= 0.85 &&
    createExperienceSceneFrame("hero", 1).structureProgress === 1,
  "Hero zużywa pełny chaos zamiast rozpoczynać od uporządkowanego świata.",
);
check(
  clampExperienceProgress(-1) === 0 && clampExperienceProgress(2) === 1,
  "Progres sceny nie jest ograniczany do przedziału 0–1.",
);
check(
  normalizeScrollProgress({
    elementHeight: 3000,
    elementTop: 100,
    scrollY: 1100,
    viewportHeight: 1000,
  }) === 0.5,
  "Normalizacja scrolla nie uwzględnia wysokości viewportu.",
);

const fallbackQuality = resolveExperienceQuality(
  capabilities({ webgl: false }),
);
const highQuality = resolveExperienceQuality(capabilities());
const mediumQuality = resolveExperienceQuality(
  capabilities({ viewportHeight: 700, viewportWidth: 1024 }),
);
const mobileQuality = resolveExperienceQuality(
  capabilities({ devicePixelRatio: 3, touch: true, viewportWidth: 390 }),
);
const reducedQuality = resolveExperienceQuality(
  capabilities({ reducedMotion: true }),
);
const viewportExpectations = [
  { height: 720, tier: "low", width: 320 },
  { height: 800, tier: "low", width: 360 },
  { height: 844, tier: "low", width: 390 },
  { height: 1024, tier: "medium", width: 768 },
  { height: 768, tier: "medium", width: 1024 },
  { height: 800, tier: "high", width: 1280 },
  { height: 768, tier: "high", width: 1366 },
  { height: 900, tier: "high", width: 1440 },
  { height: 1080, tier: "high", width: 1920 },
] as const;

check(
  fallbackQuality.tier === "fallback",
  "Brak WebGL nie uruchamia fallbacku.",
);
check(highQuality.tier === "high", "Duży viewport nie otrzymuje jakości High.");
check(
  mediumQuality.tier === "medium",
  "Średni viewport nie otrzymuje jakości Medium.",
);
check(
  mobileQuality.tier === "low" && mobileQuality.maxDpr <= 1.25,
  "Mobile nie otrzymuje jakości Low lub przekracza limit DPR.",
);
check(
  mobileQuality.composition === "compact" &&
    mobileQuality.pointerStrength === 0,
  "Mobile nie korzysta z compact framing albo nie wyłącza pointera.",
);
check(
  reducedQuality.tier === "low" && reducedQuality.pointerStrength === 0,
  "Reduced motion nie wyłącza reakcji pointera.",
);

for (const expectation of viewportExpectations) {
  const quality = resolveExperienceQuality(
    capabilities({
      viewportHeight: expectation.height,
      viewportWidth: expectation.width,
    }),
  );
  check(
    quality.tier === expectation.tier,
    `Viewport ${expectation.width} px otrzymał tier ${quality.tier} zamiast ${expectation.tier}.`,
  );
}

check(
  dampValue(0, 1, experienceMotion.cameraDamping, 1) > 0 &&
    dampValue(0, 1, experienceMotion.cameraDamping, 1) < 1,
  "Damping kamery przeskakuje do celu lub go przekracza.",
);
check(
  getConversionSceneFrame(experienceMotion.reducedMotionProgress.conversion)
    .state === "structure" &&
    getHeroScenePhase(experienceMotion.reducedMotionProgress.hero).state ===
      "opening",
  "Reduced motion nie wskazuje stabilnego, uporządkowanego kadru.",
);

for (const [composition, keyframes] of Object.entries(conversionCameraPaths)) {
  check(
    keyframes[0]?.at === 0 && keyframes.at(-1)?.at === 1,
    `Ścieżka kamery ${composition} nie obejmuje progresu 0–1.`,
  );
  check(
    keyframes.map((keyframe) => keyframe.shot).join(",") ===
      "establishing,approach,passage,reveal",
    `Ścieżka ${composition} nie realizuje czterech wymaganych ujęć.`,
  );
  keyframes.forEach((keyframe, index) => {
    const previous = keyframes[index - 1];
    if (previous) {
      check(
        previous.at < keyframe.at,
        `Klatki ścieżki ${composition} nie są uporządkowane.`,
      );
    }
    check(
      Math.abs(keyframe.roll) <= 0.02,
      `Roll kamery ${composition}/${keyframe.shot} przekracza bezpieczny limit.`,
    );
  });
}

for (const [composition, keyframes] of Object.entries(heroCameraPaths)) {
  check(
    keyframes[0]?.at === 0 && keyframes.at(-1)?.at === 1,
    `Ścieżka Hero ${composition} nie obejmuje progresu 0–1.`,
  );
  check(
    keyframes.map((keyframe) => keyframe.shot).join(",") ===
      "arrival,recognition,approach,opening,handoff",
    `Ścieżka Hero ${composition} nie realizuje pięciu stanów cinematic entry.`,
  );
  keyframes.forEach((keyframe, index) => {
    const previous = keyframes[index - 1];
    if (previous) {
      check(
        previous.at < keyframe.at,
        `Klatki Hero ${composition} nie są uporządkowane.`,
      );
    }
    check(
      Math.abs(keyframe.roll) <= 0.012,
      `Roll kamery Hero ${composition}/${keyframe.shot} przekracza bezpieczny limit.`,
    );
  });
}

const deterministicFirst = createSpatialModules({
  columns: highQuality.columns,
  landscapeDepth: highQuality.landscapeDepth,
  moduleCount: highQuality.moduleCount,
});
const deterministicSecond = createSpatialModules({
  columns: highQuality.columns,
  landscapeDepth: highQuality.landscapeDepth,
  moduleCount: highQuality.moduleCount,
});
check(
  JSON.stringify(deterministicFirst) === JSON.stringify(deterministicSecond),
  "Proceduralna scena nie jest deterministyczna dla tego samego seeda.",
);
check(
  new Set(deterministicFirst.map((module) => module.id)).size ===
    deterministicFirst.length,
  "Proceduralne moduły nie mają unikalnych identyfikatorów.",
);
check(
  createSignalConnections(
    deterministicFirst,
    highQuality.columns,
    highQuality.signalCount,
  ).length === highQuality.signalCount,
  "Signal Field nie respektuje budżetu aktywnego tieru.",
);

for (const quality of [highQuality, mediumQuality, mobileQuality]) {
  const inventory = getConversionLandscapeInventory(quality);
  const budget = conversionLandscapeBudgets[quality.tier];
  check(
    inventory.drawCalls <= budget.maxDrawCalls &&
      inventory.triangles <= budget.maxTriangles &&
      inventory.materials <= budget.maxMaterials &&
      inventory.textures <= budget.maxTextures,
    `Tier ${quality.tier} przekracza zadeklarowany budżet renderowania.`,
  );
  check(
    inventory.shadowMaps === 0 && inventory.textures === 0,
    `Tier ${quality.tier} dodaje niezatwierdzone tekstury lub shadow maps.`,
  );
}

type VisualAuditResult = {
  anchorX: number;
  anchorY: number;
  progress: number;
  visibleRatio: number;
  width: number;
};

function modulePosition(
  module: SpatialModuleData,
  structureProgress: number,
): Vector3 {
  const progress = getStaggeredStructureProgress(
    structureProgress,
    module.transitionOffset,
  );
  return new Vector3(
    module.chaos.position[0] +
      (module.structure.position[0] - module.chaos.position[0]) * progress,
    module.chaos.position[1] +
      (module.structure.position[1] - module.chaos.position[1]) * progress,
    module.chaos.position[2] +
      (module.structure.position[2] - module.chaos.position[2]) * progress,
  );
}

function auditComposition(
  width: number,
  height: number,
  progress: number,
): VisualAuditResult {
  const quality = resolveExperienceQuality(
    capabilities({ viewportHeight: height, viewportWidth: width }),
  );
  const modules = createSpatialModules({
    columns: quality.columns,
    landscapeDepth: quality.landscapeDepth,
    moduleCount: quality.moduleCount,
  });
  const frame = getConversionSceneFrame(progress);
  const sample = sampleConversionCameraPath(progress, quality.composition);
  const camera = new PerspectiveCamera(sample.fov, width / height, 0.1, 70);
  camera.position.set(...sample.position);
  camera.lookAt(new Vector3(...sample.target));
  camera.rotation.z += sample.roll;
  camera.updateProjectionMatrix();
  camera.updateMatrixWorld(true);

  const visibleModules = modules.filter((module) => {
    const projected = modulePosition(module, frame.structureProgress).project(
      camera,
    );
    return (
      Math.abs(projected.x) <= 1.12 &&
      Math.abs(projected.y) <= 1.12 &&
      projected.z >= -1 &&
      projected.z <= 1
    );
  }).length;
  const focusProgress = frame.focusProgress;
  const focusPosition = new Vector3(
    conversionLandscapeConfig.focus.chaosPosition[0] +
      (conversionLandscapeConfig.focus.structurePosition[0] -
        conversionLandscapeConfig.focus.chaosPosition[0]) *
        focusProgress,
    conversionLandscapeConfig.focus.chaosPosition[1] +
      (conversionLandscapeConfig.focus.structurePosition[1] -
        conversionLandscapeConfig.focus.chaosPosition[1]) *
        focusProgress,
    conversionLandscapeConfig.focus.chaosPosition[2] +
      (conversionLandscapeConfig.focus.structurePosition[2] -
        conversionLandscapeConfig.focus.chaosPosition[2]) *
        focusProgress,
  ).project(camera);

  return {
    anchorX: focusPosition.x,
    anchorY: focusPosition.y,
    progress,
    visibleRatio: visibleModules / Math.max(1, modules.length),
    width,
  };
}

function auditHeroComposition(
  width: number,
  height: number,
  progress: number,
): VisualAuditResult {
  const quality = resolveExperienceQuality(
    capabilities({ viewportHeight: height, viewportWidth: width }),
  );
  const modules = createSpatialModules({
    columns: quality.columns,
    landscapeDepth: quality.landscapeDepth,
    moduleCount: quality.moduleCount,
  });
  const frame = createExperienceSceneFrame("hero", progress);
  const sample = sampleExperienceCameraPath(
    progress,
    quality.composition,
    "hero",
  );
  const camera = new PerspectiveCamera(sample.fov, width / height, 0.1, 70);
  camera.position.set(...sample.position);
  camera.lookAt(new Vector3(...sample.target));
  camera.rotation.z += sample.roll;
  camera.updateProjectionMatrix();
  camera.updateMatrixWorld(true);

  const visibleModules = modules.filter((module) => {
    const projected = modulePosition(module, frame.structureProgress).project(
      camera,
    );
    return (
      Math.abs(projected.x) <= 1.12 &&
      Math.abs(projected.y) <= 1.12 &&
      projected.z >= -1 &&
      projected.z <= 1
    );
  }).length;
  const focusProgress = frame.focusProgress;
  const focusPosition = new Vector3(
    conversionLandscapeConfig.focus.chaosPosition[0] +
      (conversionLandscapeConfig.focus.structurePosition[0] -
        conversionLandscapeConfig.focus.chaosPosition[0]) *
        focusProgress,
    conversionLandscapeConfig.focus.chaosPosition[1] +
      (conversionLandscapeConfig.focus.structurePosition[1] -
        conversionLandscapeConfig.focus.chaosPosition[1]) *
        focusProgress,
    conversionLandscapeConfig.focus.chaosPosition[2] +
      (conversionLandscapeConfig.focus.structurePosition[2] -
        conversionLandscapeConfig.focus.chaosPosition[2]) *
        focusProgress,
  ).project(camera);

  return {
    anchorX: focusPosition.x,
    anchorY: focusPosition.y,
    progress,
    visibleRatio: visibleModules / Math.max(1, modules.length),
    width,
  };
}

const auditProgressValues = [0, 0.35, 0.65, 1] as const;
const visualAuditResults = viewportExpectations.flatMap((viewport) =>
  auditProgressValues.map((progress) =>
    auditComposition(viewport.width, viewport.height, progress),
  ),
);
const heroAuditProgressValues = [0, 0.35, 0.5, 0.7, 1] as const;
const heroVisualAuditResults = viewportExpectations.flatMap((viewport) =>
  heroAuditProgressValues.map((progress) =>
    auditHeroComposition(viewport.width, viewport.height, progress),
  ),
);

for (const result of visualAuditResults) {
  check(
    Math.abs(result.anchorX) <= 1.05 && Math.abs(result.anchorY) <= 1.05,
    `Kadr ${result.width}px @ ${result.progress.toFixed(2)} gubi focus object.`,
  );
  check(
    result.visibleRatio >= 0.18,
    `Kadr ${result.width}px @ ${result.progress.toFixed(2)} pokazuje zbyt mało modułów (${Math.round(result.visibleRatio * 100)}%).`,
  );
}

for (const result of heroVisualAuditResults) {
  const compact = result.width < 900;
  check(
    Math.abs(result.anchorX) <= 1.05 && Math.abs(result.anchorY) <= 1.05,
    `Hero ${result.width}px @ ${result.progress.toFixed(2)} gubi focus object.`,
  );
  check(
    result.visibleRatio >= 0.18,
    `Hero ${result.width}px @ ${result.progress.toFixed(2)} pokazuje zbyt mało modułów (${Math.round(result.visibleRatio * 100)}%).`,
  );
  check(
    compact ? result.anchorY <= 0 : result.anchorX >= 0.2,
    `Hero ${result.width}px @ ${result.progress.toFixed(2)} nie zachowuje bezpiecznej przestrzeni dla copy.`,
  );
}

const canvasSource = source("src/components/experience/experience-canvas.tsx");
const rendererSource = source(
  "src/components/experience/experience-renderer.tsx",
);
const performanceSource = source(
  "src/components/experience/performance-controller.tsx",
);
const cameraSource = source("src/components/experience/camera-rig.tsx");
const rootLayoutSource = source("src/app/layout.tsx");
const homePageSource = source("src/app/page.tsx");
const heroContentSource = source("src/components/home/hero-content.tsx");
const labSource = source("src/app/experience-lab/page.tsx");
const labControlsSource = source(
  "src/app/experience-lab/_components/conversion-landscape-demo.tsx",
);
const designSystemSource = source(
  "src/app/design-system/_components/design-system-showcase.tsx",
);
const navigationSource = source("src/config/navigation.ts");
const globalsSource = source("src/styles/globals.css");

check(
  canvasSource.trimStart().startsWith('"use client"') &&
    canvasSource.includes("dynamic(") &&
    canvasSource.includes("ssr: false"),
  "ExperienceCanvas nie izoluje i nie lazy-loaduje renderera WebGL.",
);
check(
  canvasSource.includes("--experience-progress") &&
    canvasSource.includes('sequence = "conversion"') &&
    canvasSource.includes('layout = "panel"'),
  "ExperienceCanvas nie udostępnia wspólnego semantic progress lub wariantu Hero.",
);
check(
  canvasSource.includes("<WebGLFallback") &&
    canvasSource.includes("forceFallback") &&
    canvasSource.includes('data-experience-state="disabled"') &&
    canvasSource.includes('aria-hidden="true"') &&
    canvasSource.includes("IntersectionObserver"),
  "ExperienceCanvas nie ma pełnego kontraktu fallbacku, dostępności lub lazy mountu.",
);
check(
  canvasSource.includes("prefers-reduced-motion: reduce") &&
    rendererSource.includes('reducedMotion ? "demand" : "always"'),
  "Reduced motion nie ogranicza pętli renderowania.",
);
check(
  canvasSource.includes('removeEventListener("resize"') &&
    canvasSource.includes('removeEventListener("scroll"') &&
    canvasSource.includes("resizeObserver.disconnect()") &&
    canvasSource.includes("observer.disconnect()"),
  "ExperienceCanvas nie sprząta obserwatorów lub listenerów.",
);
check(
  performanceSource.includes('removeEventListener("webglcontextlost"') &&
    performanceSource.includes("onContextLost") &&
    !performanceSource.match(/useFrame\([\s\S]{0,1800}?\},\s*[1-9]\d*\s*\);/),
  "Renderer nie sprząta listenera utraty kontekstu albo diagnostyka przejmuje automatyczny render dodatnim priorytetem useFrame.",
);
check(
  rendererSource.includes('setAttribute("aria-hidden", "true")') &&
    rendererSource.includes('style.pointerEvents = "none"') &&
    rendererSource.includes('setAttribute("role", "presentation")'),
  "Właściwy element canvas nie ma dekoracyjnej semantyki lub wyłączonych pointer events.",
);
check(
  cameraSource.includes("updateExperienceCameraPathSample") &&
    !cameraSource.includes("CameraKeyframe"),
  "CameraRig nie korzysta z centralnej trajektorii.",
);
check(
  homePageSource.includes("<HomeHero") &&
    homePageSource.includes("<HomeHandoff") &&
    homePageSource.includes("showGlobalCta={false}") &&
    heroContentSource.includes('headingLevel === 1 ? "h1" : "h2"') &&
    heroContentSource.includes("getCta(homeHeroContent.primaryCtaId)"),
  "Homepage nie zachowuje serwerowego Hero, pojedynczego h1 lub centralnych CTA.",
);
check(
  !rootLayoutSource.includes("ExperienceCanvas") &&
    !rootLayoutSource.trimStart().startsWith('"use client"'),
  "Warstwa WebGL przeniknęła do root layoutu albo zmieniła go w Client Component.",
);
check(
  labSource.includes("index: false") &&
    labSource.includes("follow: false") &&
    labSource.includes("showGlobalCta={false}") &&
    labSource.includes("forceFallback") &&
    labSource.includes("enabled={false}"),
  "Experience lab nie ma noindex lub kontrolowanego wariantu fallback.",
);
check(
  labControlsSource.includes('mode="manual"') &&
    labControlsSource.includes("data-progress-preset") &&
    labControlsSource.includes("motionPreference") &&
    labControlsSource.includes("forceFallback") &&
    labControlsSource.includes('sequence="hero"') &&
    labControlsSource.includes("data-hero-progress-preset"),
  "Experience lab nie ma deterministycznego sterowania stanem sceny.",
);
check(
  designSystemSource.includes('href="/experience-lab"'),
  "Design system nie wskazuje technicznego laboratorium experience.",
);
check(
  !navigationSource.includes("experience-lab"),
  "Experience lab nie może trafiać do globalnej nawigacji.",
);

const requiredTokens = [
  "--experience-background",
  "--experience-fog",
  "--experience-light",
  "--experience-grid",
  "--experience-grid-minor",
  "--experience-depth",
  "--experience-surface-elevated",
  "--experience-signal",
  "--experience-focus",
  "--layer-experience-background",
  "--layer-experience-canvas",
  "--layer-experience-content",
  "--home-hero-track-height",
] as const;

for (const token of requiredTokens) {
  check(globalsSource.includes(`${token}:`), `Brakuje tokenu ${token}.`);
}

const experienceFiles = collectFiles(experienceRoot);
const experienceSources = experienceFiles
  .map((file) => readFileSync(file, "utf8"))
  .join("\n");
const customRafCount =
  experienceSources.match(/requestAnimationFrame\(/g)?.length ?? 0;

check(
  customRafCount === 1,
  `Warstwa experience powinna mieć tylko jeden koaleskujący RAF scrolla; wykryto ${customRafCount}.`,
);
check(
  !experienceSources.includes("Math.random(") &&
    !experienceSources.includes("@react-three/drei") &&
    !experienceSources.includes("requestIdleCallback"),
  "Warstwa experience zawiera niedeterministyczny random, niezatwierdzoną zależność lub dodatkową pętlę planowania.",
);

if (errors.length > 0) {
  console.error(`Kontrola experience nie powiodła się (${errors.length}):`);
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exitCode = 1;
} else {
  console.log("Kontrola experience zakończona pomyślnie.");
  console.log(
    `Sprawdzono: ${experienceSceneRanges.length} zakresów globalnych, ${conversionSceneRanges.length} stanów Conversion Landscape, ${heroSceneRanges.length} stanów Hero, 4 poziomy jakości, ${visualAuditResults.length + heroVisualAuditResults.length} kadrów i ${experienceFiles.length} modułów experience.`,
  );
  for (const result of visualAuditResults) {
    console.log(
      `- ${result.width}px @ ${result.progress.toFixed(2)}: widoczne moduły ${Math.round(result.visibleRatio * 100)}%, focus (${result.anchorX.toFixed(2)}, ${result.anchorY.toFixed(2)}).`,
    );
  }
  for (const result of heroVisualAuditResults) {
    console.log(
      `- Hero ${result.width}px @ ${result.progress.toFixed(2)}: widoczne moduły ${Math.round(result.visibleRatio * 100)}%, focus (${result.anchorX.toFixed(2)}, ${result.anchorY.toFixed(2)}).`,
    );
  }
}
