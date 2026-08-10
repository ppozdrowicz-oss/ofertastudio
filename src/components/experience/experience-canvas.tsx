"use client";

import dynamic from "next/dynamic";
import {
  Component,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import type { ExperienceRuntimeMetrics } from "@/components/experience/performance-controller";
import { WebGLFallback } from "@/components/experience/webgl-fallback";
import { cn } from "@/lib/cn";
import type { ExperienceSequence } from "@/lib/experience/experience-sequence";
import {
  experienceMotion,
  type ExperiencePointer,
} from "@/lib/experience/motion";
import {
  clampExperienceProgress,
  normalizeScrollProgress,
} from "@/lib/experience/progress";
import {
  detectWebGLSupport,
  type ExperienceCapabilities,
  type ExperienceQualityTier,
  resolveExperienceQuality,
} from "@/lib/experience/quality";
import { getConversionLandscapeInventory } from "@/lib/experience/render-budget";
import { getHomepageStoryPhase } from "@/lib/experience/scene-timeline";

const LazyExperienceRenderer = dynamic(
  () =>
    import("@/components/experience/experience-renderer").then(
      (module) => module.ExperienceRenderer,
    ),
  { loading: () => null, ssr: false },
);

const initialCapabilities: ExperienceCapabilities = {
  devicePixelRatio: 1,
  reducedMotion: false,
  touch: false,
  viewportHeight: 0,
  viewportWidth: 0,
  webgl: false,
};

type ExperienceBoundaryProps = {
  children: ReactNode;
  onError: () => void;
};

type ExperienceBoundaryState = {
  failed: boolean;
};

class ExperienceBoundary extends Component<
  ExperienceBoundaryProps,
  ExperienceBoundaryState
> {
  override state: ExperienceBoundaryState = { failed: false };

  static getDerivedStateFromError(): ExperienceBoundaryState {
    return { failed: true };
  }

  override componentDidCatch(): void {
    this.props.onError();
  }

  override render() {
    return this.state.failed ? null : this.props.children;
  }
}

const qualityLabels = {
  fallback: "Fallback",
  high: "High",
  low: "Low",
  medium: "Medium",
} as const;

export type ExperienceCanvasProps = {
  children?: ReactNode;
  className?: string;
  enabled?: boolean;
  forceFallback?: boolean;
  layout?: "hero" | "panel" | "story";
  mode?: "manual" | "scroll" | "static";
  motionPreference?: "auto" | "reduced";
  progress?: number;
  sequence?: ExperienceSequence;
  showDiagnostics?: boolean;
};

function writeDomProgress(
  root: HTMLDivElement,
  progress: number,
  sequence: ExperienceSequence,
): void {
  root.style.setProperty("--experience-progress", progress.toFixed(4));

  if (sequence === "homepage") {
    root.dataset.storyState = getHomepageStoryPhase(progress).state;
  } else {
    delete root.dataset.storyState;
  }
}

export function ExperienceCanvas({
  children,
  className,
  enabled = true,
  ...props
}: ExperienceCanvasProps) {
  if (!enabled) {
    return children ? (
      <div
        className={cn("relative", className)}
        data-experience-state="disabled"
      >
        {children}
      </div>
    ) : null;
  }

  return (
    <ExperienceCanvasRuntime className={className} {...props}>
      {children}
    </ExperienceCanvasRuntime>
  );
}

type ExperienceCanvasRuntimeProps = Omit<ExperienceCanvasProps, "enabled">;

function ExperienceCanvasRuntime({
  children,
  className,
  forceFallback = false,
  layout = "panel",
  mode = "scroll",
  motionPreference = "auto",
  progress = 0,
  sequence = "conversion",
  showDiagnostics = false,
}: ExperienceCanvasRuntimeProps) {
  const reducedMotionProgress =
    experienceMotion.reducedMotionProgress[sequence];
  const initialProgress =
    motionPreference === "reduced" || mode === "static"
      ? reducedMotionProgress
      : mode === "manual"
        ? clampExperienceProgress(progress)
        : 0;
  const rootRef = useRef<HTMLDivElement>(null);
  const targetProgressRef = useRef(initialProgress);
  const dampedProgressRef = useRef(initialProgress);
  const pointerRef = useRef<ExperiencePointer>({ x: 0, y: 0 });
  const [capabilities, setCapabilities] = useState(initialCapabilities);
  const [isNearViewport, setIsNearViewport] = useState(false);
  const [rendererReadyTier, setRendererReadyTier] =
    useState<ExperienceQualityTier | null>(null);
  const [runtimeFailed, setRuntimeFailed] = useState(false);
  const [runtimeMetrics, setRuntimeMetrics] =
    useState<ExperienceRuntimeMetrics | null>(null);
  const [diagnosticProgress, setDiagnosticProgress] = useState(
    Math.round(initialProgress * 100),
  );
  const effectiveReducedMotion =
    motionPreference === "reduced" || capabilities.reducedMotion;
  const quality = useMemo(
    () =>
      resolveExperienceQuality({
        ...capabilities,
        reducedMotion: effectiveReducedMotion,
        webgl: capabilities.webgl && !forceFallback && !runtimeFailed,
      }),
    [capabilities, effectiveReducedMotion, forceFallback, runtimeFailed],
  );
  const renderInventory = useMemo(
    () => getConversionLandscapeInventory(quality),
    [quality],
  );
  const displayedProgress =
    mode === "manual"
      ? Math.round(clampExperienceProgress(progress) * 100)
      : diagnosticProgress;

  useEffect(() => {
    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const coarsePointerQuery = window.matchMedia("(pointer: coarse)");
    const webgl = forceFallback ? false : detectWebGLSupport();

    function updateCapabilities(): void {
      setCapabilities({
        devicePixelRatio: window.devicePixelRatio,
        reducedMotion: reducedMotionQuery.matches,
        touch: coarsePointerQuery.matches || navigator.maxTouchPoints > 0,
        viewportHeight: window.innerHeight,
        viewportWidth: window.innerWidth,
        webgl,
      });
    }

    updateCapabilities();
    reducedMotionQuery.addEventListener("change", updateCapabilities);
    coarsePointerQuery.addEventListener("change", updateCapabilities);
    window.addEventListener("resize", updateCapabilities);

    return () => {
      reducedMotionQuery.removeEventListener("change", updateCapabilities);
      coarsePointerQuery.removeEventListener("change", updateCapabilities);
      window.removeEventListener("resize", updateCapabilities);
    };
  }, [forceFallback]);

  useEffect(() => {
    if (mode === "scroll") {
      return;
    }

    const nextProgress =
      effectiveReducedMotion || mode === "static"
        ? reducedMotionProgress
        : clampExperienceProgress(progress);
    targetProgressRef.current = nextProgress;
    dampedProgressRef.current = nextProgress;
    const root = rootRef.current;

    if (root) {
      writeDomProgress(root, nextProgress, sequence);
    }
  }, [effectiveReducedMotion, mode, progress, reducedMotionProgress, sequence]);

  useEffect(() => {
    const root = rootRef.current;

    if (!root || forceFallback || !capabilities.webgl) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry?.isIntersecting ?? false;
        setIsNearViewport(isIntersecting);

        if (!isIntersecting) {
          setRendererReadyTier(null);
        }
      },
      { rootMargin: "25% 0px" },
    );

    observer.observe(root);

    return () => {
      observer.disconnect();
    };
  }, [capabilities.webgl, forceFallback]);

  useEffect(() => {
    const root = rootRef.current;

    if (!root || mode !== "scroll") {
      return;
    }

    const rootElement = root;

    if (effectiveReducedMotion) {
      targetProgressRef.current = reducedMotionProgress;
      dampedProgressRef.current = reducedMotionProgress;
      writeDomProgress(rootElement, reducedMotionProgress, sequence);
      return;
    }

    let frameId = 0;

    function updateProgress(): void {
      frameId = 0;
      const rect = rootElement.getBoundingClientRect();
      const progress = normalizeScrollProgress({
        elementHeight: rect.height,
        elementTop: window.scrollY + rect.top,
        scrollY: window.scrollY,
        viewportHeight: window.innerHeight,
      });

      targetProgressRef.current = progress;
      writeDomProgress(rootElement, progress, sequence);

      if (showDiagnostics) {
        setDiagnosticProgress(Math.round(progress * 100));
      }
    }

    function scheduleProgressUpdate(): void {
      if (frameId === 0) {
        frameId = window.requestAnimationFrame(updateProgress);
      }
    }

    const resizeObserver = new ResizeObserver(scheduleProgressUpdate);
    resizeObserver.observe(rootElement);
    window.addEventListener("resize", scheduleProgressUpdate);
    window.addEventListener("scroll", scheduleProgressUpdate, {
      passive: true,
    });
    scheduleProgressUpdate();

    return () => {
      resizeObserver.disconnect();
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", scheduleProgressUpdate);
      window.removeEventListener("scroll", scheduleProgressUpdate);
    };
  }, [
    effectiveReducedMotion,
    mode,
    reducedMotionProgress,
    sequence,
    showDiagnostics,
  ]);

  const handleRendererFailure = useCallback(() => {
    setRendererReadyTier(null);
    setRuntimeFailed(true);
  }, []);
  const handleRendererReady = useCallback(() => {
    setRendererReadyTier(quality.tier);
  }, [quality.tier]);
  const handleMetrics = useCallback((metrics: ExperienceRuntimeMetrics) => {
    setRuntimeMetrics((current) =>
      current &&
      current.calls === metrics.calls &&
      current.geometries === metrics.geometries &&
      current.programs === metrics.programs &&
      current.textures === metrics.textures &&
      current.triangles === metrics.triangles
        ? current
        : metrics,
    );
  }, []);

  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>): void {
    if (quality.pointerStrength === 0) {
      return;
    }

    pointerRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointerRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  function resetPointer(): void {
    pointerRef.current.x = 0;
    pointerRef.current.y = 0;
  }

  const shouldRender =
    !forceFallback &&
    !runtimeFailed &&
    isNearViewport &&
    quality.tier !== "fallback";
  const rendererReady = rendererReadyTier === quality.tier;
  const experienceState = shouldRender
    ? rendererReady
      ? effectiveReducedMotion
        ? "static"
        : "active"
      : "loading"
    : "fallback";
  return (
    <div
      className={cn(
        "relative isolate overflow-clip bg-experience-background",
        layout === "panel" &&
          "rounded-[var(--radius-panel)] border border-experience-grid",
        mode === "scroll" &&
          (layout === "hero"
            ? "min-h-[var(--home-hero-track-height)]"
            : layout === "panel"
              ? "min-h-[var(--experience-track-height)]"
              : undefined),
        mode !== "scroll" &&
          (layout === "hero"
            ? "min-h-[var(--home-hero-preview-height)]"
            : "min-h-[var(--experience-static-height)]"),
        className,
      )}
      data-experience-canvas="true"
      data-experience-layout={layout}
      data-experience-state={experienceState}
      data-camera-composition={quality.composition}
      data-motion-reduced={effectiveReducedMotion ? "true" : "false"}
      data-quality-tier={quality.tier}
      data-sequence={sequence}
      data-scene-progress={displayedProgress}
      onPointerLeave={resetPointer}
      onPointerMove={handlePointerMove}
      ref={rootRef}
    >
      <div
        className={cn(
          "relative overflow-hidden bg-experience-background",
          mode === "scroll"
            ? "sticky top-[var(--header-height-mobile)] h-[calc(100svh-var(--header-height-mobile))] xl:top-[var(--header-height-desktop)] xl:h-[calc(100svh-var(--header-height-desktop))]"
            : layout === "hero"
              ? "h-[var(--home-hero-preview-height)]"
              : "h-[var(--experience-static-height)]",
        )}
      >
        <WebGLFallback
          className={cn(
            "transition-interactive absolute inset-0 z-[var(--layer-experience-background)]",
            rendererReady && shouldRender && "opacity-0",
          )}
        />
        {shouldRender && (
          <div
            aria-hidden="true"
            className={cn(
              "transition-interactive absolute inset-0 z-[var(--layer-experience-canvas)]",
              rendererReady ? "opacity-100" : "opacity-0",
            )}
          >
            <ExperienceBoundary
              key={`${sequence}:${quality.tier}`}
              onError={handleRendererFailure}
            >
              <LazyExperienceRenderer
                dampedProgressRef={dampedProgressRef}
                onContextLost={handleRendererFailure}
                onMetrics={showDiagnostics ? handleMetrics : undefined}
                onReady={handleRendererReady}
                pointerRef={pointerRef}
                quality={quality}
                reducedMotion={effectiveReducedMotion}
                sequence={sequence}
                targetProgressRef={targetProgressRef}
              />
            </ExperienceBoundary>
          </div>
        )}
        {children && layout !== "story" && (
          <div className="pointer-events-none absolute inset-0 z-[var(--layer-experience-content)]">
            <div className="pointer-events-auto h-full">{children}</div>
          </div>
        )}
        {showDiagnostics && (
          <dl
            aria-label="Diagnostyka warstwy interaktywnej"
            className="absolute right-4 bottom-4 z-[var(--layer-experience-content)] grid min-w-40 gap-2 rounded-[var(--radius-control)] border border-experience-grid bg-experience-panel p-3 text-caption text-experience-foreground shadow-surface sm:right-6 sm:bottom-6"
          >
            <div className="flex items-center justify-between gap-4">
              <dt className="text-experience-muted">Stan</dt>
              <dd className="font-semibold capitalize">{experienceState}</dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-experience-muted">Jakość</dt>
              <dd className="font-semibold">{qualityLabels[quality.tier]}</dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-experience-muted">Ruch</dt>
              <dd className="font-semibold">
                {effectiveReducedMotion ? "Ograniczony" : "Pełny"}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-experience-muted">Progres</dt>
              <dd className="font-semibold">{displayedProgress}%</dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-experience-muted">Kadr</dt>
              <dd className="font-semibold">
                {quality.composition === "compact" ? "Compact" : "Wide"}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-experience-muted">Budżet</dt>
              <dd className="font-semibold">
                {renderInventory.drawCalls} DC · {renderInventory.triangles} tri
              </dd>
            </div>
            {runtimeMetrics && (
              <>
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-experience-muted">Renderer</dt>
                  <dd className="font-semibold">
                    {runtimeMetrics.calls} DC · {runtimeMetrics.triangles} tri
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-experience-muted">Zasoby</dt>
                  <dd className="font-semibold">
                    {runtimeMetrics.geometries} geo · {runtimeMetrics.textures}{" "}
                    tex · {runtimeMetrics.programs} prog
                  </dd>
                </div>
              </>
            )}
          </dl>
        )}
      </div>
      {children && layout === "story" && (
        <div className="experience-story__content pointer-events-none relative z-[var(--layer-experience-content)]">
          <div className="pointer-events-auto">{children}</div>
        </div>
      )}
    </div>
  );
}
