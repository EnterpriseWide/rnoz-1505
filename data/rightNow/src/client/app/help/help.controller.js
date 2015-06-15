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
        vm.bodyText = '<p>Contact Info</p><p>PDF Instructions</p>' +
            '<p>And a few paragraphs of basic instructions</p>';

        activate();

        function activate() {
            logger.info('Activated ' + vm.title + ' View');
        }

    }
})();
