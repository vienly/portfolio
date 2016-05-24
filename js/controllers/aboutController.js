(function(module) {
  var aboutController = {};

  aboutController.index = function() {
    $('#articles').fadeOut();
    $('#about').fadeIn();
  };

  module.aboutController = aboutController;
})(window);
//
