module.exports = require('./question.js')({
    eulerNumber: 4,
    questionText: 'Find the largest palindrome made from the product of two 3-digit numbers.',
    // Note that ` defines the start and end of a template literal.
    // Template literals spuriously display as malformed in some editors.
    strategy:
`Conjecture:
The largest 3-digit number is 999. 1000000 > 999^2 > 900000.
Thus the greatest candidate palindromes will be of the form 9abba9.
I will initially focus my search on this pool of palindromes.
As 900009/999 > 900, we can limit our search to factors starting with 9.
Similarly, we can limit our search to factor pairs that end in 1/9, or 3/3,
as these are the only factors that multiply to 9.
Therefore our candidate factors will be of the forms 9A9*9B1 or 9A3*9B3.
This allows us to greatly reduce the number of iterations to be run,
as we only have to cycle through ten possible digits for A or B.
This is further shortened by skipping tests where B > A for factors ending in 3,
as these have already been tested due to symetry between factors.`,
    //
    compute: function (){
        // compute iterates over the possible factors, as described in the
        //     strategy above, and checks if their product is a palindrome.
        // Because it works from the max possible value down, the first
        //     palindrome found is the max possible.
        for(var digit1 = 9; digit1 >= 0; digit1--){
            for(var digit2 = 9; digit2 >= 0; digit2--){
                var candidate1 = (909+digit1*10) * (901+digit2*10);
                if(this.isPalindrome(candidate1)){
                    return candidate1;
                }
                if(digit2 > digit1){ //don't test candidate 2;
                    continue;
                }
                var candidate2 = (903+digit1*10)*(903+digit2*10);
                if(this.isPalindrome(candidate2)){
                    return candidate2;
                }
            }
        }
        return undefined;
    },
    //
    isPalindrome: function (candidate){
        // isPalindrome assumes a 6 digit candidate number,
        //     beginning and ending with the digit 9.
        // It checks to see if the 2nd and 5th digit match,
        //     and if the 3rd and 4th digit match.
        var numberString = candidate.toString();
        return (
            numberString.charAt(1) == numberString.charAt(4) &&
            numberString.charAt(2) == numberString.charAt(3)
        );
    }
});
