(function() {
    'use strict';

    angular
        .module('app.admin.program')
        .run(appRun);
    appRun.$inject = ['routerHelper'];
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'adminProgramCreate',
                config: {
                    url: '/admin/program/create',
                    templateUrl: 'app/admin/program/admin.program.create.html',
                    controller: 'AdminProgramCreateController',
                    controllerAs: 'vm',
                    resolve: {
                        authData: ['authservice', function (authservice) {
                            return authservice.fillData();
                        }]
                    },
                    title: 'Admin'
                }
            },
            {
                state: 'adminProgramUpdate',
                config: {
                    url: '/admin/program/:programId/update',
                    templateUrl: 'app/admin/program/admin.program.update.html',
                    controller: 'AdminProgramUpdateController',
                    controllerAs: 'vm',
                    resolve: {
                        authData: ['authservice', function (authservice) {
                            return authservice.fillData();
                        }]
                    },
                    title: 'Admin'
                }
            }
        ];
    }
})();
