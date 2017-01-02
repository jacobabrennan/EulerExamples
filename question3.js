// What is the largest prime factor of the number 600851475143 ?

var largeN = 600851475143;
function factor(N, limit){
    if(N === limit){ return [N];}
    if(N !== Math.floor(N)){ return [N];}
    if(!limit){ limit = 2;}
    var highLimit = Math.sqrt(N);
    while(N%limit){
        limit++;
        if(limit > highLimit){
            return [N];
        }
    }
    var resultArray = factor(N/limit, limit);
    resultArray.unshift(limit);
    return resultArray;
}
var primeFactors = factor(largeN);
console.log(primeFactors)
var largestPrime = primeFactors.pop()
//console.log(largestPrime);