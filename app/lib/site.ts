import { GITHUB_REPO_URL } from "../constants";

export const SITE_URL = "https://jumprope.hassandev.me";
export const SITE_NAME = "Jumprope Tracker";
export const HOME_TITLE = "Jumprope Tracker — Your Jump Rope Journey, Beautifully Tracked";
export const SITE_DESCRIPTION =
  "Log workouts, crush goals, and build unstoppable streaks — all offline, all on your device. Free, open-source jump rope tracking for Android & iOS.";
export const OG_IMAGE = {
  url: "/images/project-main-thumbnail.png",
  width: 1920,
  height: 1080,
  alt: "Jumprope Tracker app screens",
};

export const AUTHOR = {
  name: "Hassan Aziz",
  url: "https://www.hassandev.me",
};

export const CASE_STUDY_URL = "https://www.hassandev.me/work/jumprope-tracker";
export const ISSUES_URL = `${GITHUB_REPO_URL}/issues`;

export const socials = [
  { label: "GitHub", href: "https://github.com/hassanaziz0012" },
  { label: "Twitter/X", href: "https://x.com/nothassanaziz" },
  { label: "YouTube", href: "https://youtube.com/@itshassanaziz" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/hassan-aziz-web" },
];

// Every indexable page. Feeds the sitemap, llms.txt, and the Markdown proxy.
// Bump lastModified when a page's content changes.
export const pages = [
  { path: "/", title: SITE_NAME, lastModified: "2026-10-30" },
  { path: "/about", title: "About", lastModified: "2026-10-30" },
  { path: "/contact", title: "Contact", lastModified: "2026-10-30" },
  { path: "/privacy", title: "Privacy Policy", lastModified: "2026-04-07" },
] as const;

export type PagePath = (typeof pages)[number]["path"];

export function absoluteUrl(path: string): string {
  return path === "/" ? SITE_URL : `${SITE_URL}${path}`;
}
