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
            BodyTextSurveys: '<p>Still to come - some explanatory content about the surveys, perhaps one or two paragraphs? Or alternatively we can remove this text box.</p>'
        };

        activate();

        function activate() {
            vm.programId = $stateParams.programId;
            var promises = [getSurveys(vm.programId)];
            return $q.all(promises).then(function() {
            });
        }

        function getSurveys(id) {
            return dataservice.listSurveysByProgram(id).then(function (data) {
                vm.data = data;
            });
        }

    }
})();
