(function(module) {
  function Article (opts) {
    for (keys in opts) {
      this[keys] = opts[keys];
    }
  }

  Article.all = [];

  Article.prototype.toHtml = function(scriptTemplateId) {
    var template = Handlebars.compile((scriptTemplateId).html());

    this.daysAgo = parseInt((new Date() - new Date(this.pubDate)) / 60 / 60 / 24 / 1000);
    this.publishStatus = this.pubDate ? 'published about ' + this.daysAgo + ' days ago' : '(draft)';

    return template(this);
  };

  Article.loadAll = function(inputData) {
    inputData.sort(function(a, b) {
      return (new Date(b.pubDate)) - (new Date(a.pubDate));
    });

    Article.all = inputData.map(function(item) {
      return new Article(item);
    });
  };

  Article.getAll = function(next) {
    $.getJSON('/data/portfolioData.json', function(responseData) {
      Article.loadAll(responseData);
      localStorage.portfolioData = JSON.stringify(responseData);
      next();
    });
  };

  Article.fetchAll = function(next) {
    if (localStorage.portfolioData) {
      $.ajax({
        type: 'HEAD',
        url: '/data/portfolioData.json',
        success: function(data, message, xhr) {
          var eTag = xhr.getResponseHeader('eTag');
          if (!localStorage.eTag || eTag !== localStorage.eTag) {
            localStorage.eTag = eTag;
            Article.getAll(next);
          } else {
            Article.loadAll(JSON.parse(localStorage.portfolioData));
            next();
          }
        }
      });
    } else {
      Article.getAll(next);
    }
  };

  Article.checkLatestProject = function() {
    return Article.all.map(function(article) {
      return {
        articleName: article.ttl,
        articleDate: article.pubDate,
      };
    })
    .reduce(function(a, b) {
      if (a) {
        if (Date.parse(b.articleDate) > Date.parse(a.articleDate)) {
          return b;
        }
        else return a;
      }
    });
  };
  
  module.Article = Article;
}(window));
