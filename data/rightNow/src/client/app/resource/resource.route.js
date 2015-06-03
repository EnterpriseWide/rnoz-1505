(function() {
    'use strict';

    angular
        .module('app.resource')
        .run(appRun);
    appRun.$inject = ['routerHelper'];
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'resources',
                config: {
                    url: '/program/:programId/resources/',
                    templateUrl: 'app/resource/list.html',
                    controller: 'ResourceListController',
                    controllerAs: 'vm',
                    title: 'Resources'
                }
            }
        ];
    }
})();
