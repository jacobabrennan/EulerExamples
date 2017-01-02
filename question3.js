// What is the largest prime factor of the number 600851475143 ?


module.exports = (function (){
    var newQuestion = {//Object.create(require('./question.js');
        eulerNumber: 3,
        compute: function (){
            var largeN = 600851475143;
            var primeFactors = this.factor(largeN);
            var largestPrime = primeFactors.pop();
            return largestPrime;
        },
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
    };
    return newQuestion;
})();