import { Ship, GameBoard, Player } from "./index.js";
import './style.css'; 



const realPlayer = new Player("human");

let realPlayerBoard = new GameBoard();
realPlayerBoard.createBoard();

realPlayer.placeShips();

let cells = realPlayer.gameBoard.board;

const playerBoard = document.getElementById("player-board");

cells.forEach(row => {
    row.forEach(cell => {
        const div = document.createElement("div");
        div.style.background = cell ? "darkblue" : "blue";
        div.classList.add("real-player-cell");
        playerBoard.appendChild(div);
    })
    
})


const computerPlayer = new Player("computer");
const computerPlayerBoard = new GameBoard();
computerPlayerBoard.createBoard();
computerPlayer.placeShips();

const compCells = computerPlayer.gameBoard.board;
const computerBoard = document.getElementById("computer-board");
compCells.forEach((row, rowIndex) => {
    row.forEach((compCell, colIndex) => {
        const div = document.createElement("div");
        div.style.background = compCell ? "darkblue" : "blue";
        div.classList.add("computer-player-cell"); 
        div.setAttribute("data-row", rowIndex);
        div.setAttribute("data-col", colIndex);
        computerBoard.appendChild(div);
    });
});


let compDivs = computerBoard.querySelectorAll("div");

compDivs.forEach(div => {
    div.addEventListener("click", () => {
        if (div.textContent === "X" || div.textContent === ".") {
            alert("You already shot this field");
            return;
        }
        const row = parseInt(div.getAttribute("data-row"));
        const col = parseInt(div.getAttribute("data-col"));

        const result = computerPlayer.gameBoard.receiveAttack(row, col);

        if (result === "Hit") {
            div.style.background = "red";
            div.textContent = "X";
        } else if (result === "Miss") {
            div.style.background = "lightblue";
            div.textContent = ".";
        } else if (result === "Sunk") {
            div.style.background = "darkred";
            div.textContent = "X";
        } if (checkWinner()) {
            return;
        }

        computerMove();
    })
    }
)




const playerDivs = playerBoard.querySelectorAll("div");

let shots = new Set();
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
                } else if (result === "Miss") {
                    div.style.background = "lightblue";
                    div.textContent = ".";
                } else if (result === "Sunk") {
                    div.style.background = "darkred";
                    div.textContent = "X";
                    
                }
            }
        }
    }
}

function checkWinner() {
    if (computerPlayer.gameBoard.allShipsSunk()) {
        alert("Congratulation! You win!");
        disableGame();
        return true;
    } else if (realPlayer.gameBoard.allShipsSunk()) {
        alert("Game over! The computer wins!");
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