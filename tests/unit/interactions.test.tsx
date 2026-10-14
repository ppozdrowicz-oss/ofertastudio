import { afterEach, before, test, mock } from "node:test";
import assert from "node:assert/strict";
import { JSDOM } from "jsdom";
import { createRequire } from "node:module";
import { createElement } from "react";
import type { ImageProps } from "next/image";

const dom = new JSDOM("<!doctype html><html><body></body></html>", {
  url: "http://localhost:3100",
  pretendToBeVisual: true,
});
Object.assign(globalThis, {
  window: dom.window,
  self: dom.window,
  document: dom.window.document,
  HTMLElement: dom.window.HTMLElement,
  HTMLInputElement: dom.window.HTMLInputElement,
  FormData: dom.window.FormData,
  MouseEvent: dom.window.MouseEvent,
  requestAnimationFrame: dom.window.requestAnimationFrame.bind(dom.window),
  cancelAnimationFrame: dom.window.cancelAnimationFrame.bind(dom.window),
  IS_REACT_ACT_ENVIRONMENT: true,
});
Object.defineProperty(globalThis, "navigator", { value: dom.window.navigator, configurable: true });
const { render, screen, waitFor, cleanup, act } = await import("@testing-library/react");
const { default: userEvent } = await import("@testing-library/user-event");
// Next's bundler normalizes this CJS boundary. The DOM test uses a native image
// while the browser suite exercises actual next/image loading and dimensions.
const require = createRequire(import.meta.url);
const imagePath = require.resolve("next/image");
mock.module(imagePath, {
  defaultExport: function TestImage(props: ImageProps) {
    const { src, alt, width, height, className, sizes } = props;
    return createElement("img", {
      src: typeof src === "string" ? src : "",
      alt,
      width,
      height,
      className,
      sizes,
    });
  },
});
const { ContactForm } = await import("../../src/components/forms/ContactForm");
const { Comparison } = await import("../../src/components/experiences/Comparison");
const { ServiceSummary } = await import("../../src/components/sections/ServiceSummary");
const originalFetch = globalThis.fetch;
let consoleErrors: string[] = [];
let restoreConsole: () => void;
before(() => {
  const original = console.error;
  console.error = (...args: unknown[]) => {
    const message = args.map(String).join(" ");
    if (message.includes("ExperimentalWarning: Module mocking")) {
      original(...args);
      return;
    }
    consoleErrors.push(message);
  };
  restoreConsole = () => {
    console.error = original;
  };
});
afterEach(() => {
  cleanup();
  globalThis.fetch = originalFetch;
  const current = consoleErrors;
  consoleErrors = [];
  assert.deepEqual(current, [], "No React warnings or component errors");
});
process.on("exit", () => restoreConsole?.());

async function fill() {
  const user = userEvent.setup({ document: dom.window.document });
  await user.type(screen.getByLabelText(/Imię lub firma/), "Żaneta");
  await user.type(screen.getByLabelText(/E-mail/), "studio@example.pl");
  await user.type(screen.getByLabelText(/Co chcesz pokazać/), "Sześć ujęć flakonu perfum.");
  return user;
}

