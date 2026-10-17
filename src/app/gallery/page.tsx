"use client";

import { useState } from "react";

const CREATIONS = [
  { id: "c1", title: "Neon Nebula", author: "kai", likes: 142, tags: ["webgl","nebula"], updated: "2h ago" },
  { id: "c2", title: "Cyber Grid Live", author: "leo", likes: 89, tags: ["motion","grid"], updated: "5h ago" },
  { id: "c3", title: "Void Bass", author: "mio", likes: 210, tags: ["audio","bass"], updated: "1d ago" },
  { id: "c4", title: "Tesseract Spin", author: "rin", likes: 167, tags: ["4d","webgl"], updated: "1d ago" },
  { id: "c5", title: "Cherry Blossom", author: "neo", likes: 95, tags: ["motion","blossom"], updated: "2d ago" },
];

export default function GalleryPage() {
  const [q, setQ] = useState("");
  const list = CREATIONS.filter((c) => c.title.toLowerCase().includes(q.toLowerCase()) || c.tags.some((t) => t.includes(q.toLowerCase())));
  return (
    <main className="min-h-screen px-6 py-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold neon">Community Gallery</h1>
          <p className="text-muted mt-1">Creations saved to the vault by PRISMLOOM builders.</p>
        </div>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search creations…" className="bg-black/30 border border-white/10 rounded-lg px-3 py-2 outline-none focus:border-accent" />
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {list.map((c) => (
          <article key={c.id} className="glass p-5 hover:scale-[1.01] transition group">
            <div className="h-32 bg-black/40 rounded-xl border border-white/10 mb-3 flex items-center justify-center text-xs text-muted overflow-hidden">
              {c.tags[0].toUpperCase()} preview
            </div>
            <h3 className="font-bold text-sm">{c.title}</h3>
            <div className="flex items-center justify-between mt-2">
              <span className="text-[10px] text-muted">{c.author} · {c.updated}</span>
              <span className="text-xs font-bold">{c.likes} ❤</span>
            </div>
            <div className="flex gap-1 mt-3">
              {c.tags.map((t) => (
                <span key={t} className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-xs border border-white/10">
                  {t}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
