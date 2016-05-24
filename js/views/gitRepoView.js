(function(module) {
  var gitRepoView = {};

  var ui = function() {
    var $gitRepo = $('#git-repo');
    $gitRepo.find('ul').empty();
    $gitRepo.show().siblings().hide();
  };

  var render = Handlebars.compile($('#repo-template').text());

  gitRepoView.index = function() {
    ui();
    $('#git-repo ul').append(
      gitRepos.with('name').map(render)
    );
  };

  module.gitRepoView = gitRepoView;
})(window);
