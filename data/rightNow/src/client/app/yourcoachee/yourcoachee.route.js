(function() {
    'use strict';

    angular
        .module('app.yourcoachee')
        .run(appRun);
    appRun.$inject = ['routerHelper'];
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'yourcoachee',
                config: {
                    url: '/program/:programId/yourcoachee/',
                    templateUrl: 'app/yourcoachee/yourcoachee.html',
                    controller: 'YourCoacheeController',
                    controllerAs: 'vm',
                    title: 'Your Coachee'
                }
            }
        ];
    }
})();
