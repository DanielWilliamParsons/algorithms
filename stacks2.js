
const stacksNodeModule = (() => {
    const stack = () => {
        let _top = null;

        const createNode = (value) => {
            return {
                value: value,
                next: null,
            };
        }

        return {
            popTop: () => {
                if (_top === null){
                    return undefined;
                }
                const value = _top.value;
                _top = _top.next // Mode top to the next node
                return value;
            },

            pushTop: (val) => {
                const newNode = createNode(val); 
                newNode.next = _top; // Point the new node to the current top
                _top = newNode; // Update the top to the new node
            },

            getTop: () => {
                return [_top, _top.value];
            }
        }
    }
    return stack;
})();

const myStack = stacksNodeModule();
myStack.pushTop(1);
myStack.pushTop(2);
myStack.pushTop(3);
console.log(myStack.getTop());