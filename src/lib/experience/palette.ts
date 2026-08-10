export type ExperiencePalette = {
  accent: string;
  background: string;
  depth: string;
  fog: string;
  grid: string;
  light: string;
  surface: string;
};

const experienceColorTokens = {
  accent: "--experience-accent",
  background: "--experience-background",
  depth: "--experience-depth",
  fog: "--experience-fog",
  grid: "--experience-grid",
  light: "--experience-light",
  surface: "--experience-surface",
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
    grid: readToken(experienceColorTokens.grid),
    light: readToken(experienceColorTokens.light),
    surface: readToken(experienceColorTokens.surface),
  };
}
