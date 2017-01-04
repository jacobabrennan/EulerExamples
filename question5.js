module.exports = require('./question.js')({
    eulerNumber: 5,
    questionText: 'What is the smallest positive number that is evenly divisible by all of the numbers from 1 to 20?',
    // Note that ` defines the start and end of a template literal.
    // Template literals spuriously display as malformed in some editors.
    strategy:
`The smallest number divisible by each of the natural numbers [1,20]
must be the number whose prime factorization is a superset of each of the prime factorizations of the those numbers,
and containing no other factors.
This factorization can be calculated by hand: [2,2,2,2,3,3,5,7,11,13,17,19]
The number with this prime factorization is: 232792560`,
    //
    compute: function (){
        // A general solution is outlined in the strategy above.
        // I should probably return to this and implement it in code, but I like
        //     the change of pace provided by a question simple enough to do by hand.
        return 232792560;
    }
});