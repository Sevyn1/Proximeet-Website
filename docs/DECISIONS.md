# Technical Decisions

## 2026-10-04: Do not publish app UI; use Figma only as thematic reference

**Decision:** The Figma app export informs the visual scheme (Oxanium type; indigo/purple, teal, coral palette; map-led mood). A few downscaled, dimmed app glimpses (assets/img/product/glimpse-\*.jpg) may appear as accents, but abstract teaser visuals stay primary. No full-resolution screens, no screenshot galleries, and no step-by-step onboarding/UI walkthroughs. Descriptive marketing copy about the concept (map-style discovery, interests, mutual choice) is fine.

**Rationale:** The owner wants an air of mystery before launch; the full app concept is confidential.

## 2026-10-04: Keep shared AI project memory in the repository

**Decision:** Maintain shared agent rules in `AGENTS.md`, Copilot-specific pointers in `.github/copilot-instructions.md`, and project memory in `docs/AI_CONTEXT.md`, `docs/DECISIONS.md`, and `docs/CURRENT_STATE.md`.

**Rationale:** This makes durable project context available to multiple coding agents and across remote work sessions, while separating stable facts, rationale, and temporary status. Copilot instructions point to the shared documents rather than maintaining a second copy of their contents.

**Constraints:** Keep the documents grounded in repository evidence, update current status after meaningful work, and do not store secrets or sensitive values.

## 2026-10-04 Static verification without external submissions

Use a dependency-free HTML parser to validate local files, anchors, and metadata in CI. Do not submit forms or claim delivery from static configuration.
