const multiStepForm = document.querySelector('[data-multi-step]')
const formSteps = Array.from(multiStepForm.querySelectorAll('[data-step]'))

let currentStep = formSteps.findIndex(step => step.classList.contains('active'))

if (currentStep < 0) {
  currentStep = 0
  showCurrentStep()
}

multiStepForm.addEventListener('click', e => {
  let incrementor

  if (e.target.matches('[data-next]')) {
    incrementor = 1
  } else if (e.target.matches('[data-previous]')) {
    incrementor = -1
  }

  if (!incrementor) return

  const inputs = Array.from(formSteps[currentStep].querySelectorAll('input'))
  const allValid = inputs.every(input => input.reportValidity())

  if (allValid) {
    currentStep += incrementor
    showCurrentStep()
  }
})

formSteps.forEach(step => {
  step.addEventListener('animationend', e => {
    formSteps[currentStep].classList.remove('hide')
    e.target.classList.toggle('hide', !e.target.classList.contains('active'))
  })
})

function showCurrentStep() {
  formSteps.forEach((step, index) => {
    step.classList.toggle('fade', index !== currentStep)
    step.classList.toggle('active', index === currentStep)
  })
}