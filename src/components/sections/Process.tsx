import { processSteps, site } from "@/content/site";
import { Arrow } from "@/components/layout/Arrow";

export function Process() {
  return (
    <section className="process section-pad" id="proces" aria-labelledby="process-title">
      <div className="process-heading">
        <span className="eyebrow">04 — Jak pracujemy</span>
        <h2 id="process-title">
          Od Twojego zdjęcia.
          <br />
          Do gotowego obrazu.
        </h2>
        <p>
          Na początek wystarczy produkt.
          <br />
          Resztę ustalimy razem.
        </p>
      </div>
      <ol className="process-list">
        {processSteps.map((step) => (
          <li key={step.number}>
            <span className="process-number">{step.number}</span>
            <div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
          </li>
        ))}
      </ol>
      <div id="oferta" className="offer">
        <span className="eyebrow">Zakres dopasowany do produktu</span>
        <div>
          <h3>
            Każdy produkt jest inny.
            <br />
            Wycena też powinna być.
          </h3>
          <p>
            Liczba produktów, liczba ujęć, materiał wyjściowy i zakres opracowania. Na tej podstawie
            przygotujemy konkretną propozycję.
          </p>
          <a className="text-link" href="#kontakt">
            {site.cta}
            <Arrow diagonal />
          </a>
        </div>
      </div>
    </section>
  );
}
