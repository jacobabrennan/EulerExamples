module.exports = require('./question.js')({
    eulerNumber: 1,
    questionText: 'Find the sum of all the multiples of 3 or 5 below 1000.',
    // Note that ` defines the start and end of a template literal.
    // Template literals spuriously display as malformed in some editors.
    strategy:
`Brute Force:
set sum S to zero
iterate I over the interval [1-1000)
if !(I%3) or !(I%5) add I to S
return S.`,
    //
    compute: function (){
        return this.computeGeneral(1000, [3, 5]);
    },
    // 
    computeGeneral: function (upperLimit, mods){
        /* This function iterates over the natural numbers until it reaches upperlimit.
         * For each number, it also iterates over the list of mods, allowing any
         * similar question to be asked, such as the sum of multiples of 2, 3, and 7.
         */
        var sum = 0;
        naturalNumbers: for(var N = 1; N < upperLimit; N++){
            for(var modIndex = 0; modIndex < mods.length; modIndex++){
                var indexedMod = mods[modIndex];
                if(N % indexedMod === 0){
                    sum += N;
                    continue naturalNumbers;
                    // This should be a break statement.
                    // But I haven't used a labeled loop in years, and I like the aesthetic here.
                }
            }
        }
        return sum;
    }
});