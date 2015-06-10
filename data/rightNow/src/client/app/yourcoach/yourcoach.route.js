(function() {
    'use strict';

    angular
        .module('app.yourcoach')
        .run(appRun);
    appRun.$inject = ['routerHelper'];
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'yourcoach',
                config: {
                    url: '/program/:programId/yourcoach/',
                    templateUrl: 'app/yourcoach/yourcoach.html',
                    controller: 'YourCoachController',
                    controllerAs: 'vm',
                    title: 'Your Coach'
                }
            }
        ];
    }
})();
