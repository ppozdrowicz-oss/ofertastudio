"use client";

import Image from "next/image";
import { useRef, useState, type CSSProperties, type PointerEvent } from "react";
import type { OfferCollection, OfferSlide } from "@/content/showcase";
import { nearbySlides, slideOffset, wrapSlide } from "@/lib/showcase";
import { Arrow } from "@/components/layout/Arrow";
import { OfferInsights } from "./OfferInsights";
import { OfferImagePreview } from "./OfferImagePreview";
import styles from "./ProductShowcase.module.css";

const imageSizes =
  "(max-width: 767px) 82vw, (max-width: 1023px) 72vw, (max-width: 1440px) 58vw, 835px";

function ShowcasePhoto({ slide, active }: { slide: OfferSlide; active: boolean }) {
  const [failed, setFailed] = useState(false);
  if (failed)
    return (
      <div
        className={styles.unavailable}
        role="img"
        aria-label={`${slide.subtitle}: zdjęcie niedostępne`}
      >
        <span className="eyebrow">{slide.subtitle}</span>
        <p>Ujęcie chwilowo niedostępne.</p>
        <span>Możesz przejść do kolejnej fotografii.</span>
      </div>
    );
  return (
    <Image
      src={slide.image.src}
      width={slide.image.width}
      height={slide.image.height}
      alt={active ? slide.image.alt : ""}
      sizes={imageSizes}
      quality={90}
      loading="lazy"
      draggable={false}
      onError={() => setFailed(true)}
      className={styles.photo}
    />
  );
}

type Drag = { id: number; x: number; y: number; delta: number; horizontal: boolean };

