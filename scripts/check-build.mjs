import { readFileSync, existsSync, statSync } from "node:fs";
import { gzipSync } from "node:zlib";
import assert from "node:assert/strict";
import { JSDOM } from "jsdom";

const html = readFileSync(".next/server/app/index.html", "utf8");
const document = new JSDOM(html).window.document;
assert.equal(document.documentElement.lang, "pl");
assert.equal(document.querySelectorAll("h1").length, 1);
assert.equal(document.querySelectorAll("main").length, 1);
for (const selector of [
  ".site-header .wordmark",
  ".site-footer .wordmark",
  ".mobile-menu .wordmark",
]) {
  assert.equal(document.querySelector(selector)?.textContent, "OfertaStudio.pl");
}
const ids = [...document.querySelectorAll("[id]")].map((node) => node.id);
assert.equal(new Set(ids).size, ids.length, "No duplicate IDs");
for (const link of document.querySelectorAll('a[href^="#"], a[href^="/#"]')) {
  const href = link.getAttribute("href");
  assert.ok(
    document.getElementById(href.slice(href.indexOf("#") + 1)),
    `Missing destination ${href}`,
  );
}
for (const image of document.querySelectorAll("img")) {
  assert.ok(image.hasAttribute("alt"), "Each image needs an explicit alt strategy");
  assert.ok(
    Number(image.getAttribute("width")) > 0 && Number(image.getAttribute("height")) > 0,
    "Image dimensions reserve layout",
  );
  const src = new URL(image.getAttribute("src"), "https://local.invalid");
  const localPath = src.pathname === "/_next/image" ? src.searchParams.get("url") : src.pathname;
  assert.ok(localPath?.startsWith("/"), "Only local, documented media is expected");
  assert.ok(existsSync(`public${localPath}`), `Missing ${localPath}`);
  assert.ok(!localPath.includes("/studies/"), "Production page must use final photography");
}
assert.ok(document.querySelector('link[rel="canonical"]'));
assert.ok(document.querySelector('meta[property="og:image"]'));
const data = JSON.parse(document.querySelector('script[type="application/ld+json"]').textContent);
assert.equal(data["@type"], "Organization");
assert.equal(data.aggregateRating, undefined, "No fabricated rating");
const scripts = [...document.querySelectorAll("script[src]")]
  .map((node) => node.getAttribute("src"))
  .filter((src) => src.startsWith("/_next/"));
const unique = [...new Set(scripts)];
const javascript = unique.reduce((sum, src) => {
  const buffer = readFileSync(".next/" + src.replace("/_next/", ""));
  return sum + gzipSync(buffer).length;
}, 0);
console.log(
  JSON.stringify(
    {
      status: "pass",
      h1: 1,
      images: document.querySelectorAll("img").length,
      internalLinksChecked: document.querySelectorAll('a[href^="#"], a[href^="/#"]').length,
      initialScriptFiles: unique.length,
      initialJavascriptGzipBytes: javascript,
      htmlBytes: statSync(".next/server/app/index.html").size,
      robots: document.querySelector('meta[name="robots"]')?.getAttribute("content"),
    },
    null,
    2,
  ),
);
