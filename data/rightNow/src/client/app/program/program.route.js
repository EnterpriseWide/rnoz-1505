(function() {
    'use strict';

    angular
        .module('app.program')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'viewProgram',
                config: {
                    //state for showing single movie
                    url: '/program/:id/',
                    templateUrl: 'app/program/program-view.html',
                    controller: 'ProgramViewController',
                    controllerAs: 'vm',
                    title: 'Program View',
                }
            }
        ];
    }
})();
