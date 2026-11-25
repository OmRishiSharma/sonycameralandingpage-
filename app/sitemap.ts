import type { MetadataRoute } from "next";

/**
 * Emits sitemap entries once a production domain is supplied via NEXT_PUBLIC_SITE_URL.
 * Relative root entry is emitted otherwise so no synthetic domain is ever invented.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  return [
    {
      url: siteUrl ? `${siteUrl}/` : "/",
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
