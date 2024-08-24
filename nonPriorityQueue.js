
/* Non-priority queue */
// Has a first-in-first-out policy
// Data can only be appended to the end and removed from the beginning
// If we use an array, it takes O(1) to insert at the end and O(N) to delete from the beginning
// because all the items have to shift one back
// However, with a doubly-linked list, we can insert at the end and delete
// from the beginning both in O(1) time. So, linked-lists are perfect for
// the queue's underlying data structure.

const nonPriorityQueueModule = (() => {

    const node = (data) => {
        let _data = data;
        // Keep track of next node and previous node so the linked list is
        // aware of what came before and what comes after
        let _nextNode;
        let _previousNode;

        return {
            setData: (data) => {
                _data = data;
            },

            getNodeData: () => {
                return _data;
            },

            setNextNode: (nextNode) => {
                _nextNode = nextNode;
            },

            getNextNode: () => {
                return _nextNode;
            },

            setPreviousNode: (previousNode) => {
                _previousNode = previousNode;
            },

            getPreviousNode: () => {
                return _previousNode;
            }
        }
    }

    const doublyLinkedList = (firstNode = null, lastNode = null) => {
        // Keep track of the first and last nodes
        let _firstNode = firstNode;
        let _lastNode = lastNode;

        return {
            insertAtEnd: (value) => {
                let newNode = node(value);

                // If there are no elements yet in the linked list
                if (!_firstNode) {
                    _firstNode = newNode;
                    _lastNode = newNode;
                } else {
                    // If the linked list already has at least one node.
                    newNode.setPreviousNode(_lastNode);
                    _lastNode.setNextNode(newNode);
                    _lastNode = newNode;
                }
            },

            removeFromFront: () => {
                let removedNode = _firstNode;
                _firstNode = _firstNode.getNextNode();
                return removedNode;
            },

            getFirstNode: () => {
                return _firstNode;
            }
        }
    }

    const nonPriorityQueue = () => {
        let _queue = doublyLinkedList();

        return {
            enqueue: (element) => {
                _queue.insertAtEnd(element);
            },

            dequeue: () => {
                if(!_queue.getFirstNode()){
                    return null;
                }
                let removedNode = _queue.removeFromFront();
                return removedNode.getNodeData();
            },

            read: () => {
                if(!_queue.getFirstNode()){
                    return null;
                } else {
                    return _queue.getFirstNode().getNodeData();
                }
            }
        }
    }

    return { node, doublyLinkedList, nonPriorityQueue };

})();

let myQueue = nonPriorityQueueModule.nonPriorityQueue();
myQueue.enqueue(1);
myQueue.enqueue(2);
myQueue.enqueue(3);
myQueue.enqueue(4);
console.log(myQueue);
console.log(myQueue.read());
console.log(myQueue.dequeue());
console.log(myQueue.dequeue());
console.log(myQueue.dequeue());
console.log(myQueue.dequeue());
console.log(myQueue.dequeue());
console.log(myQueue.dequeue());
console.log(myQueue.dequeue());
console.log(myQueue.dequeue());
console.log(myQueue.dequeue());
myQueue.enqueue(1);
myQueue.enqueue(2);
myQueue.enqueue(3);
myQueue.enqueue(4);
console.log(myQueue.read());
console.log(myQueue.dequeue());
console.log(myQueue.read());
console.log(myQueue.dequeue());
myQueue.enqueue(5);
myQueue.enqueue(6);
console.log(myQueue.read());
console.log(myQueue.dequeue());
console.log(myQueue.read());
console.log(myQueue.dequeue());
console.log(myQueue.read());
