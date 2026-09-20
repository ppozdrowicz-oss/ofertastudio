export const escapeHtml = (text) =>
  String(text).replace(
    /[&<>"']/g,
    (char) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        char
      ],
  );
const list = (items) =>
  `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
export function renderProblemDetail(problem) {
  return `<div class="diagnosis-intro"><p class="eyebrow">TWÓJ PROBLEM / ${problem.number}</p>
    <h3 id="diagnosis-title" tabindex="-1">${escapeHtml(problem.title)}</h3><p>${escapeHtml(problem.intro)}</p></div>
    <div class="diagnosis-columns">
      <div><h4><span>01</span> Co może być przyczyną?</h4>${list(problem.causes)}</div>
      <div><h4><span>02</span> Co sprawdzimy?</h4>${list(problem.checks)}</div>
      <div><h4><span>03</span> Co możemy zrobić?</h4>${list(problem.solutions)}<p class="diagnosis-note">Zakres dobieramy po ocenie. Nie zakładamy, że potrzebujesz wszystkiego.</p></div>
    </div>
    <div class="diagnosis-result"><div><p class="eyebrow">JAK POWINIEN WYGLĄDAĆ REZULTAT?</p><p>${escapeHtml(problem.result)}</p></div>
      <div class="diagnosis-action"><a class="button" href="#kontakt" data-problem-contact="${problem.id}">${escapeHtml(problem.cta)}<svg aria-hidden="true"><use href="#arrow" /></svg></a><small>Wstępna ocena jednej oferty: 0 zł</small></div></div>`;
}
