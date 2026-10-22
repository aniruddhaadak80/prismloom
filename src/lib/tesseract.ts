/** The 4D tesseract: eight cubes offset along the w axis, projected into
 *  three dimensions by rotating the xw and yw planes and folding w into z.
 *
 *  The pose is pure so the animation can be tested without a GPU. */

export const TESSERACT_CUBE_COUNT = 8;

export interface TesseractPose {
  x: number;
  y: number;
  z: number;
  rx: number;
  ry: number;
  rz: number;
  scale: number;
}

/** Pose of cube `index` at time `t` (seconds). */
export function tesseractPose(index: number, t: number): TesseractPose {
  const wOffset = (index - (TESSERACT_CUBE_COUNT - 1) / 2) * 22;
  return {
    x: Math.cos(t * 0.5 + index) * wOffset,
    y: Math.sin(t * 0.3 + index) * wOffset * 0.5,
    z: wOffset * Math.sin(t * 0.2) * 0.4,
    rx: t * (0.5 + index * 0.1),
    ry: t * (0.3 + index * 0.1),
    rz: t * (0.2 + index * 0.15),
    scale: 0.8 + Math.sin(t + index) * 0.4,
  };
}
