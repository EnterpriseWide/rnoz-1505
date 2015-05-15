(function () {
    'use strict';

    angular
        .module('app.program')
        .controller('ProgramController', ProgramController);

    ProgramController.$inject = ['logger'];
    /* @ngInject */
    function ProgramController(logger) {
        var vm = this;
        vm.title = 'Program';

        activate();

        function activate() {
            logger.info('Activated Program View');
        }
    }
})();
