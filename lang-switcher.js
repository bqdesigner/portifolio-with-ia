// Language Switcher — injects UI and handles PT/EN translations
(function () {
  var STORAGE_KEY = 'lang';
  var currentLang = localStorage.getItem(STORAGE_KEY) || 'pt';

  // Shared translations (elements with data-i18n attribute)
  var shared = {
    'nav.trabalhos': 'Work',
    'nav.contato': 'Contact',
    'nav.blog': 'Blog',
    'nav.guia': 'My AI Guide',
    'nav.freelas': 'Send freelance',
    'nav.embreve': 'New',
    'nav.email.label': 'Have a project?',
    'skip': 'Skip to content',
    'footer.cta': "Let's work together?",
    'footer.col1.title': '— Contact',
    'footer.col1.text': 'Based in São Paulo, available remotely.',
    'footer.col2.title': '— Social',
    'footer.col3.title': '— Navigation',
    'footer.col3.soon': 'Send freelance (coming soon)',
    'backtotop': 'take me to the top',
    'scroll.hint': 'Scroll to view',
    'projects.label.title': 'Selected cases',
    'projects.label.year': '2023 → 2025',
    'about.tagline': 'A designer who moves between strategy and execution.',
    'about.label.title': 'Who is Bruno',
    'about.label.sub': '12 years doing design',
    'about.exp': 'Experience',
    'about.exp.empresa': 'Company',
    'about.exp.periodo': 'Period',
    'about.cv': 'Download my CV',
    'about.p1': '12 years of experience in Design, the last 10 dedicated to UX and digital product. Stints at CNN Brasil, Rakuten, Net NOW, Dasa, and Fretebras — contexts ranging from early stages, funded startups, and large companies. Currently Senior Product Designer at Stone, focused on product and AI.',
    'about.p2': 'Specializing in high-complexity operational products — logistics platforms, management tools, field apps, and financial systems. Moving between strategic vision and detailed execution: from discovery and product metrics to visual craft and Design System.',
    'about.p3': '"I believe the best design comes when the team understands the problem together, not when the designer delivers alone."',
    'about.tag1': 'Gym',
    'about.tag2': 'Travel',
    'about.tag3': 'Good coffee',
    'about.tag4': 'Extreme sports',
    'about.job1': 'Stone',
    'about.job1.year': '2025/Current',
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
      'hero.line0': "I'm Bruno, also known as Brunão.",
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
    'manda-freelas.html': {
      'freelas.hero.badge': 'Available for projects · 2026',
      'freelas.hero.l1': "Let's work",
      'freelas.hero.l2': 'together.',
      'freelas.hero.sub': 'Design, web and product — from briefing to delivery. No fluff, straight to the point, with a focus on quality.',
      'freelas.hero.scroll': 'Scroll',
      'freelas.help.label': '— How I can help',
      'freelas.help.1.tag': 'Discovery',
      'freelas.help.1.title': 'You have a problem, I have method.',
      'freelas.help.1.body': "I don't deliver pixels, I deliver solutions. Every project starts with active listening — understanding the business, the user and the real constraints before opening Figma.",
      'freelas.help.2.tag': 'Speed',
      'freelas.help.2.title': 'From idea to prototype in days, not weeks.',
      'freelas.help.2.body': "I work fast without compromising quality. Short validation cycles to make sure we're building the right thing before scaling.",
      'freelas.help.3.tag': 'Execution',
      'freelas.help.3.title': 'You get deliverables the team can actually use.',
      'freelas.help.3.body': "Clean handoff, documented specs, organized components. The developer isn't stuck asking questions on Slack — everything is in the file.",
      'freelas.help.4.tag': 'Vision',
      'freelas.help.4.title': 'Strategy and craft in the same package.',
      'freelas.help.4.body': '12 years moving between product, data and visual design. I can both define what to build and make sure it looks impeccable at delivery.',
      'freelas.services.label': '— Services',
      'freelas.services.title': 'What I deliver',
      'freelas.service.design': 'Design',
      'freelas.service.design.desc': 'From problem to pixel — research, concept and high quality visual delivery.',
      'freelas.service.design.1': 'App design',
      'freelas.service.design.2': 'Digital product redesign',
      'freelas.service.design.3': 'Design Systems',
      'freelas.service.design.4': 'Interactive prototypes',
      'freelas.service.design.5': 'Dev-ready screens',
      'freelas.service.design.6': 'Usability report',
      'freelas.service.web': 'Web',
      'freelas.service.web.desc': 'Design and code in the same pair of hands. Fast, well-built pages ready for production.',
      'freelas.service.web.1': 'Landing Pages',
      'freelas.service.web.2': 'Institutional websites',
      'freelas.service.web.3': 'Portfolios',
      'freelas.service.web.4': 'E-commerce',
      'freelas.service.web.5': 'React sites',
      'freelas.service.produto': 'Product',
      'freelas.service.produto.desc': 'Product vision for teams who need more than just a screen designer.',
      'freelas.service.produto.1': 'Product diagnostic',
      'freelas.service.produto.2': 'Improvement roadmap',
      'freelas.service.produto.3': 'Onboarding flows',
      'freelas.service.produto.4': 'Dashboard & data',
      'freelas.service.produto.5': 'Strategic consulting',
      'freelas.service.mentoria': 'Mentoring',
      'freelas.service.mentoria.desc': 'I help designers level up faster — with clarity, direction and no fluff.',
      'freelas.service.mentoria.1': '1:1 career',
      'freelas.service.mentoria.2': 'Portfolio review',
      'freelas.service.mentoria.3': 'Project feedback',
      'freelas.service.mentoria.4': 'Transition to UX',
      'freelas.process.label': '— Process',
      'freelas.process.title': 'From kickoff to delivery',
      'freelas.process.1.name': 'Kickoff',
      'freelas.process.1.dur': '1–2h',
      'freelas.process.1.desc': 'Initial meeting to understand the challenge, the business, the users and the constraints. We align expectations, scope and deliverables.',
      'freelas.process.2.name': 'Discovery',
      'freelas.process.2.dur': '3–5 days',
      'freelas.process.2.desc': 'Research, data analysis and benchmarking. We identify real opportunities before jumping to solutions.',
      'freelas.process.3.name': 'Concept',
      'freelas.process.3.dur': '3–7 days',
      'freelas.process.3.desc': 'Visual and flow exploration. Wireframes, moodboards and first directions. You see and approve before I go into detail.',
      'freelas.process.4.name': 'Design & Prototyping',
      'freelas.process.4.dur': '5–15 days',
      'freelas.process.4.desc': 'High-fidelity interface, components and clickable prototype for validation with users or stakeholders.',
      'freelas.process.5.name': 'Review',
      'freelas.process.5.dur': '2–4 days',
      'freelas.process.5.desc': 'Feedback and refinement cycle. Revision rounds are included in the scope — no surprise charges for small changes.',
      'freelas.process.6.name': 'Delivery & Handoff',
      'freelas.process.6.dur': '1–2 days',
      'freelas.process.6.desc': 'Organized Figma file, documented specs, exported assets and usage guide. The team can build without depending on me.',
      'freelas.payment.label': '— Payment options',
      'freelas.payment.title': 'How would you like to work?',
      'freelas.payment.1.name': 'Per project',
      'freelas.payment.1.desc': 'Fixed scope, defined deadline, agreed price. Ideal for landing pages, redesigns and one-off deliveries.',
      'freelas.payment.2.name': 'Hourly',
      'freelas.payment.2.desc': 'Paid for actual time dedicated. Great for consulting, reviews and open-scope projects.',
      'freelas.payment.3.name': 'Monthly retainer',
      'freelas.payment.3.desc': 'Monthly hours reserved for your product. Priority scheduling and progressive discount based on volume.',
      'freelas.payment.badge': 'Most common',
      'freelas.payment.note': '— I accept PIX and bank transfer. Installment payment available for projects above R$5k.',
      'freelas.contact.label': "— Let's work together",
      'freelas.contact.title1': "What's your",
      'freelas.contact.title2': 'project?',
      'freelas.form.q1': '— Which service do you need?',
      'freelas.form.q2': '— Select the deliverables',
      'freelas.form.q3': '— Payment format',
      'freelas.form.q4': '— Mentoring topic',
      'freelas.form.q5': '— Your availability',
      'freelas.form.back': '← ',
      'freelas.form.submit': 'Send by email',
      'freelas.form.priceUnit': '/hour',
      'freelas.form.tema.1': 'Transition to UX',
      'freelas.form.tema.2': 'Portfolio building',
      'freelas.form.tema.3': 'Project feedback',
      'freelas.form.tema.4': 'Freelance career',
      'freelas.form.tema.5': 'Growth as a designer',
      'freelas.form.sent.title': 'Email opened!',
      'freelas.form.sent.sub': 'Review and send from your email client. I reply within 24 business hours.',
      'freelas.form.sent.reset': 'New request',
      'freelas.faq.label': '— Frequently asked questions',
      'freelas.faq.title': 'Common questions',
      'freelas.faq.1.q': 'How does the work process work?',
      'freelas.faq.1.a': 'I start with an alignment conversation to understand the problem, deadline and context. From there, I structure the scope, present a proposal and — after approval — start the project. I work iteratively, with partial deliveries for continuous feedback.',
      'freelas.faq.2.q': 'How long does a typical project take?',
      'freelas.faq.2.a': 'It depends on scope. A landing page can be done in 1–2 weeks. A product redesign or complete design system can take 4 to 8 weeks. I estimate the timeline precisely in the proposal, after initial alignment.',
      'freelas.faq.3.q': 'Do you work with contracts?',
      'freelas.faq.3.a': "Yes, always. Every project has a contract with defined scope, deadline, payment method and revision policies. This protects both sides and ensures clarity from the start.",
      'freelas.faq.4.q': 'How many revision rounds are included?',
      'freelas.faq.4.a': 'Fixed projects include 2 revision rounds per delivery. Additional revisions are charged hourly. For hourly or retainer projects, there is no limit — you pay for actual time spent.',
      'freelas.faq.5.q': 'Do you deliver code or just design?',
      'freelas.faq.5.a': 'Both. For Web projects, I deliver design AND code (HTML/CSS/JS or React), production-ready. For product and UX projects, I deliver the design with full handoff to the dev team.',
      'freelas.faq.6.q': 'How does mentoring work?',
      'freelas.faq.6.a': 'Sessions are 1:1, via video call, 1 hour long. You pick the topic, send material in advance if you want, and we work directly — no fluff. The price is R$ 150/hour, paid before the session.',
      'freelas.faq.7.q': 'Do you accept international projects?',
      'freelas.faq.7.a': 'Yes. I work with clients remotely and in English. International payments via Wise or bank transfer. Prices can be quoted in USD or EUR, as agreed.'
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

  // Get current page filename (handles Vercel cleanUrls — no .html extension)
  function getPageKey() {
    var path = window.location.pathname;
    var filename = path.substring(path.lastIndexOf('/') + 1) || 'index.html';
    if (filename && filename.indexOf('.') === -1) filename += '.html';
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
    var btns = document.querySelectorAll('.header-controls button[data-lang]');
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
      var pageEls = document.querySelectorAll('[data-i18n-page]:not(.typewriter-line)');
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
    var replacedTypewriter = false;
    typewriterLines.forEach(function (el) {
      var key = el.getAttribute('data-i18n-page');
      if (!key) return;
      storeOriginal(el, 'data-text');
      if (lang === 'en' && pages['index.html'] && pages['index.html'][key]) {
        // Replace word spans with translated text
        var newText = pages['index.html'][key];
        var newWords = newText.split(' ');
        el.innerHTML = '';
        newWords.forEach(function (word, i) {
          var span = document.createElement('span');
          span.className = 'word visible';
          span.textContent = word + (i < newWords.length - 1 ? ' ' : '');
          el.appendChild(span);
        });
        replacedTypewriter = true;
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
          replacedTypewriter = true;
        }
      }
    });

    // When typewriter spans are replaced, the original animation loses its
    // references and never completes — so ensure the scroll indicator is visible
    if (replacedTypewriter) {
      var indicator = document.querySelector('.scroll-indicator');
      if (indicator) indicator.classList.add('scroll-indicator--visible');
    }

    // Update page title
    if (lang === 'en') {
      if (pageKey === 'index.html') {
        document.title = 'Bruno Queirós - AI Product Designer';
      }
    }
  }

  function attachSwitcher() {
    var container = document.querySelector('.header-controls');
    if (!container) return;
    container.addEventListener('click', function (e) {
      var btn = e.target.closest('button[data-lang]');
      if (!btn) return;
      var lang = btn.getAttribute('data-lang');
      if (lang !== currentLang) {
        applyLang(lang);
      }
    });
  }

  // Init
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', attachSwitcher);
  } else {
    attachSwitcher();
  }
  if (currentLang === 'en') {
    applyLang('en');
  } else {
    var ptBtn = document.querySelector('.header-controls button[data-lang="pt"]');
    if (ptBtn) ptBtn.classList.add('active');
  }
})();
