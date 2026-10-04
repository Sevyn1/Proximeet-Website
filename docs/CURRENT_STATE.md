# Current State

Last reviewed: 2026-10-04

## Repository snapshot

- Full site redesign applied (launch-prep): shared design system in assets/css/proximeet.css and assets/js/proximeet.js, derived from the owner's Figma app export (thematic reference; see DECISIONS.md — a few dimmed, downscaled glimpses under assets/img/product/ are allowed as accents, never full screen galleries or UI walkthroughs).
- index.html upgraded to a v2 marketing design (inspired by leading social/connection product sites): immersive dark hero with CSS-built UI vignettes (match card, wave toast, chat bubbles), interest marquee, editorial statement, tilted phone "peek" using the map glimpse, vignette step cards, hover choice cards, gradient CTA band, scroll-reveal motion (IntersectionObserver, reduced-motion safe), and a transparent-to-light fixed header. waitlist.html shares the same system; terms and privacy pages load the shared stylesheet with `page-legal` styling, legal copy untouched.
- Expired countdown, invented metrics (300+ signups, 4 cities, Q2 2026), and absolute safety claims were removed from public copy.
- Forms retain their original FormSubmit destinations and fields (contact, waitlist email+city, launch-notify with `_next` redirect).
- Site chrome standardized across all five pages: one header nav (How it works / FAQ / Coming soon / Get early access) and one footer (Home / Coming soon / Contact / Terms / Privacy); root-relative "/" home links removed so local preview works. Legal pages use the shared shell + stylesheet with a padded white article card; their dead inline scripts were replaced by assets/js/proximeet.js.
- Responsive review (2026-10-04): fixed the homepage mobile-nav contrast bug — the transparent-header state forced white nav links while the open dropdown stayed light, making links invisible; the dropdown is now dark (#14162b) while the home header is un-scrolled and reverts to the light panel once scrolled. Also collapsed `.safety-grid` and `.faq-layout` to one column at ≤900px and reduced the join-band heading to 52px there. Header logo was downsized (172px→136px desktop, 145px→118px at ≤640px) so it no longer fills ~86% of the header height. Verified in-browser at 320/360/390/768/900px across all pages: no horizontal overflow; menu legible in both header states.
- Brand voice pass (2026-10-04, owner direction: "warm & human"): reworked the homepage steps section (intro now "Three small steps to one real hello."; step 3 retitled from "Send a connection request" to "Say hi, for real"), warmed two "Your call" cards ("A reason to say hi", "It takes two"), the "What is ProxiMeet?" and availability FAQ entries ("When can I try it?"), the contact intro line, and two waitlist paragraphs. Second pass on owner feedback: the three step bodies were lengthened into one connected narrative (interests → nearby people who share them → request, chat, public meetup) instead of clipped one-liners; card balance verified in-browser at 1440px. Hero, statement, peek, ticker, join band, and legal copy were deliberately left untouched.
- Footer uniformity pass (2026-10-04): the "Get early access" button and "Make the most of being here." tagline were removed from all footers, so every page's footer-top is just the logo. A "Your call" link (index.html#choice) was added to the header nav on waitlist, terms, privacy, and download pages to match the homepage nav.
- Page transitions added: shared JS intercepts internal links, shows a radar-pulse loader, then navigates (420ms, skipped under prefers-reduced-motion); pages fade in via a main animation.
- Homepage step 3 reflects the real flow: send a connection request → acceptance unlocks chat → pick a public meetup spot together.
- download.html removed from the worktree (2026-10-04, owner confirmation): it duplicated the waitlist's purpose. It was orphaned — no other page, script, stylesheet, or workflow references it — and its launch-notify FormSubmit form (with `_next` redirect) was retired with it. Old external inbound links to download.html will 404. The deletion is uncommitted, like the rest of the redesign work.
- Footers deduped to Contact / Terms / Privacy; header owns all other navigation and the logo links home.
- The CI workflow still verifies only that `index.html` exists.
- Production hosting and deployment status remain unverified from the repository alone.

## Working tree at review

The worktree already contained user changes to `.DS_Store`, `assets/.DS_Store`, `download.html`, `index.html`, `terms.html`, and `waitlist.html`, a deletion of `privacy.html`, and an untracked `privacy-policy.html`. These were not changed as part of the AI memory setup. Recheck `git status` before further edits because this snapshot can become stale.

## Next steps

- Review the redesigned pages and confirm the teaser visuals and copy match the intended launch story.
- Confirm the production hosting/deployment process and whether the configured forms and external assets are expected to remain in use.
- Add functional or link checks to CI only when the project adopts an appropriate validation approach; the existing existence check is not a functional test.
