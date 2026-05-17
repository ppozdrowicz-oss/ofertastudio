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
    { key: 'uslugi', label: 'Usługi', href: '/#uslugi' },
    { key: 'realizacje', label: 'Realizacje', href: '/#realizacje' },
    { key: 'pakiety', label: 'Pakiety', href: '/#pakiety' },
    { key: 'proces', label: 'Proces', href: '/#proces' },
    { key: 'faq', label: 'FAQ', href: '/#faq' },
    { key: 'kontakt', label: 'Kontakt', href: '/#kontakt' }
  ];

  const serviceLinks = [
    ['Zdjęcia produktowe Allegro', '/zdjecia-produktowe-allegro/'],
    ['Opisy produktów Allegro', '/opisy-produktow-allegro/'],
    ['Optymalizacja ofert Allegro', '/optymalizacja-ofert-allegro/'],
    ['Audyt oferty Allegro', '/audyt-oferty-allegro/'],
    ['Oferty OLX', '/oferty-olx/']
  ];

  const breadcrumbLabels = {
    '/realizacje/': 'Realizacje',
    '/zdjecia-produktowe-allegro/': 'Zdjęcia produktowe Allegro',
    '/opisy-produktow-allegro/': 'Opisy produktów Allegro',
    '/optymalizacja-ofert-allegro/': 'Optymalizacja ofert Allegro',
    '/audyt-oferty-allegro/': 'Audyt oferty Allegro',
    '/oferty-olx/': 'Oferty OLX',
    '/polityka-prywatnosci/': 'Polityka prywatności'
  };

  const pageKey = () => {
    const path = window.location.pathname.replace(/\/index\.html$/, '/');
    if (path.startsWith('/realizacje')) return 'realizacje';
    if (path === '/' && window.location.hash) return window.location.hash.slice(1);
    if (path === '/') return '';
    if (serviceLinks.some(([, href]) => path === href)) return 'uslugi';
    return '';
  };

  const isHome = () => window.location.pathname.replace(/\/index\.html$/, '/') === '/';

  const hrefFor = item => {
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
            <a href="${homeHref('#kontakt')}" class="btn-nav" data-event="mini_audit_click" data-location="header" data-package="start">Bezpłatny mini audyt</a>
            <button class="ham-btn" id="hamBtn" type="button" aria-label="Otwórz menu nawigacji" aria-expanded="false" aria-controls="navDrawer"><span></span><span></span><span></span></button>
          </div>
        </div>
      </nav>
      <div class="nav-drawer" id="navDrawer" role="navigation" aria-label="Menu mobilne" aria-hidden="true">
        ${drawerLinks}
        <div class="drawer-ctas">
          <a href="${homeHref('#kontakt')}" class="btn-nav" data-event="mini_audit_click" data-location="mobile_nav" data-package="start">Bezpłatny mini audyt</a>
          <a href="https://wa.me/48791162938" class="btn-wa" rel="noopener">WhatsApp</a>
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
            <p class="foot-desc">Autorski projekt tworzenia i optymalizacji ofert produktowych dla Allegro, OLX i e-commerce.</p>
          </div>
          <div class="foot-contact" aria-label="Kontakt">
            <div class="foot-title">Kontakt</div>
            <a href="mailto:kontakt@ofertastudio.pl">kontakt@ofertastudio.pl</a>
            <a href="tel:+48791162938">+48 791 162 938</a>
            <a href="https://wa.me/48791162938" rel="noopener">WhatsApp</a>
          </div>
          <div>
            <div class="foot-title">Mapa strony</div>
            <div class="foot-links" aria-label="Linki w stopce">
              <a href="/">Strona główna</a>
              ${serviceMap}
              <a href="/realizacje/">Realizacje</a>
              <a href="${homeHref('#pakiety')}">Pakiety</a>
              <a href="/polityka-prywatnosci/">Polityka prywatności</a>
              <a href="${homeHref('#kontakt')}">Kontakt</a>
            </div>
          </div>
          <div class="foot-copy">© 2026 OfertaStudio.pl. Autorski projekt portfolio usługowego - współpraca ustalana indywidualnie.</div>
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
      link.classList.toggle('active', Boolean(key) && link.dataset.navKey === key);
    });
  }

  function bindHomeActiveSections() {
    if (!isHome()) return;
    const ids = ['uslugi', 'realizacje', 'pakiety', 'proces', 'faq', 'kontakt'];
    const sections = ids.map(id => document.getElementById(id)).filter(Boolean);
    if (!sections.length || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        document.querySelectorAll('[data-nav-key]').forEach(link => {
          link.classList.toggle('active', link.dataset.navKey === entry.target.id);
        });
      });
    }, { threshold: .35, rootMargin: '-80px 0px -55% 0px' });
    sections.forEach(section => observer.observe(section));
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
