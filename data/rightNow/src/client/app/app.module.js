(function () {
    'use strict';

    angular.module('app', [
        'app.core',
        'app.widgets',
        'app.admin',
        'app.dashboard',
        'app.layout',
        'app.program',
        'app.login'
    ]);

    // angular.module("app")
    // .run(function ($rootScope, $state, authservice) {
    // $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
    //   if (toState.authenticate && !AuthService.isAuthenticated()){
    //     // User isn’t authenticated
    //     $state.transitionTo("login");
    //     event.preventDefault();
    //   }
    // });
    // });
})();
