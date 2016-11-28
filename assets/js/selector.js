jQuery(function($) {
  var current_selector = algolia.woocommerce.selector;

  if(current_selector.length > 0) {
    activate($(current_selector));
  } else if(current_selector.length === 0){
    // Only guess if no selector is set.
    // We can't presume what manual selector the user might enter.
    var guess = $('.woocommerce-breadcrumb').parent();
    if(guess.length > 0) {
      activate(guess);
    }
  }
  
  $(document).on('mouseover', 'div, main', function(e) {
    var target = $(e.target);
    clearSelectors();
    clearSelectorPaths();
    target.addClass('algolia-selector');
  })

  function clearSelectors() {
    $('.algolia-selector').removeClass('algolia-selector');
  }

  function clearSelectorPaths() {
    $('.algolia-selector-path').remove();
  }

  function clearActiveSelectors() {
    $('.algolia-active-selector').removeClass('algolia-active-selector');
  }
  
  $(document).on('click', '.algolia-selector', function(e) {
    e.preventDefault();
    activate($(e.target));
  })

  function activate(target) {
    clearActiveSelectors();
    target.addClass('algolia-active-selector');

    window.top.jQuery('#algolia-selector').val(computeSelectorPath(target));
  }

  function computeSelectorPath(target) {
    var path = '';

    var selectorId = target.attr('id');
    if(selectorId) {
      path += '#' + selectorId;
    } else {
      var selectorclass = target.attr('class');
      if(selectorclass) {
        path += formatClasses(selectorclass);
      }
    }


    var parent = target.parent();

    if(parent) {
      var selectorId = parent.attr('id');

      if(selectorId) {
        path = '#' + selectorId + ' ' + path;
      } else {
        var selectorclass = parent.attr('class');
        if(selectorclass) {
          path = formatClasses(selectorclass) + ' ' + path;
        }
      }
    }

    return path;
  }

  function formatClasses(classes) {
    var pieces = classes.split(' ');
    
    var index = pieces.indexOf('algolia-selector');
    if(index !== -1) {
      pieces.splice(index, 1);
    }
    index = pieces.indexOf('algolia-active-selector');
    if(index !== -1) {
      pieces.splice(index, 1);
    }

    if(pieces.length === 0) {
      return '';
    }

    return '.' + pieces.join('.');
  }

});