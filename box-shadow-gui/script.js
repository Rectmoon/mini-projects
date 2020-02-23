document.querySelectorAll('input').forEach(input => {
  input.addEventListener('input', handleInput)
})

function handleInput(e) {
  const { name, value } = e.target
  document.documentElement.style.setProperty(`--${name}`, value)
}
