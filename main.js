const divBoxEl = document.getElementById("box-container");
const divBoxParentEl = document.querySelector("div.box-parent");

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

const player1 = {
    name: "",
    symbol: "X",
    isWinner: [],
};
const player2 = {
    name: "",
    symbol: "O",
    isWinner: [],
};

let gameMode = "singleplayer";
let isGameActive = true;
const turnArray = [];
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

function resize() {
    const windowWidth = window.innerWidth * 0.95;

    let boxHeight = window.innerHeight * 0.665;

    if (boxHeight < windowWidth) {
        divBoxEl.style.width = `${boxHeight}px`;
        divBoxEl.style.height = `${boxHeight}px`;
    } else {
        divBoxEl.style.width = `${windowWidth}px`;
        divBoxEl.style.height = `${windowWidth}px`;
    }

    console.log(window.innerHeight * 0.7, window.innerWidth);
}

window.addEventListener("load", resize);
window.addEventListener("resize", resize);

function restartGame() {
    turnArray.length = 0;
    divBoxes.forEach((element) => {
        element.innerHTML = "";
    });
    player1.isWinner.length = 0;
    player2.isWinner.length = 0;
    isGameActive = true;
    playerTurn(player2Turn, player1Turn);
}
restartBtn.addEventListener("click", restartGame);

radioButtons.forEach((radioButton) => {
    radioButton.addEventListener("change", (event) => {
        gameMode = event.target.value;
        console.log(gameMode);
    });
});

function startGame() {
    homeEl.style.display = "none";
    gameEl.style.display = "block";
    resize();
    player1.name = document.getElementById("player-1-input").value;
    player1Turn.innerHTML = player1.name;
    if (gameMode === "multiplayer") {
        player2.name = document.getElementById("player-2-input").value;
        player2Turn.innerHTML = player2.name;
    } else {
        player2Turn.innerHTML = "Bot";
    }
}
startBtn.addEventListener("click", startGame);

function quitGame() {
    homeEl.style.display = "block";
    gameEl.style.display = "none";
    restartGame();
}
quitBtn.addEventListener("click", quitGame);

function playerTurn(playerMove, nextPlayer) {
    playerMove.classList.remove("animation");
    nextPlayer.classList.add("animation");
}

function makeBotMove() {
    const emptyBoxes = divBoxes.filter((box) => box.innerHTML === "");
    if (emptyBoxes.length > 0) {
        const randomIndex = Math.floor(Math.random() * emptyBoxes.length);
        const botBox = emptyBoxes[randomIndex];
        botBox.innerHTML = player2.symbol;
        player2.isWinner.push(divBoxes.indexOf(botBox));
        turnArray.push(player2.symbol);
        playerTurn(player2Turn, player1Turn);
    }
}

function click(box) {
    let player1Win = winCombination.some((win) => {
        return win.every((combination) => {
            return player1.isWinner.includes(combination);
        });
    });

    let player2Win = winCombination.some((win) => {
        return win.every((combination) => {
            return player2.isWinner.includes(combination);
        });
    });

    if (player1Win === true && isGameActive === true) {
        isGameActive = false;
    } else if (player2Win === true && isGameActive === true) {
        isGameActive = false;
    } else if (
        isGameActive === true &&
        box.innerHTML === "" &&
        (turnArray.at(-1) === "O" || turnArray.length === 0)
    ) {
        turnArray.push(player1.symbol);
        box.innerHTML = player1.symbol;
        player1.isWinner.push(divBoxes.indexOf(box));
        playerTurn(player1Turn, player2Turn);

        if (gameMode === "singleplayer") {
            makeBotMove();
        }
    } else if (
        isGameActive === true &&
        box.innerHTML === "" &&
        turnArray.at(-1) === "X"
    ) {
        turnArray.push(player2.symbol);
        box.innerHTML = player2.symbol;
        player2.isWinner.push(divBoxes.indexOf(box));
        playerTurn(player2Turn, player1Turn);
    }

    console.log(player1Win, player2Win);
}
divBoxes.forEach((box) => {
    box.addEventListener("click", () => {
        click(box);
        // console.log(event.currentTarget);
    });
});

gameEl.style.display = "none";
