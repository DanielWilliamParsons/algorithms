/**
 * Bubble Sort with recursion
 * 
 * Lay your unsorted cards on the table.
 * Point to the first two cards on the left.
 *      If they are out of order, swap them.
 * Shift your fingers along by one card.
 *      If they are out of order, swap them.
 * Do this until your fingers reach the end of the line of cards
 * The last card is definitely in the right place
 * Then send your fingers back and repeat, but this time, stop on the second to last card.
 * Repeat, stopping one card less each time.
 * By the time of the final pass through with your fingers, there will only be one check left.
 * and the cards will then be in order.
 * 
 * Time complexity is O(N^2) because there are N-1 + N-2 + N-3 + ... + 1 checks
 * and in the worst case, the same number of swaps.
 */

const bubbleSortModule = () => {

    const compare = (a, b) => {
        if (a > b) {
            return true;
        }

        if (a <= b) {
            return false;
        }
    }

    const bubbleSort = (myArray, length = myArray.length - 1) => { 
        // Handle the base case
        if (length === 1) {
            if(compare(myArray[0], myArray[1])) {
                let tmp = myArray[0]
                myArray[0] = myArray[1];
                myArray[1] = tmp;
            }
            return myArray;
        }

        // Handle recursions
        for (let i = 0; i < length; i++) {
            let j = i + 1;
            if(compare(myArray[i], myArray[j])) {
                let tmp = myArray[i]
                myArray[i] = myArray[j];
                myArray[j] = tmp;
            }

            if(j === length) {
                return bubbleSort(myArray, length-1);
            }
        }
    }

    return (bubbleSort)
}

let anArray = [4, 2, 7, 1, 3];
let bubbleSort = bubbleSortModule();
let sortedArray = bubbleSort(anArray);
console.log(sortedArray);