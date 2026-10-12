(function () {
  var root = document.querySelector('[data-slideshow]');
  if (!root) return;
  var slides = root.querySelectorAll('.slide');
  var dots = root.querySelectorAll('.slide-dot');
  if (slides.length < 2) return;

  var current = 0, timer = null, interacted = false;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

  function show(i) {
    current = (i + slides.length) % slides.length;
    slides.forEach(function (s, n) { s.classList.toggle('active', n === current); });
    dots.forEach(function (d, n) {
      d.classList.toggle('active', n === current);
      if (n === current) d.setAttribute('aria-current', 'true'); else d.removeAttribute('aria-current');
    });
  }
  function motionOff() {
    return reduce.matches || document.documentElement.classList.contains('a11y-still');
  }
  function stop() { if (timer) { clearInterval(timer); timer = null; } }
  function start() {
    stop();
    if (interacted || motionOff() || document.hidden) return;
    timer = setInterval(function () { show(current + 1); }, 5000);
  }
  function manual(i) { interacted = true; stop(); show(i); }

  root.querySelector('.slide-prev').addEventListener('click', function () { manual(current - 1); });
  root.querySelector('.slide-next').addEventListener('click', function () { manual(current + 1); });
  dots.forEach(function (d, n) { d.addEventListener('click', function () { manual(n); }); });
  root.addEventListener('mouseenter', stop);
  root.addEventListener('mouseleave', start);
  root.addEventListener('focusin', stop);
  root.addEventListener('focusout', start);
  document.addEventListener('visibilitychange', start);
  new MutationObserver(start).observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  show(0);
  start();
})();
