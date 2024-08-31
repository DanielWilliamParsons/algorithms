/**
 * Binary Search Trees:
 * Each node has zero, one or two children
 * A node's left descendent must be less than the node
 * A node's right descendent must be more than the node
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
            }

        };
    };

    const binarySearchTree = (firstNode) => {
        let _firstNode = firstNode;
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
console.log(binarySearchTree);
console.log(binarySearchTree.search(95).getValue());

