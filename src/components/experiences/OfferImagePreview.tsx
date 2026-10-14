"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { OfferSlide } from "@/content/showcase";
import styles from "./ProductShowcase.module.css";

export function OfferImagePreview({
  slide,
  productName,
  onClose,
}: {
  slide: OfferSlide;
  productName: string;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [zoomed, setZoomed] = useState(false);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.current?.showModal();
    return () => {
      document.body.style.overflow = previousOverflow;
      opener?.focus({ preventScroll: true });
    };
  }, []);
  return (
    <dialog
      ref={dialog}
      className={styles.preview}
      aria-labelledby="offer-preview-title"
      onClose={onClose}
      onKeyDown={(event) => {
        if (event.key !== "Tab") return;
        const buttons = [...event.currentTarget.querySelectorAll<HTMLButtonElement>("button")];
        if (event.shiftKey && document.activeElement === buttons[0]) {
          event.preventDefault();
          buttons.at(-1)?.focus();
        } else if (!event.shiftKey && document.activeElement === buttons.at(-1)) {
          event.preventDefault();
          buttons[0]?.focus();
        }
      }}
    >
      <div className={styles.previewHeader}>
        <div>
          <span className="eyebrow">{productName}</span>
          <h4 id="offer-preview-title">{slide.subtitle}</h4>
        </div>
        <button autoFocus onClick={() => dialog.current?.close()} aria-label="Zamknij podgląd">
          Zamknij <span aria-hidden="true">×</span>
        </button>
      </div>
      {slide.reviewNote && <p className={styles.previewReview}>{slide.reviewNote}</p>}
      <div
        className={styles.previewCanvas}
        role="group"
        data-zoomed={zoomed}
        tabIndex={zoomed ? 0 : undefined}
        aria-label={zoomed ? "Powiększone zdjęcie — przewijaj, aby obejrzeć szczegóły" : undefined}
      >
        {failed ? (
          <p>Nie udało się wczytać zdjęcia. Zamknij podgląd i spróbuj ponownie.</p>
        ) : (
          <Image
            src={slide.image.src}
            alt={slide.image.alt}
            width={slide.image.width}
            height={slide.image.height}
            quality={90}
            sizes={zoomed ? `${slide.image.width}px` : "95vw"}
            loading="eager"
            onError={() => setFailed(true)}
          />
        )}
      </div>
      <div className={styles.previewFooter}>
        <p>
          {zoomed ? "Przewijaj zdjęcie, aby zobaczyć szczegóły." : "Pełny kadr. Wszystkie detale."}
        </p>
        <button onClick={() => setZoomed(!zoomed)} aria-pressed={zoomed}>
          {zoomed ? "Dopasuj do ekranu" : "Powiększ detale"}
        </button>
      </div>
    </dialog>
  );
}
