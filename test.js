//==== AUTOMATED TESTING =======================================================
/*
 *  This file provides an object, test, to be used to run automated tests.
 *  There are two options to run tests:
 *      1) From another file: require('./test.js').runTests(questions)
 *      2) From the command line: node test.js true
 *  The result of the test can be obtained as the return value from
 *      test.runTests, where a true value denotes all tests passed, and false
 *      denotes the failure of at least one test.
 */
//==============================================================================



module.exports = (function (){
    var test = {
        runTests: function (questions, callback){
            /* Call to test questions, providing the following arguments:
             * questions: an array of question objects.
             * callback: optional function to be executed asyncronously when the tests are complete.
             * 
             * The function returns nothing, but the callback returns a boolean
             * indicating the success or failure of the tests.
             */
            console.log('==== STARTING TESTS ====');
            var success = true;
            var totalTests = 0;
            var failedTests = 0;
            // Define a function to loop over the questions array and run the tests.
            var iterator = function (){
                questions.forEach(function (question){
                    totalTests++;
                    var expectedValue = test.getAnswer(question.eulerNumber);
                    var success = question.test(expectedValue);
                    if(success){
                        console.log('Test '+question.eulerNumber+': passed');
                    } else{
                        console.log('Test '+question.eulerNumber+': FAILED');
                        success = false;
                        failedTests++;
                    }
                });
                console.log('Tests Passed: '+(totalTests-failedTests)+'/'+totalTests);
                if(success){
                    console.log('All Tests Passed.')
                };
                console.log('========================')
                if(callback){ callback(success);}
            };
            // If the answers array is already populated, call iterator directly.
            if(this.answers.length){
                iterator();
            } else{
            // Otherwise, compile answers, then call iterator asyncronously.
                this.compileAnswers(function (){
                    iterator();
                });
            }
        },
        //
        answers: [],
        getAnswer: function (eulerNumber){
            return this.answers[eulerNumber];
        },
        compileAnswers: function (callback){
            /* Populates the answers array with answers to each Project Euler question.
             * The answers are fetched from a remote reposity and then parsed.
             * If the remote reposity cannot be reached, they're fetched from a local copy.
             * Does not return a value.
             */
            var alreadyParsed = false;
            // Most of the function deals with fetching the answers file.
            // parseBody does the actual parsing once the file is fetched.
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
            // There are several ways the remote fetch can fail.
            // readCache will grab the local version in the case of any failure.
            var readCache = function (errorInfo){
                console.log(errorInfo);
                console.log('Reading from Cache');
                var fileSystem = require('fs');
                fileSystem.readFile('cached_answers.txt', 'utf8', function (error, data){
                    if(error){ callback();}
                    else{ parseBody(data);}
                });
            };
            // Attempt to fetch the remote answers file, using the node http module.
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
    /* Process.argv holds info about how the file was invoked from the command line.
     * If this file was invoked with 'true' specified, run the tests automatically.
     */
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
    // Return the test object for use by other modules.
    return test;
})();