import { afterEach, beforeEach, describe, expect, mock, test } from "bun:test";
import { POST } from "../app/api/contact/route";

const post = (body: object) =>
  POST(
    new Request("https://jumprope.hassandev.me/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
  );

const valid = { name: "Ada", email: "ada@example.com", message: "Hi!" };
const realFetch = globalThis.fetch;
const envKeys = ["GOOGLE_SPREADSHEET_ID", "GOOGLE_SERVICE_ACCOUNT_EMAIL", "GOOGLE_PRIVATE_KEY"];

beforeEach(() => {
  for (const k of envKeys) delete process.env[k];
});
afterEach(() => {
  globalThis.fetch = realFetch;
});

describe("POST /api/contact", () => {
  test.each([
    [{ ...valid, name: "" }, "Invalid name"],
    [{ ...valid, email: "nope" }, "Invalid email"],
    [{ ...valid, message: "   " }, "Please write a message"],
    [{ ...valid, message: "x".repeat(5001) }, "Please write a message"],
  ])("rejects invalid input %#", async (body, error) => {
    const res = await post(body);
    expect(res.status).toBe(400);
    expect((await res.json()).error).toContain(error);
  });

  test("silently accepts honeypot submissions without touching Google", async () => {
    const fetchMock = mock(() => Promise.resolve(new Response()));
    globalThis.fetch = fetchMock as unknown as typeof fetch;
    const res = await post({ ...valid, website: "spam.example" });
    expect(res.status).toBe(200);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  test("reports a config error when Google credentials are missing", async () => {
    const res = await post(valid);
    expect(res.status).toBe(500);
    expect((await res.json()).error).toBe("Internal server configuration error.");
  });

  test("creates the Contact tab on first use, then appends with RAW input", async () => {
    const { generateKeyPairSync } = await import("crypto");
    const { privateKey } = generateKeyPairSync("rsa", { modulusLength: 2048 });
    process.env.GOOGLE_SPREADSHEET_ID = "sheet123";
    process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL = "bot@example.iam.gserviceaccount.com";
    process.env.GOOGLE_PRIVATE_KEY = privateKey.export({ type: "pkcs8", format: "pem" }) as string;

    const calls: { url: string; body: string }[] = [];
    let appendCount = 0;
    globalThis.fetch = (async (url: string, init?: RequestInit) => {
      calls.push({ url, body: String(init?.body) });
      if (url.includes("oauth2")) return Response.json({ access_token: "tok" });
      if (url.includes(":append")) {
        appendCount++;
        return new Response(appendCount === 1 ? "Unable to parse range" : "{}", {
          status: appendCount === 1 ? 400 : 200,
        });
      }
      if (url.includes(":batchUpdate")) return Response.json({});
      throw new Error(`unexpected fetch ${url}`);
    }) as typeof fetch;

    const res = await post({ ...valid, message: "=HYPERLINK(\"x\")" });
    expect(res.status).toBe(200);

    const addSheet = calls.find((c) => c.url.includes(":batchUpdate"))!;
    expect(JSON.parse(addSheet.body)).toEqual({
      requests: [{ addSheet: { properties: { title: "Contact" } } }],
    });
    const retry = calls.filter((c) => c.url.includes(":append"))[1];
    expect(retry.url).toContain("valueInputOption=RAW");
    const rows = JSON.parse(retry.body).values;
    expect(rows[0]).toEqual(["Timestamp", "Name", "Email", "Message"]);
    expect(rows[1].slice(1)).toEqual(["Ada", "ada@example.com", "=HYPERLINK(\"x\")"]);
  });
});
