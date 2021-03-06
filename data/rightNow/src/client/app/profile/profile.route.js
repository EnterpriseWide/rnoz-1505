(function() {
    'use strict';

    angular
        .module('app.profile')
        .run(appRun);
    appRun.$inject = ['routerHelper'];
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'profile',
                config: {
                    url: '/profile',
                    templateUrl: 'app/profile/profile.html',
                    controller: 'ProfileController',
                    controllerAs: 'vm',
                    title: 'Profile',
                    settings: {
                        nav: 2,
                        content: '<i class="fa fa-lock"></i> Profile'
                    }
                }
            }
        ];
    }
})();
