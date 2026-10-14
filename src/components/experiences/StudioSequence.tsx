"use client";

import { useEffect, useRef, useState } from "react";
import { transformationSteps } from "@/content/site";
import { ProductImage, studioImageSizes } from "@/components/ProductImage";
import { media, studioFrames } from "@/content/media";

export function StudioSequence() {
  const section = useRef<HTMLElement>(null);
  const [active, setActive] = useState(4);
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 900px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const measure = () => {
      frame = 0;
      if (!desktop.matches || reduced.matches || !section.current) return;
      const rect = section.current.getBoundingClientRect();
      if (rect.top > window.innerHeight || rect.bottom < 0) return;
      const travel = rect.height - window.innerHeight;
      const progress = Math.min(1, Math.max(0, -rect.top / travel));
      setActive(Math.min(4, Math.floor(progress * 5)));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    desktop.addEventListener("change", schedule);
    reduced.addEventListener("change", schedule);
    schedule();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      desktop.removeEventListener("change", schedule);
      reduced.removeEventListener("change", schedule);
    };
  }, []);

  const select = (index: number) => {
    setActive(index);
    if (
      window.matchMedia("(min-width: 900px) and (prefers-reduced-motion: no-preference)").matches &&
      section.current
    ) {
      const top = section.current.getBoundingClientRect().top + window.scrollY;
      const travel = section.current.offsetHeight - window.innerHeight;
      window.scrollTo({ top: top + travel * ((index + 0.1) / 5), behavior: "instant" });
    }
  };
  return (
    <section ref={section} className="studio-sequence" aria-labelledby="studio-title">
      <div className="studio-sticky" data-stage={active}>
        <div className="studio-heading">
          <span className="eyebrow">02 — W cyfrowym studiu</span>
          <h2 id="studio-title">
            Dobre światło.
            <br />
            Robi różnicę.
          </h2>
        </div>
        <div className="studio-visual" aria-hidden="true">
          <div className="studio-light" />
          {studioFrames.map((id, index) => (
            <div
              key={id}
              className="studio-image"
              data-active={active === index}
              data-study={media[id].isStudy}
              data-asset={id}
            >
              <ProductImage id={id} decorative sizes={studioImageSizes} />
            </div>
          ))}
          <div className="studio-frame" />
        </div>
        <div className="studio-narrative">
          <span className="studio-number" aria-hidden="true">
            0{active + 1}
          </span>
          <h3>{transformationSteps[active].text}</h3>
          <p>{transformationSteps[active].detail}</p>
          {media.perfume.isStudy && (
            <span className="study-note">Koncepcja procesu na makiecie produktu</span>
          )}
        </div>
        <div className="studio-controls" role="group" aria-label="Etapy opracowania produktu">
          {transformationSteps.map((step, index) => (
            <button key={step.label} onClick={() => select(index)} aria-pressed={active === index}>
              <span>0{index + 1}</span>
              {step.label}
              <i aria-hidden="true" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
