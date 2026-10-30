import type { Metadata } from "next";
import PageShell from "../components/PageShell";
import JsonLd from "../components/JsonLd";
import { GITHUB_REPO_URL } from "../constants";
import { aboutPage } from "../content";
import { pageJsonLd } from "../lib/jsonLd";
import { pageMetadata } from "../lib/metadata";
import { AUTHOR, CASE_STUDY_URL, socials } from "../lib/site";

const title = "About — Jumprope Tracker";
const description =
  "Why Jumprope Tracker exists, what it stands for, and who builds it: a free, offline-first, open-source jump rope tracker by independent developer Hassan Aziz.";

export const metadata: Metadata = pageMetadata({ title, description, path: "/about" });

const links = [
  { label: "How I built it (case study)", href: CASE_STUDY_URL },
  { label: "Source code on GitHub", href: GITHUB_REPO_URL },
  { label: "hassandev.me", href: AUTHOR.url },
  ...socials,
];

export default function AboutPage() {
  return (
    <PageShell>
      <JsonLd data={pageJsonLd("AboutPage", "/about", title, description)} />
      <article className="py-[clamp(4rem,8vh,7rem)]" id="about">
        <div className="w-full max-w-[720px] mx-auto px-4 md:px-8 lg:px-12">
          <h1 className="text-[clamp(2rem,3vw+0.5rem,3rem)] font-bold leading-tight tracking-tight mb-6">
            {aboutPage.headline}
          </h1>
          <p className="text-text-secondary text-[clamp(1rem,1vw+0.25rem,1.125rem)] leading-relaxed mb-12">
            {aboutPage.intro}
          </p>

          <div className="space-y-10">
            {aboutPage.sections.map((section) => (
              <section key={section.heading} className="space-y-3">
                <h2 className="text-xl font-semibold">{section.heading}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="text-text-secondary text-[0.9375rem] leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}

            <section className="space-y-3">
              <h2 className="text-xl font-semibold">Links</h2>
              <ul className="flex flex-wrap gap-x-6 gap-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-secondary text-[0.9375rem] font-medium underline underline-offset-2 hover:text-text-primary transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </article>
    </PageShell>
  );
}
