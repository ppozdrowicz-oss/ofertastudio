import { readFile, writeFile } from "node:fs/promises";

import {
  escapeHtml as e,
  renderProblemDetail,
} from "../public/ofertastudio/problem-view.js";
import { problems, problemStories } from "../public/ofertastudio/problems.js";

const arrow = '<svg aria-hidden="true"><use href="#arrow" /></svg>';
const photo = (className = "") =>
  `<img class="${className}" src="/ofertastudio/assets/bottle.webp" width="1254" height="1254" loading="lazy" alt="" draggable="false" />`;
const lines =
  '<span class="visual-line"></span><span class="visual-line short"></span>';
const windowTop = '<div class="visual-window-top"><i></i><i></i><i></i></div>';
// Explanatory illustrations, never client work or invented metrics.
function visual(kind) {
  switch (kind) {
    case "attention":
      return `<div class="visual-listings">${[0, 1, 2].map((n) => `<div class="visual-listing ${n === 1 ? "is-focus" : ""}">${photo()}${lines}</div>`).join("")}</div><span class="visual-caption">Którą ofertę zauważysz?</span>`;
    case "photos":
      return `<div class="visual-photo-pair"><div>${photo("small-product")}<span>Produkt ginie w kadrze</span></div><div>${photo()}<span>Jakość staje się widoczna</span></div></div>`;
    case "decision":
      return `<div class="visual-decision">${photo()}<div><span class="visual-kicker">PRZED DECYZJĄ</span><strong>Czy to produkt dla mnie?</strong><span>Co go wyróżnia?</span><span>Który wariant wybrać?</span><span>Co dostanę w zestawie?</span></div></div>`;
    case "time":
      return `<div class="visual-queue"><div><span>DO PRZYGOTOWANIA</span><strong>Kolejny produkt.</strong></div>${["Zdjęcia", "Opis i parametry", "Galeria", "Publikacja"].map((s, i) => `<div><span>0${i + 1}</span><b>${s}</b><span>○</span></div>`).join("")}</div>`;
    case "allegro":
      return `<div class="visual-window">${windowTop}<div class="visual-allegro"><img src="/ofertastudio/assets/allegro.svg" width="90" height="30" loading="lazy" alt="" /><span>Twoja pierwsza oferta</span></div><div class="visual-product">${photo()}<div><strong>Zacznij od produktu.</strong><p>Zdjęcia. Tytuł. Parametry.</p>${lines}</div></div></div>`;
    case "shoper":
      return `<div class="visual-window">${windowTop}<div class="visual-allegro"><img src="/ofertastudio/assets/shoper.svg" width="82" height="24" loading="lazy" alt="" /><span>Sklep po Twojemu</span></div><div class="visual-shop-banner"><strong>Twoja marka.<br />Twój charakter.</strong>${photo()}</div><div class="visual-tags"><span>Menu</span><span>Kategorie</span><span>Koszyk</span></div></div>`;
    case "store":
      return `<div class="visual-own-store"><span class="visual-domain">twojamarka.pl</span><div>${photo()}<strong>Własne miejsce.<br />Pełna oferta.</strong></div><span class="visual-stamp">TWOJA MARKA W CENTRUM</span></div>`;
    case "website":
      return `<div class="visual-window">${windowTop}<div class="visual-page"><span class="visual-kicker">STRONA TWOJEJ FIRMY</span><strong>Wiadomo, co robisz.<br />Widać, dlaczego warto.</strong>${lines}<span class="visual-faux-button">Prosta droga do kontaktu ${arrow}</span></div></div>`;
    case "consistency":
      return `<div class="visual-channels">${["Allegro", "Sklep", "Strona"].map((s, i) => `<div class="visual-channel channel-${i}"><span>${s}</span>${photo()}${lines}</div>`).join("")}</div><span class="visual-caption">Trzy kanały. Jedna marka.</span>`;
    case "diagnosis":
      return `<div class="visual-diagnosis"><span>Zdjęcia?</span><span>Treść?</span><strong>Od czego<br />zacząć?</strong><span>Nawigacja?</span><span>Cała oferta?</span></div><span class="visual-caption">Najpierw pytania. Potem kierunek.</span>`;
    default:
      throw new Error(`Unknown visual: ${kind}`);
  }
}
function slides() {
  return problems
    .map(
      (
        p,
      ) => `<article class="problem-slide" id="${p.id}" data-problem="${p.id}" role="group" aria-roledescription="slajd" aria-label="${Number(p.number)} z ${problems.length}: ${e(p.title)}">
    <div class="slide-copy"><p class="slide-meta"><span>${p.number} / ${problems.length}</span><span>${e(p.category)}</span></p><h3>${e(p.title)}</h3><p class="slide-symptom">${e(p.symptom)}</p></div>
    <div class="problem-visual visual-${p.visual}" aria-hidden="true">${visual(p.visual)}</div>
    <a class="slide-cta text-link" href="#kontakt" data-detail="${p.id}">Zobacz, gdzie może być problem ${arrow}</a>
    </article>`,
    )
    .join("\n");
}
function stories() {
  const approved = problemStories.filter((s) => s.approved);
  if (!approved.length) return "";
  return `<section class="section container" id="historie" aria-labelledby="stories-title"><p class="eyebrow">HISTORIE PROBLEMÓW</p><h2 id="stories-title">Od problemu do zmiany.</h2>${approved
    .map((s) => {
      const p = problems.find((problem) => problem.id === s.problemId);
      if (!p || !s.evidence || !s.before?.src || !s.after?.src)
        throw new Error("Case study needs real materials and evidence");
      return `<article class="problem-story"><h3>${e(s.title)}</h3><p><strong>Problem:</strong> ${e(p.title)}</p><p><strong>Diagnoza:</strong> ${e(s.diagnosis)}</p><h4>Co zmieniliśmy</h4><ul>${s.changes.map((c) => `<li>${e(c)}</li>`).join("")}</ul><div class="story-images">${[s.before, s.after].map((img) => `<img src="${e(img.src)}" alt="${e(img.alt)}" width="${Number(img.width)}" height="${Number(img.height)}" loading="lazy" />`).join("")}</div><p><strong>Rezultat:</strong> ${e(s.result)}</p><p>${e(s.evidence)}</p></article>`;
    })
    .join("")}</section>`;
}
const path = new URL("../public/ofertastudio/index.html", import.meta.url);
let html = await readFile(path, "utf8");
const blocks = {
  slides: slides(),
  detail: renderProblemDetail(problems[0]),
  options:
    '<option value="">Wybierz sytuację</option>' +
    problems
      .map(
        (p) =>
          `<option value="${e(p.title)}" data-problem-id="${p.id}">${e(p.title)}</option>`,
      )
      .join(""),
  stories: stories(),
};
for (const [name, content] of Object.entries(blocks)) {
  const pattern = new RegExp(
    `<!-- generated:${name} -->[\\s\\S]*?<!-- /generated:${name} -->`,
  );
  if (!pattern.test(html)) throw new Error(`Missing homepage slot: ${name}`);
  html = html.replace(
    pattern,
    `<!-- generated:${name} -->\n${content}\n<!-- /generated:${name} -->`,
  );
}
const { format } = await import("prettier");
html = await format(html, {
  ...JSON.parse(
    await readFile(new URL("../.prettierrc.json", import.meta.url)),
  ),
  parser: "html",
});
if (process.argv.includes("--check")) {
  if (html !== (await readFile(path, "utf8")))
    throw new Error("Homepage data changed: run npm run homepage:generate");
} else await writeFile(path, html);
console.log(
  `Homepage: ${problems.length} problems; ${problemStories.filter((s) => s.approved).length} approved stories.`,
);
