const themeSwapper = document.querySelector('.theme-swapper')
const container = document.querySelector('.container')
const title = document.querySelector('.title')

themeSwapper.addEventListener('click', () => {
  document.body.classList.toggle('dark')
  const isDark = document.body.classList.contains('dark')
  title.innerHTML = isDark ? '天黑请闭眼' : '天亮请睁眼'
  themeSwapper.innerHTML = isDark ? '切换白天' : '切换晚上'
  // CSS属性值可以使用getPropertyValue(propName)API或直接索引到对象，如cs ['z-index']或cs.zIndex。
  const currentRotation = parseInt(getComputedStyle(container).getPropertyValue('--rotation'))
  container.style.setProperty('--rotation', currentRotation + 180)
})
