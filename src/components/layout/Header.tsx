"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import { navigation, site } from "@/content/site";
import { Arrow } from "./Arrow";
import { Wordmark } from "./Wordmark";

export function Header() {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const query = window.matchMedia("(min-width: 1024px)");
    const closeAtDesktop = () => {
      if (query.matches) dialog.current?.close();
    };
    query.addEventListener("change", closeAtDesktop);
    return () => {
      document.body.style.overflow = previous;
      query.removeEventListener("change", closeAtDesktop);
    };
  }, [open]);
  const close = () => dialog.current?.close();
  const containFocus = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (event.key !== "Tab") return;
    const items = [
      ...event.currentTarget.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"),
    ];
    const first = items[0];
    const last = items.at(-1);
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  };

  return (
    <>
      <a href="#main" className="skip-link">
        Przejdź do treści
      </a>
      <header className="site-header">
        <Link href="/" aria-label={`${site.name} — strona główna`}>
          <Wordmark />
        </Link>
        <nav className="desktop-nav" aria-label="Nawigacja główna">
          {navigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <Link className="header-cta" href="/#kontakt">
          Pokaż produkt <Arrow diagonal />
        </Link>
        <button
          ref={trigger}
          className="menu-trigger"
          aria-label="Otwórz menu"
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => {
            dialog.current?.showModal();
            setOpen(true);
          }}
        >
          <span />
          <span />
        </button>
      </header>
      <dialog
        ref={dialog}
        id="mobile-menu"
        className="mobile-menu"
        aria-label="Menu główne"
        onKeyDown={containFocus}
        onClose={() => {
          setOpen(false);
          trigger.current?.focus({ preventScroll: true });
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
      >
        <div className="menu-top">
          <Wordmark />
          <button onClick={close} className="menu-close" aria-label="Zamknij menu">
            ×
          </button>
        </div>
        <nav aria-label="Nawigacja mobilna">
          {navigation.map((item, i) => (
            <a onClick={close} key={item.href} href={item.href}>
              <span className="eyebrow">0{i + 1}</span>
              {item.label}
              <Arrow diagonal />
            </a>
          ))}
        </nav>
        <Link onClick={close} className="button button-dark" href="/#kontakt">
          {site.cta}
          <Arrow diagonal />
        </Link>
        <p className="menu-note">Packshot. Detal. Prezentacja produktu.</p>
      </dialog>
    </>
  );
}
