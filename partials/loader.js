// Fetch [data-partial] placeholders, inject markup, then wire header
// interactions that depend on those elements. Emits `partials-ready`.
(function () {
  var placeholders = document.querySelectorAll('[data-partial]');
  if (!placeholders.length) { wireAll(); dispatchReady(); return; }

  var promises = [];
  placeholders.forEach(function (el) {
    var name = el.getAttribute('data-partial');
    promises.push(
      fetch('partials/' + name + '.html')
        .then(function (r) { return r.text(); })
        .then(function (html) {
          // Strip live-server's injected hot-reload script (it gets wedged inside SVG)
          html = html.replace(/<!-- Code injected by live-server -->[\s\S]*?<\/script>/g, '');
          var parent = el.parentNode;
          if (!parent) return;
          var tpl = document.createElement('template');
          tpl.innerHTML = html;
          parent.insertBefore(tpl.content, el);
          parent.removeChild(el);
        })
        .catch(function (err) { console.error('partial', name, err); })
    );
  });

  Promise.all(promises).then(function () {
    wireAll();
    dispatchReady();
  });

  function dispatchReady() {
    document.dispatchEvent(new CustomEvent('partials-ready'));
  }

  function wireAll() {
    wireTheme();
    wireHeaderScroll();
    wireHamburger();
    wireControlsToggle();
  }

  function wireControlsToggle() {
    var controls = document.querySelector('.header-controls');
    var toggle = controls && controls.querySelector('.header-controls-toggle');
    if (!toggle) return;
    toggle.addEventListener('click', function () {
      var open = controls.classList.toggle('expanded');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Fechar opções' : 'Abrir opções');
    });
  }

  function wireTheme() {
    var k = 'theme';
    var current = localStorage.getItem(k) || 'dark';
    function apply(m) {
      localStorage.setItem(k, m);
      document.documentElement.setAttribute('data-theme', m);
      document.querySelectorAll('.header-controls button[data-mode]').forEach(function (b) {
        b.classList.toggle('active', b.getAttribute('data-mode') === m);
      });
      var meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.setAttribute('content', m === 'dark' ? '#191819' : '#FFFFFF');
    }
    apply(current);
    document.querySelectorAll('.header-controls').forEach(function (s) {
      s.addEventListener('click', function (e) {
        var b = e.target.closest('button[data-mode]');
        if (!b) return;
        apply(b.getAttribute('data-mode'));
      });
    });
  }

  function wireHeaderScroll() {
    var header = document.getElementById('header');
    if (!header) return;
    var lastY = 0;
    window.addEventListener('scroll', function () {
      var y = window.scrollY;
      header.classList.toggle('header--scrolled', y > 50);
      if (y > 100) {
        if (y > lastY) header.classList.add('header--hidden');
        else header.classList.remove('header--hidden');
      } else {
        header.classList.remove('header--hidden');
      }
      if (Math.abs(y - lastY) > 2) {
        var controls = document.querySelector('.header-controls.expanded');
        if (controls) {
          controls.classList.remove('expanded');
          var toggle = controls.querySelector('.header-controls-toggle');
          if (toggle) {
            toggle.setAttribute('aria-expanded', 'false');
            toggle.setAttribute('aria-label', 'Abrir opções');
          }
        }
      }
      lastY = y;
    }, { passive: true });
  }

  function wireHamburger() {
    var hamburger = document.getElementById('hamburger');
    var overlay = document.getElementById('mobileOverlay');
    if (!hamburger || !overlay) return;
    hamburger.addEventListener('click', function () {
      var isOpen = hamburger.classList.toggle('hamburger--open');
      overlay.classList.toggle('mobile-overlay--open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
      hamburger.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
    });
    window.closeMobileMenu = function () {
      hamburger.classList.remove('hamburger--open');
      overlay.classList.remove('mobile-overlay--open');
      document.body.style.overflow = '';
      hamburger.setAttribute('aria-label', 'Abrir menu');
    };
  }
})();
