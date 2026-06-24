(() => {
  const THEME_KEY = 'theme';
  const LEGACY_THEME_KEY = 'os-theme';
  const root = document.documentElement;

  function storedTheme() {
    try {
      return localStorage.getItem(THEME_KEY) || localStorage.getItem(LEGACY_THEME_KEY) || 'light';
    } catch (_) {
      return 'light';
    }
  }

  root.setAttribute('data-theme', storedTheme() === 'dark' ? 'dark' : 'light');

  const logo = `
    <svg viewBox="0 0 300 42" height="26" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
      <text y="34" font-family="Inter,sans-serif" font-weight="800" font-size="36" fill="currentColor" letter-spacing="-1">Oferta<tspan fill="var(--brand)">Studio</tspan><tspan font-weight="300" font-size="26" fill="var(--t3)" dy="1">.pl</tspan></text>
    </svg>`;

  const navItems = [
    { key: 'dla-kogo', label: 'Dla kogo', href: '/#dla-kogo' },
    { key: 'realizacje', label: 'Realizacje', href: '/#realizacje' },
    { key: 'pakiety', label: 'Pakiety', href: '/#pakiety' },
    { key: 'proces', label: 'Proces', href: '/#proces' },
    { key: 'kontakt', label: 'Kontakt', href: '/#kontakt' }
  ];

  const serviceLinks = [
    ['Zdjęcia produktowe Allegro', '/zdjecia-produktowe-allegro/'],
    ['Opisy produktów Allegro', '/opisy-produktow-allegro/'],
    ['Optymalizacja oferty Allegro', '/optymalizacja-ofert-allegro/'],
    ['Audyt oferty Allegro', '/audyt-oferty-allegro/'],
    ['Poprawa ogłoszenia OLX', '/oferty-olx/']
  ];

  const breadcrumbLabels = {
    '/realizacje/': 'Realizacje',
    '/zdjecia-produktowe-allegro/': 'Zdjęcia produktowe Allegro',
    '/opisy-produktow-allegro/': 'Opisy produktów Allegro',
    '/optymalizacja-ofert-allegro/': 'Optymalizacja oferty Allegro',
    '/audyt-oferty-allegro/': 'Audyt oferty Allegro',
    '/oferty-olx/': 'Poprawa ogłoszenia OLX',
    '/polityka-prywatnosci/': 'Polityka prywatności'
  };

  const normalizeHashKey = hash => {
    const key = (hash || '').replace(/^#/, '');
    if (key === 'uslugi' || key === 'bariery') return 'dla-kogo';
    if (key === 'realizacje-preview') return 'realizacje';
    return key;
  };

  const pageKey = () => {
    const path = window.location.pathname.replace(/\/index\.html$/, '/');
    if (path.startsWith('/realizacje')) return 'realizacje';
    if (path === '/' && window.location.hash) return normalizeHashKey(window.location.hash);
    if (path === '/') return '';
    if (serviceLinks.some(([, href]) => path === href)) return 'dla-kogo';
    return '';
  };

  const isHome = () => window.location.pathname.replace(/\/index\.html$/, '/') === '/';

  const hrefFor = item => {
    if (isHome() && item.key === 'realizacje') return '#realizacje';
    if (!isHome() || !item.href.startsWith('/#')) return item.href;
    return item.href.slice(1);
  };

  const navLink = (item, extra = '') => `<a href="${hrefFor(item)}" class="nav-link${extra}" data-nav-key="${item.key}">${item.label}</a>`;

  const homeHref = hash => isHome() ? hash : `/${hash}`;

  function renderHeader() {
    const host = document.querySelector('[data-site-header]');
    if (!host) return;
    const links = navItems.map(item => navLink(item)).join('');
    const drawerLinks = navItems.map(item => navLink(item, ' drawer-link')).join('');
    host.outerHTML = `
      <nav class="site-nav" aria-label="Główna nawigacja">
        <div class="nav-inner">
          <a class="nav-logo" href="/" aria-label="OfertaStudio.pl - strona główna">${logo}</a>
          <div class="nav-links" aria-label="Menu główne">${links}</div>
          <div class="nav-right">
            <div class="status-pill"><span class="sdot" aria-hidden="true"></span>Zapytania otwarte</div>
            <button class="toggle-btn" id="themeToggle" type="button" aria-label="Włącz tryb ciemny" aria-pressed="false"><span aria-hidden="true">☀</span></button>
            <a href="${homeHref('#kontakt')}" class="btn-nav" data-event="mini_audit_click" data-location="header" data-package="start">Sprawdź, od czego zacząć</a>
            <button class="ham-btn" id="hamBtn" type="button" aria-label="Otwórz menu nawigacji" aria-expanded="false" aria-controls="navDrawer"><span></span><span></span><span></span></button>
          </div>
        </div>
      </nav>
      <div class="nav-drawer" id="navDrawer" role="navigation" aria-label="Menu mobilne" aria-hidden="true">
        ${drawerLinks}
        <div class="drawer-ctas">
          <a href="${homeHref('#kontakt')}" class="btn-nav" data-event="mini_audit_click" data-location="mobile_nav" data-package="start">Sprawdź, od czego zacząć</a>
          <a href="https://wa.me/48791162938" class="btn-wa" rel="noopener">Napisz na WhatsApp</a>
        </div>
        <div class="drawer-contacts" aria-label="Kontakt">
          <a class="drawer-contact" href="mailto:kontakt@ofertastudio.pl">kontakt@ofertastudio.pl</a>
          <a class="drawer-contact" href="tel:+48791162938">+48 791 162 938</a>
        </div>
      </div>`;
  }

  function renderFooter() {
    const host = document.querySelector('[data-site-footer]');
    if (!host) return;
    const serviceMap = serviceLinks.map(([label, href]) => `<a href="${href}">${label}</a>`).join('');
    host.outerHTML = `
      <footer class="site-footer">
        <div class="foot-inner">
          <div class="foot-brand">
            <div class="foot-logo">OfertaStudio.pl</div>
            <p class="foot-desc">Praktyczne studio poprawy ofert Allegro i OLX: zdjęcia, opisy, tytuły, układ informacji i materiały gotowe do wdrożenia.</p>
          </div>
          <div class="foot-contact" aria-label="Kontakt">
            <div class="foot-title">Kontakt</div>
            <a href="mailto:kontakt@ofertastudio.pl">kontakt@ofertastudio.pl</a>
            <a href="tel:+48791162938">+48 791 162 938</a>
            <a href="https://wa.me/48791162938" rel="noopener">Napisz na WhatsApp</a>
          </div>
          <div>
            <div class="foot-title">Mapa strony</div>
            <div class="foot-links" aria-label="Linki w stopce">
              <a href="/">Strona główna</a>
              <a href="${homeHref('#dla-kogo')}">Dla kogo</a>
              ${serviceMap}
              <a href="/realizacje/">Realizacje</a>
              <a href="${homeHref('#pakiety')}">Pakiety</a>
              <a href="${homeHref('#proces')}">Proces</a>
              <a href="/polityka-prywatnosci/">Polityka prywatności</a>
              <a href="${homeHref('#kontakt')}">Kontakt</a>
            </div>
          </div>
          <div class="foot-copy">© 2026 OfertaStudio.pl. Najpierw diagnoza, potem zakres i cena przed startem.</div>
        </div>
      </footer>`;
  }

  function renderBreadcrumb() {
    document.querySelectorAll('[data-site-breadcrumb]').forEach(host => {
      const path = window.location.pathname.replace(/\/index\.html$/, '/');
      const current = host.getAttribute('data-breadcrumb-current') || breadcrumbLabels[path];
      if (!current) {
        host.remove();
        return;
      }
      host.outerHTML = `
        <nav class="breadcrumbs" aria-label="Ścieżka strony">
          <ol>
            <li><a href="/">Strona główna</a></li>
            <li aria-current="page">${current}</li>
          </ol>
        </nav>`;
    });
  }

  function setTheme(theme) {
    const next = theme === 'dark' ? 'dark' : 'light';
    root.setAttribute('data-theme', next);
    try {
      localStorage.setItem(THEME_KEY, next);
      localStorage.removeItem(LEGACY_THEME_KEY);
    } catch (_) {}
    const btn = document.getElementById('themeToggle');
    if (btn) {
      btn.setAttribute('aria-pressed', String(next === 'dark'));
      btn.setAttribute('aria-label', next === 'dark' ? 'Włącz tryb jasny' : 'Włącz tryb ciemny');
      const icon = btn.querySelector('span');
      if (icon) icon.textContent = next === 'dark' ? '☾' : '☀';
    }
  }

  function closeDrawer() {
    const ham = document.getElementById('hamBtn');
    const drawer = document.getElementById('navDrawer');
    if (!ham || !drawer) return;
    ham.classList.remove('open');
    drawer.classList.remove('open');
    ham.setAttribute('aria-expanded', 'false');
    ham.setAttribute('aria-label', 'Otwórz menu nawigacji');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function bindHeader() {
    const ham = document.getElementById('hamBtn');
    const drawer = document.getElementById('navDrawer');
    const theme = document.getElementById('themeToggle');
    setTheme(storedTheme());
    theme?.addEventListener('click', () => {
      setTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
    });
    ham?.addEventListener('click', () => {
      if (!drawer) return;
      const open = ham.classList.toggle('open');
      drawer.classList.toggle('open', open);
      ham.setAttribute('aria-expanded', String(open));
      ham.setAttribute('aria-label', open ? 'Zamknij menu nawigacji' : 'Otwórz menu nawigacji');
      drawer.setAttribute('aria-hidden', String(!open));
      document.body.style.overflow = open ? 'hidden' : '';
    });
    drawer?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeDrawer));
    document.addEventListener('click', event => {
      const nav = document.querySelector('.site-nav');
      if (!drawer?.classList.contains('open')) return;
      if (nav?.contains(event.target) || drawer.contains(event.target)) return;
      closeDrawer();
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && drawer?.classList.contains('open')) closeDrawer();
    });
    window.closeDrawer = closeDrawer;
  }

  function markActive() {
    const key = pageKey();
    document.querySelectorAll('[data-nav-key]').forEach(link => {
      const active = Boolean(key) && link.dataset.navKey === key;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }

  function bindHomeActiveSections() {
    if (!isHome()) return;
    const sectionMap = [
      ['dla-kogo', 'dla-kogo'],
      ['realizacje', 'realizacje'],
      ['pakiety', 'pakiety'],
      ['proces', 'proces'],
      ['kontakt', 'kontakt']
    ];
    const sections = sectionMap
      .map(([id, key]) => ({ id, key, el: document.getElementById(id) }))
      .filter(item => item.el)
      .sort((a, b) => a.el.offsetTop - b.el.offsetTop);
    if (!sections.length) return;
    const navLinks = () => document.querySelectorAll('[data-nav-key]');
    const navHeight = () => Math.ceil(document.querySelector('.site-nav')?.getBoundingClientRect().height || 0);
    let activeKey = null;
    const setActive = key => {
      if (key === activeKey) return;
      activeKey = key;
      navLinks().forEach(link => {
        const active = link.dataset.navKey === key;
        link.classList.toggle('active', active);
        if (active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    };
    const currentSection = () => {
      const probe = window.scrollY + navHeight() + Math.min(180, window.innerHeight * .28);
      return sections.find(section => {
        const top = section.el.offsetTop;
        return probe >= top && probe < top + section.el.offsetHeight;
      }) || null;
    };
    let ticking = false;
    const syncActive = () => {
      ticking = false;
      const section = currentSection();
      setActive(section?.key || '');
    };
    const scheduleSync = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(syncActive);
    };
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(scheduleSync, { threshold: [0, .12, .35, .65], rootMargin: `-${navHeight() + 8}px 0px -58% 0px` });
      sections.forEach(section => observer.observe(section.el));
    }
    window.addEventListener('scroll', scheduleSync, { passive: true });
    window.addEventListener('resize', scheduleSync);
    window.addEventListener('hashchange', scheduleSync);
    window.addEventListener('load', scheduleSync, { once: true });
    scheduleSync();
  }

  function init() {
    renderHeader();
    renderBreadcrumb();
    renderFooter();
    bindHeader();
    markActive();
    bindHomeActiveSections();
  }

  init();
})();
