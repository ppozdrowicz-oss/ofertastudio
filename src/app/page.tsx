import type { Metadata } from "next";

import { HomeHandoff } from "@/components/home/home-handoff";
import { HomeHero } from "@/components/home/home-hero";
import { PageShell } from "@/components/layout/page-shell";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return (
    <PageShell showGlobalCta={false}>
      <HomeHero />
      <HomeHandoff />
    </PageShell>
  );
}
