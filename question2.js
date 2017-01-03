/*By considering the terms in the Fibonacci sequence whose values do not exceed four million, find the sum of the even-valued terms.*/

// F(n), F(n+1)
// F(n) = F(n-1)+F(n-2);

/* Brute Force:
 * Calculate each fibonacci number in turn.
 * Save the last two for the next iteration.
 * Add each even number to the grand total (sum).
 * Stop when the current fibonacci number is greater than four million.
 */

//var initialTerms = [0,1];
//var limit = 4000000;

module.exports = (function (){
    var newQuestion = {
        eulerNumber: 2,
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
    };
    return newQuestion;
})();