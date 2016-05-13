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
    e.preventDefault();
    $('.tab').removeClass('active-page');
    $(this).addClass('active-page');
    $('.tab-content').hide();

    var tabName = $(this).data('content');

    $('.tab-content').each( function () {
      if ($(this).is('#' + tabName)) {
        $(this).fadeIn();
      }
    });
  });

  $('nav .tab:first').click();
};



portfolioView.setTeasers = function() {
  $('.section-body *:nth-of-type(n+2)').hide();

  $('article').on('click', '.read-on', function(e) {
    e.preventDefault();
    var $self = $(this);
    if ($(this).hasClass('show-less')) {
      $self.parent().find('.section-body *:nth-of-type(n+2)').slideUp();
      $self.toggleClass('show-less');
      $self.text('Read On');
    } else {
      $self.toggleClass('show-less');
      $self.parent().find('.section-body *:nth-of-type(n+2)').slideDown();
      $self.text('Show Less');
    }
  });
};

$(document).ready(function () {
  portfolioView.handleDateFilter();
  portfolioView.handleCategoryFilter();
  portfolioView.handleMainNav();
  portfolioView.setTeasers();
});
