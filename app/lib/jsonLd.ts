import { GITHUB_REPO_URL } from "../constants";
import { trackables } from "../content";
import {
  AUTHOR,
  OG_IMAGE,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
  socials,
} from "./site";

// schema.org JSON-LD. Entities share @ids so pages can reference each other.
const ids = {
  website: `${SITE_URL}/#website`,
  app: `${SITE_URL}/#app`,
  person: `${SITE_URL}/#person`,
};

const person = {
  "@type": "Person",
  "@id": ids.person,
  name: AUTHOR.name,
  url: AUTHOR.url,
  sameAs: socials.map((s) => s.href),
  // No public email or phone: the contact form is the support channel.
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    url: absoluteUrl("/contact"),
    availableLanguage: "English",
  },
};

export function homeJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": ids.website,
        name: SITE_NAME,
        url: SITE_URL,
        description: SITE_DESCRIPTION,
        inLanguage: "en",
        publisher: { "@id": ids.person },
      },
      {
        "@type": "SoftwareApplication",
        "@id": ids.app,
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
        url: SITE_URL,
        applicationCategory: "HealthApplication",
        applicationSubCategory: "Jump rope workout tracker",
        operatingSystem: "Android",
        image: absoluteUrl(OG_IMAGE.url),
        screenshot: absoluteUrl(OG_IMAGE.url),
        featureList: trackables.map((t) => t.label),
        isAccessibleForFree: true,
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        },
        author: { "@id": ids.person },
        publisher: { "@id": ids.person },
        sameAs: [GITHUB_REPO_URL],
      },
      person,
    ],
  };
}

export function pageJsonLd(
  type: "AboutPage" | "ContactPage" | "WebPage",
  path: string,
  name: string,
  description: string
) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": type,
        "@id": `${absoluteUrl(path)}#webpage`,
        url: absoluteUrl(path),
        name,
        description,
        inLanguage: "en",
        isPartOf: { "@id": ids.website },
        about: { "@id": ids.app },
        ...(type === "AboutPage" ? { mainEntity: { "@id": ids.person } } : {}),
      },
      person,
    ],
  };
}

/** Serializes for a <script type="application/ld+json"> tag, escaping `<` so content can't close the tag. */
export function serializeJsonLd(data: object): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
