import { describe, expect, test } from "bun:test";
import { MODEL_BUILDERS } from "../vault";

describe("vault", () => {
  test("has 10 model builders", () => {
    expect(MODEL_BUILDERS.length).toBe(10);
  });
  test("ids are unique", () => {
    const ids = new Set(MODEL_BUILDERS.map((m) => m.id));
    expect(ids.size).toBe(MODEL_BUILDERS.length);
  });
  test("each has whatPeopleBuild and prompts", () => {
    for (const m of MODEL_BUILDERS) {
      expect(m.whatPeopleBuild.length).toBeGreaterThan(0);
      expect(m.promptPatterns.length).toBeGreaterThan(0);
    }
  });
});
