(function() {
    'use strict';

    angular
        .module('app.admin')
        .run(appRun);
    appRun.$inject = ['routerHelper'];
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'admin',
                config: {
                    url: '/admin',
                    templateUrl: 'app/admin/admin.index.html',
                    controller: 'AdminController',
                    controllerAs: 'vm',
                    title: 'Admin'
                }
            }
        ];
    }
})();
