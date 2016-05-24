(function(module) {
  var aboutController = {};

  aboutController.index = function() {
    // $('#articles').fadeOut();
    $('#about').fadeIn().siblings().fadeOut();
  };

  module.aboutController = aboutController;
})(window);
