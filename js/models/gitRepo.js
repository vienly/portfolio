(function(module) {
  var gitRepos = {};

  gitRepos.all = [];

  gitRepos.requestRepos = function(callback) {
    $.ajax({
      url: 'https://api.github.com/users/' + vienGitToken.user + '/repos' + '?per_page=10' + '&sort=updated' + '&since=2016-05-09T00:00:01Z',
      type: 'GET',
      headers: {'Authorization':'token ' + vienGitToken.token},
      success: function(data, message, xhr) {
        console.log(data);
        gitRepos.all = data;
        callback();
      }
    });
  };

  gitRepos.with = function(attr) {
    return gitRepos.all.filter(function(repo) {
      return repo[attr];
    });
  };

  module.gitRepos = gitRepos;
})(window);
