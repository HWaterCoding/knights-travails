//test file
import knightMoves from "./main.js";

test("single coordinate passes and path is returned properly", ()=>{
    expect(knightMoves([0, 0], [1, 2])).toEqual([[0, 0], [1, 2]]);
});

