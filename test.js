module.exports = (function (){
    var test = {
        runTests: function (questions){
            this.compileAnswers(function (){
                if(test.answers.length){ /* error */}
                questions.forEach(function (question){
                    var expectedValue = test.getAnswer(question.eulerNumber);
                    console.log(question.test(expectedValue), question.eulerNumber);
                });
            });
        },
        //
        answers: [],
        getAnswer: function (eulerNumber){
            return this.answers[eulerNumber];
        },
        compileAnswers: function (callback){
            //
            var alreadyParsed = false;
            var parseBody = function (answersText){
                if(alreadyParsed){ return;}
                alreadyParsed = true;
                var answerLines = answersText.match(/Problem \d+: \d+/gi);
                answerLines.forEach(function (answerLine){
                    var answerInfo = /([123456789]+[\d]*): ([\d\.]+)/gi.exec(answerLine);
                    var answerNumber = parseInt(answerInfo[1]);
                    var answerValue = parseFloat(answerInfo[2]);
                    test.answers[answerNumber] = answerValue;
                });
                callback();
            };
            //
            var readCache = function (errorInfo){
                console.log(errorInfo);
                console.log('Reading from Cache');
                var fileSystem = require('fs');
                fileSystem.readFile('cached_answers.txt', 'utf8', function (error, data){
                    if(error){ callback();}
                    else{ parseBody(data);}
                });
            };
            //
            try{
                var https = require('https');
                var request = https.get('https://raw.githubusercontent.com/nayuki/Project-Euler-solutions/master/Answers.txt', function(res) {
                    var resBody = '';
                    res.on('data', function (chunk){ resBody += chunk;});
                    res.on('end', function (){
                        if(res.statusCode == 200){ parseBody(resBody);}
                        else{ readCache('Could not retrieve file ('+res.statusCode+').');}
                    });
                }).on('error', function(error) {
                    readCache('Http request encountered an error.');
                }).setTimeout(10000, function (){
                    // Will generate http error, don't readCache twice.
                    request.abort();
                });
            } catch( error){
                readCache('Error constructing http request.');
            }
        }
    };
    return test;
})();