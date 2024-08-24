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
            }
        }
    }

    const linkedList = (firstNode) => {
        const _firstNode = firstNode;

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
