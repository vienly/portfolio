$(document).ready(function() {
  var $menu = $('#menu'), $menulink = $('.menu-link'), $wrapper = $('#wrapper');
  $menulink.find('button').text('>>');

  $menulink.on('click', function() {
    $menulink.toggleClass('active');
    $wrapper.toggleClass('active');

    if ($menulink.hasClass('active')) {
      $menulink.find('button').text('<<');
    }
    else
      $menulink.find('button').text('>>');

    return false;
  });
});
