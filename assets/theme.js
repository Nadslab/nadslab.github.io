/* ============================================================
   Theme toggle. Dark green is the default on every page;
   the choice is remembered per visitor in localStorage.
   ============================================================ */
(function () {
  var root = document.documentElement;

  function read() {
    try { return localStorage.getItem('theme'); } catch (e) { return null; }
  }
  function write(v) {
    try { localStorage.setItem('theme', v); } catch (e) {}
  }
  function apply(theme) {
    var light = theme === 'light';
    root.setAttribute('data-theme', light ? 'light' : 'dark');
    var label = document.getElementById('themeLabel');
    var btn = document.getElementById('themeToggle');
    if (label) { label.textContent = light ? 'Light' : 'Dark'; }
    if (btn) { btn.setAttribute('aria-pressed', light ? 'true' : 'false'); }
  }

  // Apply before paint so there is no flash of the wrong theme.
  apply(read() === 'light' ? 'light' : 'dark');

  document.addEventListener('DOMContentLoaded', function () {
    apply(read() === 'light' ? 'light' : 'dark');
    var btn = document.getElementById('themeToggle');
    if (!btn) { return; }
    btn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      apply(next);
      write(next);
    });
  });
})();
