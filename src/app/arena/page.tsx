"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { SCENES, type Scene } from "@/lib/scenes";

const LoomScene = dynamic(() => import("@/components/webgl/LoomScene"), { ssr: false });

export default function ArenaPage() {
  const [active, setActive] = useState<Scene>(SCENES[0]);
  const [playing, setPlaying] = useState(true);

  return (
    <main className="min-h-screen px-6 py-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold neon">WebGL Arena</h1>
          <p className="text-muted mt-1">16 live scenes. Move your cursor — most of them react.</p>
        </div>
        <Link href="/" className="text-sm text-muted hover:text-white">← Home</Link>
      </div>

      <div className="grid lg:grid-cols-[320px_1fr] gap-6">
        <aside className="glass p-4 h-[70vh] overflow-y-auto">
          <div className="text-xs uppercase tracking-widest text-muted mb-3">Scenes</div>
          <ul className="space-y-2">
            {SCENES.map((s) => (
              <li key={s.id}>
                <button
                  onClick={() => setActive(s)}
                  className={`w-full text-left p-3 rounded-xl border transition ${
                    active.id === s.id
                      ? "border-accent bg-accent/10"
                      : "border-white/10 hover:border-white/20 hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">{s.name}</span>
                    <span className="text-[10px] text-muted">{s.id}</span>
                  </div>
                  <div className="text-xs text-muted mt-1">{s.tag}</div>
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <section className="glass overflow-hidden flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <div>
              <h2 className="text-xl font-bold">{active.name}</h2>
              <p className="text-sm text-muted">{active.description}</p>
            </div>
            <div className="flex gap-2">
              {active.palette.map((c) => (
                <span key={c} className="w-5 h-5 rounded-full border border-white/20" style={{ background: c }} />
              ))}
              <button onClick={() => setPlaying((p) => !p)} className="ml-3 px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-sm">
                {playing ? "Pause" : "Play"}
              </button>
            </div>
          </div>
          <div className="relative flex-1 min-h-[60vh] bg-black/40">
            {playing && <LoomScene kind={active.kind} className="w-full h-full" />}
          </div>
        </section>
      </div>
    </main>
  );
}
