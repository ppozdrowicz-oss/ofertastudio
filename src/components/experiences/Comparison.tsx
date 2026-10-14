import { ProductImage } from "@/components/ProductImage";
import { comparison } from "@/content/site";

export function Comparison() {
  return (
    <section
      className="comparison-section section-pad"
      id="roznica"
      aria-labelledby="difference-title"
    >
      <div className="section-heading">
        <span className="eyebrow">01 — Zobacz różnicę</span>
        <h2 id="difference-title">
          Dwa ujęcia.
          <br />
          <span className="muted">Inne pierwsze wrażenie.</span>
        </h2>
        <p>Tło i światło zmieniają odbiór produktu. Zobacz dwa przykłady prezentacji.</p>
      </div>
      <div className="comparison" aria-describedby="comparison-help">
        {comparison.frames.map(({ id, label }) => (
          <figure className="comparison-frame" key={id}>
            <ProductImage id={id} sizes="(max-width: 767px) 100vw, 45vw" />
            <figcaption className="comparison-label">{label}</figcaption>
          </figure>
        ))}
      </div>
      <div className="comparison-caption">
        <span className="eyebrow">Tło. Światło. Prezentacja.</span>
        <span id="comparison-help">{comparison.disclosure}</span>
      </div>
    </section>
  );
}
