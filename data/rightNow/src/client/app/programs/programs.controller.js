(function () {
    'use strict';

    angular
        .module('app.programs')
        .controller('ProgramsController', ProgramsController);

    ProgramsController.$inject = ['$q', 'dataservice', 'logger'];
    /* @ngInject */
    function ProgramsController($q, dataservice, logger) {
        var vm = this;
        vm.programs = [];
        vm.sessions = [];
        vm.title = 'Programs';

        activate();

        function activate() {
            var promises = [getPrograms(), getSessions()];
            return $q.all(promises).then(function() {
                logger.info('Activated ' + vm.title + ' View');
            });
        }

        function getSessions() {
            return dataservice.getSessions().then(function (data) {
                vm.sessions = data;
                return vm.sessions;
            });
        }

        function getPrograms() {
            return dataservice.getPrograms().then(function (data) {
                vm.programs = data;
                return vm.programs;
            });
        }
    }
})();
