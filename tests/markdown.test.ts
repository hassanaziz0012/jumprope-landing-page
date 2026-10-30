import { describe, expect, test } from "bun:test";
import {
  llmsTxt,
  markdownForPage,
  notFoundMarkdown,
  prefersMarkdown,
  resolveMarkdownPath,
} from "../app/lib/markdown";
import { pages } from "../app/lib/site";
import { faqs, features } from "../app/content";

describe("prefersMarkdown", () => {
  test.each([
    ["text/markdown", true],
    ["text/x-markdown", true],
    ["text/markdown, text/html;q=0.9", true],
    ["text/html;q=0.5, text/markdown", true],
    ["text/markdown;q=0.8, text/html;q=0.8", true],
    ["text/html", false],
    ["text/html, text/markdown;q=0.5", false],
    ["*/*", false],
    ["text/*", false],
    ["text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8", false],
    ["text/markdown;q=0", false],
    ["", false],
  ])("%p → %p", (accept, expected) => {
    expect(prefersMarkdown(accept)).toBe(expected);
  });

  test("handles a missing header", () => {
    expect(prefersMarkdown(null)).toBe(false);
    expect(prefersMarkdown(undefined)).toBe(false);
  });
});

describe("resolveMarkdownPath", () => {
  test.each([
    ["/", "/"],
    ["/index.md", "/"],
    ["/about", "/about"],
    ["/about/", "/about"],
    ["/about.md", "/about"],
    ["/contact.md", "/contact"],
    ["/privacy", "/privacy"],
  ])("%p → %p", (path, expected) => {
    expect(resolveMarkdownPath(path)).toBe(expected as never);
  });

  test("returns null for unknown pages", () => {
    expect(resolveMarkdownPath("/nope")).toBeNull();
    expect(resolveMarkdownPath("/nope.md")).toBeNull();
    expect(resolveMarkdownPath("/about/team")).toBeNull();
  });
});

describe("page Markdown", () => {
  test.each(pages.map((p) => p.path))("%p has one H1 and substantial content", (path) => {
    const body = markdownForPage(path);
    expect(body.match(/^# /gm)).toHaveLength(1);
    expect(body.startsWith("# ")).toBe(true);
    expect(body.length).toBeGreaterThan(500);
  });

  test("headings never skip a level", () => {
    for (const { path } of pages) {
      let previous = 0;
      for (const [, hashes] of markdownForPage(path).matchAll(/^(#{1,6}) /gm)) {
        expect(hashes.length).toBeLessThanOrEqual(previous + 1);
        previous = hashes.length;
      }
    }
  });

  test("homepage covers every feature and FAQ", () => {
    const body = markdownForPage("/");
    for (const f of features) expect(body).toContain(f.headline);
    for (const f of faqs) expect(body).toContain(f.question);
  });

  test("never exposes the lead-gated APK URL", () => {
    for (const { path } of pages) expect(markdownForPage(path)).not.toContain(".apk");
    expect(llmsTxt()).not.toContain(".apk");
  });
});

describe("notFoundMarkdown", () => {
  test("explains the error and links to llms.txt and the sitemap", () => {
    const body = notFoundMarkdown("/missing");
    expect(body.length).toBeGreaterThan(20);
    expect(body).toContain("`/missing`");
    expect(body).toContain("https://jumprope.hassandev.me/llms.txt");
    expect(body).toContain("https://jumprope.hassandev.me/sitemap.xml");
  });
});

describe("llms.txt", () => {
  const body = llmsTxt();

  test("follows the llmstxt.org structure", () => {
    const lines = body.split("\n");
    expect(lines[0]).toBe("# Jumprope Tracker");
    expect(body.match(/^# /gm)).toHaveLength(1);
    expect(lines.find((l) => l.trim() !== "" && !l.startsWith("#"))).toMatch(/^> /);
    expect(body).toContain("\n## Optional\n");
  });

  test("has when-to-use guidance", () => {
    expect(body).toContain("## When to use");
    expect(body).toContain("not a good fit");
  });

  test("links to the Markdown version of every page", () => {
    expect(body).toContain("https://jumprope.hassandev.me/index.md");
    for (const { path } of pages.filter((p) => p.path !== "/")) {
      expect(body).toContain(`https://jumprope.hassandev.me${path}.md`);
    }
  });
});
