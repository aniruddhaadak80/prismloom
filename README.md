---
name: prismloom
description: Gamified Design Arena — prompt to world. WebGL scenes, motion graphics, procedural audio, 5200+ prompt library, Inspiration Vault.
topics:
  - webgl
  - threejs
  - nextjs
  - framer-motion
  - creative-coding
  - generative-art
  - procedural-audio
  - prompt-engineering
  - ai-inspired
---

# PRISMLOOM — Gamified Design Arena

Prompt → world. A creative coding playground with 16 WebGL scenes, 16 motion graphics studies, procedural audio, a 5,200+ prompt library, and an Inspiration Vault cataloguing what builders ship with Gemini, Argon 4, Opus 5.5, Fable 5.5, GPT-6, Astro, GPT-6.1, Soul, Muse Park, Muse Wonder 4. Runs 100% in the browser, zero API keys.

## Workflow

1. Open `/` and pick a surface.
2. `/arena` — switch among 16 Three.js scenes; cursor-reactive.
3. `/motion` — explore 16 framer-motion studies.
4. `/audio` — play 8 procedural Web Audio tracks.
5. `/prompts` — search 5,200+ prompts by vibe, stack, model, difficulty.
6. `/vault` — learn what each model family is used to build.

## Architecture

```mermaid
flowchart LR
  U[Visitor] --> L[Landing /]
  L --> A[Arena /arena]
  L --> M[Motion /motion]
  L --> Au[Audio /audio]
  L --> P[Prompts /prompts]
  L --> V[Vault /vault]
  A --> S[LoomScene.tsx Three.js]
  P --> D[prompts.json 5200]
  V --> B[MODEL_BUILDERS]
```

## Sequence

```mermaid
sequenceDiagram
  participant User
  participant UI
  participant WebGL
  participant Audio
  User->>UI: select scene
  UI->>WebGL: mount LoomScene kind
  WebGL-->>UI: render frames
  User->>UI: play track
  UI->>Audio: AudioContext node graph
  Audio-->>User: scheduled oscillators
```

## Data flow

```mermaid
flowchart TD
  PromptsJSON --> Filter[PromptsPage useMemo]
  Filter --> Cards
  ScenesTS --> ArenaPage
  VaultTS --> VaultPage
  AudioTracks --> AudioPanel
  MotionVariants --> MotionGallery
```

## Class

```mermaid
classDiagram
  class Scene {
    id string
    name string
    kind SceneKind
    tag string
    description string
    palette string[]
  }
  class SceneRegistry {
    SCENES Scene[]
    SCENE_BY_ID map
  }
  SceneRegistry --> Scene
```

## State

```mermaid
stateDiagram-v2
  [*] --> Idle
  Idle --> Playing: select scene
  Playing --> Paused: toggle
  Paused --> Playing: toggle
  Playing --> Idle: navigate away
```

## CI/CD

```mermaid
flowchart LR
  PR[Pull Request] --> CI[GitHub Actions]
  CI --> TC[typecheck]
  CI --> Lint
  CI --> Test
  CI --> Build
  Build --> Vercel[Vercel Deploy]
```

## User journey

```mermaid
journey
  title Visitor to Arena
  section Discover
    Land on home: 5: Visitor
    Read features: 4: Visitor
  section Play
    Open arena: 5: Visitor
    Switch scenes: 5: Visitor
    Toggle audio: 4: Visitor
  section Learn
    Browse prompts: 4: Visitor
    Read vault: 3: Visitor
```

## Gantt

```mermaid
gantt
  title Build Plan
  dateFormat YYYY-MM-DD
  section Spine
    Scaffold: done, 2026-10-15, 1d
    Design system: done, 2026-10-15, 1d
  section Features
    WebGL scenes: done, 2026-10-15, 2d
    Motion: done, 2026-10-15, 1d
    Audio: done, 2026-10-15, 1d
  section Scale
    Prompt gen: done, 2026-10-15, 1d
    Deploy: active, 2026-10-16, 1d
```

## ERD

```mermaid
erDiagram
  PROMPT {
    string id
    string title
    string model
    string difficulty
    boolean webgl
  }
  SCENE {
    string id
    string kind
  }
  MODEL {
    string id
    string name
  }
  PROMPT }o--|| MODEL : inspired_by
```

## Mindmap

```mermaid
mindmap
  root((PRISMLOOM))
    WebGL Arena
      flock
      galaxy
      torus
    Motion
      orbit
      pulse
    Audio
      arp
      bass
    Prompts
      5200 items
    Vault
      models
```

## Quadrant

```mermaid
quadrantChart
  title Prompt positioning
  x-axis Simple --> Complex
  y-axis LowWow --> HighWow
  quadrant-1 Ship it
  quadrant-2 Prototype
  quadrant-3 Idea
  quadrant-4 Refine
  "Landing": [0.3, 0.4]
  "Galaxy scene": [0.7, 0.9]
  "Audio track": [0.5, 0.7]
  "Prompt library": [0.9, 0.8]
```

## Infrastructure

```mermaid
flowchart TB
  Browser --> Next[Next.js 16 on Vercel]
  Next --> Static[Static pages]
  Next --> Data[prompts.json]
  Repo --> GitHub
  GitHub --> Vercel
```

## Tech stack

- Next.js 16 (App Router) · React 19 · TypeScript strict
- Tailwind v4
- Three.js (+ @react-three? no; raw WebGL via three)
- Framer Motion
- Web Audio API
- Bun

## Scale

Run `bun scripts/loc-count.mjs`. Prompts are 5,200 entries (pretty-printed JSON). See `docs/diagrams/*.mmd` for sources.

## License

MIT
