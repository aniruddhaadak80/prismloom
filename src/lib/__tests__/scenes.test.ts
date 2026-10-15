import { describe, expect, test } from "bun:test";
import { SCENES } from "../scenes";

describe("scene registry", () => {
  test("has at least 15 WebGL scenes", () => {
    expect(SCENES.length).toBeGreaterThanOrEqual(15);
  });
  test("ids are unique", () => {
    const ids = new Set(SCENES.map((s) => s.id));
    expect(ids.size).toBe(SCENES.length);
  });
});
