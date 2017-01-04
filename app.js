// ==== CONFIGURATION ==========================================================
var port = 8080;
// ==== DON'T EDIT ANYTHING BELOW THIS LINE ====================================



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
    var questionNumber = parseInt(request.url.split('/')[1]);
    if(questionNumber <= 0){
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


