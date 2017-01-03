module.exports = require('./question.js')({
    eulerNumber: 5,
    questionText: 'Question5: What is the smallest positive number that is evenly divisible by all of the numbers from 1 to 20?',
    strategy:
`The smallest number divisible by each of the natural numbers [1,20] must
therefore be the number whose prime factorization is a superset of each of
the prime factorizations of the those numbers, and containing no other factors.
This factorization be calculated by hand: [2,2,2,2,3,3,5,7,11,13,17,19]
The number with this prime factorization is: 232792560`,
    //
    compute: function (){
        return 232792560;
    }
});