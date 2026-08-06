import Link from "next/link";

import { BrandMark } from "@/components/layout/brand-mark";
import { Container } from "@/components/layout/container";
import { contactConfig } from "@/config/contact";
import { navigationConfig } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import type { ContactConfig, SocialNetwork } from "@/types/content";

const socialLabels = {
  facebook: "Facebook",
  instagram: "Instagram",
  linkedin: "LinkedIn",
  youtube: "YouTube",
} as const satisfies Record<SocialNetwork, string>;

const contact: ContactConfig = contactConfig;

const socialProfiles = (
  Object.keys(contact.socialProfiles) as SocialNetwork[]
).flatMap((network) => {
  const href = contact.socialProfiles[network];

  return href ? [{ href, label: socialLabels[network], network }] : [];
});

export function SiteFooter() {
  const currentYear = new Date().getFullYear();
  const hasContactData = Boolean(
    contact.email || contact.phone || contact.address,
  );

  return (
    <footer
      className="bg-surface-inverse text-surface-inverse-foreground"
      data-component="site-footer"
    >
      <Container className="py-14 lg:py-20" size="wide">
        <div className="grid gap-12 xl:grid-cols-12 xl:gap-16">
          <div className="max-w-[var(--measure-narrow)] xl:col-span-4">
            <BrandMark showDescriptor tone="inverse" />
            <p className="mt-6 text-body-lg text-surface-inverse-muted-foreground">
              {siteConfig.valueProposition}
            </p>
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3 text-body-sm">
              <Link
                className="transition-interactive rounded-[var(--radius-small)] font-semibold text-surface-inverse-foreground underline decoration-surface-inverse-border underline-offset-4 hover:decoration-surface-inverse-muted-foreground"
                href={contactConfig.contactHref}
              >
                Kontakt
              </Link>
              <Link
                className="transition-interactive rounded-[var(--radius-small)] font-semibold text-surface-inverse-muted-foreground underline decoration-surface-inverse-border underline-offset-4 hover:text-surface-inverse-foreground"
                href={contactConfig.briefHref}
              >
                Brief projektu
              </Link>
            </div>

            {hasContactData && (
              <address className="mt-8 grid gap-2 text-body-sm text-surface-inverse-muted-foreground not-italic">
                {contact.email && (
                  <a
                    className="transition-interactive w-fit rounded-[var(--radius-small)] underline decoration-surface-inverse-border underline-offset-4 hover:text-surface-inverse-foreground"
                    href={`mailto:${contact.email}`}
                  >
                    {contact.email}
                  </a>
                )}
                {contact.phone && (
                  <a
                    className="transition-interactive w-fit rounded-[var(--radius-small)] underline decoration-surface-inverse-border underline-offset-4 hover:text-surface-inverse-foreground"
                    href={`tel:${contact.phone.replace(/\s/g, "")}`}
                  >
                    {contact.phone}
                  </a>
                )}
                {contact.address && <span>{contact.address}</span>}
              </address>
            )}

            {socialProfiles.length > 0 && (
              <ul
                aria-label="Profile społecznościowe"
                className="mt-8 flex flex-wrap gap-4"
              >
                {socialProfiles.map((profile) => (
                  <li key={profile.network}>
                    <a
                      aria-label={`${profile.label} OfertaStudio — otwiera się w nowej karcie`}
                      className="transition-interactive inline-flex min-h-11 items-center rounded-[var(--radius-control)] border border-surface-inverse-border px-3 text-body-sm font-semibold hover:border-surface-inverse-muted-foreground hover:bg-surface-inverse-muted"
                      href={profile.href}
                      rel="noreferrer noopener"
                      target="_blank"
                    >
                      {profile.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <nav
            aria-label="Nawigacja w stopce"
            className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:col-span-8"
          >
            {navigationConfig.footer.map((group) => (
              <section aria-labelledby={`footer-${group.id}`} key={group.id}>
                <h2
                  className="text-overline font-bold text-accent uppercase"
                  id={`footer-${group.id}`}
                >
                  {group.label}
                </h2>
                <ul className="mt-4 grid gap-2">
                  {group.items.map((item) => (
                    <li key={item.id}>
                      <Link
                        className="transition-interactive inline-flex min-h-10 items-center rounded-[var(--radius-small)] text-body-sm text-surface-inverse-muted-foreground underline decoration-transparent underline-offset-4 hover:text-surface-inverse-foreground hover:decoration-surface-inverse-border"
                        href={item.href}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-surface-inverse-border pt-6 text-caption text-surface-inverse-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {currentYear} {siteConfig.name}. Wszystkie prawa zastrzeżone.
          </p>
          <p>{siteConfig.tagline}</p>
        </div>
      </Container>
    </footer>
  );
}
