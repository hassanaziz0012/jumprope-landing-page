import { NextResponse } from "next/server";
import {
  SheetsError,
  addSheet,
  appendRows,
  getSheetsClient,
  sheetTimestamp,
} from "../../lib/googleSheets";

// Messages land in a "Contact" tab of the same spreadsheet as download leads.
// The tab is created (with a header row) the first time a message comes in.
const SHEET_TITLE = "Contact";
const RANGE = `'${SHEET_TITLE}'!A:D`;
const MAX_MESSAGE_LENGTH = 5000;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message, website } = body;

    // Honeypot: the hidden "website" field is only filled in by bots.
    // Pretend success so they don't retry.
    if (website) {
      return NextResponse.json({ success: true });
    }

    if (!name || typeof name !== "string" || name.trim().length === 0 || name.length > 100) {
      return NextResponse.json({ error: "Invalid name provided." }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email) || email.length > 100) {
      return NextResponse.json({ error: "Invalid email format." }, { status: 400 });
    }

    if (
      !message ||
      typeof message !== "string" ||
      message.trim().length === 0 ||
      message.length > MAX_MESSAGE_LENGTH
    ) {
      return NextResponse.json(
        { error: `Please write a message (up to ${MAX_MESSAGE_LENGTH} characters).` },
        { status: 400 }
      );
    }

    const client = await getSheetsClient();
    if (!client) {
      return NextResponse.json(
        { error: "Internal server configuration error." },
        { status: 500 }
      );
    }

    // RAW so a message starting with "=" is stored as text, not run as a formula.
    const row = [sheetTimestamp(), name.trim(), email.trim(), message.trim()];
    let sheetResponse = await appendRows(client, RANGE, [row], "RAW");

    // A missing tab makes the range unparseable (HTTP 400): create it and retry.
    if (sheetResponse.status === 400) {
      const created = await addSheet(client, SHEET_TITLE);
      if (created.ok) {
        sheetResponse = await appendRows(
          client,
          RANGE,
          [["Timestamp", "Name", "Email", "Message"], row],
          "RAW"
        );
      }
    }

    if (!sheetResponse.ok) {
      const errorText = await sheetResponse.text();
      console.error("Failed to append contact message to Google Sheet:", errorText);
      return NextResponse.json(
        { error: "Failed to send your message. Please try again later." },
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
