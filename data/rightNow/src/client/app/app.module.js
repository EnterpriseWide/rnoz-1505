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
            'app.profile',
            'app.program',
            'app.resource',
            'app.upload',
            'app.widgets',
            'app.yourcoach',
            'app.yourcoachee'
        ])
        .run(appRun);
    appRun.$inject = ['$rootScope', 'logger', 'menuservice', 'authservice'];
    function appRun($rootScope, logger, menuservice, authservice) {
        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            switch (toState.controller) {
                case 'LoginController':
                    $rootScope.bodyClass = toState.controller;
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
