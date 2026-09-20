import { renderProblemDetail } from "./problem-view.js";
import { problemById, problems } from "./problems.js";

// No provider, cookies or network calls. Never include form contents or PII.
export function trackEvent(name, problemId = null) {
  document.dispatchEvent(
    new CustomEvent("ofertastudio:analytics", {
      detail: {
        event: name,
        ...(problemById.has(problemId) ? { problem_id: problemId } : {}),
      },
    }),
  );
}
const track = document.querySelector(".problem-track");
const slides = [...track.querySelectorAll(".problem-slide")];
const detail = document.querySelector("#problem-detail");
const select = document.querySelector("#problem-select");
const selectedBox = document.querySelector("#chosen-problem");
const problemField = document.querySelector("#problem-field");
const previous = document.querySelector(".previous-problem");
const next = document.querySelector(".next-problem");
const progress = document.querySelector(".explorer-progress");
const motion = matchMedia("(prefers-reduced-motion: reduce)");
let active = 0,
  selected = null,
  animation = 0,
  moving = false;
let settleTimer,
  explorerVisible = false,
  lastViewed = null;
export function chooseProblem(id) {
  const problem = problemById.get(id);
  selected = problem?.id || null;
  select.value = problem?.title || "";
  document.querySelector("#problem-id").value = selected || "";
  selectedBox.hidden = !problem;
  problemField.hidden = !!problem;
  selectedBox.querySelector("strong").textContent = problem?.title || "";
}
export const getChosenProblem = () => selected;
select.addEventListener("change", () => {
  const id = select.selectedOptions[0]?.dataset.problemId;
  chooseProblem(id);
  if (id) {
    trackEvent("problem_select", id);
    document.querySelector("#change-problem").focus({ preventScroll: true });
  }
});
document.querySelector("#change-problem").addEventListener("click", () => {
  chooseProblem(null);
  select.focus({ preventScroll: true });
});
document.addEventListener("click", (event) => {
  const cta = event.target.closest("[data-problem-contact]");
  if (!cta) return;
  const id = cta.dataset.problemContact;
  chooseProblem(id);
  trackEvent("problem_select", id);
  trackEvent("solution_cta_click", id);
});
function announceView() {
  if (explorerVisible && lastViewed !== active) {
    trackEvent("problem_slide_view", problems[active].id);
    lastViewed = active;
  }
}
function setActive(index, updateHistory = false) {
  const changed = active !== index;
  active = index;
  const problem = problems[active];
  const focusedSlide = document.activeElement?.closest(".problem-slide");
  slides.forEach((slide, i) => {
    slide.classList.toggle("is-active", i === index);
    slide.querySelector("[data-detail]").tabIndex = i === index ? 0 : -1;
  });
  document.querySelector(".explorer-count").textContent =
    `${problem.number} / ${problems.length}`;
  progress.setAttribute("aria-valuenow", String(index + 1));
  progress.style.setProperty(
    "--progress",
    `${((index + 1) / problems.length) * 100}%`,
  );
  previous.setAttribute("aria-disabled", String(index === 0));
  next.setAttribute("aria-disabled", String(index === problems.length - 1));
  if (changed) detail.innerHTML = renderProblemDetail(problem);
  detail.dataset.problem = problem.id;
  document.querySelector("#problem-announcement").textContent =
    `${index + 1} z ${problems.length}: ${problem.title}`;
  if (focusedSlide && focusedSlide !== slides[index])
    slides[index].querySelector("a").focus({ preventScroll: true });
  if (updateHistory && location.hash !== `#${problem.id}`)
    history.pushState({ problem: problem.id }, "", `#${problem.id}`);
  announceView();
}
const position = (index) => slides[index].offsetLeft - slides[0].offsetLeft;
function nearest() {
  return slides.reduce(
    (closest, _, i) =>
      Math.abs(position(i) - track.scrollLeft) <
      Math.abs(position(closest) - track.scrollLeft)
        ? i
        : closest,
    0,
  );
}
function stopMotion() {
  cancelAnimationFrame(animation);
  clearTimeout(settleTimer);
  moving = false;
  track.classList.remove("is-moving");
}
function goTo(index, { history = true, animate = true } = {}) {
  index = Math.max(0, Math.min(problems.length - 1, index));
  stopMotion();
  setActive(index, history);
  const start = track.scrollLeft,
    end = position(index);
  if (!animate || motion.matches || Math.abs(end - start) < 1) {
    track.scrollLeft = end;
    return;
  }
  moving = true;
  track.classList.add("is-moving");
  const startTime = performance.now();
  function frame(now) {
    const t = Math.min(1, (now - startTime) / 500);
    track.scrollLeft = start + (end - start) * (1 - Math.pow(1 - t, 3));
    if (t < 1) animation = requestAnimationFrame(frame);
    else stopMotion();
  }
  animation = requestAnimationFrame(frame);
}
previous.addEventListener("click", () => goTo(active - 1));
next.addEventListener("click", () => goTo(active + 1));
track.addEventListener("keydown", (event) => {
  const targets = {
    ArrowLeft: active - 1,
    ArrowRight: active + 1,
    Home: 0,
    End: problems.length - 1,
  };
  if (!(event.key in targets) || event.altKey || event.ctrlKey || event.metaKey)
    return;
  event.preventDefault();
  goTo(targets[event.key]);
});
track.addEventListener("click", (event) => {
  const cta = event.target.closest("[data-detail]");
  if (!cta) return;
  event.preventDefault();
  const index = problems.findIndex((p) => p.id === cta.dataset.detail);
  goTo(index);
  chooseProblem(problems[index].id);
  trackEvent("problem_select", problems[index].id);
  trackEvent("problem_detail_open", problems[index].id);
  detail.querySelector("h3").focus({ preventScroll: true });
  detail.scrollIntoView({
    behavior: motion.matches ? "instant" : "smooth",
    block: "start",
  });
});
track.addEventListener(
  "scroll",
  () => {
    if (moving || drag?.moved) return;
    clearTimeout(settleTimer);
    settleTimer = setTimeout(() => setActive(nearest(), true), 160);
  },
  { passive: true },
);
// Native touch and trackpad scrolling; capture only mouse dragging.
let drag = null,
  suppressClick = false;
