(function() {
    'use strict';

    angular
        .module('app.help')
        .run(appRun);
    appRun.$inject = ['routerHelper'];
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'help',
                config: {
                    url: '/help',
                    templateUrl: 'app/help/help.html',
                    controller: 'HelpController',
                    controllerAs: 'vm',
                    title: 'Help',
                    settings: {
                        nav: 2,
                        content: '<i class="fa fa-lock"></i> Help'
                    }
                }
            }
        ];
    }
})();
