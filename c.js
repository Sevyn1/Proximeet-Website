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

// Scroll reveals: one-shot entrances as sections come into view (concept A style).
if ('IntersectionObserver' in window && !reducedMotion.matches) {
  const reveal = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        reveal.unobserve(entry.target);
      }
    }
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.cv').forEach(el => reveal.observe(el));
} else {
  document.querySelectorAll('.cv').forEach(el => el.classList.add('in-view'));
}

// Hero photo stack: bring the photo matching the visitor's country to the front.
// Country comes from a one-time IP lookup (api.country.is, no key, no data stored
// beyond this tab's sessionStorage); falls back to the browser locale, then the
// default photo order.
const heroCards = [...document.querySelectorAll('.hero-card[data-region]')];
if (heroCards.length > 1) {
  const regions = {
    africa: 'DZ AO BJ BW BF BI CM CV CF TD KM CG CD CI DJ EG GQ ER SZ ET GA GM GH GN GW KE LS LR LY MG MW ML MR MU MA MZ NA NE NG RW ST SN SC SL SO ZA SS SD TZ TG TN UG ZM ZW',
    'south-asia': 'IN PK BD LK NP BT MV AF',
    'east-asia': 'CN JP KR KP TW HK MO MN PH VN TH ID MY SG BN KH LA MM TL'
  };
  const regionFor = code => {
    for (const region in regions) {
      if (regions[region].split(' ').includes(code)) return region;
    }
    return 'default';
  };
  const focusCountry = code => {
    const region = regionFor(String(code || '').toUpperCase());
    const target = heroCards.find(card => card.dataset.region === region);
    if (!target || target.dataset.pos === '0') return;
    heroCards
      .filter(card => card !== target)
      .sort((a, b) => Number(a.dataset.pos) - Number(b.dataset.pos))
      .forEach((card, i) => { card.dataset.pos = String(i + 1); });
    target.dataset.pos = '0';
  };
  let cached = null;
  try { cached = sessionStorage.getItem('pm-country'); } catch { /* storage blocked */ }
  if (cached) {
    focusCountry(cached);
  } else {
    fetch('https://api.country.is/')
      .then(res => (res.ok ? res.json() : Promise.reject()))
      .then(data => {
        if (!data || !data.country) return Promise.reject();
        try { sessionStorage.setItem('pm-country', data.country); } catch { /* storage blocked */ }
        focusCountry(data.country);
      })
      .catch(() => {
        try {
          const locale = new Intl.Locale(navigator.language).maximize();
          if (locale.region) focusCountry(locale.region);
        } catch { /* keep the default photo order */ }
      });
  }
}
