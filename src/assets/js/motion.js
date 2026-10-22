(function () {
  var root = document.documentElement;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  function still() { return reduce.matches || root.classList.contains('a11y-still'); }

  // Soft shadow under the pinned header once the page has scrolled.
  var header = document.querySelector('.site-header');
  function shadow() { if (header) header.classList.toggle('scrolled', window.scrollY > 8); }
  window.addEventListener('scroll', shadow, { passive: true });
  shadow();

  // Page exit: fade the veil in, then follow the link.
  document.addEventListener('click', function (e) {
    if (still() || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var a = e.target.closest ? e.target.closest('a[href]') : null;
    if (!a || (a.target && a.target !== '_self') || a.hasAttribute('download')) return;
    var u;
    try { u = new URL(a.href, location.href); } catch (err) { return; }
    if (u.origin !== location.origin) return;
    if (u.pathname === location.pathname && u.search === location.search) return; // same page (hash links)
    e.preventDefault();
    root.classList.add('leaving');
    setTimeout(function () { location.href = u.href; }, 260);
  });
  // Coming back with the browser's back button: don't stay covered.
  window.addEventListener('pageshow', function (e) { if (e.persisted) root.classList.remove('leaving'); });

  // Gentle fade-up as sections scroll into view.
  if (still() || !('IntersectionObserver' in window)) return;
  var SEL = 'main .section > *, main .section-tight > *, main .grid-trust > .trust-item';
  var els = Array.prototype.slice.call(document.querySelectorAll(SEL));
  if (!els.length) return;
  root.classList.add('js-motion');

  var count = new Map();
  els.forEach(function (el) {
    var n = count.get(el.parentNode) || 0;
    count.set(el.parentNode, n + 1);
    el.style.setProperty('--i', Math.min(n, 5));
    el.classList.add('reveal');
  });

  function show(el) {
    el.classList.add('in');
    // Afterwards drop the helper classes so hover effects work normally.
    setTimeout(function () { el.classList.remove('reveal', 'in'); el.style.removeProperty('--i'); }, 1200);
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { show(en.target); io.unobserve(en.target); }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -5% 0px' });
  els.forEach(function (el) { io.observe(el); });
})();
