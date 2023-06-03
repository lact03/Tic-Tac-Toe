const gameEl = document.getElementById("game");
const homeEl = document.getElementById("home");
const divBoxes = Array.from(
    document.querySelectorAll("div.box-container > div")
);

const restartBtn = document.getElementById("restart");
const quitBtn = document.getElementById("quit");
const startBtn = document.getElementById("start-game");
const player1Turn = document.getElementById("player-1");
const player2Turn = document.getElementById("player-2");
const radioButtons = document.querySelectorAll('input[name="mode"]');

const quitBtn2 = document.getElementById("quit-2");
const restartBtn2 = document.getElementById("restart-2");
const popUpEl = document.getElementById("pop-up");
const scaleAnimationEl = document.querySelector("#pop-up > div");
const messageEl = document.getElementById("message");

let gameMode = "singleplayer";
let isGameActive = false;
let tiles = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
const winCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

let index;

//
// display: none
function display(element, className) {
    element.classList.toggle(className);
}

//
// restart button
function restartGame() {
    tiles = tiles.map((tile) => (tile = ""));
    divBoxes.forEach((element) => {
        element.innerHTML = "";
    });
    currentPlayer = "X";
    isGameActive = true;
    playerTurn();
}
restartBtn.addEventListener("click", restartGame);

//
// startButton
function startGame() {
    display(homeEl, "d-none");
    display(gameEl, "d-none");
    player1Turn.innerHTML = document.getElementById("player-1-input").value;

    if (gameMode === "multiplayer") {
        player2Turn.innerHTML = document.getElementById("player-2-input").value;
    } else {
        player2Turn.innerHTML = "Bot";
    }

    isGameActive = true;
}
startBtn.addEventListener("click", startGame);

//
// quitbutton
function quitGame() {
    display(gameEl, "d-none");
    display(homeEl, "d-none");
    restartGame();
}
quitBtn.addEventListener("click", quitGame);

//
// show the player turn
function playerTurn() {
    if (currentPlayer === "X") {
        player2Turn.classList.remove("animation");
        player1Turn.classList.add("animation");
    } else {
        player1Turn.classList.remove("animation");
        player2Turn.classList.add("animation");
    }
}

//
// win function
function theresWinner() {
    for (let condition of winCombination) {
        const [a, b, c] = condition;
        if (
            tiles[a] === currentPlayer &&
            tiles[b] === currentPlayer &&
            tiles[c] === currentPlayer
        ) {
            return true;
        }
    }
}

//
// draw function
function isDraw() {
    return tiles.every((tile) => tile !== "");
}

//
// game logic
function updateGameBoard() {
    divBoxes.forEach((box, i) => {
        box.innerHTML = tiles[i];
    });
}

function endGame(message) {
    isGameActive = false;
    messageEl.innerHTML = message;
    display(popUpEl, "d-none");
    setTimeout(() => {
        display(scaleAnimationEl, "scale-up");
    }, 100);
}

function botAttack() {
    const emptyTilesIndex = tiles.reduce((indices, tile, index) => {
        if (tile === "") {
            indices.push(index);
        }
        return indices;
    }, []);

    if (emptyTilesIndex.length > 0) {
        const randomIndex = Math.floor(Math.random() * emptyTilesIndex.length);
        const attackIndex = emptyTilesIndex[randomIndex];
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        tiles[attackIndex] = currentPlayer;
    }
}

function attack(event) {
    const boxIndex = divBoxes.indexOf(event.target);

    if (isGameActive && tiles[boxIndex] === "") {
        tiles[boxIndex] = currentPlayer;
        if (theresWinner()) {
            endGame(`"${currentPlayer}" Won`);
        } else if (isDraw()) {
            endGame("Draw");
        } else {
            if (gameMode === "multiplayer") {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
                playerTurn();
            } else if (gameMode === "singleplayer") {
                botAttack();
                if (theresWinner()) {
                    endGame(`Bot Won`);
                } else if (isDraw()) {
                    endGame("Draw");
                } else {
                    currentPlayer = currentPlayer === "X" ? "O" : "X";
                }
            }
        }
        updateGameBoard();
    }
}

//
// Event listener for each box element
divBoxes.forEach((box) => {
    box.addEventListener("click", (event) => {
        attack(event);
    });
});

//
// multiplayer or singleplayer
radioButtons.forEach((radioButton) => {
    radioButton.addEventListener("change", (event) => {
        gameMode = event.target.value;
    });
});

//
// pop up restart button
restartBtn2.addEventListener("click", () => {
    setTimeout(() => {
        display(popUpEl, "d-none");
    }, 300);

    display(scaleAnimationEl, "scale-up");
    restartGame();
});

//
// pop up quit button
quitBtn2.addEventListener("click", () => {
    setTimeout(() => {
        display(popUpEl, "d-none");
    }, 300);
    display(scaleAnimationEl, "scale-up");
    quitGame();
});

//
// after load the game is hidden
window.addEventListener("load", () => {
    display(gameEl, "d-none");
    display(popUpEl, "d-none");
});
