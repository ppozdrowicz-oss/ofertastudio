"use client";

import { useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { contactPrivacyNotice } from "@/content/privacy";
import { Arrow } from "@/components/layout/Arrow";
import {
  contactEndpoint,
  contactFormName,
  validateContact,
  isSyntheticEnquiry,
  type ContactErrors,
  type ContactFields,
} from "@/lib/contact";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm({
  enabled,
  testMode = false,
}: {
  enabled: boolean;
  testMode?: boolean;
}) {
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const statusRef = useRef<HTMLDivElement>(null);
  const busy = useRef(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy.current) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const fields = Object.fromEntries(
      ["name", "email", "message", "productLink"].map((key) => [
        key,
        String(data.get(key) || "").trim(),
      ]),
    ) as ContactFields;
    const nextErrors = validateContact(fields);
    setErrors(nextErrors);
    setStatus("idle");
    if (Object.keys(nextErrors).length) {
      form.querySelector<HTMLInputElement>(`[name="${Object.keys(nextErrors)[0]}"]`)?.focus();
      return;
    }
    if (!enabled) {
      setStatus("error");
      setMessage(
        "To podgląd nowej strony. Wysyłka nie jest jeszcze aktywna. Twoja wiadomość nie została wysłana.",
      );
      return;
    }
    if (testMode && !isSyntheticEnquiry(fields)) {
      setStatus("error");
      setMessage(
        "To formularz testowy. Użyj nazwy zaczynającej się od TEST TECHNICZNY, adresu test@example.com i wiadomości zaczynającej się od [TEST OFERTASTUDIO]. Link pozostaw pusty lub wpisz https://example.com/product. Nie wpisuj rzeczywistych danych.",
      );
      return;
    }
    if (data.get("website")) {
      setStatus("error");
      setMessage("Nie udało się wysłać wiadomości. Odśwież stronę i spróbuj ponownie.");
      return;
    }
    busy.current = true;
    setStatus("submitting");
    try {
      const body = new URLSearchParams({ "form-name": contactFormName, website: "", ...fields });
      const response = await fetch(contactEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
        signal: AbortSignal.timeout(15000),
      });
      const result = await response.text();
      if (!response.ok || result.includes("ofertastudio-static-form-definition"))
        throw new Error("Submission not accepted");
      setStatus("success");
      form.reset();
      requestAnimationFrame(() => statusRef.current?.focus());
    } catch {
      setStatus("error");
      setMessage(
        "Nie udało się potwierdzić wysyłki. Sprawdź połączenie i spróbuj ponownie. Twoja wiadomość pozostała w formularzu.",
      );
    } finally {
      busy.current = false;
    }
  }

  const field = (name: keyof ContactFields) => ({
    "aria-invalid": !!errors[name],
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
    onInput: () => {
      if (errors[name]) setErrors((previous) => ({ ...previous, [name]: undefined }));
    },
  });
  return (
    <div className="contact-form-wrap">
      {status === "success" ? (
        <div ref={statusRef} tabIndex={-1} className="form-success" role="status">
          <span className="eyebrow">Wiadomość wysłana</span>
          <h3>{testMode ? "Zapis testowy przyjęty." : "Teraz nasza kolej."}</h3>
          <p>
            {testMode
              ? "Serwer zaakceptował test. Odbiór zapisu należy potwierdzić w panelu Netlify Forms."
              : "Otrzymaliśmy Twój opis produktu. Wrócimy z odpowiedzią na podany adres e-mail."}
          </p>
          <button
            className="text-link"
            onClick={() => {
              setStatus("idle");
              setErrors({});
            }}
          >
            Pokaż kolejny produkt
            <Arrow />
          </button>
        </div>
      ) : (
        <form
          name={contactFormName}
          method="POST"
          action={contactEndpoint}
          noValidate
          onSubmit={submit}
          aria-label="Pokaż nam swój produkt"
          aria-busy={status === "submitting"}
        >
          {testMode && (
            <p className="form-preview-note">
              Test techniczny — wyłącznie dane testowe. Formularz nie przyjmuje zapytań klientów.
            </p>
          )}
          <input type="hidden" name="form-name" value={contactFormName} />
          <div hidden>
            <label>
              Nie wypełniaj tego pola
              <input name="website" tabIndex={-1} autoComplete="off" />
            </label>
          </div>
          <div className="form-row">
            <div className="form-field">
              <label htmlFor="contact-name">
                Imię lub firma <span>*</span>
              </label>
              <input
                id="contact-name"
                name="name"
                autoComplete="name"
                maxLength={120}
                placeholder="Jak się do Ciebie zwracać?"
                required
                {...field("name")}
              />
              {errors.name && (
                <p id="name-error" className="field-error">
                  {errors.name}
                </p>
              )}
            </div>
            <div className="form-field">
              <label htmlFor="contact-email">
                E-mail <span>*</span>
              </label>
              <input
                type="email"
                id="contact-email"
                name="email"
                autoComplete="email"
                maxLength={254}
                placeholder="imie@firma.pl"
                required
                {...field("email")}
              />
              {errors.email && (
                <p id="email-error" className="field-error">
                  {errors.email}
                </p>
              )}
            </div>
          </div>
          <div className="form-field">
            <label htmlFor="contact-message">
              Co chcesz pokazać? <span>*</span>
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={3}
              maxLength={3000}
              placeholder="Jaki produkt, ile ujęć, gdzie chcesz je wykorzystać…"
              required
              {...field("message")}
            />
            {errors.message && (
              <p id="message-error" className="field-error">
                {errors.message}
              </p>
            )}
          </div>
          <div className="form-field">
            <label htmlFor="contact-link">
              Link do produktu lub zdjęcia <span className="optional">opcjonalnie</span>
            </label>
            <input
              type="url"
              id="contact-link"
              name="productLink"
              inputMode="url"
              autoComplete="url"
              maxLength={2000}
              placeholder="https://"
              {...field("productLink")}
            />
            {errors.productLink && (
              <p id="productLink-error" className="field-error">
                {errors.productLink}
              </p>
            )}
          </div>
          <div className="form-bottom">
            <p>
              {contactPrivacyNotice} <Link href="/prywatnosc">Polityce prywatności</Link>.
            </p>
            <button type="submit" disabled={status === "submitting"} className="button button-dark">
              {status === "submitting" ? "Wysyłamy…" : "Wyślij zapytanie"}
              <Arrow diagonal />
            </button>
          </div>
          <div className="form-status">
            {status === "error" && (
              <p className="form-error" role="alert">
                {message}
              </p>
            )}
          </div>
          {!enabled && (
            <p className="form-preview-note">
              Wersja podglądowa — wysyłka jest jeszcze nieaktywna.
            </p>
          )}
          <noscript>
            <p>Włącz JavaScript, aby skorzystać z walidacji i wysyłki formularza.</p>
          </noscript>
        </form>
      )}
    </div>
  );
}
