module.exports = require('./question.js')({
    eulerNumber: 1,
    questionText: 'Find the sum of all the multiples of 3 or 5 below 1000.',
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
        var sum = 0;
        naturalNumbers: for(var N = 1; N < upperLimit; N++){
            for(var modIndex = 0; modIndex < mods.length; modIndex++){
                var indexedMod = mods[modIndex];
                if(N % indexedMod === 0){
                    sum += N;
                    continue naturalNumbers;
                }
            }
        }
        return sum;
    }
});