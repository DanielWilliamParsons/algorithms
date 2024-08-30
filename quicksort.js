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
            console.log(array);

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
        console.log(left)
        return left;
    }

    const quicksort = (left = 0, right = myArray.length - 1) => {
        if(right - left <= 0) {
            return;
        }
        let pivotIndex = partition(left, right); // Partition into 2 parts
        console.log(pivotIndex); // Pivot is the place where we partition the array
        quicksort(left, pivotIndex - 1); // Quicksort left side
        quicksort(pivotIndex + 1, right); // Quicksort right side
    }

    const setArray = (myArray) => {
        array = myArray
    }

    const viewArray = () => {
        return array;
    }

    return { quicksort, viewArray, setArray }

})();

let myArray = [0, 5, 2, 1, 6, 3];
let partition = quicksortModule.setArray(myArray);
let quicksortedArray = quicksortModule.quicksort();
console.log(quicksortModule.viewArray());