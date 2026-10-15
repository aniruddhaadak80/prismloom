"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const VARIANTS = [
  { name: "Orbit Spring", animate: { rotate: 360 }, transition: { duration: 4, repeat: Infinity, ease: "linear" } },
  { name: "Pulse Glow", animate: { scale: [1, 1.25, 1], boxShadow: ["0 0 0 rgba(124,247,255,0)", "0 0 40px rgba(124,247,255,0.7)", "0 0 0 rgba(124,247,255,0)"] }, transition: { duration: 2, repeat: Infinity } },
  { name: "Morph Radius", animate: { borderRadius: ["30%", "60%", "40%", "30%"] }, transition: { duration: 3, repeat: Infinity } },
  { name: "Slide Wave", animate: { x: [0, 40, -40, 0], y: [0, -20, 20, 0] }, transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut" } },
  { name: "Stagger Dots", animate: { opacity: [0.2, 1, 0.2] }, transition: { duration: 1.4, repeat: Infinity } },
  { name: "Flip Card", animate: { rotateY: [0, 180, 360] }, transition: { duration: 3, repeat: Infinity } },
  { name: "Bounce Y", animate: { y: [0, -30, 0] }, transition: { duration: 0.9, repeat: Infinity, ease: "easeOut" } },
  { name: "Skew Drift", animate: { skewX: [0, 15, -15, 0] }, transition: { duration: 2, repeat: Infinity } },
  { name: "Color Sweep", animate: { backgroundColor: ["#7cf7ff", "#ff6bd6", "#ffd166", "#7cf7ff"] }, transition: { duration: 3, repeat: Infinity } },
  { name: "Scale Breathe", animate: { scale: [0.8, 1.1, 0.8] }, transition: { duration: 2, repeat: Infinity, ease: "easeInOut" } },
  { name: "Rotate 3D", animate: { rotateX: 360, rotateZ: 360 }, transition: { duration: 6, repeat: Infinity, ease: "linear" } },
  { name: "Fade Trail", animate: { opacity: [0, 1, 0] }, transition: { duration: 1.8, repeat: Infinity } },
  { name: "Wiggle", animate: { rotate: [-8, 8, -8] }, transition: { duration: 0.3, repeat: Infinity } },
  { name: "Path Draw", animate: { pathLength: [0, 1] }, transition: { duration: 2, repeat: Infinity } },
  { name: "Spring Pop", animate: { scale: [0, 1.3, 1] }, transition: { type: "spring", stiffness: 260, damping: 18 } },
  { name: "Parallax Tilt", animate: { rotate: [ -6, 6, -6] }, transition: { duration: 1.6, repeat: Infinity } },
];

export function MotionGallery() {
  const [hover, setHover] = useState<string | null>(null);
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {VARIANTS.map((v, i) => (
        <motion.div
          key={v.name}
          className="glass p-6 flex flex-col items-center justify-center gap-3 min-h-[180px] cursor-pointer"
          onHoverStart={() => setHover(v.name)}
          onHoverEnd={() => setHover(null)}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.04 }}
        >
          <motion.div
            className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-accent2 flex items-center justify-center shadow-lg"
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            animate={v.animate as any}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            transition={v.transition as any}
          />
          {v.name === "Path Draw" && (
            <svg width="80" height="40" viewBox="0 0 80 40">
              <motion.path d="M5 20 Q 20 5, 40 20 T 75 20" stroke="#ffd166" strokeWidth="3" fill="none" animate={{ pathLength: [0,1,0] }} transition={{ duration:2, repeat:Infinity }} />
            </svg>
          )}
          <span className="text-sm font-semibold">{v.name}</span>
          <span className="text-xs text-muted">{hover === v.name ? "hovering" : "framer-motion"}</span>
        </motion.div>
      ))}
    </div>
  );
}
