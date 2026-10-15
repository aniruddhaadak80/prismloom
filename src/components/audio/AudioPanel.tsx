"use client";

import { useState, useRef, useCallback } from "react";

interface Track { id: string; name: string; bpm: number; pattern: number[]; freqs: number[]; type: OscillatorType; }

const TRACKS: Track[] = [
  { id: "t1", name: "Neon Arp", bpm: 128, pattern: [1,0,1,0,1,1,0,1], freqs: [261.63,329.63,392.0,523.25], type: "square" },
  { id: "t2", name: "Cyber Pulse", bpm: 140, pattern: [1,0,0,1,0,1,0,0], freqs: [110,165,220,330], type: "sawtooth" },
  { id: "t3", name: "Lofi Drift", bpm: 82, pattern: [1,0,1,0,0,1,0,1], freqs: [196,246.94,293.66,392], type: "triangle" },
  { id: "t4", name: "Bass Engine", bpm: 110, pattern: [1,0,0,0,1,0,1,0], freqs: [55,82.41,110,146.83], type: "sine" },
  { id: "t5", name: "Crystal Bells", bpm: 96, pattern: [1,1,0,1,0,0,1,0], freqs: [523.25,659.25,783.99,1046.5], type: "sine" },
  { id: "t6", name: "Voidpad", bpm: 60, pattern: [1,0,0,0,0,0,1,0], freqs: [130.81,164.81,196,261.63], type: "triangle" },
  { id: "t7", name: "Stutter Seq", bpm: 160, pattern: [1,1,1,0,1,0,1,1], freqs: [349.23,440,523.25,698.46], type: "square" },
  { id: "t8", name: "Aurora Wash", bpm: 70, pattern: [1,0,1,1,0,1,0,0], freqs: [293.66,369.99,440,587.33], type: "sawtooth" },
];

export default function AudioPanel() {
  const [active, setActive] = useState<string | null>(null);
  const ctxRef = useRef<AudioContext | null>(null);
  const stopRef = useRef<(() => void) | null>(null);

  const stop = useCallback(() => {
    stopRef.current?.();
    stopRef.current = null;
    setActive(null);
  }, []);

  const play = useCallback((track: Track) => {
    stop();
    const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    ctxRef.current = ctx;
    const master = ctx.createGain();
    master.gain.value = 0.18;
    master.connect(ctx.destination);
    const stepTime = 60 / track.bpm / 2;

    let step = 0;
    let timer: ReturnType<typeof setInterval> | null = null;
    const tick = () => {
      if (track.pattern[step % track.pattern.length]) {
        const freq = track.freqs[Math.floor(Math.random() * track.freqs.length)];
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = track.type;
        osc.frequency.value = freq;
        g.gain.setValueAtTime(0.0001, ctx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.35, ctx.currentTime + 0.01);
        g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + stepTime * 0.9);
        osc.connect(g); g.connect(master);
        osc.start();
        osc.stop(ctx.currentTime + stepTime);
      }
      step++;
    };
    tick();
    timer = setInterval(tick, stepTime * 1000);
    stopRef.current = () => { if (timer) clearInterval(timer); ctx.close(); };
    setActive(track.id);
  }, [stop]);

  return (
    <div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {TRACKS.map((t) => (
          <button
            key={t.id}
            onClick={() => (active === t.id ? stop() : play(t))}
            className={`glass p-5 text-left transition hover:scale-[1.02] ${active === t.id ? "border-accent bg-accent/10" : ""}`}
          >
            <div className="flex items-center justify-between">
              <span className="font-bold">{t.name}</span>
              <span className="text-xs text-muted">{active === t.id ? "■ stop" : "▶ play"}</span>
            </div>
            <div className="text-xs text-muted mt-2">
              {t.bpm} BPM · {t.type} · {t.pattern.filter(Boolean).length}/8 steps
            </div>
            <div className="flex gap-1 mt-3">
              {t.pattern.map((p, i) => (
                <span key={i} className={`h-4 w-2 rounded ${p ? "bg-accent" : "bg-white/10"}`} />
              ))}
            </div>
          </button>
        ))}
      </div>
      <p className="text-xs text-muted mt-6">
        Audio is procedural Web Audio — no samples, no keys. Run in a browser with sound enabled.
      </p>
    </div>
  );
}
