var questions = [
    require('./question1.js'),
    require('./question2.js'),
    require('./question3.js'),
    require('./question4.js'),
    require('./question5.js')
];

var test = {
    testAll: function (){
        if(this.answers.length){ /* error */}
        console.log(this.compare(questions[0]));
        console.log(this.compare(questions[1]));
        console.log(this.compare(questions[2]));
        console.log(this.compare(questions[3]));
        console.log(this.compare(questions[4]));
    },
    //
    compare: function (questionAttempt){
        var attemptValue = questionAttempt.compute();
        var officialValue = this.getAnswer(questionAttempt.eulerNumber);
        return attemptValue === officialValue;
    },
    //
    answers: [],
    getAnswer: function (eulerNumber){
        return this.answers[eulerNumber];
    },
    compileAnswers: function (){
        var self = this;
        var alreadyParsed = false;
        var parseBody = function (answersText){
            if(alreadyParsed){ return;}
            alreadyParsed = true;
            var answerLines = answersText.match(/Problem \d+: \d+/gi);
            answerLines.forEach(function (answerLine){
                var answerInfo = /([123456789]+[\d]*): ([\d\.]+)/gi.exec(answerLine);
                var answerNumber = parseInt(answerInfo[1]);
                var answerValue = parseFloat(answerInfo[2]);
                self.answers[answerNumber] = answerValue;
                //console.log(answerNumber, answerValue)
            });
            self.testAll()
        };
        var https = require('https');
        var requestOptions = {
            host: 'raw.githubusercontent.com',
            port: 80,
            path: '/nayuki/Project-Euler-solutions/master/Answers.txt',
            method: 'GET'
        };
        var req = https.get('https://raw.githubusercontent.com/nayuki/Project-Euler-solutions/master/Answers.txt', function(res) {
            var resBody = '';
            res.on('data', function (chunk){ resBody += chunk;});
            res.on('end', function (){ parseBody(resBody);});
        }).on('error', function(e) {
            console.log("Got error: " + e.message);
            //parseBody = function (){}
        });
        req.end();
    }
};
test.compileAnswers();