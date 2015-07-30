(function () {
    'use strict';

    angular
        .module('app.admin.user')
        .controller('AdminUserCreateController', AdminUserCreateController);
    AdminUserCreateController.$inject = ['authData', 'logger', 'authservice', '$state', '$stateParams', '$q', 'dataservice', 'moment'];

    function AdminUserCreateController(authData, logger, authservice, $state, $stateParams, $q, dataservice, moment) {
        var vm = this;
        vm.title = 'Add New User';
        vm.data = {
            roleIds: []
        };
        vm.authData = authservice.authData;
        vm.save = save;
        vm.roles = [];
        vm.userError = [];

        activate();

        function activate() {
            if (!vm.authData.isAdmin) {
                $state.go('404');
            }
            var promises = [getRoles()];
            return $q.all(promises);
        }

        function getRoles() {
            dataservice.listRoles()
                .then(function (data) {
                    vm.roles = data;
                });
        }

        function save() {
            vm.data.CreatedAt = moment().toISOString();
            vm.data.UpdatedAt = moment().toISOString();
            dataservice.createUser(vm.data).then(function (data) {
                logger.info('User Created');
                $state.go('admin');
            }, function (error) {
                vm.userError = error[""];
            });
        }

    }
})();
