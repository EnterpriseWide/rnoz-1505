(function () {
    'use strict';

    angular
        .module('app.profile')
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['logger', 'authservice'];

    /* @ngInject */
    function ProfileController(logger, authservice) {
        var vm = this;
        vm.title = 'Profile';
        vm.authData = authservice.authData;

        activate();

        function activate() {
            logger.info('Activated ' + vm.title + ' View');
        }
    }
})();
