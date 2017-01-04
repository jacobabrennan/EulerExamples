// ==== CONFIGURATION ==========================================================
var port = 8080;
// ==== DON'T EDIT ANYTHING BELOW THIS LINE ====================================



//==== EULER EXAMPLES APP ======================================================
/*
 *  This file provides configuration and implementation of a nodejs web server.
 *  This is the "entry point" for this project.
 *  To run the server, execute the following command:
 *      node app.js
 *
 *  You can then access the web client at http://localhost:port
 *      where 'port' is the number specified in the above configuration.
 */
//==============================================================================



// ==== APP REQUIREMENTS + GLOBAL VALUES =======================================
var questions = [
    require('./question1.js'),
    require('./question2.js'),
    require('./question3.js'),
    require('./question4.js'),
    require('./question5.js')
];
var test = require('./test.js')
var fileSystem = require("fs");
var connect = require("connect");
var serveStatic = require('serve-static');
//var favicon = require('serve-favicon');
// =============================================================================



// ==== CONFIGURE APP ROUTES ===================================================
var app = connect();
//app.use(favicon(__dirname + '/public/rsc/img/favicon.ico'));
app.use('/', serveStatic(__dirname+'/public', {'index': ['index.html', 'index.htm']}));
app.use('/question', function (request, response, next){
    // Parse requested question number from url, send question data as JSON.
    // Url expected in the form http://example.com/question/N where N is a number.
    var questionNumber = parseInt(request.url.split('/')[1]);
    if(questionNumber <= 0 || !questionNumber){
        questionNumber = 1;
    }
    var indexedQuestion = questions[questionNumber-1];
    response.setHeader('Content-Type', 'application/json');
    var questionPack;
    if(indexedQuestion){
        questionPack = indexedQuestion.pack();
    } else{
        questionPack = {
            eulerNumber: questionNumber,
            questionText: '[unknown]',
            strategy: 'This question has not yet been answered.',
            answer: '[unknown]',
            unanswered: true
        };
    }
    response.end(JSON.stringify(questionPack));
});
// =============================================================================



// ==== RUN TESTS AND START SERVER =============================================
test.runTests(questions, function (){
    app.listen(port);
    console.log('EulerExamples Server Started on port '+port+'.')
});
// =============================================================================


