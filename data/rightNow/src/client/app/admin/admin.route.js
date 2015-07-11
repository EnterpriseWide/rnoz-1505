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
                    templateUrl: 'app/admin/admin.html',
                    controller: 'AdminController',
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
                state: 'adminProgramCreate',
                config: {
                    url: '/admin/create-program',
                    templateUrl: 'app/admin/admin.program.create.html',
                    controller: 'AdminProgramCreateController',
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
