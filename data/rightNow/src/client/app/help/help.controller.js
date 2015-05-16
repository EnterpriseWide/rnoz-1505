(function () {
    'use strict';

    angular
        .module('app.help')
        .controller('HelpController', HelpController);

    HelpController.$inject = ['logger', 'authservice'];

    /* @ngInject */
    function HelpController(logger, authservice) {
        var vm = this;
        vm.title = 'Help';
        vm.authData = authservice.authData;

        activate();

        function activate() {
            logger.info('Activated ' + vm.title + ' View');
        }
    }
})();
