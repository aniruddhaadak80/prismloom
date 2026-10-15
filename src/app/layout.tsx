import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PRISMLOOM — Gamified Design Arena",
  description:
    "A WebGL-first creative coding playground: 15+ WebGL scenes, 15+ motion graphics, procedural audio, and a 5,000+ prompt library inspired by what builders ship with Gemini, Opus, Fable, GPT-6, Soul, Muse and more. Zero API keys.",
  openGraph: {
    title: "PRISMLOOM",
    description: "Prompt → world. Play the design arena.",
    type: "website",
  },
};

import type { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#05060a] text-white">{children}</body>
    </html>
  );
}