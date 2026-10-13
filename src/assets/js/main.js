(function () {
  var boxes = document.querySelectorAll('.sign-box');
  var resultHeadline = document.querySelector('[data-check-headline]');
  var resultBody = document.querySelector('[data-check-body]');
  if (!boxes.length || !resultHeadline || !resultBody) return;

  function resultFor(count) {
    if (count === 0) {
      return {
        headline: 'Nothing ticked yet.',
        body: 'Read through the list slowly. Recognising a pattern is the first honest step, and it is the hardest one.'
      };
    }
    if (count <= 2) {
      return {
        headline: 'Even one of these is worth a conversation.',
        body: 'These signs rarely stay at one. Call us and simply describe what you have noticed — there is no obligation and nothing goes on a record.'
      };
    }
    if (count <= 5) {
      return {
        headline: 'This pattern is familiar to us.',
        body: 'What you have ticked is consistent with dependence taking hold. It is treatable, and the sooner it is assessed the shorter the road. Please call today.'
      };
    }
    return {
      headline: 'Please don’t wait any longer.',
      body: 'This many signs together point to established addiction. It is still a treatable disease and the cycle can be broken. Call us now and we will assess the case with you.'
    };
  }

  var actions = document.querySelector('[data-check-actions]');
  var waLink = document.querySelector('[data-check-wa]');
  var waLabel = document.querySelector('[data-check-wa-label]');
  var result = document.querySelector('.check-result');

  function ticked() {
    return Array.prototype.map.call(document.querySelectorAll('.sign-box.checked'), function (box) {
      var label = box.querySelector('.sign-label');
      var hint = box.querySelector('.sign-hint');
      return (label ? label.textContent.trim() : '') + (hint ? ' (' + hint.textContent.trim() + ')' : '');
    });
  }
  function listText() {
    var items = ticked();
    if (!items.length) return '';
    return 'Things I have noticed:\n- ' + items.join('\n- ');
  }

  function update() {
    var count = document.querySelectorAll('.sign-box.checked').length;
    var r = resultFor(count);
    resultHeadline.textContent = r.headline;
    resultBody.textContent = r.body;
    if (result) result.classList.toggle('urgent', count >= 3);
    if (actions && waLink) {
      var intro = actions.getAttribute('data-wa-intro') || '';
      var list = listText();
      waLink.href = actions.getAttribute('data-wa-base') + '?text=' + encodeURIComponent(list ? intro + '\n\n' + list : intro);
      if (waLabel) waLabel.textContent = list ? 'Send my list on WhatsApp' : 'WhatsApp us';
    }
  }

  boxes.forEach(function (box) {
    box.setAttribute('role', 'checkbox');
    box.setAttribute('aria-checked', 'false');
    box.setAttribute('tabindex', '0');

    function toggle() {
      box.classList.toggle('checked');
      box.setAttribute('aria-checked', box.classList.contains('checked') ? 'true' : 'false');
      update();
    }

    box.addEventListener('click', toggle);
    box.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle();
      }
    });
  });

  update();
})();
