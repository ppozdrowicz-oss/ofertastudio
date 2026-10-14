import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return site.indexable ? [{ url: site.url, changeFrequency: "monthly", priority: 1 }] : [];
}
