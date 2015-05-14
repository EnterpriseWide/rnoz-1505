(function () {
    'use strict';

    angular
        .module('app.admin')
        .controller('AdminController', AdminController);

    AdminController.$inject = ['logger', 'authservice'];

    /* @ngInject */
    function AdminController(logger, authservice) {
        var vm = this;
        vm.title = 'Admin';
        vm.authData = authservice.authData;

        activate();

        function activate() {
            authservice.fillData();
            logger.info('Activated Admin View');
        }
    }
})();
