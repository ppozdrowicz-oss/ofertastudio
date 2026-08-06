import "@/styles/globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

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
    default: siteConfig.defaultTitle,
    template: siteConfig.titleTemplate,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  openGraph: {
    description: siteConfig.description,
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    title: siteConfig.defaultTitle,
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
    description: siteConfig.description,
    title: siteConfig.defaultTitle,
  },
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html className={inter.variable} lang={siteConfig.language}>
      <body className="min-h-dvh bg-background font-sans text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
