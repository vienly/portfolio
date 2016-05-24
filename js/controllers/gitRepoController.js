(function(module) {
  var gitRepoController = {};

  gitRepoController.index = function() {
    $('#git-repo').fadeIn().siblings().fadeOut();
    gitRepos.requestRepos(gitRepoView.index);
  };

  module.gitRepoController = gitRepoController;
})(window);
