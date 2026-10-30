import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { metadataBase, pageMetadata } from "./lib/metadata";
import { AUTHOR, HOME_TITLE, SITE_DESCRIPTION } from "./lib/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase,
  ...pageMetadata({
    title: HOME_TITLE,
    description: SITE_DESCRIPTION,
    path: "/",
  }),
  keywords: [
    "jump rope",
    "jump rope tracker",
    "workout tracker",
    "fitness app",
    "offline fitness",
    "streak tracker",
  ],
  authors: [AUTHOR],
  creator: AUTHOR.name,
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
