// Language Switcher — injects UI and handles PT/EN translations
(function () {
  var STORAGE_KEY = 'lang';
  var currentLang = localStorage.getItem(STORAGE_KEY) || 'pt';

  // Shared translations (elements with data-i18n attribute)
  var shared = {
    'nav.trabalhos': 'Work',
    'nav.contato': 'Contact',
    'nav.guia': 'My AI Guide',
    'nav.freelas': 'Send freelance',
    'nav.embreve': 'Coming soon',
    'skip': 'Skip to content',
    'footer.cta': "Let's work together?",
    'backtotop': 'take me to the top',
    'about.title': 'About',
    'about.exp': 'Experience',
    'about.cv': 'Download my CV',
    'about.p1': '12 years working in Design, the last 10 dedicated to UX and digital product. I\'ve led design projects at CNN Brasil, Rakuten, Net NOW, Dasa, and Fretebras — spanning early stages, funded startups, and big corps. Currently a Senior Product Designer at Stone, one of the largest financial companies in Brazil, focused on product and AI.',
    'about.p2': 'My career is diverse in context but consistent in profile: highly complex operational products — logistics platforms, management tools, field apps, financial systems — where simplifying the experience has a direct impact on revenue and efficiency. I move between strategic vision and detailed execution: from discovery and product metrics to visual craft and Design System.',
    'about.p3': 'I believe the best design comes when the team understands the problem together, not when the designer delivers alone.',
    'about.p5': 'Outside of work, I\'m probably at the gym, or looking for places that make good coffee. I like being in constant motion, whether traveling, doing an extreme sport, or just living.',
    'about.job1': 'Stone - 2025/Current',
    'meta.empresa': 'Company',
    'meta.ano': 'Year',
    'meta.skills': 'Skills',
    'meta.dados': 'Data Analysis',
    'meta.interacao': 'Interaction Design',
    'meta.acessibilidade': 'Accessibility',
    'meta.pesquisa': 'Quantitative Research',
    'meta.usabilidade': 'Usability Testing',
    'next.veja': 'See also',
    'project.vercase': 'View case'
  };

  // Page-specific translations keyed by page filename
  var pages = {
    'index.html': {
      'hero.line1': 'With over 10 years of design experience, I turn challenges into experiences that generate value.',
      'hero.line2': 'Combining craft, AI, data, and strategy, I create solutions that connect users and businesses with real impact.',
      'project.fb.name': 'Fretebras - Freight Templates',
      'project.fb.desc': 'Reducing freight registration and publishing time by up to 70%.',
      'project.wc.name': 'WiseChat',
      'project.wc.desc': 'Building a fully integrated and customizable tool.',
      'project.wa.name': 'WiseApp',
      'project.wa.desc': 'Route optimization app for smarter freight transport.',
      'project.vip.name': 'Fretebras - VIP Driver',
      'project.vip.desc': 'Building a SaaS that has already generated R$100MM in revenue.'
    },
    'case-template-frete.html': {
      'case.title': 'Reducing freight registration and publishing time by up to 70%',
      'case.desafio': 'Challenge',
      'case.desafio.p1': 'Carriers publish dozens — sometimes hundreds — of freight listings per day on Fretebras. Analyzing usage data, I identified a pattern: most loads from the same carrier shared nearly identical information, varying only in values and destinations. Yet each publication required completing the full form.',
      'case.desafio.p2': 'The average registration time exceeded 2 minutes — an operational bottleneck that multiplied with every freight published and directly impacted the volume of offers on the platform.',
      'case.solucao': 'Solution and Results',
      'case.solucao.p1': 'From analyzing usage metrics, I mapped the fields that repeated most frequently between publications from the same carrier. With this hypothesis validated by data, I led rounds of solution exploration and internal validations with the product and engineering team to arrive at the most viable format. The final solution: reusable templates. The operator registers a freight normally and, at the end, saves the configuration as a template. In subsequent publications, they start from the template and adjust only what changes — eliminating rework without altering the familiar flow.',
      'case.solucao.p2': 'After rollout to the entire user base, the average registration time dropped from 2 minutes to 40 seconds — a ~67% reduction.',
      'next.title': 'Building a fully integrated and customizable tool'
    },
    'case-wisechat.html': {
      'case.title': 'Building a fully integrated and customizable tool',
      'case.desafio': 'Challenge',
      'case.desafio.p1': 'FieldCorp managed their entire driver operation in a fragmented way — recruitment via WhatsApp, performance tracking in spreadsheets, mass communication through groups, and notes scattered across docs. This decentralization caused rework, information loss between stages, and made scaling the operation difficult.',
      'case.desafio.p2': 'The company had already hired Wisechat, a dedicated platform to centralize these flows, but the original tool experience didn\'t meet the real day-to-day operational needs.',
      'case.solucao': 'Solution',
      'case.solucao.p1': 'I conducted a complete usability analysis of Wisechat, mapping friction points and gaps relative to the real operational flow. From there, I held rounds of direct interaction with the main stakeholder — FieldCorp\'s founder — to align priorities, validate directions, and adjust proposals to the business context.',
      'case.solucao.p2': 'I redesigned the experience from scratch: new recruitment flows, performance management, and mass communication, all integrated into a single interface. Beyond the redesign, I built and documented a component library with potential to evolve as the platform\'s design system — ensuring visual consistency and accelerating future deliveries. The project was validated with the stakeholder and is currently in development.',
      'next.title': 'Route optimization app for smarter freight transport'
    },
    'case-wiseapp.html': {
      'case.title': 'Route optimization app for smarter freight transport',
      'case.desafio': 'Challenge',
      'case.desafio.p1': 'WiseApp is FieldCorp\'s route optimization app — used by drivers in the field to collect loads, follow routes optimized by time and fuel, log breaks, and track deliveries in real time.',
      'case.desafio.p2': 'The app already existed, but with an outdated visual and an experience that hadn\'t been designed for who actually used it daily: the driver on route, with attention split between traffic, the phone, and the operation.',
      'case.solucao': 'Solution',
      'case.solucao.p1': 'Having previously worked at a road transport company, I brought knowledge about the profile and real context of this user — which accelerated the analysis and allowed me to question assumptions with more authority. I led the analysis of the existing experience and conducted validations with the main stakeholder to align priorities and technical feasibility.',
      'case.solucao.p2': 'I redesigned the interface from scratch, with decisions oriented to the field usage context:',
      'case.solucao.p3': 'Dark and light mode: not as an aesthetic feature, but as accessibility — drivers operate the app for long periods and in varying lighting conditions, many with vision difficulties. Giving the user autonomy of choice was a deliberate decision.',
      'case.solucao.p4': 'TMS Integration: route insertion became done directly via the system by operations, without requiring the driver to stop driving to manually add new deliveries — reducing interruption and risk.',
      'case.solucao.p5': 'I built and documented a component library specific to the app, with potential to evolve as FieldCorp\'s mobile design system. The project was validated with the stakeholder and is in development.',
      'next.title': 'Building a SaaS that has already generated R$100MM in revenue'
    },
    'case-motorista-vip.html': {
      'case.title': 'Building a SaaS that has already generated R$100MM in revenue',
      'case.desafio': 'Challenge',
      'case.desafio.p1': 'Fretebras monetized exclusively on the carrier side — the driver app was free. With a base of over 600,000 truckers and 1.1 million freight listings per month, monetizing the driver side represented enormous but untapped revenue potential.',
      'case.desafio.p2': 'The challenge was twofold: finding a pricing model that drivers perceived as fair and, at the same time, delivering enough value to sustain conversion and long-term retention.',
      'case.solucao': 'Solution',
      'case.solucao.p1': 'I participated in defining and conducting the research that supported the entire strategy. In the first quantitative round, 48.75% of drivers considered charging for app use valid — as long as they saw returns in the form of benefits and service quality. To understand which benefits would have the greatest conversion power, I conducted a second research focused on expectations. The most cited were:',
      'case.solucao.li1': 'See freight before other drivers',
      'case.solucao.li2': 'Guaranteed balance',
      'case.solucao.li3': 'Diesel cashback',
      'case.solucao.p2': 'With these hypotheses, I ran a moderated usability test with 9 drivers of different profiles, ages, and vehicles. The tested flow simulated the free experience — the driver saw the available freight, but to access details needed to wait for release to the entire base or subscribe to VIP to see first. At checkout, we displayed exclusive benefits as reinforcement of the value proposition.',
      'case.solucao.p3': 'The results validated both the conversion mechanics and the subscription\'s perceived value. The defined model was a monthly subscription with exclusive benefits, priced from dedicated willingness-to-pay research.',
      'case.resultados': 'Results',
      'case.resultados.p1': 'Over 100,000 VIP subscriptions sold, generating annual revenue of nearly R$100 million — transforming the driver app from a cost center into one of Fretebras\' main revenue sources.',
      'next.title': 'Reducing freight registration and publishing time by up to 70%'
    }
  };

  // Get current page filename
  function getPageKey() {
    var path = window.location.pathname;
    var filename = path.substring(path.lastIndexOf('/') + 1) || 'index.html';
    return filename;
  }

  // Store original PT text
  var originals = new Map();

  function storeOriginal(el, attr) {
    var key = attr || 'textContent';
    if (!originals.has(el)) originals.set(el, {});
    var store = originals.get(el);
    if (!(key in store)) {
      store[key] = attr ? el.getAttribute(attr) : el.textContent;
    }
  }

  function applyLang(lang) {
    currentLang = lang;
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang === 'en' ? 'en' : 'pt-BR';

    // Update switcher buttons
    var btns = document.querySelectorAll('.lang-switcher button');
    btns.forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });

    // Translate shared elements
    var i18nEls = document.querySelectorAll('[data-i18n]');
    i18nEls.forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      storeOriginal(el);
      if (lang === 'en' && shared[key]) {
        el.textContent = shared[key];
      } else if (lang === 'pt') {
        var store = originals.get(el);
        if (store && 'textContent' in store) el.textContent = store.textContent;
      }
    });

    // Translate page-specific elements
    var pageKey = getPageKey();
    var pageTrans = pages[pageKey];
    if (pageTrans) {
      var pageEls = document.querySelectorAll('[data-i18n-page]');
      pageEls.forEach(function (el) {
        var key = el.getAttribute('data-i18n-page');
        storeOriginal(el);
        if (lang === 'en' && pageTrans[key]) {
          el.textContent = pageTrans[key];
        } else if (lang === 'pt') {
          var store = originals.get(el);
          if (store && 'textContent' in store) el.textContent = store.textContent;
        }
      });
    }

    // Handle typewriter on index (data-text attributes)
    var typewriterLines = document.querySelectorAll('.typewriter-line');
    typewriterLines.forEach(function (el) {
      var key = el.getAttribute('data-i18n-page');
      if (!key) return;
      storeOriginal(el, 'data-text');
      if (lang === 'en' && pages['index.html'] && pages['index.html'][key]) {
        // Replace visible word spans with translated text
        var words = el.querySelectorAll('.word');
        if (words.length > 0) {
          var newText = pages['index.html'][key];
          var newWords = newText.split(' ');
          el.innerHTML = '';
          newWords.forEach(function (word, i) {
            var span = document.createElement('span');
            span.className = 'word visible';
            span.textContent = word + (i < newWords.length - 1 ? ' ' : '');
            el.appendChild(span);
          });
        }
      } else if (lang === 'pt') {
        var store = originals.get(el);
        if (store && 'data-text' in store) {
          var ptText = store['data-text'];
          var ptWords = ptText.split(' ');
          el.innerHTML = '';
          ptWords.forEach(function (word, i) {
            var span = document.createElement('span');
            span.className = 'word visible';
            span.textContent = word + (i < ptWords.length - 1 ? ' ' : '');
            el.appendChild(span);
          });
        }
      }
    });

    // Update page title
    if (lang === 'en') {
      if (pageKey === 'index.html') {
        document.title = 'Bruno Queirós - AI Product Designer';
      }
    }
  }

  // Inject switcher HTML
  function injectSwitcher() {
    var switcher = document.createElement('div');
    switcher.className = 'lang-switcher';
    switcher.innerHTML =
      '<button data-lang="pt" type="button"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 14" width="20" height="14"><rect width="20" height="14" rx="2" fill="#009739"/><path d="M10 1.5L18.5 7 10 12.5 1.5 7z" fill="#FEDD00"/><circle cx="10" cy="7" r="3.2" fill="#012169"/><path d="M7.2 5.8c1.2-.6 2.8-.7 4.2-.2-.8-.6-2-.9-3.1-.7-.4.1-.8.4-1.1.9z" fill="#fff"/></svg></button>' +
      '<span class="lang-switcher-divider">/</span>' +
      '<button data-lang="en" type="button"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 14" width="20" height="14"><rect width="20" height="14" rx="2" fill="#fff"/><path d="M0 0h20v1.077H0zm0 2.154h20v1.077H0zm0 2.154h20v1.077H0zm0 2.153h20v1.077H0zm0 2.154h20v1.077H0zm0 2.154h20v1.077H0zm0 2.154h20V14H0z" fill="#B22234"/><rect width="8" height="7.538" rx="1" fill="#3C3B6E"/><path d="M1 1l.2.6H2l-.5.4.2.6L1 2.2.3 2.6l.2-.6L0 1.6h.8zm2 0l.2.6H4l-.5.4.2.6L3 2.2l-.7.4.2-.6-.5-.4h.8zm2 0l.2.6H6l-.5.4.2.6L5 2.2l-.7.4.2-.6-.5-.4h.8zm2 0l.2.6H8l-.5.4.2.6L7 2.2l-.7.4.2-.6-.5-.4h.8zM2 2.5l.2.6H3l-.5.4.2.6-.7-.4-.7.4.2-.6-.5-.4h.8zm2 0l.2.6H5l-.5.4.2.6L4 3.7l-.7.4.2-.6-.5-.4h.8zm2 0l.2.6H7l-.5.4.2.6L6 3.7l-.7.4.2-.6-.5-.4h.8zM1 4l.2.6H2l-.5.4.2.6L1 5.2.3 5.6l.2-.6L0 4.6h.8zm2 0l.2.6H4l-.5.4.2.6L3 5.2l-.7.4.2-.6-.5-.4h.8zm2 0l.2.6H6l-.5.4.2.6L5 5.2l-.7.4.2-.6-.5-.4h.8zm2 0l.2.6H8l-.5.4.2.6L7 5.2l-.7.4.2-.6-.5-.4h.8zM2 5.5l.2.6H3l-.5.4.2.6L2 6.7l-.7.4.2-.6-.5-.4h.8zm2 0l.2.6H5l-.5.4.2.6L4 6.7l-.7.4.2-.6-.5-.4h.8zm2 0l.2.6H7l-.5.4.2.6L6 6.7l-.7.4.2-.6-.5-.4h.8z" fill="#fff"/></svg></button>';

    document.body.appendChild(switcher);

    switcher.addEventListener('click', function (e) {
      var btn = e.target.closest('button[data-lang]');
      if (!btn) return;
      var lang = btn.getAttribute('data-lang');
      if (lang !== currentLang) {
        applyLang(lang);
      }
    });
  }

  // Init
  injectSwitcher();
  if (currentLang === 'en') {
    applyLang('en');
  } else {
    // Mark PT as active
    var ptBtn = document.querySelector('.lang-switcher button[data-lang="pt"]');
    if (ptBtn) ptBtn.classList.add('active');
  }
})();
