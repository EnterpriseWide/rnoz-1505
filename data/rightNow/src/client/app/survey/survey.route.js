(function() {
    'use strict';

    angular
        .module('app.survey')
        .run(appRun);
    appRun.$inject = ['routerHelper'];
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'surveys',
                config: {
                    url: '/program/:programId/surveys',
                    templateUrl: 'app/survey/survey.list.html',
                    controller: 'SurveyListController',
                    controllerAs: 'vm',
                    title: 'Surveys',
                    settings: {
                        nav: 2,
                        content: '<i class="fa fa-lock"></i> Surveys'
                    }
                }
            }
        ];
    }
})();
