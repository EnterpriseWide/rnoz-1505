(function () {
    'use strict';

    angular
        .module('app.survey')
        .controller('SurveyListController', SurveyListController);
    SurveyListController.$inject = ['logger', 'authservice', 'dataservice', 'config'];
    function SurveyListController(logger, authservice, dataservice, config) {
        var vm = this;
        vm.title = 'Surveys';
        vm.screenconfig = {
            BodyText: '<p>Some instructions for the survey page go here</p>'
        };

        activate();

        function activate() {
        }
    }
})();
