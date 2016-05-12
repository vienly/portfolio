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
      // TODO: If the select box was changed to an option that has a value, we need to:
      //       1. Hide all the articles,
      //       2. Fade in only the articles that match based on the author that was selected.
      //          Use an "attribute selector" to find those articles that match the value,
      //          and fade them in for the reader.
      $('article').hide();
      var filterValue = parseInt($(this).val());
      console.log(filterValue);
      // filterValue = new Date(filterValue);
      // filterValue = filterValue.getFullYear();
      $('article').each(function() {
        var currentArticle = $(this);
        var currentArticleYear = parseInt(new Date(currentArticle.attr('data-date')).getFullYear());

        if(currentArticleYear === filterValue) {
          currentArticle.fadeIn();
        }
      });
    } else {
      // TODO: Otherwise, we should:
      //       1. Show all the articles,
      //       2. Except the one article we are using as a template.
      $('article').not('.template').fadeIn();
    }
    // Reset the category-filter:
    $('#category-filter').val('');
  });
};

portfolioView.handleCategoryFilter = function() {
  // TODO: Just like we do for #date-filter above, we should handle change
  //       events on the #category-filter element. When an option with a value
  //       is selected, hide all the articles, then reveal the matches.
  //       When the blank (default) option is selected, show all the articles,
  //       except for the template. Be sure to reset the #date-filter while you are at it!
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
  // TODO: Add a delegated event handler to .main-nav element below that will
  //        power the Tabs feature.
  //       Clicking any .tab element should:
  //        1. hide all the .tab-content sections.
  //        2. fade in the single .tab-content section that is associated with
  //            the clicked .tab element.
  //         You may need to dynamically build a selector string (concatenation???)
  //          with the correct ID, based on the data available to you on the .tab
  //          element that was clicked.

  $('nav').on('click', '.tab', function(e) {
    e.preventDefault();
    $('.tab').removeClass('active-page');
    $(this).addClass('active-page');
    $('.tab-content').hide();

    var tabName = $(this).data('content');
    // console.log(tabName);

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
  // Hide any elements after the first 2 (<p> tags in this case)
  // in any artcile body:
  // var showChar = 200;
  // var showPart = $('.content-block .section-body').text().substr(0, showChar);
  //
  // console.log(showPart);
  $('.content-block .section-body *:nth-of-type(n+2)').hide();

  // TODO: Add a delegated event handler to reveal the remaining paragraph.
  //       When a .read-on link is clicked, we can:
  //        1. Prevent the default action of a link (to navigate away from the page).
  //        2. Reveal everything in that particular article now.
  //        3. Hide that read-on link!
  //       Ideally, we should attach this as just 1 event handler
  //       on the #articles section, and let it process any .read-on clicks that
  //       happen.

  $('article').on('click', '.read-on', function(e) {
    e.preventDefault();
    console.log($(this));
    if ($(this).hasClass('show-less')) {
      $(this).parent().find('.section-body *:nth-of-type(n+2)').slideUp();
      $(this).toggleClass('show-less');
      $(this).text('Read On');
    } else {
      $(this).toggleClass('show-less');
      $(this).parent().find('.section-body *:nth-of-type(n+2)').slideDown();
      $(this).text('Show Less');
    }
  });

};

// TODO: Call all of the above functions, once we are sure the DOM is ready.
$(document).ready(function () {
  portfolioView.populateFilters();
  portfolioView.handleDateFilter();
  portfolioView.handleCategoryFilter();
  portfolioView.handleMainNav();
  portfolioView.setTeasers();
});
