'use strict'

const GHOST = '&#9781'
var gGhosts = []
var gDeadGhosts = []

var gGhostsInterval

function createGhosts(board) {
    gGhosts = []
    // TODO: 3 ghosts and an interval
    for (var i = 0; i < 3; i++) {
        createGhost(board)
    }
    gGhostsInterval = setInterval(moveGhosts, 1000)
}

function createGhost(board) {
    // TODO: Create a ghost with arbitrary start pos & currCellContent
    const ghost = {
        location: { i: 3, j: 3 },
        currCellContent: FOOD,
    }
    // TODO: Add the ghost to the ghosts array
    gGhosts.push(ghost)

    // TODO: Update the board
    board[ghost.location.i][ghost.location.j] = GHOST
}

function moveGhosts() {
    // TODO: loop through ghosts
    for (var i = 0; i < gGhosts.length; i++) {
        moveGhost(gGhosts[i])
    }
}

function moveGhost(ghost) {
    // TODO: figure out moveDiff, nextLocation, nextCell
    const moveDiff = getMoveDiff()
    const nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j,
    }
    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    // TODO: return if cannot move
    if (nextCell === WALL || nextCell === GHOST || nextCell === SUPERFOOD || nextCell === CHERRY) return

    // TODO: hitting a pacman? call gameOver
    if (nextCell === PACMAN) {
        if(!gPacman.isSuper) return
        else 
        gameOver()
        return
    }

    // TODO: moving from current location:
    // TODO: update the model (restore prev cell contents)
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent

    // TODO: update the DOM
    renderCell(ghost.location, ghost.currCellContent)

    // TODO: Move the ghost to new location:
    // TODO: update the model (save cell contents so we can restore later)
    ghost.location = nextLocation
    ghost.currCellContent = nextCell
    gBoard[nextLocation.i][nextLocation.j] = GHOST

    // TODO: update the DOM
    renderCell(ghost.location, getGhostHTML(ghost))
}

function getMoveDiff() {
    const randNum = getRandomIntInclusive(1, 4)

    switch (randNum) {
        case 1: return { i: 0, j: 1 }
        case 2: return { i: 1, j: 0 }
        case 3: return { i: 0, j: -1 }
        case 4: return { i: -1, j: 0 }
    }
}

function getGhostHTML(ghost) {
    if (gPacman.isSuper) {
        return `<span style= "color:blue">${GHOST}</span>`
    } else {
        return `<span style= "color:${getRandomColor()}">${GHOST}</span>`
    }
    
}

function eatGhost(nextLocation) {
    var audio = new Audio('audio/ghost.mp3')
    audio.play()
    for (var i = 0; i < gGhosts.length; i++) {
        var currGhost = gGhosts[i]
        if (currGhost.location.i === nextLocation.i && currGhost.location.j === nextLocation.j) {
            const ghostToEat = gGhosts.splice(i, 1)[0]     //[0]//{ghost}
          gDeadGhosts.push(ghostToEat)   //[{}]
        }
    }
}