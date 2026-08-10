import { useEffect, useMemo } from "react";
import { BoxGeometry, MeshStandardMaterial } from "three";

import type { ExperiencePalette } from "@/lib/experience/palette";

export type LandscapeResources = {
  accentMaterial: MeshStandardMaterial;
  boxGeometry: BoxGeometry;
  elevatedMaterial: MeshStandardMaterial;
  fieldMaterial: MeshStandardMaterial;
  moduleMaterial: MeshStandardMaterial;
};

export function useLandscapeResources(
  palette: ExperiencePalette,
): LandscapeResources {
  const resources = useMemo<LandscapeResources>(
    () => ({
      accentMaterial: new MeshStandardMaterial({
        color: palette.accent,
        metalness: 0,
        roughness: 0.68,
      }),
      boxGeometry: new BoxGeometry(1, 1, 1),
      elevatedMaterial: new MeshStandardMaterial({
        color: palette.focus,
        metalness: 0.04,
        roughness: 0.72,
      }),
      fieldMaterial: new MeshStandardMaterial({
        color: palette.depth,
        metalness: 0,
        roughness: 0.96,
      }),
      moduleMaterial: new MeshStandardMaterial({
        color: palette.focus,
        metalness: 0.04,
        roughness: 0.78,
      }),
    }),
    [palette],
  );

  useEffect(
    () => () => {
      resources.boxGeometry.dispose();
      resources.accentMaterial.dispose();
      resources.elevatedMaterial.dispose();
      resources.fieldMaterial.dispose();
      resources.moduleMaterial.dispose();
    },
    [resources],
  );

  return resources;
}
