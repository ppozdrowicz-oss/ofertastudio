import type { Metadata } from "next";

import { HomeStory } from "@/components/home/home-story";
import { PageShell } from "@/components/layout/page-shell";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return (
    <PageShell showGlobalCta={false}>
      <HomeStory />
    </PageShell>
  );
}
