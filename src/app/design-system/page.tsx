import type { Metadata } from "next";

import { DesignSystemShowcase } from "./_components/design-system-showcase";

export const metadata: Metadata = {
  description:
    "Techniczna prezentacja tokenów i komponentów interfejsu OfertaStudio.",
  robots: {
    follow: false,
    googleBot: {
      follow: false,
      index: false,
    },
    index: false,
    nocache: true,
  },
  title: "Design system",
};

export default function DesignSystemPage() {
  return <DesignSystemShowcase />;
}
