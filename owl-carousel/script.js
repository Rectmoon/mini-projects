$(function() {
  const owl = $('.items.owl-carousel')

  owl.owlCarousel({
    margin: 20,
    loop: true,
    nav: true,
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 2
      },
      1000: {
        items: 4
      }
    }
  })

  owl.on('mousewheel', '.owl-stage', function(e) {
    if (e.deltaY > 0) {
      owl.trigger('next.owl')
    } else {
      owl.trigger('prev.owl')
    }
    e.preventDefault()
  })
})
