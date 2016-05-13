var articles = [];

function Article (opts) {
  this.ttl = opts.ttl;
  this.category = opts.category;
  this.author = opts.author;
  this.authorUrl = opts.authorUrl;
  this.img = opts.img;
  this.pubDate = opts.pubDate;
  this.bdy = opts.bdy;
  this.year = opts.year;
}

Article.prototype.toHtml = function() {

  // this.year = new Date(this.pubDate).getFullYear();
  // console.log(this.year);
  this.daysAgo = parseInt((new Date() - new Date(this.pubDate))/60/60/24/1000);
  this.publishStatus = this.pubDate ? 'published about ' + this.daysAgo + ' days ago' : '(draft)';
  var $source = $('#article-template').html();
  var template = Handlebars.compile($source);
  return template(this);
};

Article.prototype.populateDateFilter = function(){
  var $source = $('#date-filter-template').html();
  var template = Handlebars.compile($source);
  return template(this);
};

Article.prototype.populateCategoryFilter = function(){
  var $source = $('#category-filter-template').html();
  var template = Handlebars.compile($source);
  return template(this);
};

myPortfolioData.sort(function(a,b) {
  return (new Date(b.pubDate)) - (new Date(a.pubDate));
});

myPortfolioData.forEach(function(ele) {
  articles.push(new Article(ele));
});

articles.forEach(function(a){
  $('#articles').append(a.toHtml());
  $('#date-filter').append(a.populateDateFilter());
  $('#category-filter').append(a.populateCategoryFilter());

  $('.filter option').each(function(){
    $(this).siblings('[value="' + this.value + '"]').remove();
  });

});
