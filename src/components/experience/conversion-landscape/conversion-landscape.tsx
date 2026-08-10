import type { RefObject } from "react";
import { useMemo } from "react";

import { FocusObject } from "@/components/experience/conversion-landscape/focus-object";
import { LandscapeField } from "@/components/experience/conversion-landscape/landscape-field";
import { SignalField } from "@/components/experience/conversion-landscape/signal-field";
import { SpatialGrid } from "@/components/experience/conversion-landscape/spatial-grid";
import { SpatialModules } from "@/components/experience/conversion-landscape/spatial-modules";
import { useLandscapeResources } from "@/components/experience/conversion-landscape/use-landscape-resources";
import type { ExperiencePalette } from "@/lib/experience/palette";
import {
  createLandscapePlatforms,
  createSignalConnections,
  createSpatialModules,
} from "@/lib/experience/procedural";
import type { ExperienceQuality } from "@/lib/experience/quality";
import type { ConversionSceneFrame } from "@/lib/experience/scene-timeline";

export type ConversionLandscapeProps = {
  palette: ExperiencePalette;
  quality: ExperienceQuality;
  reducedMotion: boolean;
  sceneFrameRef: RefObject<ConversionSceneFrame>;
};

export function ConversionLandscape({
  palette,
  quality,
  reducedMotion,
  sceneFrameRef,
}: ConversionLandscapeProps) {
  const resources = useLandscapeResources(palette);
  const modules = useMemo(
    () =>
      createSpatialModules({
        columns: quality.columns,
        landscapeDepth: quality.landscapeDepth,
        moduleCount: quality.moduleCount,
      }),
    [quality.columns, quality.landscapeDepth, quality.moduleCount],
  );
  const platforms = useMemo(
    () =>
      createLandscapePlatforms({
        columns: quality.columns,
        fieldCount: quality.fieldCount,
        landscapeDepth: quality.landscapeDepth,
      }),
    [quality.columns, quality.fieldCount, quality.landscapeDepth],
  );
  const connections = useMemo(
    () =>
      createSignalConnections(modules, quality.columns, quality.signalCount),
    [modules, quality.columns, quality.signalCount],
  );

  return (
    <group dispose={null}>
      <LandscapeField platforms={platforms} resources={resources} />
      <SpatialGrid
        palette={palette}
        quality={quality}
        sceneFrameRef={sceneFrameRef}
      />
      <SpatialModules
        modules={modules}
        palette={palette}
        resources={resources}
        sceneFrameRef={sceneFrameRef}
      />
      <SignalField
        connections={connections}
        reducedMotion={reducedMotion}
        resources={resources}
        sceneFrameRef={sceneFrameRef}
        signalColor={palette.signal}
      />
      <FocusObject resources={resources} sceneFrameRef={sceneFrameRef} />
    </group>
  );
}
