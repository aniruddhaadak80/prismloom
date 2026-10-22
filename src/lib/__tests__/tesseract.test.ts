import { describe, expect, test } from "bun:test";
import { startFrameLoop } from "../frameloop";
import { TESSERACT_CUBE_COUNT, tesseractPose } from "../tesseract";

describe("4d tesseract", () => {
  test("the frame loop forwards the requestAnimationFrame timestamp", () => {
    const stamps: number[] = [];
    const queued: ((t: number) => void)[] = [];
    const requestFrame = (cb: (t: number) => void) => {
      queued.push(cb);
      return queued.length;
    };

    const stop = startFrameLoop((t) => stamps.push(t), requestFrame, () => {});

    queued[0](16);
    queued[1](32);
    queued[2](48);

    expect(stamps).toEqual([16, 32, 48]);
    stop();
  });

  test("the cube pose changes as time advances", () => {
    const a = tesseractPose(0, 0);
    const b = tesseractPose(0, 1.5);

    expect(b.x).not.toBe(a.x);
    expect(b.y).not.toBe(a.y);
    expect(b.z).not.toBe(a.z);
    expect(b.rx).not.toBe(a.rx);
    expect(b.ry).not.toBe(a.ry);
    expect(b.rz).not.toBe(a.rz);
    expect(b.scale).not.toBe(a.scale);
  });

  test("the w offset fans the cubes out around the origin", () => {
    expect(TESSERACT_CUBE_COUNT).toBe(8);
    const offsets = Array.from({ length: TESSERACT_CUBE_COUNT }, (_, i) => tesseractPose(i, 0).x);
    expect(Math.min(...offsets)).toBeLessThan(0);
    expect(Math.max(...offsets)).toBeGreaterThan(0);
  });
});
