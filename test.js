module.exports = (function (){
    var test = {
        runTests: function (questions, callback){
            console.log('==== STARTING TESTS ====')
            var totalTests = 0;
            var failedTests = 0;
            var iterator = function (){
                questions.forEach(function (question){
                    totalTests++;
                    var expectedValue = test.getAnswer(question.eulerNumber);
                    var success = question.test(expectedValue);
                    if(success){
                        console.log('Test '+question.eulerNumber+': passed');
                    } else{
                        console.log('Test '+question.eulerNumber+': FAILED');
                        failedTests++;
                    }
                });
                console.log('Tests Passed: '+(totalTests-failedTests)+'/'+totalTests);
                if(failedTests === 0){
                    console.log('All Tests Passed.')
                };
                console.log('========================')
                if(callback){ callback();}
            };
            if(!this.answers.length){
                this.compileAnswers(function (){
                    iterator();
                });
            } else{
                iterator();
            }
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
    if(process.argv[2] === 'true'){
        var questions = [
            require('./question1.js'),
            require('./question2.js'),
            require('./question3.js'),
            require('./question4.js'),
            require('./question5.js')
        ];
        test.runTests(questions);
    }
    return test;
})();