import { type Metadata } from "next";

export const metadata: Metadata = { title: "Dashboard — PRISMLOOM" };

export default function DashboardPage() {
  return (
    <main className="min-h-screen px-6 py-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold neon">Creator Dashboard</h1>
          <p className="text-muted mt-1">Your XP, levels, badges, and saved creations.</p>
        </div>
        <a href="/creator" className="px-5 py-2.5 rounded-xl bg-accent text-black font-bold hover:opacity-90">Create New</a>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="glass p-6">
          <div className="text-xs uppercase tracking-widest text-muted mb-2">Level</div>
          <div className="text-4xl font-bold">07</div>
          <div className="mt-3 w-full bg-white/10 rounded-full h-2 overflow-hidden"><div className="bg-accent h-full w-1/2" /></div>
        </div>
        <div className="glass p-6">
          <div className="text-xs uppercase tracking-widest text-muted mb-2">XP</div>
          <div className="text-4xl font-bold text-accent">12,840</div>
          <div className="text-sm text-muted">to next: 2,160</div>
        </div>
        <div className="glass p-6">
          <div className="text-xs uppercase tracking-widest text-muted mb-2">Creations</div>
          <div className="text-4xl font-bold">24</div>
          <div className="text-sm text-muted">saved in vault</div>
        </div>
      </div>
      <div className="mt-8 glass p-6">
        <h2 className="font-bold text-lg mb-4">Recent Activity</h2>
        <div className="space-y-3">
          {["Opened Neon Flock","Saved Galaxy scene","Earned 'Shader Weaver' badge","Played Aurora audio track"].map((a, i) => (
            <div key={i} className="flex items-center justify-between p-3 border border-white/5 rounded-lg text-sm">
              <span className="text-muted">{a}</span>
              <span className="text-xs text-muted">just now</span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