export function ProductShowcase({ collections }: { collections: readonly OfferCollection[] }) {
  const [state, setState] = useState(() => ({
    collection: 0,
    active: 0,
    seen: new Set(nearbySlides(0, collections[0].slides.length)),
  }));
  const [pending, setPending] = useState<{ index: number; request: number } | null>(null);
  const [preview, setPreview] = useState(false);
  const request = useRef(0);
  const prepared = useRef(new Set<number>());
  const stage = useRef<HTMLDivElement>(null);
  const drag = useRef<Drag | null>(null);
  const suppressClick = useRef(false);
  const collection = collections[state.collection];
  const slides = collection.slides;
  const count = slides.length;
  const allSlides = collections.flatMap((item) => item.slides);
  const active = slides[state.active];

  function select(index: number | ((current: number) => number)) {
    setState((current) => {
      const next = wrapSlide(typeof index === "function" ? index(current.active) : index, count);
      return {
        ...current,
        active: next,
        seen: new Set([...current.seen, ...nearbySlides(next, count)]),
      };
    });
  }
  function move(direction: number) {
    select((current) => current + direction);
  }

  function chooseCollection(index: number) {
    request.current += 1;
    prepared.current.clear();
    setPending(index === state.collection ? null : { index, request: request.current });
  }
  function prepareCollection(index: number, token: number, imageIndex: number) {
    if (token !== request.current) return;
    prepared.current.add(imageIndex);
    if (prepared.current.size < nearbySlides(0, collections[index].slides.length).length) return;
    resetDrag();
    setState({
      collection: index,
      active: 0,
      seen: new Set(nearbySlides(0, collections[index].slides.length)),
    });
    setPending(null);
  }
  function resetDrag() {
    drag.current = null;
    stage.current?.style.removeProperty("--drag");
    stage.current?.removeAttribute("data-dragging");
  }
  function startDrag(event: PointerEvent<HTMLDivElement>) {
    if (!event.isPrimary || event.button !== 0) return;
    suppressClick.current = false;
    drag.current = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      delta: 0,
      horizontal: false,
    };
  }
  function updateDrag(event: PointerEvent<HTMLDivElement>) {
    const gesture = drag.current;
    if (!gesture || gesture.id !== event.pointerId) return;
    const dx = event.clientX - gesture.x;
    const dy = event.clientY - gesture.y;
    if (!gesture.horizontal) {
      if (Math.abs(dy) > 10 && Math.abs(dy) > Math.abs(dx)) {
        resetDrag();
        return;
      }
      if (Math.abs(dx) < 10 || Math.abs(dx) <= Math.abs(dy) * 1.2) return;
      gesture.horizontal = true;
      event.currentTarget.setPointerCapture(event.pointerId);
      event.currentTarget.dataset.dragging = "true";
    }
    gesture.delta = dx;
    const limit = event.currentTarget.clientWidth * 0.16;
    event.currentTarget.style.setProperty("--drag", `${Math.max(-limit, Math.min(limit, dx))}px`);
  }
  function endDrag(event: PointerEvent<HTMLDivElement>) {
    const gesture = drag.current;
    if (!gesture || gesture.id !== event.pointerId) return;
    if (gesture.horizontal) {
      suppressClick.current = true;
      if (Math.abs(gesture.delta) >= Math.min(70, event.currentTarget.clientWidth * 0.1)) {
        move(gesture.delta < 0 ? 1 : -1);
      }
    }
    resetDrag();
    if (event.currentTarget.hasPointerCapture(event.pointerId))
      event.currentTarget.releasePointerCapture(event.pointerId);
  }

  return (
    <section
      id="perspektywy"
      className={styles.showcase}
      aria-labelledby="showcase-title"
      aria-roledescription="karuzela"
      data-showcase
      data-collection={collection.id}
      data-active-id={active.id}
    >
      <div className={styles.heading}>
        <div>
          <span className="eyebrow">Wybrane prezentacje ofert</span>
          <h3 id="showcase-title">
            Jeden produkt.
            <br />
            <em>Kompletna oferta.</em>
          </h3>
        </div>
        <div className={styles.intro}>
          <p>
            Od zdjęcia głównego po detale, informacje i ujęcia w zastosowaniu. Zobacz, jak może
            wyglądać pełna prezentacja produktu.
          </p>
          <p className={styles.disclosure}>
            Przykładowe prezentacje ofert. Bez deklaracji współpracy z przedstawionymi markami.
          </p>
        </div>
      </div>
      <div className={styles.collectionBar}>
        <div className={styles.collectionSwitch} role="group" aria-label="Wybierz kolekcję">
          {collections.map((item, index) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={index === state.collection}
              data-pending={pending?.index === index}
              aria-controls="offer-gallery"
              onClick={() => chooseCollection(index)}
            >
              <span aria-hidden="true">{String(index + 1).padStart(2, "0")} / </span>
              {item.title}
            </button>
          ))}
        </div>
        <div className={styles.collectionDescriptions}>
          {collections.map((item, index) => (
            <div
              key={item.id}
              data-active={index === state.collection}
              aria-hidden={index !== state.collection}
            >
              <p className={styles.productName}>{item.productName}</p>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
      <p id="showcase-instructions" className={styles.screenReader}>
        Przeciągnij zdjęcia lub użyj strzałek w lewo i w prawo. Home wybiera pierwsze ujęcie, End
        ostatnie. Karuzela nie przewija się automatycznie. Przycisk Powiększ zdjęcie otwiera pełny
        podgląd.
      </p>
      <div
        id="offer-gallery"
        aria-busy={!!pending}
        onKeyDown={(event) => {
          if (event.altKey || event.ctrlKey || event.metaKey) return;
          if (["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) {
            event.preventDefault();
            if (event.key === "Home") select(0);
            else if (event.key === "End") select(count - 1);
            else move(event.key === "ArrowRight" ? 1 : -1);
          }
        }}
      >
        <div
          className={styles.stage}
          ref={stage}
          tabIndex={0}
          role="group"
          aria-label={`Fotografie — ${collection.productName}`}
          aria-describedby="showcase-instructions"
          onPointerDown={startDrag}
          onPointerMove={updateDrag}
          onPointerUp={endDrag}
          onPointerCancel={resetDrag}
          onLostPointerCapture={resetDrag}
          onClickCapture={(event) => {
            if (suppressClick.current) {
              event.preventDefault();
              event.stopPropagation();
              suppressClick.current = false;
            }
          }}
        >
          {slides.map((slide, index) => {
            const offset = slideOffset(index, state.active, count);
            const distance = Math.abs(offset);
            const selected = offset === 0;
            return (
              <figure
                key={slide.id}
                className={styles.frame}
                role="group"
                aria-roledescription="slajd"
                aria-label={`${collection.productName}, ${index + 1} z ${count}: ${slide.title}`}
                aria-hidden={!selected}
                inert={!selected}
                data-showcase-slide={slide.id}
                data-active={selected}
                data-visible={distance <= 1}
                style={
                  {
                    "--offset": Math.max(-2, Math.min(2, offset)),
                    "--scale": selected ? 1 : 0.86,
                    "--depth": selected ? "0px" : "-32px",
                    "--rotation": `${offset === 0 ? 0 : offset < 0 ? 6 : -6}deg`,
                    zIndex: selected ? 3 : distance === 1 ? 2 : 1,
                  } as CSSProperties
                }
              >
                {state.seen.has(index) && (
                  <ShowcasePhoto key={slide.image.src} slide={slide} active={selected} />
                )}
              </figure>
            );
          })}
          <button
            className={`${styles.neighbor} ${styles.previousNeighbor}`}
            onClick={() => move(-1)}
            aria-label={`Ujęcie po lewej: ${slides[wrapSlide(state.active - 1, count)].subtitle}`}
          >
            <span aria-hidden="true">←</span>
          </button>
          <button
            className={`${styles.neighbor} ${styles.nextNeighbor}`}
            onClick={() => move(1)}
            aria-label={`Ujęcie po prawej: ${slides[wrapSlide(state.active + 1, count)].subtitle}`}
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>
        <div className={styles.captionBar}>
          <div className={styles.index} data-showcase-index aria-hidden="true">
            <span>{String(state.active + 1).padStart(2, "0")}</span>
            <span>/ {String(count).padStart(2, "0")}</span>
          </div>
          <div className={styles.captions}>
            {allSlides.map((slide) => (
              <div
                className={styles.caption}
                key={slide.id}
                data-caption={slide.id}
                data-active={slide.id === active.id}
                aria-hidden={slide.id !== active.id}
                inert={slide.id !== active.id}
              >
                <span className="eyebrow">{slide.subtitle}</span>
                <h4>{slide.title}</h4>
                <p>{slide.description}</p>
                {slide.reviewNote && <p className={styles.reviewNote}>{slide.reviewNote}</p>}
              </div>
            ))}
          </div>
          <div className={styles.actions}>
            <div className={styles.controls} role="group" aria-label="Sterowanie fotografiami">
              <button onClick={() => move(-1)} aria-label="Poprzednie ujęcie">
                <span className={styles.back}>
                  <Arrow />
                </span>
              </button>
              <button onClick={() => move(1)} aria-label="Następne ujęcie">
                <Arrow />
              </button>
            </div>
            <button className={styles.previewButton} onClick={() => setPreview(true)}>
              Powiększ zdjęcie <span aria-hidden="true">↗</span>
            </button>
          </div>
        </div>
        <OfferInsights slides={allSlides} activeId={active.id} />
        <div className={styles.progress} aria-hidden="true">
          {slides.map((slide, index) => (
            <span key={slide.id} data-active={state.active === index} />
          ))}
        </div>
      </div>
      {pending && (
        <div className={styles.preparing} aria-hidden="true" inert>
          {nearbySlides(0, collections[pending.index].slides.length).map((imageIndex) => {
            const image = collections[pending.index].slides[imageIndex].image;
            const { index, request: token } = pending;
            return (
              <Image
                key={`${token}-${imageIndex}`}
                src={image.src}
                width={image.width}
                height={image.height}
                alt=""
                sizes={imageSizes}
                quality={90}
                loading="eager"
                onLoad={(event) => {
                  void event.currentTarget
                    .decode()
                    .catch(() => {})
                    .then(() => prepareCollection(index, token, imageIndex));
                }}
                onError={() => prepareCollection(index, token, imageIndex)}
              />
            );
          })}
        </div>
      )}
      <p className={styles.screenReader} aria-live="polite" aria-atomic="true">
        {pending
          ? `Wczytywanie kolekcji: ${collections[pending.index].title}.`
          : `${collection.productName}. Ujęcie ${state.active + 1} z ${count}. ${active.title} ${active.subtitle}.`}
      </p>
      {preview && (
        <OfferImagePreview
          slide={active}
          productName={collection.productName}
          onClose={() => setPreview(false)}
        />
      )}
    </section>
  );
}
