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
                    templateUrl: 'app/resource/resource.list.html',
                    controller: 'ResourceListController',
                    controllerAs: 'vm',
                    title: 'Resources'
                }
            },
            {
                state: 'resourceRead',
                config: {
                    url: '/program/:programId/resource/:resourceId/',
                    templateUrl: 'app/resource/resource.read.html',
                    controller: 'ResourceReadController',
                    controllerAs: 'vm',
                    title: 'View Resource'
                }
            },
            {
                state: 'resourceUpdate',
                config: {
                    url: '/program/:programId/resource/:resourceId/update/',
                    templateUrl: 'app/resource/resource.update.html',
                    controller: 'ResourceUpdateController',
                    controllerAs: 'vm',
                    title: 'Update Resource'
                }
            }
        ];
    }
})();
