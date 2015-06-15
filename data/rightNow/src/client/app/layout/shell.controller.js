(function() {
    'use strict';

    angular
        .module('app.layout')
        .controller('ShellController', ShellController);
    ShellController.$inject = ['$rootScope', '$timeout', 'config', 'logger', 'authservice', '$location', '$stateParams', '$state', '$q', 'menuservice'];
    function ShellController($rootScope, $timeout, config, logger, authservice, $location, $stateParams, $state, $q, menuservice) {
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
        vm.menu = menuservice.options;

        activate();

        function activate() {
            return $q.all(authservice.fillData())
                .then(function() {
                    vm.authData = authservice.authData;
                    logger.success(config.appTitle + ' loaded!', null);
                    hideSplash();
                });
        }

        function toggleMenu() {
            vm.menu.isOpen = !vm.menu.isOpen;
        }

        function hideSplash() {
            //Force a 1 second delay so we can see the splash.
            $timeout(function() {
                $rootScope.showSplash = false;
            }, 1000);
        }

        function logoutUser() {
            var d = $q.defer();
            authservice.logout()
            .then(function () {
                d.resolve();
                $state.go('login');
            });
            return d.promise;
        }
    }
})();
