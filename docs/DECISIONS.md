# Technical Decisions

## 2026-10-23: App UI may now be shown (supersedes 2026-10-04 "no app UI" decision)

**Decision:** With the app live and the owner supplying a real app screenshot for the website, the pre-launch rule against publishing app UI no longer applies to v3. An "app peek" section on the v3 homepage shows the live map screen in a phone mockup (`v3/images/app-map.jpg`). Keep to curated single screens the owner provides — not full walkthrough galleries — and keep the screenshot file free of real user data or precise home locations before publishing.

**Rationale:** The mystery rationale was pre-launch; the owner now wants the site to sell the real product.

## 2026-10-16: Concept C "Living Map" direction and audit-fix scope

**Decision:** Concept C (`v3/`) merges the strongest elements of A, B, and the original audited site into one continuous dark night-map canvas: A's radar/pin visual language animated to pulse, B's Fraunces editorial accents and numbered rows, and new verified Unsplash photography of real connection moments (library, gym, bar, dog park, café, patio). Sections are stitched by dotted route threads with pulsing waypoint pins to counter the "boxy / not connected" feedback. A new "Why go online at all?" section answers the owner's request for reasons to go online, framed as "an app whose whole job is to get you off it." Concept pills cycle A→B→C→A.

**Audit-driven choices (2026-10-12 external review):** v3 adds og:/twitter: share-preview tags (og:image temporarily the Pages-hosted logo) and uses "Proximeet Technologies Inc." in footers to match the legal pages. Social links were not added (handles unverified), and the FormSubmit destination/contact email stays developer@proximeet.ca until the owner verifies an alternative — changing form destinations without verification is prohibited by AGENTS.md.

**Constraints:** Legal copy must remain verbatim (diff-verified against v2); no invented metrics; no claims contradicting Terms/Privacy; owner-approved tagline and step narrative preserved.

## 2026-10-04: Do not publish app UI; use Figma only as thematic reference

**Decision:** The Figma app export informs the visual scheme (Oxanium type; indigo/purple, teal, coral palette; map-led mood). A few downscaled, dimmed app glimpses (assets/img/product/glimpse-\*.jpg) may appear as accents, but abstract teaser visuals stay primary. No full-resolution screens, no screenshot galleries, and no step-by-step onboarding/UI walkthroughs. Descriptive marketing copy about the concept (map-style discovery, interests, mutual choice) is fine.

**Rationale:** The owner wants an air of mystery before launch; the full app concept is confidential.

## 2026-10-04: Keep shared AI project memory in the repository

**Decision:** Maintain shared agent rules in `AGENTS.md`, Copilot-specific pointers in `.github/copilot-instructions.md`, and project memory in `docs/AI_CONTEXT.md`, `docs/DECISIONS.md`, and `docs/CURRENT_STATE.md`.

**Rationale:** This makes durable project context available to multiple coding agents and across remote work sessions, while separating stable facts, rationale, and temporary status. Copilot instructions point to the shared documents rather than maintaining a second copy of their contents.

**Constraints:** Keep the documents grounded in repository evidence, update current status after meaningful work, and do not store secrets or sensitive values.


## 2026-10-22: Local consolidated review version

Added `revamp/` as the proposed consolidated site; A/B/C and existing uncommitted work preserved. Indigo/teal brand with warm photography, simplified proximity motif, no fictional profile activity, explicit 18+, carefully qualified geofencing, unchanged legal articles and existing FormSubmit destinations. Native form submission avoids unverified AJAX success. No commit/push/deployment. Four pages passed 70 local reference checks, JS syntax, HTTP checks, and overflow checks at 320/768/1440px. Mobile menu/Escape and FAQ verified. Form delivery and live hosting remain unverified; owner review and operational checks required before publication. Full findings and preview instructions are in the 2026-10-22 chat outputs/ProxiMeet Review.md.


## 2026-10-22: Owner selected original Version C

The active implementation is now `v3/`, edited directly at the owner’s request. `revamp/` remains a separate alternative, not the selected site. Preserved C’s Living Map layout, radar, imagery and route motif. Added 18+ clarity and signup confirmation, qualified geofencing, accurate availability copy, illustrative-activity label, animation pause control, no-JS-visible content, stronger muted text contrast, Escape menu handling and native form submission. Legal articles remain unchanged. Original C archived in the chat work folder before edits. Nothing published.


## 2026-10-22: Light Version C and all-ages direction
Owner clarified ProxiMeet is intended for all ages, requested a possible light palette, and explicitly rejected Concept B’s warm/paper/bookish aesthetic. Original v3 now uses crisp white/cool grey, brand indigo, teal and coral, Oxanium display typography without serif/italic accents, subtle radar/location motion, photo-led hero and concise sections. Reference principles reviewed from Timeleft, Bumble For Friends and 222; no competitor assets or copy copied. Removed adult-only marketing and checkbox. Replaced conflicting 18+ clauses in the local v3 legal drafts with intended-audience language and explicit pending age-related consent/privacy provisions; these drafts need review before publication. Other versions remain unchanged.


## 2026-10-22: Motion refinement and divider removal
Removed repeated route pins/dotted section dividers and how-step connector after owner feedback. Added native cross-document View Transitions where supported, short entrance fallback elsewhere, stable header/switcher, accessible animated mobile disclosure (Escape, outside click, focus exit, resize and history reset), optional session-persistent pause, slower ambient animation and offscreen/background suspension. Reduced-motion emulation verified: no radar animation, menu transition 0s, automatic scroll. Checked home → waitlist → terms → privacy → home, Back, motion persistence and menu focus return. 82 local references and JS syntax checks pass. No commits or deployment.


## 2026-10-22: Purposeful homepage sequence and pair photography
Owner approved combining repetitive why/photo sections into specific reasons to connect. Original v3 now presents walking, gym and reading scenarios with locally hosted Pexels pair photographs (credits in v3/images/CREDITS.md), followed by clear interests → nearby discovery → mutual request/chat/meet steps. Removed secondary hero collage/floating slogans and repeated interests card from safety section. Existing #why and #moments anchors preserved; navigation label now Ways to connect. Legal wording untouched. 86 local references pass; four pages HTTP 200; JS syntax passes; desktop/mobile photo rendering inspected. No forms submitted, commits, push or deployment.
