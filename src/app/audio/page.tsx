import Link from "next/link";
import AudioPanel from "@/components/audio/AudioPanel";

export default function AudioPage() {
  return (
    <main className="min-h-screen px-6 py-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold neon">Procedural Audio</h1>
          <p className="text-muted mt-1">8 zero-sample, zero-key tracks synthesized in-browser.</p>
        </div>
        <Link href="/" className="text-sm text-muted hover:text-white">← Home</Link>
      </div>
      <AudioPanel />
    </main>
  );
}
