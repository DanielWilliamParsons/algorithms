/**
 * TRIES
 * The root node is a TrieNode. It has a Map property containing keys and values
 * Each value is itself a TrieNode
 * 
 * search is O(1)
 * insert is O(K) where K is the length of our word
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

    getChild() {
        return this.children;
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
        aNode.setChildValue('*', undefined);
    }

    searchWord(aWord, aNode=this.root) {
        for (let char of aWord) {
            if (aNode.has(char)) {
                console.log(char);
                aNode = aNode.getChildren(char);
            } else {
                return undefined;
            }
        }
        return (aNode); // returns the final node - useful later for autocomplete
    }

    collectAllWords(words=[], node=this.root, word="") {
        // The first parameter, words, begins an empty array and will contain all the words
        // node is the node whose descendants we are collecting words from.
        // word begins as an empty string and we add characters to it.

        let currentNode = node;

        for (const [char, childTrieNode] of currentNode.getChild().entries()) {
            
            if (char === "*") {
                words.push(word)
            } else {
                this.collectAllWords(words, childTrieNode, word + char);
            }

        }

        return words;
    }

    autoComplete(prefix) {
        let currentNode = this.searchWord(prefix);
        if(currentNode === undefined) {
            return undefined;
        }
        return this.collectAllWords([], currentNode);
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
console.log("---Collecting all the words---");
console.log(tryme.collectAllWords());
console.log("---AutoComplete---")
console.log(tryme.autoComplete("H"));
console.log(tryme.autoComplete("In"));
console.log(tryme.autoComplete("Ho"));
console.log(tryme.autoComplete("Mar"));
console.log(tryme.autoComplete("Marl"));