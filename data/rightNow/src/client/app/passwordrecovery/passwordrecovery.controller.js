(function () {
    'use strict';

    angular
        .module('app.passwordrecovery')
        .controller('PasswordRecoveryController', PasswordRecoveryController);
    PasswordRecoveryController.$inject = ['$stateParams'];
    function PasswordRecoveryController($stateParams) {
        var vm = this;
        vm.title = 'Login';
        vm.data = {};

        activate();

        function activate() {
        }

    }
})();
