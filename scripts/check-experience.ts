import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

import { dampValue, experienceMotion } from "../src/lib/experience/motion.ts";
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

check(
  experienceSceneRanges[0]?.start === 0 &&
    experienceSceneRanges.at(-1)?.end === 1,
  "Zakresy scen nie obejmują pełnego progresu 0–1.",
);

for (const [index, range] of experienceSceneRanges.entries()) {
  check(
    range.start < range.end,
    `Zakres ${range.id} nie ma dodatniej długości.`,
  );

  const previous = experienceSceneRanges[index - 1];
  if (previous) {
    check(
      previous.end === range.start,
      `Pomiędzy zakresami ${previous.id} i ${range.id} występuje luka lub nakładanie.`,
    );
  }
}

check(
  getExperienceScenePhase(0).id === "hero" &&
    getExperienceScenePhase(0.15).id === "chaos" &&
    getExperienceScenePhase(0.3).id === "diagnosis" &&
    getExperienceScenePhase(0.45).id === "transformation" &&
    getExperienceScenePhase(0.65).id === "services" &&
    getExperienceScenePhase(0.82).id === "conversion",
  "Granice narracji nie mapują się na oczekiwane sceny.",
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
  capabilities({ devicePixelRatio: 3, viewportWidth: 390 }),
);
const touchQuality = resolveExperienceQuality(capabilities({ touch: true }));
const reducedQuality = resolveExperienceQuality(
  capabilities({ reducedMotion: true }),
);
const viewportExpectations = [
  { tier: "low", width: 320 },
  { tier: "low", width: 390 },
  { tier: "medium", width: 768 },
  { tier: "medium", width: 1024 },
  { tier: "high", width: 1280 },
  { tier: "high", width: 1440 },
  { tier: "high", width: 1920 },
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
check(mobileQuality.tier === "low", "Mobile nie otrzymuje jakości Low.");
check(
  mobileQuality.maxDpr <= 1.25,
  "Limit DPR dla jakości Low przekracza budżet.",
);
check(
  touchQuality.tier === "low" && touchQuality.pointerStrength === 0,
  "Urządzenie dotykowe nie ogranicza jakości lub reakcji pointera.",
);
check(
  reducedQuality.tier === "low" && reducedQuality.pointerStrength === 0,
  "Reduced motion nie wyłącza reakcji pointera.",
);
for (const expectation of viewportExpectations) {
  const quality = resolveExperienceQuality(
    capabilities({ viewportWidth: expectation.width }),
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

const canvasSource = source("src/components/experience/experience-canvas.tsx");
const rendererSource = source(
  "src/components/experience/experience-renderer.tsx",
);
const performanceSource = source(
  "src/components/experience/performance-controller.tsx",
);
const rootLayoutSource = source("src/app/layout.tsx");
const labSource = source("src/app/experience-lab/page.tsx");
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
    performanceSource.includes("onContextLost"),
  "Renderer nie obsługuje utraty kontekstu WebGL lub nie sprząta listenera.",
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
  "--experience-depth",
  "--layer-experience-background",
  "--layer-experience-canvas",
  "--layer-experience-content",
] as const;

for (const token of requiredTokens) {
  check(globalsSource.includes(`${token}:`), `Brakuje tokenu ${token}.`);
}

const experienceFiles = readdirSync(experienceRoot)
  .filter((file) => file.endsWith(".tsx"))
  .map((file) => source(`src/components/experience/${file}`));
const experienceSources = experienceFiles.join("\n");
const customRafCount =
  experienceSources.match(/requestAnimationFrame\(/g)?.length ?? 0;

check(
  customRafCount === 1,
  `Warstwa experience powinna mieć tylko jeden koaleskujący RAF scrolla; wykryto ${customRafCount}.`,
);
check(
  !experienceSources.includes("@react-three/drei") &&
    !experienceSources.includes("requestIdleCallback"),
  "Warstwa experience zawiera niezatwierdzoną zależność lub dodatkową pętlę planowania.",
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
    `Sprawdzono: ${experienceSceneRanges.length} zakresów narracji, 4 poziomy jakości, fallback, reduced motion, ${viewportExpectations.length} viewportów i ${experienceFiles.length} komponentów experience.`,
  );
}
