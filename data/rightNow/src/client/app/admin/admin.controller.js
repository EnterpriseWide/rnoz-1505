(function () {
    'use strict';

    angular
        .module('app.admin')
        .controller('AdminController', AdminController);

    AdminController.$inject = ['logger', 'authservice', '$location'];

    /* @ngInject */
    function AdminController(logger, authservice, $location) {
        var vm = this;
        vm.title = 'Admin Dashboard';
        vm.authData = authservice.authData;

        activate();

        function activate() {
            if (!vm.authData.isAdmin) {
                $location.path('/404');
            }
            logger.info('Activated Admin View');
        }
    }
})();
