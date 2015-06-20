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
            BodyTextSurveys: '<p>Explanation of surveys, lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.</p>'
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
