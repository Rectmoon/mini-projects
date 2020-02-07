const X_CLASS = 'x'
const O_CLASS = 'o'
const WINNER_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

let isXTurn

const board = document.querySelector('.board')
const cells = [...document.querySelectorAll('[data-cell]')]
const tips = document.querySelector('.tips')
const dataWarningText = document.querySelector('[data-warning-text]')
const restartBtn = document.querySelector('.restart')

function startGame() {
  isXTurn = false
  cells.forEach(cell => {
    cell.classList.remove(X_CLASS, O_CLASS)
    cell.removeEventListener('click', handleClick)
    cell.addEventListener('click', handleClick, { once: true })
  })
  initBoardClass()
  tips.classList.remove('show')
}

startGame()

cells.forEach(cell => {
  cell.addEventListener('click', handleClick, { once: true })
})
restartBtn.addEventListener('click', startGame)

const isWin = winnerClass =>
  WINNER_COMBINATIONS.some(combination => combination.every(index => cells[index].classList.contains(winnerClass)))
const isDraw = () => cells.every(cell => cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS))

function initBoardClass() {
  const currentBoardClass = isXTurn ? X_CLASS : O_CLASS
  board.classList.remove(X_CLASS, O_CLASS)
  board.classList.add(currentBoardClass)
}

function handleClick(e) {
  const cell = e.target
  const currentCellClass = isXTurn ? X_CLASS : O_CLASS
  cell.classList.add(currentCellClass)
  if (isWin(currentCellClass)) endGame(currentCellClass)
  else if (isDraw()) endGame()
  else isXTurn = !isXTurn
  initBoardClass()
}

function endGame(currentCellClass) {
  dataWarningText.innerText = currentCellClass ? `${currentCellClass.toUpperCase()} Win` : 'Draw'
  tips.classList.add('show')
}
