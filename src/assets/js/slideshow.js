(function () {
  var root = document.querySelector('[data-slideshow]');
  if (!root) return;
  var slides = root.querySelectorAll('.slide');
  var dots = root.querySelectorAll('.slide-dot');
  if (slides.length < 2) return;

  var track = root.querySelector('.slides');
  var pauseBtn = root.querySelector('.slide-pause');
  var current = 0, timer = null, userPaused = false, hovering = false;
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
    if (userPaused || hovering || motionOff() || document.hidden) return;
    timer = setInterval(function () { show(current + 1); }, 5000);
  }
  function setPaused(p) {
    userPaused = p;
    pauseBtn.textContent = p ? 'Play' : 'Pause';
    pauseBtn.setAttribute('aria-label', p ? 'Play slideshow' : 'Pause slideshow');
    // Announce slide changes only when the person is driving.
    track.setAttribute('aria-live', p ? 'polite' : 'off');
    start();
  }
  function manual(i) { show(i); if (!userPaused) setPaused(true); }

  root.querySelector('.slide-prev').addEventListener('click', function () { manual(current - 1); });
  root.querySelector('.slide-next').addEventListener('click', function () { manual(current + 1); });
  dots.forEach(function (d, n) { d.addEventListener('click', function () { manual(n); }); });
  pauseBtn.addEventListener('click', function () { setPaused(!userPaused); });

  // Swipe left / right on touch screens.
  var startX = null, startY = null;
  root.addEventListener('touchstart', function (e) {
    startX = e.touches[0].clientX; startY = e.touches[0].clientY;
  }, { passive: true });
  root.addEventListener('touchend', function (e) {
    if (startX === null) return;
    var dx = e.changedTouches[0].clientX - startX;
    var dy = e.changedTouches[0].clientY - startY;
    startX = null;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.5) manual(dx < 0 ? current + 1 : current - 1);
  }, { passive: true });

  root.addEventListener('mouseenter', function () { hovering = true; start(); });
  root.addEventListener('mouseleave', function () { hovering = false; start(); });
  root.addEventListener('focusin', stop);
  root.addEventListener('focusout', start);
  document.addEventListener('visibilitychange', start);
  new MutationObserver(start).observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  show(0);
  start();
})();
