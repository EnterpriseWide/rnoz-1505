(function() {
    'use strict';

    angular
        .module('app.admin.room')
        .run(appRun);
    appRun.$inject = ['routerHelper'];
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'adminRoomCreate',
                config: {
                    url: '/admin/room/create',
                    templateUrl: 'app/admin/room/admin.room.create.html',
                    controller: 'AdminRoomCreateController',
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
                state: 'adminRoomUpdate',
                config: {
                    url: '/admin/room/:roomId/update',
                    templateUrl: 'app/admin/room/admin.room.update.html',
                    controller: 'AdminRoomUpdateController',
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
