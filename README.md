# ProxiMeet website

The public marketing and waitlist website for ProxiMeet. This repository demonstrates responsive HTML/CSS/JavaScript work and AI-assisted development. It is the website frontend, not the private mobile application or backend.

## Run and verify

```sh
python3 -m http.server 8000 --bind 127.0.0.1
# In another terminal:
python3 scripts/check_site.py
```

Open `http://127.0.0.1:8000`. The alternate design is under `/v2/`.

The checker verifies local HTML targets, fragments, referenced assets, language, viewport metadata, and title tags. CI runs it on pushes and pull requests. It does not prove that third-party forms deliver emails or that external resources are reachable.

## Engineering examples

- Shared CSS and JavaScript across marketing, waitlist, and legal pages.
- Responsive navigation, asynchronous form feedback, and reduced-motion-aware effects.
- Two design variants using shared product copy.
- Repository context and design decisions for coding agents under `docs/` and `AGENTS.md`.

## AI assistance and contribution

Development uses coding agents with recorded product direction and shared context. Generated changes require review and behavioral verification. See the decision and current-state documents for the recorded workflow and checks; they are notes, not an automated guarantee of correctness.

## Limits

No React, Python API, Java backend, machine-learning recommendation engine, or production-scale matching service is implemented in this repository. Contact/waitlist forms use a third-party service; verify delivery separately with the owner. Keep confidential application designs and credentials out of this public project.
