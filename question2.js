module.exports = require('./question.js')({
    eulerNumber: 2,
    questionText: 'By considering the terms in the Fibonacci sequence whose values do not exceed four million, find the sum of the even-valued terms.',
    // Note that ` defines the start and end of a template literal.
    // Template literals spuriously display as malformed in some editors.
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
        // This function returns the value of the Nth term in the fibonacci sequence.
        // If this term doesn't exist in the cache, it will be calculated and added to the cache.
        // It calculates the value by recursively calling itself until a known term is reached.
        if(N < 0){ return 0;}
        var cachedValue = fibonacciCache[N];
        if(cachedValue !== undefined){ return cachedValue;}
        var result = this.fibonacciAt(N-1, fibonacciCache) + this.fibonacciAt(N-2, fibonacciCache);
        fibonacciCache[N] = result;
        return result;
    },
    fibonacciSum: function (initialTerms, limit){
        // This function generates the terms of the fibonacci sequence greater
        //     than or equal to the provided limit.
        // Different initialTerms can be provided for different related sequences.
        // It then iterates over the cache and sums the even terms, returning this value.
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