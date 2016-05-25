(function(module) {
  var articleController = {};

  articleController.index = function() {
    if ($('#article-container section').length === 0) {
      Article.fetchAll(portfolioView.initIndexPage);
    }
    $('#articles').fadeIn().siblings().fadeOut();
  };

  module.articleController = articleController;
})(window);
//
