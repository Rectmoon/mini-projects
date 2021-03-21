const dock = document.querySelector('#dock')
const SCALE = 0.618

dock.querySelectorAll('li').forEach(li => {
  li.addEventListener('mousemove', e => {
    const { currentTarget } = e
    const { width, left } = currentTarget.getBoundingClientRect()
    const offset = Math.abs(e.clientX - left) / width
    const prev = li.previousElementSibling
    const next = li.nextElementSibling

    resetScale()

    if (prev) {
      prev.style.setProperty('--scale', 1 + SCALE * Math.abs(offset - 1))
    }

    li.style.setProperty('--scale', 1 + SCALE)

    if (next) {
      next.style.setProperty('--scale', 1 + SCALE * offset)
    }
  })
})

dock.addEventListener('mouseleave', resetScale)

function resetScale () {
  dock.querySelectorAll('li').forEach(li => {
    li.style.setProperty('--scale', 1)
  })
}
