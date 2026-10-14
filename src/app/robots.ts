import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      ...(site.indexable ? { allow: "/", disallow: ["/__forms.html"] } : { disallow: "/" }),
    },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
