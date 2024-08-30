/** Queue with a double-linked list
 * 
 */

const queueModule = (() => {

    const node = (data, nextNode = null, previousNode = null) => {
        const _data = data;
        let _nextNode = nextNode;
        let _previousNode = previousNode;

        return {
            getNodeData: () => {
                return _data;
            },

            addNextNode: (nextNode) => {
                _nextNode = nextNode;
            },

            addPreviousNode: (previousNode) => {
                _previousNode = previousNode;
            },

            getNextNode: () => {
                if(!_nextNode){
                    return "";
                }
                return _nextNode;
            },

            getPreviousNode: () => {
                return _previousNode;
            },

            printNode: () => {
                return [_data];
            }
        }
    };

    const doublyLinkedList = (firstNode = null, lastNode = null) => {
        let _firstNode = firstNode;
        let _lastNode = lastNode;
        let _listSize = 0;

        return {
            // Read - provide an index and return its value, worst case: O(N)
            read: (index) => {
                let currentNode = _firstNode;
                let currentIndex = 0;
                while (currentIndex < index) {
                    currentNode = currentNode.getNextNode();
                    currentIndex += 1;
                    if(!currentNode) {
                        return undefined;
                    }
                }
                return currentNode.getNodeData();
            },

            // Search - provide a value and return its index
            indexOf: (value) => {
                let currentNode = _firstNode;
                let currentIndex = 0;
                while (currentNode) {
                    if(currentNode.getNodeData() === value) {
                        return currentIndex;
                    }
                    currentNode = currentNode.getNextNode();
                    currentIndex += 1;
                }
            },

            // insert at end - because it is a queue
            insertAtEnd: (value) => {
                let newNode = node(value);

                // If there are no elements in the linked list yet
                if (!_firstNode) {
                    _firstNode = newNode;
                    _lastNode = newNode;
                    _listSize++;
                } else {
                    // The linked list already has at least one node
                    newNode.addPreviousNode(_lastNode);
                    _lastNode.addNextNode(newNode);
                    _lastNode = newNode;
                    _listSize++;
                }
            },

            // remove from the front
            removeFromFront: () => {
                let removedNode = _firstNode;
                
                if(_listSize === 0){
                    return "Out of bounds - empty queue.";
                }

                _firstNode = _firstNode.getNextNode();
                _listSize--;
                return removedNode.getNodeData();
                
                
            }

        }
    };

    const queue = () => {
        let _data = doublyLinkedList();

        return {

            enqueue: (element) => {
                _data.insertAtEnd(element);
            },

            dequeue: (element) => {
                let removedNode = _data.removeFromFront();
                return removedNode;
            },

            read: () => {
                if(!_data.read()) {
                    return null;
                }
                return _data.read();
            }

        }
    };

    return { node, doublyLinkedList, queue };

})();

let queue = queueModule.queue();
queue.enqueue("Hello");
queue.enqueue("there");
queue.enqueue("how");
queue.enqueue("are");
queue.enqueue("you");
queue.enqueue("doing");
console.log(queue.dequeue());
console.log(queue.dequeue());
console.log(queue.dequeue());
console.log(queue.dequeue());
console.log(queue.dequeue());
console.log(queue.dequeue());
console.log(queue.dequeue());
console.log(queue.dequeue());
console.log(queue.dequeue());
console.log(queue.dequeue());
console.log(queue.dequeue());