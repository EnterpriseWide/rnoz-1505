(function () {
    'use strict';

    angular
        .module('app.admin.user')
        .controller('AdminUserUpdateController', AdminUserUpdateController);
    AdminUserUpdateController.$inject = ['authData', 'logger', 'authservice', '$state', '$stateParams', '$q', 'dataservice', 'ngDialog'];

    function AdminUserUpdateController(authData, logger, authservice, $state, $stateParams, $q, dataservice, ngDialog) {
        var vm = this;
        vm.title = 'Update User';
        vm.data = {
            roleIds: []
        };
        vm.authData = authservice.authData;
        vm.save = save;
        vm.deleteRecord = deleteRecord;
        vm.getUser = getUser;
        vm.roles = [];

        activate();

        function activate() {
            if (!vm.authData.isAdmin) {
                $state.go('404');
            }
            vm.userId = $stateParams.userId;
            var promises = [getUser(vm.userId), getRoles()];
            return $q.all(promises);
        }

        function getUser(id) {
            return dataservice.readUser(id).then(function (data) {
                vm.data = data.Item;
                vm.isUsed = data.UsageCount > 0;
            });
        }

        function getRoles() {
            dataservice.listRoles()
                .then(function (data) {
                    vm.roles = data;
                });
        }

        function save() {
            dataservice.updateUser(vm.data.Id, vm.data).then(function (data) {
                logger.info('User Updated');
                $state.go('admin');
            });
        }

        function deleteRecord() {
            ngDialog.openConfirm({
                template: '<p>Would you like to delete the user?</p>' +
                    '<div class="ngdialog-buttons">' +
                        '<button type="button" class="btn btn-blue" ng-click="closeThisDialog(0)">No</button>' +
                        '<button type="button" class="btn btn-blue" ng-click="confirm(1)">Yes</button>' +
                    '</div>',
                plain: true
            }).then(function() {
                dataservice.deleteUser(vm.userId).then(function(data) {
                    logger.success('Deleted User ' + data.Id);
                    $state.go('admin');
                });
            });
        }

    }
})();
