# ProxiMeet Project Context

Last verified: 2026-10-04

## Product and site

ProxiMeet is presented by its website as a service for connecting people nearby based on real-time intent in public spaces. The site includes a main marketing page, waitlist page, privacy policy, and terms page; a former download/launch page was removed on 2026-10-04. These descriptions reflect the repository content; they do not establish current product availability or operating status.

## Architecture

- The repository is a lightweight static website made of top-level `.html` pages.
- CSS and JavaScript are embedded in the HTML pages. Shared visual assets are under `assets/`, including the Oxanium font, logo, and favicons.
- No package manifest, application framework, server-side application, or local test suite was found in the inspected repository.
- The pages use FormSubmit for contact and waitlist form submissions. Configuration in HTML does not prove that this third-party integration is currently operational.
- The Git remote is `https://github.com/Sevyn1/Proximeet-Website.git`, and the checked-out branch was `main` when this context was recorded.
- `.github/workflows/ci.yml` runs on pushes to `main`, pull requests, and manual dispatch. Its current check is only that `index.html` exists.
- No production hosting or deployment configuration was found in the inspected files. Verify the hosting provider and deployment state before making claims or changing deployment settings.

## Conventions and constraints

- Preserve the existing static-page architecture and page-specific layout unless the requested work calls for a broader change.
- Keep edits focused and follow nearby HTML, CSS, and JavaScript formatting.
- Check all links, form destinations, page metadata, responsive behavior, and related pages when changing shared or navigational content.
- Verify launch dates and other time-sensitive public claims against current product direction before updating them. (A stale March 27, 2026 launch date previously lived on the download page, which was removed on 2026-10-04.)
- Never put secrets, API keys, tokens, passwords, private credentials, or sensitive environment-variable values in project documentation or agent memory.
