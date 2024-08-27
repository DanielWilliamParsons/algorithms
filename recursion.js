
/* Recursion Prime Number */

const primeNumberExplorer = (() => {

    const isPrime = (number, divisor) => {
        if(number >= 2) {
            if(divisor === 1){
                return true;
            } else {
                if(number % divisor === 0) {
                    return false;
                } else {
                    return isPrime(number, divisor-1);
                }
            }
        } else {
            return false;
        }
    }

    const primeFinder = (upperNumber) => {

        if (upperNumber < 2){
            return [];
        }

        if (upperNumber === 2) {
            return [2];
        } else {
            let primes = primeFinder(upperNumber - 1);
            if (isPrime(upperNumber, upperNumber - 1) === true) {
                primes.push(upperNumber)
            }
            return primes;
        }
    }

    return {isPrime, primeFinder};
})();

let test = primeNumberExplorer.primeFinder(5000);
console.log(test);