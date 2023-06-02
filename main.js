const gameEl = document.getElementById("game");
const homeEl = document.getElementById("home");
const divBoxes = Array.from(
    document.querySelectorAll("div.box-container > div")
);
const emptyBoxes = divBoxes.filter((empty) => empty.innerHTML === "");
const restartBtn = document.getElementById("restart");
const quitBtn = document.getElementById("quit");
const startBtn = document.getElementById("start-game");
const player1Turn = document.getElementById("player-1");
const player2Turn = document.getElementById("player-2");
const radioButtons = document.querySelectorAll('input[name="mode"]');

const quitBtn2 = document.getElementById("quit-2");
const restartBtn2 = document.getElementById("restart-2");
const popUp = document.getElementById("pop-up");

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
function displayNone(gone) {
    gone.classList.add("d-none");
}
function displayNoneRemove(appear) {
    appear.classList.remove("d-none");
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
    playerTurn(player2Turn, player1Turn);

    drawOrWinner();
}
restartBtn.addEventListener("click", restartGame);

//
// multiplayer or singleplayer
radioButtons.forEach((radioButton) => {
    radioButton.addEventListener("change", (event) => {
        gameMode = event.target.value;
        console.log(gameMode);
    });
});

//
// startButton
function startGame() {
    displayNone(homeEl);
    displayNoneRemove(gameEl);
    player1.name = document.getElementById("player-1-input").value;
    player1Turn.innerHTML = player1.name;
    if (gameMode === "multiplayer") {
        player2.name = document.getElementById("player-2-input").value;
        player2Turn.innerHTML = player2.name;
    } else {
        player2Turn.innerHTML = "Bot";
    }
    isGameActive = true;
}
startBtn.addEventListener("click", startGame);

//
// quitbutton
function quitGame() {
    displayNone(gameEl);
    displayNoneRemove(homeEl);
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
function drawOrWinner() {
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
// game logic
function click(event) {
    const boxIndex = divBoxes.indexOf(event.target);

    if (isGameActive && tiles[boxIndex] === "") {
        tiles[boxIndex] = currentPlayer;
        divBoxes.forEach((box, index) => {
            box.innerHTML = tiles[index];
        });

        if (drawOrWinner()) {
            isGameActive = false;
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            playerTurn();
        }
    }
    console.log(tiles, drawOrWinner());
}

// Event listener for each box element
divBoxes.forEach((box) => {
    box.addEventListener("click", (event) => {
        click(event);
    });
});

//
// after load the game is hidden
window.addEventListener("load", displayNone(gameEl));
