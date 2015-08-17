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
        vm.resetPassword = resetPassword;

        activate();

        function activate() {
            vm.data.token = $stateParams.token;
            vm.data.email = $stateParams.email;
        }
        
        function resetPassword() {
        }

    }
})();
