(function(module) {
  // Configure a view object, to hold all our functions for dynamic updates and article-related event handlers.
  var portfolioView = {};

  portfolioView.handleDateFilter = function() {
    $('#date-filter').on('change', function() {
      if ($(this).val()) {
        $('article').hide();
        var filterValue = parseInt($(this).val());
        console.log(filterValue);
        $('article').each(function() {
          var currentArticle = $(this);
          var currentArticleYear = parseInt(new Date(currentArticle.attr('data-date')).getFullYear());

          if(currentArticleYear === filterValue) {
            currentArticle.fadeIn();
          }
        });
      } else {
        $('article').not('.template').fadeIn();
      }
      $('#category-filter').val('');
    });
  };

  portfolioView.handleCategoryFilter = function() {
    $('#category-filter').on('change', function() {
      if($(this).val()) {
        $('article').hide();
        var filterValue = $(this).val();
        $('article').each(function() {
          var currentArticle = $(this);
          if(filterValue === currentArticle.attr('data-category')) {
            currentArticle.fadeIn();
          }
        });
      } else {
        $('article').not('.template').fadeIn();
      }
      $('#date-filter').val('');
    });
  };

  portfolioView.handleMainNav = function() {
    $('nav').on('click', '.tab', function(e) {
      $('.tab').removeClass('active-page');
      $(this).addClass('active-page');
    });
  };

  portfolioView.setTeasers = function() {
    $('.section-body *:nth-of-type(n+2)').hide();

    $('article').on('click', '.read-on', function(e) {
      e.preventDefault();
      var $self = $(this);
      if ($(this).hasClass('show-less')) {
        $self.toggleClass('show-less');
        $self.parent().find('.section-body *:nth-of-type(n+2)').slideUp();
        $self.text('Read On');
      } else {
        $self.toggleClass('show-less');
        $self.parent().find('.section-body *:nth-of-type(n+2)').slideDown();
        $self.text('Show Less');
      }
    });
  };

  portfolioView.initIndexPage = function() {
    Article.all.forEach(function(a){
      $('#article-container').append(a.toHtml($('#article-template')));
      $('#date-filter').append(a.toHtml($('#date-filter-template')));
      $('#category-filter').append(a.toHtml($('#category-filter-template')));

      $('.filter option').each(function(){
        $(this).siblings('[value="' + this.value + '"]').remove();
      });
    });

    var template = Handlebars.compile($('#latest-project-template').html());
    $('.latest-project').append(template(Article.checkLatestProject()));


    portfolioView.handleDateFilter();
    portfolioView.handleCategoryFilter();
    portfolioView.handleMainNav();
    portfolioView.setTeasers();
    $('nav .tab:first').click();
  };
  module.portfolioView = portfolioView;
}(window));
