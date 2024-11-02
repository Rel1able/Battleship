class Ship{
    constructor(length,name, hitScore, sunk) {
        this.length = length;
        this.name = name;
        this.hitScore = 0;
        this.sunk = false;
        
    }
    hit() {
        this.hitScore += 1;
        return this.hitScore;
    }

    isSunk() {
        return this.length === this.hitScore;
    }
}


class GameBoard{
    constructor(board) {
        this.board = [];
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

    placeShip(ship) {
        let isPlaced = false;

        while (!isPlaced) {
            let randomRow = Math.floor(Math.random() * 10);
            let randomCol = Math.floor(Math.random() * 10);
            let direction = Math.random() > 0.5 ? "vertical" : "horizontal";
            if (this.validateCells(ship, randomRow, randomCol, direction)) {
            if (direction === "vertical") {
                for (let i = 0; i < ship.length; i++){
                    this.board[randomRow][randomCol] = ship.name;
                    randomRow += 1;
                    
                }
            } else if (direction === "horizontal") {
                for (let i = 0; i < ship.length; i++){
                    this.board[randomRow][randomCol] = ship.name;
                    randomCol += 1;
                    
                    }
                }
                isPlaced = true;
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
}



let Carrier = new Ship(5, "Carrier");
let Battleship = new Ship(4, "Battleship");
let Cruiser = new Ship(3, "Cruiser");
let Submarine = new Ship(3, "Submarine");
let Destroyer = new Ship(2, "Destroyer");

