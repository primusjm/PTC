(function () {
  var KEY = "site-a11y";
  var LEVELS = ["100%", "112%", "125%", "150%"];
  var TOGGLES = ["contrast", "underline", "spacing", "bold", "font", "still"];
  var BOLD_FONT = "https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,700;1,6..72,700&display=swap";
  var root = document.documentElement;
  var panel = document.getElementById("a11y-panel");
  var lastTrigger = null;
  var state = { text: 0 };
  TOGGLES.forEach(function (k) { state[k] = false; });

  try {
    var saved = JSON.parse(localStorage.getItem(KEY) || "{}");
    state.text = Math.max(0, Math.min(3, parseInt(saved.text, 10) || 0));
    TOGGLES.forEach(function (k) { state[k] = !!saved[k]; });
  } catch (e) {}

  function save() {
    try {
      var out = {};
      if (state.text) out.text = state.text;
      TOGGLES.forEach(function (k) { if (state[k]) out[k] = true; });
      if (Object.keys(out).length) localStorage.setItem(KEY, JSON.stringify(out));
      else localStorage.removeItem(KEY);
    } catch (e) {}
  }

  function loadBoldFont() {
    if (document.getElementById("a11y-bold-font")) return;
    var link = document.createElement("link");
    link.id = "a11y-bold-font";
    link.rel = "stylesheet";
    link.href = BOLD_FONT;
    document.head.appendChild(link);
  }

  function apply() {
    if (state.text) root.setAttribute("data-text", state.text);
    else root.removeAttribute("data-text");
    TOGGLES.forEach(function (k) { root.classList.toggle("a11y-" + k, state[k]); });
    if (state.bold) loadBoldFont();

    var status = document.querySelector("[data-a11y-status]");
    if (status) status.textContent = "Text size " + LEVELS[state.text];
    TOGGLES.forEach(function (k) {
      var btn = document.querySelector('[data-a11y-toggle="' + k + '"]');
      if (btn) btn.setAttribute("aria-pressed", state[k] ? "true" : "false");
    });
    var down = document.querySelector('[data-a11y-size="down"]');
    var up = document.querySelector('[data-a11y-size="up"]');
    if (down) down.disabled = state.text === 0;
    if (up) up.disabled = state.text === LEVELS.length - 1;
  }

  function setExpanded(open) {
    document.querySelectorAll("[data-a11y-open]").forEach(function (b) {
      b.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  function openPanel(trigger) {
    if (!panel || panel.open) return;
    lastTrigger = trigger || null;
    panel.show();
    setExpanded(true);
    var close = panel.querySelector(".a11y-close");
    if (close) close.focus();
  }

  function closePanel() {
    if (!panel || !panel.open) return;
    panel.close();
    setExpanded(false);
    if (lastTrigger) lastTrigger.focus();
  }

  document.addEventListener("click", function (e) {
    var t = e.target.closest ? e.target.closest("button") : null;
    if (!t) return;
    if (t.hasAttribute("data-a11y-open")) {
      if (panel && panel.open) closePanel(); else openPanel(t);
    } else if (t.hasAttribute("data-a11y-close")) {
      closePanel();
    } else if (t.hasAttribute("data-a11y-reset")) {
      state.text = 0;
      TOGGLES.forEach(function (k) { state[k] = false; });
      save(); apply();
    } else if (t.hasAttribute("data-a11y-size")) {
      var dir = t.getAttribute("data-a11y-size");
      if (dir === "down") state.text = Math.max(0, state.text - 1);
      else if (dir === "up") state.text = Math.min(LEVELS.length - 1, state.text + 1);
      else state.text = 0;
      save(); apply();
    } else if (t.hasAttribute("data-a11y-toggle")) {
      var key = t.getAttribute("data-a11y-toggle");
      state[key] = !state[key];
      save(); apply();
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && panel && panel.open) {
      e.preventDefault();
      closePanel();
    }
  });

  apply();
})();
