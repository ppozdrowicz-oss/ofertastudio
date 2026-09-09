"use strict";
const problemData = {
  clicks: {
    label: "PIERWSZE WRAŻENIE",
    title: "Wyświetlenia są. Co z kliknięciami?",
    intro: "Przyjrzyjmy się temu, co klient widzi, zanim otworzy Twoją ofertę.",
    checks: [
      "Czy produkt jest czytelny na małej miniaturze?",
      "Czy tytuł od razu wyjaśnia, co sprzedajesz?",
      "Jak oferta wygląda na tle podobnych produktów?",
      "Czy cena i warunki dostawy mogą wpływać na wybór?",
    ],
    solution:
      "Możemy poprawić kadr, tło i skalę produktu oraz uporządkować tytuł.",
    note: "Jeśli masz statystyki wyświetleń i kliknięć, wykorzystamy je do dokładniejszej oceny.",
    choice: "Mało kliknięć",
  },
  sales: {
    label: "SIŁA OFERTY",
    title: "Kliknięcie to dopiero początek.",
    intro:
      "Sprawdźmy, czy oferta daje klientowi informacje potrzebne do decyzji.",
    checks: [
      "Czy wiadomo, do czego produkt służy i komu się przyda?",
      "Czy łatwo znaleźć wymiary, zgodność i zawartość zestawu?",
      "Czy galeria odpowiada na najważniejsze pytania?",
      "Czy zdjęcia i opis tworzą spójną całość?",
    ],
    solution:
      "Możemy przebudować galerię, wyeksponować korzyści i uporządkować treść oferty.",
    note: "Bierzemy też pod uwagę cenę, dostawę i dostępność. Sama prezentacja nie wyjaśnia każdego problemu ze sprzedażą.",
    choice: "Wejścia bez zamówień",
  },
  photos: {
    label: "PREZENTACJA PRODUKTU",
    title: "Pokaż jakość, którą masz.",
    intro:
      "Na żywo widać detale, proporcje i wykonanie. Pomóżmy klientowi zobaczyć je także na zdjęciach.",
    checks: [
      "Czy światło i kolor wiernie pokazują produkt?",
      "Czy kadr i skala eksponują istotne detale?",
      "Czy zdjęcia przedstawiają właściwy wariant i wyposażenie?",
      "Co można przygotować z dostępnych materiałów?",
    ],
    solution:
      "Retusz, zdjęcie główne i spójna galeria, która wyraźnie pokazuje produkt oraz jego rzeczywiste właściwości.",
    note: "Jeśli materiał wymaga dodatkowych ujęć, powiemy Ci, czego potrzebujemy.",
    choice: "Zdjęcia nie pokazują jakości",
  },
  competition: {
    label: "POWÓD DO WYBORU",
    title: "Daj klientowi konkretny powód.",
    intro:
      "Podobna cena i podobny produkt? Poszukajmy rzeczywistej różnicy, którą warto pokazać.",
    checks: [
      "Które cechy mają znaczenie dla Twojego klienta?",
      "Co wyróżnia zastosowanie, materiał lub wyposażenie?",
      "Czy korzyści są konkretne i łatwe do zauważenia?",
      "Jak te same kwestie komunikuje konkurencja?",
    ],
    solution:
      "Możemy uporządkować argumenty i pokazać je w zdjęciach, infografikach oraz treści.",
    note: "Porównania opieramy na informacjach, które można potwierdzić.",
    choice: "Chcę lepiej pokazać zalety produktu",
  },
  time: {
    label: "TWÓJ CZAS",
    title: "Kolejne oferty? Zleć je nam.",
    intro:
      "Zdjęcia, parametry i opisy mogą powstawać według wspólnego, ustalonego standardu.",
    checks: [
      "Jakie materiały już masz?",
      "Co powtarza się w Twoim katalogu?",
      "Które produkty potrzebują indywidualnego podejścia?",
      "Ile ofert chcesz przygotowywać i w jakim rytmie?",
    ],
    solution:
      "Wzorcowa oferta, spójny standard galerii i treści oraz opracowanie kolejnych produktów w uzgodnionym zakresie.",
    note: "Możliwość publikacji i potrzebny dostęp do platformy ustalamy osobno.",
    choice: "Potrzebuję pomocy przy wielu ofertach",
  },
  website: {
    label: "CAŁY PROJEKT",
    title: "Zbudujmy miejsce dla Twojej oferty.",
    intro:
      "Nowa strona, własny sklep albo uporządkowanie Shopera. Zaczynamy od celu Twojego biznesu.",
    checks: [
      "Co klient ma zrobić: poznać ofertę, napisać czy kupić?",
      "Jakie treści i materiały już są gotowe?",
      "Jakich funkcji potrzebujesz na start?",
      "Co działa w obecnym rozwiązaniu, a co wymaga zmiany?",
    ],
    solution:
      "Strona internetowa, landing page, sklep lub pomoc w konfiguracji Shopera. Zakres dopasowany do projektu.",
    note: "Nie potrzebujesz gotowej specyfikacji. Krótki opis pomysłu wystarczy do pierwszej rozmowy.",
    choice: "Strona, sklep lub Shoper",
  },
};
const $ = (s, scope = document) => scope.querySelector(s);
const $$ = (s, scope = document) => [...scope.querySelectorAll(s)];
const problemDialog = $("#problem-dialog");
let activeProblem = null;
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
$$("[data-problem]").forEach((button) =>
  button.addEventListener("click", () => {
    activeProblem = problemData[button.dataset.problem];
    $("#problem-dialog-eyebrow").textContent = activeProblem.label;
    $("#problem-dialog-title").textContent = activeProblem.title;
    $("#problem-dialog-intro").textContent = activeProblem.intro;
    $("#problem-dialog-checks").replaceChildren(
      ...activeProblem.checks.map((text) => {
        const li = document.createElement("li");
        li.textContent = text;
        return li;
      }),
    );
    $("#problem-dialog-solution").textContent = activeProblem.solution;
    $("#problem-dialog-note").textContent = activeProblem.note;
    $("#problem-dialog-cta").firstChild.textContent =
      button.dataset.problem === "website"
        ? "Opisz swój projekt "
        : "Pokaż swoją ofertę ";
    openModal(problemDialog);
  }),
);
$("#problem-dialog-cta").addEventListener("click", () => {
  $("#problem-select").value = activeProblem.choice;
  problemDialog.close();
  $("#kontakt").scrollIntoView({
    behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "instant"
      : "smooth",
  });
});
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
  if (event.key === "Escape") closeMenu();
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
$("#copy-checklist").addEventListener("click", async () => {
  const text =
    "Checklista dobrej oferty — OfertaStudio\n\n" +
    $$(".checklist li")
      .map((li) =>
        li.textContent
          .replace(/^\s*\d+\s*/, "")
          .replace(/\s+/g, " ")
          .trim(),
      )
      .map((text, i) => `${i + 1}. ${text}`)
      .join("\n");
  try {
    await navigator.clipboard.writeText(text);
    $("#copy-message").textContent =
      "Checklista skopiowana. Wklej ją do notatek lub wiadomości.";
    $("#copy-checklist").firstChild.textContent = "Skopiowano ";
  } catch {
    $("#copy-message").textContent =
      "Zaznacz tekst checklisty i skopiuj go ręcznie.";
    const range = document.createRange();
    range.selectNodeContents($(".checklist"));
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  }
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
      "Nie udało się potwierdzić wysłania wiadomości. Twoje dane pozostają w formularzu. Spróbuj ponownie lub napisz na pozdrowicz@gmail.com.";
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
