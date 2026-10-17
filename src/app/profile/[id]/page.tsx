import { type Metadata } from "next";

export const metadata: Metadata = { title: "Profile — PRISMLOOM" };

export default function ProfilePage({ params }: { params: { id: string } }) {
  return (
    <main className="min-h-screen px-6 py-8 max-w-3xl mx-auto">
      <div className="glass p-8 flex flex-col md:flex-row gap-6 items-start">
        <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-accent to-accent2 flex items-center justify-center text-2xl font-black text-black shrink-0">PR</div>
        <div>
          <h1 className="text-3xl font-bold neon">@{params.id}</h1>
          <p className="text-muted mt-2">Explorer · Level 07 · 12,840 XP</p>
          <div className="mt-4 flex gap-2">
            <span className="px-2 py-1 rounded bg-white/10 border border-white/10 text-xs">24 creations</span>
            <span className="px-2 py-1 rounded bg-white/10 border border-white/10 text-xs">12 badges</span>
          </div>
        </div>
      </div>
      <h2 className="mt-10 mb-4 font-bold text-lg">Featured</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {Array.from({ length: 6 }).map((_, i) => (
          <article key={i} className="glass p-5 h-48 flex flex-col justify-between">
            <div className="flex-1">
              <h3 className="font-bold text-sm">Featured scene {i + 1}</h3>
              <p className="text-xs text-muted">WebGL · audio-reactive</p>
            </div>
            <span className="text-xs text-muted">2026</span>
          </article>
        ))}
      </div>
    </main>
  );
}
