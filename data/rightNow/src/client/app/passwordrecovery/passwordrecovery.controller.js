(function () {
    'use strict';

    angular
        .module('app.passwordrecovery')
        .controller('PasswordRecoveryController', PasswordRecoveryController);
    PasswordRecoveryController.$inject = ['$stateParams', 'dataservice', 'logger', '$state'];
    function PasswordRecoveryController($stateParams, dataservice, logger, $state) {
        var vm = this;
        vm.title = 'Login';
        vm.data = {};
        vm.resetPassword = resetPassword;

        activate();

        function activate() {
            vm.data.Code = $stateParams.token;
            vm.data.Email = $stateParams.email;
        }

        function resetPassword() {
            dataservice.updatePassword(vm.data)
                .then(function (response) {
                    logger.success('Password Updated');
                    $state.go('login');
                });
        }
    }
})();
