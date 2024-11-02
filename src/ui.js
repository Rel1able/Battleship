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
compCells.forEach(row => {
    row.forEach(compCell => {
        const div = document.createElement("div");
        div.style.background = compCell ? "darkblue" : "blue";
        div.classList.add("computer-player-cell"); 
        computerBoard.appendChild(div);
    });
});