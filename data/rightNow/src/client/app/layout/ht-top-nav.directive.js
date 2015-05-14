(function() {
    'use strict';

    angular
        .module('app.layout')
        .directive('htTopNav', htTopNav);

    /* @ngInject */
    function htTopNav () {
        var directive = {
            bindToController: true,
            controller: TopNavController,
            controllerAs: 'vm',
            restrict: 'EA',
            scope: {
                'navline': '='
            },
            templateUrl: 'app/layout/ht-top-nav.html'
        };

        TopNavController.$inject = ['authservice', '$location', 'logger'];

        /* @ngInject */
        function TopNavController(authservice, $location, logger) {
            var vm = this;

            vm.message = '';
            vm.loginUser = loginUser;
            vm.logoutUser = logoutUser;
            vm.authData = authservice.authData;

            activate();

            function activate() {
                logger.info('Activated Top Bar');
            }

            function loginUser() {
                $location.path('/login');
            }

            function logoutUser() {
                authservice.logout();
                $location.path('/login');
                logger.success('logged out!');
            }
        }

        return directive;
    }
})();
