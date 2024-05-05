'use strict'

const WALL = '&#8251;'
const FOOD = '&middot;'
const EMPTY = ' '
const SUPERFOOD = '🍄'
const CHERRY = '🍒'


const gGame = {
    score: 0,
    isOn: false
    //isVictory
}

var gBoard 
var gFood
var gCherries
var gIntervalCherries


function init() {
    // console.log('hello')
    gFood = 0
    gBoard = buildBoard()
    
    gGame.score = 0
    setScore()
    createPacman(gBoard)
    createGhosts(gBoard)
    renderBoard(gBoard, '.board-container')
    createCherries()
    gGame.isOn = true
}

function buildBoard() {
    const size = 10
    const board = []

    for (var i = 0; i < size; i++) {
        board.push([]) // board[i] = []

        for (var j = 0; j < size; j++) {
            // board[i][j] = FOOD


            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2)) {
                board[i][j] = WALL
            } else {
                board[i][j] = FOOD
                gFood++

            }
            if (i === 1 && j === 1 || i === 1 && j === size - 2 ||
                j === 1 && i === size - 2 || j === size - 2 && i === size - 2) {
                board[i][j] = SUPERFOOD
            }
        }
    }
    return board
}

function updateScore(diff) {
    const elScore = document.querySelector('h2 span')
    // num
    // Model
    gGame.score += diff
    // DOM
    elScore.innerText = gGame.score
}


function gameOver() {
    // console.log('Game Over')    
    gGame.isOn = false
    btnGameOverModal()
    clearInterval(gGhostsInterval)

    var audio = new Audio('audio/game-over.mp3')
    audio.play()
}


function isVictory() {
    var audio = new Audio('../audio/winning.mp3')
    audio.play()
    btnShowVictoryModal()
    clearInterval(gGhostsInterval, moveGhosts)
}

function addCherry() {

    var curPosition = getRandomEmptyCellPosition()
    if (!curPosition) return
    gBoard[curPosition.i][curPosition.j] = CHERRY
    renderCell(curPosition, CHERRY)
}

function getRandomEmptyCellPosition() {
    const emptyCells = []
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            const cell = gBoard[i][j]
            if (cell === EMPTY) emptyCells.push({ i, j })
        }
    }

    if (!emptyCells.length) return null

    const randIdx = getRandomIntInclusive(0, emptyCells.length - 1)
    return emptyCells[randIdx]
}

function btnGameOverModal() {

    var elBtn = document.querySelector('.restart')
    elBtn.style.display = 'block'

}

function btnShowVictoryModal() {
    const elVictoriousModal = document.getElementById('victoriousModal')
    elVictoriousModal.style.display = 'block'

}

function playAgainBtn() {

    const elVictoriousModal = document.getElementById('victoriousModal')
    elVictoriousModal.style.display = 'none'

    const elPlayAgainBtn = document.querySelector('.restart');
    elPlayAgainBtn.style.display = 'none'
    init()

}

function setScore() {
    const elScore = document.querySelector('h2 span')
    elScore.innerText = gGame.score

}
