// Header: blur nav on scroll + hide nav/email on scroll down, show on scroll up
const header = document.getElementById('header');
var lastScrollY = 0;

window.addEventListener('scroll', () => {
  var currentY = window.scrollY;
  header.classList.toggle('header--scrolled', currentY > 50);

  if (currentY > 100) {
    if (currentY > lastScrollY) {
      header.classList.add('header--hidden');
    } else {
      header.classList.remove('header--hidden');
    }
  } else {
    header.classList.remove('header--hidden');
  }

  lastScrollY = currentY;
}, { passive: true });

// Hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const overlay = document.getElementById('mobileOverlay');

hamburger.addEventListener('click', () => {
  const isOpen = hamburger.classList.toggle('hamburger--open');
  overlay.classList.toggle('mobile-overlay--open', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
  hamburger.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
});

function closeMobileMenu() {
  hamburger.classList.remove('hamburger--open');
  overlay.classList.remove('mobile-overlay--open');
  document.body.style.overflow = '';
  hamburger.setAttribute('aria-label', 'Abrir menu');
}

// Typewriter animation — word by word, cursor follows last visible word
(function() {
  var lines = document.querySelectorAll('.typewriter-line');
  var allWords = [];
  var wordToLine = [];

  var cursor = document.createElement('span');
  cursor.className = 'typewriter-cursor';
  cursor.style.display = 'none';

  lines.forEach(function(line, lineIdx) {
    var text = line.getAttribute('data-text');
    if (!text) return;
    var words = text.split(' ');
    words.forEach(function(word, i) {
      var span = document.createElement('span');
      span.className = 'word';
      span.textContent = word + (i < words.length - 1 ? ' ' : '');
      line.appendChild(span);
      allWords.push(span);
      wordToLine.push(lineIdx);
    });
  });

  var wordIndex = 0;
  var delay = 300;
  var interval = 60;

  function showNext() {
    if (wordIndex >= allWords.length) {
      allWords[allWords.length - 1].after(cursor);
      cursor.style.display = 'inline-block';
      var indicator = document.querySelector('.scroll-indicator');
      if (indicator) indicator.classList.add('scroll-indicator--visible');
      return;
    }

    var currentWord = allWords[wordIndex];
    currentWord.classList.add('visible');

    currentWord.after(cursor);
    cursor.style.display = 'inline-block';

    var lineEl = currentWord.parentElement;
    if (lineEl.classList.contains('muted')) {
      cursor.style.background = 'var(--color-mid)';
    } else {
      cursor.style.background = 'var(--color-deep)';
    }

    wordIndex++;

    var currentLine = wordToLine[wordIndex - 1];
    var nextLine = wordIndex < allWords.length ? wordToLine[wordIndex] : -1;
    var nextDelay = nextLine !== currentLine ? 400 : interval;

    setTimeout(showNext, nextDelay);
  }

  setTimeout(showNext, delay);
})();

// Parallax stacking: assign sticky top + z-index to content children
(function() {
  var content = document.querySelector('.content');
  if (!content) return;
  var children = content.querySelectorAll('.project-card, .footer-cta');
  var stickyTop = 48;
  var step = 8;

  for (var i = 0; i < children.length; i++) {
    children[i].style.top = stickyTop + (i * step) + 'px';
    children[i].style.zIndex = i + 1;
  }
})();

// Disable link navigation on project cards (cases not ready)
document.querySelectorAll('.project-card').forEach(function(card) {
  card.style.cursor = 'default';
  card.addEventListener('click', function(e) {
    e.preventDefault();
  });
});

// Footer credit typewriter — triggers when footer scrolls into view
(function() {
  var footerEl = document.getElementById('footerCredit');
  if (!footerEl) return;
  var text = footerEl.getAttribute('data-text');
  if (!text) return;

  var words = text.split(' ');
  var spans = [];
  var cursor = document.createElement('span');
  cursor.className = 'footer-credit-cursor';

  words.forEach(function(word, i) {
    var span = document.createElement('span');
    span.className = 'fc-word';
    span.textContent = word + (i < words.length - 1 ? ' ' : '');
    footerEl.appendChild(span);
    spans.push(span);
  });

  var started = false;

  function startTypewriter() {
    if (started) return;
    started = true;
    var idx = 0;
    var interval = 80;

    function showNext() {
      if (idx >= spans.length) {
        spans[spans.length - 1].after(cursor);
        cursor.style.display = 'inline-block';
        return;
      }
      spans[idx].classList.add('visible');
      spans[idx].after(cursor);
      cursor.style.display = 'inline-block';
      idx++;
      setTimeout(showNext, interval);
    }

    setTimeout(showNext, 1000);
  }

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        startTypewriter();
        observer.disconnect();
      }
    });
  }, { threshold: 0.5 });

  observer.observe(footerEl);
})();

// Logo marquee — infinite scroll, reverses on scroll up, pauses on hover
(function() {
  var track = document.getElementById('marqueeTrack');
  if (!track) return;

  var originalHTML = track.innerHTML;
  track.innerHTML = originalHTML + originalHTML + originalHTML + originalHTML;

  var speed = 0.5;
  var paused = false;
  var position = 0;
  var scrollDirection = -1;
  var prevScrollY = window.scrollY;

  window.addEventListener('scroll', function() {
    var currentY = window.scrollY;
    if (currentY > prevScrollY) {
      scrollDirection = -1;
    } else if (currentY < prevScrollY) {
      scrollDirection = 1;
    }
    prevScrollY = currentY;
  }, { passive: true });

  track.parentElement.addEventListener('mouseenter', function() {
    paused = true;
  });
  track.parentElement.addEventListener('mouseleave', function() {
    paused = false;
  });

  var singleSetWidth = 0;

  function measureSet() {
    var items = track.querySelectorAll('img');
    var perSet = items.length / 4;
    singleSetWidth = 0;
    for (var i = 0; i < perSet; i++) {
      singleSetWidth += items[i].offsetWidth + 48;
    }
  }

  function animate() {
    if (!paused) {
      position -= speed * scrollDirection;

      if (position <= -singleSetWidth) {
        position += singleSetWidth;
      } else if (position >= 0) {
        position -= singleSetWidth;
      }

      track.style.transform = 'translate3d(' + position + 'px, 0, 0)';
    }
    requestAnimationFrame(animate);
  }

  window.addEventListener('load', function() {
    measureSet();
    position = -1;
    animate();
  });

  window.addEventListener('resize', function() {
    measureSet();
  });
})();
