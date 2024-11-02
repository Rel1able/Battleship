import { Ship } from "./index.js";

let ship1 = new Ship(5);


ship1.hit();
ship1.hit();
ship1.hit();
ship1.hit();
ship1.hit();
ship1.isSunk();

test("ship is sunked", () => {
    expect(ship1.isSunk()).toBe(true);
})

test("ship hitted", () => {
    expect(ship1.hitted).toBe(5);
})
