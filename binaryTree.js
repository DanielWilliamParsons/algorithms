/**
 * Binary Search Trees:
 * Each node has zero, one or two children
 * A node's left descendent must be less than the node
 * A node's right descendent must be more than the node
 * 
 * If we insert data in order, then it takes O(N) to traverse the tree
 * because the tree will be unbalanced, i.e., we will have everything on the right child
 * However, if we insert at random the tree will be more balanced
 * and traversing will only be O(logN)
 */

const binarySearchTreeModule = (() => {

    const treeNode = (val, left = undefined, right = undefined) => {
        let value = val;
        let leftChild = left;
        let rightChild = right;

        return {
            getValue: () => {
                return value;
            },

            getLeftChild: () => {
                return leftChild;
            },

            getRightChild: () => {
                return rightChild;
            },
            
            setValue: (val) => {
                value = val;
            },

            setLeftChild: (node) => {
                leftChild = node;
            },
            
            setRightChild: (node) => {
                rightChild = node;
            }

        };
    };

    const binarySearchTree = (firstNode) => {
        let _firstNode = firstNode;
        let _arrayOfNodeValues = [];
        return {
            search: function(searchValue, node = _firstNode) {
                // Base case
                if (node === undefined || node.getValue() === searchValue) {
                    return node;
                } else if (searchValue < node.getValue()) {
                    return this.search(searchValue, node.getLeftChild());
                } else {
                    return this.search(searchValue, node.getRightChild());
                }
            },

            readValues: function(node = _firstNode) {
                if (node !== undefined) {
                    if (node.getLeftChild() !== undefined) {
                        this.readValues(node.getLeftChild()); // Traverse the left subtree
                    }
                    _arrayOfNodeValues.push(node.getValue());
                    if (node.getRightChild() !== undefined) {
                        this.readValues(node.getRightChild()); // Traverse the right subtree.
                    }
                }
            },

            getTreeValues: function() {
                _arrayOfNodeValues = [];
                this.readValues();
                return _arrayOfNodeValues;
            },

            insert: function(value, node = _firstNode) {

                // The value should be on the left
                if (value < node.getValue()) {
                    
                    if (node.getLeftChild() === undefined) {
                        // Create a new node if there is no left child
                        let newNode = treeNode(value);
                        node.setLeftChild(newNode);
                    } else {
                        // There is a left child so we need to search again
                        this.insert(value, node.getLeftChild());
                    }

                } else if (value > node.getValue()) {

                    if (node.getRightChild() === undefined) {
                        // Create a new node if there is no right child
                        let newNode = treeNode(value);
                        node.setRightChild(newNode);
                    } else {
                        // There is a right child so we need to search again
                        this.insert(value, node.getRightChild());
                    }
                }
            },

            /**
             * DELETE ALGORITHM
             * 1. If the node being deleted has no children, simply delete it
             * 2. If the node being deleted has one child, delete the node and
             *    plug the child into the spot where the deleted node was.
             * 3. When deleting a node with two children, replace the deleted node
             *    with the successor node. The successor node is the child node 
             *    whose value is the least of all values that are greater than 
             *    the deleted code
             * 4. To find the successor node, visit the right child of the
             *    deleted value, and then keep on visiting the left child of each
             *    subsequent child until there are no more left children. The
             *    bottom value is the successor node.
             * 5. If the successor node has a right child, after plugging the
             *    successor node into the spot of the deleted node, take the former
             *    right child of the successor node and turn it into the left child
             *    of the former parent of the successor node.
             */
            delete: function(value, node = _firstNode) {

                // Base case - nothing found yet and no children, so set the node to undefined
                // The strategy in this algorithm is to return an undefined node at a particular place
                if (node === undefined) {
                    return undefined;

                } else if (value < node.getValue()) {
                    // We are searching the nodes to find our value - we haven't found it on the left yet
                    node.setLeftChild(this.delete(value, node.getLeftChild()));
                    return node;

                } else if (value > node.getValue()) {
                    // We are still searching the nodes to find our value - we haven't found it on the right yet
                    node.setRightChild(this.delete(value, node.getRightChild()));
                    return node;

                } else if (value === node.getValue()) {
                    // We have found the node we wish to delete
                    // This is the key section where deletion occurs

                    if (node.getLeftChild() === undefined) {
                        // Has no left node
                        return node.getRightChild(); // this will be undefined and sent back up the stack to either setLeftChild or setRightChild on the parent node

                    } else if (node.getRightChild() === undefined) {
                        // Has no right node
                        return node.getLeftChild(); // this will be undefined and sent back up the stack to either setLeftChild or setRightChild on the parent node

                    } else  {
                        // Has both right and left nodes
                        node.setRightChild(this.lift(node.getRightChild(), node));
                        return node;
                    }
                }
            },

            lift: function(node, nodeToDelete) {
                // If the rightChild node of the node we wish to delete has a left child
                // recursively call this function to continue down
                // the left subtree to find the successor node
                if (node.getLeftChild()) {
                    node.setLeftChild(this.lift(node.getLeftChild(), nodeToDelete));
                    return node
                } else {
                    // If the rightChild node has no left child, that means this
                    // rightChild node (the current node of this function) is the successor node, and we
                    // take its value and make it the new value of the node that
                    // we're deleting.
                    nodeToDelete.setValue(node.getValue());
                    // We return the successor node's right child to be now used
                    // as its parent's left child.
                    return node.getRightChild();
                }
            }
        }
    }

    return { treeNode, binarySearchTree }

})();


let node8 = binarySearchTreeModule.treeNode(4);
let node9 = binarySearchTreeModule.treeNode(11);
let node4 = binarySearchTreeModule.treeNode(10, node8, node9);

let node10 = binarySearchTreeModule.treeNode(30);
let node11 = binarySearchTreeModule.treeNode(40);
let node5 = binarySearchTreeModule.treeNode(33, node10, node11);
let node2 = binarySearchTreeModule.treeNode(25, node4, node5);

let node12 = binarySearchTreeModule.treeNode(52);
let node13 = binarySearchTreeModule.treeNode(61);
let node6 = binarySearchTreeModule.treeNode(56, node12, node13);
let node14 = binarySearchTreeModule.treeNode(82);
let node15 = binarySearchTreeModule.treeNode(95);
let node7 = binarySearchTreeModule.treeNode(89, node14, node15);
let node3 = binarySearchTreeModule.treeNode(75, node6, node7);

let node1 = binarySearchTreeModule.treeNode(50, node2, node3);

let binarySearchTree = binarySearchTreeModule.binarySearchTree(node1);
console.log(binarySearchTree.search(95).getValue());

binarySearchTree.insert(19);
binarySearchTree.insert(15);
binarySearchTree.insert(4);
binarySearchTree.insert(4);
console.log(binarySearchTree.getTreeValues());
binarySearchTree.delete(14);
console.log(binarySearchTree.getTreeValues());

