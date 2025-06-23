const { Graph, Node } = require('./graph');

// Example 1: addVertex / addVertices
console.log("=== Example 1: addVertex / addVertices ===");
let graph = new Graph();
let a = new Node("A");
let b = new Node("B");
let c = new Node("C");
graph.addVertices([a, b]);
graph.addVertex(c);
console.log("graph.nodes.has(a):", graph.nodes.has(a)); // true
console.log("graph.nodes.has(b):", graph.nodes.has(b)); // true
console.log("graph.nodes.has(c):", graph.nodes.has(c)); // true

// Example 2: addEdge
console.log("\n=== Example 2: addEdge ===");
let graph2 = new Graph();
let a2 = new Node("A");
let b2 = new Node("B");
let c2 = new Node("C");
let d2 = new Node("D");
graph2.addVertices([a2, b2, c2, d2]);
graph2.addEdge(a2, b2);
graph2.addEdge(a2, c2);
graph2.addEdge(b2, d2);
graph2.addEdge(c2, d2);

console.log("a2.adjacent contains b2 and c2:", a2.adjacent.has(b2) && a2.adjacent.has(c2));
console.log("b2.adjacent contains a2 and d2:", b2.adjacent.has(a2) && b2.adjacent.has(d2));
console.log("c2.adjacent contains a2 and d2:", c2.adjacent.has(a2) && c2.adjacent.has(d2));
console.log("d2.adjacent contains b2 and c2:", d2.adjacent.has(b2) && d2.adjacent.has(c2));

// Example 3: removeEdge
console.log("\n=== Example 3: removeEdge ===");
let graph3 = new Graph();
let a3 = new Node("A");
let b3 = new Node("B");
let c3 = new Node("C");
let d3 = new Node("D");
graph3.addVertices([a3, b3, c3, d3]);
graph3.addEdge(a3, b3);
graph3.addEdge(a3, c3);
graph3.addEdge(b3, d3);
graph3.addEdge(c3, d3);

graph3.removeEdge(b3, a3);
graph3.removeEdge(c3, d3);

console.log("a3.adjacent does not contain b3:", !a3.adjacent.has(b3));
console.log("b3.adjacent does not contain a3:", !b3.adjacent.has(a3));
console.log("c3.adjacent does not contain d3:", !c3.adjacent.has(d3));
console.log("d3.adjacent does not contain c3:", !d3.adjacent.has(c3));

// Example 4: removeVertex
console.log("\n=== Example 4: removeVertex ===");
let graph4 = new Graph();
let a4 = new Node("A");
let b4 = new Node("B");
let c4 = new Node("C");
let d4 = new Node("D");
graph4.addVertices([a4, b4, c4, d4]);
graph4.addEdge(a4, b4);
graph4.addEdge(a4, c4);
graph4.addEdge(b4, d4);
graph4.addEdge(c4, d4);

graph4.removeVertex(c4);
graph4.removeVertex(d4);

console.log("graph4.nodes.has(a4):", graph4.nodes.has(a4)); // true
console.log("graph4.nodes.has(b4):", graph4.nodes.has(b4)); // true
console.log("graph4.nodes.has(c4):", graph4.nodes.has(c4)); // false
console.log("graph4.nodes.has(d4):", graph4.nodes.has(d4)); // false

// Example 5: depthFirstSearch
console.log("\n=== Example 5: depthFirstSearch ===");
let graph5 = new Graph();
let S = new Node('S');
let P = new Node('P');
let U = new Node('U');
let X = new Node('X');
let Q = new Node('Q');
let Y = new Node('Y');
let V = new Node('V');
let R = new Node('R');
let W = new Node('W');
let T = new Node('T');

graph5.addVertices([S, P, U, X, Q, Y, V, R, W, T]);

graph5.addEdge(S, P);
graph5.addEdge(S, U);

graph5.addEdge(P, X);
graph5.addEdge(U, X);

graph5.addEdge(P, Q);
graph5.addEdge(U, V);

graph5.addEdge(X, Q);
graph5.addEdge(X, Y);
graph5.addEdge(X, V);

graph5.addEdge(Q, R);
graph5.addEdge(Y, R);

graph5.addEdge(Y, W);
graph5.addEdge(V, W);

graph5.addEdge(R, T);
graph5.addEdge(W, T);

console.log("DFS result:", graph5.depthFirstSearch(S));

// Example 6: breadthFirstSearch
console.log("\n=== Example 6: breadthFirstSearch ===");
let graph6 = new Graph();
let S2 = new Node('S');
let P2 = new Node('P');
let U2 = new Node('U');
let X2 = new Node('X');
let Q2 = new Node('Q');
let Y2 = new Node('Y');
let V2 = new Node('V');
let R2 = new Node('R');
let W2 = new Node('W');
let T2 = new Node('T');

graph6.addVertices([S2, P2, U2, X2, Q2, Y2, V2, R2, W2, T2]);

graph6.addEdge(S2, P2);
graph6.addEdge(S2, U2);

graph6.addEdge(P2, X2);
graph6.addEdge(U2, X2);

graph6.addEdge(P2, Q2);
graph6.addEdge(U2, V2);

graph6.addEdge(X2, Q2);
graph6.addEdge(X2, Y2);
graph6.addEdge(X2, V2);

graph6.addEdge(Q2, R2);
graph6.addEdge(Y2, R2);

graph6.addEdge(Y2, W2);
graph6.addEdge(V2, W2);

graph6.addEdge(R2, T2);
graph6.addEdge(W2, T2);

console.log("BFS result:", graph6.breadthFirstSearch(S2)); 