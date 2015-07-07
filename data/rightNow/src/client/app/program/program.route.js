(function() {
    'use strict';

    angular
        .module('app.program')
        .run(appRun);
    appRun.$inject = ['routerHelper'];
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'program',
                config: {
                    url: '/program/:programId/',
                    templateUrl: 'app/program/program.read.html',
                    controller: 'ProgramReadController',
                    controllerAs: 'vm',
                    resolve: {
                        program: ['$stateParams', 'dataservice', function ($stateParams, dataservice) {
                            return dataservice.readProgram($stateParams.programId).then(function (data) {
                                return data;
                            });
                        }]
                    },
                    title: 'Program View'
                }
            }, {
                state: 'programs',
                config: {
                    url: '/',
                    templateUrl: 'app/program/program.list.html',
                    controller: 'ProgramListController',
                    controllerAs: 'vm',
                    title: 'Programs'
                }
            }
        ];
    }
})();
