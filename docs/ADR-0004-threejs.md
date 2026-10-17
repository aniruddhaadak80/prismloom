ADR-0004: Raw Three.js instead of @react-three/fiber
Status: accepted
Date: 2026-10-15
Decision: WebGL scenes are built with plain three.js inside next/dynamic client components.
Rationale: Avoids R3F abstraction overhead for simple parametric scenes; easier to reason about frame loop and disposal.
Consequences: Manual scene lifecycle/dispose; more boilerplate per scene but full control.
