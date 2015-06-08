(function () {
    'use strict';

    angular
        .module('app.assignment')
        .controller('AssignmentListController', AssignmentListController);
    AssignmentListController.$inject = ['logger', 'authservice', '$stateParams', '$q', 'dataservice', '$modal', '$state'];

    function AssignmentListController(logger, authservice, $stateParams, $q, dataservice, $modal, $state) {
        var vm = this;
        vm.title = 'Assignments';
        vm.assignments = [];
        vm.screenconfig = {};
        vm.authData = authservice.authData;
        vm.deleteAssignment = deleteAssignment;

        activate();

        function activate() {
            vm.programId = $stateParams.programId;
            var promises = [getAssignments(vm.programId)];
            return $q.all(promises).then(function() {
                logger.info('Activated ' + vm.title + ' View');
            });
        }

        function getAssignments(id) {
            return dataservice.listAssignments(id).then(function (data) {
                vm.assignments = data;
                return vm.assignments;
            });
        }

        function deleteAssignment(id) {
            var modalInstance = $modal.open({
                templateUrl: 'app/assignment/assignment.delete.html',
                controller: 'AssignmentDeleteController',
                controllerAs: 'vm',
                resolve: {
                    id: function() {
                        return id;
                    }
                }
            });

            modalInstance.result.then(function (id) {
                // dataservice.deleteAssignment(id).then(function(data) {
                //     logger.success('Deleted Assignment ' + data.Id);
                //     getAssignments(vm.programId);
                // });
            });
        }

    }
})();
