/**
 * INSERTION SORT RECURSION
 * 
 * Lay out some cards at random with numbers on.
 * Place a hand at the second card from the left and push it up.
 *      Compare it to its card on the left. If the card on the left is larger than swap them else insert the up card down again into the row.
 * Move your hand to the third card from the left.
 *      Compare it to its card on the left. If the card on the left is larger then swap, else shift the left card one place to the right.
 *      Then compare the next card to the left until all the cards to the left are finished being compared or the up card is smaller.
 *      Insert the up card into the empty slot
 * Repeat this for the next card in the row
 */

const insertionSortModule = () => {
    const compare = (a, b) => {
        if (a > b) { 
            return true;
        }
        return false;
    }

    const insertionSort = (array, start = 1) => {

        let tmp = array[start];
        let i = start;
        while(i >= 0) {
            
            if (compare(array[i-1], tmp)) {
                // Shift across and insert
                array[i] = array[i-1];
                //array[i-1] = tmp;
            } else {
                // insert out and break the loop
                array[i] = tmp;
                i = 0; // so we break out of the loop after inserting.
            }
            i--;
        }

        if (start === array.length - 1) {
            return array;
        }

        return insertionSort(array, start+1);
    }

    return (insertionSort)

}

let myArray = [4, 2, 7, 1, 3];
let insertionSort = insertionSortModule();
let sortedArray = insertionSort(myArray);
console.log(sortedArray);