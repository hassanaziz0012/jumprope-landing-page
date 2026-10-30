import type { Metadata } from "next";
import { OG_IMAGE, SITE_NAME, SITE_URL } from "./site";

/**
 * Per-page metadata with a canonical URL, a Markdown alternate, and complete
 * Open Graph / Twitter tags. Next shallow-merges `openGraph` per page, so each
 * page needs the full object rather than inheriting the layout's image.
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const markdownPath = path === "/" ? "/index.md" : `${path}.md`;
  return {
    title,
    description,
    alternates: {
      canonical: path,
      types: { "text/markdown": markdownPath },
    },
    openGraph: {
      title,
      description,
      url: path,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_US",
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE.url],
    },
  };
}

export const metadataBase = new URL(SITE_URL);
