/* Practicing creating stacks */
/* Build this as an immediately invoked function */
const stackModule = (() => {
    'use strict';

    const stack = () => {
        let _array = [];

        return {
            popStack: () => {
                if (_array.length - 1 >= 0){
                    _array.length = _array.length - 1;
                }
                
            },

            pushStack: (val) => {
                if (val !== undefined){
                    _array[_array.length] = val;
                }
                
            },

            getStackTop: () => {
                if (_array.length){
                    return _array[_array.length-1];
                } else {
                    return undefined;
                }
                
            }
        }
    }
    return stack;

})();
const myStack = stackModule();
myStack.pushStack(1);
myStack.pushStack(2);
myStack.pushStack(3);
myStack.pushStack(4);
console.log(myStack.getStackTop());
myStack.popStack();
console.log(myStack.getStackTop());
myStack.popStack();
console.log(myStack.getStackTop());
myStack.popStack();
console.log(myStack.getStackTop());
myStack.popStack();
console.log(myStack.getStackTop());