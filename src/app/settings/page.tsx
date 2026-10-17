"use client";

export default function SettingsPage() {
  return (
    <main className="min-h-screen px-6 py-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold neon mb-6">Settings</h1>
      <div className="glass p-6 space-y-6">
        <div>
          <label className="block text-sm font-bold mb-2">Theme</label>
          <div className="flex gap-3">
            <button className="px-4 py-2 rounded-lg border border-white/10 bg-accent text-black font-bold">Neon Dark</button>
            <button className="px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-white">Solar Light</button>
          </div>
        </div>
        <div>
          <label className="block text-sm font-bold mb-2">Audio</label>
          <div className="flex items-center gap-3">
            <input type="checkbox" defaultChecked className="accent-accent" />
            <span className="text-sm">Enable procedural audio</span>
          </div>
        </div>
        <div>
          <label className="block text-sm font-bold mb-2">Reduce motion</label>
          <div className="flex items-center gap-3">
            <input type="checkbox" className="accent-accent" />
            <span className="text-sm">Respect prefers-reduced-motion</span>
          </div>
        </div>
        <div className="pt-6 border-t border-white/10">
          <button className="px-5 py-2 rounded-lg bg-white/10 border border-white/10 hover:bg-white/20">Export data</button>
          <button className="ml-3 px-5 py-2 rounded-lg border border-white/10 hover:bg-white/10">Clear local vault</button>
        </div>
      </div>
      <p className="mt-8 text-xs text-muted">All data lives in your browser (localStorage). No server, no keys.</p>
    </main>
  );
}
