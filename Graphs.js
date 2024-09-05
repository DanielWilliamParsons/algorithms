/**
 * Graphs, object-orientated implementation
 */

class Node {
    constructor(value) {
        this.value = value;
        this.nextNode;
    }

    getNode() {
        return this.value;
    }

    getNextNode() {
        return this.nextNode;
    }

    setNextNode(aNode) {
        this.nextNode = aNode;
    }
}

class Queue {
    firstItem;
    constructor() {
        
    }

    getLastItem(aNode) {
        if(aNode.getNextNode() === undefined){
            return aNode;
        } else {
            let newNode = aNode.getNextNode();
            return this.getLastItem(newNode);
        }
    }

    enqueue(item) {
        let aNode = new Node(item);
        if (!this.firstItem) {
            this.firstItem = aNode;
        } else {
            this.getLastItem(this.firstItem).setNextNode(aNode);
        }
    }

    dequeue() {
        if(this.firstItem === undefined) {
            return undefined;
        }
        let itemToReturn = this.firstItem;
        this.firstItem = this.firstItem.getNextNode();
        return itemToReturn.getNode();
    }

    isEmpty() {
        if (this.firstItem === undefined) {
            return true;
        }
        return false;
    }

    readAllItems(allItems = [], anItem = this.firstItem) {
        if(this.firstItem !== undefined) {
            allItems.push(anItem.getNode());
            if (anItem.getNextNode() !== undefined) {
                return this.readAllItems(allItems, anItem.getNextNode());
            }
        }
        return allItems;
    }
}

class Vertex {
    constructor(value) {
        this.value = value;
        this.adjacentVertices = [];
        this.searchTracker = new Map();
        this.queueMaker;
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

    getAdjacentVertices() {
        return this.adjacentVertices;
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
                    return adjacentVertex.depthFirstSearch(searchValue, tracker);
                } 
            }
        }
    }

    /**
     * Breadth-First Search
     * 1. Start at any vertex - startingVertex
     * 2. Add starting vertex to tracker hash table.
     * 3. Add starting vertex to a queue.
     * 4. Start a loop that runs while the queue isn't empty
     * 5. Within this loop, remove the first vertex from the queue - currentVertex
     * 6. Iterate over all adjacent vertices of current vertex
     * 7. If adjacent vertex was already visited, ignore it.
     * 8. It the adjacent vertex has not yet been visited, mark it as visited
     *    by adding it to the hash table and add it to the queue
     * 9. Repeat this loop (from step 4) until queue is empty.
     */

    traverseVertices2(queue = new Queue(), tracker = this.searchTracker) {
        queue.enqueue(this);
        tracker.set(this.getValue(), true);
        while (!queue.isEmpty()) {
            let vertex = queue.dequeue();
            for (let adjacentVertex of vertex.getAdjacentVertices()) {
                if (!tracker.has(adjacentVertex.getValue())) {
                    queue.enqueue(adjacentVertex);
                    tracker.set(adjacentVertex.getValue(), true);
                }
            }
        }
        return tracker;
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
// console.log(alice.traverseVertices());
// console.log(alice.depthFirstSearch("dominic"));
// console.log(dominic.traverseVertices());
console.log(dominic.traverseVertices2());

// let myQ = new Queue();
// myQ.enqueue(alice);
// myQ.enqueue(bob);
// console.log(myQ);
// console.log(myQ.dequeue());
// console.log(myQ.readAllItems());
// console.log(myQ.dequeue());
// console.log(myQ.dequeue());
