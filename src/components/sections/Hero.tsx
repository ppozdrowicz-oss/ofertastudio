import { ProductImage } from "@/components/ProductImage";
import { Arrow } from "@/components/layout/Arrow";
import { hasStudies } from "@/content/media";
import { site } from "@/content/site";

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-light" aria-hidden="true" />
      <div className="hero-intro">
        <span className="eyebrow">Studio prezentacji produktu</span>
        <span className="eyebrow hero-edition">Forma. Światło. Efekt.</span>
      </div>
      <h1 id="hero-title">
        Dobry produkt.
        <br />
        <span>Jeszcze lepszy</span>
        <br />
        <span className="hero-last">obraz.</span>
      </h1>
      <div className="hero-product">
        <ProductImage id="perfume" priority />
      </div>
      <span className="hero-side eyebrow">Studium 01 — szkło i światło</span>
      <div className="hero-copy">
        <p>
          Packshot i zdjęcia produktowe,
          <br />
          które pokazują więcej.
        </p>
        <a className="button button-dark" href="#kontakt">
          {site.cta}
          <Arrow diagonal />
        </a>
      </div>
      <div className="hero-bottom">
        <a href="#roznica" className="hero-scroll">
          Zobacz różnicę<span aria-hidden="true">↓</span>
        </a>
        <span className="study-note">
          {hasStudies
            ? "Wizualizacje koncepcyjne · nie są realizacjami klientów"
            : site.portfolioLabel}
        </span>
        <span className="eyebrow hero-index">01 / 10</span>
      </div>
    </section>
  );
}
