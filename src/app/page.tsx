import Link from "next/link";

const FEATURES = [
  { href: "/arena", title: "WebGL Arena", desc: "16 live Three.js scenes — flock, galaxy, vortex, helix. Cursor-reactive.", tag: "WebGL" },
  { href: "/motion", title: "Motion Studio", desc: "16 framer-motion studies from orbits to spring pops.", tag: "Motion" },
  { href: "/audio", title: "Procedural Audio", desc: "8 zero-sample tracks synthesized with the Web Audio API.", tag: "Audio" },
  { href: "/prompts", title: "Prompt Library", desc: "5,200+ design/code/game prompts tagged by vibe, stack, model.", tag: "Prompts" },
  { href: "/vault", title: "Inspiration Vault", desc: "What builders actually ship with Gemini, Opus, Fable, GPT-6, Soul, Muse.", tag: "Research" },
];

export default function Home() {
  return (
    <main className="min-h-screen">
      <section className="relative overflow-hidden px-6 py-24">
        <div className="absolute inset-0 grid-bg opacity-60" />
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="inline-block px-3 py-1 rounded-full border border-accent/40 text-accent text-xs tracking-widest uppercase mb-6">
            PRISMLOOM · gamified design arena
          </div>
          <h1 className="text-6xl md:text-8xl font-black neon leading-none">
            Prompt → World
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted max-w-2xl mx-auto">
            A creative coding playground where a prompt becomes a playable 3D scene, a motion study, or a sound.
            16 WebGL scenes, 16 motion graphics, procedural audio, and a 5,000+ prompt vault — all zero-key, all in your browser.
          </p>
          <div className="mt-8 flex gap-3 justify-center flex-wrap">
            <Link href="/arena" className="px-6 py-3 rounded-xl bg-accent text-black font-bold hover:opacity-90">Enter Arena</Link>
            <Link href="/prompts" className="px-6 py-3 rounded-xl glass font-bold hover:bg-white/10">Browse Prompts</Link>
          </div>
        </div>
      </section>

      <section className="px-6 pb-20 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((f) => (
            <Link key={f.href} href={f.href} className="glass p-6 hover:scale-[1.01] transition block">
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-bold text-xl">{f.title}</h2>
                <span className="text-[10px] uppercase tracking-widest text-accent border border-accent/30 rounded px-2 py-0.5">{f.tag}</span>
              </div>
              <p className="text-sm text-muted">{f.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <footer className="px-6 py-8 text-center text-xs text-muted border-t border-white/10">
        Built with Next.js 15 · React 19 · Three.js · Framer Motion · Tailwind v4 — MIT
      </footer>
    </main>
  );
}
