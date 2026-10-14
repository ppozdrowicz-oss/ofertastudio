import type { OfferSlide } from "@/content/showcase";
import styles from "./ProductShowcase.module.css";

export function OfferInsights({
  slides,
  activeId,
}: {
  slides: readonly OfferSlide[];
  activeId: string;
}) {
  return (
    <div className={styles.insightsPanels}>
      {slides.map((slide) => (
        <div
          className={styles.insights}
          key={slide.id}
          data-insights={slide.id}
          data-active={slide.id === activeId}
          aria-hidden={slide.id !== activeId}
          inert={slide.id !== activeId}
        >
          <div>
            <h5>Dlaczego właśnie tak?</h5>
            <p>{slide.insights.why}</p>
          </div>
          <div>
            <h5>Co to daje kupującemu?</h5>
            <p>{slide.insights.buyerValue}</p>
          </div>
          <div className={styles.workshop}>
            <h5>Warsztat OfertaStudio</h5>
            <ul>
              {slide.insights.workshop.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
