(function () {
    'use strict';

    angular
        .module('app.learningplan')
        .controller('LearningPlanController', LearningPlanController);

    LearningPlanController.$inject = ['logger', '$stateParams', '$q', 'dataservice'];

    /* @ngInject */
    function LearningPlanController(logger, $stateParams, $q, dataservice) {
        var vm = this;
        vm.title = 'Learning Plan';
        vm.program = [];

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
