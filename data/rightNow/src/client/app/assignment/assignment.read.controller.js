(function () {
    'use strict';

    angular
        .module('app.assignments')
        .controller('AssignmentReadController', AssignmentReadController);
    AssignmentReadController.$inject = ['logger', 'authservice', '$stateParams', '$q', 'dataservice'];

    function AssignmentReadController(logger, authservice, $stateParams, $q, dataservice) {
        var vm = this;
        vm.title = 'Assignments';
        vm.data = [];
        vm.screenconfig = {};
        vm.authData = authservice.authData;

        activate();

        function activate() {
            vm.programId = $stateParams.programId;
            var assignmentId = $stateParams.assignmentId;
            var promises = [getAssignment(assignmentId)];
            return $q.all(promises).then(function() {
                logger.info('Activated ' + vm.title + ' View');
            });
        }

        function getAssignment(id) {
            return dataservice.readAssignment(id).then(function (data) {
                vm.data = data;
                return vm.data;
            });
        }

    }
})();
