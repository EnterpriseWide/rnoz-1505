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
    appRun.$inject = ['$rootScope', 'logger', 'menuservice'];
    function appRun($rootScope, logger, menuservice) {
        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            switch (toState.controller) {
                case 'LoginController':
                    $rootScope.bodyClass = toState.controller;
                    break;
                default:
                    $rootScope.bodyClass = '';
                    break;
            }
            if (toParams.programId) {
                menuservice.options.programId = toParams.programId;
            } else {
                menuservice.options.programId = 0;
            }
        });
    }

})();
