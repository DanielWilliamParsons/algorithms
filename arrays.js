
/**
 * Makes an object for creating an array of random numbers
 * The numbers can be generated with three different ranges: 0-10, 0-100, 0-1000
 * Option to sort array in ascending order after each number is added
 * 
 * @returns {Object} An object containing methods to add numbers to an array and view the object
 * 
 * @method addZeroToTen Adds a random numbers between 0 and 10 to the array
 * @param {boolean} [sortArray=false] - If true, sorts the array in ascending order after adding a number
 * 
 * @method addZeroToOneHundred Adds a random number between 0 and 100 to the array
 * @param {boolean} [sortArray=false] - If true, sorts the array in ascending order after adding a number
 * 
 * @method addZeroToOneThousand Adds a random number between 0 and 1000 to the array
 * @param {boolean} [sortArray=false] - If true, sorts the array in ascending order after adding a number
 * 
 * @method viewArray Returns the array.
 * @param {boolean} [sortArray=false] - If true, sorts the array in ascending order after adding a number
 * 
 * @example
 * 
 * const newArray = makeNumbersArray()
 * 
 * // Add ten random numbers between 0 and 100 to the array and sort them
 * for(let i = 0; i < 10; i++){
 *      // Setting parameter to true ensures the array is sorted each time
 *      // a number is added
 *      newArray.addZeroToOneHundred(true);
 * }
 * console.log(newArray.viewArray)
 * // Output example: [12, 14, 35, 38, 39, 56, 72, 87, 93, 94]
 */

