import { test } from "node:test";
import assert from "node:assert/strict";
import {
  privacyNotice,
  dataController,
  privacySections,
  contactPrivacyNotice,
} from "../../src/content/privacy";
import { contactMode } from "../../src/lib/contact";

test("confirmed controller and contact do not imply legal approval or activate real enquiries", () => {
  assert.equal(dataController.name, "Piotr Pozdrowicz");
  assert.equal(dataController.email, "pozdrowicz@gmail.com");
  assert.equal(privacyNotice.approved, false);
  assert.equal(
    contactMode(
      { NETLIFY: "true", CONTACT_FORM_ENABLED: "true", CONTEXT: "production" },
      privacyNotice.approved,
    ),
    "disabled",
  );
  assert.match(
    contactPrivacyNotice,
    /Administratorem Twoich danych osobowych jest Piotr Pozdrowicz/,
  );
});

test("privacy has fourteen distinct sections, real mailto links and no fictional fields or retention promises", () => {
  assert.equal(privacySections.length, 14);
  assert.equal(new Set(privacySections.map((section) => section.id)).size, 14);
  const controller = privacySections.find((section) => section.id === "administrator")!;
  assert.ok(
    controller.paragraphs.some(
      (p) => typeof p !== "string" && p.link.href === "mailto:pozdrowicz@gmail.com",
    ),
  );
  const text = JSON.stringify(privacySections);
  assert.doesNotMatch(text, /\[P-0|do uzupełnienia|NIP:|REGON:|KRS:|12 miesięcy/);
  assert.match(text, /Nie przyjęto jeszcze jednolitego okresu/);
  assert.match(text, /Nie potwierdzono ich dostarczania/);
  assert.match(text, /Formularz nie ma przesyłania plików/);
  assert.match(text, /art\. 6 ust\. 1 lit\. b RODO/);
  assert.match(text, /art\. 6 ust\. 1 lit\. f RODO/);
});
