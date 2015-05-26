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
                    url: '/program/:programId/assignment/',
                    templateUrl: 'app/assignment/assignment.list.html',
                    controller: 'AssignmentListController',
                    controllerAs: 'vm',
                    title: 'Assignments'
                }
            },
            {
                state: 'assignmentCreate',
                config: {
                    url: '/program/:programId/assignment/create/',
                    templateUrl: 'app/assignment/assignment.create.html',
                    controller: 'AssignmentCreateController',
                    controllerAs: 'vm',
                    title: 'Assignments'
                }
            }
        ];
    }
})();
