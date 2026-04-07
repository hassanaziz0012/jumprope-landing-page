import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jumprope Tracker — Your Jump Rope Journey, Beautifully Tracked",
  description:
    "Log workouts, crush goals, and build unstoppable streaks — all offline, all on your device. Free, open-source jump rope tracking for Android & iOS.",
  keywords: [
    "jump rope",
    "jump rope tracker",
    "workout tracker",
    "fitness app",
    "offline fitness",
    "streak tracker",
  ],
  openGraph: {
    title: "Jumprope Tracker — Your Jump Rope Journey, Beautifully Tracked",
    description:
      "Log workouts, crush goals, and build unstoppable streaks — all offline, all on your device.",
    url: "https://jumprope.hassandev.me",
    siteName: "Jumprope Tracker",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
