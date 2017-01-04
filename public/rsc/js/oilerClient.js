var app = angular.module('oilerClient', []);
var C;
var ngClient;
app.controller('clientController', ['$http', '$scope', function ($http, $scope){
    ngClient = this;
    C = this;
    this.question = null;
    this.questionNumber = 1;
    this.questionText = '';
    this.strategy = '';
    this.answer = NaN;
    this.loadQuestion = function (){
        var questionNumber = this.questionNumber;
        $http.get('question/'+questionNumber).then(function (result){
            this.question = result.data;
            this.questionNumber = this.question.eulerNumber;
            this.questionText = this.question.questionText;
            this.strategy = this.question.strategy;
            this.answer = this.question.answer;
        }.bind(this));
    };
    this.loadQuestion();
}]);