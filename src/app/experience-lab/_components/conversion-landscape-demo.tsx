"use client";

import { useState } from "react";

import { ExperienceCanvas } from "@/components/experience/experience-canvas";
import { HeroContent } from "@/components/home/hero-content";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  getConversionSceneFrame,
  getHeroScenePhase,
} from "@/lib/experience/scene-timeline";

const progressPresets = [0, 0.25, 0.5, 0.75, 1] as const;

const stateLabels = {
  chaos: "Kontrolowany chaos",
  establishing: "Kadr otwierający",
  ordering: "Porządkowanie",
  structure: "Czytelny system",
} as const;

const heroStateLabels = {
  approach: "Approach",
  arrival: "Arrival",
  handoff: "Handoff",
  opening: "Opening",
  recognition: "Recognition",
} as const;

export function ConversionLandscapeDemo() {
  const [progress, setProgress] = useState(0.35);
  const [forceFallback, setForceFallback] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const frame = getConversionSceneFrame(progress);

  return (
    <div data-conversion-landscape-demo="true">
      <div className="mb-6 grid gap-5 rounded-[var(--radius-card)] border border-border bg-surface p-[var(--space-card-padding)] lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="primary">{stateLabels[frame.state]}</Badge>
            <span className="text-caption text-muted-foreground">
              Structure {Math.round(frame.structureProgress * 100)}% · Signals{" "}
              {Math.round(frame.signalProgress * 100)}%
            </span>
          </div>
          <label
            className="mt-5 block text-label font-semibold text-foreground"
            htmlFor="landscape-progress"
          >
            Progres sekwencji: {progress.toFixed(2)}
          </label>
          <input
            aria-describedby="landscape-progress-description"
            className="mt-2 h-11 w-full cursor-pointer accent-primary"
            id="landscape-progress"
            max="1"
            min="0"
            onChange={(event) => setProgress(Number(event.currentTarget.value))}
            step="0.01"
            type="range"
            value={progress}
          />
          <p
            className="mt-2 text-body-sm text-muted-foreground"
            id="landscape-progress-description"
          >
            Sterowanie jest dostępne wyłącznie w laboratorium i ustawia
            deterministyczny kadr do audytu.
          </p>
          <div
            className="mt-4 flex flex-wrap gap-2"
            role="group"
            aria-label="Presety progresu"
          >
            {progressPresets.map((preset) => (
              <Button
                aria-pressed={progress === preset}
                data-progress-preset={preset.toFixed(2)}
                key={preset}
                onClick={() => setProgress(preset)}
                size="small"
                variant={progress === preset ? "secondary" : "outline"}
              >
                {preset.toFixed(2)}
              </Button>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-2 lg:max-w-64 lg:justify-end">
          <Button
            aria-pressed={reducedMotion}
            onClick={() => setReducedMotion((current) => !current)}
            size="small"
            variant={reducedMotion ? "secondary" : "outline"}
          >
            Reduced motion
          </Button>
          <Button
            aria-pressed={forceFallback}
            onClick={() => setForceFallback((current) => !current)}
            size="small"
            variant={forceFallback ? "secondary" : "outline"}
          >
            CSS fallback
          </Button>
        </div>
      </div>

      <ExperienceCanvas
        forceFallback={forceFallback}
        mode="manual"
        motionPreference={reducedMotion ? "reduced" : "auto"}
        progress={progress}
        showDiagnostics
      />
    </div>
  );
}

export function HeroExperienceDemo() {
  const [progress, setProgress] = useState(0);
  const [forceFallback, setForceFallback] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const phase = getHeroScenePhase(progress);

  return (
    <div data-hero-experience-demo="true">
      <div className="mb-6 grid gap-5 rounded-[var(--radius-card)] border border-border bg-surface p-[var(--space-card-padding)] lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="accent">{heroStateLabels[phase.state]}</Badge>
            <span className="text-caption text-muted-foreground">
              Semantic progress {Math.round(phase.progress * 100)}% · phase{" "}
              {Math.round(phase.stateProgress * 100)}%
            </span>
          </div>
          <label
            className="mt-5 block text-label font-semibold text-foreground"
            htmlFor="hero-progress"
          >
            Progres Hero: {progress.toFixed(2)}
          </label>
          <input
            aria-describedby="hero-progress-description"
            className="mt-2 h-11 w-full cursor-pointer accent-primary"
            id="hero-progress"
            max="1"
            min="0"
            onChange={(event) => setProgress(Number(event.currentTarget.value))}
            step="0.01"
            type="range"
            value={progress}
          />
          <p
            className="mt-2 text-body-sm text-muted-foreground"
            id="hero-progress-description"
          >
            Ten sam semantic progress steruje kamerą, landscape i ruchem treści
            DOM. Presety zapewniają deterministyczne kadry audytowe.
          </p>
          <div
            aria-label="Presety progresu finalnego Hero"
            className="mt-4 flex flex-wrap gap-2"
            role="group"
          >
            {progressPresets.map((preset) => (
              <Button
                aria-pressed={progress === preset}
                data-hero-progress-preset={preset.toFixed(2)}
                key={preset}
                onClick={() => setProgress(preset)}
                size="small"
                variant={progress === preset ? "secondary" : "outline"}
              >
                {preset.toFixed(2)}
              </Button>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-2 lg:max-w-64 lg:justify-end">
          <Button
            aria-pressed={reducedMotion}
            onClick={() => setReducedMotion((current) => !current)}
            size="small"
            variant={reducedMotion ? "secondary" : "outline"}
          >
            Reduced motion
          </Button>
          <Button
            aria-pressed={forceFallback}
            onClick={() => setForceFallback((current) => !current)}
            size="small"
            variant={forceFallback ? "secondary" : "outline"}
          >
            CSS fallback
          </Button>
        </div>
      </div>

      <ExperienceCanvas
        forceFallback={forceFallback}
        layout="hero"
        mode="manual"
        motionPreference={reducedMotion ? "reduced" : "auto"}
        progress={progress}
        sequence="hero"
        showDiagnostics
      >
        <HeroContent headingLevel={2} showScrollCue={false} />
      </ExperienceCanvas>
    </div>
  );
}
