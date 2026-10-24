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

// Page transitions: radar-pulse loader between internal pages (concept A style).
const loader = document.createElement('div');
loader.className = 'page-loader';
loader.setAttribute('aria-hidden', 'true');
loader.innerHTML = '<div class="loader-rings"><i></i><i></i><i></i><span class="loader-pin"></span></div>';
document.body.appendChild(loader);
document.addEventListener('click', event => {
  const link = event.target.closest('a[href]');
  if (!link || event.defaultPrevented || event.button !== 0) return;
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  if (link.target || link.hasAttribute('download')) return;
  const href = link.getAttribute('href');
  if (!href || href.startsWith('#') || /^(https?:|mailto:|tel:)/.test(href)) return;
  event.preventDefault();
  document.body.classList.add('is-leaving');
  setTimeout(() => { location.href = href; }, reducedMotion.matches ? 0 : 420);
});
window.addEventListener('pageshow', event => {
  if (event.persisted) document.body.classList.remove('is-leaving');
});
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
