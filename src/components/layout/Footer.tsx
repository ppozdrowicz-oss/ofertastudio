import Link from "next/link";
import { site } from "@/content/site";
import { Wordmark } from "./Wordmark";
import { Arrow } from "./Arrow";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <Link href="/" aria-label={`${site.name} — strona główna`}>
          <Wordmark />
        </Link>
        <p>
          Dobry produkt zasługuje
          <br />
          na dobry obraz.
        </p>
        <a className="text-link" href="#top">
          Do góry
          <Arrow diagonal />
        </a>
      </div>
      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} {site.name}
        </span>
        <span>Packshot i prezentacja produktu</span>
        <Link href="/prywatnosc">Prywatność</Link>
        {site.email && <a href={`mailto:${site.email}`}>{site.email}</a>}
      </div>
    </footer>
  );
}
