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
            'app.yourcoach'
        ])
        .run(appRun);
    appRun.$inject = ['$rootScope', 'logger'];
    function appRun($rootScope, logger) {
        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            switch (toState.controller) {
                case 'LoginController':
                    $rootScope.bodyClass = toState.controller;
                    break;
                default:
                    $rootScope.bodyClass = '';
                    break;
            }
        });
    }

})();
