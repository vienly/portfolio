// Configure a view object, to hold all our functions for dynamic updates and article-related event handlers.
var portfolioView = {};

portfolioView.populateFilters = function() {
  $('article').each(function() {
    if (!$(this).hasClass('template')) {

      var val = $(this).find('.section-date').data('date');
      val = new Date(val);
      val = val.getFullYear();
      var optionTag = '<option value="' + val + '">' + val + '</option>';
      if ($('#date-filter option[value="' + val + '"]').length === 0) {
        $('#date-filter').append(optionTag);
      }

      val = $(this).attr('data-category');
      optionTag = '<option value="' + val + '">' + val + '</option>';
      if ($('#category-filter option[value="' + val + '"]').length === 0) {
        $('#category-filter').append(optionTag);
      }
    }
  });
};

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
    // Reset the category-filter:
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
      // TODO: Otherwise, we should:
      //       1. Show all the articles,
      //       2. Except the one article we are using as a template.
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

  // Let's now trigger a click on the first .tab element, to set up the page:
  $('nav .tab:first').click();
};



portfolioView.setTeasers = function() {
  $('.content-block .section-body *:nth-of-type(n+2)').hide();

  $('article').on('click', '.read-on', function(e) {
    e.preventDefault();
    $self = $(this);
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
  portfolioView.populateFilters();
  portfolioView.handleDateFilter();
  portfolioView.handleCategoryFilter();
  portfolioView.handleMainNav();
  portfolioView.setTeasers();
});
