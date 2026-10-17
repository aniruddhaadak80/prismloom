name: agent
description: Deterministic local prompt classifier / scene suggester for PRISMLOOM.
keywords:
  - webgl
  - motion
  - audio
  - shader
  - 4d
endpoints:
  - path: /classify
    method: POST
    body: { prompt: string }
    response: { scene: string, confidence: number, reason: string }
notes: Runs entirely offline. No API keys required.
