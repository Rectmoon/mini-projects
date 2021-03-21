/*
  1、字体大小改变（font size change）
  2、窗口大小改变（screen change）
  3、样式表添加或者删除（add/delete stylesheets）
  4、JS更改DOM元素（更改DOM颜色除外）
  5、hover动作（:hover颜色除外）
  6、位置计算（offset cats）
  7、用户输入（user input）
  8、改变样式属性（颜色，透明度等除外）
*/

const h1 = document.querySelector('h1')

h1.innerHTML = h1.textContent.replace(/\S/g, `<span>$&</span>`)

document.querySelectorAll('h1 span').forEach((span, index) => {
  span.style.setProperty('--delay', `${index * 0.1}s`)
})

document.querySelectorAll('button[data-animation]').forEach(button => {
  button.addEventListener('click', e => {
    h1.style.setProperty('--animation', e.target.dataset.animation)
    h1.classList.remove('animate')
    void h1.offsetWidth
    h1.classList.add('animate')
  })
})
