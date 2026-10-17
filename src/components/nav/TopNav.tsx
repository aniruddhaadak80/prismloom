"use client";

import Link from "next/link";
import { useState } from "react";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/arena", label: "Arena" },
  { href: "/4d", label: "4D Tesseract" },
  { href: "/shader", label: "Live Shader" },
  { href: "/motion", label: "Motion" },
  { href: "/audio", label: "Audio" },
  { href: "/prompts", label: "Prompts" },
  { href: "/gallery", label: "Gallery" },
  { href: "/vault", label: "Vault" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/creator", label: "Creator" },
  { href: "/leaderboard", label: "Leaderboard" },
  { href: "/achievements", label: "Achievements" },
  { href: "/multiplayer", label: "Multiplayer" },
  { href: "/profile/me", label: "Profile" },
  { href: "/settings", label: "Settings" },
];

export default function TopNav() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="sticky top-0 z-50 glass border-b border-white/10 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <Link href="/" className="font-black text-xl tracking-tighter neon flex items-center gap-2">
          PRISMLOOM
        </Link>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="text-muted hover:text-white transition">
              {l.label}
            </Link>
          ))}
        </div>
        <button className="md:hidden p-2 rounded-lg hover:bg-white/10" onClick={() => setOpen(!open)} aria-label="menu">
          ☰
        </button>
      </div>
      {open && (
        <div className="md:hidden glass p-4 border-b border-white/10 mt-1">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-white/10">
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
