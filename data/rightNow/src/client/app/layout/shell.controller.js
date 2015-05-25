(function() {
    'use strict';

    angular
        .module('app.layout')
        .controller('ShellController', ShellController);
    ShellController.$inject = ['$rootScope', '$timeout', 'config', 'logger', 'authservice', '$location'];
    function ShellController($rootScope, $timeout, config, logger, authservice, $location, $stateParams) {
        var vm = this;
        vm.authData = {};
        vm.busyMessage = 'Please wait ...';
        vm.isBusy = true;
        $rootScope.showSplash = true;
        vm.navline = {
            logo: config.logo,
            title: config.appTitle,
            tagline: config.tagLine,
        };

        activate();

        function activate() {
            logger.success(config.appTitle + ' loaded!', null);
            authservice.fillData();
            vm.authData = authservice.authData;
            if (!vm.authData.isAuthenticated) {
                $state.go('login');
            } else if (vm.authData.isAdmin) {
                $state.go('admin');
            } else if (vm.authData.isCoach) {
                $state.go('programs');
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
