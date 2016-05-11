$(document).ready(function() {
  var $menu = $('#menu'), $menulink = $('.menu-link'), $wrapper = $('#wrapper');

  $menulink.on('click', function() {
    console.log('active');
    $menulink.toggleClass('active');
    $wrapper.toggleClass('active');
    return false;
  });
});
