(function() {
    'use strict';

    angular
        .module('app.learningplan')
        .run(appRun);
    appRun.$inject = ['routerHelper'];
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'learningplan',
                config: {
                    url: '/program/:programId/learningplan/',
                    templateUrl: 'app/learningplan/learningplan.html',
                    controller: 'LearningPlanController',
                    controllerAs: 'vm',
                    title: 'Learning Plan'
                }
            }
        ];
    }
})();
