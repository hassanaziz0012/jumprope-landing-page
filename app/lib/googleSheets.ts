import crypto from "crypto";

const SHEETS_API = "https://sheets.googleapis.com/v4/spreadsheets";

export class SheetsError extends Error {
  constructor(
    message: string,
    public readonly publicMessage: string
  ) {
    super(message);
  }
}

// Helper to sign JWT using Google Service Account Private Key
function signJwt(payload: object, privateKey: string, clientEmail: string): string {
  const header = {
    alg: "RS256",
    typ: "JWT",
  };

  const now = Math.floor(Date.now() / 1000);
  const jwtPayload = {
    ...payload,
    iss: clientEmail,
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600, // Expires in 1 hour
  };

  const base64Url = (str: string) => {
    return Buffer.from(str)
      .toString("base64")
      .replace(/=/g, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");
  };

  const encodedHeader = base64Url(JSON.stringify(header));
  const encodedPayload = base64Url(JSON.stringify(jwtPayload));
  const signInput = `${encodedHeader}.${encodedPayload}`;

  const sign = crypto.createSign("RSA-SHA256");
  sign.update(signInput);

  // Unescape any literal newlines inside the env var key format
  const formattedKey = privateKey.replace(/\\n/g, "\n");

  const signature = sign.sign(formattedKey, "base64");
  const encodedSignature = signature
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  return `${signInput}.${encodedSignature}`;
}

export interface SheetsClient {
  spreadsheetId: string;
  accessToken: string;
}

/** Returns null when the Google Sheets env vars are not configured. */
export async function getSheetsClient(): Promise<SheetsClient | null> {
  const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID;
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY;

  if (!spreadsheetId || !clientEmail || !privateKey) {
    console.error("Missing Google Sheets API environment variables.");
    return null;
  }

  const jwtAssertion = signJwt(
    { scope: "https://www.googleapis.com/auth/spreadsheets" },
    privateKey,
    clientEmail
  );

  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwtAssertion,
    }).toString(),
  });

  if (!tokenResponse.ok) {
    const errorText = await tokenResponse.text();
    throw new SheetsError(
      `Google OAuth token exchange failed: ${errorText}`,
      "Failed to authenticate with database service."
    );
  }

  const tokenData = await tokenResponse.json();
  return { spreadsheetId, accessToken: tokenData.access_token };
}

/** Appends rows to `range` (e.g. "'Sheet name'!A:D"); returns the raw response. */
export function appendRows(
  client: SheetsClient,
  range: string,
  values: string[][],
  valueInputOption: "RAW" | "USER_ENTERED" = "USER_ENTERED"
): Promise<Response> {
  const appendUrl = `${SHEETS_API}/${client.spreadsheetId}/values/${encodeURIComponent(
    range
  )}:append?valueInputOption=${valueInputOption}`;

  return fetch(appendUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${client.accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ values }),
  });
}

/** Adds a sheet (tab) to the spreadsheet. */
export function addSheet(client: SheetsClient, title: string): Promise<Response> {
  return fetch(`${SHEETS_API}/${client.spreadsheetId}:batchUpdate`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${client.accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ requests: [{ addSheet: { properties: { title } } }] }),
  });
}

/** Human-readable timestamp used in every sheet row. */
export function sheetTimestamp(now = new Date()): string {
  return now.toISOString().replace("T", " ").substring(0, 19);
}
