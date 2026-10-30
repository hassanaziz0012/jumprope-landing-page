// Checks a running deployment's agent-facing endpoints.
// Usage: bun scripts/verify-agent-readiness.ts [baseUrl]
// For protected Vercel previews, set VERCEL_PROTECTION_BYPASS to the bypass secret.
export {};

const SITE = "https://jumprope.hassandev.me";
const base = (process.argv[2] ?? "https://jumprope.hassandev.me").replace(/\/$/, "");
const pagePaths = ["/", "/about", "/contact", "/privacy"];
let failures = 0;

function check(label: string, ok: boolean, detail = "") {
  console.log(`${ok ? "✓" : "✗"} ${label}${ok || !detail ? "" : ` (${detail})`}`);
  if (!ok) failures++;
}

const varies = (res: Response) =>
  (res.headers.get("vary") ?? "").split(",").some((v) => v.trim().toLowerCase() === "accept");

const bypass = process.env.VERCEL_PROTECTION_BYPASS;

const get = (path: string, accept?: string) =>
  fetch(`${base}${path}`, {
    headers: {
      ...(accept ? { Accept: accept } : {}),
      ...(bypass ? { "x-vercel-protection-bypass": bypass } : {}),
    },
    redirect: "follow",
  });

const text = (html: string) => html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");

for (const path of pagePaths) {
  const html = await get(path, "text/html");
  const body = await html.text();
  check(`${path} HTML 200`, html.status === 200, String(html.status));
  check(`${path} HTML content-type`, html.headers.get("content-type")?.startsWith("text/html") ?? false);
  check(`${path} raw HTML has 500+ chars of text`, text(body).length >= 500, String(text(body).length));
  const levels = [...body.matchAll(/<h([1-6])[\s>]/g)].map((m) => Number(m[1]));
  check(`${path} has exactly one H1`, levels.filter((l) => l === 1).length === 1, levels.join(","));
  const skip = levels.findIndex((l, i) => i > 0 && l > levels[i - 1] + 1);
  check(`${path} headings don't skip levels`, levels[0] === 1 && skip === -1, levels.join(","));
  const canonical = body.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  // Canonical URLs always name the production site, even on preview builds.
  check(`${path} canonical`, canonical === `${SITE}${path === "/" ? "" : path}`, canonical);
  check(`${path} og:image`, /<meta property="og:image" content="[^"]+project-main-thumbnail\.png"/.test(body));
  check(`${path} og:type`, /<meta property="og:type" content="website"/.test(body));
  check(`${path} html lang`, /<html lang="en"/.test(body));
  if (path === "/") {
    const ld = body.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1];
    let types: string[] = [];
    try {
      types = JSON.parse(ld ?? "")["@graph"].map((n: { "@type": string }) => n["@type"]);
    } catch {}
    check("/ JSON-LD has SoftwareApplication + Person", types.includes("SoftwareApplication") && types.includes("Person"), types.join(","));
  }

  const md = await get(path, "text/markdown");
  const mdBody = await md.text();
  check(`${path} Markdown 200`, md.status === 200, String(md.status));
  check(`${path} Markdown content-type`, md.headers.get("content-type")?.startsWith("text/markdown") ?? false, md.headers.get("content-type") ?? "");
  check(`${path} Markdown Vary: Accept`, varies(md));
  check(`${path} Markdown body`, mdBody.startsWith("# ") && mdBody.length > 500);

  const mdPath = path === "/" ? "/index.md" : `${path}.md`;
  const alt = await get(mdPath);
  check(`${mdPath} serves Markdown`, alt.status === 200 && (alt.headers.get("content-type")?.startsWith("text/markdown") ?? false));
}

const missing = `/__verify-404-${Date.now()}`;
const nfMd = await get(missing, "text/markdown");
const nfBody = await nfMd.text();
check("404 Markdown status", nfMd.status === 404, String(nfMd.status));
check("404 Markdown content-type", nfMd.headers.get("content-type")?.startsWith("text/markdown") ?? false);
check("404 Markdown body links to llms.txt", nfBody.length >= 20 && nfBody.includes("/llms.txt"));
const nfHtml = await get(missing, "text/html");
check("404 HTML status", nfHtml.status === 404, String(nfHtml.status));

const llms = await get("/llms.txt");
const llmsBody = await llms.text();
check("llms.txt 200", llms.status === 200);
check("llms.txt starts with H1 + has When to use", llmsBody.startsWith("# Jumprope Tracker") && llmsBody.includes("## When to use"));

const sm = await get("/sitemap.xml");
const smBody = await sm.text();
check("sitemap.xml 200 XML", sm.status === 200 && (sm.headers.get("content-type") ?? "").includes("xml"));
check("sitemap.xml lists all pages with lastmod", pagePaths.every((p) => smBody.includes(`<loc>${SITE}${p === "/" ? "" : p}</loc>`)) && (smBody.match(/<lastmod>/g) ?? []).length === pagePaths.length);

const rb = await (await get("/robots.txt")).text();
check("robots.txt references sitemap", rb.includes(`Sitemap: ${SITE}/sitemap.xml`));

for (const asset of ["/images/icon.png", "/images/project-main-thumbnail.png"]) {
  const res = await get(asset, "text/markdown");
  check(`${asset} still served (even to Markdown clients)`, res.status === 200 && (res.headers.get("content-type") ?? "").startsWith("image/"));
}

console.log(failures ? `\n${failures} check(s) failed` : "\nAll checks passed");
process.exit(failures ? 1 : 0);
