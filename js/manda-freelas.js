// Manda Freelas — render + interactions
(function () {
  var data = window.MandaFreelas;
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var currentLang = localStorage.getItem('lang') || 'pt';
  function t(obj) { return (obj && (obj[currentLang] || obj.pt)) || ''; }

  // ---------- Renderers ----------

  function renderHelp() {
    var nav = document.getElementById('flHelpNav');
    var cards = document.getElementById('flHelpCards');
    if (!nav || !cards || !data) return;
    nav.innerHTML = '';
    cards.innerHTML = '';
    data.help.forEach(function (h, i) {
      var num = String(i + 1).padStart(2, '0');
      var dot = document.createElement('button');
      dot.className = 'fl-help-dot' + (i === 0 ? ' active' : '');
      dot.dataset.idx = i;
      dot.innerHTML = '<span class="fl-help-dot-num fl-mono">' + num + '</span><span class="fl-help-dot-tag">' + t(h.tag) + '</span>';
      nav.appendChild(dot);

      var card = document.createElement('div');
      card.className = 'fl-help-card-item' + (i === 0 ? ' active' : ' future');
      card.dataset.idx = i;
      card.innerHTML = '<span class="fl-help-num fl-mono">' + num + ' / ' + String(data.help.length).padStart(2, '0') + '</span>' +
                      '<h2 class="fl-help-title">' + t(h.title) + '</h2>' +
                      '<p class="fl-help-body">' + t(h.body) + '</p>';
      cards.appendChild(card);
    });
    var bar = document.createElement('div');
    bar.className = 'fl-help-progress-bar';
    bar.innerHTML = '<div class="fl-help-progress-fill" id="helpProgressFill"></div>';
    nav.appendChild(bar);
  }

  function renderServices() {
    var grid = document.getElementById('flServicesGrid');
    if (!grid || !data) return;
    grid.innerHTML = '';
    data.services.forEach(function (s, i) {
      var card = document.createElement('div');
      card.className = 'fl-service-card';
      card.style.setProperty('--service-accent', s.color);
      card.style.setProperty('--stagger', (i * 120) + 'ms');
      var list = s.items.map(function (it) { return '<li>' + t(it) + '</li>'; }).join('');
      card.innerHTML =
        '<div class="fl-service-top">' +
          '<span class="fl-service-icon" style="color:' + s.color + '">' + s.icon + '</span>' +
          '<span class="fl-service-area">' + t(s.name) + '</span>' +
        '</div>' +
        '<p class="fl-service-desc">' + t(s.desc) + '</p>' +
        '<ul class="fl-service-list">' + list + '</ul>';
      grid.appendChild(card);
    });
  }

  function renderProcess() {
    var wrap = document.getElementById('flProcessSteps');
    if (!wrap || !data) return;
    wrap.innerHTML = '';
    data.process.forEach(function (p, i) {
      var num = String(i + 1).padStart(2, '0');
      var step = document.createElement('div');
      step.className = 'fl-process-step';
      step.dataset.idx = i;
      step.innerHTML =
        '<div class="fl-process-dot"></div>' +
        '<div class="fl-process-content">' +
          '<div class="fl-process-header">' +
            '<span class="fl-mono fl-process-num">' + num + '</span>' +
            '<span class="fl-process-name">' + t(p.name) + '</span>' +
            '<span class="fl-mono fl-process-dur">' + t(p.dur) + '</span>' +
          '</div>' +
          '<p class="fl-process-desc">' + t(p.desc) + '</p>' +
        '</div>';
      wrap.appendChild(step);
    });
  }

  function renderPayment() {
    var grid = document.getElementById('flPaymentGrid');
    if (!grid || !data) return;
    var badgeLabel = { pt: 'Mais comum', en: 'Most common' };
    grid.innerHTML = '';
    data.payment.forEach(function (p, i) {
      var card = document.createElement('div');
      card.className = 'fl-payment-card' + (p.highlight ? ' highlight' : '');
      card.style.setProperty('--stagger', (i * 100) + 'ms');
      card.innerHTML =
        '<div class="fl-payment-icon">' + p.icon + '</div>' +
        '<h3 class="fl-payment-name">' + t(p.name) + '</h3>' +
        '<p class="fl-payment-desc">' + t(p.desc) + '</p>' +
        (p.highlight ? '<span class="fl-payment-badge">' + t(badgeLabel) + '</span>' : '');
      grid.appendChild(card);
    });
  }

  function renderFaq() {
    var list = document.getElementById('flFaqList');
    if (!list || !data) return;
    list.innerHTML = '';
    data.faq.forEach(function (f, i) {
      var item = document.createElement('div');
      item.className = 'fl-faq-item' + (i === 0 ? ' open' : '');
      item.innerHTML =
        '<button class="fl-faq-q">' +
          '<span>' + t(f.q) + '</span>' +
          '<span class="fl-faq-icon">' + (i === 0 ? '−' : '+') + '</span>' +
        '</button>' +
        '<div class="fl-faq-body"><p>' + t(f.a) + '</p></div>';
      list.appendChild(item);
    });
  }

  function renderFormTipos() {
    var wrap = document.getElementById('cfTipos');
    if (!wrap || !data) return;
    wrap.innerHTML = '';
    data.services.forEach(function (s) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'cf-tipo-btn';
      btn.dataset.tipo = s.id;
      btn.textContent = t(s.name);
      wrap.appendChild(btn);
    });
  }

  function renderFormPagamento() {
    var wrap = document.getElementById('cfPagamento');
    if (!wrap || !data) return;
    wrap.innerHTML = '';
    data.payment.forEach(function (p) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'cf-pag-btn';
      btn.dataset.pag = p.name.pt;
      btn.textContent = t(p.name);
      wrap.appendChild(btn);
    });
  }

  function renderFormTemas() {
    var wrap = document.getElementById('cfTemaList');
    if (!wrap || !data) return;
    wrap.innerHTML = '';
    data.form.temas.forEach(function (tm) {
      var label = document.createElement('label');
      label.className = 'cf-check-item';
      label.dataset.tema = tm.value;
      label.innerHTML = '<input type="checkbox"><span>' + t(tm.label) + '</span>';
      wrap.appendChild(label);
    });
    // "← Mentoria" back label
    var backMentoria = document.getElementById('cfBackMentoria');
    var mentoriaSvc = data.services.find(function (s) { return s.id === 'Mentoria'; });
    if (backMentoria && mentoriaSvc) backMentoria.textContent = t(mentoriaSvc.name);
  }

  function applyPlaceholders() {
    if (!data) return;
    var map = [
      ['#cfOutro', data.form.placeholders.outro],
      ['#cfDesc',  data.form.placeholders.desc],
      ['#cfDatas', data.form.placeholders.datas]
    ];
    map.forEach(function (pair) {
      var el = document.querySelector(pair[0]);
      if (el) el.setAttribute('placeholder', t(pair[1]));
    });
  }

  function renderAll() {
    renderHelp();
    renderServices();
    renderProcess();
    renderPayment();
    renderFaq();
    renderFormTipos();
    renderFormPagamento();
    renderFormTemas();
    applyPlaceholders();
    // Open FAQ items need their max-height set explicitly for CSS transition
    setTimeout(function () { if (typeof initFaqOpen === 'function') initFaqOpen(); }, 0);
  }

  renderAll();

  // ---------- Interactions ----------

  // Hero: reveal on load
  (function () {
    var inner = document.querySelector('.fl-hero-inner');
    if (!inner) return;
    setTimeout(function () { inner.classList.add('loaded'); }, 80);
  })();

  // Scroll indicator
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

  // Reveal on scroll — observe fresh each render
  var revealed = new WeakSet();
  function attachReveal() {
    var selectors = ['.fl-service-card', '.fl-payment-card', '.fl-faq-inner', '.fl-contact-inner'];
    selectors.forEach(function (sel) {
      document.querySelectorAll(sel).forEach(function (el) {
        if (revealed.has(el)) { el.classList.add('visible'); return; }
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (e) {
            if (e.isIntersecting) { e.target.classList.add('visible'); revealed.add(e.target); io.unobserve(e.target); }
          });
        }, { threshold: 0.1 });
        io.observe(el);
      });
    });
  }
  attachReveal();

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

  // Help sticky — re-queries each tick to survive re-renders
  (function helpSection() {
    var container = document.getElementById('helpContainer');
    if (!container) return;

    stickyProgress(container, function (p) {
      var dots = container.querySelectorAll('.fl-help-dot');
      var items = container.querySelectorAll('.fl-help-card-item');
      var fill = document.getElementById('helpProgressFill');
      var total = items.length;
      if (!total) return;
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

    // Delegate dot click
    container.addEventListener('click', function (e) {
      var dot = e.target.closest('.fl-help-dot');
      if (!dot) return;
      var i = parseInt(dot.dataset.idx, 10) || 0;
      var total = container.querySelectorAll('.fl-help-card-item').length || 1;
      var totalPx = container.offsetHeight - window.innerHeight;
      var target = container.offsetTop + (i / total) * totalPx;
      window.scrollTo({ top: target, behavior: 'smooth' });
    });
  })();

  // Process sticky — re-queries each tick
  (function processSection() {
    var container = document.getElementById('processContainer');
    if (!container) return;
    stickyProgress(container, function (p) {
      var stepsWrap = container.querySelector('.fl-process-steps');
      if (!stepsWrap) return;
      var steps = stepsWrap.querySelectorAll('.fl-process-step');
      var fill = document.getElementById('processLineFill');
      var total = steps.length;
      if (!total) return;
      var fillPct = Math.min(100, p * 100);
      if (fill) fill.style.height = fillPct + '%';
      var wrapRect = stepsWrap.getBoundingClientRect();
      if (!wrapRect.height) return;
      var thresholds = [];
      steps.forEach(function (s) {
        var dot = s.querySelector('.fl-process-dot');
        var ref = dot || s;
        var r = ref.getBoundingClientRect();
        var center = r.top + r.height / 2 - wrapRect.top;
        thresholds.push((center / wrapRect.height) * 100);
      });
      steps.forEach(function (s, i) {
        var reached = fillPct >= thresholds[i];
        var next = thresholds[i + 1];
        s.classList.toggle('active', reached);
        s.classList.toggle('current', reached && (next == null || fillPct < next));
      });
    });
  })();

  // FAQ accordion — delegation + scrollHeight-based max-height
  function openFaq(item) {
    var body = item.querySelector('.fl-faq-body');
    if (!body) return;
    body.style.maxHeight = body.scrollHeight + 'px';
    item.classList.add('open');
    var icon = item.querySelector('.fl-faq-icon');
    if (icon) icon.textContent = '−';
  }
  function closeFaq(item) {
    var body = item.querySelector('.fl-faq-body');
    if (!body) return;
    body.style.maxHeight = body.scrollHeight + 'px';
    body.offsetHeight; // force reflow
    body.style.maxHeight = '0px';
    item.classList.remove('open');
    var icon = item.querySelector('.fl-faq-icon');
    if (icon) icon.textContent = '+';
  }
  function initFaqOpen() {
    document.querySelectorAll('.fl-faq-item.open').forEach(function (it) {
      var body = it.querySelector('.fl-faq-body');
      if (body) body.style.maxHeight = body.scrollHeight + 'px';
    });
  }
  (function faq() {
    document.addEventListener('click', function (e) {
      var q = e.target.closest('.fl-faq-q');
      if (!q) return;
      var item = q.closest('.fl-faq-item');
      if (!item) return;
      if (item.classList.contains('open')) closeFaq(item);
      else openFaq(item);
    });
  })();

  // Contact form — delegation-based so re-renders don't lose wiring
  (function contactForm() {
    var form = document.getElementById('contactForm');
    if (!form) return;

    var steps = {
      0: form.querySelector('[data-step="0"]'),
      1: form.querySelector('[data-step="1"]'),
      2: form.querySelector('[data-step="2"]'),
      3: form.querySelector('[data-step="3"]')
    };
    var state = {
      tipo: null,
      selected: [],
      outro: '',
      desc: '',
      tema: [],
      datas: '',
      pagamento: null
    };

    function showStep(n) {
      [0, 1, 2, 3].forEach(function (k) {
        if (steps[k]) steps[k].hidden = (k !== n);
      });
    }

    function serviceById(id) {
      return data.services.find(function (s) { return s.id === id; });
    }

    function renderChecklist() {
      var list = form.querySelector('#cfChecklist');
      var backTipoSpan = form.querySelector('.cf-back-tipo');
      if (!list || !state.tipo) return;
      var svc = serviceById(state.tipo);
      if (!svc) return;
      if (backTipoSpan) backTipoSpan.textContent = t(svc.name);
      list.innerHTML = '';
      svc.items.forEach(function (itObj) {
        var label = document.createElement('label');
        label.className = 'cf-check-item';
        label.dataset.item = itObj.pt;
        var shown = t(itObj);
        if (state.selected.indexOf(itObj.pt) !== -1) label.classList.add('checked');
        label.innerHTML = '<input type="checkbox"' + (state.selected.indexOf(itObj.pt) !== -1 ? ' checked' : '') + '><span>' + shown + '</span>';
        list.appendChild(label);
      });
    }

    // Delegate everything on form
    form.addEventListener('click', function (e) {
      var tipoBtn = e.target.closest('.cf-tipo-btn');
      if (tipoBtn) {
        var tp = tipoBtn.dataset.tipo;
        if (state.tipo === tp) {
          state.tipo = null;
          form.querySelectorAll('.cf-tipo-btn').forEach(function (b) { b.classList.remove('active'); });
          showStep(0);
          return;
        }
        state.tipo = tp;
        form.querySelectorAll('.cf-tipo-btn').forEach(function (b) { b.classList.toggle('active', b === tipoBtn); });
        state.selected = [];
        state.tema = [];
        if (tp === 'Mentoria') { showStep(2); }
        else { renderChecklist(); showStep(1); }
        return;
      }

      var back = e.target.closest('.cf-back-btn');
      if (back) { showStep(0); return; }

      var pag = e.target.closest('.cf-pag-btn');
      if (pag) {
        var p = pag.dataset.pag;
        if (state.pagamento === p) {
          state.pagamento = null;
          pag.classList.remove('active');
        } else {
          state.pagamento = p;
          form.querySelectorAll('.cf-pag-btn').forEach(function (b) { b.classList.toggle('active', b === pag); });
        }
        return;
      }

      var checkItem = e.target.closest('.cf-check-item');
      if (checkItem) {
        if (e.target.tagName !== 'INPUT') e.preventDefault();
        // Is this a checklist item or a mentoria tema?
        if (checkItem.closest('#cfChecklist')) {
          var key = checkItem.dataset.item;
          var idx = state.selected.indexOf(key);
          if (idx === -1) state.selected.push(key); else state.selected.splice(idx, 1);
          checkItem.classList.toggle('checked', state.selected.indexOf(key) !== -1);
          validateA();
        } else if (checkItem.closest('#cfTemaList')) {
          var tm = checkItem.dataset.tema;
          var ti = state.tema.indexOf(tm);
          if (ti === -1) state.tema.push(tm); else state.tema.splice(ti, 1);
          checkItem.classList.toggle('checked', state.tema.indexOf(tm) !== -1);
          validateB();
        }
        return;
      }

      if (e.target.id === 'cfReset') {
        state.tipo = null; state.selected = []; state.outro = ''; state.desc = '';
        state.tema = []; state.datas = ''; state.pagamento = null;
        form.querySelectorAll('.cf-tipo-btn, .cf-pag-btn').forEach(function (b) { b.classList.remove('active'); });
        form.querySelectorAll('.cf-check-item').forEach(function (l) {
          l.classList.remove('checked');
          var cb = l.querySelector('input'); if (cb) cb.checked = false;
        });
        var outroInput = form.querySelector('#cfOutro');
        var descInput = form.querySelector('#cfDesc');
        var datasInput = form.querySelector('#cfDatas');
        if (outroInput) outroInput.value = '';
        if (descInput) descInput.value = '';
        if (datasInput) datasInput.value = '';
        validateA(); validateB();
        showStep(0);
      }
    });

    form.addEventListener('input', function (e) {
      if (e.target.id === 'cfOutro') { state.outro = e.target.value.trim(); validateA(); }
      if (e.target.id === 'cfDesc')  { state.desc = e.target.value.trim(); }
      if (e.target.id === 'cfDatas') { state.datas = e.target.value.trim(); validateB(); }
    });

    function validateA() {
      var submitA = form.querySelector('#cfSubmitA');
      if (!submitA) return;
      submitA.disabled = !(state.selected.length || state.outro);
    }
    function validateB() {
      var submitB = form.querySelector('#cfSubmitB');
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
  })();

  // ---------- Language change → re-render ----------
  document.addEventListener('langchange', function (e) {
    currentLang = (e.detail && e.detail.lang) || localStorage.getItem('lang') || 'pt';
    renderAll();
    attachReveal();
  });
})();
