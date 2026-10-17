import { describe, expect, test } from "bun:test";
import { emptyGamify, addXP, star, unstar, isStarred, LEVEL_XP } from "../gamify";

describe("gamify logic", () => {
  test("defaults", () => {
    const g = emptyGamify();
    expect(g.level).toBe(1);
    expect(g.xp).toBe(0);
    expect(g.stars).toEqual([]);
  });

  test("addXP levels up", () => {
    let g = emptyGamify();
    g = addXP(g, 2000);
    expect(g.level).toBeGreaterThan(1);
    expect(g.xp).toBeLessThan(LEVEL_XP(g.level));
  });

  test("star/unstar toggle", () => {
    let g = emptyGamify();
    g = star(g, "p00001");
    expect(isStarred(g, "p00001")).toBe(true);
    expect(g.xp).toBe(50);
    g = unstar(g, "p00001");
    expect(isStarred(g, "p00001")).toBe(false);
  });
});
