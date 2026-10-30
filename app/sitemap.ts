import type { MetadataRoute } from "next";
import { absoluteUrl, pages } from "./lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map((page) => ({
    url: absoluteUrl(page.path),
    lastModified: page.lastModified,
    changeFrequency: "monthly",
    priority: page.path === "/" ? 1 : 0.5,
  }));
}
