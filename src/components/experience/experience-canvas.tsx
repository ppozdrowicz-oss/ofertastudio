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

import { WebGLFallback } from "@/components/experience/webgl-fallback";
import { cn } from "@/lib/cn";
import {
  experienceMotion,
  type ExperiencePointer,
} from "@/lib/experience/motion";
import { normalizeScrollProgress } from "@/lib/experience/progress";
import {
  detectWebGLSupport,
  type ExperienceCapabilities,
  type ExperienceQualityTier,
  resolveExperienceQuality,
} from "@/lib/experience/quality";

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
  mode?: "scroll" | "static";
  showDiagnostics?: boolean;
};

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
  mode = "scroll",
  showDiagnostics = false,
}: ExperienceCanvasRuntimeProps) {
  const initialProgress =
    mode === "static" ? experienceMotion.reducedMotionProgress : 0;
  const rootRef = useRef<HTMLDivElement>(null);
  const targetProgressRef = useRef(initialProgress);
  const dampedProgressRef = useRef(initialProgress);
  const pointerRef = useRef<ExperiencePointer>({ x: 0, y: 0 });
  const [capabilities, setCapabilities] = useState(initialCapabilities);
  const [isNearViewport, setIsNearViewport] = useState(false);
  const [rendererReadyTier, setRendererReadyTier] =
    useState<ExperienceQualityTier | null>(null);
  const [runtimeFailed, setRuntimeFailed] = useState(false);
  const [diagnosticProgress, setDiagnosticProgress] = useState(
    Math.round(initialProgress * 100),
  );
  const quality = useMemo(
    () =>
      resolveExperienceQuality({
        ...capabilities,
        webgl: capabilities.webgl && !forceFallback && !runtimeFailed,
      }),
    [capabilities, forceFallback, runtimeFailed],
  );

  useEffect(() => {
    if (forceFallback) {
      return;
    }

    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const coarsePointerQuery = window.matchMedia("(pointer: coarse)");
    const webgl = detectWebGLSupport();

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

    if (!root || mode === "static" || forceFallback || !capabilities.webgl) {
      return;
    }

    const rootElement = root;
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
  }, [capabilities.webgl, forceFallback, mode, showDiagnostics]);

  const handleRendererFailure = useCallback(() => {
    setRendererReadyTier(null);
    setRuntimeFailed(true);
  }, []);
  const handleRendererReady = useCallback(() => {
    setRendererReadyTier(quality.tier);
  }, [quality.tier]);

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
      ? capabilities.reducedMotion
        ? "static"
        : "active"
      : "loading"
    : "fallback";

  return (
    <div
      className={cn(
        "relative isolate overflow-clip rounded-[var(--radius-panel)] border border-experience-grid bg-experience-background",
        mode === "scroll"
          ? "min-h-[var(--experience-track-height)]"
          : "min-h-[var(--experience-static-height)]",
        className,
      )}
      data-experience-canvas="true"
      data-experience-state={experienceState}
      data-quality-tier={quality.tier}
      onPointerLeave={resetPointer}
      onPointerMove={handlePointerMove}
      ref={rootRef}
    >
      <div
        className={cn(
          "relative overflow-hidden bg-experience-background",
          mode === "scroll"
            ? "sticky top-[var(--header-height-mobile)] h-[calc(100svh-var(--header-height-mobile))] xl:top-[var(--header-height-desktop)] xl:h-[calc(100svh-var(--header-height-desktop))]"
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
            className="absolute inset-0 z-[var(--layer-experience-canvas)]"
          >
            <ExperienceBoundary
              key={quality.tier}
              onError={handleRendererFailure}
            >
              <LazyExperienceRenderer
                dampedProgressRef={dampedProgressRef}
                onContextLost={handleRendererFailure}
                onReady={handleRendererReady}
                pointerRef={pointerRef}
                quality={quality}
                reducedMotion={capabilities.reducedMotion}
                targetProgressRef={targetProgressRef}
              />
            </ExperienceBoundary>
          </div>
        )}
        {children && (
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
                {capabilities.reducedMotion ? "Ograniczony" : "Pełny"}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-experience-muted">Scroll</dt>
              <dd className="font-semibold">{diagnosticProgress}%</dd>
            </div>
          </dl>
        )}
      </div>
    </div>
  );
}
