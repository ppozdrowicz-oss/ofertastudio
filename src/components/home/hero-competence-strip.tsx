export type HeroCompetenceStripProps = {
  items: readonly string[];
};

export function HeroCompetenceStrip({ items }: HeroCompetenceStripProps) {
  return (
    <div className="home-hero__competence">
      <p className="text-overline font-semibold text-experience-muted uppercase">
        Jeden system sprzedaży
      </p>
      <ul
        aria-label="Obszary kompetencji OfertaStudio"
        className="mt-3 flex flex-wrap gap-x-4 gap-y-2"
      >
        {items.map((item) => (
          <li
            className="flex items-center gap-2 text-caption font-semibold text-experience-foreground"
            key={item}
          >
            <span
              aria-hidden="true"
              className="size-1.5 rounded-full bg-experience-accent"
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
