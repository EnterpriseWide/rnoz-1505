(function () {
    'use strict';

    angular
        .module('app.admin.user')
        .controller('AdminUserCreateController', AdminUserCreateController);
    AdminUserCreateController.$inject = ['authData', 'logger', 'authservice', '$state', '$stateParams', '$q', 'dataservice'];

    function AdminUserCreateController(authData, logger, authservice, $state, $stateParams, $q, dataservice) {
        var vm = this;
        vm.title = 'Add New User';
        vm.data = {};
        vm.authData = authservice.authData;
        vm.save = save;

        activate();

        function activate() {
            if (!vm.authData.isAdmin) {
                $state.go('404');
            }
        }

        function save() {
            vm.data.CreatedAt = moment().toISOString();
            vm.data.UpdatedAt = moment().toISOString();
            dataservice.createUser(vm.data).then(function (data) {
                logger.info('User Created');
                $state.go('admin');
            });
        }

    }
})();
