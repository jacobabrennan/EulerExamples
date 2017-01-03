module.exports = (function (){
    var question = {
        eulerNumber: NaN,
        questionText: '',
        strategy: '',
        compute: function (){},
        //
        test: function (expectedValue){
            return (this.compute() === expectedValue);
        }
    }
    return function (questionBlueprint){
        var questionConfiguration = {};
        for(key in questionBlueprint){
            if(!questionBlueprint.hasOwnProperty(key)){ continue;}
            questionConfiguration[key] = {value: questionBlueprint[key]};
        }
        return Object.create(question, questionConfiguration);
    };
})();