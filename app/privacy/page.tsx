import type { Metadata } from "next";
import PageShell from "../components/PageShell";
import PrivacyPolicy from "../components/PrivacyPolicy";
import { pageMetadata } from "../lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy — Jumprope Tracker",
  description:
    "Jumprope Tracker works completely offline by default. Read what stays on your device and what the optional Cloud Sync and AI Coach features share.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <PageShell>
      <PrivacyPolicy standalone />
    </PageShell>
  );
}
