(function(module) {
  var aboutController = {};

  aboutController.index = function() {
    $('#about').fadeIn().siblings().fadeOut();
  };

  module.aboutController = aboutController;
})(window);
