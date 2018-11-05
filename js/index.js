// index.js
if('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/serviceworker.js', {
    scope: '/'
  });
}

// Select all links with hashes
$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: (target.offset().top) - 70
        }, 1000, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          }
        });
      }
    }
  });

$('#csgo').click(windowChange('#csgo'));
$('#homepage').click(windowChange('#homepage'));
$('#mastermind').click(windowChange('#mastermind'));
$('#pubg').click(windowChange('#pubg'));
$('#wrdn').click(function(){
  window.location = 'http://darkdude.informatica-corlaer.nl';
});

function windowChange(x) {
  $(x).click(function(){
    var name = $(this).attr('id');
    window.open('http://tacocat.informatica-corlaer.nl/'+ name, '_blank');
  });
}

//Check for screen width and set content width
function contentWidth() {
  var width = window.innerWidth;
  if (width >= 1200) {
    return 1200;
  }
  if (width >= 992 && width < 1200) {
    return 992;
  }
  if (width >= 768 && width < 992) {
    return 768;
  }
  if (width < 768) {
    return;
  }
}

function numberRange(x, y) { //number range between 0 and 1
  var range = Math.tanh(x/y);
  if (range < 0) {
    return 0;
  }
  if (range >= 0 && range <= 1) {
    return range;
  }
  if (range > 1) {
    return 1;
  }
}

jQuery(document).ready(function(){
  var $window = $(window);
  var title = $('.titleBig');
  var subTitle = $('.titleSmall');
  var line = $('.titleLine');
  var nav = $('.nav');
  var navInner = $('.navInnerContainer');
  var h = window.innerHeight;
  var w = window.innerWidth;
  var lastScrollTop = $window.scrollTop();

  var title_x = 0;
  var title_y = 0;
  var nav_x = 0;

  $(window).scroll(function(event) {
    var st = $window.scrollTop();
    var ending_x = (w - contentWidth()) / 2;

    if (st > (h/2)) {
      title_x = ending_x; //Ending x-value
      title_y = 15; //Ending y-value
      navInner_x = ending_x; //Ending x-value
    }

    if (st <= (h/2)) {
      title_y = (((h/2 - 75)*st) / (-h/2)) + (h/2 - 60); //Linear function for y-coordinate in terms of y=as+b
      title_x = (((w/2 - 175 - ending_x)*st) / (-h/2)) + (w/2 - 175); //Linear function for x-coordinate in terms of x=as+b
      navInner_x = (((w/2 - 315 - ending_x)*st) / (-h/2)) + (w/2 - 315); //Linear function for x-coordinate of right most pixels
    }

    title.css('left', title_x);
    title.css('top', title_y);
    navInner.css('right', navInner_x);

    nav.css('box-shadow', '0 '+ 16 * (numberRange(st, h/2) - .5) + 'px 8px rgba(0,0,0,.28)');
    // nav.css('border-bottom', '1px solid rgba(221, 221, 221, '+ numberRange(st, h) +')');
    subTitle.css('opacity', 1 - 3 * numberRange(st, h)); //Decrease the opacity with a factor of 3
    line.css('transform', 'scaleX('+ (1 - numberRange(st, h/5)) +')') // Decrease the scale of the line with a factor of 3

  });
});
