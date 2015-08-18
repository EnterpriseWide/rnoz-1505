(function () {
    'use strict';

    angular
        .module('app.help')
        .controller('HelpController', HelpController);

    HelpController.$inject = ['logger', 'authservice', 'dataservice'];

    /* @ngInject */
    function HelpController(logger, authservice, dataservice) {
        var vm = this;
        vm.title = 'Help';
        vm.authData = authservice.authData;
        vm.bodyText = '<p>Contact Info</p><p>PDF Instructions</p>' +
            '<p>And a few paragraphs of basic instructions</p>';

        activate();

        function activate() {
            if (!(vm.authData.isCoach || vm.authData.isAdmin)) {
                dataservice.listPrograms().then(function (data) {
                    var program = data[0];
                    vm.programId = program.Id;
                });
            }

        }
    }
})();
