$(document).ready(function () {
  $('.copy-btn').click(function () {
    let buttontimer;

    $(this).addClass('copied');
    $(this).text('Copied!');

    clearTimeout(buttontimer);

    buttontimer = setTimeout(() => {
      $('.copy-btn').removeClass('copied');
      $('.copy-btn').text('Copy');
    }, 1000);

    const element = $(this).parents('li').find('.short-url');
    const $temp = $('<input>');

    $('body').append($temp);
    $temp.val($(element).html()).select();
    document.execCommand('copy');
    $temp.remove();
  });

  $('#loginForm').submit(function (e) {
    e.preventDefault();

    fetch('/api/login', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: $('#email').val(),
        password: $('#password').val(),
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          $(this)
            .children('.btn-primary')
            .after(
              `<div class="alert alert-danger w-100 mt-3"><p>${res.error}</p></div>`
            );
        }
      });
  });
});
