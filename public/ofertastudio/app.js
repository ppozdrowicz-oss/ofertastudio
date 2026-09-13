"use strict";
const $ = (s, scope = document) => scope.querySelector(s);
const $$ = (s, scope = document) => [...scope.querySelectorAll(s)];
const openModal = (dialog) => {
  dialog.showModal();
  document.body.classList.add("modal-open");
};
$$("dialog").forEach((dialog) => {
  $$(".close-dialog", dialog).forEach((button) =>
    button.addEventListener("click", () => dialog.close()),
  );
  dialog.addEventListener("close", () => {
    if (!document.querySelector("dialog[open]"))
      document.body.classList.remove("modal-open");
  });
  dialog.addEventListener("click", (event) => {
    if (event.target !== dialog) return;
    const r = dialog.getBoundingClientRect();
    if (
      event.clientX < r.left ||
      event.clientX > r.right ||
      event.clientY < r.top ||
      event.clientY > r.bottom
    )
      dialog.close();
  });
});
$$("[data-dialog]").forEach((button) =>
  button.addEventListener("click", () =>
    openModal($("#" + button.dataset.dialog + "-dialog")),
  ),
);
const toggle = $(".menu-toggle"),
  mobileNav = $("#mobile-nav");
const closeMenu = () => {
  toggle.setAttribute("aria-expanded", "false");
  toggle.setAttribute("aria-label", "Otwórz menu");
  mobileNav.hidden = true;
};
toggle.addEventListener("click", () => {
  const open = toggle.getAttribute("aria-expanded") !== "true";
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "Zamknij menu" : "Otwórz menu");
  mobileNav.hidden = !open;
});
$$("a", mobileNav).forEach((link) => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !mobileNav.hidden) {
    closeMenu();
    toggle.focus();
  }
});
document.addEventListener("click", (event) => {
  if (!mobileNav.hidden && !event.target.closest(".header")) closeMenu();
});
const compactNavigation = window.matchMedia("(max-width: 1100px)");
compactNavigation.addEventListener("change", (event) => {
  if (!event.matches) {
    const menuHasFocus = mobileNav.contains(document.activeElement);
    closeMenu();
    if (menuHasFocus) $(".desktop-nav a").focus();
  }
});
const compare = $(".compare-range");
compare.addEventListener("input", () => {
  compare
    .closest(".comparison")
    .style.setProperty("--split", compare.value + "%");
  compare.setAttribute(
    "aria-valuetext",
    compare.value + " procent obrazu przed zmianą",
  );
});
const packageBox = $("#chosen-package");
$$("[data-choice]").forEach((link) =>
  link.addEventListener("click", () => {
    $("#problem-select").value = link.dataset.choice;
  }),
);
$$("[data-package]").forEach((link) =>
  link.addEventListener("click", () => {
    packageBox.hidden = false;
    $("span", packageBox).textContent =
      "Interesuje Cię: " + link.dataset.package;
    packageBox.dataset.package = link.dataset.package;
    $("#package-input").value = link.dataset.package;
    const mapping = {
      TEKST: "Wejścia bez zamówień",
      FOTO: "Zdjęcia nie pokazują jakości",
      "OFERTA PRO": "Wejścia bez zamówień",
      STUDIO: "Wejścia bez zamówień",
      ABONAMENT: "Potrzebuję pomocy przy wielu ofertach",
      START: "Nie wiem / inny problem",
    };
    $("#problem-select").value = mapping[link.dataset.package] || "";
  }),
);
$("button", packageBox).addEventListener("click", () => {
  packageBox.hidden = true;
  delete packageBox.dataset.package;
  $("#package-input").value = "";
});
const form = $("#contact-form");
form.noValidate = true;
let submitting = false;
const setError = (input, id, message) => {
  input.setAttribute("aria-invalid", String(!!message));
  $(id).textContent = message;
};
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (submitting) return;
  const status = $("#form-status"),
    error = $("#form-error");
  status.textContent = "";
  error.textContent = "";
  const url = $("#offer-url"),
    message = $("#message"),
    email = $("#email");
  let urlError = "",
    messageError = "",
    emailError = "";
  if (url.value.trim()) {
    try {
      const u = new URL(url.value.trim());
      if (
        !["https:", "http:"].includes(u.protocol) ||
        !u.hostname.includes(".")
      )
        throw new Error();
    } catch {
      urlError = "Podaj pełny adres zaczynający się od https:// lub http://.";
    }
  }
  if (!url.value.trim() && !message.value.trim())
    messageError = "Dodaj link albo napisz krótko, czego potrzebujesz.";
  if (!email.value.trim())
    emailError = "Podaj e-mail, na który możemy odpowiedzieć.";
  else if (!email.validity.valid)
    emailError = "Sprawdź adres e-mail, np. nazwa@firma.pl.";
  setError(url, "#url-error", urlError);
  setError(message, "#message-error", messageError);
  setError(email, "#email-error", emailError);
  if (urlError || messageError || emailError) {
    [url, message, email]
      .find((input) => input.getAttribute("aria-invalid") === "true")
      .focus();
    return;
  }
  const data = new FormData(form);
  data.set("email", email.value.trim());
  data.set("url", url.value.trim());
  data.set("message", message.value.trim());
  data.set(
    "package",
    packageBox.hidden ? "" : packageBox.dataset.package || "",
  );
  const controls = $$("input, textarea, select, button", form);
  const disabledStates = controls.map((control) => control.disabled);
  const submitButton = $(".submit-button", form);
  const buttonLabel = submitButton.firstChild.textContent;
  submitting = true;
  controls.forEach((control) => {
    control.disabled = true;
  });
  form.setAttribute("aria-busy", "true");
  submitButton.firstChild.textContent = "Wysyłanie… ";
  status.textContent = "Wysyłamy Twoją wiadomość…";
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);
  let accepted = false;
  try {
    const response = await fetch(form.action, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(data).toString(),
      signal: controller.signal,
    });
    if (!response.ok) throw new Error("Form submission failed");
    accepted = true;
  } catch {
    error.textContent =
      "Nie udało się potwierdzić wysłania wiadomości. Twoje dane pozostają w formularzu. Spróbuj ponownie za chwilę.";
  } finally {
    clearTimeout(timeout);
    controls.forEach((control, index) => {
      control.disabled = disabledStates[index];
    });
    form.removeAttribute("aria-busy");
    submitButton.firstChild.textContent = buttonLabel;
    status.textContent = "";
    submitting = false;
  }
  if (!accepted) return;
  const summary = $("#form-summary");
  summary.replaceChildren();
  const add = (label, value) => {
    if (!value) return;
    const p = document.createElement("p"),
      b = document.createElement("strong");
    b.textContent = label;
    p.append(b, document.createTextNode(value));
    summary.append(p);
  };
  add("Wybrana sytuacja", data.get("problem") || "Do omówienia");
  add("Pakiet", data.get("package"));
  add("E-mail", data.get("email"));
  add("Oferta / strona", data.get("url"));
  form.reset();
  packageBox.hidden = true;
  delete packageBox.dataset.package;
  openModal($("#form-dialog"));
});
$$("input,textarea", form).forEach((input) =>
  input.addEventListener("input", () => {
    if (input.getAttribute("aria-invalid") === "true") {
      input.setAttribute("aria-invalid", "false");
      const error = input.parentElement.querySelector(".field-error");
      if (error) error.textContent = "";
    }
  }),
);
let heroVisible = true,
  contactVisible = false;
const sticky = $(".mobile-sticky");
const updateSticky = () =>
  sticky.classList.toggle("visible", !heroVisible && !contactVisible);
new IntersectionObserver(
  (entries) => {
    heroVisible = entries[0].isIntersecting;
    updateSticky();
  },
  { threshold: 0 },
).observe($(".hero"));
new IntersectionObserver(
  (entries) => {
    contactVisible = entries[0].isIntersecting;
    updateSticky();
  },
  { threshold: 0 },
).observe($("#kontakt"));
