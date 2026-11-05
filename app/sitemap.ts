import type { MetadataRoute } from "next";
import { siteUrl } from "@/data/profile";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      // Fixed date: with cacheComponents, reading the current time here is not allowed.
      lastModified: "2026-11-01",
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
