// Style Mode — handles light/dark theme toggle with localStorage persistence
(function () {
  var STORAGE_KEY = 'theme';
  var savedTheme = localStorage.getItem(STORAGE_KEY) || 'dark';

  // Apply theme immediately to avoid flash
  document.documentElement.setAttribute('data-theme', savedTheme);

  function applyMode(mode) {
    localStorage.setItem(STORAGE_KEY, mode);
    document.documentElement.setAttribute('data-theme', mode);

    // Update all toggle buttons across the page
    var btns = document.querySelectorAll('.header-controls button[data-mode]');
    btns.forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-mode') === mode);
    });

    // Update meta theme-color
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute('content', mode === 'dark' ? '#191819' : '#FFFFFF');
    }
  }

  // Init on DOM ready
  document.addEventListener('DOMContentLoaded', function () {
    applyMode(savedTheme);

    // Attach click handlers
    var toggles = document.querySelectorAll('.header-controls');
    toggles.forEach(function (toggle) {
      toggle.addEventListener('click', function (e) {
        var btn = e.target.closest('button[data-mode]');
        if (!btn) return;
        var mode = btn.getAttribute('data-mode');
        applyMode(mode);
      });
    });
  });
})();
