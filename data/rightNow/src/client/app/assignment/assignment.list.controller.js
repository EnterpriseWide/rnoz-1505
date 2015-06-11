(function () {
    'use strict';

    angular
        .module('app.assignment')
        .controller('AssignmentListController', AssignmentListController);
    AssignmentListController.$inject = ['logger', 'authservice', '$stateParams', '$q', 'dataservice', '$modal', '$state', '$mdDialog'];

    function AssignmentListController(logger, authservice, $stateParams, $q, dataservice, $modal, $state, $mdDialog) {
        var vm = this;
        vm.title = 'Assignments';
        vm.assignments = [];
        vm.screenconfig = {};
        vm.authData = authservice.authData;
        vm.deleteRecord = deleteRecord;

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

        function deleteRecord(id, ev) {
            var confirm = $mdDialog.confirm()
                .parent(angular.element(document.body))
                .title('Would you like to Delete the Assignment?')
                .ariaLabel('Delete Assignment')
                .ok('OK')
                .cancel('Cancel')
                .targetEvent(ev);
            $mdDialog.show(confirm).then(function() {
                dataservice.deleteAssignment(id).then(function(data) {
                    logger.success('Deleted Assignment ' + data.Id);
                    getAssignments(vm.programId);
                });
            }, function() {
                // Do Nothing
            });
        }

    }
})();
