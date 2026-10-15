import Link from "next/link";
import { MODEL_BUILDERS } from "@/lib/vault";

export default function VaultPage() {
  return (
    <main className="min-h-screen px-6 py-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold neon">Inspiration Vault</h1>
          <p className="text-muted mt-1">What builders actually ship with each model family — curated patterns, not benchmarks.</p>
        </div>
        <Link href="/" className="text-sm text-muted hover:text-white">← Home</Link>
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        {MODEL_BUILDERS.map((m) => (
          <article key={m.id} className="glass p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-3 h-3 rounded-full" style={{ background: m.color, boxShadow: `0 0 12px ${m.color}` }} />
              <h2 className="text-lg font-bold">{m.name}</h2>
              <span className="text-xs text-muted">{m.maker}</span>
              <span className="ml-auto text-xs text-muted">{m.strength}</span>
            </div>
            <p className="text-sm text-muted italic mb-3">{m.vibe}</p>
            <div className="mb-3">
              <div className="text-xs uppercase tracking-widest text-muted mb-1">What people build</div>
              <ul className="text-sm space-y-1 list-disc pl-5">
                {m.whatPeopleBuild.map((w) => <li key={w}>{w}</li>)}
              </ul>
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest text-muted mb-1">Prompt patterns</div>
              <div className="flex flex-wrap gap-2">
                {m.promptPatterns.map((p) => (
                  <code key={p} className="text-xs bg-white/5 border border-white/10 rounded px-2 py-1">{p}</code>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
