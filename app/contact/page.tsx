import type { Metadata } from "next";
import PageShell from "../components/PageShell";
import JsonLd from "../components/JsonLd";
import ContactForm from "../components/ContactForm";
import { contactPage } from "../content";
import { pageJsonLd } from "../lib/jsonLd";
import { pageMetadata } from "../lib/metadata";
import { ISSUES_URL, socials } from "../lib/site";

const title = "Contact — Jumprope Tracker";
const description =
  "Get in touch with the developer of Jumprope Tracker: send a message, report a bug on GitHub, or find me on social media.";

export const metadata: Metadata = pageMetadata({ title, description, path: "/contact" });

const linkClass =
  "text-text-secondary font-medium underline underline-offset-2 hover:text-text-primary transition-colors duration-200";

export default function ContactPage() {
  const { bugReport, elsewhere } = contactPage;

  return (
    <PageShell>
      <JsonLd data={pageJsonLd("ContactPage", "/contact", title, description)} />
      <article className="py-[clamp(4rem,8vh,7rem)]" id="contact">
        <div className="w-full max-w-[720px] mx-auto px-4 md:px-8 lg:px-12">
          <h1 className="text-[clamp(2rem,3vw+0.5rem,3rem)] font-bold leading-tight tracking-tight mb-6">
            {contactPage.headline}
          </h1>
          <p className="text-text-secondary text-[clamp(1rem,1vw+0.25rem,1.125rem)] leading-relaxed mb-10">
            {contactPage.intro}
          </p>

          <ContactForm />

          <div className="space-y-10 mt-14">
            <section className="space-y-3">
              <h2 className="text-xl font-semibold">{bugReport.heading}</h2>
              <p className="text-text-secondary text-[0.9375rem] leading-relaxed">
                {bugReport.intro}
              </p>
              <ul className="list-disc pl-5 space-y-1 text-text-secondary text-[0.9375rem] leading-relaxed">
                {bugReport.checklist.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="text-[0.9375rem]">
                <a href={ISSUES_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  Open an issue on GitHub →
                </a>
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold">{elsewhere.heading}</h2>
              <p className="text-text-secondary text-[0.9375rem] leading-relaxed">
                {elsewhere.intro}
              </p>
              <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[0.9375rem]">
                {socials.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
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
