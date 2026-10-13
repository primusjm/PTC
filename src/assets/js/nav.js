(function () {
  var btn = document.getElementById('menu-btn');
  var panel = document.getElementById('mobile-panel');
  if (!btn || !panel) return;

  function set(open) {
    panel.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.setAttribute('aria-label', open ? 'Close menu' : 'Menu');
  }
  btn.addEventListener('click', function () { set(btn.getAttribute('aria-expanded') !== 'true'); });
  panel.addEventListener('click', function (e) { if (e.target.closest('a')) set(false); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') { set(false); btn.focus(); }
  });
  window.matchMedia('(min-width: 761px)').addEventListener('change', function (e) { if (e.matches) set(false); });
})();
