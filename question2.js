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
function fibonacciAt(N, fibonacciCache){
    loops++;
    var cachedValue = fibonacciCache[N];
    if(cachedValue !== undefined){ return cachedValue;}
    var result = fibonacciAt(N-1, fibonacciCache)+fibonacciAt(N-2, fibonacciCache);
    fibonacciCache[N] = result;
    return result;
}
function fibonacciSum (initialTerms, limit){
    var sum = 0;
    var fibonacciCache = initialTerms;
    var fValue;
    do{
        fValue = fibonacciAt(fibonacciCache.length, fibonacciCache);
    } while(fValue <= limit);
    fibonacciCache.forEach(function (element){
        if(!(element%2)){
            sum += element
        }
    });
    return sum;
};
var result = fibonacciSum([0,1], 4000000);
console.log(result);