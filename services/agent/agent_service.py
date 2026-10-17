"""PRISMLOOM Python agent service — deterministic local simulation (no API keys).

Provides prompt classification and scene suggestion for the Design Arena,
fully offline so the demo never needs a network call or an API key.
"""

from __future__ import annotations

import re
from dataclasses import dataclass
from typing import List


KEYWORDS = {
    "webgl": ["webgl", "three", "3d", "scene", "particle", "cube", "sphere"],
    "motion": ["motion", "animate", "framer", "tween", "keyframe", "transition"],
    "audio": ["audio", "sound", "music", "oscillator", "beat", "track"],
    "shader": ["shader", "glsl", "fragment", "pixel", "canvas"],
    "4d": ["4d", "tesseract", "dimension", "hypercube"],
}


@dataclass
class Suggestion:
    scene: str
    confidence: float
    reason: str


def classify(prompt: str) -> str:
    text = prompt.lower()
    scores = {k: sum(1 for w in ws if w in text) for k, ws in KEYWORDS.items()}
    best = max(scores, key=scores.get)
    return best if scores[best] > 0 else "motion"


def suggest(prompt: str) -> Suggestion:
    kind = classify(prompt)
    reasons = {
        "webgl": "mentions 3D / WebGL terms — use a Three.js scene",
        "motion": "mentions animation — use a framer-motion study",
        "audio": "mentions sound — use a Web Audio track",
        "shader": "mentions shaders — open the live shader editor",
        "4d": "mentions higher dimensions — launch the 4D tesseract",
    }
    return Suggestion(scene=kind, confidence=0.85, reason=reasons[kind])


def scene_list() -> List[str]:
    return sorted(KEYWORDS.keys())


if __name__ == "__main__":  # pragma: no cover
    import sys

    text = " ".join(sys.argv[1:]) or "a glowing 3D galaxy scene"
    s = suggest(text)
    print(f"prompt={text!r} -> {s.scene} ({s.confidence}) :: {s.reason}")
