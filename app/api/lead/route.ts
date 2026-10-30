import { NextResponse } from "next/server";
import { SheetsError, appendRows, getSheetsClient, sheetTimestamp } from "../../lib/googleSheets";

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

    // 2. Authenticate with Google
    const client = await getSheetsClient();
    if (!client) {
      return NextResponse.json(
        { error: "Internal server configuration error." },
        { status: 500 }
      );
    }

    // 3. Append to Google Sheets. 2nd sheet is called "Jumprope App"
    const sheetResponse = await appendRows(client, "'Jumprope App'!A:D", [
      [sheetTimestamp(), name.trim(), email.trim(), source.trim()],
    ]);

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
    if (error instanceof SheetsError) {
      console.error(error.message);
      return NextResponse.json({ error: error.publicMessage }, { status: 500 });
    }
    console.error("API route error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
