/**
 * SELECTION SORT RECURSION VERSION
 * 
 * Imagine laying out number cards at random on the table.
 * Place one hand on the leftmost card.
 * Scan right and look for the card with the lowest number.
 * Then swap the leftmost card with the lowest number card.
 * Move your hand to the next card from the left and repeat the scan and swap.
 * Do this until we reach the end of the row of cards.
 * After this, they should be sorted.
 */

const selectionSortModule = () => {

    const selectionSort = (array, start=0) => {

        if (start === array.length-1) {
            return array;
        }

        let lowest = start;
        for (let i = start; i < array.length; i++) {
            if (array[i] < array[lowest]) {
                lowest = i;
            }

            if (i === array.length - 1) {
                let tmp = array[start];
                array[start] = array[lowest];
                array[lowest] = tmp;
                return selectionSort(array, start+1);
            }
        }

    }
    return (selectionSort);
}

let myArray = [4, 2, 7, 1, 3]
const selectionSort = selectionSortModule();
let sortedArray = selectionSort(myArray);
console.log(sortedArray);