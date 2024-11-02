import { Ship, GameBoard } from "./index.js";



let Carrier = new Ship(5, "Carrier");
let Battleship = new Ship(4, "Battleship");
let Cruiser = new Ship(3, "Cruiser");
let Submarine = new Ship(3, "Submarine");
let Destroyer = new Ship(2, "Destroyer");


let gameBoard = new GameBoard();

gameBoard.createBoard();
gameBoard.placeShip(Carrier, 1, 2, "horizontal");
gameBoard.receiveAttack(1, 2);

gameBoard.receiveAttack(1, 3);
gameBoard.receiveAttack(1, 4);
gameBoard.receiveAttack(1, 5);
gameBoard.receiveAttack(1, 6);


test("ship received attack", () => {
    expect(Carrier.hitScore).toBe(5);
})

test("ship is sunk", () => {
    expect(Carrier.isSunk).toBeTruthy();
})

