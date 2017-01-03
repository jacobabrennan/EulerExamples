module.exports = require('./question.js')({
    eulerNumber: 2,
    questionText: 'By considering the terms in the Fibonacci sequence whose values do not exceed four million, find the sum of the even-valued terms.',
    strategy:
`Brute Force:
Create a function to recursively calculate any fibonacci number.
Cache each number for future calls.
Generate fibonacci numbers up to a value of 4000000.
Iterate over the cache summing up each even fibonacci numbers.`,
    //
    compute: function (){
        return this.fibonacciSum([0,1], 4000000);
    },
    //
    fibonacciAt: function (N, fibonacciCache){
        if(N < 0){ return 0;}
        var cachedValue = fibonacciCache[N];
        if(cachedValue !== undefined){ return cachedValue;}
        var result = this.fibonacciAt(N-1, fibonacciCache) + this.fibonacciAt(N-2, fibonacciCache);
        fibonacciCache[N] = result;
        return result;
    },
    fibonacciSum: function (initialTerms, limit){
        var sum = 0;
        var fibonacciCache = initialTerms;
        var fValue;
        do{
            fValue = this.fibonacciAt(fibonacciCache.length, fibonacciCache);
        } while(fValue <= limit);
        fibonacciCache.forEach(function (element){
            if(!(element%2)){
                sum += element
            }
        });
        return sum;
    }
});