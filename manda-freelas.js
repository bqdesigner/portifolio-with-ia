// Manda Freelas — page interactions
(function () {
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Hero: reveal on load
  (function () {
    var inner = document.querySelector('.fl-hero-inner');
    if (!inner) return;
    setTimeout(function () { inner.classList.add('loaded'); }, 80);
  })();

  // Scroll indicator — click/enter scrolls to Help section
  (function () {
    var indicator = document.querySelector('.fl-hero .scroll-indicator');
    if (!indicator) return;
    function scrollNext() {
      var target = document.getElementById('helpContainer');
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    }
    indicator.addEventListener('click', scrollNext);
    indicator.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); scrollNext(); }
    });
  })();

  // Generic IntersectionObserver reveal
  function revealOn(selector, threshold) {
    var els = document.querySelectorAll(selector);
    if (!els.length) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: threshold || 0.15 });
    els.forEach(function (el) { io.observe(el); });
  }
  revealOn('.fl-service-card', 0.1);
  revealOn('.fl-payment-card', 0.15);
  revealOn('.fl-faq-inner', 0.1);
  revealOn('.fl-contact-inner', 0.1);

  // Stagger reveal for services and payment cards
  (function stagger() {
    var services = document.querySelectorAll('.fl-service-card');
    services.forEach(function (c, i) { c.style.transitionDelay = (i * 120) + 'ms'; });
    var payments = document.querySelectorAll('.fl-payment-card');
    payments.forEach(function (c, i) { c.style.transitionDelay = (i * 100) + 'ms'; });
  })();

  // Sticky scroll progress helper
  function stickyProgress(containerEl, onChange) {
    function onScroll() {
      var rect = containerEl.getBoundingClientRect();
      var total = containerEl.offsetHeight - window.innerHeight;
      var scrolled = -rect.top;
      var p = Math.min(1, Math.max(0, scrolled / total));
      onChange(p);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Help section
  (function helpSection() {
    var container = document.getElementById('helpContainer');
    if (!container) return;
    var dots = container.querySelectorAll('.fl-help-dot');
    var items = container.querySelectorAll('.fl-help-card-item');
    var fill = document.getElementById('helpProgressFill');
    var total = items.length;

    stickyProgress(container, function (p) {
      if (fill) fill.style.height = (p * 100) + '%';
      var idx = Math.min(total - 1, Math.floor(p * total));
      dots.forEach(function (d, i) {
        d.classList.toggle('active', i === idx);
        d.classList.toggle('done', i < idx);
      });
      items.forEach(function (it, i) {
        it.classList.remove('active', 'past', 'future');
        if (i === idx) it.classList.add('active');
        else if (i < idx) it.classList.add('past');
        else it.classList.add('future');
      });
    });

    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () {
        var totalPx = container.offsetHeight - window.innerHeight;
        var target = container.offsetTop + (i / total) * totalPx;
        window.scrollTo({ top: target, behavior: 'smooth' });
      });
    });
  })();

  // Process section
  (function processSection() {
    var container = document.getElementById('processContainer');
    if (!container) return;
    var steps = container.querySelectorAll('.fl-process-step');
    var fill = document.getElementById('processLineFill');
    var total = steps.length;

    stickyProgress(container, function (p) {
      var activeCount = Math.ceil(p * total);
      steps.forEach(function (s, i) {
        s.classList.toggle('active', i < activeCount);
        s.classList.toggle('current', i === activeCount - 1);
      });
      if (fill) {
        var fillPct = Math.min(100, (p * total) / Math.max(1, total - 1) * 100);
        fill.style.height = fillPct + '%';
      }
    });
  })();

  // FAQ accordion
  (function faq() {
    var items = document.querySelectorAll('.fl-faq-item');
    items.forEach(function (item) {
      var q = item.querySelector('.fl-faq-q');
      var icon = item.querySelector('.fl-faq-icon');
      if (!q) return;
      q.addEventListener('click', function () {
        var isOpen = item.classList.toggle('open');
        if (icon) icon.textContent = isOpen ? '−' : '+';
      });
    });
  })();

  // Contact form — multi-step
  (function contactForm() {
    var form = document.getElementById('contactForm');
    if (!form) return;

    var steps = {
      0: form.querySelector('[data-step="0"]'),
      1: form.querySelector('[data-step="1"]'),
      2: form.querySelector('[data-step="2"]'),
      3: form.querySelector('[data-step="3"]'),
    };
    var state = {
      tipo: null,
      selected: [],
      outro: '',
      desc: '',
      tema: [],
      datas: '',
      pagamento: null,
    };

    var SERVICE_OPTIONS = {
      Design: ['Design de apps', 'Redesign de produtos digitais', 'Design Systems', 'Protótipos navegáveis', 'Telas prontas para dev', 'Relatório de usabilidade'],
      Web: ['Landing Page', 'Site institucional', 'Portfólio', 'E-commerce', 'Site em React'],
      Produto: ['Diagnóstico de produto', 'Roadmap de melhorias', 'Fluxos de onboarding', 'Dashboard & dados', 'Consultoria estratégica'],
    };

    function showStep(n) {
      [0, 1, 2, 3].forEach(function (k) {
        if (steps[k]) steps[k].hidden = (k !== n);
      });
    }

    function renderChecklist() {
      var list = form.querySelector('#cfChecklist');
      var backTipoSpan = form.querySelector('.cf-back-tipo');
      if (!list || !state.tipo) return;
      if (backTipoSpan) backTipoSpan.textContent = state.tipo;
      list.innerHTML = '';
      var items = SERVICE_OPTIONS[state.tipo] || [];
      items.forEach(function (it) {
        var label = document.createElement('label');
        label.className = 'cf-check-item';
        label.dataset.item = it;
        label.innerHTML = '<input type="checkbox"><span>' + it + '</span>';
        label.addEventListener('click', function (e) {
          if (e.target.tagName !== 'INPUT') e.preventDefault();
          var idx = state.selected.indexOf(it);
          if (idx === -1) state.selected.push(it);
          else state.selected.splice(idx, 1);
          label.classList.toggle('checked', state.selected.indexOf(it) !== -1);
          validateA();
        });
        list.appendChild(label);
      });
    }

    // Tipo buttons
    form.querySelectorAll('.cf-tipo-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var t = btn.dataset.tipo;
        if (state.tipo === t) {
          state.tipo = null;
          form.querySelectorAll('.cf-tipo-btn').forEach(function (b) { b.classList.remove('active'); });
          showStep(0);
          return;
        }
        state.tipo = t;
        form.querySelectorAll('.cf-tipo-btn').forEach(function (b) { b.classList.toggle('active', b === btn); });
        state.selected = [];
        state.tema = [];
        if (t === 'Mentoria') {
          showStep(2);
        } else {
          renderChecklist();
          showStep(1);
        }
      });
    });

    // Back buttons
    form.querySelectorAll('.cf-back-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        showStep(0);
      });
    });

    // Outro text
    var outroInput = form.querySelector('#cfOutro');
    if (outroInput) outroInput.addEventListener('input', function () {
      state.outro = outroInput.value.trim();
      validateA();
    });
    // Desc
    var descInput = form.querySelector('#cfDesc');
    if (descInput) descInput.addEventListener('input', function () {
      state.desc = descInput.value.trim();
    });
    // Pagamento
    form.querySelectorAll('.cf-pag-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var p = btn.dataset.pag;
        if (state.pagamento === p) {
          state.pagamento = null;
          btn.classList.remove('active');
        } else {
          state.pagamento = p;
          form.querySelectorAll('.cf-pag-btn').forEach(function (b) { b.classList.toggle('active', b === btn); });
        }
      });
    });

    // Mentoria tema checklist
    form.querySelectorAll('#cfTemaList .cf-check-item').forEach(function (label) {
      label.addEventListener('click', function (e) {
        if (e.target.tagName !== 'INPUT') e.preventDefault();
        var t = label.dataset.tema;
        var idx = state.tema.indexOf(t);
        if (idx === -1) state.tema.push(t);
        else state.tema.splice(idx, 1);
        label.classList.toggle('checked', state.tema.indexOf(t) !== -1);
        validateB();
      });
    });
    // Mentoria datas
    var datasInput = form.querySelector('#cfDatas');
    if (datasInput) datasInput.addEventListener('input', function () {
      state.datas = datasInput.value.trim();
      validateB();
    });

    // Submit buttons validation
    var submitA = form.querySelector('#cfSubmitA');
    var submitB = form.querySelector('#cfSubmitB');
    function validateA() {
      if (!submitA) return;
      submitA.disabled = !(state.selected.length || state.outro);
    }
    function validateB() {
      if (!submitB) return;
      submitB.disabled = !(state.tema.length && state.datas);
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var body;
      if (state.tipo === 'Mentoria') {
        body = 'Tipo: Mentoria\nTema: ' + state.tema.join(', ') + '\nDisponibilidade: ' + state.datas;
      } else {
        var items = state.selected.slice();
        if (state.outro) items.push('Outro: ' + state.outro);
        body = 'Tipo: ' + state.tipo + '\nServiços: ' + items.join(', ') + '\nPagamento: ' + (state.pagamento || 'Não informado') + '\nDescrição: ' + state.desc;
      }
      window.location.href = 'mailto:bqdesigner@outlook.com?subject=' + encodeURIComponent('Freela - ' + state.tipo) + '&body=' + encodeURIComponent(body);
      showStep(3);
    });

    // Reset
    var resetBtn = form.querySelector('#cfReset');
    if (resetBtn) resetBtn.addEventListener('click', function () {
      state.tipo = null;
      state.selected = [];
      state.outro = '';
      state.desc = '';
      state.tema = [];
      state.datas = '';
      state.pagamento = null;
      form.querySelectorAll('.cf-tipo-btn, .cf-pag-btn').forEach(function (b) { b.classList.remove('active'); });
      form.querySelectorAll('.cf-check-item').forEach(function (l) { l.classList.remove('checked'); var cb = l.querySelector('input'); if (cb) cb.checked = false; });
      if (outroInput) outroInput.value = '';
      if (descInput) descInput.value = '';
      if (datasInput) datasInput.value = '';
      validateA(); validateB();
      showStep(0);
    });

    // Placeholder i18n support
    function updatePlaceholders() {
      var lang = localStorage.getItem('lang') || 'pt';
      form.querySelectorAll('[data-placeholder-pt]').forEach(function (el) {
        var val = lang === 'en' ? el.getAttribute('data-placeholder-en') : el.getAttribute('data-placeholder-pt');
        if (val) el.setAttribute('placeholder', val);
      });
    }
    updatePlaceholders();
    // Hook into language switcher clicks to update placeholders
    var langContainer = document.querySelector('.header-controls');
    if (langContainer) {
      langContainer.addEventListener('click', function (e) {
        var btn = e.target.closest('button[data-lang]');
        if (!btn) return;
        setTimeout(updatePlaceholders, 10);
      });
    }
  })();

  // FAQ scroll position — nudge when opening long items
  // (handled by CSS max-height — no JS needed)
})();
