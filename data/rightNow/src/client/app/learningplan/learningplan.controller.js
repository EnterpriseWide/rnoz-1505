(function () {
    'use strict';

    angular
        .module('app.learningplan')
        .controller('LearningPlanController', LearningPlanController);
    LearningPlanController.$inject = ['logger', '$stateParams', '$q', 'dataservice', 'authservice'];

    function LearningPlanController(logger, $stateParams, $q, dataservice, authservice) {
        var vm = this;
        vm.title = 'Learning Plan';
        vm.data = [];
        vm.authData = authservice.authData;
        vm.save = save;
        vm.apiurl = dataservice.apiurl;

        activate();

        function activate() {
            vm.programId = $stateParams.programId;
            var promises = [getLearningPlan(vm.programId)];
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
