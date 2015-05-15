(function() {
    'use strict';

    angular
        .module('app.programs')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'programs',
                config: {
                    url: '/',
                    templateUrl: 'app/programs/programs.html',
                    controller: 'ProgramsController',
                    controllerAs: 'vm',
                    title: 'programs',
                    settings: {
                        nav: 1,
                        content: '<i class="fa fa-programs"></i> Programs',
                        showOnNav: true
                    }
                }
            }
        ];
    }
})();
