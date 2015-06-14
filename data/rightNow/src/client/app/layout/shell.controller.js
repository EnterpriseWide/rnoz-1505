(function() {
    'use strict';

    angular
        .module('app.layout')
        .controller('ShellController', ShellController);
    ShellController.$inject = ['$rootScope', '$timeout', 'config', 'logger', 'authservice', '$location', '$stateParams', '$state', '$q'];
    function ShellController($rootScope, $timeout, config, logger, authservice, $location, $stateParams, $state, $q) {
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
        vm.logoutUser = logoutUser;
        vm.toggleMenu = toggleMenu;

        activate();

        function activate() {
            vm.isMenuOpen = $rootScope.isMenuOpen;
            return $q.all(authservice.fillData())
                .then(function() {
                    vm.authData = authservice.authData;
                    logger.success(config.appTitle + ' loaded!', null);
                    hideSplash();
                });
        }

        function toggleMenu() {
            $rootScope.isMenuOpen = !$rootScope.isMenuOpen;
            vm.isMenuOpen = $rootScope.isMenuOpen;
        }

        function hideSplash() {
            //Force a 1 second delay so we can see the splash.
            $timeout(function() {
                $rootScope.showSplash = false;
            }, 1000);
        }

        function logoutUser() {
            $q.all(authservice.logout())
            .then(function () {
                $state.go('login');
            });
        }
    }
})();
