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
            },
            {
                state: 'assignmentRead',
                config: {
                    url: '/program/:programId/assignment/:assignmentId/',
                    templateUrl: 'app/assignment/assignment.read.html',
                    controller: 'AssignmentReadController',
                    controllerAs: 'vm',
                    title: 'Assignment'
                }
            },
            {
                state: 'assignmentUpdate',
                config: {
                    url: '/program/:programId/assignment/:assignmentId/update/',
                    templateUrl: 'app/assignment/assignment.update.html',
                    controller: 'AssignmentUpdateController',
                    controllerAs: 'vm',
                    title: 'Update Assignment'
                }
            }
        ];
    }
})();
