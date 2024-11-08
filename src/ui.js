import { Ship, GameBoard, Player } from "./index.js";
import './style.css'; 
const playerBoard = document.getElementById("player-board");
const computerBoard = document.getElementById("computer-board");
let shots = new Set();
let gameOver = false;

    
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
            div.style.background = cell ? "darkblue" : "blue";
            div.classList.add("real-player-cell");
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
            div.style.background = "blue"; //compCell ? "darkblue" : "blue";
            div.classList.add("computer-player-cell"); 
            div.setAttribute("data-row", rowIndex);
            div.setAttribute("data-col", colIndex);
            computerBoard.appendChild(div);
        });
    });


    let compDivs = computerBoard.querySelectorAll("div");

    
    let playerTurn = "player";
    if (playerTurn === "player") {
        compDivs.forEach(div => {
        div.addEventListener("click", () => {
            if (!gameOver && playerTurn === "player") {
                if (div.textContent === "X" || div.textContent === ".") {
                    alert("You already shot this field");
                    return;
                }
                const row = parseInt(div.getAttribute("data-row"));
                const col = parseInt(div.getAttribute("data-col"));

                const result = computerPlayer.gameBoard.receiveAttack(row, col);

                if (result === "Hit") {
                    div.style.background = "red";
                    playerTurn = "player";
                    div.textContent = "X";
                } else if (result === "Miss") {
                    div.style.background = "lightblue";
                    playerTurn = "computer";
                    div.textContent = ".";
                } else if (result === "Sunk") {
                    div.style.background = "darkred";
                    playerTurn = "player";
                    div.textContent = "X";
                } if (checkWinner()) {
                    return;
                }
                if (playerTurn === "computer") {
                    setTimeout(computerMove, 500);
                }
                
            }
            else alert("Slow down! Computer makes a move");
        })
        }
    )
    } 
    
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
                    if (result === "Hit") {
                        div.style.background = "red";
                        div.textContent = "X";
                        playerTurn = "computer";
                        setTimeout(computerMove, 500);
                    } else if (result === "Miss") {
                        div.style.background = "lightblue";
                        div.textContent = ".";
                        playerTurn = "player";
                    } else if (result === "Sunk") {
                        div.style.background = "darkred";
                        div.textContent = "X";
                        setTimeout(computerMove, 500);
                        
                    }
                }
            }
        }
        
        
    }


    function checkWinner() {
        if (computerPlayer.gameBoard.allShipsSunk()) {
            textResult.textContent = "Congratulation! You win!";
            blurDisplayAndShowResult();
            gameOver = true;
            disableGame();
            return true;
        } else if (realPlayer.gameBoard.allShipsSunk()) {
            textResult.textContent = "You lost. The computer won";
            blurDisplayAndShowResult();
            
            gameOver = true;
            disableGame();
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
    footer.classList.add("footer");
    buttonContainer.classList.add("blur");
    gameResult.style.display = "block";
}

function removeTheBlur() {
    header.classList.remove("blur");
    boardsContainer.classList.remove("blur");
    footer.classList.remove("footer");
    buttonContainer.classList.remove("blur");
    gameResult.style.display = "none";
}

playAgainButton.addEventListener("click", () => {
    playerBoard.innerHTML = "";
    computerBoard.innerHTML = "";
    shots.clear();
    gameOver = false;
    removeTheBlur();
    playRound();
    
})

let resetButton = document.querySelector(".reset");



resetButton.addEventListener("click", () => {
    playerBoard.innerHTML = "";
    computerBoard.innerHTML = "";
    shots.clear();
    gameOver = false;
    playRound();
});
