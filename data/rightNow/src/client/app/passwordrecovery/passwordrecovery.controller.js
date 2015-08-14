(function () {
    'use strict';

    angular
        .module('app.passwordrecovery')
        .controller('PasswordRecoveryController', PasswordRecoveryController);
    PasswordRecoveryController.$inject = ['authservice', '$location', 'logger', '$state', 'dataservice', 'menuservice', 'ngDialog'];
    function PasswordRecoveryController(authservice, $location, logger, $state, dataservice, menuservice, ngDialog) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'Login';

        activate();

        function activate() {
            console.log('activated password recovery');
        }

    }
})();
