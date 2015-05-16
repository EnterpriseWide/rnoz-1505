(function() {
    'use strict';

    angular
        .module('app.layout')
        .controller('ShellController', ShellController);

    ShellController.$inject = ['$rootScope', '$timeout', 'config', 'logger', 'authservice',
        '$location'];
    /* @ngInject */
    function ShellController($rootScope, $timeout, config, logger, authservice, $location) {
        var vm = this;
        vm.busyMessage = 'Please wait ...';
        vm.isBusy = true;
        $rootScope.showSplash = true;
        vm.navline = {
            title: config.appTitle,
        };
        vm.authData = authservice.authData;

        activate();

        function activate() {
            logger.success(config.appTitle + ' loaded!', null);
            if (!vm.authData.isAuthenticated) {
                $location.path('/login');
            }
            hideSplash();
        }

        function hideSplash() {
            //Force a 1 second delay so we can see the splash.
            $timeout(function() {
                $rootScope.showSplash = false;
            }, 1000);
        }
    }
})();
