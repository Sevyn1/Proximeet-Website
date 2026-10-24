const root = document.documentElement;
root.classList.add('js');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const mobile = matchMedia('(max-width: 720px)');
const header = document.querySelector('.c-header');
const menuToggle = document.querySelector('.c-menu-toggle');
const nav = document.querySelector('.c-nav');
function setMenu(open, returnFocus = false) {
  if (!nav || !menuToggle) return;
  nav.classList.toggle('is-open', open);
  nav.inert = mobile.matches && !open;
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  if (returnFocus) menuToggle.focus();
}
setMenu(false);
menuToggle?.addEventListener('click', () => setMenu(menuToggle.getAttribute('aria-expanded') !== 'true'));
nav?.addEventListener('click', event => { if (event.target.closest('a')) setMenu(false); });
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && nav?.classList.contains('is-open')) setMenu(false, true);
});
document.addEventListener('click', event => {
  if (nav?.classList.contains('is-open') && !header?.contains(event.target)) setMenu(false);
});
header?.addEventListener('focusout', event => {
  if (event.relatedTarget && !header.contains(event.relatedTarget)) setMenu(false);
});
mobile.addEventListener('change', () => setMenu(false));
window.addEventListener('pageshow', () => { setMenu(false); });
window.addEventListener('pagehide', () => setMenu(false));
if (header) {
  const onScroll = () => header.classList.toggle('is-scrolled', scrollY > 24);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}
document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });

// Native document transitions keep links, history, downloads and forms intact.
// Unsupported browsers receive a short entrance rather than delayed navigation.
if (!('onpagereveal' in window) && !reducedMotion.matches &&
    performance.getEntriesByType('navigation')[0]?.type !== 'back_forward') {
  document.querySelector('main')?.animate(
    [{ opacity: .65, transform: 'translateY(6px)' }, { opacity: 1, transform: 'none' }],
    { duration: 220, easing: 'cubic-bezier(.2,.7,.2,1)' }
  );
}
// Suspend ambient motion when the tab or animated region is not visible.
function syncVisibility() { root.classList.toggle('tab-hidden', document.hidden); }
document.addEventListener('visibilitychange', syncVisibility);
syncVisibility();
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) entry.target.classList.toggle('motion-offscreen', !entry.isIntersecting);
  }, { rootMargin: '80px' });
  document.querySelectorAll('.c-hero, .c-ticker').forEach(el => observer.observe(el));
}
