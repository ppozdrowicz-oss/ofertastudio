import { ProductImage } from "@/components/ProductImage";
import { hasStudies, media } from "@/content/media";
import { Arrow } from "@/components/layout/Arrow";
import { site } from "@/content/site";

import { ServiceSummary } from "./ServiceSummary";
import { ProductShowcase } from "@/components/experiences/ProductShowcase";
import { offerCollections } from "@/content/showcase";

export function Portfolio() {
  return (
    <section className="portfolio section-pad" id="realizacje" aria-labelledby="portfolio-title">
      <div className="portfolio-intro">
        <span className="eyebrow">03 — Różne produkty. Jedno studio.</span>
        <h2 id="portfolio-title">
          Od małego detalu.
          <br />
          Do wielkiego wrażenia.
        </h2>
        <div className="portfolio-intro-copy">
          <p>
            Szkło, skóra, tkanina, metal.
            <br />
            Każdy materiał ma swój język.
            <br />
            Wiemy, jak go pokazać.
          </p>
          {hasStudies ? (
            <p className="study-note">
              Poniżej: autorskie makiety kierunku wizualnego.
              <br />
              Miejsce na finalne realizacje OfertaStudio.
            </p>
          ) : (
            <p className="study-note">{site.portfolioDisclosure}</p>
          )}
        </div>
      </div>
      <figure className="watch-feature">
        <div className="watch-text">
          <span className="eyebrow">Studium precyzji — 03</span>
          <h3>
            Detal,
            <br />
            który robi
            <br />
            <em>całość.</em>
          </h3>
          <p>
            Metal. Szkło. Każda wskazówka.
            <br />
            Precyzja widoczna z bliska.
          </p>
        </div>
        <div className="watch-image">
          <ProductImage id="watchPrecision" sizes="(max-width: 767px) 96vw, 52vw" />
        </div>
        <figcaption>
          <span>Zegarki / Product Detail</span>
          {media.watchPrecision.isStudy && <span>Wizualizacja koncepcyjna</span>}
        </figcaption>
      </figure>
      <ServiceSummary />
      <ProductShowcase collections={offerCollections} />
      <a className="text-link portfolio-link" href="#kontakt">
        Teraz miejsce na Twój produkt
        <Arrow diagonal />
      </a>
    </section>
  );
}
