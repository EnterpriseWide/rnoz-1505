(function () {
    'use strict';

    angular
        .module('app.assignments')
        .controller('AssignmentListController', AssignmentListController);
    AssignmentListController.$inject = ['logger', 'authservice', '$stateParams', '$q', 'dataservice'];

    function AssignmentListController(logger, authservice, $stateParams, $q, dataservice) {
        var vm = this;
        vm.title = 'Assignments';
        vm.assignments = [];
        vm.screenconfig = {};
        vm.authData = authservice.authData;

        activate();

        function activate() {
            var id = $stateParams.programId;
            var promises = [getAssignments(id)];
            return $q.all(promises).then(function() {
                logger.info('Activated ' + vm.title + ' View');
            });
        }

        function getAssignments(id) {
            return dataservice.getAssignments(id).then(function (data) {
                vm.assignments = data;
                return vm.assignments;
            });
        }

    }
})();
