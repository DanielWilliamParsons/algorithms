/**
 * PARTITION AND QUICKSORT
 * 
 */

const quicksortModule = (() => {
    let array;

    const partition = (left, right) => {
        let pivotIndex = right;
        let pivot = array[pivotIndex];
        right--; // start the right pointer one to the left of the pivot index

        while (true) {

            while (array[left] < pivot) {
                left++;
            }

            while (array[right] > pivot) {
                right--;
            }

            if (left >= right) {
                // we crossed streams
                break;
            } else {
                // swap elements at left and right
                let tmp = array[left];
                array[left] = array[right];
                array[right] = tmp;
                left++;
            }
        }
        array[pivotIndex] = array[left];
        array[left] = pivot;
        return left;
    }

    const quicksort = (left = 0, right = array.length - 1) => {
        // Base case
        if(right - left <= 0) {
            return;
        }
        let pivotIndex = partition(left, right); // Partition into 2 parts
        quicksort(left, pivotIndex - 1); // Quicksort left side
        quicksort(pivotIndex + 1, right); // Quicksort right side
    }

    const setArray = (myArray) => {
        array = myArray
    }

    const viewArray = () => {
        return array;
    }

    const quickSelect = (kthLowestVal, left = 0, right = array.length - 1) => {
        // Base case
        if (right - left <= 0) {
            return array[left];
        }

        let pivotIndex = partition(left, right);

        if (kthLowestVal < pivotIndex) {
            return quickSelect(kthLowestVal, left, pivotIndex - 1);
        } else if (kthLowestVal > pivotIndex) {
            return quickSelect(kthLowestVal, pivotIndex + 1, right);
        } else {
            return array[pivotIndex];
        }
    }

    return { quicksort, viewArray, setArray, quickSelect }

})();

let myArray = [0, 5, 2, 1, 6, 3];
quicksortModule.setArray(myArray);
quicksortModule.quicksort();
console.log(quicksortModule.viewArray());

let anotherArray = [0, 6, 8, 9, 3, 4, 5, 1, 2, 7];
quicksortModule.setArray(anotherArray);
let thirdLowest = quicksortModule.quickSelect(4); // find the third lowest value, expect 3
console.log(thirdLowest);
console.log(quicksortModule.viewArray());

// Use quicksort to speed up finding a missing number

let missingNumber = [10, 5, 8, 9, 3, 4, 2, 7, 1, 0];

const findMissingNumber = (array) => {
    quicksortModule.setArray(array);
    quicksortModule.quicksort();
    array = quicksortModule.viewArray();
    for(let i = 0; i < array.length; i++) {
        if(array[i] !== i){
            return i;
        }
    }
}
let aMissingNumber = findMissingNumber(missingNumber);
console.log("The number missing from the array is: ", aMissingNumber);

// Use quicksort to speed up calculating the three greatest numbers in an array
let aNewArray = [3, 4, 1, 7, 6, 9, 2, 4, 6, 8, 10, 14, 5]; // Three greatest numbers are 14 * 10 * 9
const threeLargest = (array) => {
    quicksortModule.setArray(array);
    quicksortModule.quicksort();
    array = quicksortModule.viewArray();
    let res = 1;
    for(let i = array.length - 1; i >= array.length - 3; i--){
        res = res * array[i];
    }
    return res;
}
let threeGreatestNumbers = threeLargest(aNewArray);
console.log("The three largest numbers multiply to: ", threeGreatestNumbers);