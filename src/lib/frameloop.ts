/** A minimal animation loop.
 *
 *  The timestamp MUST be the one requestAnimationFrame hands to its
 *  callback. Capturing it in a closure and re-passing it — the shape
 *  `requestAnimationFrame(() => loop(t))` — freezes the animation,
 *  because the captured value never changes. Forwarding the callback's
 *  own argument keeps the clock running. */
export type FrameCallback = (timestamp: number) => void;

export type FrameRequester = (callback: FrameCallback) => number;
export type FrameCanceller = (handle: number) => void;

/** Starts a frame loop and returns a function that stops it.
 *
 *  `requestFrame` and `cancelFrame` are injectable so the loop can be
 *  driven by a test without a browser. */
export function startFrameLoop(
  frame: FrameCallback,
  requestFrame: FrameRequester = (cb) => requestAnimationFrame(cb),
  cancelFrame: FrameCanceller = (handle) => cancelAnimationFrame(handle),
): () => void {
  let handle = 0;
  const loop: FrameCallback = (timestamp) => {
    handle = requestFrame(loop);
    frame(timestamp);
  };
  handle = requestFrame(loop);
  return () => cancelFrame(handle);
}
