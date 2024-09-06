/**
 * Attempt to program an automaton
 * 
 */

class SimpleAutomaton {
    acceptingState = 1;
    constructor() {
        this.state = 0; // States can only be 1 or 0
    }

    // If the final state is 1, accept the string (return true).
    // If the final state is 0, reject the string (return false)
    determineString(aString) {
        for(let char of aString) {
            if(char === 'a' || char === 'b') {
                this.transitionFunction(char);
            } else {
                // Catch any other strings
                return false;
            }
            
        }
        return this.acceptingState === this.state
    }

    transitionFunction(aChar){
        if(aChar === 'a' && this.state === 0){
            this.state = 1;
        } else {
            this.state = 0;
        }
        // We don't need to specify each false case since they are all false.
        // } else if(aChar === 'a' && this.state === 1) {
        //     this.state = 0;
        // } else if(aChar === 'b' && (this.state === 0 || this.state === 1)){
        //     this.state = 0;
        // }
    }
}

let automaton = new SimpleAutomaton();
let inputString1 = "abbaa";
let inputString2 = "abaaa";
let inputString3 = "abbba";
let inputString4 = "abababc";
console.log(automaton.determineString(inputString1)); // false - reject the string
console.log(automaton.determineString(inputString2)); // true - accept the string
console.log(automaton.determineString(inputString3)); // true - accept the string
console.log(automaton.determineString(inputString4)); // false - accept the string