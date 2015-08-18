(function() {
    'use strict';

    angular
        .module('app.admin.survey')
        .run(appRun);
    appRun.$inject = ['routerHelper'];
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'adminSurveyCreate',
                config: {
                    url: '/admin/survey/create',
                    templateUrl: 'app/admin/survey/admin.survey.create.html',
                    controller: 'AdminSurveyCreateController',
                    controllerAs: 'vm',
                    title: 'Admin'
                }
            },
            {
                state: 'adminSurveyUpdate',
                config: {
                    url: '/admin/survey/:surveyId/update',
                    templateUrl: 'app/admin/survey/admin.survey.update.html',
                    controller: 'AdminSurveyUpdateController',
                    controllerAs: 'vm',
                    title: 'Admin'
                }
            }
        ];
    }
})();
