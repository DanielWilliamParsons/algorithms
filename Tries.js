/**
 * TRIES
 * The root node is a TrieNode. It has a Map property containing keys and values
 * Each value is itself a TrieNode
 */

class TrieNode {
    constructor() {
        this.children = new Map();
    }

    has(char) {
        if (this.children.has(char)) {
            return true;
        } else {
            return false;
        }
    }

    getChildren(char) {
        return this.children.get(char);
    }

    setChildValue(key, value) {
        this.children.set(key, value);
    }

}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    addWord(aWord, aNode=this.root) {
        for (let char of aWord) {
            if (aNode.has(char)) {
                aNode = aNode.getChildren(char);
            } else {
                let newNode = new TrieNode();
                aNode.setChildValue(char, newNode);
                aNode = newNode;
            }
        }
        // Add * key at the end
        aNode.setChildValue('*', null);
    }

    searchWord(aWord, aNode=this.root) {
        for (let char of aWord) {
            if (aNode.has(char)) {
                console.log(char);
                aNode = aNode.getChildren(char);
            } else {
                return "Not present!";
            }
        }
        return (aWord);
    }
}

let tryme = new Trie();
tryme.addWord("Hello");
tryme.addWord("Hope");
tryme.addWord("Howdy");
tryme.addWord("Marvelous");
tryme.addWord("Interesting");
console.log(tryme.root);
console.log(tryme.searchWord("Hello"));
console.log(tryme.searchWord("Help"));