export const makeNumbersArray = () => {
    /**
     * Private array to store the generated numbers
     * @type {number[]}
     */
    let myArray = new Array();
    
    /**
     * Private method to add a number to the internal array
     * and optionally sort the array in ascending order
     * @param {number} val - The number to add to the array.
     * @param {boolean} [sortArray=false] - If true, the array is sorted in ascending order
     * 
     * @private
     */
    function addNumber(val, sortArray=false) {
        myArray.push(val);
        if(sortArray===true){
            myArray.sort((a,b) => {
                return (a-b);
            });
        }
    }

    return {
        /**
         * Adds a random number between 0 and 10 to the array
         * @param {boolean} [sortArray=false] - If true, sorts array in ascending order.
         */
        addZeroToTen(sortArray = false){
            addNumber(Math.floor(Math.random()*11), sortArray);
        },

        /**
         * Adds a random number between 0 and 100 to the array
         * @param {boolean} [sortArray=false] - If true, sorts array in ascending order
         */
        addZeroToOneHundred(sortArray = false){
            addNumber(Math.floor(Math.random()*101), sortArray);
        },

        /**
         * Adds a random number between 0 and 1000 to the array
         * @param {boolean} [sortArray=false] - If true, sorts array in ascending order.
         */
        addZeroToOneThousand(sortArray = false){
            addNumber(Math.floor(Math.random()*1001), sortArray);
        },

        /**
         * Returns the current state of the array
         * @returns {number[]} the array of random numbers sorted or not.
         */
        viewArray(){
            return myArray;
        },

        /**
         * Linear search as defined on page 25 of
         * `A Common Sense Guide to Data Structures and Algorithms
         * Second edition by Jay Wengrow, 2020`
         * 
         * @param {number} searchVal - the number we are searching for in the array.
         * 
         * @returns {number[]} An array containing two elements
         * - The first element is the index at which the search value is found
         * - The second element is the number of steps taken during the linear search.
         */
        linearSearchOrdered(searchVal) {
            if(Number.isInteger(searchVal) === false){
                return [-1, 0];
            }
            let N = 0; // Number of steps for linear search.
            
            for(const [index, element] of Object.entries(myArray)) {
                N++;
                if(element === searchVal){
                    // We have found a match
                    return [index, N];
                } else if(element > searchVal){
                    // The remaining items in the array are larger than the search value
                    // so break out of the for loop.
                    break;
                }
            }

            return [-1, N];
        },
        /**
         * Binary search as defined on pages 29-30 of
         * `A Common Sense Guide to Data Structures and Algorithms
         * Second edition by Jay Wengrow, 2020`
         * 
         * @param {number} [searchVal] - the number we are searching for in the array.
         * 
         * @returns {number[]} - returns an array containing two values
         * - The first value is the index at which the search value was found
         * - The second value is the number of steps taken to complete the search.
         */
        binarySearch(searchVal) {
            // binarySearch is O(logN) efficiency (time complexity) 
            // because we divide the array in half each time
            // For example, if there are 8 elements, diving them in half until
            // there is only one element remaining takes three steps.
            if(Number.isInteger(searchVal) === false){
                return [-1, 0];
            }
            let N = 0; // Number of steps for linear search

            let lowerBound = 0; // Start of myArray
            let upperBound = myArray.length - 1; // End of myArray

            while (lowerBound <= upperBound) {
                // Find the midpoint between the upper and lower bounds
                N++;
                let midpoint = Math.floor((upperBound + lowerBound) / 2);
                
                // Did we find the searchVal at the midpoint of myArray or
                // is the searchVal in the bottom half of myArray or
                // is the searchVal in the top half of myArray?
                if (searchVal === myArray[midpoint]) {
                    return [midpoint, N];
                } else if (searchVal < myArray[midpoint]) {
                    upperBound = midpoint - 1;
                } else if (searchVal > myArray[midpoint]) {
                    lowerBound = midpoint + 1
                }
            }
            // The value is not in my array.
            return [-1, N];
        },
        /**
         * Bubble Sort Algorithm - works on unsorted array
         * Explained on pages 47-53 of
         * `A Common Sense Guide to Data Structures and Algorithms
         * Second edition by Jay Wengrow, 2020`
         * 
         * There are (N-1) + (N-2) + (N-3) + ... + 1 comparisons
         * Worst case scenario: array is sorted in descending order.
         * Worst case for array of 5 elements would be 10 comparisons and 10 swaps
         * Worst case for array of 10 elements would be 45 comparisons and 45 swaps.
         * Worst case for array of 20 elements would be 190 comparisons and 190 swaps.
         * This is O(N^2) time efficiency.
         */
        bubbleSort() {
            let steps = 0;
            let isSorted = false;
            let indexForHighestValue = myArray.length - 1;
            while(isSorted === false){
                steps++;
                isSorted = true;
                for(let i = 0; i < indexForHighestValue; i++){
                    steps++;
                    if(myArray[i] > myArray[i+1]){
                        steps++;
                        // swap the values
                        let store = myArray[i]
                        myArray[i] = myArray[i+1];
                        myArray[i+1] = store
                        // Update checkSorted
                        isSorted = false;
                    }
                }
                indexForHighestValue -= 1;
            }
            return {numSteps: steps};
        },

        /**
         * From Exercise 4 on page 61 of
         * `A Common Sense Guide to Data Structures and Algorithms
         * Second edition by Jay Wengrow, 2020`
         * Goal is to re-write the O(N^2) algorithm (greatestNumberInefficient)
         * so that it is a speedy O(N) algorithm (greatestNumberEfficient)
         */
        greatestNumberInefficient() {
            let steps = 0;
            for(let i = 0; i < myArray.length; i++){
                steps++;
                let isValTheGreatest = true;

                for(let j = 0; j < myArray.length; j++){
                    steps++;
                    if(myArray[j] > myArray[i]){
                        isValTheGreatest = false;
                    }
                }

                if(isValTheGreatest){
                    return {largestNumber: myArray[i], numSteps: steps};
                }
            }
        },

        greatestNumberEfficient() {
            let greatestNumber = 0;
            let steps = 0;
            for(let i = 0; i < myArray.length; i++){
                if(myArray[i] > greatestNumber){
                    greatestNumber = myArray[i];
                }
                steps++;
            }
            return {largestNumber: greatestNumber, numSteps: steps};
        },

        selectionSort() {
            let indexLowestValue = 0;
            let steps = 0;
            for(let i = 0; i < myArray.length; i++){
                steps++
                for(let j = i + 1; j < myArray.length; j++){
                    steps++;
                    if(myArray[j] < myArray[indexLowestValue]){
                        indexLowestValue = j;
                    }
                }
                // swap i and indexLowestValue
                if(indexLowestValue !== i){
                    steps++;
                    let store = myArray[i];
                    myArray[i] = myArray[indexLowestValue];
                    myArray[indexLowestValue] = store;
                }
            }
            return {numSteps: steps};
        }
    }
};
