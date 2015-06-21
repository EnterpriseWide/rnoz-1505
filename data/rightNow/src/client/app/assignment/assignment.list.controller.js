(function () {
    'use strict';

    angular
        .module('app.assignment')
        .controller('AssignmentListController', AssignmentListController);
    AssignmentListController.$inject = ['logger', 'authservice', '$stateParams', '$q', 'dataservice', '$modal', '$state', 'ngDialog'];

    function AssignmentListController(logger, authservice, $stateParams, $q, dataservice, $modal, $state, ngDialog) {
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
            });
        }

        function getAssignments(id) {
            return dataservice.listAssignments(id).then(function (data) {
                vm.assignments = data;
                return vm.assignments;
            });
        }

        function deleteRecord(id, ev) {
            ngDialog.openConfirm({
                template: '<p>Would you like to Delete the Assignment?</p>' +
                    '<div class="ngdialog-buttons">' +
                        '<button type="button" class="ngdialog-button ngdialog-button-secondary" ng-click="closeThisDialog(0)">No</button>' +
                        '<button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="confirm(1)">Yes</button>' +
                    '</div>',
                plain: true
            }).then(function() {
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
