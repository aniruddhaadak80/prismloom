"use client";

import { useEffect, useRef, useState } from "react";

export default function VisualizerPage() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [mode, setMode] = useState("bars");
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    let raf = 0;
    const resize = () => { canvas.width = canvas.clientWidth * 2; canvas.height = canvas.clientHeight * 2; };
    resize(); window.addEventListener("resize", resize);
    const t0 = performance.now();
    const draw = () => {
      raf = requestAnimationFrame(draw);
      const t = (performance.now() - t0) / 1000;
      const w = canvas.width, h = canvas.height;
      ctx.fillStyle = "rgba(5,6,10,0.25)";
      ctx.fillRect(0, 0, w, h);
      if (mode === "bars") {
        const n = 64;
        for (let i = 0; i < n; i++) {
          const v = Math.sin(t * 2 + i * 0.3) * 0.5 + 0.5;
          const barH = v * h * 0.8;
          const x = (i / n) * w;
          const bw = w / n - 2;
          const grad = ctx.createLinearGradient(0, h, 0, h - barH);
          grad.addColorStop(0, "#7cf7ff");
          grad.addColorStop(1, "#ff6bd6");
          ctx.fillStyle = grad;
          ctx.fillRect(x, h - barH, bw, barH);
        }
      } else if (mode === "radial") {
        const n = 96;
        for (let i = 0; i < n; i++) {
          const a = (i / n) * Math.PI * 2;
          const v = 0.3 + 0.7 * (Math.sin(t * 3 + i * 0.5) * 0.5 + 0.5);
          const r = v * Math.min(w, h) * 0.4;
          ctx.strokeStyle = `hsl(${(i / n) * 360}, 90%, 60%)`;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(w / 2, h / 2);
          ctx.lineTo(w / 2 + Math.cos(a) * r, h / 2 + Math.sin(a) * r);
          ctx.stroke();
        }
      } else {
        const n = 120;
        for (let i = 0; i < n; i++) {
          const a = (i / n) * Math.PI * 2;
          const r = Math.min(w, h) * 0.35 + Math.sin(t * 2 + i * 0.2) * 40;
          ctx.fillStyle = `hsl(${(i / n) * 360 + t * 40}, 80%, 60%)`;
          ctx.beginPath();
          ctx.arc(w / 2 + Math.cos(a) * r, h / 2 + Math.sin(a) * r, 3, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, [mode]);
  return (
    <main className="min-h-screen px-6 py-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold neon">Audio Visualizer</h1>
          <p className="text-muted mt-1">Canvas-based procedural visualizations synced to synthetic beats.</p>
        </div>
        <div className="flex gap-2">
          {["bars", "radial", "orbit"].map((m) => (
            <button key={m} onClick={() => setMode(m)} className={`px-4 py-2 rounded-lg text-sm transition ${mode === m ? "bg-accent text-black font-bold" : "border border-white/10 hover:bg-white/5"}`}>{m}</button>
          ))}
        </div>
      </div>
      <canvas ref={ref} className="w-full h-[70vh] rounded-xl border border-white/10 bg-black" />
    </main>
  );
}
