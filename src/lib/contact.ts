export const contactFormName = "product-enquiry";
export const contactEndpoint = "/__forms.html";
export type ContactFields = { name: string; email: string; message: string; productLink: string };
export type ContactErrors = Partial<Record<keyof ContactFields, string>>;

export function contactMode(env: Record<string, string | undefined>, privacyApproved: boolean) {
  if (env.NETLIFY !== "true" || env.CONTACT_FORM_ENABLED !== "true") return "disabled";
  if (env.CONTACT_FORM_TEST_MODE === "true" && env.CONTEXT !== "production") return "test";
  return privacyApproved ? "live" : "disabled";
}

export function isSyntheticEnquiry(fields: ContactFields) {
  return (
    fields.name.startsWith("TEST TECHNICZNY") &&
    fields.email === "test@example.com" &&
    fields.message.startsWith("[TEST OFERTASTUDIO]") &&
    (!fields.productLink || fields.productLink === "https://example.com/product")
  );
}

export function validateContact(fields: ContactFields): ContactErrors {
  const errors: ContactErrors = {};
  if (fields.name.trim().length < 2) errors.name = "Podaj imię lub nazwę firmy (minimum 2 znaki).";
  else if (fields.name.length > 120) errors.name = "Skróć nazwę do 120 znaków.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim()))
    errors.email = "Wpisz poprawny adres e-mail, np. imie@firma.pl.";
  if (fields.message.trim().length < 10)
    errors.message = "Napisz kilka słów o produkcie (minimum 10 znaków).";
  else if (fields.message.length > 3000) errors.message = "Skróć wiadomość do 3000 znaków.";
  if (fields.productLink.trim()) {
    try {
      const url = new URL(fields.productLink);
      if (!["http:", "https:"].includes(url.protocol)) throw new Error();
    } catch {
      errors.productLink = "Podaj pełny link zaczynający się od https:// lub http://.";
    }
  }
  return errors;
}
