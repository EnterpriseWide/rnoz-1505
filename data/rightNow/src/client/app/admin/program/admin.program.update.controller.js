(function () {
    'use strict';

    angular
        .module('app.admin.program')
        .controller('AdminProgramUpdateController', AdminProgramUpdateController);
    AdminProgramUpdateController.$inject = ['authData', 'logger', 'authservice', '$state', '$stateParams', '$q', 'dataservice', 'ngDialog'];

    function AdminProgramUpdateController(authData, logger, authservice, $state, $stateParams, $q, dataservice, ngDialog) {
        var vm = this;
        vm.title = 'Update Program';
        vm.programId = $stateParams.programId;
        vm.data = {};
        vm.authData = authservice.authData;
        vm.save = save;
        vm.deleteRecord = deleteRecord;
        vm.getProgram = getProgram;
        vm.UserLabel = userLabel;
        vm.users = [];
        vm.surveys = [];

        activate();

        function activate() {
            if (!vm.authData.isAdmin) {
                $state.go('404');
            }
            var promises = [getProgram(vm.programId), getUsers(), getSurveys()];
            return $q.all(promises);
        }

        function deleteRecord() {
            ngDialog.openConfirm({
                template: '<p>Would you like to Delete the Program?</p>' +
                    '<div class="ngdialog-buttons">' +
                        '<button type="button" class="btn btn-blue" ng-click="closeThisDialog(0)">No</button>' +
                        '<button type="button" class="btn btn-blue" ng-click="confirm(1)">Yes</button>' +
                    '</div>',
                plain: true
            }).then(function() {
                dataservice.deleteProgram(vm.programId).then(function(data) {
                    logger.success('Program Deleted');
                    $state.go('admin');
                });
            });
        }

        function getUsers() {
            dataservice.listUsers()
                .then(function (data) {
                    vm.users = data;
                });
        }

        function getSurveys() {
            dataservice.listSurveys()
                .then(function (data) {
                    vm.surveys = data;
                });
        }

        function userLabel(user) {
            return user.LastName + ', ' + user.FirstName;
        }

        function getProgram(id) {
            return dataservice.readProgram(id).then(function (data) {
                vm.data = data;
            });
        }

        function save() {
            dataservice.updateProgram(vm.data.Id, vm.data).then(function (data) {
                logger.info('Program Updated');
                $state.go('admin');
            });
        }

    }
})();
