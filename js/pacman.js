'use strict'

const PACMAN = '🐞'
var gPacman

function createPacman(board) {
    // TODO: initialize gPacman...
    gPacman = {
        location: { i: 3, j: 5 },
        isSuper: false,
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}

function movePacman(ev) {

    if (!gGame.isOn) return

    // TODO: use getNextLocation(), nextCell
    const nextLocation = getNextLocation(ev)
    if (!nextLocation) return

    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    // TODO: return if cannot move
    if (nextCell === WALL) return

    // TODO: hitting a ghost? call gameOver
    if (nextCell === GHOST) {
        if (!gPacman.isSuper) {
            
            gameOver()
            return
        }
         else {
            eatGhost(nextLocation)
        
         }
}

// TODO: hitting food? call updateScore
if (nextCell === FOOD) {
    var audio = new Audio('audio/eaten-ball.mp3')
    // audio.play()
    updateScore(1)
    gFood--
    if (gFood === 6) {
        isVictory()
    }
    console.log(gFood)
}


if (nextCell === SUPERFOOD) {
    // debugger
    if (gPacman.isSuper) return
    gPacman.isSuper = true
    
    setTimeout(() => {
        gGhosts.push(...gDeadGhosts)
        gDeadGhosts = []
        
        return gPacman.isSuper = false
    }, 5000)

    var audio = new Audio('audio/super.mp3')
    audio.play()
}

if (nextCell === CHERRY) {
    console.log('3')
    audio = new Audio('audio/cherry.mp3')
    audio.play()
    updateScore(10)
}


// TODO: moving from current location:
// TODO: update the model
gBoard[gPacman.location.i][gPacman.location.j] = EMPTY

// TODO: update the DOM
renderCell(gPacman.location, EMPTY)

// TODO: Move the pacman to new location:
// TODO: update the model
gPacman.location = nextLocation
gBoard[gPacman.location.i][gPacman.location.j] = PACMAN

// TODO: update the DOM
renderCell(gPacman.location, PACMAN)
}

function getNextLocation(eventKeyboard) {
    const nextLocation = { i: gPacman.location.i, j: gPacman.location.j }

    switch (eventKeyboard.key) {
        case 'ArrowUp':
            nextLocation.i--
            break;

        case 'ArrowDown':
            nextLocation.i++
            break;

        case 'ArrowLeft':
            nextLocation.j--
            break;

        case 'ArrowRight':
            nextLocation.j++
            break;

        default: return null
    }
    return nextLocation
}