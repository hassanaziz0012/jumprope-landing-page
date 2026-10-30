import { NextResponse, type NextRequest } from "next/server";
import {
  markdownForPage,
  notFoundMarkdown,
  prefersMarkdown,
  resolveMarkdownPath,
} from "./app/lib/markdown";

// Serves Markdown to agents (https://acceptmarkdown.com): any page responds
// with Markdown to `Accept: text/markdown`, or when `.md` is appended to its
// path. Unknown paths get a Markdown 404. Browsers never reach this code; the
// matcher below only runs it for Markdown requests.
//
// HTML responses can't carry `Vary: Accept`: Next (and Vercel) replace any Vary
// set by proxy or next.config with their own RSC list. That's safe here because
// this proxy runs before the CDN cache, so the two never share a cache entry.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isMdPath = pathname.endsWith(".md");

  // Static files (images, robots.txt, llms.txt, ...) are served as-is.
  if (!isMdPath && /\.[^/]+$/.test(pathname)) return NextResponse.next();
  if (!isMdPath && !prefersMarkdown(request.headers.get("accept"))) {
    return NextResponse.next();
  }

  const page = resolveMarkdownPath(pathname);
  const body = page ? markdownForPage(page) : notFoundMarkdown(pathname);
  return new NextResponse(request.method === "HEAD" ? null : body, {
    status: page ? 200 : 404,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      Vary: "Accept",
      "Cache-Control": "public, max-age=0, must-revalidate",
      "X-Robots-Tag": "noindex",
    },
  });
}

export const config = {
  matcher: [
    {
      source: "/((?!_next/|api/).*)",
      has: [{ type: "header", key: "accept", value: ".*text/(x-)?markdown.*" }],
    },
    "/((?!_next/|api/).*\\.md)",
  ],
};
