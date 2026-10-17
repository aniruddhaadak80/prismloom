"use client";

import { useState } from "react";

export default function CreatorPage() {
  const [mode, setMode] = useState("webgl");
  return (
    <main className="min-h-screen px-6 py-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold neon">Creator Studio</h1>
          <p className="text-muted mt-1">Build, save, and share your own scenes. Zero API keys.</p>
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-5">
        <div className="glass p-6 flex flex-col">
          <div className="flex gap-2 mb-4">
            {["webgl","motion","audio","hybrid"].map((m) => (
              <button key={m} onClick={() => setMode(m)} className={`flex-1 px-3 py-2 rounded-lg text-sm transition ${
                mode === m ? "bg-accent text-black font-bold" : "border border-white/10 hover:bg-white/5"
              }`}>{m}</button>
            ))}
          </div>
          <div className="flex-1 bg-black/30 rounded-xl border border-white/10 p-4 flex items-center justify-center text-muted">
            {mode === "webgl" && "Place Three.js nodes"}
            {mode === "motion" && "Compose keyframes"}
            {mode === "audio" && "Patch oscillators"}
            {mode === "hybrid" && "Mix WebGL + audio"}
          </div>
        </div>
        <div className="md:col-span-2 glass p-6 flex flex-col">
          <h2 className="font-bold text-lg mb-4">Canvas</h2>
          <div className="flex-1 bg-black rounded-xl border border-white/10 flex items-center justify-center text-muted text-sm">Live preview renders here</div>
          <div className="mt-4 flex gap-3">
            <button className="px-5 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10">Export PNG</button>
            <button className="px-5 py-2 rounded-lg bg-accent text-black font-bold hover:opacity-90">Save to Vault</button>
          </div>
        </div>
      </div>
    </main>
  );
}
