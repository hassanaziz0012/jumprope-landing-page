import { afterEach, describe, expect, test } from "bun:test";
import { generateKeyPairSync } from "crypto";
import { POST } from "../app/api/lead/route";

const realFetch = globalThis.fetch;
afterEach(() => {
  globalThis.fetch = realFetch;
});

const post = (body: object) =>
  POST(
    new Request("https://jumprope.hassandev.me/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
  );

describe("POST /api/lead", () => {
  test("rejects a missing referral source", async () => {
    const res = await post({ name: "Ada", email: "ada@example.com", source: "" });
    expect(res.status).toBe(400);
    expect((await res.json()).error).toBe("Invalid referral source.");
  });

  test("appends the lead to the 'Jumprope App' sheet as before", async () => {
    const { privateKey } = generateKeyPairSync("rsa", { modulusLength: 2048 });
    process.env.GOOGLE_SPREADSHEET_ID = "sheet123";
    process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL = "bot@example.iam.gserviceaccount.com";
    process.env.GOOGLE_PRIVATE_KEY = privateKey.export({ type: "pkcs8", format: "pem" }) as string;

    const calls: { url: string; init?: RequestInit }[] = [];
    globalThis.fetch = (async (url: string, init?: RequestInit) => {
      calls.push({ url, init });
      if (url.includes("oauth2")) return Response.json({ access_token: "tok" });
      return Response.json({});
    }) as typeof fetch;

    const res = await post({ name: " Ada ", email: "ada@example.com", source: "Twitter" });
    expect(res.status).toBe(200);

    const append = calls[1];
    expect(append.url).toBe(
      "https://sheets.googleapis.com/v4/spreadsheets/sheet123/values/'Jumprope%20App'!A%3AD:append?valueInputOption=USER_ENTERED"
    );
    expect(new Headers(append.init?.headers).get("authorization")).toBe("Bearer tok");
    const [[timestamp, ...rest]] = JSON.parse(String(append.init?.body)).values;
    expect(timestamp).toMatch(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/);
    expect(rest).toEqual(["Ada", "ada@example.com", "Twitter"]);
  });
});
