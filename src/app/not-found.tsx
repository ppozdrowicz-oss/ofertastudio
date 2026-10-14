import Link from "next/link";
export default function NotFound() {
  return (
    <main id="main" className="not-found">
      <span className="eyebrow">404 — Poza kadrem</span>
      <h1>
        Tu nie ma
        <br />
        jeszcze obrazu.
      </h1>
      <Link href="/" className="button button-dark">
        Wróć do studia ↗
      </Link>
    </main>
  );
}
