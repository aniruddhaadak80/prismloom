"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import prompts from "@/data/prompts.json";

interface P {
  id: string;
  title: string;
  prompt: string;
  category: string;
  tags: string[];
  vibe: string;
  difficulty: string;
  stack: string;
  model: string;
  webgl: boolean;
  motion: boolean;
  audio: boolean;
}

const ALL = prompts as P[];

export default function PromptsPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");
  const [model, setModel] = useState("all");
  const [diff, setDiff] = useState("all");

  const categories = useMemo(() => ["all", ...Array.from(new Set(ALL.map((p) => p.category))).sort()], []);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return ALL.filter((p) => {
      if (cat !== "all" && p.category !== cat) return false;
      if (model !== "all" && p.model !== model) return false;
      if (diff !== "all" && p.difficulty !== diff) return false;
      if (!needle) return true;
      return p.title.toLowerCase().includes(needle) || p.prompt.toLowerCase().includes(needle) || p.tags.some((t) => t.includes(needle));
    });
  }, [q, cat, model, diff]);

  const shown = filtered.slice(0, 120);

  return (
    <main className="min-h-screen px-6 py-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold neon">Prompt Library</h1>
          <p className="text-muted mt-1">{ALL.length.toLocaleString()} prompts · showing {shown.length} of {filtered.length.toLocaleString()} filtered</p>
        </div>
        <Link href="/" className="text-sm text-muted hover:text-white">← Home</Link>
      </div>

      <div className="glass p-4 mb-6 grid md:grid-cols-4 gap-3">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search prompts, tags, stacks…"
          className="bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-accent"
        />
        <select value={cat} onChange={(e) => setCat(e.target.value)} className="bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-sm">
          {categories.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <select value={model} onChange={(e) => setModel(e.target.value)} className="bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-sm">
          <option value="all">all models</option>
          {Array.from(new Set(ALL.map((p) => p.model))).map((m) => <option key={m} value={m}>{m}</option>)}
        </select>
        <select value={diff} onChange={(e) => setDiff(e.target.value)} className="bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-sm">
          <option value="all">all difficulties</option>
          {["easy","medium","hard","insane"].map((d) => <option key={d} value={d}>{d}</option>)}
        </select>
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        {shown.map((p) => (
          <article key={p.id} className="glass p-4">
            <div className="flex items-center gap-2 mb-1">
              <code className="text-xs text-accent">{p.id}</code>
              <span className="text-xs text-muted">{p.model}</span>
              <span className="text-xs text-muted">· {p.difficulty}</span>
              <span className="ml-auto text-xs text-muted">{p.stack}</span>
            </div>
            <h3 className="font-semibold text-sm mb-1">{p.title}</h3>
            <p className="text-xs text-muted leading-relaxed">{p.prompt}</p>
            <div className="flex flex-wrap gap-1 mt-2">
              {p.webgl && <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">WebGL</span>}
              {p.motion && <span className="text-[10px] px-2 py-0.5 rounded bg-sky-500/15 text-sky-300 border border-sky-500/30">Motion</span>}
              {p.audio && <span className="text-[10px] px-2 py-0.5 rounded bg-pink-500/15 text-pink-300 border border-pink-500/30">Audio</span>}
            </div>
          </article>
        ))}
      </div>
      {filtered.length > shown.length && (
        <p className="text-center text-muted text-sm mt-6">Refine filters to see more — {filtered.length - shown.length} hidden.</p>
      )}
    </main>
  );
}
