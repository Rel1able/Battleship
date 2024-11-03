import "./style.css";

export class Ship{
    constructor(length,name) {
        this.length = length;
        this.name = name;
        this.hitScore = 0;
        this.sunk = false;
        
    }
    hit() {
        this.hitScore += 1;

    }

    isSunk() {
        return this.length === this.hitScore;
    }
}


export class GameBoard{
    constructor() {
        this.board = [];
        this.missedAttacks = [];
        this.sunkShipsCounter = 0;
    }

    createBoard() {
        let rows = 10;
        let columns = 10;

        for (let i = 0; i < rows; i++){
            this.board[i] = [];
            for (let j = 0; j < columns; j++){
                this.board[i][j] = null;
            }
        }
    }

    placeShipRandomly(ship) {
        let isPlaced = false;

        while (!isPlaced) {
            let randomRow = Math.floor(Math.random() * 10);
            let randomCol = Math.floor(Math.random() * 10);
            let direction = Math.random() > 0.5 ? "vertical" : "horizontal";
            if (this.validateCells(ship, randomRow, randomCol, direction)) {
            if (direction === "vertical") {
                for (let i = 0; i < ship.length; i++){
                    this.board[randomRow][randomCol] = ship;
                    randomRow += 1;
                    
                }
            } else if (direction === "horizontal") {
                for (let i = 0; i < ship.length; i++){
                    this.board[randomRow][randomCol] = ship;
                    randomCol += 1;
                    
                    }
                }
                isPlaced = true;
            } 
        }
    }
    placeShip(ship, row, col, direction) {
        if (this.validateCells(ship, row, col, direction)) {
            if (direction === "vertical") {
                for (let i = 0; i < ship.length; i++){
                    this.board[row][col] = ship;
                    row += 1;
                }
            } else if (direction === "horizontal") {
                for (let i = 0; i < ship.length; i++){
                    this.board[row][col] = ship;
                    col += 1;
                }
            }
        }
    }

    validateCells(ship, row, col, direction) {
        if (direction === "vertical") {
            if (row + ship.length > this.board.length) return false;

            for (let i = 0; i < ship.length; i++){
                if (this.board[row][col] !== null) {
                    return false
                }
                row += 1;
            }
            return true;
        } else if (direction === "horizontal") {
            if (col + ship.length > this.board[0].length) return false;
            for (let i = 0; i < ship.length; i++){
                if (this.board[row][col] !== null) {
                    return false;
                }
                col += 1;
            }
            return true;
        }
    }
    receiveAttack(row, column) {
        
        if (this.board[row][column] === "X" || this.board[row][column] === ".") {
            alert("You already shot this field");
            return "Already shot";
        }

        if (this.board[row][column] !== null) {
            let ship = this.board[row][column];
            ship.hit();
            this.board[row][column] = "X";
            if (ship.isSunk()) {
                this.sunkShipsCounter += 1;
                if (this.sunkShipsCounter === 5) {
                    alert("Game over");
                }
                return "Sunk";
            }
            return "Hit";
        } else {
            this.board[row][column] = ".";
            this.missedAttacks.push([row, column]);
            return "Miss";
        }
    }
}


export class Player{
    constructor(type) {
        this.type = type;
        this.gameBoard = new GameBoard();
        this.gameBoard.createBoard();
        this.ships = [
            new Ship(5, "Carrier"),
            new Ship(4, "Battleship"),
            new Ship(3, "Cruiser"),
            new Ship(3, "Submarine"),
            new Ship(2, "Destroyer")
        ]
    }
    placeShips() {
        this.ships.forEach(ship => this.gameBoard.placeShipRandomly(ship));
    }
}


