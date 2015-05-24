(function() {
    'use strict';

    angular
        .module('app.assignments')
        .run(appRun);
    appRun.$inject = ['routerHelper'];
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'assignments',
                config: {
                    url: '/assignments/:id/',
                    templateUrl: 'app/assignments/assignments.html',
                    controller: 'AssignmentsController',
                    controllerAs: 'vm',
                    title: 'Assignments'
                }
            }
        ];
    }
})();
