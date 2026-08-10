import type { ExperiencePalette } from "@/lib/experience/palette";

export type LightingProps = {
  palette: ExperiencePalette;
};

export function Lighting({ palette }: LightingProps) {
  return (
    <>
      <ambientLight color={palette.fog} intensity={1.35} />
      <directionalLight
        color={palette.light}
        intensity={3.4}
        position={[5, 8, 5]}
      />
      <pointLight
        color={palette.accent}
        distance={18}
        intensity={2.2}
        position={[-4, 3, -6]}
      />
    </>
  );
}
