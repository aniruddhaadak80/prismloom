import TopNav from "@/components/nav/TopNav";

const FEATURES = [
  { href: "/arena", title: "WebGL Arena", desc: "16 live Three.js scenes — flock, galaxy, vortex, helix. Cursor-reactive.", tag: "WebGL" },
  { href: "/4d", title: "4D Tesseract", desc: "Eight cubes offset in w, projected into 3D. A real fourth-dimension playground.", tag: "4D" },
  { href: "/shader", title: "Live Shader", desc: "Edit GLSL fragment shaders in real time on a fullscreen canvas.", tag: "GLSL" },
  { href: "/motion", title: "Motion Studio", desc: "20 framer-motion studies from orbits to spring pops.", tag: "Motion" },
  { href: "/audio", title: "Procedural Audio", desc: "12 zero-sample tracks synthesized with the Web Audio API.", tag: "Audio" },
  { href: "/prompts", title: "Prompt Library", desc: "5,200+ design/code/game prompts tagged by vibe, stack, model.", tag: "Prompts" },
  { href: "/vault", title: "Inspiration Vault", desc: "What builders ship with Gemini, Opus, Fable, GPT-6, Soul, Muse.", tag: "Research" },
  { href: "/dashboard", title: "Dashboard", desc: "Gamified XP, level, and recent activity.", tag: "Gamified" },
  { href: "/gallery", title: "Community Gallery", desc: "Creations saved to the vault by builders.", tag: "Social" },
];

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <TopNav />
      <section className="relative overflow-hidden flex-1 px-6 py-24">
        <div className="absolute inset-0 grid-bg opacity-60 pointer-events-none" />
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="inline-block px-3 py-1 rounded-full border border-accent/40 text-accent text-xs tracking-widest uppercase mb-6">
            PRISMLOOM · gamified design arena
          </div>
          <h1 className="text-6xl md:text-8xl font-black neon leading-none mb-6">
            Prompt → World
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted max-w-2xl mx-auto mb-10">
            A creative coding playground where a prompt becomes a playable 3D scene, a motion study, or a sound.
            16 WebGL scenes, 20 motion graphics, 12 procedural audio tracks, 4D tesseract, live GLSL shader,
            and a 5,200+ prompt vault — all zero-key, all in your browser.
          </p>
          <div className="mt-10 flex gap-3 justify-center flex-wrap">
            <a href="/arena" className="px-7 py-3.5 rounded-xl bg-accent text-black font-bold hover:opacity-90 shadow-[0_0_40px_rgba(124,247,255,0.35)]">
              Enter Arena
            </a>
            <a href="/prompts" className="px-7 py-3.5 rounded-xl glass font-bold hover:bg-white/10 border border-white/10">
              Browse Prompts
            </a>
          </div>
        </div>
      </section>

      <section className="px-6 pb-20 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Surfaces</h2>
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
          {FEATURES.map((f) => (
            <a key={f.href} href={f.href} className="glass p-6 hover:scale-[1.01] transition block">
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-bold text-xl">{f.title}</h2>
                <span className="text-[10px] uppercase tracking-widest text-accent border border-accent/30 rounded px-2 py-0.5">{f.tag}</span>
              </div>
              <p className="text-sm text-muted">{f.desc}</p>
            </a>
          ))}
        </div>
      </section>

      <footer className="px-6 py-10 text-center text-xs text-muted border-t border-white/10">
        Built with Next.js 16 · React 19 · Three.js · Framer Motion · Web Audio · Tailwind v4 — MIT · Zero API keys
      </footer>
    </main>
  );
}
