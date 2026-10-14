import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { validateContact, contactFormName } from "../../src/lib/contact";
import { media } from "../../src/content/media";
import sharp from "sharp";

const valid = {
  name: "Żaneta Łącka",
  email: "kontakt+studio@example.pl",
  message: "Proszę o wycenę sześciu ujęć produktów.",
  productLink: "",
};

test("accepts Polish names, email aliases and an optional empty link", () =>
  assert.deepEqual(validateContact(valid), {}));
test("validates every required field before any submission", () =>
  assert.deepEqual(
    Object.keys(
      validateContact({ name: " ", email: "wrong", message: " ", productLink: "" }),
    ).sort(),
    ["email", "message", "name"],
  ));
test("rejects javascript, data and file links", () => {
  for (const productLink of [
    "javascript:alert(1)",
    "data:text/html,hello",
    "file:///private/product.jpg",
  ])
    assert.ok(validateContact({ ...valid, productLink }).productLink);
});
test("accepts public http/https links without imposing a particular file host", () => {
  for (const productLink of [
    "https://example.pl/żółty-produkt.jpg?view=1",
    "http://example.pl/produkt",
  ])
    assert.equal(validateContact({ ...valid, productLink }).productLink, undefined);
});
test("caps the length of submitted name and message", () => {
  const errors = validateContact({ ...valid, name: "x".repeat(121), message: "x".repeat(3001) });
  assert.ok(errors.name);
  assert.ok(errors.message);
});
test("rejects whitespace-only messages and malformed emails", () => {
  assert.ok(validateContact({ ...valid, message: "             " }).message);
  for (const email of ["a@", "@example.pl", "a b@example.pl", "a@example"])
    assert.ok(validateContact({ ...valid, email }).email);
});
test("the Netlify discovery form contains the same fields and honeypot as the client", () => {
  const html = readFileSync("public/__forms.html", "utf8");
  assert.ok(html.includes(`name="${contactFormName}"`));
  for (const name of ["form-name", "name", "email", "message", "productLink", "website"])
    assert.ok(html.includes(`name="${name}"`), name);
  assert.ok(html.includes('data-netlify="true"'));
  assert.ok(html.includes('netlify-honeypot="website"'));
});
test("all media exists, preserves dimensions and labels concept assets accurately", () => {
  for (const asset of Object.values(media)) {
    assert.ok(existsSync(`public${asset.src}`), asset.src);
    assert.ok(asset.width > 0 && asset.height > 0);
    assert.ok(asset.alt.trim().length > 0);
    assert.equal(asset.alt.startsWith("Makieta koncepcyjna:"), asset.isStudy);
  }
  assert.equal(media.sneaker.width, media.sneakerBefore.width);
  assert.equal(media.sneaker.height, media.sneakerBefore.height);
});

test("the 15 original photographs and precision macro decode with the dimensions declared by the media model", async () => {
  assert.equal(Object.keys(media).length, 16);
  for (const asset of Object.values(media)) {
    assert.equal(asset.isStudy, false, asset.src);
    assert.equal(asset.src, asset.finalPath);
    const metadata = await sharp(`public${asset.src}`).metadata();
    assert.equal(metadata.format, "webp");
    assert.equal(metadata.width, asset.width, asset.src);
    assert.equal(metadata.height, asset.height, asset.src);
    await sharp(`public${asset.src}`).resize(1, 1).raw().toBuffer();
  }
});
import { contactMode, isSyntheticEnquiry } from "../../src/lib/contact";

test("live enquiries require Netlify, explicit enablement and approved privacy", () => {
  const live = { NETLIFY: "true", CONTACT_FORM_ENABLED: "true", CONTEXT: "production" };
  assert.equal(contactMode(live, false), "disabled");
  assert.equal(contactMode(live, true), "live");
  assert.equal(contactMode({ ...live, NETLIFY: "false" }, true), "disabled");
  assert.equal(contactMode({ ...live, CONTACT_FORM_ENABLED: "false" }, true), "disabled");
  assert.equal(contactMode({ ...live, CONTACT_FORM_TEST_MODE: "true" }, false), "disabled");
  assert.equal(
    contactMode({ ...live, CONTEXT: "deploy-preview", CONTACT_FORM_TEST_MODE: "true" }, false),
    "test",
  );
});

test("staging form accepts only clearly identified synthetic test payloads", () => {
  const synthetic = {
    name: "TEST TECHNICZNY RC",
    email: "test@example.com",
    message: "[TEST OFERTASTUDIO] Próba zapisu",
    productLink: "",
  };
  assert.equal(isSyntheticEnquiry(synthetic), true);
  assert.equal(isSyntheticEnquiry({ ...synthetic, email: "customer@example.org" }), false);
  assert.equal(isSyntheticEnquiry({ ...synthetic, name: "Zapytanie klienta" }), false);
  assert.equal(
    isSyntheticEnquiry({ ...synthetic, productLink: "https://other.example/product" }),
    false,
  );
});
