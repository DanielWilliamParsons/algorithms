/**
 * MAX HEAPS
 * Conditions:
 * 1. Max Heap condition: The value of each node must be greater than each of its descendant nodes
 *  This is different from a tree in which the right child should be greater than the node
 * 2. The tree must be complete.
 * 
 * Properties
 * Heaps are weakly ordered compared to binary trees
 * Root node has the greatest value - this is good for priority queues because we always want to access the most important value.
 * Primary operations are inserting and deleting
 * Last node - the right most node in the bottom level.
 * 
 * HEAP INSERTION
 * 1. Create a node and insert next to the last node - it becomes the last node
 *    THEN *Bubble-Up* or *Trickle-Up* the node.
 * 2. Compare this new last node with parent node
 * 3. If the new node is greater than the parent, swap them.
 * 4. Repeat step 3 until it has a parent whose value is smaller than it
 * 
 * TIME COMPLEXITY OF HEAP INSERTION
 * Since at most we bubble up / trickle up to the top level, this takes at most O(log N) time.
 * 
 * HEAP DELETION
 * We only ever delete the root node if we are implementing a priority queue
 * 1. Move the last node into where the root node was, effectively removing the original root node.
 * 2. Trickle (Bubble) down the root node into its proper place.
 *      2.1. Check both the children and node to trickle and see which one is larger
 *      2.2. If the node to trickle is smaller than the children, swap with the larger of the two
 *      2.3. Repeat until the node to trickle has no children who are greater than it.
 * 
 * TIME COMPLEXITY OF HEAP DELETION
 * Since we only have to trickle down from the top to possibly the bottom level, this is also O(logN) time.
 * 
 * PRIORITY QUEUE IMPLEMENTED WITH HEAP COMPARED WITH ORDERED ARRAY
 *           Ordered array    Heap
 * Insertion    O(N)        O(log N)
 * Deletion     O(1)        O(log N)
 * or in language:
 *           Ordered array        Heap
 * Insertion    slow            very fast
 * Deletion  extremely fast     very fast
 * 
 * We want our priority queue to perform insertions and deletions quickly
 * since they will perform insertion and deletion roughly equally often.
 * If one of them is slow, then it reduces the efficiency of the queue overall.
 * 
 * THE PROBLEM OF THE LAST NODE
 * We could insert a new node anywhere. BUT, this potentially makes the heap incomplete.
 * If it is incomplete, then it is not well-balanced, i.e., O(log N) could grow to O(N) because we are
 * increasing the number of rows over which we must bubble up or bubble down until the tree is essentially a row.
 * The best way to find the last node is to implement heaps as arrays!!!!!!!!!!!!!!!!!!!!!!!
 * The last node will always be the final element of the array.
 * All nodes in the array are assigned indices of the array and can be accessed through multiples of 2.
 * leftChild = (index * 2) + 1; rightChild = (index * 2) + 2
 * These allow us to treat out array as a tree.
 */

class Heap {

    constructor() {
        this.data = [];
    }

    getRootNode() {
        return this.data[0];
    }

    getLastNode() {
        return this.data[this.data.length - 1];
    }

    leftChildIndex(index) {
        let leftChild = (index * 2) + 1;
        if(this.data[leftChild] !== undefined) {
            return leftChild;
        } else {
            return undefined;
        }
    }

    rightChildIndex(index) {
        let rightChild = (index * 2) + 2;
        if(this.data[rightChild] !== undefined) {
            return rightChild;
        } else {
            return undefined;
        }
    }

    parentIndex(index) {
        let parentIndex = Math.floor((index - 1) / 2);
        return parentIndex;
    }

    insert(value) {
        this.data.push(value); // Our data is now the last node
        let newNodeIndex = this.data.length - 1;
        // If the new node is not in the root position and it's greater than its parent node:
        while (newNodeIndex > 0 && this.data[newNodeIndex] > this.data[this.parentIndex(newNodeIndex)]) {
            // swap the new node with the parent node.
            let tmp = this.data[newNodeIndex];
            this.data[newNodeIndex] = this.data[this.parentIndex(newNodeIndex)];
            this.data[this.parentIndex(newNodeIndex)] = tmp;

            // Update the index of the new node
            newNodeIndex = this.parentIndex(newNodeIndex);
        }
    }

    delete() {
        // This will be returned at the end since it is to be deleted as a priority queue
        let valueToDelete = this.getRootNode();

        // Pop the last node into the root node
        this.data[0] = this.data.pop(); // This is now the node to trickle down
        bubbleDownIndex = 0; // keep track of this index
        while (this.hasGreaterChild(bubbleDownIndex)) {
            largerChildIndex = this.calculateLargerChildIndex(bubbleDownIndex);
        }
    }

    hasGreaterChild(index) {
        // Here we are checking whether one of the child nodes is greater than the parent node
        return this.data[this.leftChildIndex(index)] && this.data[this.leftChildIndex(index)] > this.data[index] ||
            this.data[this.rightChildIndex(index)] && this.data[this.rightChildIndex(index)] > this.data[index]
    }

    largerChildIndex(index) {
        // Return the index of the child which has the larger value

        if (!this.data[this.rightChildIndex(index)]) {
            return this.leftChildIndex(index);
        }

        // if right child value is greater than left child value
        if (this.data[this.rightChildIndex(index)] > this.data[this.leftChildIndex(index)]) {
            return this.rightChildIndex(index);
        } else {
            return this.leftChildIndex(index);
        }
    }

    viewHeap() {
        console.log(this.data);
    }
}

let myHeap = new Heap();
myHeap.insert(3);
myHeap.viewHeap();
myHeap.insert(10);
myHeap.viewHeap();
myHeap.insert(19);
myHeap.viewHeap();
myHeap.insert(1);
myHeap.viewHeap();
myHeap.insert(12);
myHeap.viewHeap();
myHeap.insert(22);
myHeap.viewHeap();
myHeap.insert(13);
myHeap.viewHeap();
myHeap.insert(6);
myHeap.viewHeap();
myHeap.insert(45);
myHeap.viewHeap();
myHeap.insert(35);
myHeap.viewHeap();
myHeap.insert(12);
myHeap.viewHeap();
myHeap.insert(19);
myHeap.viewHeap();
myHeap.insert(8);
myHeap.viewHeap();
myHeap.insert(7);
myHeap.viewHeap();
myHeap.insert(1);





