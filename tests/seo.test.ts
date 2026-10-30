import { describe, expect, test } from "bun:test";
import sitemap from "../app/sitemap";
import robots from "../app/robots";
import { GET as getLlmsTxt } from "../app/llms.txt/route";
import { homeJsonLd, pageJsonLd, serializeJsonLd } from "../app/lib/jsonLd";
import { metadataBase, pageMetadata } from "../app/lib/metadata";

type Node = Record<string, unknown>;
const graph = (data: { "@graph": unknown[] }) => data["@graph"] as Node[];
const byType = (nodes: Node[], type: string) => nodes.find((n) => n["@type"] === type)!;

describe("sitemap.xml", () => {
  test("lists every page with an absolute URL and lastmod", () => {
    const entries = sitemap();
    expect(entries.map((e) => e.url)).toEqual([
      "https://jumprope.hassandev.me",
      "https://jumprope.hassandev.me/about",
      "https://jumprope.hassandev.me/contact",
      "https://jumprope.hassandev.me/privacy",
    ]);
    for (const e of entries) expect(String(e.lastModified)).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});

describe("robots.txt", () => {
  test("allows crawling and points at the sitemap", () => {
    const r = robots();
    expect(r.sitemap).toBe("https://jumprope.hassandev.me/sitemap.xml");
    expect(r.rules).toMatchObject({ userAgent: "*", allow: "/" });
  });
});

describe("llms.txt route", () => {
  test("serves Markdown", async () => {
    const res = getLlmsTxt();
    expect(res.headers.get("content-type")).toBe("text/markdown; charset=utf-8");
    expect(await res.text()).toStartWith("# Jumprope Tracker\n");
  });
});

describe("JSON-LD", () => {
  const nodes = graph(homeJsonLd());

  test("describes the app as a free SoftwareApplication", () => {
    const app = byType(nodes, "SoftwareApplication");
    expect(app.name).toBe("Jumprope Tracker");
    expect(app.url).toBe("https://jumprope.hassandev.me");
    expect(app.description).toBeString();
    expect(app.offers).toMatchObject({ "@type": "Offer", price: "0" });
    expect(app.author).toEqual({ "@id": "https://jumprope.hassandev.me/#person" });
  });

  test("identifies the author by social profiles, with no address or phone", () => {
    const person = byType(nodes, "Person");
    expect(person.sameAs).toEqual([
      "https://github.com/hassanaziz0012",
      "https://x.com/nothassanaziz",
      "https://youtube.com/@itshassanaziz",
      "https://www.linkedin.com/in/hassan-aziz-web",
    ]);
    const serialized = JSON.stringify(person);
    expect(serialized).not.toContain("address");
    expect(serialized).not.toContain("telephone");
    expect(serialized).not.toContain("@gmail");
  });

  test("subpages reference the shared entities", () => {
    const about = graph(pageJsonLd("AboutPage", "/about", "About", "d"));
    expect(byType(about, "AboutPage").mainEntity).toEqual({
      "@id": "https://jumprope.hassandev.me/#person",
    });
  });

  test("serialization can't break out of the script tag", () => {
    expect(serializeJsonLd({ x: "</script><script>" })).not.toContain("<");
  });
});

describe("metadata", () => {
  test("homepage has canonical, og:image, og:type", () => {
    const m = pageMetadata({ title: "t", description: "d", path: "/" });
    expect(metadataBase.href).toBe("https://jumprope.hassandev.me/");
    expect(m.alternates?.canonical).toBe("/");
    expect(m.openGraph).toMatchObject({ type: "website" });
    expect(JSON.stringify(m.openGraph)).toContain("project-main-thumbnail.png");
    expect(m.twitter).toMatchObject({ card: "summary_large_image" });
  });

  test("subpages get their own canonical and Markdown alternate", () => {
    const m = pageMetadata({ title: "t", description: "d", path: "/about" });
    expect(m.alternates).toEqual({
      canonical: "/about",
      types: { "text/markdown": "/about.md" },
    });
  });
});
