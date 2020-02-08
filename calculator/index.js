class Calculator {
  constructor(previousOperandEl, currentOperandEl) {
    this.previousOperandEl = previousOperandEl
    this.currentOperandEl = currentOperandEl
    this.clear()
  }

  clear() {
    this.previousOperand = ''
    this.currentOperand = ''
    this.operation = null
  }

  add(n) {
    if (!this.currentOperand.includes('.') || n !== '.') {
      this.currentOperand = this.currentOperand.toString() + n.toString()
    }
  }

  remove() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
  }

  compute() {
    let result
    const prev = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)
    if (isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
      case '+':
        result = prev + current
        break
      case '-':
        result = prev - current
        break
      case '*':
        result = prev * current
        break
      case '÷':
        result = prev / current
        break
      default:
        break
    }
    this.operation = null
    this.previousOperand = ''
    this.currentOperand = result
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return
    if (this.previousOperand !== '') {
      this.compute()
    }
    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = ''
  }

  _getDisplayNumber(n) {
    let [int, decimal] = n.toString().split('.')
    int = parseFloat(int)
    const interDisplay = isNaN(int) ? '' : int.toLocaleString('en', { maximumFractionDigits: 0 })
    return decimal != null ? `${interDisplay}.${decimal}` : interDisplay
  }

  render() {
    this.currentOperandEl.innerText = this._getDisplayNumber(this.currentOperand)
    this.previousOperandEl.innerText = this.operation
      ? `${this._getDisplayNumber(this.previousOperand)} ${this.operation}`
      : ''
  }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalButton = document.querySelector('[data-equal]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandEl = document.querySelector('[data-previous-operand]')
const currentOperandEl = document.querySelector('[data-current-operand]')

const calc = new Calculator(previousOperandEl, currentOperandEl)

numberButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    calc.add(btn.innerText)
    calc.render()
  })
})

operationButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    calc.chooseOperation(btn.innerText)
    calc.render()
  })
})

equalButton.addEventListener('click', () => {
  calc.compute()
  calc.render()
})

allClearButton.addEventListener('click', () => {
  calc.clear()
  calc.render()
})

deleteButton.addEventListener('click', () => {
  calc.remove()
  calc.render()
})
