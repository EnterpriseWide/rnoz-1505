(function() {
    'use strict';

    angular
        .module('app.passwordrecovery')
        .run(appRun);
    appRun.$inject = ['routerHelper'];
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'passwordRecovery',
                config: {
                    url: '/passwordrecovery/?email&token',
                    templateUrl: 'app/passwordrecovery/passwordrecovery.html',
                    controller: 'PasswordRecoveryController',
                    controllerAs: 'vm',
                    title: 'Password Recovery',
                    data: {
                        access: 'public'
                    }
                }
            }
        ];
    }
})();
