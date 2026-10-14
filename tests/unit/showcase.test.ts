import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import sharp from "sharp";
import { offerCollections } from "../../src/content/showcase";
import { nearbySlides, slideOffset, wrapSlide } from "../../src/lib/showcase";

test("showcase wraps both ends and preserves one active and two adjacent slides", () => {
  assert.equal(wrapSlide(-17, 8), 7);
  assert.equal(wrapSlide(19, 8), 3);
  for (const count of [3, 4, 8])
    for (let active = 0; active < count; active++) {
      const offsets = Array.from({ length: count }, (_, i) => slideOffset(i, active, count));
      assert.equal(offsets.filter((n) => n === 0).length, 1);
      assert.equal(offsets.filter((n) => Math.abs(n) === 1).length, 2);
      assert.equal(new Set(nearbySlides(active, count)).size, 3);
    }
});

test("three complete offers contain eight ordered photographs each with unique paths and commercial captions", () => {
  assert.deepEqual(
    offerCollections.map((c) => c.id),
    ["sneaker", "perfume", "power-tool"],
  );
  const all = offerCollections.flatMap((c) => c.slides);
  assert.equal(new Set(all.map((s) => s.id)).size, 24);
  assert.equal(new Set(all.map((s) => s.image.src)).size, 24);
  for (const collection of offerCollections) {
    assert.equal(collection.slides.length, 8);
    assert.ok(collection.productName && collection.description);
    collection.slides.forEach((slide, i) => {
      assert.equal(slide.index, i + 1);
      assert.ok(
        slide.image.src.startsWith(
          `/media/offer-carousel/${collection.id}/${String(i + 1).padStart(2, "0")}-`,
        ),
      );
      assert.ok(existsSync(`public${slide.image.src}`), `Missing ${slide.image.src}`);
      for (const copy of [
        slide.title,
        slide.subtitle,
        slide.description,
        slide.commercialPurpose,
        slide.image.alt,
      ])
        assert.ok(copy.trim().length > 5);
    });
  }
});

test("all twenty-four supplied offer images fully decode as real WebP with the declared dimensions", async () => {
  for (const slide of offerCollections.flatMap((c) => c.slides)) {
    const file = readFileSync(`public${slide.image.src}`);
    assert.equal(file.subarray(0, 4).toString(), "RIFF");
    assert.equal(file.subarray(8, 12).toString(), "WEBP");
    const image = sharp(file, { failOn: "warning" });
    const metadata = await image.metadata();
    assert.equal(metadata.format, "webp");
    assert.equal(metadata.width, slide.image.width);
    assert.equal(metadata.height, slide.image.height);
    assert.equal(metadata.hasAlpha, false);
    await image.raw().toBuffer();
  }
});

test("captions follow current photographs without obsolete fragrance or screw-orientation warnings", () => {
  const [sneaker, perfume, tools] = offerCollections;
  assert.equal(sneaker.slides[3].subtitle, "Dodatkowa perspektywa");
  assert.equal(perfume.slides[4].reviewNote, undefined);
  assert.match(perfume.slides[4].image.alt, /wanilii Bourbon.*jaśmin.*benzoinowa/);
  assert.equal(perfume.slides[6].subtitle, "Produkt w dłoni");
  assert.equal(tools.slides[5].reviewNote, undefined);
  assert.doesNotMatch(JSON.stringify(tools.slides[5]), /wymaga korekty|błąd orientacji/);
  assert.equal(sneaker.slides[7].reviewNote, undefined);
  assert.doesNotMatch(JSON.stringify(sneaker.slides[7]), /VT QS|831114|wymaga korekty/);
});

test("Milwaukee titles, order and commercial explanations match the supplied kit", () => {
  const collection = offerCollections[2];
  assert.equal(collection.productName, "Milwaukee M18 FUEL");
  assert.equal(collection.title, "Narzędzia");
  assert.equal(collection.subtitle, "Profesjonalny zestaw elektronarzędzi");
  assert.deepEqual(
    collection.slides.map((slide) => slide.title),
    [
      "Kompletny zestaw. Jedno spojrzenie.",
      "Dwie konstrukcje. Jeden zestaw.",
      "Precyzja zaczyna się od detalu.",
      "Forma podporządkowana funkcji.",
      "Różnice, które widać od razu.",
      "Produkt w kontekście pracy.",
      "Ważne elementy zestawu. Bez domysłów.",
      "Technologia w mocnej oprawie.",
    ],
  );
  const subjects = [
    "oba narzędzia",
    "Dwa osobne",
    "uchwytu wiertarskiego",
    "rękojeść",
    "dwóch narzędzi",
    "scena warsztatowa",
    "Dwa akumulatory i ładowarka",
    "kompletny zestaw",
  ];
  collection.slides.forEach((slide, index) => {
    assert.ok(slide.description.includes(subjects[index]));
    assert.ok(!/\b\d+\s*(Nm|obr|rpm|W)\b/i.test(slide.description));
  });
});

test("the reviewed corrected Valentino graphic is the actual mapped file", () => {
  const image = offerCollections[1].slides[4].image;
  assert.equal(image.src, "/media/offer-carousel/perfume/05-information.webp");
  // This hash binds the visual review to the actual supplied raster. A replacement
  // requires reviewing its embedded text again, not merely changing the alt.
  assert.equal(
    createHash("sha256")
      .update(readFileSync(`public${image.src}`))
      .digest("hex"),
    "da78d3c50038687e58cf1518ba2ca255cd9afa590f1ec30b451d19a93d3ed0da",
  );
});

test("every photograph has individual expert reasoning, buyer value and three or four workshop concepts", () => {
  const slides = offerCollections.flatMap((collection) => collection.slides);
  for (const key of ["why", "buyerValue"] as const) {
    assert.equal(new Set(slides.map((slide) => slide.insights[key])).size, 24);
    for (const slide of slides) assert.ok(slide.insights[key].length > 25);
  }
  for (const slide of slides)
    assert.ok(slide.insights.workshop.length >= 3 && slide.insights.workshop.length <= 4);
  assert.equal(offerCollections[0].productName, "Nike Air Max 90");
  assert.match(offerCollections[0].slides[3].description, /innej perspektywy/);
  assert.ok(!/infografika|grafika informacyjna/i.test(offerCollections[0].slides[3].subtitle));
  assert.equal(offerCollections[0].slides[7].reviewNote, undefined);
});
