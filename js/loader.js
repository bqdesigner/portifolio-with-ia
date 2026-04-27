// Fetches [data-partial] placeholders, injects markup, then dispatches `partials-ready`.
// Header/theme/menu wiring lives in header.js, which listens for that event.
(function () {
  var placeholders = document.querySelectorAll('[data-partial]');
  if (!placeholders.length) { dispatchReady(); return; }

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

  Promise.all(promises).then(dispatchReady);

  function dispatchReady() {
    document.dispatchEvent(new CustomEvent('partials-ready'));
  }
})();
