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
});
