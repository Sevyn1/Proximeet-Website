# Shared Agent Rules

These instructions apply to all coding agents working in this repository, including GitHub Copilot, OpenCode, Claude, and other AI tools.

## Read the shared project memory

Before substantial work, read these files:

- `AGENTS.md`
- `docs/AI_CONTEXT.md`
- `docs/DECISIONS.md`
- `docs/CURRENT_STATE.md`

Treat the current source code and repository configuration as authoritative when they conflict with documentation. Do not present unverified deployment, service, or business status as fact.

## Keep project memory current

- Update `docs/CURRENT_STATE.md` after meaningful changes, including completed work, known issues, and next steps.
- Record architectural or significant technical decisions and their rationale in `docs/DECISIONS.md`.
- Keep durable project facts and conventions in `docs/AI_CONTEXT.md`; keep temporary work and status in `docs/CURRENT_STATE.md`.
- Do not duplicate temporary status in stable context. Date time-sensitive observations.
- Never store secrets, API keys, access tokens, passwords, private credentials, or sensitive environment-variable values in repository files or agent memory documents.

## Project-specific working rules

- This repository is currently a static website. Preserve its existing page structure and lightweight HTML/CSS/JavaScript approach unless a requested change requires otherwise.
- Keep changes scoped to the requested behavior. Do not rewrite unrelated content or pages.
- Preserve user changes in the worktree. Check `git status` before editing and do not discard or overwrite uncommitted work.
- Before changing form destinations, external assets, launch details, legal copy, or other externally visible claims, verify the relevant source and avoid assuming that a configured integration is operational.
- Run the narrowest relevant validation available. The current CI workflow only checks for `index.html`; do not describe that as a full functional test suite.
- Do not commit or push unless the user explicitly asks.
