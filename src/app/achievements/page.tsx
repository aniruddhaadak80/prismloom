"use client";

const BADGES = [
  { id: "b1", name: "First Steps", icon: "🚀", desc: "Open your first WebGL scene", earned: true },
  { id: "b2", name: "Galaxy Gazer", icon: "🌌", desc: "View all 16 arena scenes", earned: true },
  { id: "b3", name: "Sound Weaver", icon: "🎵", desc: "Play every audio track", earned: true },
  { id: "b4", name: "Prompt Sage", icon: "📜", desc: "Star 10 prompts", earned: false },
  { id: "b5", name: "Shader Weaver", icon: "💎", desc: "Edit a custom shader", earned: true },
  { id: "b6", name: "4D Navigator", icon: "🌀", desc: "Enter the 4D arena", earned: false },
  { id: "b7", name: "Motion Lord", icon: "✨", desc: "Complete motion gallery", earned: false },
  { id: "b8", name: "Vault Curator", icon: "🗄", desc: "Save 5 creations", earned: false },
  { id: "b9", name: "Leaderboard Climber", icon: "🏆", desc: "Top 10 leaderboard", earned: false },
  { id: "b10", name: "Prismloom Pioneer", icon: "💎", desc: "Use all surfaces", earned: false },
];

export default function AchievementsPage() {
  const earned = BADGES.filter(b => b.earned).length;
  return (
    <main className="min-h-screen px-6 py-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold neon">Achievements</h1>
          <p className="text-muted mt-1">{earned} / {BADGES.length} badges unlocked</p>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {BADGES.map((b) => (
          <article key={b.id} className={`glass p-5 rounded-xl flex flex-col items-center gap-3 text-center ${b.earned ? "border-accent bg-accent/5" : "opacity-60 grayscale"}`}>
            <div className="text-3xl">{b.icon}</div>
            <h3 className="font-bold text-sm">{b.name}</h3>
            <p className="text-[11px] text-muted leading-tight">{b.desc}</p>
            {b.earned && <span className="text-[10px] px-2 py-0.5 rounded bg-accent/20 text-accent border border-accent/30">earned</span>}
          </article>
        ))}
      </div>
    </main>
  );
}
