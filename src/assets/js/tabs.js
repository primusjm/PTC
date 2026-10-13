(function () {
  var root = document.querySelector('[data-tabs]');
  if (!root) return;
  var tabs = Array.prototype.slice.call(root.querySelectorAll('[role="tab"]'));
  var panels = tabs.map(function (t) { return document.getElementById(t.getAttribute('aria-controls')); });
  if (!tabs.length) return;

  root.classList.add('tabs-js');

  function select(i, focus) {
    tabs.forEach(function (t, n) {
      var on = n === i;
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.tabIndex = on ? 0 : -1;
      panels[n].hidden = !on;
    });
    if (focus) tabs[i].focus();
  }

  // Open the tab that matches a link like /#find-us, and scroll to the tabs.
  function fromHash(scroll) {
    var id = location.hash.slice(1);
    var i = panels.findIndex(function (p) { return p && p.id === id; });
    if (i < 0) return false;
    select(i, false);
    if (scroll) root.scrollIntoView();
    return true;
  }

  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () { select(i, false); });
    t.addEventListener('keydown', function (e) {
      var next = null;
      if (e.key === 'ArrowRight') next = (i + 1) % tabs.length;
      else if (e.key === 'ArrowLeft') next = (i - 1 + tabs.length) % tabs.length;
      else if (e.key === 'Home') next = 0;
      else if (e.key === 'End') next = tabs.length - 1;
      if (next !== null) { e.preventDefault(); select(next, true); }
    });
  });

  select(0, false);
  if (fromHash(false) && location.hash) {
    // The browser already tried to jump to the (then hidden) panel; do it again.
    window.addEventListener('load', function () { root.scrollIntoView(); });
  }
  window.addEventListener('hashchange', function () { fromHash(true); });
})();
