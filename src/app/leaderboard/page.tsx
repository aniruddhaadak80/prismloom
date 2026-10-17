"use client";

const USERS = [
  { name: "kai", xp: 42100, badge: "WebGL Master", rank: 1 },
  { name: "leo", xp: 38900, badge: "Motion Lord", rank: 2 },
  { name: "mio", xp: 35200, badge: "Audio Alchemist", rank: 3 },
  { name: "rin", xp: 31400, badge: "4D Navigator", rank: 4 },
  { name: "neo", xp: 29100, badge: "Shader Weaver", rank: 5 },
  { name: "sora", xp: 26700, badge: "Prompt Sage", rank: 6 },
  { name: "ash", xp: 23400, badge: "Gallery Curator", rank: 7 },
  { name: "lyn", xp: 21100, badge: "Arena Veteran", rank: 8 },
];

export default function LeaderboardPage() {
  return (
    <main className="min-h-screen px-6 py-8 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold neon">Leaderboard</h1>
          <p className="text-muted mt-1">Top builders by vault XP.</p>
        </div>
      </div>
      <div className="glass overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead><tr className="border-b border-white/10">
            <th className="pb-3 text-xs text-muted">#</th>
            <th className="pb-3 text-xs text-muted">Builder</th>
            <th className="pb-3 text-xs text-muted">Badge</th>
            <th className="pb-3 text-xs text-muted text-right">XP</th>
          </tr></thead>
          <tbody>
            {USERS.map((u) => (
              <tr key={u.name} className="border-b border-white/5 hover:bg-white/5 transition">
                <td className="py-3 text-xs font-bold text-accent">{u.rank}</td>
                <td className="py-3 text-sm font-bold">{u.name}</td>
                <td className="py-3 text-xs text-muted">{u.badge}</td>
                <td className="py-3 text-sm font-mono text-right">{u.xp.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
