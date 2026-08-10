export type ExperiencePalette = {
  accent: string;
  background: string;
  depth: string;
  fog: string;
  focus: string;
  grid: string;
  gridMinor: string;
  light: string;
  line: string;
  signal: string;
  surface: string;
  surfaceElevated: string;
};

const experienceColorTokens = {
  accent: "--experience-accent",
  background: "--experience-background",
  depth: "--experience-depth",
  fog: "--experience-fog",
  focus: "--experience-focus",
  grid: "--experience-grid",
  gridMinor: "--experience-grid-minor",
  light: "--experience-light",
  line: "--experience-line",
  signal: "--experience-signal",
  surface: "--experience-surface",
  surfaceElevated: "--experience-surface-elevated",
} as const satisfies Record<keyof ExperiencePalette, `--${string}`>;

export function readExperiencePalette(): ExperiencePalette {
  const styles = window.getComputedStyle(document.documentElement);

  function readToken(token: `--${string}`): string {
    const value = styles.getPropertyValue(token).trim();

    if (!value) {
      throw new Error(`Brak wymaganego tokenu experience: ${token}.`);
    }

    return value;
  }

  return {
    accent: readToken(experienceColorTokens.accent),
    background: readToken(experienceColorTokens.background),
    depth: readToken(experienceColorTokens.depth),
    fog: readToken(experienceColorTokens.fog),
    focus: readToken(experienceColorTokens.focus),
    grid: readToken(experienceColorTokens.grid),
    gridMinor: readToken(experienceColorTokens.gridMinor),
    light: readToken(experienceColorTokens.light),
    line: readToken(experienceColorTokens.line),
    signal: readToken(experienceColorTokens.signal),
    surface: readToken(experienceColorTokens.surface),
    surfaceElevated: readToken(experienceColorTokens.surfaceElevated),
  };
}
