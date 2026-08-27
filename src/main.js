export default function knightMoves(coord1, coord2){
    //strictly enforce proper rules for co-ords
    //1. Only accept arrays of 2 values.
    if(!Array.isArray(coord1) || !Array.isArray(coord2) ||
        coord1.length !== 2 || coord2.length !== 2){
        throw new Error("Please enter a valid coordinate.");
    }

    //2. Ensure the values in the arrays are integers
    const allInts = [...coord1, ...coord2].every(value => Number.isInteger(value));
    if(!allInts){
        throw new Error("Only enter integers as coordinates.")
    }

    //3. Do not accept the same coordinate twice.
    if(coord1[0] === coord2[0] && coord1[1] === coord2[1]){
        throw new Error("You are already at that tile.");
    }

    //4. Ensure all coordinate values are between 0 - 7
    if(coord1[0] < 0 || coord1[0] > 7 ||
       coord1[1] < 0 || coord1[1] > 7 ||
       coord2[0] < 0 || coord2[0] > 7 ||
       coord2[1] < 0 || coord2[1] > 7
    ){
        throw new Error("That square doesn't exist.");
    }

    //Map to store parent-child coordinate relationships
    const parentCoordinates = new Map();

    //Array to act as a queue
    const possibleMoves = [coord1];

    //Track which tiles are discovered so as to not revisit them constantly
    const discoveredTiles = [coord1];

    while(possibleMoves.length > 0){
        //store the current coordinate
        const coordinate = possibleMoves.shift();

        //get possible coordinates knight can move to
        const moves = getPossibleMoves(coordinate);

        //Only push tiles/moves that have not already been visited
        for(const move of moves){
            const alreadyVisited = discoveredTiles.some(tile =>{
                return tile[0] === move[0] && tile[1] === move[1];
            });
            if(!alreadyVisited){
                discoveredTiles.push(move);
                possibleMoves.push(move);
                //use .set() to create a key:value pair to keep track of parent coordinates
                parentCoordinates.set(move, coordinate);
                //if the destination tile is found in the moves of the current coordinate
                //rebuild chain by asking for parent coordinates and return early
                if(move[0] === coord2[0] && move[1] === coord2[1]){
                    const shortestPath = [move];
                    let child = move;
                    while(child[0] !== coord1[0] || child[1] !== coord1[1]){
                        const parent = parentCoordinates.get(child);
                        shortestPath.unshift(parent);
                        child = parent;
                    }
                    return shortestPath;
                }
            }
        }
    }
}

//helper function to determine moves for knightMoves() (adjacency list)
function getPossibleMoves(currentPosition){
    //take the current position and use algorithm to determine where knight can move
    const [x, y] = currentPosition;

    //There are a maximum of 8 possible adjacent verices for any given square
    //generate all adjacent vertices (possible moves for knight) 
    const potentialMoves = [
        [x + 1, y + 2], [x + 2, y + 1],
        [x + 1, y - 2], [x + 2, y - 1],
        [x - 1, y + 2], [x - 2, y + 1],
        [x - 1, y - 2], [x - 2, y - 1]
    ];

    //check if any coordinate in those moves is outside the 0-7 range
    //discard that entire set and return the array with only legitimate moves as coordinates
    const legitimateMoves = potentialMoves.filter(move => {
        const [moveX, moveY] = move;
        return moveX >= 0 && moveX <= 7 && moveY >= 0 && moveY <= 7;
    });

    return legitimateMoves;
}

console.log(knightMoves([0, 0], [7, 7]))