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
                    url: '/program/:id/',
                    templateUrl: 'app/program/program.html',
                    controller: 'ProgramController',
                    controllerAs: 'vm',
                    title: 'Program View'
                }
            }
        ];
    }
})();
