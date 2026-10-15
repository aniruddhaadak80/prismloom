export interface ModelBuilder {
  id: string;
  name: string;
  family: string;
  maker: string;
  color: string;
  vibe: string;
  whatPeopleBuild: string[];
  promptPatterns: string[];
  strength: string;
}

export const MODEL_BUILDERS: ModelBuilder[] = [
  {
    id: "gemini",
    name: "Gemini",
    family: "Gemini",
    maker: "Google",
    color: "#4285f4",
    vibe: "multimodal · fast · generous free tier",
    whatPeopleBuild: [
      "Real-time vision agents that watch a webcam and narrate actions",
      "Long-context repo summarizers over 1M-token windows",
      "Audio-reactive generative art with spatial reasoning prompts",
      "Mobile-first multimodal apps (image + text + audio in one pass)",
    ],
    promptPatterns: ["Describe this screenshot and generate UI", "Plan a 3-step agent loop with tools", "Critique this code for edge cases"],
    strength: "Speed + multimodal breadth",
  },
  {
    id: "argon-4",
    name: "Argon 4",
    family: "Argon",
    maker: "Poly-model ecosystem",
    color: "#a78bfa",
    vibe: "reasoning-heavy · structured outputs",
    whatPeopleBuild: [
      "Complex planning agents that emit JSON schemas reliably",
      "Form-to-code pipelines for internal tools",
      "Multi-step tool-use with strict output validation",
    ],
    promptPatterns: ["Return a strict JSON plan", "Refactor into typed modules", "Design an eval harness"],
    strength: "Schema discipline",
  },
  {
    id: "opus-5-5",
    name: "Opus 5.5",
    family: "Opus",
    maker: "Anthropic",
    color: "#d4a574",
    vibe: "deep reasoning · code review · nuance",
    whatPeopleBuild: [
      "Long-form architecture reviews and refactors",
      "Safety-critical policy engines",
      "Agent harnesses with transparent reasoning traces",
    ],
    promptPatterns: ["Review this diff for subtle bugs", "Produce an ADR with trade-offs", "Write property-based tests"],
    strength: "Judgment & depth",
  },
  {
    id: "fable-5-5",
    name: "Fable 5.5",
    family: "Fable",
    maker: "Emergent open-weights",
    color: "#ff6bd6",
    vibe: "creative writing · roleplay · styles",
    whatPeopleBuild: [
      "Interactive fiction engines and branching narratives",
      "Stylized copy and lore generation",
      "Persona-driven game dialog systems",
    ],
    promptPatterns: ["Write a branching quest", "Adopt the voice of X", "Expand lore with constraints"],
    strength: "Creative voice",
  },
  {
    id: "gpt-6",
    name: "GPT-6",
    family: "GPT",
    maker: "OpenAI",
    color: "#10a37f",
    vibe: "generalist · tool-heavy · agent loops",
    whatPeopleBuild: [
      "Full-stack app scaffolds with auth + DB",
      "Agentic coding over whole repos",
      "Function-calling workflows glued to SaaS APIs",
    ],
    promptPatterns: ["Build a Next.js app with Prisma", "Add tests for this module", "Migrate to new API"],
    strength: "All-round execution",
  },
  {
    id: "astro",
    name: "Astro",
    family: "Astro",
    maker: "Model collective",
    color: "#fc5c1e",
    vibe: "docs · reasoning · citations",
    whatPeopleBuild: [
      "Research copilots with cited sources",
      "Documentation generators for codebases",
      "Evidence-grounded Q&A over PDFs",
    ],
    promptPatterns: ["Summarize with citations", "Find contradictions in these docs", "Generate a tutorial"],
    strength: "Grounded answers",
  },
  {
    id: "gpt-6-1",
    name: "GPT-6.1",
    family: "GPT",
    maker: "OpenAI",
    color: "#0ea5e9",
    vibe: "refined · faster · cheaper",
    whatPeopleBuild: [
      "High-volume batch processing pipelines",
      "Inline code completion inside editors",
      "Cost-optimized agent fleets",
    ],
    promptPatterns: ["Classify at scale", "Autocomplete this function", "Cheap rerank"],
    strength: "Throughput",
  },
  {
    id: "soul",
    name: "Soul",
    family: "Soul",
    maker: "Persona lab",
    color: "#9333ea",
    vibe: "persona · empathy · coaching",
    whatPeopleBuild: [
      "Therapy-journaling companions with memory",
      "Coaching bots that track goals over weeks",
      "Roleplay agents with stable personas",
    ],
    promptPatterns: ["Reflect and ask one question", "Hold this persona for 10 turns", "Summarize my week"],
    strength: "Persona stability",
  },
  {
    id: "muse-park",
    name: "Muse Park",
    family: "Muse",
    maker: "Creative lab",
    color: "#22d3ee",
    vibe: "visual · layout · design",
    whatPeopleBuild: [
      "Design-to-code with responsive layouts",
      "Visual mood-board to component pipelines",
      "Color system + typography generators",
    ],
    promptPatterns: ["Turn this mockup into React", "Propose a palette", "Build a design system"],
    strength: "Visual taste",
  },
  {
    id: "muse-wonder-4",
    name: "Muse Wonder 4",
    family: "Muse",
    maker: "Creative lab",
    color: "#f472b6",
    vibe: "image · video · motion",
    whatPeopleBuild: [
      "Image-to-video motion graphics pipelines",
      "Generative brand imagery at scale",
      "Thumbnail and poster generators",
    ],
    promptPatterns: ["Animate this still", "Create 5 thumbnail variants", "Upscale & restyle"],
    strength: "Media generation",
  },
];
export const MODEL_BY_ID = Object.fromEntries(MODEL_BUILDERS.map((m) => [m.id, m]));
