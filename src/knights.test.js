//test file
import knightMoves from "./main.js";

test("single coordinate passes and path is returned properly", ()=>{
    expect(knightMoves([0, 0], [1, 2])).toEqual([[0, 0], [1, 2]]);
});

test("double coordinate passes and path is returned correctly", ()=>{
    expect(knightMoves([0, 0], [3, 3])).toEqual([[0, 0], [1, 2], [3, 3]]);
});

test("One corner to the opposite board corner", ()=>{
    expect(knightMoves([0, 0], [7, 7])).toEqual([[0, 0],[1, 2],[2, 4],[3, 6],[5, 7],[6, 5],[7, 7]]);
});


//errors and invalids
test("Don't accept non-arrays", ()=>{
    expect(() => knightMoves("not an array")).toThrow("Please enter a valid coordinate.");
});

test("Only accept arrays containing two values", ()=>{
    expect(() => knightMoves([3, 2, 1], [1])).toThrow("Please enter a valid coordinate.");
});

test("Don't accept passing in the same coordinate twice", ()=>{
    expect(() => knightMoves([1, 2], [1, 2])).toThrow("You are already at that tile.");
});

test("Don't accept any values outside the designated range", ()=>{
    expect(() => knightMoves([0, 0], [9, 2])).toThrow("That square doesn't exist.");
});