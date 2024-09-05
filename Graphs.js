/**
 * Graphs, object-orientated implementation
 */

class Vertex {
    constructor(value) {
        this.value = value;
        this.adjacentVertices = [];
        this.searchTracker = new Map();
    }

    // Directed graph
    // addAdjacentVertex(vertex) {
    //     this.adjacentVertices.push(vertex);
    // }

    // Undirected graph
    addAdjacentVertex(vertex) {
        if(this.adjacentVertices.includes(vertex)){
            console.log("Not adding", vertex.getValue(), "to", this.getValue());
            return;
        }
        console.log("Adding", vertex.getValue(), "to", this.getValue());
        this.adjacentVertices.push(vertex);
        vertex.addAdjacentVertex(this);
    }

    getValue() {
        return this.value;
    }

    /**
     * Searching for a particular vertex
        This means finding both the vertex and the vertices it is connected with
        Depth-First Search can traverse the graph.
        Be careful - can end up in infinite loops in connected graphs.
        Each time we visit a vertex, add a key to a hash table to keep track of it.
        1. Start at any random vertex within the graph.
        2. Add the current vertex to the hash table to mark it as having been visited
        3. Iterate through the current vertex's adjacent vertices.
        4. For each adjacent vertex, if the adjacent vertex has already been visited, ignore it.
        5. If the adjacent vertex has not yet been visited, recursively perform depth-first search on that vertex.
     */

    traverseVertices(tracker = this.searchTracker) {

        tracker.set(this.getValue(), true);

        for (let adjacentVertex of this.adjacentVertices) {
            if(!tracker.has(adjacentVertex.getValue())) {
                adjacentVertex.traverseVertices(tracker);
            }
        }
        return tracker;
    }

    depthFirstSearch(searchValue, tracker=this.searchTracker) {
        
        if(this.getValue() === searchValue){
            return this;
        }

        tracker.set(this.getValue(), true);

        for (let adjacentVertex of this.adjacentVertices) {
            if (!tracker.has(adjacentVertex.getValue())) {
                if (adjacentVertex.getValue() === searchValue) {
                    return adjacentVertex;
                } else {
                    adjacentVertex.depthFirstSearch(searchValue, tracker);
                } 
            }
        }

    }

     
}

let alice = new Vertex("alice");
let bob = new Vertex("bob");
let cynthia = new Vertex("cynthia");
let jane = new Vertex("jane");
let dominic = new Vertex("dominic");

alice.addAdjacentVertex(bob);
alice.addAdjacentVertex(cynthia);
bob.addAdjacentVertex(cynthia);
cynthia.addAdjacentVertex(jane);
bob.addAdjacentVertex(dominic);
jane.addAdjacentVertex(dominic);
//console.log(alice.traverseVertices());
console.log(bob.depthFirstSearch("dominic"))
// console.log(dominic.traverseVertices());