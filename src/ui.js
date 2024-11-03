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
        }


    })
    }
)




const playerDivs = playerBoard.querySelectorAll("div");
let computerShots = [];

function computerMove() {
    
}


function generateRandomShot() {
    let row = Math.floor(Math.random() * 10);
    let col = Math.floor(Math.random() * 10);

    return [row, col];
}



