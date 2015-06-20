(function () {
    'use strict';

    angular
        .module('app.survey')
        .controller('SurveyListController', SurveyListController);
    SurveyListController.$inject = ['logger', 'authservice', 'dataservice', 'config', '$stateParams', '$q'];
    function SurveyListController(logger, authservice, dataservice, config, $stateParams, $q) {
        var vm = this;
        vm.title = 'Surveys';
        vm.data = [];
        vm.screenconfig = {
            BodyText: '<p>Some instructions for the survey page go here</p>'
        };

        activate();

        function activate() {
            vm.programId = $stateParams.programId;
            var promises = [getSurveys(vm.programId)];
            return $q.all(promises).then(function() {
            });
        }

        function getSurveys(id) {
            // return dataservice.listSurveys(id).then(function (data) {
            //     vm.surveys = data;
            // });
        }

    }
})();
