import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";

const ROOT = process.cwd();
const OUT = join(ROOT, "src", "data", "prompts.json");

const models = ["Gemini","Argon 4","Opus 5.5","Fable 5.5","GPT-6","Astro","GPT-6.1","Soul","Muse Park","Muse Wonder 4"];

const objectives = [
  "landing page","dashboard","portfolio","game HUD","3D world","data visualization","audio-reactive visualizer","creative tool","mobile app screen","e-commerce product page",
  "onboarding flow","settings panel","chat interface","calendar view","kanban board","terminal UI","admin console","pricing page","auth screen","404 page",
  "heatmap","scatter plot","node graph","timeline","gantt chart","map view","stock ticker","weather card","crypto wallet","music player",
  "video editor","image gallery","avatar builder","level select","inventory screen","quest log","skill tree","leaderboard","profile card","shop screen",
];

const subjects = [
  "for a space exploration startup","for a bio lab","for a cyber defense team","for a music producer","for a fintech founder","for an indie game studio",
  "for a climate nonprofit","for a fitness coach","for a travel blogger","for a crypto exchange","for an AI research lab","for a design agency",
  "themed around vaporwave","themed around brutalism","themed around glassmorphism","themed around neumorphism","themed around retro terminal",
  "with particle effects","with scroll-driven reveals","with 3D card tilt","with parallax depth","with magnetic buttons",
  "that loads in under 1s","accessible WCAG AA","mobile-first","dark mode first","with micro-interactions",
];

const styles = [
  "neon cyan on deep navy","sunset gradient orange-to-pink","monochrome with one accent","pastel soft blues","high contrast black and yellow",
  "glassmorphism with blur","flat minimal white","retro 8-bit palette","vaporwave pink/cyan","earthy organic greens",
  "metallic silver and violet","warm cream and terracotta","cold steel blues","electric purple and lime","amber and charcoal",
];

const tech = [
  "Next.js 15 + Tailwind v4","React 19 + Framer Motion","Three.js WebGL","Web Audio API","GSAP ScrollTrigger","Canvas 2D",
  "SVG + CSS animations","Astro islands","Svelte 5","Vue 3","Vanilla JS","TypeScript strict",
];

const features = [
  "with a command palette (Cmd+K)","with a live WebGL background","with procedural audio feedback","with animated empty states",
  "with skeleton loading","with toast notifications","with a drag-and-drop canvas","with real-time collaboration cursors",
  "with keyboard shortcuts","with a timeline scrubber","with a 3D product viewer","with an audio visualizer",
  "with a mini-game easter egg","with confetti on success","with a sound toggle","with theme switching",
  "with shareable permalinks","with offline support (PWA)","with a stats sparkline","with an achievements badge system",
];

const intents = [
  "Generate a single-file HTML demo","Generate a React component","Generate a page with mock data","Generate a design token set",
  "Generate a motion study","Generate a shader snippet","Generate a component storybook story","Generate an ARIA-accessible variant",
  "Generate a responsive grid","Generate a marketing copy draft","Generate a UX critique","Generate a test plan",
];

const difficulties = ["easy", "medium", "hard", "insane"];
const vibes = ["playful", "serious", "minimal", "maximalist", "retro", "futuristic", "organic"];

const gen = [];
let n = 0;
outer: for (const obj of objectives) {
  for (const style of styles) {
    for (const subject of subjects) {
      if (gen.length >= 5200) break outer;
      const model = models[n % models.length];
      const techPick = tech[(n * 7) % tech.length];
      const feat = features[(n * 11) % features.length];
      const intent = intents[(n * 13) % intents.length];
      const difficulty = difficulties[(n + style.length) % 4];
      const webgl = /webgl|3d|particle|cube|world/i.test(obj + " " + feat + subject) || (n % 5 === 0);
      const motion = n % 3 !== 0;
      const audio = n % 7 === 0;
      const vibe = vibes[n % vibes.length];
      const title = `${obj.charAt(0).toUpperCase() + obj.slice(1)} — ${style} (${subject.replace(/^.*? /, "")})`.slice(0, 90);
      const prompt = `${intent} for ${obj} ${subject}. Visual style: ${style}. Stack: ${techPick}. Include ${feat}. Tone: ${vibe}. Difficulty: ${difficulty}. Target model inspiration: ${model}. Output should be production-ready, accessible, and performant.`;
      gen.push({
        id: `p${String(n + 1).padStart(5, "0")}`,
        title,
        prompt,
        category: obj.split(" ")[0],
        tags: [obj, style.split(" ")[0], techPick.split(" ")[0], vibe, model.toLowerCase().replace(/[^a-z0-9]+/g, "-")],
        vibe,
        difficulty,
        stack: techPick,
        model,
        webgl,
        motion,
        audio,
        year: 2026,
      });
      n++;
    }
  }
}

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, JSON.stringify(gen, null, 2));
console.log("Generated", gen.length, "prompts ->", OUT);
