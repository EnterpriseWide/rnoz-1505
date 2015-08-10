(function() {
    'use strict';

    angular
        .module('app.login')
        .run(appRun);
    appRun.$inject = ['routerHelper'];
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'login',
                config: {
                    url: '/login',
                    templateUrl: 'app/login/login.html',
                    controller: 'LoginController',
                    controllerAs: 'vm',
                    title: 'Login'
                }
            }, {
                state: 'loginPasswordReset',
                config: {
                    url: '/login/resetpassword/:email?token',
                    templateUrl: 'app/login/passwordreset.html',
                    controller: 'LoginPasswordResetController',
                    controllerAs: 'vm',
                    title: 'Login'
                }
            }

        ];
    }
})();
