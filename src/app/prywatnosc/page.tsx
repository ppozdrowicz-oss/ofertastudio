import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";
import { privacyNotice, privacySections } from "@/content/privacy";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Polityka prywatności",
  alternates: { canonical: "/prywatnosc" },
  robots: { index: false, follow: false },
};

export default function Privacy() {
  return (
    <div id="top">
      <Header />
      <main id="main" className="legal-page section-pad">
        <span className="eyebrow">OfertaStudio.pl / Prywatność</span>
        <h1>Polityka prywatności OfertaStudio.pl</h1>
        <p className="legal-version">
          Wersja z dnia <time dateTime={privacyNotice.revisedAt}>14 października 2026 r.</time>
        </p>
        {!privacyNotice.approved && (
          <p className="legal-status">
            Wersja do zatwierdzenia przez administratora. Wysyłka zapytań klientów w interfejsie
            strony pozostaje wyłączona. Dokument nie został oznaczony jako zatwierdzony prawnie.
          </p>
        )}
        <nav className="legal-contents" aria-label="Spis treści polityki prywatności">
          <ol>
            {privacySections.map(({ id, title }) => (
              <li key={id}>
                <a href={`#${id}`}>{title}</a>
              </li>
            ))}
          </ol>
        </nav>
        {privacySections.map(({ id, title, paragraphs, items }, index) => (
          <section key={id} aria-labelledby={`${id}-title`} id={id}>
            <h2 id={`${id}-title`}>
              {index + 1}. {title}
            </h2>
            {id === "formularz" && (
              <p className="legal-status">
                {site.formTestMode
                  ? "To środowisko testowe: można wysłać wyłącznie oznaczone dane syntetyczne. Nie podawaj rzeczywistych danych ani materiałów klientów."
                  : site.formsEnabled
                    ? "Wysyłka przez formularz jest włączona."
                    : "Wysyłka jest wyłączona. Wpisana treść pozostaje w przeglądarce i nie jest wysyłana do Netlify Forms."}
              </p>
            )}
            {paragraphs.map((paragraph, i) => (
              <p key={i}>
                {typeof paragraph === "string" ? (
                  paragraph
                ) : (
                  <>
                    {paragraph.text}
                    <a href={paragraph.link.href}>{paragraph.link.label}</a>
                    {paragraph.after}
                  </>
                )}
              </p>
            ))}
            {items && (
              <ul>
                {items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
        <Link href="/#kontakt" className="text-link">
          Wróć do formularza ↗
        </Link>
      </main>
      <Footer />
    </div>
  );
}
