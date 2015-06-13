(function () {
    'use strict';

    angular
        .module('app.program')
        .controller('ProgramListController', ProgramListController);

    ProgramListController.$inject = ['$q', 'dataservice', 'logger'];
    function ProgramListController($q, dataservice, logger) {
        var vm = this;
        vm.programs = [];
        vm.sessions = [];
        vm.title = 'Programs';

        activate();

        function activate() {
            var promises = [listPrograms(), listSessions()];
            return $q.all(promises).then(function() {
            });
        }

        function listSessions() {
            return dataservice.listSessions().then(function (data) {
                vm.sessions = data;
                return vm.sessions;
            });
        }

        function listPrograms() {
            return dataservice.listPrograms().then(function (data) {
                vm.programs = data;
                return vm.programs;
            });
        }
    }
})();
