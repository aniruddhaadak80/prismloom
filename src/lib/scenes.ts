export type SceneKind =
  | "flock" | "galaxy" | "torus" | "waves" | "crystals" | "meteors"
  | "portals" | "nebula" | "ribbon" | "lattice" | "orbitals" | "vortex"
  | "aurora" | "blossom" | "cybergrid" | "helix";

export interface Scene {
  id: string;
  name: string;
  kind: SceneKind;
  tag: string;
  description: string;
  palette: string[];
}

export const SCENES: Scene[] = [
  { id: "s01", name: "Neon Flock", kind: "flock", tag: "boids · emergent", description: "1200 point-birds steering by separation/alignment/cohesion with a cursor predator.", palette: ["#7cf7ff","#ff6bd6","#ffd166"] },
  { id: "s02", name: "Particle Galaxy", kind: "galaxy", tag: "spiral · 10k points", description: "Logarithmic spiral galaxy with rotating arms and central black hole glow.", palette: ["#9ad1ff","#ffffff","#ff6bd6"] },
  { id: "s03", name: "Morphing Torus", kind: "torus", tag: "knot · vertex morph", description: "Torus knot whose vertices breathe to a low sine field.", palette: ["#7cf7ff","#00e5ff","#ffffff"] },
  { id: "s04", name: "Grid Waves", kind: "waves", tag: "heightfield · audio", description: "A 64x64 water surface driven by layered gerstner waves.", palette: ["#3a7bd5","#00d2ff","#9face6"] },
  { id: "s05", name: "Crystal Field", kind: "crystals", tag: "instanced · IBL", description: "600 instanced octahedra catching a moving light.", palette: ["#b9fbc0","#98f5e1","#ffd6a5"] },
  { id: "s06", name: "Meteor Shower", kind: "meteors", tag: "trails · lines", description: "Streaking meteors with glowing trails drawn as line segments.", palette: ["#ffe066","#ff6b6b","#7cf7ff"] },
  { id: "s07", name: "Portal Pair", kind: "portals", tag: "rings · glow", description: "Two counter-rotating luminous portals connected by a particle bridge.", palette: ["#a78bfa","#7cf7ff","#ffffff"] },
  { id: "s08", name: "Nebula Cloud", kind: "nebula", tag: "volume · sprite", description: "Soft billboard particles forming a denser nebula core.", palette: ["#ff6bd6","#7cf7ff","#9ad1ff"] },
  { id: "s09", name: "Ribbon Dance", kind: "ribbon", tag: "catmull · curve", description: "A continuous 3D ribbon weaving through space following parametric curves.", palette: ["#ff9a3c","#ff6bd6","#ffd166"] },
  { id: "s10", name: "Lattice Reactor", kind: "lattice", tag: "wireframe · pulse", description: "Orthogonal lattice that pulses energy along edges.", palette: ["#00ff9d","#7cf7ff","#ffffff"] },
  { id: "s11", name: "Orbital Paths", kind: "orbitals", tag: "kepler · rings", description: "Concentric orbital paths with scaled bodies and trails.", palette: ["#ffd166","#ff6bd6","#7cf7ff"] },
  { id: "s12", name: "Vortex Tunnel", kind: "vortex", tag: "tube · warp", description: "Infinite tunnel of rotating rings rushing toward camera.", palette: ["#ff00cc","#00ffff","#ffffff"] },
  { id: "s13", name: "Aurora Sky", kind: "aurora", tag: "curtain · shader", description: "Curtain-like aurora ribbons reacting to cursor height.", palette: ["#39ff14","#00e5ff","#b388ff"] },
  { id: "s14", name: "Blossom Bloom", kind: "blossom", tag: "petals · bloom", description: "A procedural flower made of layered petal surfaces.", palette: ["#ff8fab","#ffb3c1","#ffd166"] },
  { id: "s15", name: "Cyber Grid", kind: "cybergrid", tag: "matrix · scanline", description: "Perspective grid floor with scanning horizon light.", palette: ["#00ff41","#008f11","#0affef"] },
  { id: "s16", name: "DNA Helix", kind: "helix", tag: "strands · rungs", description: "Double helix with rotating rungs and base-pair glow.", palette: ["#7cf7ff","#ff6bd6","#4ade80"] },
];

export const SCENE_BY_ID = Object.fromEntries(SCENES.map((s) => [s.id, s]));
export const SCENE_BY_KIND = Object.fromEntries(SCENES.map((s) => [s.kind, s]));
