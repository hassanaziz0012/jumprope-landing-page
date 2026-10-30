import { describe, expect, test } from "bun:test";
import { NextRequest } from "next/server";
import { proxy } from "../proxy";

const BASE = "https://jumprope.hassandev.me";

function run(path: string, accept?: string, method = "GET") {
  return proxy(
    new NextRequest(`${BASE}${path}`, { method, headers: accept ? { accept } : {} })
  );
}

const passesThrough = (res: Response) => res.headers.get("x-middleware-next") === "1";

describe("proxy", () => {
  test("serves the homepage as Markdown to Accept: text/markdown", async () => {
    const res = run("/", "text/markdown");
    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toBe("text/markdown; charset=utf-8");
    expect(res.headers.get("vary")).toBe("Accept");
    expect(await res.text()).toStartWith("# Jumprope Tracker");
  });

  test("serves .md paths regardless of Accept", async () => {
    for (const path of ["/index.md", "/about.md", "/contact.md", "/privacy.md"]) {
      const res = run(path);
      expect(res.status).toBe(200);
      expect(res.headers.get("content-type")).toStartWith("text/markdown");
    }
  });

  test("returns a Markdown 404 for unknown pages", async () => {
    for (const path of ["/does-not-exist", "/nope.md"]) {
      const res = run(path, "text/markdown");
      expect(res.status).toBe(404);
      expect(res.headers.get("content-type")).toStartWith("text/markdown");
      expect(res.headers.get("vary")).toBe("Accept");
      expect(await res.text()).toContain("llms.txt");
    }
  });

  test("HEAD requests get headers without a body", async () => {
    const res = run("/", "text/markdown", "HEAD");
    expect(res.status).toBe(200);
    expect(await res.text()).toBe("");
  });

  test("lets browsers through to the HTML page", () => {
    expect(passesThrough(run("/", "text/html,application/xhtml+xml,*/*;q=0.8"))).toBe(true);
    expect(passesThrough(run("/about"))).toBe(true);
  });

  test("lets static files through even for Markdown requests", () => {
    for (const path of ["/llms.txt", "/robots.txt", "/sitemap.xml", "/images/icon.png"]) {
      expect(passesThrough(run(path, "text/markdown"))).toBe(true);
    }
  });
});
