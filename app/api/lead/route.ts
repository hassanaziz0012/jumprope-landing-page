import { NextResponse } from "next/server";
import crypto from "crypto";

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

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, source } = body;

    // 1. Validate Input
    if (!name || typeof name !== "string" || name.trim().length === 0 || name.length > 100) {
      return NextResponse.json({ error: "Invalid name provided." }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email) || email.length > 100) {
      return NextResponse.json({ error: "Invalid email format." }, { status: 400 });
    }

    if (!source || typeof source !== "string" || source.trim().length === 0 || source.length > 200) {
      return NextResponse.json({ error: "Invalid referral source." }, { status: 400 });
    }

    // 2. Fetch configurations
    const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID;
    const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY;

    if (!spreadsheetId || !clientEmail || !privateKey) {
      console.error("Missing Google Sheets API environment variables.");
      return NextResponse.json(
        { error: "Internal server configuration error." },
        { status: 500 }
      );
    }

    // 3. Authenticate with Google
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
      console.error("Google OAuth token exchange failed:", errorText);
      return NextResponse.json(
        { error: "Failed to authenticate with database service." },
        { status: 500 }
      );
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // 4. Format row data
    const now = new Date();
    // Using simple readable timestamp
    const timestamp = now.toISOString().replace("T", " ").substring(0, 19);
    
    // Range is standard sheet selection. 2nd sheet is called "Jumprope App"
    const range = "'Jumprope App'!A:D";
    const appendUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(
      range
    )}:append?valueInputOption=USER_ENTERED`;

    // 5. Append to Google Sheets
    const sheetResponse = await fetch(appendUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        values: [[timestamp, name.trim(), email.trim(), source.trim()]],
      }),
    });

    if (!sheetResponse.ok) {
      const errorText = await sheetResponse.text();
      console.error("Failed to append row to Google Sheet:", errorText);
      return NextResponse.json(
        { error: "Failed to record lead information." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("API route error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
