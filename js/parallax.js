window.onscroll = function(){
    var items = [].slice.call(document.querySelectorAll('[data-parallax]'));

    items.forEach(function(element){
        var translateY = "translateY("+(window.pageYOffset/parseInt(element.getAttribute('data-parallax')))+"px)";
        element.style["-webkit-transform"] = translateY;
        element.style["-moz-transform"] = translateY;
        element.style["-ms-transform"] = translateY;
        element.style["-o-transform"] = translateY;
        element.style["transform"] = translateY;
    });
}

$('.slider').each(function() {
  var $this   = $(this);
  var $elements  = $this.find('.slide_elements');
  var $slides = $this.find('.slide');
  var buttonA  = [];
  var count = 0;
  var timeout;

  function move(newIndex) {
    var animateLeft, slideLeft;

    advance();


    if ($elements.is(':animated') || count === newIndex) {
      return;
    }

    buttonA[count].removeClass('active');
    buttonA[newIndex].addClass('active');

    if (newIndex > count) {
      slideLeft = '100%';
      animateLeft = '-100%';
    } else {
      slideLeft = '-100%';
      animateLeft = '100%';
    }

    $slides.eq(newIndex).css( {left: slideLeft, display: 'block'} );

    $elements.animate( {left: animateLeft}, function() {
      $slides.eq(count).css( {display: 'none'} );
      $slides.eq(newIndex).css( {left: 0} );
      $elements.css( {left: 0} );
      count = newIndex;
    });
  }

  function advance() {
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      if (count < ($slides.length - 1)) {
        move(count + 1);
      } else {
        move(0);
      }
    }, 5000);
  }

  $.each($slides, function(index) {
    var $button = $('<button type="button" class="slide-btn">&bull;</button>');
    if (index === count) {
      $button.addClass('active');
    }
    $button.on('click', function() {
      move(index);
    }).appendTo('.slide-buttons');
    buttonA.push($button);
  });

  advance();


});
