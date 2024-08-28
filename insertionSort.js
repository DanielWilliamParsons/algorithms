
/* Insertion Sort */

/**
 * Performance of insertion sort:
 * COMPARISON
 * When we compare item at index j, we compare every value to the left down to index 0
 * Worst case - the array is reverse-sorted, so we must compare everything
 * Worst case - first pass 1 comparison is made; second pass 2 comparisons, third pass 3 comparison, and n-1th pass is n-1 comparisons
 * Worst case - total number of comparisons is 1 + 2 + 3 + ... + n-1
 * Worst case - this is a total of approximately n^2/2 comparisons.
 * 
 * SHIFTS
 * Worst-case - there are as many shifts as comparison, so n^2 / 2 shifts
 * 
 * REMOVE / INSERT tempStore
 * Remove and insert the tempStore occurs once per pass through and there are n-1 passes
 * Remove happens once and insert happens once each time, so n - 1 + n - 1
 * TOTAL TIME IN WORST CASE
 * (n^2 / 2) + (n^2 / 2) + (2n-2)
 * Therefore, O(n^2) worst case time complexity
 * 
 * AVERAGE CASE
 * In the worst case, we must shift all the data
 * In the best case, we shift none of the data
 * In the average case, we shift about half the data - therefore O(n^2) 
 * 
 */
const insertionSortModule = (() => {

    const compare = (a, b) => {
        if (a > b) {
            return true;
        }

        return false;
    }

    const insertionSort = () => {

        return {
            sortNums: (numsArray) => {
                let j = 1;
                // Start the index at 1
                while(j < numsArray.length){
                    console.log(numsArray);
                    let i = j - 1;
                    let tempStore = numsArray[j];
                    while(i !== -1) {
                        if (compare(numsArray[i], tempStore) === true){
                            // numsArray[i] is bigger than tempStore, so shift
                            // the value of numsArray[i] up to numsArray[i+1]
                            numsArray[i+1] = numsArray[i];
                            i--;
                        } else {
                            break;
                        }
                    }
                    numsArray[i+1] = tempStore; // why [i+1]? Because i got decremented before breaking out of the loop.
                    j++;
                }

                return numsArray;
            },
        }
    }

    return { insertionSort }

})();

let myArray = [6, 5, 2, 5, 1, 7, 5, 3, 8, 5, 7, 10, 9, 3, 5];
let insertionSort = insertionSortModule.insertionSort();
console.log(insertionSort.sortNums(myArray));