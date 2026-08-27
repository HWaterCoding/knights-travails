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