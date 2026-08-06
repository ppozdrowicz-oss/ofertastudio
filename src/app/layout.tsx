import "@/styles/globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SkipLink } from "@/components/layout/skip-link";
import { siteConfig } from "@/config/site";

const inter = Inter({
  display: "swap",
  fallback: ["system-ui", "Arial", "sans-serif"],
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.metadata.defaultTitle,
    template: siteConfig.metadata.titleTemplate,
  },
  description: siteConfig.metadata.description,
  applicationName: siteConfig.name,
  openGraph: {
    description: siteConfig.metadata.description,
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    title: siteConfig.metadata.defaultTitle,
    type: "website",
    url: "/",
  },
  robots: {
    follow: true,
    googleBot: {
      follow: true,
      index: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
    index: true,
  },
  twitter: {
    card: "summary_large_image",
    description: siteConfig.metadata.description,
    title: siteConfig.metadata.defaultTitle,
  },
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html className={inter.variable} lang={siteConfig.language}>
      <body className="flex min-h-dvh flex-col bg-background font-sans text-foreground antialiased">
        <SkipLink />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
