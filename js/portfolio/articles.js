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
  inputData.forEach(function(ele) {
    Article.all.push(new Article(ele));
  });
};

Article.fetchAll = function() {
  if (localStorage.eTagValue) {
    var newETag;

    console.log('localStorage etag value is ' + JSON.parse(localStorage.eTagValue));

    $.ajax({
      url: 'data/portfolioData.json',
      type: 'HEAD',
      success: function(data, message, xhr) {
        newETag = xhr.getResponseHeader('eTag');
        console.log('new eTag is ' + newETag);
        console.log('stored etag is ' + JSON.parse(localStorage.eTagValue));

        if (newETag === JSON.parse(localStorage.eTagValue)) {
          console.log('no change');
          Article.loadAll(JSON.parse(localStorage.portfolioData));
          portfolioView.initIndexPage();

        } else {
          $.ajax({
            url: 'data/portfolioData.json',
            dataType: 'JSON',
            success: function(data, message, xhr) {
              Article.loadAll(data);
              localStorage.eTagValue = JSON.stringify(newETag);
              localStorage.portfolioData = JSON.stringify(data);
              console.log('loading new data');
              portfolioView.initIndexPage();
            }
          });

          // different syntax for experimenting
          // $.getJSON('data/portfolioData.json', function(jsondata) {
          //   Article.loadAll(jsondata);
          //   localStorage.eTagValue = JSON.stringify(newETag);
          //   localStorage.portfolioData = JSON.stringify(jsondata);
          //   console.log('loading new data');
          //   portfolioView.initIndexPage();
          // });
        }
      }
    });
  } else {
    $.ajax({
      url: 'data/portfolioData.json',
      dataType: 'JSON',
      success: function(data, message, xhr) {
        var eTag = xhr.getResponseHeader('eTag');
        localStorage.eTagValue = JSON.stringify(eTag);
        console.log('saved new eTag');

        Article.loadAll(data);
        console.log('loaded data');
        localStorage.portfolioData = JSON.stringify(data);
        portfolioView.initIndexPage();
        console.log('Loaded and displayed new Data');
      }
    });
  }
};
