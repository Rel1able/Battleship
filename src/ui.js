import { Ship, GameBoard, Player } from "./index.js";
import './style.css'; 
const playerBoard = document.getElementById("player-board");
const computerBoard = document.getElementById("computer-board");
let shots = new Set();
let gameOver = false;
let playerTurnDiv = document.querySelector(".player-turn");
let resetButton = document.querySelector(".reset");
enableReset();
playRound();


function playRound() {

    const realPlayer = new Player("human");
    let realPlayerBoard = new GameBoard();
    realPlayerBoard.createBoard();

    realPlayer.placeShips();

    let cells = realPlayer.gameBoard.board;



    cells.forEach(row => {
        row.forEach(cell => {
            const div = document.createElement("div");
            div.style.background = cell ? "darkblue" : "rgb(50, 113, 231)";
            div.classList.add("real-player-cell");
            div.classList.add("hovered");
            playerBoard.appendChild(div);
        })
        
    })


    const computerPlayer = new Player("computer");
    let computerPlayerBoard = new GameBoard();
    computerPlayerBoard.createBoard();
    computerPlayer.placeShips();

    const compCells = computerPlayer.gameBoard.board;



    compCells.forEach((row, rowIndex) => {
        row.forEach((compCell, colIndex) => {
            const div = document.createElement("div");
            div.style.background = "rgb(50, 113, 231)"; 
            div.classList.add("computer-player-cell"); 
            div.classList.add("hovered");
            div.setAttribute("data-row", rowIndex);
            div.setAttribute("data-col", colIndex);
            computerBoard.appendChild(div);
        });
    });


    let compDivs = computerBoard.querySelectorAll("div");
    

    function updateTurnDisplay() {
        playerTurnDiv.textContent = playerTurn === "player" ? "Your turn" : "Computer's turn";
    }
    
    let playerTurn = "player";
    if (playerTurn === "player") {
        compDivs.forEach(div => {
        div.addEventListener("click", () => {
            if (!gameOver && playerTurn === "player") {
                if (div.textContent === "X" || div.textContent === ".") {
                    alert("You've already shot this cell");
                    return;
                }
                const row = parseInt(div.getAttribute("data-row"));
                const col = parseInt(div.getAttribute("data-col"));

                const result = computerPlayer.gameBoard.receiveAttack(row, col);

                if (result === "Hit" ||result === "Sunk") {
                    div.style.background = "rgb(177, 7, 7)";
                    playerTurn = "player";
                    div.textContent = "X";
                    div.classList.remove("hovered");
                } else if (result === "Miss") {
                    div.textContent = "•";
                    div.style.fontSize = "4rem";
                    div.style.color = "rgb(2, 25, 68)";
                    div.classList.remove("hovered");
                    playerTurn = "computer";
                }  if (checkWinner()) {
                    return;
                }
                if (playerTurn === "computer") {
                    updateTurnDisplay();
                    setTimeout(computerMove, 500);
                }
                
            }
        })
        }
    )
    } 
    updateTurnDisplay();
    const playerDivs = playerBoard.querySelectorAll("div");

    function computerMove() {
        let row, col;
        let isNewShot = false;
        
        while (!isNewShot) {
            row = Math.floor(Math.random() * 10);
            col = Math.floor(Math.random() * 10);
            const coordinateKey = `${row},${col}`;

            if (!shots.has(coordinateKey)) {
                shots.add(coordinateKey);
                isNewShot = true;

                const result = realPlayer.gameBoard.receiveAttack(row, col);
                let divIndex = row * 10 + col;
                const div = playerDivs[divIndex];

                if (div) {
                    if (result === "Hit" || result === "Sunk") {
                        div.style.background = "rgb(177, 7, 7)";
                        div.textContent = "X";
                        div.classList.remove("hovered");
                        playerTurn = "computer";
                        setTimeout(computerMove, 500);
                    } else if (result === "Miss") {
                        div.textContent = "•";
                        div.style.color = "rgb(2, 25, 68)";
                        div.style.fontSize = "4rem";
                        div.classList.remove("hovered");
                        playerTurn = "player";
                        updateTurnDisplay();
                    }
                }
            }
        }
    }

    function checkWinner() {
        if (computerPlayer.gameBoard.allShipsSunk()) {
            textResult.textContent = "Congratulations, you won!";
            blurDisplayAndShowResult();
            gameOver = true;
            disableGame();
            disableReset();
            return true;
        } else if (realPlayer.gameBoard.allShipsSunk()) {
            textResult.textContent = "Unfortunately you lost, the computer won!";
            blurDisplayAndShowResult();
            
            gameOver = true;
            disableGame();
            disableReset();
            return true;
        }
        return false;
    }

    function disableGame() {
        compDivs.forEach(div => {
            div.removeEventListener("click", () => { });
        })
    }
}



let textResult = document.querySelector(".text-result");
let playAgainButton = document.querySelector(".play-again");
let header = document.querySelector("header");
let gameResult = document.querySelector(".result");
let boardsContainer = document.querySelector(".container");
let footer = document.querySelector("footer");
let buttonContainer = document.querySelector(".button-container");


function blurDisplayAndShowResult() {
    header.classList.add("blur");
    boardsContainer.classList.add("blur");
    footer.classList.add("blur");
    buttonContainer.classList.add("blur");
    playerTurnDiv.classList.add("blur");
    gameResult.style.display = "flex";
}

function removeTheBlur() {
    header.classList.remove("blur");
    boardsContainer.classList.remove("blur");
    footer.classList.remove("footer");
    buttonContainer.classList.remove("blur");
    playerTurnDiv.classList.remove("blur");
    footer.classList.remove("blur");
    gameResult.style.display = "none";
}

playAgainButton.addEventListener("click", () => {
    playerBoard.innerHTML = "";
    computerBoard.innerHTML = "";
    shots.clear();
    gameOver = false;
    removeTheBlur();
    playRound();
    enableReset();
    
})



function handleReset() {
    playerBoard.innerHTML = "";
    computerBoard.innerHTML = "";
    shots.clear();
    gameOver = false;
    playRound();
}

function enableReset() {
    resetButton.addEventListener("click", handleReset);
}
function disableReset() {
    resetButton.removeEventListener("click", handleReset);
}
