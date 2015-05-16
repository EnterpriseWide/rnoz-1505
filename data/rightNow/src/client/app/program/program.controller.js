(function () {
    'use strict';

    angular
        .module('app.program')
        .controller('ProgramController', ProgramController);

    ProgramController.$inject = ['logger', '$stateParams', '$q', 'dataservice'];
    /* @ngInject */
    function ProgramController(logger, $stateParams, $q, dataservice) {
        var vm = this;
        vm.title = 'Program';
        vm.program = [];
        vm.bodyTextYourCoach = '<p>Read more information about your coach, or send them a ' +
            'message</p>';
        vm.bodyTextLearningPlan = '<p>This document is created over teh course of your coaching ' +
            'program - both you and your coach can edit it, export it or email a copy.</p>';
        vm.bodyTextAssignments = '<p>These assignments are specified by your coach and are ' +
            'updated over the course of your coaching program.</p>';
        vm.bodyTextResources = '<p>Read more information about Resources here</p>';
        vm.bodyTextUploads = '<p>Read more information about Uploads here</p>';
        vm.bodyTextSurveys = '<p>Read more information about sruveys here</p>';

        activate();

        function activate() {
            var id = $stateParams.id;
            var promises = [getProgram(id)];
            return $q.all(promises).then(function() {
                logger.info('Activated ' + vm.title + ' View');
            });
        }

        function getProgram(id) {
            return dataservice.getProgram(id).then(function (data) {
                vm.program = data;
                return vm.program;
            });
        }

    }
})();
