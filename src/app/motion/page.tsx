import Link from "next/link";
import { MotionGallery } from "@/components/motion/MotionGallery";

export const metadata = {
  title: "Motion Graphics — PRISMLOOM",
};

export default function MotionPage() {
  return (
    <main className="min-h-screen px-6 py-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold neon">Motion Graphics</h1>
          <p className="text-muted mt-1">16 distinct framer-motion studies, hover to inspect.</p>
        </div>
        <Link href="/" className="text-sm text-muted hover:text-white">← Home</Link>
      </div>
      <MotionGallery />
    </main>
  );
}
