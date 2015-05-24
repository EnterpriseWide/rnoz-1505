(function() {
    'use strict';

    angular
        .module('app.assignment')
        .run(appRun);
    appRun.$inject = ['routerHelper'];
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'assignment',
                config: {
                    url: '/assignment/:id/',
                    templateUrl: 'app/assignment/assignment.html',
                    controller: 'AssignmentController',
                    controllerAs: 'vm',
                    title: 'Assignment'
                }
            }
        ];
    }
})();
