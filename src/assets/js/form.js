(function () {
  var form = document.getElementById('callback-form');
  if (!form || !window.fetch) return;
  var error = form.querySelector('.form-error');
  var button = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    error.hidden = true;
    button.disabled = true;
    fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    }).then(function (res) {
      if (!res.ok) throw new Error('bad response');
      window.location.href = form.getAttribute('data-next') || '/thanks/';
    }).catch(function () {
      error.hidden = false;
      button.disabled = false;
    });
  });
})();
