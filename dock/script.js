const dock = document.querySelector('#dock')

const curve = x => Math.exp((-x * x) / 100 / 100) + 1

dock.addEventListener('mousemove', e => {
  e.currentTarget.querySelectorAll('li').forEach(li => {
    li.style.setProperty(
      '--scale',
      curve(e.clientX - li.offsetLeft - li.offsetWidth / 2)
    )
  })
})

dock.addEventListener('mouseleave', e => {
  e.currentTarget.querySelectorAll('li').forEach(li => {
    li.style.setProperty('--scale', 1)
  })
})
