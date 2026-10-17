ADR-0008: Static export on Vercel
Status: accepted
Date: 2026-10-15
Decision: Deploy as Next.js static prerendered pages to Vercel production.
Rationale: All content is static; fastest edge delivery; cheapest hosting.
Consequences: Dynamic routes (profile/[id]) are prerendered shells; client fills data.
