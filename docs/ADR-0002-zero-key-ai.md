ADR-0002: Zero-key local AI by default
Status: accepted
Date: 2026-10-15
Decision: All "intelligence" (scene suggestion, prompt tags) is deterministic local code (Python agent_service + TS heuristics). No LLM API keys are required or bundled.
Rationale: The amazing-repo contract requires zero-keys runnable demos. Users can optionally wire real models later via env.
Consequences: Predictable offline behavior; no secret management for the demo; quality is heuristic not generative.
