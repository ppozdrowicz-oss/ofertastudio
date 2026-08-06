import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { TechnicalRoute } from "@/components/sections/technical-route";
import {
  getRegisteredPage,
  getTechnicalRouteParams,
} from "@/lib/route-registry";
import type { SitePath } from "@/types/content";

type TechnicalPageProps = {
  params: Promise<{ slug: string[] }>;
};

function getHref(slug: readonly string[]): SitePath {
  return `/${slug.join("/")}`;
}

export function generateStaticParams() {
  return getTechnicalRouteParams();
}

export async function generateMetadata({
  params,
}: TechnicalPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getRegisteredPage(getHref(slug));

  if (!page) {
    notFound();
  }

  return {
    alternates: {
      canonical: page.seo.canonical,
    },
    description: page.seo.description,
    robots: {
      follow: true,
      index: false,
    },
    title: page.seo.title,
  };
}

export default async function TechnicalPage({ params }: TechnicalPageProps) {
  const { slug } = await params;
  const page = getRegisteredPage(getHref(slug));

  if (!page) {
    notFound();
  }

  return <TechnicalRoute page={page} />;
}
