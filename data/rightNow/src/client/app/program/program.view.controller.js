(function () {
    'use strict';

    angular
        .module('app.program')
        .controller('ProgramViewController', ProgramViewController);

    ProgramViewController.$inject = ['logger'];
    /* @ngInject */
    function ProgramViewController(logger) {
        var vm = this;
        vm.title = 'Program';

        activate();

        function activate() {
            logger.info('Activated Program View');
        }
    }
})();
