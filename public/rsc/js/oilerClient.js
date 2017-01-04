//==== OILER CLIENT ============================================================
/*
 *  This file defines an Angular app which will control the client interface.
 *  This is mostly a stub to be expanded with later functionality.
 *  At the moment, it provides several values to be used as models,
 *      and a function to fetch question data from the server.
 */
//==============================================================================


// Define the Angular module
var app = angular.module('oilerClient', []);
// Define the client controller
app.controller('clientController', ['$http', '$scope', function ($http, $scope){
    this.question = null;
    this.questionNumber = 1;
    this.questionText = '';
    this.strategy = '';
    this.answer = NaN;
    this.loadQuestion = function (){
        /* This function is called whenever the number input changes in file index.html
         * It fetches question data from the server and updates the models.
         */
        var questionNumber = this.questionNumber;
        $http.get('question/'+questionNumber).then(function (result){
            this.question = result.data;
            this.questionNumber = this.question.eulerNumber;
            this.questionText = this.question.questionText;
            this.strategy = this.question.strategy;
            this.answer = this.question.answer;
        }.bind(this));
    };
    // Load the current question (1) so the page will display something by default.
    this.loadQuestion();
}]);