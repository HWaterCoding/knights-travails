//entry point 

//psuedocode for project:
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
//