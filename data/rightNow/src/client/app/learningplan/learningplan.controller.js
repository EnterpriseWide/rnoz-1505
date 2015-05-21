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
        vm.data = [];
        vm.save = save;

        activate();

        function activate() {
            var id = $stateParams.id;
            var promises = [getLearningPlan(id)];
            return $q.all(promises).then(function() {
                logger.info('Activated ' + vm.title + ' View');
            });
        }

        function getLearningPlan(id) {
            return dataservice.getLearningPlan(id).then(function (data) {
                vm.data = data;
                return vm.data;
            });
        }

        function save() {
            dataservice.putLearningPlan(vm.data.Id, vm.data).then(function (data) {
                logger.info('Learning Plan Saved');
            });
        }

    }
})();
