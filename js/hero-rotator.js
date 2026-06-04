// Hero rotator — cicla as frases da 2ª linha do título com slide-up + fade + blur
// (estilo nitro.framer). Escuta o evento `langchange` pra trocar PT/EN.
(function () {
  var el = document.getElementById('heroRotator');
  if (!el) return;

  var phrases = {
    pt: ['E o Craft', 'E análise de dados', 'E AI Coding'],
    en: ['And Craft', 'And data analysis', 'And AI Coding']
  };

  // Frases que quebram em 2 linhas SÓ no responsivo (no desktop ficam em 1 linha).
  var mobileBreak = {
    'E análise de dados': 'E análise<br>de dados',
    'And data analysis': 'And data<br>analysis'
  };

  var HOLD = 2200;       // tempo que cada frase fica parada
  var TRANSITION = 650;  // duração da troca (>= maior transition no CSS)
  var MOBILE = '(max-width: 1090px)';

  var lang = (localStorage.getItem('lang') === 'en') ? 'en' : 'pt';
  var i = 0;
  var current = null;
  var currentText = '';
  var timer = null;

  function isMobile() {
    return window.matchMedia(MOBILE).matches;
  }

  // HTML da frase: com quebra controlada no mobile, em linha única no desktop.
  function render(text) {
    return (isMobile() && mobileBreak[text]) ? mobileBreak[text] : text;
  }

  // Largura disponível na linha pro rotator (descontando o "/" + folga).
  function availWidth() {
    var line = el.parentNode;          // .hero-title-line (block)
    var accent = el.nextElementSibling; // .hero-title-accent ("/")
    var reserve = (accent ? accent.offsetWidth : 0) + 16;
    return Math.max(0, line.clientWidth - reserve);
  }

  // Reduz o font-size do rotator só se a frase mais longa não couber numa linha
  // (mobile). No desktop sobra espaço → não encolhe, mantém o tamanho do título.
  function fitFont() {
    el.style.fontSize = '';
    var avail = availWidth();
    var probe = document.createElement('span');
    probe.style.cssText = 'position:absolute;visibility:hidden;white-space:nowrap;';
    el.appendChild(probe);
    var max = 0;
    phrases[lang].forEach(function (p) {
      probe.innerHTML = render(p); // mede a linha mais larga (com quebra, se houver)
      if (probe.offsetWidth > max) max = probe.offsetWidth;
    });
    el.removeChild(probe);
    if (max > avail && max > 0) {
      var base = parseFloat(getComputedStyle(el).fontSize);
      el.style.fontSize = (base * avail / max) + 'px';
    }
  }

  // Reserva na linha do título a altura da frase MAIS ALTA (a que quebra em 2
   // linhas no mobile). Assim a linha já nasce com essa altura e não cresce/encolhe
   // quando a frase muda — o conteúdo abaixo do hero para de "pular". No desktop
   // todas têm 1 linha, então a reserva = altura natural (sem efeito colateral).
  function reserveHeight() {
    el.parentNode.style.minHeight = '';
    var probe = document.createElement('span');
    probe.style.cssText = 'position:absolute;visibility:hidden;white-space:nowrap;';
    el.appendChild(probe);
    var maxH = 0;
    phrases[lang].forEach(function (p) {
      probe.innerHTML = render(p);
      if (probe.offsetHeight > maxH) maxH = probe.offsetHeight;
    });
    el.removeChild(probe);
    el.parentNode.style.minHeight = maxH + 'px';
  }

  // Dimensiona o box pela largura/altura reais da frase — o "/" acompanha.
  function setBox(word) {
    el.style.width = word.offsetWidth + 'px';
    el.style.height = word.offsetHeight + 'px';
  }

  function makeWord(text, cls) {
    var w = document.createElement('span');
    w.className = 'hero-rotator-word ' + cls;
    w.innerHTML = render(text);
    return w;
  }

  // Mostra a primeira frase sem animação de entrada
  function mount() {
    el.innerHTML = '';
    fitFont();
    reserveHeight();
    currentText = phrases[lang][i];
    current = makeWord(currentText, 'active');
    el.appendChild(current);
    setBox(current);
  }

  function next() {
    i = (i + 1) % phrases[lang].length;
    swapTo(phrases[lang][i]);
  }

  function swapTo(text) {
    currentText = text;
    var incoming = makeWord(text, 'enter');
    el.appendChild(incoming);
    setBox(incoming); // anima largura/altura do box para a nova frase

    // força reflow pra a transição de entrada disparar
    void incoming.offsetWidth;

    if (current) {
      current.classList.remove('active');
      current.classList.add('exit');
    }
    incoming.classList.remove('enter');
    incoming.classList.add('active');

    var outgoing = current;
    current = incoming;

    setTimeout(function () {
      if (outgoing && outgoing.parentNode) outgoing.parentNode.removeChild(outgoing);
    }, TRANSITION);
  }

  function start() {
    stop();
    timer = setInterval(next, HOLD + TRANSITION);
  }

  function stop() {
    if (timer) clearInterval(timer);
    timer = null;
  }

  // Troca de idioma: refaz o fit (frases mudam de tamanho) e reseta para a frase 0
  document.addEventListener('langchange', function (e) {
    var newLang = (e.detail && e.detail.lang === 'en') ? 'en' : 'pt';
    if (newLang === lang) return;
    lang = newLang;
    i = 0;
    fitFont();
    reserveHeight();
    swapTo(phrases[lang][i]);
  });

  // Recalcula o fit ao redimensionar (a largura disponível muda)
  var rzTimer = null;
  window.addEventListener('resize', function () {
    if (rzTimer) clearTimeout(rzTimer);
    rzTimer = setTimeout(function () {
      if (current) current.innerHTML = render(currentText); // re-aplica quebra se cruzou o breakpoint
      fitFont();
      reserveHeight();
      if (current) setBox(current);
    }, 150);
  }, { passive: true });

  mount();
  start();
})();
