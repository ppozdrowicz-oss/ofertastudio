import { ContactForm } from "@/components/forms/ContactForm";
import { site } from "@/content/site";

export function Contact() {
  return (
    <section className="contact section-pad" id="kontakt" aria-labelledby="contact-title">
      <span className="eyebrow">05 — Zacznijmy od produktu</span>
      <div className="contact-layout">
        <div className="contact-copy">
          <h2 id="contact-title">
            Zobaczmy,
            <br />
            co możemy
            <br />
            <em>pokazać.</em>
          </h2>
          <p>
            Masz produkt. My mamy pomysł,
            <br />
            jak wydobyć z niego więcej.
          </p>
          <p className="contact-hint">
            Wyślij krótki opis i link do zdjęcia.
            <br />
            To wystarczy, żeby zacząć.
          </p>
          {site.email && (
            <a className="text-link" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          )}
        </div>
        <ContactForm enabled={site.formsEnabled} testMode={site.formTestMode} />
      </div>
    </section>
  );
}
