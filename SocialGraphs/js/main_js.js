// var jsnx = require('jsnetworkx'); // in Node

// a tree of height 4 with fan-out 2
var G = jsnx.balancedTree(2, 4);

// Compute the shortest path between node 2 and 7
var path = jsnx.bidirectionalShortestPath(G, 2, 7);
// [ 2, 0, 1, 3, 7 ]

// or asynchronously
jsnx.genBidirectionalShortestPath(G, 2, 7).then(function(path) {
  // path = [ 2, 0, 1, 3, 7 ]
});