$(document).ready(function () {
  // changeImgSourceSp()
  $('.toggle-button').click(function () {
    if ($('body').hasClass('menu-open')) {
      $(this).removeClass('active')
      $('body').removeClass('menu-open');
      $('body').css('position', 'static');
      $(window).scrollTop(offsetY);
      $('#fixed-sp').css('z-index', '100');
    } else {
      $(this).addClass('active')
      $('body').addClass('menu-open');
      $('#fixed-sp').css('z-index', '99');
      offsetY = window.pageYOffset;
      $('body').css({
        position: 'fixed',
        width: '100%',
        top: -offsetY + 'px'
      });
    }
    return false;
  });
});
var lastScrollTop = 0;

$(window).scroll(function () {
  var st = $(this).scrollTop();
  if (lastScrollTop != 0) {
    if (st < lastScrollTop) {
      $("#pagetop").addClass("visible");
      if (st < 10) {
        $("#pagetop").removeClass("visible");
      }
    } else {

      $("#pagetop").removeClass("visible");

    }
  }
  lastScrollTop = st;
});
$(document).ready(function () {
  if (window.matchMedia("(max-width: 768px)").matches) {
    $(window).on("scroll resize", function () {
      var height = $('#key').height();
      if (height < $(window).scrollTop()) {
        $('#fixed-sp').css('opacity', '1');
      } else {
        $('#fixed-sp').css('opacity', '0');
      }
    });
  }
});
