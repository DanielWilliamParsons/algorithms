import { makeNumbersArray } from './arrays.js';

// const newArray = makeNumbersArray();
// for(let i = 0; i < 50; i++){
//     newArray.addZeroToOneHundred(true);
// }
// console.log(newArray.viewArray());
// const [index, numSteps] = newArray.linearSearchOrdered(25);
// console.log(index, numSteps);
// const [indexBin, numStepsBin] = newArray.binarySearch(25);
// console.log(indexBin, numStepsBin);

// Creates an ordered array of numbers randomly selected
// between 0 and 100.
function createArray(arrayLength) {
    const newArray = makeNumbersArray();
    for(let i = 0; i < arrayLength; i++){
        newArray.addZeroToOneHundred(true);
    }
    return newArray;
}

function compareLinearAndBinary(lengthOfRandomArray, searchValue) {
    let searchResults = [];
    // run the simulation 100 times
    for(let i = 0; i < 100; i++){
        const newArray = createArray(lengthOfRandomArray); // Create an array of length 50.

        // Get the index of the search value and the number of steps taken
        // using both linear search and binary search
        const [linearIndex, linearSteps] = newArray.linearSearchOrdered(searchValue)
        const [binaryIndex, binarySteps] = newArray.binarySearch(searchValue);

        const searchResult = {
            "linearIndex" : linearIndex,
            "binaryIndex" : binaryIndex,
            "linearSteps" : linearSteps,
            "binarySteps" : binarySteps
        }
        searchResults.push(searchResult)
    }
    return searchResults;
}

// Compare the average of the search results
function averageSteps(searchResults) {
    let sumStepsLinear = 0;
    let sumStepsBinary = 0;
    for(const [index, item] of Object.entries(searchResults)){
        sumStepsLinear += item.linearSteps;
        sumStepsBinary += item.binarySteps;
    }
    return [sumStepsLinear / searchResults.length, sumStepsBinary / searchResults.length];
}
const sResults = compareLinearAndBinary(100, 50);
console.log(sResults[1]);
const searchResults = compareLinearAndBinary(1000, 50);
console.log(searchResults[1]);

const [averageStepsLinear, averageStepsBinary] = averageSteps(sResults);
console.log(averageStepsLinear, averageStepsBinary);

// Observe bubble sort

function observeBubbleSort(){
    let anArray = makeNumbersArray();
    for(let i = 1; i <= 30; i++){
        anArray.addZeroToOneHundred();
    }

    console.log(anArray.viewArray());
    anArray.bubbleSort();
    console.log(anArray.viewArray());
    
}
observeBubbleSort();

// Compare efficiency of greatestNumberInefficient and greatestNumberEfficient

function observeGreatestNumber(){
    let anArray = makeNumbersArray();
    for(let i = 1; i <= 30; i++){
        anArray.addZeroToOneHundred();
    }

    console.log("Inefficient Version O(n^2): ", anArray.greatestNumberInefficient());
    console.log("Efficient Version O(n): ", anArray.greatestNumberEfficient());
}
observeGreatestNumber();