test("invalid form focuses the first invalid input and provides linked field errors", async () => {
  render(<ContactForm enabled />);
  await userEvent.click(screen.getByRole("button", { name: /Wyślij zapytanie/ }));
  assert.equal(document.activeElement, screen.getByLabelText(/Imię lub firma/));
  assert.equal(screen.getByLabelText(/E-mail/).getAttribute("aria-invalid"), "true");
  assert.ok(
    document.getElementById(screen.getByLabelText(/E-mail/).getAttribute("aria-describedby")!),
  );
});
test("preview mode never sends data or claims success", async () => {
  let requests = 0;
  globalThis.fetch = async () => {
    requests++;
    return new Response("ok");
  };
  render(<ContactForm enabled={false} />);
  const user = await fill();
  await user.click(screen.getByRole("button", { name: /Wyślij zapytanie/ }));
  assert.match(screen.getByRole("alert").textContent!, /nie została wysłana/);
  assert.equal(requests, 0);
});
test("Netlify submission uses URL encoding, shows pending state and accepts success only after a response", async () => {
  let payload = "";
  let release!: (value: Response) => void;
  globalThis.fetch = async (url, init) => {
    assert.equal(url, "/__forms.html");
    payload = String(init?.body);
    return await new Promise<Response>((resolve) => {
      release = resolve;
    });
  };
  render(<ContactForm enabled />);
  const user = await fill();
  await user.click(screen.getByRole("button", { name: /Wyślij zapytanie/ }));
  assert.equal(
    (screen.getByRole("button", { name: /Wysyłamy/ }) as HTMLButtonElement).disabled,
    true,
  );
  assert.equal(new URLSearchParams(payload).get("form-name"), "product-enquiry");
  assert.equal(new URLSearchParams(payload).get("name"), "Żaneta");
  await act(async () => {
    release(new Response("accepted", { status: 200 }));
  });
  await waitFor(() => assert.ok(screen.getByRole("status")));
  assert.ok(screen.getByText("Teraz nasza kolej."));
  await user.click(screen.getByRole("button", { name: /Pokaż kolejny produkt/ }));
  assert.equal((screen.getByLabelText(/E-mail/) as HTMLInputElement).value, "");
});
test("an upstream failure keeps the enquiry available for retry", async () => {
  globalThis.fetch = async () => new Response("failed", { status: 500 });
  render(<ContactForm enabled />);
  const user = await fill();
  await user.click(screen.getByRole("button", { name: /Wyślij zapytanie/ }));
  await waitFor(() =>
    assert.match(screen.getByRole("alert").textContent!, /Nie udało się potwierdzić/),
  );
  assert.equal((screen.getByLabelText(/E-mail/) as HTMLInputElement).value, "studio@example.pl");
});
test("a static-host 200 fallback is not interpreted as a delivered message", async () => {
  globalThis.fetch = async () =>
    new Response('<meta name="ofertastudio-static-form-definition" content="true">', {
      status: 200,
    });
  render(<ContactForm enabled />);
  const user = await fill();
  await user.click(screen.getByRole("button", { name: /Wyślij zapytanie/ }));
  await waitFor(() => assert.ok(screen.getByRole("alert")));
  assert.equal(screen.queryByText("Teraz nasza kolej."), null);
});
test("a network failure retains the message", async () => {
  globalThis.fetch = async () => {
    throw new TypeError("Network failed");
  };
  render(<ContactForm enabled />);
  const user = await fill();
  await user.click(screen.getByRole("button", { name: /Wyślij zapytanie/ }));
  await waitFor(() => assert.ok(screen.getByRole("alert")));
  assert.match(
    (screen.getByLabelText(/Co chcesz pokazać/) as HTMLTextAreaElement).value,
    /Sześć ujęć/,
  );
});
test("comparison presents independent frames without claiming a registered retouch pair", () => {
  const { container } = render(<Comparison />);
  assert.equal(screen.queryByRole("slider"), null);
  assert.equal(container.querySelectorAll("figure.comparison-frame").length, 2);
  assert.match(screen.getByText(/Nie stanowią pary/).textContent!, /Dwa niezależne/);
  assert.ok(screen.getByText("W otoczeniu"));
  assert.ok(screen.getByText("Na białym tle"));
});
test("the concise service summary preserves the anchor and all services without a gallery or accordion", () => {
  const { container } = render(<ServiceSummary />);
  assert.ok(container.querySelector("#mozliwosci"));
  for (const title of [
    "Packshot White",
    "Packshot Premium",
    "Detal i retusz",
    "Kompleksowa prezentacja oferty",
  ])
    assert.ok(screen.getByText(title));
  assert.equal(container.querySelectorAll("img, button, [aria-expanded]").length, 0);
});

test("form gives controller information and a policy link without a consent checkbox", () => {
  render(<ContactForm enabled={false} />);
  assert.match(
    document.querySelector(".form-bottom")!.textContent!,
    /Administratorem Twoich danych osobowych jest Piotr Pozdrowicz/,
  );
  assert.equal(
    screen.getByRole("link", { name: "Polityce prywatności" }).getAttribute("href"),
    "/prywatnosc",
  );
  assert.equal(document.querySelectorAll('input[type="checkbox"]').length, 0);
  assert.equal(document.querySelectorAll('input[type="file"]').length, 0);
});
