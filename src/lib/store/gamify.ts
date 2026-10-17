const STORAGE_KEY = "prismloom:gamify";

export interface Gamify { xp: number; level: number; stars: string[]; badges: string[]; created: number; }

export const DEFAULTS: Gamify = { xp: 0, level: 1, stars: [], badges: [], created: Date.now() };

export const LEVEL_XP = (l: number) => l * 1000;

export function emptyGamify(): Gamify {
  return { ...DEFAULTS, created: Date.now() };
}

export function addXP(g: Gamify, amount: number): Gamify {
  let nxp = g.xp + amount;
  let nlevel = g.level;
  while (nxp >= LEVEL_XP(nlevel)) { nxp -= LEVEL_XP(nlevel); nlevel += 1; }
  return { ...g, xp: nxp, level: nlevel };
}

export function star(g: Gamify, id: string): Gamify {
  if (g.stars.includes(id)) return g;
  return { ...g, stars: [...g.stars, id], xp: g.xp + 50 };
}

export function unstar(g: Gamify, id: string): Gamify {
  return { ...g, stars: g.stars.filter((s) => s !== id) };
}

export function isStarred(g: Gamify, id: string) {
  return g.stars.includes(id);
}

export function loadGamify(): Gamify {
  if (typeof localStorage === "undefined") return emptyGamify();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return emptyGamify();
}

export function saveGamify(g: Gamify) {
  if (typeof localStorage === "undefined") return;
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(g)); } catch {}
}
