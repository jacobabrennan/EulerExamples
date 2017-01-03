module.exports = require('./question.js')({
    eulerNumber: 3,
    questionText: 'What is the largest prime factor of the number 600851475143?',
    strategy:
`Start with number N.
Iterate variable limit over the natural numbers, starting at 2.
if N is evenly divisible by limit, save limit and continue iteration with N = N/limit.
Return the last, and thus largest, member of the saved limits array.`,
    //
    compute: function (){
        var largeN = 600851475143;
        var primeFactors = this.factor(largeN);
        var largestPrime = primeFactors.pop();
        return largestPrime;
    },
    //
    factor: function (N, limit){
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
        var resultArray = this.factor(N/limit, limit);
        resultArray.unshift(limit);
        return resultArray;
    }
});