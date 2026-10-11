(function () {
  var KEY = "ptc-a11y";
  var LEVELS = [1, 1.1, 1.25, 1.5];
  var FONT_HREF = "https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:wght@400;700&display=swap";
  var root = document.documentElement;
  var state = { size: 0, hc: false, readable: false, links: false };

  try {
    var saved = JSON.parse(localStorage.getItem(KEY));
    if (saved && typeof saved === "object") {
      state.size = Math.max(0, Math.min(LEVELS.length - 1, parseInt(saved.size, 10) || 0));
      state.hc = !!saved.hc;
      state.readable = !!saved.readable;
      state.links = !!saved.links;
    }
  } catch (e) {}

  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {}
  }

  function loadFont() {
    if (document.getElementById("a11y-font")) return;
    var link = document.createElement("link");
    link.id = "a11y-font";
    link.rel = "stylesheet";
    link.href = FONT_HREF;
    document.head.appendChild(link);
  }

  function updateUi() {
    var sizeLabel = document.querySelector("[data-a11y-size]");
    if (sizeLabel) sizeLabel.textContent = Math.round(LEVELS[state.size] * 100) + "%";
    var down = document.querySelector('[data-a11y="size-down"]');
    var up = document.querySelector('[data-a11y="size-up"]');
    if (down) down.disabled = state.size === 0;
    if (up) up.disabled = state.size === LEVELS.length - 1;
    ["hc", "readable", "links"].forEach(function (key) {
      var btn = document.querySelector('[data-a11y="' + key + '"]');
      if (btn) btn.setAttribute("aria-pressed", state[key] ? "true" : "false");
    });
  }

  function apply() {
    root.style.zoom = state.size ? LEVELS[state.size] : "";
    root.classList.toggle("a11y-hc", state.hc);
    root.classList.toggle("a11y-readable", state.readable);
    root.classList.toggle("a11y-links", state.links);
    if (state.readable) loadFont();
    updateUi();
  }

  apply();

  document.addEventListener("DOMContentLoaded", function () {
    updateUi();
    document.addEventListener("click", function (e) {
      var btn = e.target.closest && e.target.closest("[data-a11y]");
      if (!btn) return;
      var action = btn.getAttribute("data-a11y");
      if (action === "size-down") state.size = Math.max(0, state.size - 1);
      else if (action === "size-up") state.size = Math.min(LEVELS.length - 1, state.size + 1);
      else if (action === "reset") state = { size: 0, hc: false, readable: false, links: false };
      else if (action in state) state[action] = !state[action];
      save();
      apply();
    });
  });
})();
