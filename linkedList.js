/* Linked List */
const linkedListModule = (() => {
    const node = (data, nextNode) => {
        const _data = data;
        let _nextNode = nextNode;

        return {
            printNode: () => {
                return [_data];
            },

            addNextNode: (nextNode) => {
                _nextNode = nextNode;
            },

            getNextNode: () => {
                return _nextNode;
            },

            getNodeData: () => {
                return _data;
            },

            // Uses recursion to print all the nodes
            printNextNode: () => {
                console.log(_data);
                if (_nextNode !== undefined) {
                    _nextNode.printNextNode();
                } else {
                    return;
                }
            },

            // Recursively get the final next node
            getLastNode: () => {
                if(_nextNode.getNextNode() === undefined || _nextNode.getNextNode() === null) {
                    return (_nextNode);
                } else {
                    return _nextNode.getLastNode();
                }
            },

            // Recursively append a node to the final node
            appendToLastNode: (aNewNode) => {
                if(_nextNode === undefined) {
                    _nextNode = aNewNode;
                } else {
                    _nextNode.appendToLastNode(aNewNode);
                }
            }
        }
    }

    const linkedList = (firstNode) => {
        let _firstNode = firstNode;
        let _size = 0;

        return {
            // Read - provide an index and return its value, worst case: O(N)
            read: (index) => {
                // Begin at the first node of the list
                let currentNode = _firstNode;
                let currentIndex = 0;
                while (currentIndex < index) {
                    currentNode = currentNode.getNextNode();
                    currentIndex += 1;
                    if(!currentNode){
                        return undefined;
                    }
                }
                return currentNode.getNodeData();
            },

            // Search - provide a value and return its index
            indexOf: (value) => {
                let currentNode = _firstNode;
                let currentIndex = 0;
                while(currentNode) {
                    if(currentNode.getNodeData() === value) {
                        return currentIndex;
                    }
                    currentNode = currentNode.getNextNode();
                    currentIndex += 1;
                }
                return undefined;
            },

            // Insert - insert an item at a given index
            insertAtIndex: (value, index) => {
                let newNode = node(value);
                // If we are inserting at the beginning of the list
                if(index === 0){
                    newNode.addNextNode = _firstNode;
                    _firstNode = newNode;
                    _size++;
                    return;
                }
                
                // If we are inserting anywhere other than the beginning
                let currentNode = _firstNode;
                let currentIndex = 0;

                // First, access the node immediately before where the new node will go
                while (currentIndex < (index - 1)) {
                    currentNode = currentNode.getNextNode();
                    currentIndex += 1;
                }
                // Have the new node link to the next node
                newNode.addNextNode(currentNode.getNextNode());
                // Modify the link of the previous node to point to our new node
                currentNode.addNextNode(newNode);
                _size++
            },

            // Delete - delete an item at a given index
            deleteAtIndex: (index) => {
                
                if(index === 0){
                    nodeToDelete.addNextNode(null);
                    _firstNode = _firstNode.getNextNode();
                    _size--;

                    return;
                }

                let currentNode = _firstNode;
                let currentIndex = 0;

                // Find the node we want immediately before the node we want to delete
                while(currentIndex < (index - 1)){
                    currentNode = currentNode.getNextNode();
                    currentIndex += 1;
                }

                // Get the node that comes immediately after the node we are deleting
                let nodeAfterDeletedNode = (currentNode.getNextNode()).getNextNode();

                // Get the node to delete so that we can handle any references it has to the next node
                // and allow for javascript garbage collection
                let nodeToDelete = currentNode.getNextNode();
                nodeToDelete.addNextNode(null); // Ensures reference to next node is empty and so garbage collector will remove this item.

                // Add the nodeAfterDeletedNode so the currentNode points to the node after the one we are deleting
                currentNode.addNextNode(nodeAfterDeletedNode);
                // The node we have "deleted" is still somewhere in memory; it has just been deleted
                _size--;
            },

            printAllNodes: () => {
                _firstNode.printNextNode();
            },

            // Use lots of recursion to reverse the list.
            reverseList: () => {
                let previousNode = undefined;
                let currentNode = _firstNode;
                while (currentNode) {
                    let nextNode = currentNode.getNextNode();
                    currentNode.addNextNode(previousNode);
                    previousNode = currentNode;
                    currentNode = nextNode;
                }
                _firstNode = previousNode;
            }
        }
    }

    return { node, linkedList };
    
})();

// --- Create the linked list ---
let node1 = linkedListModule.node("once");
let node2 = linkedListModule.node("upon");
let node3 = linkedListModule.node("a");
let node4 = linkedListModule.node("time");

node1.addNextNode(node2);
node2.addNextNode(node3);
node3.addNextNode(node4);

let list = linkedListModule.linkedList(node1);

// --- Read the items in the linked list ---
console.log("### Read the items in the linked list ###")
console.log(list.read(0)); // once
console.log(list.read(1)); // upon
console.log(list.read(2)); // a
console.log(list.read(3)); // time
console.log(list.read(4)); // undefined

// --- Get the index of a search value in the linked list ---
console.log("### Get the index of a search value in the linked list ###")
console.log(list.indexOf('once')); // 0
console.log(list.indexOf('upon')); // 1
console.log(list.indexOf('a')); // 2
console.log(list.indexOf('time')); // 3
console.log(list.indexOf('hello there!')); // undefined

// --- Add a word at index 3 ---
console.log("### Add a word at index 3 ###");
list.insertAtIndex('short', 3);
console.log(list.read(0)); // once
console.log(list.read(1)); // upon
console.log(list.read(2)); // a
console.log(list.read(3)); // short
console.log(list.read(4)); // time

// --- Delete the word at index 3 ---
console.log("### Delete the word at index 3 ###");
list.deleteAtIndex(3);
console.log(list.read(0)); // once
console.log(list.read(1)); // upon
console.log(list.read(2)); // a
console.log(list.read(3)); // time
console.log(list.read(4)); // undefined

// --- Print all the nodes ---
console.log("### Print all the nodes ###");
list.printAllNodes();

// --- Reverse the list and print to see what happens
console.log("### Reverse the list ###");
list.reverseList();
list.printAllNodes();
