(function(module) {
  var gitRepos = {};

  gitRepos.all = [];

  gitRepos.requestRepos = function(callback) {
    $.get('/github/users/vienly/repos' +
        '?per_page=15' +
        '&sort=updated')
        .done(function(data) {
          gitRepos.all = data;
        }).done(callback);
  };

  gitRepos.with = function(attr) {
    return gitRepos.all.filter(function(repo) {
      return repo[attr];
    });
  };

  module.gitRepos = gitRepos;
})(window);
