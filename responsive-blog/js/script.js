const responsive = {
  0: {
    items: 1
  },
  320: {
    items: 1
  },
  560: {
    items: 2
  },
  960: {
    items: 3
  }
}

$(function() {
  const $nav = $('nav')
  const $toggleWrapper = $('.nav-wrapper')
  const $toggleCollapse = $('.toggle')

  $toggleWrapper.click(function(e) {
    if (!$nav[0].contains(e.target)) {
      $(this).removeClass('show')
      $('body').css({ overflow: 'auto' })
    }
  })

  $toggleCollapse.click(function() {
    $toggleWrapper.addClass('show')
    $('body').css({ overflow: 'hidden' })
  })

  $('.owl-carousel').owlCarousel({
    loop: true,
    autoplay: false,
    autoplayTimeout: 3000,
    dots: false,
    nav: true,
    navText: [$('.owl-navigation .owl-nav-prev'), $('.owl-navigation .owl-nav-next')],
    responsive: responsive
  })

  $('.move-up').click(function() {
    $('html, body').animate({ scrollTop: 0 }, 1000)
  })

  AOS.init()
})
