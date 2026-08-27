//entry point 

//pseudocode for project:
//Must create a knightMoves() function that takes two arguments that will represent co-ordinates on a chessboard
//The first co-ordinate would be where the knight starts, and the second, where it ends up.
//When the function is called, the output should return all moves it would make in sequence to get there
//The return should always be the shortest possible path.

//Use a graph data structure to do this.
//The board, or graph, will be an 8x8 square (verticies 0-7)
//You do not need a literal graph, it will be implicit. 
//The knight must move in a standard L formation on every turn
//Instead of creating a literal graph, the math used will remain the same to dictate where it can move

//Think of the benefits between edge list, adjacency matrices, or an adjacency list

//terms to remember:
//vertex (the actual co-ordinate on the graph, aka, where the knight can move.)
//edge (the path traveled from one vertex to another)
//degree (the amount of edges a single vertex has)
//weight (number value assigned to the edge, in some cases, it would represent distance)(Probably not relevant)
//directed vs undirected graph (this will be undirected)



//USE A BFS <---- NOT A DFS. <--- BFS IS SPECIFICALLY FOR FINDING A SHORTEST PATH, DFS WILL CYCLE



//where to start:
//Create outline for function
//Define functions parameters

//use conditional statements to provide the implicit 8x8 graph/board
//rather than create an actual graph, determine the vertex current stood on and mathematically calculate it's neighbors.
//Throw away any co-ordinates that aren't on the board, again, with conditionals to check >= 0
//
export default function knightMoves(coord1, coord2){
    //strictly enforce proper rules for co-ords
    if(!Array.isArray(coord1) || !Array.isArray(coord2) ||
        coord1.length !== 2 || coord2.length !== 2){
        throw new Error("Please enter a valid coordinate.");
    }

    if(coord1[0] === coord2[0] && coord1[1] === coord2[1]){
        throw new Error("You are already at that tile.");
    }

    //ensure all coordinate values are between 0 - 7
    if(coord1[0] < 0 || coord1[0] > 7 ||
       coord1[1] < 0 || coord1[1] > 7 ||
       coord2[0] < 0 || coord2[0] > 7 ||
       coord2[1] < 0 || coord2[1] > 7
    ){
        throw new Error("That square doesn't exist.");
    }


    //store arrays here? Use key:value pairs to represent parents?
    const parentCoordinates = new Map();

    //this will be my queue
    const possibleMoves = [coord1];

    //to keep track of what tiles have already been visited so we don't revisit them.
    const tilesVisited = [coord1];

    while(possibleMoves.length > 0){
        //store the current coordinate
        const coordinate = possibleMoves.shift();

        //get possible coordinates knight can move to
        const moves = getPossibleMoves(coordinate);

        //Only push tiles/moves that have not already been visited
        for(const move of moves){
            const alreadyVisited = tilesVisited.some(tile =>{
                return tile[0] === move[0] && tile[1] === move[1];
            });
            if(!alreadyVisited){
                tilesVisited.push(move);
                possibleMoves.push(move);
                //use .set() to create a key:value pair to keep track of parent coordinates
                parentCoordinates.set(move, coordinate);
                //if the destination tile if found in the moves of the current coordinate, end early
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

    // adjacent vertices: (if currentPosition = [3, 3])
    // [4, 5](+1, +2), [5, 4](+2, +1)
    // [2, 1](-1, -2), [1, 2](-2, -1)
    // [4, 1](+1, -2), [5, 2](+2, -1)
    // [2, 5](-1, +2), [1, 4](-2, +1)
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




        //if the current coordinate is the destination tile, exit early, you've found the shortest path
        //add the destination coordinate to the end of the final path
        // if(coordinate[0] === coord2[0] && coordinate[1] === coord2[1]){
            // return the final path here
        // }