track.addEventListener("pointerdown", (event) => {
  stopMotion();
  if (event.pointerType !== "mouse" || event.button !== 0) return;
  drag = {
    id: event.pointerId,
    startX: event.clientX,
    left: track.scrollLeft,
    moved: false,
  };
  suppressClick = false;
});
track.addEventListener("pointermove", (event) => {
  if (!drag || event.pointerId !== drag.id) return;
  const delta = event.clientX - drag.startX;
  if (!drag.moved && Math.abs(delta) < 6) return;
  drag.moved = true;
  track.setPointerCapture(event.pointerId);
  track.classList.add("is-dragging");
  track.scrollLeft = drag.left - delta;
});
function finishDrag(event) {
  if (!drag || event.pointerId !== drag.id) return;
  const moved = drag.moved;
  if (track.hasPointerCapture(drag.id)) track.releasePointerCapture(drag.id);
  drag = null;
  track.classList.remove("is-dragging");
  if (moved) {
    suppressClick = true;
    goTo(nearest());
    setTimeout(() => {
      suppressClick = false;
    }, 0);
  }
}
track.addEventListener("pointerup", finishDrag);
track.addEventListener("pointercancel", finishDrag);
track.addEventListener(
  "click",
  (event) => {
    if (suppressClick) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  },
  true,
);
track.addEventListener("wheel", stopMotion, { passive: true });
function readHash() {
  const index = problems.findIndex(
    (problem) => `#${problem.id}` === location.hash,
  );
  if (index < 0) return;
  goTo(index, { history: false, animate: false });
  requestAnimationFrame(() =>
    document.querySelector("#problemy").scrollIntoView({ behavior: "instant" }),
  );
}
window.addEventListener("hashchange", () => readHash());
window.addEventListener("popstate", () => readHash());
// Resizing must not choose a different problem when card widths change.
let trackWidth = track.clientWidth;
new ResizeObserver(() => {
  if (track.clientWidth === trackWidth) return;
  trackWidth = track.clientWidth;
  goTo(active, { history: false, animate: false });
}).observe(track);
motion.addEventListener("change", () =>
  goTo(active, { history: false, animate: false }),
);
document.querySelector(".explorer-controls").hidden = false;
setActive(0);
readHash();
let carouselSeen = false;
new IntersectionObserver(
  (entries) => {
    explorerVisible = entries[0].isIntersecting;
    if (!explorerVisible) return;
    if (!carouselSeen) {
      trackEvent("problem_carousel_view");
      carouselSeen = true;
    }
    announceView();
  },
  { threshold: 0.1 },
).observe(document.querySelector("#problemy"));
new IntersectionObserver(
  (entries, observer) => {
    if (!entries[0].isIntersecting) return;
    trackEvent("pricing_view");
    observer.disconnect();
  },
  { threshold: 0.1 },
).observe(document.querySelector("#cennik"));
const copy = document.querySelector("#copy-checklist");
copy.hidden = false;
copy.addEventListener("click", async () => {
  const text =
    "Spójrz na ofertę oczami klienta.\n\n" +
    [...document.querySelectorAll(".checklist li")]
      .map(
        (li, index) =>
          `${index + 1}. ${li.textContent
            .replace(/^\s*\d+\s*/, "")
            .replace(/\s+/g, " ")
            .trim()}`,
      )
      .join("\n");
  try {
    await navigator.clipboard.writeText(text);
    document.querySelector("#copy-status").textContent =
      "Gotowe — checklista skopiowana. Wklej ją do wiadomości lub swoich notatek.";
    trackEvent("checklist_copy");
  } catch {
    document.querySelector("#copy-status").textContent =
      "Nie udało się skopiować automatycznie. Zaznacz pytania obok i skopiuj je ręcznie.";
  }
});
