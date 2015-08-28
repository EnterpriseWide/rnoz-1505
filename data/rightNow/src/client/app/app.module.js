(function () {
    'use strict';

    angular
        .module('app', [
            'app.assignment',
            'app.admin',
            'app.core',
            'app.help',
            'app.layout',
            'app.learningplan',
            'app.login',
            'app.passwordrecovery',
            'app.profile',
            'app.program',
            'app.survey',
            'app.resource',
            'app.upload',
            'app.widgets',
            'app.yourcoach',
            'app.yourcoachee'
        ])
        .run(appRun);
    appRun.$inject = ['$rootScope', 'logger', 'menuservice', 'authservice', '$state', '$stateParams'];
    function appRun($rootScope, logger, menuservice, authservice, $state, $stateParams) {
        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            switch (toState.name) {
                case 'passwordRecovery':
                case 'login':
                    $rootScope.bodyClass = 'LoginController';
                    break;
                default:
                    $rootScope.bodyClass = '';
                    break;
            }
            menuservice.options.isOpen = false;
            $rootScope.menuOpenClass = '';
            if (toParams.programId) {
                menuservice.options.programId = toParams.programId;
            } else {
                var authData = authservice.authData;
                if (authData.isAuthenticated && (authData.isCoach || authData.isAdmin)) {
                    menuservice.options.programId = 0;
                }
            }
        });
    }

})();
