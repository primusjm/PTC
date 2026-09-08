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

  function update() {
    var count = document.querySelectorAll('.sign-box.checked').length;
    var r = resultFor(count);
    resultHeadline.textContent = r.headline;
    resultBody.textContent = r.body;
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
