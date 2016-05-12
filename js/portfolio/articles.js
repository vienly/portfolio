var articles = [];

function Article (opts) {
  // TODO: Use the js object passed in to complete this contructor function:
  // Save ALL the properties of `opts` into `this`.
  this.ttl = opts.ttl;
  this.category = opts.category;
  this.author = opts.author;
  this.authorUrl = opts.authorUrl;
  this.img = opts.img;
  this.pubDate = opts.pubDate;
  this.bdy = opts.bdy;
}

Article.prototype.toHtml = function() {
  var $newArticle = $('article.template').clone();
  var dateline = this.pubDate + ' (about ' + parseInt((new Date() - new Date(this.pubDate))/60/60/24/1000) + ' days ago)';

  $newArticle.attr('data-category', this.category);
  $newArticle.attr('data-date', this.pubDate);


  $newArticle.find('.section-image').attr('src', this.img);
  $newArticle.find('.section-title').text(this.ttl);
  $newArticle.find('.section-date').data('date', this.pubDate);
  $newArticle.find('.section-date').text(dateline);

  $newArticle.find('.section-body').html(this.bdy);

  $newArticle.removeClass('template');

  return $newArticle;
};

myPortfolioData.sort(function(a,b) {
  return (new Date(b.pubDate)) - (new Date(a.pubDate));
});

myPortfolioData.forEach(function(ele) {
  articles.push(new Article(ele));
});

articles.forEach(function(a){
  $('#articles').append(a.toHtml());
});
