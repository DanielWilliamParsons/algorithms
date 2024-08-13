import { makeNumbersArray } from './arrays.js';

const newArray = makeNumbersArray();
for(let i = 0; i < 50; i++){
    newArray.addZeroToOneHundred(true);
}
console.log(newArray.viewArray());
const [index, numSteps] = newArray.linearSearchOrdered(25);
console.log(index, numSteps);
const [indexBin, numStepsBin] = newArray.binarySearch(25);
console.log(indexBin, numStepsBin);