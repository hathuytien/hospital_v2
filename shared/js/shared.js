function changeImgSourceSp(x) {
  $('[srcSp]').each(function () {
    var i = $(this).attr('srcPc')
    var e = $(this).attr('srcSp')
    if (x.matches) {
      $(this).attr('src', e)
    } else {
      $(this).attr('src', i)
    }
  })
}
var x = window.matchMedia("(max-width: 999px)")
changeImgSourceSp(x)
x.addListener(changeImgSourceSp)
var keys = {
  37: 1,
  38: 1,
  39: 1,
  40: 1
};

function preventDefault(e) {
  e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
  window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
    get: function () {
      supportsPassive = true;
    }
  }));
} catch (e) {}

var wheelOpt = supportsPassive ? {
  passive: false
} : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

// call this to Disable
function disableScroll() {
  window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
  window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
  window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
  window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

// call this to Enable
function enableScroll() {
  window.removeEventListener('DOMMouseScroll', preventDefault, false);
  window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
  window.removeEventListener('touchmove', preventDefault, wheelOpt);
  window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}

$(document).ready(function () {
  $(".mobile-nav a[href^='#']").on("click", function () {

    $(".toggle-button").removeClass('active')
    $('body').removeClass('menu-open');
    $('body').css('position', 'static');
    $(window).scrollTop(offsetY);
  })
  $('.nav a, .nav a').click(function () {
    $('body').removeClass('menu-open');
    $('body').css('position', 'static');
    $('.toggle-button').removeClass('active')
    // $(window).scrollTop(offsetY);
  });
  $('.hide-nav').click(function () {
    if ($('body').hasClass('menu-open')) {
      $('body').removeClass('menu-open');
      $('body').css('position', 'static');
      $(window).scrollTop(offsetY);
    }
  });
});

function initSlider() {
  var keySlider = new Swiper('#key .swiper-container', {
    effect: 'fade',
    speed: 2000,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false
    },
    loop: true,
    // allowTouchMove: false
  })

  $('.popup-container .popup-wrapper .popup-close').on('click', function () {
    $(this).parents('.popup-container').removeClass('popup-open')
    $('body').css('position', 'static');
    $(window).scrollTop(offsetY);
  })

}
$(document).ready(function () {
  if ($('.nav-fixed[scroll-active]').length && $('.nav-fixed').attr('scroll-active') === "true")
    $(document).on('scroll', onScroll)
  $(document).on('scroll', onScroll2)
  $('.nav-fixed a[href^="#"], .mobile-nav a[href^="#"]').on('click', function () {
    var e = $(this).attr('href')
    var h = $('.nav-fixed').outerHeight()
    var b = $(e).length ? $(e).offset().top : 0
    $('html, body').animate({
      scrollTop: (b + 1 - h)
    }, 1000)
    console.log(b, e)
  })
});

function onScroll() {
  var scroll = $(window).scrollTop()
  var header = $('.nav-fixed').outerHeight()
  $('.nav-fixed a[href^="#"]').each(function () {
    var el = $(this).attr('href')
    var offset = $(el).length ? $(el).offset().top : 0
    if ($(this).find('img').length) {
      var _src_ = $(this).find('img').attr("src");
      _src_ = _src_.replace(/^(.*?)_on\.(.*)$/, "$1.$2");
      $(this).find('img').attr("src", _src_)
    }
    if ((scroll + header + 1) >= offset && ($(el).outerHeight() + offset) > (scroll + header)) {
      $('.nav-fixed a').removeClass('active')
      $(this).addClass('active')
      if ($(this).find('img').length) {
        $('.nav-fixed a img').addClass('btn')
        $(this).find('img').removeClass('btn')
        $('.nav-fixed a img').each(function () {
          var src = $(this).attr('src')
          var newSrc = src.replace('_on', '')
          $(this).attr('src', newSrc)
        })

        $(this).find('img').attr("src").match(/^(.*)(\.{1}.*)/g);
        var newSrc = RegExp.$1 + "_on" + RegExp.$2;

        $(this).find('img').attr("src", newSrc); // update src
      }
      // $(this).find('img').trigger('mouseout').trigger('mouseover')
    }
  })
}

function onScroll2() {
  var scroll = $(window).scrollTop()
  var header = $('.nav-fixed').outerHeight()
  $('.mobile-nav .nav a[href^="#"]').each(function () {
    var el = $(this).attr('href')
    var offset = $(el).length ? $(el).offset().top : 0
    if ((scroll + header + 1) >= offset && ($(el).outerHeight() + offset) > (scroll + header)) {
      $('.mobile-nav .nav a').removeClass('active')
      $(this).addClass('active')

      // $(this).find('img').trigger('mouseout').trigger('mouseover')
    }
  })
}
