import type { ExperiencePalette } from "@/lib/experience/palette";

export type LightingProps = {
  palette: ExperiencePalette;
};

export function Lighting({ palette }: LightingProps) {
  return (
    <>
      <hemisphereLight
        color={palette.light}
        groundColor={palette.depth}
        intensity={1.15}
      />
      <directionalLight
        color={palette.focus}
        intensity={2.8}
        position={[6, 9, 7]}
      />
      <directionalLight
        color={palette.accent}
        intensity={0.72}
        position={[-5, 4, -9]}
      />
    </>
  );
}
