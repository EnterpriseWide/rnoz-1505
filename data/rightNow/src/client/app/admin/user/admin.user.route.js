(function() {
    'use strict';

    angular
        .module('app.admin.user')
        .run(appRun);
    appRun.$inject = ['routerHelper'];
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'adminUserCreate',
                config: {
                    url: '/admin/user/create',
                    templateUrl: 'app/admin/user/admin.user.create.html',
                    controller: 'AdminUserCreateController',
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
                state: 'adminUserUpdate',
                config: {
                    url: '/admin/user/:userId/update',
                    templateUrl: 'app/admin/user/admin.user.update.html',
                    controller: 'AdminUserUpdateController',
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
