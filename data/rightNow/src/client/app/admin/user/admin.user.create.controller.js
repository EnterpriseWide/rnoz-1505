(function () {
    'use strict';

    angular
        .module('app.admin.user')
        .controller('AdminUserCreateController', AdminUserCreateController);
    AdminUserCreateController.$inject = ['authData', 'logger', 'authservice', '$state', '$stateParams', '$q', 'dataservice', 'moment'];

    function AdminUserCreateController(authData, logger, authservice, $state, $stateParams, $q, dataservice, moment) {
        var vm = this;
        vm.title = 'Add New User';
        vm.data = {};
        vm.authData = authservice.authData;
        vm.save = save;
        vm.roles = [];
        vm.userError = [];
        vm.timezones = [];

        activate();

        function activate() {
            if (!vm.authData.isAdmin) {
                $state.go('404');
            }
            var promises = [listTimezones()];
            return $q.all(promises);
        }

        function listTimezones() {
            return dataservice.listTimezones().then(function (data) {
                vm.timezones = data;
            });
        }

        function save() {
            vm.data.CreatedAt = moment().toISOString();
            vm.data.UpdatedAt = moment().toISOString();
            dataservice.createUser(vm.data).then(function (data) {
                logger.info('User Created');
                $state.go('adminUserUpdate', {userId: data.Id});
            }, function (error) {
                vm.userError = error[''];
            });
        }

    }
})();
